import type { ReactNode } from "react";

type SectionHeadingProps = {
  id?: string;
  label: string;
  title: ReactNode;
  body?: string;
  light?: boolean;
};

export function SectionHeading({ id, label, title, body, light = false }: SectionHeadingProps) {
  return (
    <header className={`section-heading ${light ? "section-heading--light" : ""}`} data-reveal>
      <p className="section-label"><span aria-hidden="true">+</span>{label}</p>
      <h2 id={id}>{title}</h2>
      {body ? <p className="section-heading__body">{body}</p> : null}
    </header>
  );
}
