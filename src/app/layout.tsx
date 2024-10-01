import Link from 'next/link';
import './globals.css';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
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
                <li>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/projects/" className="hover:underline">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Skills
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer
          className="py-6 text-center bg-tertiary text-text dark:bg-foreground dark:text-text-dark"
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
