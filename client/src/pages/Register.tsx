import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';
import { useUserRegister } from '../hook/auth';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');

  const { mutate: register, isPending } = useUserRegister();

  const handleRegister = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(name, email, password);
    register(
      { name, email, password, studentId },
      {
        onError: (e: any) => {
          toast.error(e.response.data.message);
        },
        onSuccess: (res: any) => {
          console.log(res);
          toast.success(res.data.message);
          navigate('/login');
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-xl w-full bg-base-100 border border-base-300 rounded-2xl shadow-xl p-8 md:p-10 space-y-6">
          {/* Header Title & Emoji */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary text-xl mb-1">
              ✨
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-base-content leading-relaxed">
              အကောင့်အသစ် ဖန်တီးမည်
            </h1>
            <p className="text-xs text-base-content/60 leading-relaxed max-w-sm mx-auto">
              Campus Lost & Found Hub တွင် ပစ္စည်းတင်ရန်နှင့် ရှာဖွေရန်
              စာရင်းသွင်းပါ။
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-base-content/80">
                  အမည် (Full Name)
                </label>
                <input
                  type="text"
                  required
                  disabled={isPending}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Student"
                  className="input input-bordered input-sm md:input-md w-full text-sm bg-base-200/50 focus:bg-base-100"
                />
              </div>

              {/* Student ID Field */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-base-content/80">
                  ကျောင်းသား အမှတ် (Student ID)
                </label>
                <input
                  type="text"
                  required
                  disabled={isPending}
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="PaKaPaTa-002370"
                  className="input input-bordered input-sm md:input-md w-full text-sm bg-base-200/50 focus:bg-base-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-base-content/80">
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
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-base-content/80">
                  စကားဝှက် (Password)
                </label>
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
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!name || !email || !password || !studentId || isPending}
              className={`btn btn-primary w-full text-sm font-bold shadow-md mt-4 ${
                isPending ? 'loading' : ''
              }`}
            >
              {isPending
                ? 'စာရင်းသွင်းနေပါသည်...'
                : 'အကောင့်လုပ်မည် (Register)'}
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
