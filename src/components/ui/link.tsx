import NextLink, { type LinkProps } from "next/link";

type CustLink = LinkProps & { children: React.ReactNode };

export function Link({ href, prefetch = false, children, ...rest }: CustLink) {
  return (
    <NextLink href={href} prefetch={prefetch} {...rest}>
      {children}
    </NextLink>
  );
}
