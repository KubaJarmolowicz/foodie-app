"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./nav-link.module.css";

type NavLinkProps = {
  href: string;
  children?: React.ReactNode;
};

export const NavLink = ({ href, children }: NavLinkProps) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={
        pathname.startsWith(href)
          ? `${classes.link} ${classes.active}`
          : classes.link
      }
    >
      {children}
    </Link>
  );
};
