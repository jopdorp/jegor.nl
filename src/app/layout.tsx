'use client'

import Link from 'next/link';
import Content from '@/content';
import './globals.css';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { useState, useEffect } from 'react';

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

  return (
    <html lang="en">
      <head>
        <title>Portfolio - Jegor van Opdorp</title>
      </head>
      <body
        className="bg-background dark:bg-background-dark dark:text-text-dark"
      >
        <header
          className="py-6 text-center"
        >
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold">
              Jegor van Opdorp
            </h1>
            <p className="mt-2">
              Full-stack Developer with a Passion for Cloud and Hardware Simulations
            </p>
            <nav className="mt-4">
              <ul
                className="flex justify-center space-x-6"
              >
                {Object.keys(Content.pages).map(page => <li key={page}>
                  <Link href={`${page}`} className="hover:underline">
                    {Content.pages[page].title}
                  </Link>
                </li>)}
              </ul>
            </nav>
          </div>
        </header>
        <main style={{minHeight:`calc(100vh - ${headerHeight + footerHeight}px)`}}>{children}</main>
        <footer
          className="py-6 text-center bg-foreground-dark dark:bg-foreground dark:text-text-dark"
        >
          <div className="container mx-auto">
            <p>
              &copy; 2024 Jegor van Opdorp. Follow me on{' '}
              <a href="https://github.com/jopdorp">
                GitHub
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
