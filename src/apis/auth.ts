import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 로그인 API
export const login = async (email, password) => {
  const response = await apiClient.post('/auth/login', {
    email,
    password,
  });
  return response.data; 
};

// 회원가입 API
export const register = async (name, email, password) => {
  const response = await apiClient.post('/auth/register', {
    username: name,
    email,
    password,
  });
  return response.data; 
};

// Access Token 재발급 API
export const reissueToken = async (refreshToken) => {
  const response = await apiClient.post('/auth/reissue', {}, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  return response.data;  
};

// 사용자 정보 조회 API
export const fetchProfile = async (accessToken) => {
  const response = await apiClient.get('/auth/profile', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data; 
};

// Axios interceptor 추가
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // if (error.response) {
    //   // 토큰 만료로 인한 401 Unauthorized 발생 시
   
    //   if (error.response.message === 
    //     "유효하지 않거나 만료된 토큰입니다." && !originalRequest._retry) {
    //     originalRequest._retry = true;

    //     try {
    //       const refreshToken = localStorage.getItem('refreshToken');
    //       if (!refreshToken) throw new Error('No refresh token available');

    //       const { accessToken } = await reissueToken(refreshToken);
    //       localStorage.setItem('accessToken', accessToken);
    //       originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
    //       return apiClient(originalRequest);
    //     } catch (tokenError) {
    //       console.error('Token reissue failed:', tokenError);
    //       return Promise.reject(tokenError);
    //     }
    //   }
    // } else {
    //   console.error('Network Error:', error);
    // }

    // return Promise.reject(error);
  }
);

export default apiClient;
