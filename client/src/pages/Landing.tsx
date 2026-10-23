import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useMe } from '../hook/auth';
import { useLang } from '../context/LanguageContext';

export default function Landing() {
  const { t } = useLang();
  const { data: user } = useMe();
  const isLoggedIn = !!user;

  const steps = [
    {
      icon: '📝',
      title: t('landing.step1.title'),
      desc: t('landing.step1.desc'),
    },
    {
      icon: '📸',
      title: t('landing.step2.title'),
      desc: t('landing.step2.desc'),
    },
    {
      icon: '🤝',
      title: t('landing.step3.title'),
      desc: t('landing.step3.desc'),
    },
  ];

  const features = [
    {
      icon: '⚡',
      title: t('landing.feat1.title'),
      desc: t('landing.feat1.desc'),
    },
    {
      icon: '🛡️',
      title: t('landing.feat2.title'),
      desc: t('landing.feat2.desc'),
    },
    {
      icon: '💬',
      title: t('landing.feat3.title'),
      desc: t('landing.feat3.desc'),
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-base-200 font-sans">
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center overflow-hidden px-4 py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-secondary/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-4xl space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            ✨ {t('landing.badge')}
          </div>

          <h1 className="text-3xl font-black leading-normal tracking-tight text-base-content sm:text-4xl md:text-5xl">
            {t('landing.title1')}
            <span className="mt-1 block text-primary">
              {t('landing.title2')}
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-base-content/70 sm:text-base">
            {t('landing.subtitle')}
          </p>

          <div className="flex flex-col items-center justify-center gap-3 pt-4 sm:flex-row sm:gap-4">
            <Link
              to="/items"
              className="btn btn-primary btn-lg w-full gap-2 shadow-md sm:w-auto"
            >
              🔍 {t('landing.browse')}
            </Link>
            <Link
              to="/dashboard/add-item"
              className="btn btn-outline btn-lg w-full gap-2 sm:w-auto"
            >
              📢 {t('landing.post')}
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-base-100 px-4 py-16 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 text-center text-xl font-bold leading-relaxed sm:text-2xl">
            {t('landing.howTitle')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className="relative rounded-box border border-base-300 bg-base-200/50 p-6 text-center"
              >
                <span className="absolute -top-3 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-content">
                  {i + 1}
                </span>
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-2xl">
                  {s.icon}
                </div>
                <h3 className="font-bold leading-relaxed">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-base-content/60">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-base-300 px-4 py-16 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-xl space-y-3 text-center">
            <h2 className="text-xl font-bold leading-relaxed tracking-tight text-base-content md:text-2xl">
              {t('landing.whyTitle')}
            </h2>
            <p className="text-xs leading-relaxed text-base-content/60 md:text-sm">
              {t('landing.whySubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="card border border-base-300 bg-base-100 shadow-none transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="card-body space-y-2 p-6 text-center md:p-8 md:text-left">
                  <div className="mx-auto mb-1 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-2xl md:mx-0">
                    {f.icon}
                  </div>
                  <h3 className="card-title justify-center text-base font-bold leading-relaxed md:justify-start">
                    {f.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-base-content/60">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-16 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-5xl rounded-box bg-primary px-6 py-10 text-center text-primary-content sm:py-14">
          <h2 className="text-xl font-bold leading-relaxed sm:text-3xl">
            {t('landing.ctaTitle')}
          </h2>
          <Link
            to={isLoggedIn ? '/dashboard/add-item' : '/register'}
            className="btn mt-6 border-0 bg-base-100 text-primary hover:bg-base-200"
          >
            {isLoggedIn ? t('landing.post') : t('landing.ctaButton')}
          </Link>
        </div>
      </section>

      <footer className="footer footer-center mt-auto border-t border-base-200 bg-base-300 p-6 text-xs text-base-content">
        <p className="font-medium">{t('landing.footer')}</p>
      </footer>
    </div>
  );
}
