/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export default function Header() {
  return (
    <header css={headerContainer}>
      <div>Logo</div>
      <nav>
        <a href="/login">Login</a>
      </nav>
    </header>
  );
}
const headerContainer = css`
  border: 1px solid red;
`;
