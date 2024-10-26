export type ParagraphProps = {
  text: string;
};

const WIKI_URL = "https://wiki.jopdorp.nl";

const ParagraphContent = (text: string) => {
    // Replace image markdown with HTML img tags
    const htmlString = text.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, url) => {
      return `<img src="${WIKI_URL}/${url}" alt="${alt}" class="mx-auto" />`;
    }).replace(/\[(.*?)\]\((.*?)\)/g, (match, text, url) => {
      return `<a href="${WIKI_URL}/${url}" class="text-primary" target="_blank">${text}</a>`;
    });
  
    return htmlString
}

export default ParagraphContent;