import { MDXRemote } from "next-mdx-remote/rsc";
import { Link } from "next-view-transitions";
import React from "react";
import { Children, createElement } from "react";
import { codeToHtml } from "shiki";
import {
  transformerMetaHighlight,
  transformerRenderLineNumber,
} from "@shikijs/transformers";
import { CodeBlock } from "~~/components/code-block";

// type TableData = {
//   headers: string[];
//   rows: string[][];
// };

// type TableProps = Partial<TableData> & {
//   data?: TableData;
// };

// function Table({ data, headers, rows }: TableProps) {
//   const tableData = data ?? (headers && rows ? { headers, rows } : undefined);

//   if (!tableData) {
//     throw new Error("Table requires headers and rows");
//   }

//   const { headers: tableHeaders, rows: tableRows } = tableData;

//   const renderedHeaders = tableHeaders.map((header, index) => (
//     <th key={index} className="p-2 text-left">
//       {header}
//     </th>
//   ));

//   const renderedRows = tableRows.map((row, index) => (
//     <tr key={index}>
//       {row.map((cell, cellIndex) => (
//         <td key={cellIndex} className="p-2 text-left">
//           {cell}
//         </td>
//       ))}
//     </tr>
//   ));

//   return (
//     <table className="w-full border-collapse">
//       <thead>
//         <tr>{renderedHeaders}</tr>
//       </thead>
//       <tbody>{renderedRows}</tbody>
//     </table>
//   );
// }

function CustomLink({
  href,
  ...props
}: React.ComponentProps<typeof Link> & { href: string }) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
}

function CustomImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const RESOURCE_URL = process.env.NEXT_PUBLIC_CF_R2_BUCKET_URL;
  // console.log("RESOURCE_URL:", RESOURCE_URL);

  const imagePath = typeof props.src === "string" ? props.src : "";
  const src = `${RESOURCE_URL?.replace(/\/$/, "")}/${imagePath.replace(/^\//, "")}`;
  // console.log("Image URL:", src);

  return <img {...props} src={src} alt={props.alt} className="rounded-lg" />;
}

function remarkCodeMeta() {
  return (tree: {
    children?: Array<{
      type?: string;
      meta?: string | null;
      data?: { hProperties?: Record<string, string> };
      children?: Array<unknown>;
    }>;
  }) => {
    const visit = (nodes?: typeof tree.children) => {
      nodes?.forEach((node) => {
        if (node?.type === "code" && node.meta) {
          node.data ??= {};
          node.data.hProperties ??= {};
          node.data.hProperties["data-meta"] = node.meta;
        }

        visit(node?.children as typeof tree.children);
      });
    };

    visit(tree.children);
  };
}

async function Pre({
  children,
  ...props
}: React.HtmlHTMLAttributes<HTMLPreElement>) {
  // extract className from the children code tag
  const codeElement = Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === "code",
  ) as React.ReactElement<HTMLPreElement> | undefined;

  const codeProps = codeElement?.props as
    | (React.HTMLAttributes<HTMLElement> & {
        "data-meta"?: string;
        dataMeta?: string;
        meta?: string;
      })
    | undefined;
  const preProps = props as React.HTMLAttributes<HTMLPreElement> & {
    "data-meta"?: string;
    dataMeta?: string;
    meta?: string;
  };
  const className = codeProps?.className ?? "";
  const isCodeBlock =
    typeof className === "string" && className.startsWith("language-");

  if (isCodeBlock) {
    const [languageClass, ...classTokens] = className.split(" ");
    const lang = languageClass?.split("-")[1] ?? "";
    
    // Obtenemos los metadatos que inyecta MDX (donde vienen los tokens como {1})
    const meta = [
      codeProps?.["data-meta"],
      codeProps?.dataMeta,
      codeProps?.meta,
      preProps["data-meta"],
      preProps.dataMeta,
      preProps.meta,
      ...classTokens,
    ]
      .filter(Boolean)
      .join(" ");
    
    const filename = meta.match(
      /(?:title|filename)=(?:"([^"]+)"|'([^']+)'|(\S+))/i,
    );
    const showLineNumbers = /\bshowLineNumbers\b/i.test(meta);

    if (!lang) {
      return <code {...props}>{children}</code>;
    }

    const code = String(codeProps?.children ?? "").replace(/\n$/, "");
    
    // El transformerMetaHighlight se encarga automáticamente de parsear {1}, {3-5}, etc.
    const transformers = [transformerMetaHighlight()];

    if (showLineNumbers) {
      transformers.push(transformerRenderLineNumber());
    }

    const html = await codeToHtml(code, {
      lang,
      meta: {
        __raw: meta,
      },
      transformers,
      themes: {
        dark: "one-dark-pro",
        light: "ayu-light",
      },
    });

    return (
      <CodeBlock
        code={code}
        html={html}
        language={lang}
        filename={filename?.[1] ?? filename?.[2] ?? filename?.[3]}
        showLineNumbers={showLineNumbers}
      />
    );
  }

  // If not, return the component as is
  return <pre {...props}>{children}</pre>;
}

function slugify(str: string) {
  return str
    .toString()
    // .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: number) {
  const HeadingComponent = ({ children }: { children: React.ReactNode }) => {
    const childrenString = Children.toArray(children).join("");
    const slug = slugify(childrenString);
    return createElement(`h${level}`, { id: slug }, [
      createElement(
        "a",
        {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        },
        children,
      ),
    ]);
  };
  HeadingComponent.displayName = `Heading${level}`;
  return HeadingComponent;
}

const components = {
  a: CustomLink,
  img: CustomImage,
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  pre: Pre,
  // Table,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function MDX(props: any) {
  return (
    <MDXRemote
      {...props}
      options={{
        ...(props.options ?? {}),
        mdxOptions: {
          ...(props.options?.mdxOptions ?? {}),
          remarkPlugins: [
            ...(props.options?.mdxOptions?.remarkPlugins ?? []),
            remarkCodeMeta,
          ],
        },
      }}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      components={{ ...components, ...(props.components ?? {}) }}
    />
  );
}
