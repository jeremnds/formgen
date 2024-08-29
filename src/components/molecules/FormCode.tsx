"use client";

import { themes } from "prism-react-renderer";
import { useState } from "react";
import { LiveEditor, LiveProvider } from "react-live";
import { Button } from "../atoms/shadcn/button";

type FormCodeProps = {
  generatedCode: string;
};

export default function FormCode({ generatedCode }: FormCodeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="basis-1/2">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Form Code</h2>
        <Button onClick={handleCopy} className="rounded-full" type="button">
          {copied ? "Copied!" : "Copy Code"}
        </Button>
      </div>
      <div className="max-h-96 overflow-y-auto overflow-x-hidden">
        <LiveProvider code={generatedCode} theme={themes.duotoneDark}>
          <LiveEditor disabled />
        </LiveProvider>
      </div>
    </div>
  );
}
