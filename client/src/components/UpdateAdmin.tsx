import React, { useState, FormEvent, useEffect } from 'react';
import { Mail, Lock, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { useLogin } from '../store/useLogin';

const UpdateAdmin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { update , user } = useLogin();


useEffect(() => {
  console.log("user",user);
}, [user]);

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
    alert('Admin credentials updated successfully.');
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-sm border border-stone-200 p-8 md:p-10">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-full mb-4">
            <CheckCircle2 className="text-emerald-600" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-stone-800 tracking-tight">
            Update Admin
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            Keep your access secure
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleUpdate} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 ml-1">
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                size={18}
              />
              <input
                type="email"
                required
                value={user?.email || ''}
                placeholder="admin@charity.org"
                className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all text-stone-800 "
                readOnly
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 ml-1">
              New Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                size={18}
              />

              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all text-stone-800"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={() => update(password)}
            type="button"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-all shadow-md shadow-emerald-100 mt-4 active:scale-[0.98]"
          >
            Update Credentials
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <button
            type="button"
            className="text-stone-400 text-sm hover:text-stone-600 transition-colors"
          >
            Cancel and return to dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateAdmin;
