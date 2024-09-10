import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginHeader from './components/loginHeader.jsx';
import Register from './components/register.jsx';
import Login from './components/login.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js';
import ProtectedRoute from './components/protectedRoute.jsx';
import MainPage from './components/main.jsx';
import { Retrive } from './components/retrive.jsx';
import {Hisabs} from './components/hisabs.jsx';
const router = createBrowserRouter([{
  path: '/',
  element: <LoginHeader />,
  children: [
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "",
      element: <Register />
    }
  ]
}, {
  path: '/main',
  element: <ProtectedRoute />, 
  children: [
    {
      path: '',
      element: <MainPage />,
      children: [
        {
          path: 'retrive', // Nested path, resolved as /main/retrive
          element: <Retrive />
        },
        {
          path:'hisabs',
          element:<Hisabs/>
        }
      ]
    }
  ],
}]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* Wrap the app with the Provider */}
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
