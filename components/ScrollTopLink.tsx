"use client";

import { forwardRef, type ComponentProps, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

const ScrollTopLink = forwardRef<HTMLAnchorElement, Props>(
  function ScrollTopLink({ href, onClick, ...props }, ref) {
    const pathname = usePathname();

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      if (href === "/" && pathname === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      onClick?.(e);
    };

    return <Link ref={ref} href={href} onClick={handleClick} {...props} />;
  },
);

export default ScrollTopLink;
