import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // အကယ်၍ Home (သို့) Landing Page ပေါ်မှာ ရောက်နေပြီးသားဆိုရင် အပေါ်ဆုံးကို ပုံမှန်တက်သွားစေမည်
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // အခြား Page တစ်ခုခု (ဥပမာ - Dashboard, Login) ရောက်နေရင် Landing Page ဆီသို့ သွားမည်
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="navbar bg-base-100 shadow-sm px-6 lg:px-12 sticky top-0 z-50">
      <div className="flex-1">
        {/* Logo */}
        <a
          href="/"
          onClick={handleLogoHomeClick}
          className="text-xl font-extrabold tracking-tight text-primary flex items-center gap-2 cursor-pointer"
        >
          🎓 Campus Lost & Found Hub
        </a>
      </div>

      <div className="flex items-center gap-3">
        {/* Home Button */}
        <a
          href="/dashboard"
          onClick={handleLogoHomeClick}
          className="btn btn-ghost btn-sm font-medium cursor-pointer"
        >
          Home
        </a>

        <Link to="/dashboard/add-item" className="btn btn-primary btn-sm px-4">
          Post Item
        </Link>

        <Link to="/login" className="btn btn-outline btn-sm px-4">
          Login
        </Link>
      </div>
    </header>
  );
}
