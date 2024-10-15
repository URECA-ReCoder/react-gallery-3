/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export default function Footer() {
  return (
    <footer css={footerContainer}>
      <div css={footerContent}>
        <div css={footerInfo}>
          <p>Recoder University</p>
          <p>[02000] 202, Recoder-ro, Seongbuk-gu, Seoul, Korea</p>
          <p>Tel: 02-1234-5678 | FAX: 02-111-1234</p>
          <p>
            E-mail:{' '}
            <a href="mailto:art001@recoder.ac.kr">recoderstudy@recoder.ac.kr</a>
          </p>
          <p>Copyright (C) 2024 Recoder University. All Rights Reserved</p>
        </div>
        <div css={siteInputContainer}>
          <input type="text" placeholder="SITE" />
        </div>
      </div>
    </footer>
  );
}

const footerContainer = css`
  background-color: #3b3b3b;
  color: white;
  padding: 20px;
  text-align: center;
  font-size: 12px;
  width: 1400px;
  position: fixed;
  bottom: 0;
  left: 0;
`;

const footerContent = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
`;

const footerInfo = css`
  text-align: left;

  p {
    margin: 4px 0;
    font-size: 10px;
  }

  a {
    color: #fff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const siteInputContainer = css`
  text-align: right;

  input {
    background-color: #fff;
    border: 1px solid #fff;
    padding: 8px;
    border-radius: 4px;
    font-size: 11px;
    width: 150px;
  }
`;
