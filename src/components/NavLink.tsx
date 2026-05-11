import {forwardRef, type AnchorHTMLAttributes, type ReactNode} from 'react';

interface NavLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string;
  children: ReactNode;
}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({to, children, ...props}, ref) => (
    <a ref={ref} href={to} {...props}>
      {children}
    </a>
  ),
);
NavLink.displayName = 'NavLink';
