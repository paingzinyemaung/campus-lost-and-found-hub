import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useUserLogin } from '../hook/auth';
import toast from 'react-hot-toast';
import { useLang } from '../context/LanguageContext';

export default function Login() {
  const navigate = useNavigate();
  const { t } = useLang();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: userLogin, isPending } = useUserLogin();

  const handleLogin = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    userLogin(
      { email, password },
      {
        onError: (e: any) => {
          toast.error(e?.response?.data?.message ?? t('common.error'));
        },
        onSuccess: (res: any) => {
          toast.success(res.data.message);
          navigate('/dashboard');
        },
      },
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-base-200 font-sans">
      <Navbar />

      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md space-y-6 rounded-2xl border border-base-300 bg-base-100 p-6 shadow-xl sm:p-8">
          <div className="space-y-2 text-center">
            <div className="mb-1 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-xl text-primary">
              👋
            </div>
            <h1 className="text-xl font-bold leading-relaxed tracking-tight text-base-content md:text-2xl">
              {t('login.title')}
            </h1>
            <p className="mx-auto max-w-xs text-xs leading-relaxed text-base-content/60">
              {t('login.subtitle')}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-xs font-semibold text-base-content/80"
              >
                {t('field.email')}
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                disabled={isPending}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@ucspyay.edu.mm"
                className="input w-full text-base"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-xs font-semibold text-base-content/80"
              >
                {t('field.password')}
              </label>
              <label className="input w-full">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  disabled={isPending}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="grow text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={
                    showPassword
                      ? t('common.hidePassword')
                      : t('common.showPassword')
                  }
                  className="text-base-content/60 hover:text-base-content"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </label>
            </div>

            <button
              type="submit"
              disabled={!email || !password || isPending}
              className="btn btn-primary mt-2 h-11 w-full text-sm font-bold shadow-md"
            >
              {isPending && (
                <span className="loading loading-spinner loading-sm" />
              )}
              {isPending ? t('login.submitting') : t('login.submit')}
            </button>
          </form>

          <div className="border-t border-base-200 pt-4 text-center text-xs text-base-content/60">
            {t('login.noAccount')}{' '}
            <Link
              to="/register"
              className="font-bold text-primary hover:underline"
            >
              {t('login.registerLink')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
