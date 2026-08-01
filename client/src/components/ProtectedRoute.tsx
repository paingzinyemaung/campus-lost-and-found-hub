import { Navigate, Outlet } from 'react-router-dom';
import { useMe } from '../hook/auth';
import Navbar from './Navbar';

const ProtectedRoute = () => {
  const { isLoading, isError } = useMe();

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  if (isError) {
    return <Navigate to={'/login'} replace />;
  }

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
