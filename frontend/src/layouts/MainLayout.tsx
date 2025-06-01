import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sections/sidebar';
import AuthGuard from '../components/auth/AuthGuard';

const MainLayout = () => {
  return (
    <AuthGuard>
      <div className="flex h-screen">
        <div className="w-1/5 min-w-48 bg-coolGray-800 min-h-screen">
          <Sidebar />
        </div>
        <div className="w-4/5 max-h-screen overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </AuthGuard>
  );
};

export default MainLayout;
