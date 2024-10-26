"use client";

import { WebsiteProps } from "@/app/layout";
import Page, { PageProps } from "@/components/Page"
import { GraphQLClient } from 'graphql-request';
import { marked, Token, Tokens, TokensList } from 'marked';
import dotenv from "dotenv";

dotenv.config()

const  client = new GraphQLClient(process.env.NODE_ENV === "production" ? 'https:/jopdorp.nl/api/graphql' : 'http://localhost:3000/api/graphql');

type Page = {
  id: string;
  path: string;
  title: string;
};

type PageContent = {
  content: string;
};

type PagesListResponse = {
  pages: {
    list: Page[];
  };
};

type SinglePageResponse = {
  pages: {
    single: PageContent;
  };
};

export async function fetchAndParseChildPages(): Promise<WebsiteProps> {
  const childPages = await fetchChildPages();

  const website: WebsiteProps = {
    pages: {},
  };

  for (const child of childPages) {
    const content = await fetchPageContent(child.id);
    const parsedPage = parsePageContent(content);
    website.pages[child.path] = parsedPage;
  }

  return website;
}

async function fetchChildPages(): Promise<Page[]> {
  const query = `
  {
    pages {
      list(orderBy: TITLE) {
        id
        path
        title
      }
    }
  }
  `;

  const data: PagesListResponse = await client.request(query);
  return data.pages.list.filter((page: { path: string }) =>
    page.path.startsWith('website/')
  );; // This returns the list of child pages
}

async function fetchPageContent(pageId: string): Promise<string> {
  const query = `
  {
    pages {
      single(id: ${pageId}) {
        content
      }
    }
  }
  `;

  const data: SinglePageResponse = await client.request(query);
  return data.pages.single.content; // This returns the content of the page in markdown format
}

function nestTokens(result: PageProps, tokens: Token[], depth = 0): {nested: PageProps, skip: number} {
  for (let i = 0; i < tokens.length; i++) {
    const child = tokens[i];
    if (child.type === "heading" && child.depth > depth) {
      const childPageProps: PageProps = {
        title: child.text,
        subTitle: '',
        sections: [],
      };
      const {nested, skip} = nestTokens(childPageProps, tokens.slice(i + 1), child.depth);      
      result.sections.push(nested);
      i += skip;
      continue;
    }
    if (child.type === "heading" && child.depth <= depth) {
      return  {nested: result, skip: i};
    }
    if (child.type === "paragraph") {
      result.subTitle += `<div>${child.text}</div>`;
    }
    if (child.type === "table") {
      result.subTitle += `<table>
        <thead>
          <tr>
            ${child.header.map((header: Tokens.TableCell) => `<th>${header.text}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${child.rows.map((row: Tokens.TableRow[]) => `<tr>${row.map(cell => `<td>${cell.text}</td>`).join('')}</tr>`).join('')}
        </tbody>
      </table>`;
    }
  }

  return {nested: result, skip: tokens.length};
}

function parsePageContent(content: string) {
  const tokens = marked.lexer(content);
  const page:PageProps = {
    title: tokens[0].type === "heading" ? tokens[0].text : "",
    subTitle: '',
    sections: [],
  }
  return nestTokens(page, tokens.slice(1)).nested;
}