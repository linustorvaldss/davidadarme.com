"use client";

import { useState } from "react";

type CodeBlockProps = {
  code: string;
  html: string;
  language: string;
  filename?: string;
  showLineNumbers?: boolean;
};

export function CodeBlock({
  code,
  html,
  language,
  filename,
  showLineNumbers,
}: CodeBlockProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle",
  );

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 2000);
    } catch (error) {
      console.error("Could not copy code block", error);
      setCopyState("error");
    }
  };

  return (
    <div className="code-block not-prose">
      <div className="code-block-header">
        <span className="code-block-language">{filename ?? language}</span>
        <button
          type="button"
          className="code-block-copy"
          onClick={copyCode}
          aria-label="Copy code"
        >
          {copyState === "copied"
            ? "Copied"
            : copyState === "error"
              ? "Retry"
              : "Copy"}
        </button>
      </div>
      <div
        className={`code-block-content${showLineNumbers ? " show-line-numbers" : ""}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
