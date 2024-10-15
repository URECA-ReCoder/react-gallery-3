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
        ul,
        li {
          padding: 0;
          margin: 0;
          list-style-type: none;
        }
        a {
          text-decoration: none; /* 밑줄 제거 */
          color: inherit; /* 텍스트 색상을 부모 요소와 일치 */
          cursor: pointer; /* 마우스 포인터를 손가락 모양으로 */
        }
      `}
    />
  );
};
export default GlobalStyles;
