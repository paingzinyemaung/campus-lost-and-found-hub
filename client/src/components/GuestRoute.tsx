import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useMe } from '../hook/auth';

export default function GuestRoute() {
  const { data: user } = useMe();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from;

  if (user) return <Navigate to={from ?? '/dashboard'} replace />;
  return <Outlet />;
}
