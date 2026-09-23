import { ArrowDown, ArrowUpRight, ChevronDown, type LucideProps } from "lucide-react";

const defaults = {
  size: 16,
  strokeWidth: 2,
  absoluteStrokeWidth: false,
} as const;

export function IconArrowUpRight(props: LucideProps) {
  return <ArrowUpRight aria-hidden="true" {...defaults} {...props} />;
}

export function IconArrowDown(props: LucideProps) {
  return <ArrowDown aria-hidden="true" {...defaults} {...props} />;
}

export function IconChevronDown(props: LucideProps) {
  return <ChevronDown aria-hidden="true" {...defaults} {...props} />;
}
