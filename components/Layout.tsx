'use client';

import AccordionMenu from './AccordionMenu';
import { NavLink } from './NavLink';
import styled from 'styled-components';
import { colors, flexbox } from '../styles/common';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <InnerWrapper>
      <NavDiv>
        <TopDiv>
          <p>어쩌고저쩌고</p>
        </TopDiv>
        <AccordionMenu>
          <AccordionMenu.Item title='홈' href='/' />
          <AccordionMenu.Item title='관리'>
            <NavLink href='/practice'>practice</NavLink>
            <NavLink href='/practice2'>practice2</NavLink>
          </AccordionMenu.Item>
          <AccordionMenu.Item title='관리3' href='practice3' />
        </AccordionMenu>
        <BottomDiv>
          <p>어쩌고저쩌고</p>
        </BottomDiv>
      </NavDiv>
      <ContentWrapper>{children}</ContentWrapper>
    </InnerWrapper>
  );
};
const BottomDiv = styled.div`
  position: absolute;
  bottom: 0;
`;
const TopDiv = styled.div`
  height: 75px;
`;

const NavDiv = styled.div`
  position: relative;
  background: ${colors.PRIMARY};
  color: ${colors.WHITE};
  height: 100vh;
  border-bottom-right-radius: 40px;
`;

const InnerWrapper = styled.div`
  ${flexbox({ ai: 'stretch', jc: 'flex-start' })}
  width: 100%;
  background: ${colors.GRAYF7};
`;

const ContentWrapper = styled.div`
  overflow: hidden;
  width: 100%;
`;
