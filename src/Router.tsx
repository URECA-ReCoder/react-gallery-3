import { createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import App from './App';
import MainPage from './pages/main/MainPage';
import SignPage from './pages/login/SignUpPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <MainPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/sign',
        element: <SignPage />,
      },
    ],
  },
]);
