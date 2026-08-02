import { Link, useNavigate, useLocation } from 'react-router-dom';
import React from 'react';
import { useMe, useUserLogout } from '../hook/auth';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  // TanStack Query မှ useMe ကို အသုံးပြု၍ Login ဝင်ထားခြင်း ရှိမရှိ စစ်ဆေးခြင်း
  const { data: user, isLoading } = useMe();
  const isLoggedIn = !!user; // user data ရှိလျှင် true, မရှိလျှင် false

  // Custom Hook မှ logout mutation ကို ခေါ်ယူခြင်း
  const { mutate: logoutMutation, isPending: isLoggingOut } = useUserLogout();

  // Logout လုပ်သည့် Function (Backend API ခေါ်ပြီး Cookie ရှင်းလင်းခြင်း)
  const handleLogout = () => {
    logoutMutation(undefined, {
      onSuccess: () => {
        // Query cache တွေကို ရှင်းလင်းခြင်း
        queryClient.clear();
        // localStorage သို့မဟုတ် sessionStorage များကို ရှင်းရန် (လိုအပ်ပါက)
        localStorage.clear();
        sessionStorage.clear();
        // Login စာမျက်နှာဆီသို့ တိကျစွာ ပို့ဆောင်ရန်
        toast.success('အောင်မြင်စွာ Logout ထွက်ပြီးပါပြီ');
        setTimeout(() => {
          window.location.href = '/login';
        }, 1000); // 1 စက္ကန့်စောင့်ပြီးမှ redirect လုပ်မည်
      },
      onError: (error) => {
        console.error('Logout failed:', error);
        toast.error('Logout failed');
      },
    });
  };

  // Logo အတွက် သီးသန့် Function
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
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
          onClick={handleLogoClick}
          className="text-xl font-extrabold tracking-tight text-primary flex items-center gap-2 cursor-pointer"
        >
          🎓 Campus Lost & Found Hub
        </a>
      </div>

      <div className="flex items-center gap-3">
        {/* Home / Dashboard Button */}
        <Link
          to="/dashboard"
          className="btn btn-ghost btn-sm font-medium cursor-pointer"
        >
          Home
        </Link>

        <Link to="/dashboard/add-item" className="btn btn-primary btn-sm px-4">
          Post Item
        </Link>

        {/* Loading စစ်နေစဉ် ခဏစောင့်ရန် (Optional) */}
        {isLoading ? (
          <div className="w-16 h-8 animate-pulse bg-base-300 rounded"></div>
        ) : isLoggedIn ? (
          // Login ဝင်ထားပါက Logout ပြရန် (Logout လုပ်နေစဉ် Loading ပြပေးရန် isLoggingOut ကို သုံးနိုင်သည်)
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="btn btn-outline btn-error btn-sm px-4"
          >
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </button>
        ) : (
          // မဝင်ရသေးပါက Login ခလုတ်ပြရန်
          <Link to="/login" className="btn btn-outline btn-sm px-4">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
