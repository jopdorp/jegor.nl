import { Section, SectionProps } from '@/components/Section';

export type PageProps = {
  title: string;
  subtitle: string;
  sections?: SectionProps[];
}

export default function Page({title, subtitle, sections}:PageProps) {
  return (
    <>
      <section id="home" className="bg-foreground text-background dark:text-text-dark px-6 py-24">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold">
            {title}
          </h2>
          <p className="mt-4">
            {subtitle}
          </p>
        </div>
      </section>
      {sections?.map((sectionProps, index) => <Section {...sectionProps} isEven={index % 2 === 1} key={sectionProps.title}/>)}
    </>
  );
}
