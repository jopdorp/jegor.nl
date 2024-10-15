'use client';

import { Url } from "next/dist/shared/lib/router/router"
import Link from "next/link"

export type CardProps = {
  projectName: string,
  projectDescription: string,
  url?: Url,
}
  
export const Card = ({projectName, projectDescription, url="#"}:CardProps) => {
  return  <div className={`p-6 rounded-lg shadow-md bg-tertiary dark:bg-tertiary-dark dark:text-text-dark`}>
  <h3 className="text-2xl font-semibold">
  {projectName}
  </h3>
  <p className="mt-2">
  {projectDescription}</p>
  <Link href={url} className="mt-4 block block">
    View Project
  </Link>
  </div>
}