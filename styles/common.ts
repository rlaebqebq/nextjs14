import styled from 'styled-components';

export const colors = {
  WHITE: '#ffffff',
  BLACK: '#000000',

  GRAY2: '#222222',
  GRAY4: '#444444',
  GRAY5: '#555555',
  GRAY6: '#666666',
  GRAY9: '#999999',
  GRAYA: '#aaaaaa',
  GRAYC: '#cccccc',
  GRAYD: '#dddddd',
  GRAYE: '#eeeeee',
  GRAY7: '#777777',
  GRAYF7: '#f3f5f7',
  GRAYFA: '#fafafa',

  RED: '#ff3b30',
  ORANGE: '#ff9500',
  YELLOW: '#ffcc00',
  GREEN: '#34c759',
  TEAL: '#5ac8fa',
  BLUE: '#007aff',
  INDIGO: '#5856d6',
  PURPLE: '#af52de',
  PINK: '#ff2d55',

  PRIMARY: '#2B344C',
};

export const textEllipsis = ({ n = 1 }: { n?: number }) => {
  return `
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: ${n};
  -webkit-box-orient: vertical;
  padding-top: 1px;
  line-height: 1.3;
  `;
};

export const gridbox = ({ n = 1, gap = 0 }: { n?: number; gap?: number }) => {
  return `
  display: grid;
  grid-template-columns: repeat(${n}, 1fr);
  gap: ${gap}px;
  `;
};

export const flexbox = ({
  display = 'flex',
  fd = 'row',
  gap = 0,
  ai = 'center',
  jc = 'center',
}: {
  display?: string;
  fd?: string;
  gap?: number;
  jc?: string;
  ai?: string;
}) => {
  return `
  display: ${display};
  flex-direction: ${fd};
  gap: ${gap}px;
  align-items: ${ai};
  justify-content: ${jc};
  `;
};

export const FlexDiv = styled.div<{ $ai?: string; $jc?: string; $gap?: number }>`
  ${({ $ai = 'center', $jc = 'center', $gap = 0 }) => {
    return `${flexbox({ ai: $ai, jc: $jc, gap: $gap })};`;
  }};
`;
