import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useLang } from '../context/LanguageContext';

const NotFound = () => {
  const { t } = useLang();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-base-200 font-sans">
      <Navbar />

      <main className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-12">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/4 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
        />

        <div className="relative w-full max-w-md space-y-5 text-center">
          <div className="text-7xl font-black tracking-tight text-primary sm:text-8xl">
            4<span className="inline-block animate-bounce">🔍</span>4
          </div>
          <h1 className="text-xl font-bold leading-relaxed sm:text-2xl">
            {t('notfound.title')}
          </h1>
          <p className="text-sm leading-relaxed text-base-content/70">
            {t('notfound.desc')}
          </p>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-center">
            <Link to="/" className="btn btn-primary w-full shadow-md sm:w-auto">
              🏠 {t('notfound.home')}
            </Link>
            <button
              onClick={() => navigate(-1)}
              className="btn btn-outline w-full sm:w-auto"
            >
              ← {t('notfound.back')}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
