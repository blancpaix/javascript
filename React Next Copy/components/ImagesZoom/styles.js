import stc, { createGlobalStyle } from 'styled-components';

export const Overlay = stc.div`
  position: fixed;
  z-index: 500;
  top: 0; bottom:0; right:0, left:0;
`;
