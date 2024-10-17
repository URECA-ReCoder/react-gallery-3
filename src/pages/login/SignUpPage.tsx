/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import Input from '../../components/login/Input';
import SignUpButton from '../../components/login/SignUpButton';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';
import { useAuthStore } from '../../stores/authStore';
import { register } from '../../apis/auth';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const setTokens = useAuthStore((state) => state.setTokens);

  const handleSignUp = async () => {
    try {
      const response = await register(name, email, password);
      const { accessToken, refreshToken } = response;
      
      // 토큰 저장
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      setTokens(accessToken, refreshToken);
      setErrorMessage(null); 
    } catch (error) {
      console.error('회원가입 실패:', error);

      // 에러 핸들링
      if (error.response) {
        if (error.response.status === 409) {
          setErrorMessage('이미 가입된 이메일이나 사용자 이름입니다.');
        } else {
          setErrorMessage(`회원가입에 실패했습니다. 상태 코드: ${error.response.status}`);
        }
      } else {
        setErrorMessage('네트워크 오류 또는 서버에 연결할 수 없습니다. 다시 시도해 주세요.');
      }
    }
  };

  return (
    <div css={pageContainerStyle}>
      <Header />
      <div css={signUpContainerStyle}>
        <h4 css={titleStyle}>SIGN UP</h4>
        <div css={redLineStyle}></div>
        <div css={formContainerStyle}>
          <div css={inputContainerStyle}>
            <Input 
              id="name" 
              label="name" 
              type="text" 
              name="name"
              value={name}  
              onChange={(e) => setName(e.target.value)}  
            />
            <Input 
              id="email" 
              label="email" 
              type="email" 
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
              id="password" 
              label="password" 
              type="password" 
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessage && <div css={errorTextStyle}>{errorMessage}</div>}  
          <div css={buttonContainerStyle}>
            <SignUpButton onClick={handleSignUp} /> 
          </div>
        </div>
      </div>
      <Footer />
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

const signUpContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  padding: 40px;
  text-align: center;
`;

const titleStyle = css`
  font-size: 32px;
  color: #333;
  margin-bottom: 10px;
`;

const redLineStyle = css`
  width: 100%;
  height: 2px;
  background-color: #5BC9C9;
  margin-bottom: 30px;
`;

const formContainerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const inputContainerStyle = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const buttonContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const errorTextStyle = css`
  font-size: 14px;
  color: red;  
  margin-top: 10px;
`;
