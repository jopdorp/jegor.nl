'use client';

import { Card, CardProps } from "./Card";

export type SectionProps =  { 
  title: string, 
  cards?: CardProps[],
  isEven?: boolean,
};

export const Section = ({title, isEven=false, cards=[]}:SectionProps) => {
  return <section id="projects" className={`py-24 p-6 ${isEven ? "bg-foreground" : "bg-background dark:bg-background-dark"}  `}>
    <div className="container mx-auto">
      <h2 className={`text-4xl font-semibold text-center mb-12 ${(isEven ? "text-background dark:text-text-dark" : "")}`} >
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map(cardProps => <Card {...cardProps} key={cardProps.projectName}/>  ) }
      </div>
    </div>
  </section>
}
