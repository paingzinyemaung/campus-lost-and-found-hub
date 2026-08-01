import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useUserLogin } from '../hook/auth';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutate: userLogin, isPending } = useUserLogin();
  // console.log(isError, error?.response?.data.message);

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    userLogin(
      { email, password },
      {
        onError: (e: any) => {
          toast.error(e.response.data.message);
        },
        onSuccess: (res: any) => {
          console.log(res);
          toast.success(res.data.message);
          navigate('/dashboard');
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-base-100 border border-base-300 rounded-2xl shadow-xl p-8 space-y-6">
          {/* Header Title & Emoji */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary text-xl mb-1">
              👋
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-base-content leading-relaxed">
              ပြန်လည်ကြိုဆိုပါတယ်
            </h1>
            <p className="text-xs text-base-content/60 leading-relaxed max-w-xs mx-auto">
              Campus Lost & Found Hub သို့ ဝင်ရောက်ရန် သင့်အကောင့်ဖြင့် Login
              ပြုလုပ်ပါ။
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-base-content/80">
                ကျောင်းသုံး အီးမေးလ် (Email)
              </label>
              <input
                type="email"
                required
                value={email}
                disabled={isPending}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@ucspyay.edu.mm"
                className="input input-bordered input-sm md:input-md w-full text-sm bg-base-200/50 focus:bg-base-100"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-base-content/80">
                  စကားဝှက် (Password)
                </label>
                <a
                  href="#forgot"
                  className="text-xs text-primary hover:underline"
                >
                  စကားဝှက်မေ့နေပါသလား?
                </a>
              </div>
              <input
                type="password"
                disabled={isPending}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input input-bordered input-sm md:input-md w-full text-sm bg-base-200/50 focus:bg-base-100"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!email || !password || isPending}
              className={`btn btn-primary w-full text-sm font-bold shadow-md mt-2 ${
                isPending ? 'loading' : ''
              }`}
            >
              {isPending ? 'စစ်ဆေးနေပါသည်...' : 'အကောင့်ဝင်မည် (Login)'}
            </button>
          </form>

          {/* Register Link Footer */}
          <div className="text-center text-xs text-base-content/60 pt-4 border-t border-base-200">
            အကောင့်မရှိသေးဘူးလား?{' '}
            <Link
              to="/register"
              className="text-primary font-bold hover:underline"
            >
              အသစ်စာရင်းသွင်းရန် (Register)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
