export function Reveal({
  as: Tag = "div",
  className = "",
  children,
  ...rest
}: {
  as?: "div" | "section" | "article" | "header";
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <Tag className={className} data-reveal {...rest}>
      {children}
    </Tag>
  );
}
