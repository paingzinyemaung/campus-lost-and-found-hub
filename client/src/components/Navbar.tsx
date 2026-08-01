import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="navbar bg-base-100 shadow-sm px-6 lg:px-12 sticky top-0 z-50">
      <div className="flex-1">
        <Link
          to="/"
          className="text-xl font-extrabold tracking-tight text-primary flex items-center gap-2"
        >
          🎓 Campus Lost & Found Hub
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <Link to="/dashboard" className="btn btn-ghost btn-sm font-medium">
          Home
        </Link>
        <Link to="/add-item" className="btn btn-primary btn-sm px-4">
          Post Item
        </Link>
        <Link to="/login" className="btn btn-outline btn-sm px-4">
          Login
        </Link>
      </div>
    </header>
  );
}
