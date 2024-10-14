/** @jsxImportSource @emotion/react */
import { Global, css } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';

const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        ${emotionNormalize}
        html,
        body {
          margin: 0;
          padding: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          background: url('/pixel_back2_half.png') no-repeat center;
          background-size: cover;
        }
      `}
    />
  );
};
export default GlobalStyles;
