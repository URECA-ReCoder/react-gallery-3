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
        {/* <div css={siteInputContainer}>
          <input type="text" placeholder="SITE" />
        </div> */}
      </div>
    </footer>
  );
}

const footerContainer = css`
  background: #f7f7fa;
  color: white;
  text-align: center;
  font-size: 12px;
  width: 100%;
  margin: auto auto 0;
  padding: 0 50px 70px;
`;

const footerContent = css`
  display: flex;
  border-top: 1px solid #ebedf2;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  margin-top: 18px;
  padding: 20px 0 22px;
`;

const footerInfo = css`
  /* border-top: 1px solid #ebedf2; */

  color: #949494;
  font-size: 12px;
  line-height: 21px;
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
