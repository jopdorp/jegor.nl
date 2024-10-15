'use client';

import React, { useContext } from 'react';
import Page from '@/components/Page';
import { ContentContext } from '@/context/ContentContext';
import { usePathname } from 'next/navigation';

const DynamicPage = () => {
  const content = useContext(ContentContext); // Get the content from the context
  const pathname = usePathname().slice(0, -1); // Get the current URL path

  // Make sure content is loaded before rendering
  if (!content) {
    return <div>Loading...</div>;
  }

  // Remove leading slash from pathname to match the keys in content.pages
  const currentPage = pathname === "" ? '/home' : pathname;

  // Check if the page exists in the content
  if (!content.pages[`website${currentPage}`]) {
    return <div>404 - Page Not Found</div>; // Optionally handle missing pages
  }

  return <Page {...content.pages[`website${currentPage}`]} />;
};

export default DynamicPage;
