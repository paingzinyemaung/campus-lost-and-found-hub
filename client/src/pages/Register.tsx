import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Backend API Integration (ဥပမာ - Register API ခေါ်မည့်နေရာ)
      // ယာယီအနေဖြင့် 1 စက္ကန့် စောင့်ခိုင်းထားပါသည်
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // အောင်မြင်ပါက Login Page သို့မဟုတ် Dashboard သို့ ပို့မည်
      navigate('/login');
    } catch (err: any) {
      setError(
        'စာရင်းသွင်းရာတွင် အမှားအယွင်းရှိပါသည်။ ကျေးဇူးပြု၍ ထပ်ကြိုးစားပါ။',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-base-100 border border-base-300 rounded-2xl shadow-xl p-8 space-y-6">
          {/* Header Title & Emoji */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary text-xl mb-1">
              ✨
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-base-content leading-relaxed">
              အကောင့်အသစ် ဖန်တီးမည်
            </h1>
            <p className="text-xs text-base-content/60 leading-relaxed max-w-xs mx-auto">
              Campus Lost & Found Hub တွင် ပစ္စည်းတင်ရန်နှင့် ရှာဖွေရန်
              စာရင်းသွင်းပါ။
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="alert alert-error text-xs py-2 shadow-sm">
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-base-content/80">
                အမည် (Full Name)
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Mg Mg"
                className="input input-bordered input-sm md:input-md w-full text-sm bg-base-200/50 focus:bg-base-100"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-base-content/80">
                ကျောင်းသုံး အီးမေးလ် (Email)
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@utc.edu.mm"
                className="input input-bordered input-sm md:input-md w-full text-sm bg-base-200/50 focus:bg-base-100"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-base-content/80">
                စကားဝှက် (Password)
              </label>
              <input
                type="password"
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
              disabled={loading}
              className={`btn btn-primary w-full text-sm font-bold shadow-md mt-2 ${
                loading ? 'loading' : ''
              }`}
            >
              {loading ? 'စာရင်းသွင်းနေပါသည်...' : 'အကောင့်လုပ်မည် (Register)'}
            </button>
          </form>

          {/* Login Link Footer */}
          <div className="text-center text-xs text-base-content/60 pt-4 border-t border-base-200">
            အကောင့်ရှိပြီးသားလား?{' '}
            <Link
              to="/login"
              className="text-primary font-bold hover:underline"
            >
              အကောင့်ဝင်ရန် (Login)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
