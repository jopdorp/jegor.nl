'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { fetchAndParseChildPages } from '@/utils/fetchContent'; // Import your fetch function
import { WebsiteProps } from '@/app/layout';

// Create a context
export const ContentContext = createContext<WebsiteProps | null>(null);

// ContentProvider component to wrap the app
export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<WebsiteProps | null>(null);

  useEffect(() => {
    async function getContent() {
      const contentData = await fetchAndParseChildPages(); // Fetch content
      setContent(contentData); // Set the fetched content
    }

    getContent();
  }, []);

  return (
    <ContentContext.Provider value={content}>
      {children}
    </ContentContext.Provider>
  );
};
