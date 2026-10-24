import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useMe } from '../hook/auth';
import Navbar from './Navbar';
import { useLang } from '../context/LanguageContext';

const ProtectedRoute = () => {
  const { isLoading, isError } = useMe();
  const { t } = useLang();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary" />
        <p className="text-sm text-base-content/60">{t('common.loading')}</p>
      </div>
    );
  }

  if (isError) {
    // ဘယ်စာမျက်နှာကို သွားမလို့ဆိုတာ မှတ်ထားပြီး login သို့ ပို့မယ်
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
