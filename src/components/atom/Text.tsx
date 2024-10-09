import React from "react";

export type TextProps = {
  content: string;
  type?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  htmlFor?: string;
  pointer?: boolean;
};

const Text: React.FC<TextProps> = ({
  content,
  type = "subtitle2",
  className = "",
  onClick,
  disabled = false,
  htmlFor,
  pointer = false,
}) => {
  // Tailwind CSS classes applied for disabled and pointer handling
  const combinedClassName = `${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

  return (
    <>
      {pointer ? (
        <label htmlFor={htmlFor} className={`${combinedClassName} cursor-pointer`} onClick={onClick}>
          {content}
        </label>
      ) : (
        <label htmlFor={htmlFor} className={combinedClassName} onClick={onClick}>
          {content}
        </label>
      )}
    </>
  );
};

export default Text;
export {};
