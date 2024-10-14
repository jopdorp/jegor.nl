'use client';

import { ContentContext } from "@/context/ContentContext";
import Link from "next/link";
import { useContext } from "react";

const Menu = () => {
  const content = useContext(ContentContext); // Use content from the context

  if (!content) {
    return <div>Loading...</div>;
  }

  return <header className="py-6 text-center">
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold">{content.pages['website/home'].title}</h1>
      <p className="mt-2">{content.pages['website/home'].subtitle}</p>
      <nav className="mt-4">
        <ul className="flex justify-center space-x-6">
          {Object.keys(content.pages).map((page) => (
            <li key={page}>
              <Link href={`/${page.split("/").slice(1).join("/")}`} className="hover:underline">
                {content.pages[page].title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </header>
};

export default Menu;