/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useTheme } from '@emotion/react';

export default function Header() {
  const theme = useTheme();
  return (
    <header css={headerContainer(theme)}>
      <div>ReCoder university</div>
      <nav css={menuContainer}>
        <a href="/login">Login</a>
        <a href="/myprofile">MyPage</a>
      </nav>
    </header>
  );
}
const headerContainer = (theme) => {
  return css`
    color: ${theme.color.Gray};
    font-size: ${theme.fontSize.large};
    font-weight: ${theme.fontWeight.bold};
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    position: fixed;
    top: 0;
    left: 0;
    border-bottom: 1px solid #888;
  `;
};
const menuContainer = css`
  display: flex;
  align-items: end;
  gap: 25px;
`;
