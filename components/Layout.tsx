'use client';

import AccordionMenu from './AccordionMenu';
import { NavLink } from './NavLink';
import styled from 'styled-components';
import { colors, flexbox } from '../styles/common';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Wrapper>
      <InnerWrapper>
        <AccordionMenu>
          <AccordionMenu.Item id='홈' title='홈' num={0} link='/' />
          <AccordionMenu.Item id='Use-case 관리' title='Use-case 관리' num={2}>
            <ul>
              <li>
                <NavLink href='/practice'>practice</NavLink>
              </li>
              <li>
                <NavLink href='/case-platform'>플랫폼 활용 사례 관리</NavLink>
              </li>
            </ul>
          </AccordionMenu.Item>
        </AccordionMenu>
        <ContentWrapper>{children}</ContentWrapper>
      </InnerWrapper>
      {/* <Footer /> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const InnerWrapper = styled.div`
  ${flexbox({ ai: 'stretch', jc: 'flex-start', gap: 30 })}
  padding: 0 30px 30px 30px;
  margin: 0 auto;
  width: 100%;
`;

const ContentWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  padding: 64px;
  height: 100%;
  min-height: calc(100vh - 350px);
  min-width: 900px;
`;
