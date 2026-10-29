import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { Mail, Lock, LogIn, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    login(email.trim(), name.trim());
    navigate('/closet');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-md bg-surface-container-lowest p-8 rounded-3xl border border-surface-container shadow-xl space-y-6">
        <div className="flex flex-col items-center text-center space-y-2">
          <Logo />
          <h2 className="text-2xl font-black text-on-surface pt-2">Sign In to MyDailyFit</h2>
          <p className="text-xs text-secondary max-w-xs">
            Organize your clothes and access your digital wardrobe anywhere.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-secondary uppercase mb-1">Your Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Maya Lin"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-surface border border-surface-container text-xs text-on-surface"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-secondary uppercase mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-secondary absolute left-3.5 top-3" />
              <input
                type="email"
                required
                placeholder="name@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-surface-container text-xs text-on-surface"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-secondary uppercase mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-secondary absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-surface-container text-xs text-on-surface"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-primary hover:bg-primary-container text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In to Your Closet</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export const LogoutScreen: React.FC = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleConfirmLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-sm bg-surface-container-lowest p-8 rounded-3xl border border-surface-container shadow-xl text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <div>
          <h3 className="text-xl font-bold text-on-surface">Sign Out of MyDailyFit?</h3>
          <p className="text-xs text-secondary mt-1">
            {user.email ? `Currently signed in as ${user.email}.` : 'You are currently in guest mode.'}
          </p>
        </div>

        <div className="space-y-2 pt-2">
          <button
            onClick={handleConfirmLogout}
            className="w-full py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow transition-all"
          >
            Confirm Sign Out
          </button>
          <button
            onClick={() => navigate('/closet')}
            className="w-full py-2.5 rounded-full border border-surface-container text-secondary text-xs font-bold hover:text-on-surface"
          >
            Cancel & Return
          </button>
        </div>
      </div>
    </div>
  );
};