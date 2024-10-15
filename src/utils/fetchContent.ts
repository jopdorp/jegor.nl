"use client";

import { WebsiteProps } from "@/app/layout";
import { PageProps } from "@/components/Page"
import { GraphQLClient } from 'graphql-request';
import { marked } from 'marked';
import dotenv from "dotenv";
import { SectionProps } from "@/components/Section";
import { CardProps } from "@/components/Card";

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

function parsePageContent(content: string) {
  const tokens = marked.lexer(content);
  const page: PageProps = {
    title: '',
    subtitle: undefined,
    sections: [],
  };

  let currentSection: SectionProps;
  let currentCard: CardProps;
  let isPageSubtitle = true; // To track if we are capturing the page subtitle
  let isSectionSubtitle = false; // To track if we are capturing the section subtitle

  tokens.forEach(token => {
    if (token.type === 'heading') {
      if (token.depth === 1) {
        // Page title
        page.title = token.text;
        isPageSubtitle = true; // The content after this will be the page subtitle
      } else if (token.depth === 2) {
        // Section title
        currentSection = { title: token.text, cards: [] };
        page.sections!.push(currentSection);
        isPageSubtitle = false; // No longer capturing the page subtitle
        isSectionSubtitle = true; // The content after this will be the section subtitle
      } else if (token.depth === 3 && currentSection) {
        // Card title
        currentCard = { projectName: token.text, projectDescription: '', url: '#' };
        currentSection.cards!.push(currentCard);
        isSectionSubtitle = false; // No longer capturing the section subtitle
      }
    } else if (token.type === 'paragraph') {
      if (isPageSubtitle) {
        // Capture page subtitle
        page.subtitle = token.text;
        isPageSubtitle = false; // Page subtitle captured, no need to capture more
      } else if (isSectionSubtitle && currentSection) {
        // Capture section subtitle
        isSectionSubtitle = false; // Section subtitle captured
      } else if (currentCard) {
        // Capture card description
        currentCard.projectDescription = token.text;
      }
    }
  });

  return page;
}
