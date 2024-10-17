/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useTheme } from '@emotion/react';

export default function Header() {
  const theme = useTheme();
  return (
    <header css={headerContainer(theme)}>
      <div css={headerLogoWrapper}>ReCoder Gallery</div>
      <div>
        <nav css={menuContainer}>
          <button css={headerLoginButton}>
            <a href="/login">Login</a>
          </button>
          {/* <a href="/myprofile">MyPage</a> */}
        </nav>
      </div>
    </header>
  );
}
const headerLoginButton = css`
  background: linear-gradient(134deg, #07d8e2 54.07%, #35e99d 99.24%);
  border-radius: 100px;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  line-height: 18px;
  margin-right: 4px;
  padding: 8px 20px 10px 22px;
`;
const headerLogoWrapper = css`
  padding: 0 0 0 50px;
  font-size: 24px;
  font-weight: 900;
  color: #09ccca;
`;
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
    z-index: 3;
    border-bottom: 1px solid #ebedf2;
    background: #fff;
  `;
};
const menuContainer = css`
  display: flex;
  align-items: end;
  gap: 25px;
  padding: 0 60px 0;
`;
