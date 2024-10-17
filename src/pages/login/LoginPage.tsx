/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import Input from '../../components/login/Input';
import LoginButton from '../../components/login/LoginButton';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';
import { login, fetchProfile } from '../../apis/auth';  
import { useAuthStore } from '../../stores/authStore';  

export default function LoginPage() {
  const [memberId, setMemberId] = useState('');
  const [memberPw, setMemberPw] = useState('');
  const [profile, setProfile] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const { setTokens } = useAuthStore();  // Zustand에서 setTokens 가져오기

  const handleLogin = async () => {
    try {
      const response = await login(memberId, memberPw);
      console.log('Login successful:', response);

      const { accessToken, refreshToken } = response;

      // Zustand store에 토큰 저장
      setTokens(accessToken, refreshToken);

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      
      await loadProfile(accessToken);
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  const loadProfile = async (token: string) => {
    try {
      const userProfile = await fetchProfile(token);
      setProfile(userProfile);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  return (
    <div css={pageContainerStyle}>
      <Header />
      <div css={loginContainerStyle}>
        <h4 css={titleStyle}>LOGIN</h4>
        <div css={redLineStyle}></div>
        <div css={formContainerStyle}>
          <div css={inputContainerStyle}>
            <Input 
              id="member_id" 
              label="ID" 
              type="text" 
              name="member_id"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
            />
            <Input 
              id="member_pw" 
              label="Password" 
              type="password" 
              name="member_pw"
              value={memberPw}
              onChange={(e) => setMemberPw(e.target.value)}
            />
          </div>
          <LoginButton onClick={handleLogin} /> 
        </div>
        {errorMessage && (
          <div css={errorTextStyle}>{errorMessage}</div>
        )}
        <div css={infoTextStyle}>
          Please enter the ID and password of Recoder University Portal System (RUPID).
        </div>
        {profile && (
          <div css={infoTextStyle}>
            <p>Logged in as: {profile.username}</p>
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
}

const pageContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #fff;
`;

const loginContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  padding: 20px;
  background-color: #fff;
  text-align: center;
`;

const titleStyle = css`
  font-size: 32px;
  color: #333;
  margin-bottom: 20px;
`;

const redLineStyle = css`
  width: 100%;
  height: 2px;
  background-color: #5BC9C9;
  margin-bottom: 30px;
`;

const formContainerStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 20px;
`;

const inputContainerStyle = css`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

const infoTextStyle = css`
  font-size: 14px;
  color: #666;
  margin-top: 20px;
`;

const errorTextStyle = css`
  font-size: 14px;
  color: red;  
  margin-top: 10px;
`;
