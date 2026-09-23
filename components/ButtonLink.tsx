import type { ReactNode } from "react";
import { IconArrowUpRight } from "./Icons";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "light";
  external?: boolean;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: ButtonLinkProps) {
  return (
    <a
      className={`button-link button-link--${variant} ${className}`}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      <span>{children}</span>
      <IconArrowUpRight className="button-link__icon" />
    </a>
  );
}
