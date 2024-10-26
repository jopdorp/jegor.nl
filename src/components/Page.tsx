'use client';

import { Section } from '@/components/Section';

export type PageProps = {
  name?: string;
  title: string;
  subTitle?: string;
  sections: PageProps[];
  isEven?: boolean,
}

export default function Page({title, subTitle, sections}:PageProps) {
  return (
    <>
      <section id="home" className="bg-foreground text-background text-center dark:text-text-dark px-6 py-24">
        <div className="container mx-auto">
          <h1 className={`text-4xl font-semibold mb-12 }`} >
            {title}
          </h1>
          <p className="mt-4 text-2xl" dangerouslySetInnerHTML={{__html: subTitle || ""}} />
        </div>
      </section>
      {sections?.map((sectionProps, index) => <Section {...sectionProps} isEven={index % 2 === 1} key={sectionProps.title}/>)}
    </>
  );
}
