'use client';

import { useState, useEffect, useCallback, ReactElement, Children } from 'react';
import styled from 'styled-components';
import { usePathname, useRouter } from 'next/navigation';
import CaretDownIcon from '../assets/svg/caret-down.svg';

import { colors } from '../styles/common';
import Link from 'next/link';
import { Console } from 'inspector';

interface AccordionItemProps {
  title: string;
  open?: boolean;
  onClick?: () => void;
  children?: ReactElement[] | ReactElement;
  href?: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, open, onClick, children, href }: AccordionItemProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick && href) {
      onClick();
      router.push(href);
    }
  };

  return Array.isArray(children) ? (
    <Item $open={open} $num={children.length}>
      <Button type='button' onClick={onClick} $open={open}>
        {title}
        <CaretDownIcon />
      </Button>
      <div>{children}</div>
    </Item>
  ) : (
    <Item $open={open} $num={0}>
      <Button type='button' onClick={handleClick} $open={open}>
        {title}
      </Button>
    </Item>
  );
};

const AccordionMenu = ({ children }: { children: ReactElement[] }) => {
  const pathname = usePathname();
  const [child, setChild] = useState<ReactElement[]>([]);
  const [openItem, setOpenItem] = useState<string>();

  useEffect(() => {
    children.length && setChild(children);
  }, [children]);

  const clickHandler = useCallback((title: any) => {
    setOpenItem(title);
  }, []);

  useEffect(() => {
    child.forEach((elt: any) => {
      if (elt.props.children) {
        Children.map(elt.props.children, (childElt: any) => {
          if (pathname === childElt?.props.href) clickHandler(elt.props.title);
        });
      } else if (pathname === elt.props.href) clickHandler(elt.props.title);
    });
  }, [pathname, child, clickHandler]);

  return (
    <Div>
      {child.map((elt: any, idx: any) => {
        const key = `accordion-${idx}`;
        return (
          <AccordionItem
            key={key}
            onClick={() => clickHandler(elt.props.title)}
            open={elt.props.title === openItem}
            title={elt.props.title}
            href={elt.props.href}
          >
            {elt.props.children}
          </AccordionItem>
        );
      })}
    </Div>
  );
};

const Button = styled.button<{ $open?: boolean }>`
  color: ${({ $open }) => {
    if ($open) return `${colors.WHITE}`;
    return `${colors.GRAYA}`;
  }};
  line-height: 50px;
  font-size: 14px;
  width: 100%;
  text-align: left;
  position: relative;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0 30px;
  font-weight: 700;
  border-top: 1px solid ${colors.GRAY6};

  svg {
    position: absolute;
    right: 20px;
    height: 13px;
    top: 50%;
    transform: ${({ $open }) => {
      if ($open) return `translateY(-50%) rotate(180deg)`;
      return `translateY(-50%) rotate(270deg)`;
    }};
    transition: all;

    fill: ${({ $open }) => {
      if ($open) return `${colors.WHITE}`;
      return `${colors.GRAYA}`;
    }};
  }
`;

const Item = styled.div<{ $open?: boolean; $num?: number }>`
  min-width: 140px;
  overflow: hidden;

  a {
    display: inline-block;
    width: 100%;
    line-height: 50px;
    font-size: 14px;
    white-space: nowrap;

    &.active {
      color: ${colors.WHITE};
    }

    color: ${({ $open }) => {
      if ($open) return `${colors.GRAYA}`;
      return `${colors.WHITE}`;
    }};
  }

  > div {
    transition: all 0.25s;
    overflow: hidden;
    width: 100%;
    text-align: left;
    padding: 0 30px;

    height: ${({ $open, $num }) => {
      if ($open) return `calc(50px * ${$num})`;
      return `0`;
    }};
  }
`;

const Div = styled.div`
  max-width: 300px;
  border-bottom: 1px solid ${colors.GRAY6};
`;

AccordionMenu.Item = AccordionItem;
export default AccordionMenu;
