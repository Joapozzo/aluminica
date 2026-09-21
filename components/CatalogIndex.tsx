import type { ReactNode } from "react";
import Link from "next/link";

export type CatalogIndexItem = {
  href: string;
  name: string;
  meta?: string;
};

type CatalogIndexProps = {
  id?: string;
  label: string;
  title: ReactNode;
  body?: string;
  items: CatalogIndexItem[];
  cta: { href: string; label: string };
  tone?: "ink" | "cream" | "acid";
};

export function CatalogIndex({
  id,
  label,
  title,
  body,
  items,
  cta,
  tone = "ink",
}: CatalogIndexProps) {
  return (
    <section
      className={`catalog-index catalog-index--${tone}`}
      aria-labelledby={id}
    >
      <div className="container catalog-index__layout">
        <div className="catalog-index__sticky">
          <header className="catalog-index__intro" data-reveal>
            <p className="section-label">
              <span aria-hidden="true">+</span>
              {label}
            </p>
            <h2 id={id}>{title}</h2>
            {body ? <p className="catalog-index__body">{body}</p> : null}
            <Link className="catalog-index__cta" href={cta.href}>
              {cta.label}
              <span aria-hidden="true">↗</span>
            </Link>
          </header>
        </div>

        <ol className="catalog-index__list">
          {items.map((item, index) => (
            <li key={`${item.href}-${item.name}-${index}`} data-reveal>
              <Link className="catalog-index__row" href={item.href}>
                <span className="catalog-index__num">{String(index + 1).padStart(2, "0")}</span>
                <span className="catalog-index__name">{item.name}</span>
                {item.meta ? <span className="catalog-index__meta">{item.meta}</span> : null}
                <span className="catalog-index__arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
