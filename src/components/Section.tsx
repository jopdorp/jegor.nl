'use client';

import { Card } from "./Card";
import { PageProps } from "./Page";
import ParagraphContent from "./ParagraphContent";

export const Section = ({title, subTitle, isEven=false, sections=[]}: PageProps) => {
  const content = ParagraphContent(subTitle || "");
  return <section id="projects" className={`py-24 p-6 ${isEven ? "bg-foreground" : "bg-background dark:bg-background-dark"}  `}>
    <div className="container mx-auto">
      <h2 className={`text-4xl font-semibold text-center mb-12 ${(isEven ? "text-background dark:text-text-dark" : "")}`} >
        {title}
      </h2>
      <p className={`text-center text-lg mb-12 ${(isEven ? "text-background dark:text-text-dark" : "")}`} dangerouslySetInnerHTML={{__html: content}} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sections.map(cardProps => <Card {...cardProps} key={cardProps.title}/>  ) }
      </div>
    </div>
  </section>
}
