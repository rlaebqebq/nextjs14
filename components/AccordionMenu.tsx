'use client';

import { useState, useEffect, useCallback, ReactElement } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

import { colors } from '../styles/common';

interface AccordionItemProps {
  id: string;
  title: string;
  open?: boolean;
  onClick?: () => void;
  children?: ReactElement;
  num?: number;
  link?: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  title,
  open,
  onClick,
  children,
  num,
  link,
}: AccordionItemProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick && link) {
      onClick();
      router.push(link);
      // navigate(link, { replace: true })
    }
  };

  return num === 0 && link && children === undefined ? (
    <Item $open={open} $num={num}>
      <Button type='button' onClick={handleClick} $open={open}>
        {title}
      </Button>
    </Item>
  ) : (
    <Item $open={open} $num={num}>
      <Button type='button' onClick={onClick} $open={open}>
        {title} ...
      </Button>
      <div>{children}</div>
    </Item>
  );
};

const AccordionMenu = ({ children }: { children: ReactElement[] }) => {
  const [child, setChild] = useState<ReactElement[]>([]);
  const [openItem, setOpenItem] = useState<string>();

  useEffect(() => {
    children.length && setChild(children);
  }, [children]);

  const clickHandler = useCallback((id: any) => {
    setOpenItem((prev: any) => {
      if (id === prev) return '';
      return id;
    });
  }, []);

  return (
    <Div>
      {child.map((elt: any, idx: any) => {
        const key = `accordion-${idx}`;
        return (
          <AccordionItem
            key={key}
            id={elt.props.id}
            title={elt.props.title}
            open={elt.props.id === openItem}
            onClick={() => clickHandler(elt.props.id)}
            num={elt.props.num}
            link={elt.props.link}
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
    if ($open) return `${colors.PRIMARY}`;
    return `${colors.GRAY2}`;
  }};
  line-height: 36px;
  font-size: 14px;
  width: 100%;
  text-align: left;
  position: relative;

  svg {
    position: absolute;
    right: 0;
    height: 13px;
    top: 50%;
    transform: ${({ $open }) => {
      if ($open) return `translateY(-50%) rotate(180deg)`;
      return `translateY(-50%) rotate(0)`;
    }};
  }
`;

const Item = styled.div<{ $open?: boolean; $num?: number }>`
  min-width: 140px;
  overflow: hidden;

  a {
    color: ${colors.GRAY2};
    display: inline-block;
    width: 100%;

    &.active {
      color: ${colors.PRIMARY};
    }
  }

  > div {
    transition: all 0.25s;
    overflow: hidden;
    padding: 0 15px;
    width: 100%;
    text-align: left;

    height: ${({ $open, $num }) => {
      if ($open) return `calc(36px * ${$num})`;
      return `0`;
    }};

    li {
      line-height: 36px;
      font-size: 14px;
      white-space: nowrap;
    }
  }
`;

const Div = styled.div`
  width: fit-content;
  border: 1px solid ${colors.GRAYF7};
  padding: 30px;
`;

AccordionMenu.Item = AccordionItem;
export default AccordionMenu;
