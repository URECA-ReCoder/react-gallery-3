import { createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import App from './App';
import MainPage from './pages/main/MainPage';

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
    ],
  },
]);
