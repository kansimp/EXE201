import React from "react";

interface HeadlineProps {
  content: string;
  type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  pointer?: boolean;
}

const Headline: React.FC<HeadlineProps> = ({ content, type, className = "", pointer }) => {
  const baseClassName = `font-semibold text-primary cursor-${pointer ? "pointer" : "text"}`;
  const sizeClassName = {
    h1: "text-5xl leading-[80px]",
    h2: "text-4xl leading-[64px]",
    h3: "text-2xl leading-[48px]",
    h4: "text-xl leading-[36px]",
    h5: "text-lg leading-[30px]",
    h6: "text-base leading-[28px]",
  }[type];

  const combinedClassName = `${baseClassName} ${sizeClassName} ${className}`;

  return <label className={combinedClassName}>{content}</label>;
};

export default Headline;
