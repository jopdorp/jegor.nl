'use client';

import './globals.css';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { useState, useEffect } from 'react';
import { PageProps } from '@/components/Page';
import Menu from '@/components/Menu';
import Providers from './Providers';

export type WebsiteProps = {
  pages: { [key: string]: PageProps };
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);

  const setElementHeight = (element: string, setter: Dispatch<SetStateAction<number>>) => {
    const domElement = document.querySelector(element);
    if (domElement) {
      const height = domElement.getBoundingClientRect().height;
      setter(height);
    }
  };

  useEffect(() => {
    setElementHeight('header', setHeaderHeight);
    setElementHeight('footer', setFooterHeight);
  }, []);

  // Ensure content is loaded
  return (
    <html lang="en">
      <head>
        <title>Portfolio - Jegor van Opdorp</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<script
    src="https://analytics.homii.local/api/script.js"
    data-site-id="1"
    defer
></script>
      </head>
      <body className="bg-background dark:bg-background-dark dark:text-text-dark">
        <Providers>
          <Menu/>          
          <main style={{ minHeight: `calc(100vh - ${headerHeight + footerHeight}px)` }}>
            {children}
          </main>
          <footer className="py-6 text-center bg-foreground-dark dark:bg-foreground dark:text-text-dark">
            <div className="container mx-auto">
              <p>
                &copy; 2024 Jegor van Opdorp. Follow me on{' '}
                <a href="https://github.com/jopdorp">GitHub</a>
              </p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}

