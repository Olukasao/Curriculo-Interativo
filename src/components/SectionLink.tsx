import type { MouseEvent, ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useScroller } from "../lib/smoothScroll";

/**
 * Link to a home-page section (`#work`). On the home page it scrolls in place;
 * elsewhere it routes home and the router lands on the section.
 */
export function SectionLink({
  to,
  className,
  children,
  onNavigate,
}: {
  to: `#${string}`;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
}) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const scroller = useScroller();

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    onNavigate?.();
    if (pathname === "/") {
      history.replaceState(null, "", to);
      scroller.to(to);
      const el = document.querySelector<HTMLElement>(to);
      el?.focus({ preventScroll: true });
    } else {
      navigate(`/${to}`);
    }
  };

  return (
    <Link to={`/${to}`} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
