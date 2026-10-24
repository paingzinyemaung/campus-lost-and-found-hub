import { Link, NavLink, useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useMe, useUserLogout } from '../hook/auth';
import { useTheme } from '../context/ThemeContext';
import { useLang } from '../context/LanguageContext';

type NavItem = { to: string; label: string; end?: boolean };

export default function Navbar() {
  const { pathname } = useLocation();
  const queryClient = useQueryClient();
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLang();

  const { data: userData, isLoading } = useMe();
  const resData = userData?.data || userData;
  const currentUser = resData?.user || resData?.data || resData;
  const isLoggedIn = !!userData;
  const initial = currentUser?.name?.charAt(0).toUpperCase() || 'U';

  const { mutate: logoutMutation, isPending: isLoggingOut } = useUserLogout();

  const isLoginPage = pathname === '/login';
  const isRegisterPage = pathname === '/register';
  const isAuthPage = isLoginPage || isRegisterPage;
  const isAddItemPage = pathname === '/dashboard/add-item';

  // အခြေအနေအလိုက် ပြမယ့် link များ
  const mainLinks: NavItem[] = [
    { to: '/items', label: t('nav.browse') },
    ...(isLoggedIn
      ? [{ to: '/dashboard', label: t('nav.myItems'), end: true }]
      : []),
  ];

  // Login/Register page မှာ "ပစ္စည်းတင်မည်" ကို မပြ
  const showPost = !isAuthPage && !isAddItemPage;

  // Login/Register ခလုတ်: လက်ရှိ page နဲ့ မတူတဲ့ တစ်ဖက်ကိုပဲ ပြ
  const authLink: NavItem | null = isLoginPage
    ? { to: '/register', label: t('nav.register') }
    : isRegisterPage
      ? { to: '/login', label: t('nav.login') }
      : !isLoggedIn && !isLoading
        ? { to: '/login', label: t('nav.login') }
        : null;

  // Logo: Login ဝင်ပြီးရင် Dashboard၊ မဝင်ရသေးရင် Landing
  const logoTarget = isLoggedIn ? '/dashboard' : '/';

  const handleLogout = () => {
    logoutMutation(undefined, {
      onSuccess: () => {
        queryClient.clear();
        sessionStorage.clear(); // localStorage ကို မရှင်းပါ (theme/language ပျက်မှာမို့)
        toast.success(t('nav.logoutSuccess'));
        setTimeout(() => {
          window.location.href = '/';
        }, 800);
      },
      onError: (error) => {
        console.error('Logout failed:', error);
        toast.error(t('nav.logoutFailed'));
      },
    });
  };

  // Dropdown ထဲက link/ခလုတ် နှိပ်ပြီးရင် menu ပြန်ပိတ်ရန်
  const closeDropdown = () =>
    (document.activeElement as HTMLElement | null)?.blur();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `btn btn-ghost btn-sm font-medium ${isActive ? 'btn-active text-primary' : ''}`;

  const menuLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'menu-active' : '';

  return (
    <header className="navbar sticky top-0 z-50 bg-base-100 px-3 shadow-sm sm:px-6 lg:px-12">
      {/* Logo */}
      <div className="min-w-0 flex-1">
        <Link
          to={logoTarget}
          onClick={() => {
            if (pathname === logoTarget)
              window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 truncate text-lg font-extrabold tracking-tight text-primary sm:text-xl"
        >
          🎓
          <span className="hidden sm:inline">Campus Lost & Found Hub</span>
          <span className="sm:hidden">Campus Hub</span>
        </Link>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        {/* ဘာသာစကား + Theme */}
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
        <div className="hidden items-center gap-1 md:flex">
          {mainLinks.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}

          {showPost && (
            <Link
              to="/dashboard/add-item"
              className="btn btn-primary btn-sm ml-1"
            >
              + {t('nav.postItem')}
            </Link>
          )}

          {authLink && (
            <Link to={authLink.to} className="btn btn-outline btn-sm ml-1">
              {authLink.label}
            </Link>
          )}

          {isLoading && (
            <div className="ml-1 h-8 w-16 animate-pulse rounded bg-base-300" />
          )}

          {isLoggedIn && (
            <div className="dropdown dropdown-end ml-1">
              <div
                tabIndex={0}
                role="button"
                aria-label={currentUser?.name}
                className="btn btn-ghost btn-circle btn-sm"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-content">
                  {initial}
                </span>
              </div>
              <ul
                tabIndex={0}
                onClick={closeDropdown}
                className="menu dropdown-content z-10 mt-3 w-64 rounded-box bg-base-100 p-2 shadow"
              >
                <li className="menu-title normal-case">
                  <span className="block truncate text-sm font-semibold text-base-content">
                    {currentUser?.name}
                  </span>
                  <span className="block truncate text-xs font-normal">
                    {currentUser?.email}
                  </span>
                </li>
                <li>
                  <Link to="/dashboard">{t('nav.myItems')}</Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="text-error"
                  >
                    {isLoggingOut ? t('nav.loggingOut') : t('nav.logout')}
                  </button>
                </li>
              </ul>
            </div>
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
            className="menu dropdown-content z-10 mt-3 w-64 rounded-box bg-base-100 p-2 shadow"
          >
            {isLoggedIn && (
              <li className="menu-title normal-case">
                <span className="block truncate text-sm font-semibold text-base-content">
                  {currentUser?.name}
                </span>
                <span className="block truncate text-xs font-normal">
                  {currentUser?.email}
                </span>
              </li>
            )}

            {mainLinks.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.end} className={menuLinkClass}>
                  {l.label}
                </NavLink>
              </li>
            ))}

            {showPost && (
              <li>
                <Link
                  to="/dashboard/add-item"
                  className="font-semibold text-primary"
                >
                  + {t('nav.postItem')}
                </Link>
              </li>
            )}

            {authLink && (
              <li>
                <Link to={authLink.to}>{authLink.label}</Link>
              </li>
            )}

            {isLoggedIn && (
              <li>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="text-error"
                >
                  {isLoggingOut ? t('nav.loggingOut') : t('nav.logout')}
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
