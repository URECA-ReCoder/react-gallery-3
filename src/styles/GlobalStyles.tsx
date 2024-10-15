/** @jsxImportSource @emotion/react */
import { Global, css } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';

const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        ${emotionNormalize}
        * {
          box-sizing: border-box;
        }
        html,
        body {
          margin: 0;
          padding: 0;
        }
      `}
    />
  );
};
export default GlobalStyles;
