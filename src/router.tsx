import { AnchorHTMLAttributes, MouseEvent, ReactNode, useEffect, useState } from "react";

const NAV_EVENT = "app:navigate";

export function navigate(to: string) {
  if (to === location.pathname + location.search) return;
  history.pushState({}, "", to);
  window.dispatchEvent(new Event(NAV_EVENT));
  window.scrollTo(0, 0);
}

export function usePath() {
  const [path, setPath] = useState(location.pathname);
  useEffect(() => {
    const h = () => setPath(location.pathname);
    window.addEventListener("popstate", h);
    window.addEventListener(NAV_EVENT, h);
    return () => {
      window.removeEventListener("popstate", h);
      window.removeEventListener(NAV_EVENT, h);
    };
  }, []);
  return path;
}

/** In-app link: internal hrefs use history, everything else is a normal anchor. */
export function Link({ href, children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children?: ReactNode }) {
  const internal = href.startsWith("/");
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    rest.onClick?.(e);
    if (!internal || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    navigate(href);
  };
  return (
    <a {...rest} href={href} onClick={onClick}>
      {children}
    </a>
  );
}
