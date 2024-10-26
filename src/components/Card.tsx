'use client';

import ParagraphContent from "./ParagraphContent";
import { PageProps } from "./Page";


export const Card = ({title, subTitle}: PageProps) => {
  const content = ParagraphContent(subTitle || "");
  return  <div className={`p-6 rounded-lg shadow-md bg-tertiary dark:bg-tertiary-dark dark:text-text-dark`}>
  <h3 className="text-2xl font-semibold">
  {title}
  </h3>
  <p className="mt-2" dangerouslySetInnerHTML={{__html: content}} />
  </div>
}