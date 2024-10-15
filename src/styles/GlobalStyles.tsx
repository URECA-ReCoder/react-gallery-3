/** @jsxImportSource @emotion/react */
import { Global, css } from '@emotion/react';
import './font.css';

const reset = css`
  html,
  body,
  p,
  ol,
  ul,
  li,
  dl,
  dt,
  dd,
  blockquote,
  figure,
  fieldset,
  legend,
  textarea,
  pre,
  iframe,
  hr,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 100%;
    font-weight: normal;
  }

  ul {
    list-style: none;
  }

  button,
  input,
  select {
    margin: 0;
    border: none;
  }

  input:focus,
  select:focus,
  option:focus,
  textarea:focus,
  button:focus {
    outline: none;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  img,
  video {
    height: auto;
    max-width: 100%;
  }
`;

const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        ${reset};
        * {
          font-family: 'Pretendard', Arial, Helvetica, sans-serif;
          overscroll-behavior: none; // 스크롤이 오버되는 것을 막아준다.
        }
        html,
        body {
          box-sizing: border-box;

          display: flex;
          flex-direction: column;
          min-height: 100vh;
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
