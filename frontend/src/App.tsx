// src/App.tsx or App.jsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PATHS } from './components/config/paths';
import './index.css';
import MainLayout from './layouts/MainLayout';

import ProfileLayout from './layouts/ProfileLayout';
import ServiceLayout from './layouts/ServiceLayout';
import AuthPage from './pages/auth/AuthPage';
import ProfilePage from './pages/profile/ProfilePage';
import Inspired from './pages/service/InspiredPage';
import ServicePage from './pages/service/ServicePage';
import StartPage from './pages/service/StartPage';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <BrowserRouter>
          <Routes>
            <Route path={PATHS.ROOT} element={<AuthPage />} />
            <Route path={PATHS.AUTH} element={<AuthPage />} />
            <Route element={<MainLayout />}>
              <Route path={PATHS.SERVICE.ROOT} element={<ServiceLayout />}>
                <Route path="" element={<ServicePage />} />
                <Route path={PATHS.SERVICE.START} element={<StartPage />} />
                <Route path={PATHS.SERVICE.INSPIRED} element={<Inspired />} />
              </Route>
              <Route path={PATHS.PROFILE.ROOT} element={<ProfileLayout />}>
                <Route path="" element={<ProfilePage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
