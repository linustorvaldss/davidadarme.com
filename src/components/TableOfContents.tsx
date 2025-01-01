import React from "react";

interface Heading {
  id: string;
  title: string;
  level: number;
}

interface TOCProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TOCProps) {
  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="pl-4 border-l border-neutral-700">
      <h2 className="font-bold text-lg mb-4">Tabla de Contenidos</h2>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
            className="text-sm"
          >
            <a 
              href={`#${heading.id}`} 
              className="text-neutral-400 hover:text-neutral-100 hover:underline transition-colors duration-200 block py-1"
            >
              {heading.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}