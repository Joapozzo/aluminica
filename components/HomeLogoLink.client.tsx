"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

type HomeLogoLinkProps = ComponentProps<typeof Link>;

export function HomeLogoLink({ href = "/#inicio", onClick, ...props }: HomeLogoLinkProps) {
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || pathname !== "/") return;

    event.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (window.location.hash !== "#inicio") {
      window.history.replaceState(null, "", "/#inicio");
    }
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
