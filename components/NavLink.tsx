'use client';

import { usePathname } from 'next/navigation';
import Link, { LinkProps } from 'next/link';

interface NavLinkProps extends LinkProps {
  children?: React.ReactNode;
}
export const NavLink = ({ children, ...props }: NavLinkProps) => {
  const pathname = usePathname();

  return (
    <Link className={pathname === props.href ? 'active' : ''} {...props}>
      {children}
    </Link>
  );
};
