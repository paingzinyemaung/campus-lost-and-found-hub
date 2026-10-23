import { Navigate, Outlet } from 'react-router-dom';
import { useMe } from '../hook/auth';
import Navbar from './Navbar';
import { useLang } from '../context/LanguageContext';

const ProtectedRoute = () => {
  const { isLoading, isError } = useMe();
  const { t } = useLang();

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary" />
        <p className="text-sm text-base-content/60">{t('common.loading')}</p>
      </div>
    );
  }

  if (isError) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
