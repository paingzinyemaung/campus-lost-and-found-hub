import { Link, useNavigate, useLocation } from 'react-router-dom';
import React from 'react';
import { useMe, useUserLogout } from '../hook/auth';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext';
import { useLang } from '../context/LanguageContext';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLang();

  const { data: user, isLoading } = useMe();
  const isLoggedIn = !!user;

  const { mutate: logoutMutation, isPending: isLoggingOut } = useUserLogout();

  const handleLogout = () => {
    logoutMutation(undefined, {
      onSuccess: () => {
        queryClient.clear();
        // localStorage.clear() ကို မသုံးတော့ပါ (theme/language ပျက်သွားမှာမို့)
        sessionStorage.clear();
        toast.success(t('nav.logoutSuccess'));
        setTimeout(() => {
          window.location.href = '/login';
        }, 1000);
      },
      onError: (error) => {
        console.error('Logout failed:', error);
        toast.error(t('nav.logoutFailed'));
      },
    });
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeDropdown = () =>
    (document.activeElement as HTMLElement | null)?.blur();

  return (
    <header className="navbar sticky top-0 z-50 bg-base-100 px-3 shadow-sm sm:px-6 lg:px-12">
      <div className="min-w-0 flex-1">
        <a
          href="/"
          onClick={handleLogoClick}
          className="flex items-center gap-2 truncate text-lg font-extrabold tracking-tight text-primary sm:text-xl"
        >
          🎓
          <span className="hidden sm:inline">Campus Lost & Found Hub</span>
          <span className="sm:hidden">Campus Hub</span>
        </a>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => setLang(lang === 'my' ? 'en' : 'my')}
          aria-label={t('nav.toggleLang')}
        >
          {lang === 'my' ? 'EN' : 'မြန်မာ'}
        </button>

        <button
          className="btn btn-ghost btn-circle btn-sm"
          onClick={toggleTheme}
          aria-label={t('nav.toggleTheme')}
        >
          {theme === 'campus-light' ? '🌙' : '☀️'}
        </button>

        {/* Tablet / Desktop */}
        <div className="hidden items-center gap-2 md:flex">
          <Link to="/dashboard" className="btn btn-ghost btn-sm font-medium">
            {t('nav.home')}
          </Link>
          <Link
            to="/dashboard/add-item"
            className="btn btn-primary btn-sm px-4"
          >
            {t('nav.postItem')}
          </Link>
          {isLoading ? (
            <div className="h-8 w-16 animate-pulse rounded bg-base-300" />
          ) : isLoggedIn ? (
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="btn btn-outline btn-error btn-sm px-4"
            >
              {isLoggingOut ? t('nav.loggingOut') : t('nav.logout')}
            </button>
          ) : (
            <Link to="/login" className="btn btn-outline btn-sm px-4">
              {t('nav.login')}
            </Link>
          )}
        </div>

        {/* ဖုန်း: Hamburger */}
        <div className="dropdown dropdown-end md:hidden">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle btn-sm"
            aria-label={t('nav.menu')}
          >
            ☰
          </div>
          <ul
            tabIndex={0}
            onClick={closeDropdown}
            className="menu dropdown-content z-10 mt-3 w-56 rounded-box bg-base-100 p-2 shadow"
          >
            <li>
              <Link to="/dashboard">{t('nav.home')}</Link>
            </li>
            <li>
              <Link to="/dashboard/add-item">{t('nav.postItem')}</Link>
            </li>
            <li>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="text-error"
                >
                  {isLoggingOut ? t('nav.loggingOut') : t('nav.logout')}
                </button>
              ) : (
                <Link to="/login">{t('nav.login')}</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
