import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';
import { useUserRegister } from '../hook/auth';
import { useLang } from '../context/LanguageContext';

export default function Register() {
  const navigate = useNavigate();
  const { t } = useLang();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: register, isPending } = useUserRegister();

  const handleRegister = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(
      { name, email, password, studentId },
      {
        onError: (e: any) => {
          toast.error(e?.response?.data?.message ?? t('common.error'));
        },
        onSuccess: (res: any) => {
          toast.success(res.data.message);
          navigate('/login');
        },
      },
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-base-200 font-sans">
      <Navbar />

      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-xl space-y-6 rounded-2xl border border-base-300 bg-base-100 p-6 shadow-xl sm:p-8 md:p-10">
          <Link to="/" className="btn btn-ghost btn-xs -ml-2 w-fit">
            ← {t('nav.backHome')}
          </Link>

          <div className="space-y-2 text-center">
            <div className="mb-1 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-xl text-primary">
              ✨
            </div>
            <h1 className="text-xl font-bold leading-relaxed tracking-tight text-base-content md:text-2xl">
              {t('register.title')}
            </h1>
            <p className="mx-auto max-w-sm text-xs leading-relaxed text-base-content/60">
              {t('register.subtitle')}
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="text-xs font-semibold text-base-content/80"
                >
                  {t('register.name')}
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  autoComplete="name"
                  disabled={isPending}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Student"
                  className="input w-full text-base"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="studentId"
                  className="text-xs font-semibold text-base-content/80"
                >
                  {t('register.studentId')}
                </label>
                <input
                  id="studentId"
                  type="text"
                  required
                  disabled={isPending}
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="PaKaPaTa-002370"
                  className="input w-full text-base"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                    autoComplete="new-password"
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
            </div>

            <button
              type="submit"
              disabled={!name || !email || !password || !studentId || isPending}
              className="btn btn-primary mt-4 h-11 w-full text-sm font-bold shadow-md"
            >
              {isPending && (
                <span className="loading loading-spinner loading-sm" />
              )}
              {isPending ? t('register.submitting') : t('register.submit')}
            </button>
          </form>

          <div className="border-t border-base-200 pt-4 text-center text-xs text-base-content/60">
            {t('register.haveAccount')}{' '}
            <Link
              to="/login"
              className="font-bold text-primary hover:underline"
            >
              {t('register.loginLink')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
