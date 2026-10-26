import React, { useState } from 'react';
import { X, LogIn, LogOut, User } from 'lucide-react';
import { UserProfile } from '../types/wardrobe';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
}) => {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);

  if (!isOpen) return null;

  const handleToggleLogin = () => {
    if (profile.isLoggedIn) {
      onUpdateProfile({
        ...profile,
        isLoggedIn: false,
        name: 'Guest User',
        email: 'guest@mydailyfit.local',
      });
    } else {
      onUpdateProfile({
        ...profile,
        isLoggedIn: true,
        name: name || 'Priya Sharma',
        email: email || 'priya@mydailyfit.local',
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-sm shadow-2xl border border-surface-container p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-surface-container pb-3">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-base text-on-surface">Account & Profile</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-secondary hover:text-on-surface">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col items-center text-center space-y-2">
          <div className="relative">
            <img
              src={profile.avatarUrl}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/30"
            />
            <span
              className={`absolute bottom-0 right-0 w-4 h-4 rounded-full ring-2 ring-white ${
                profile.isLoggedIn ? 'bg-emerald-500' : 'bg-slate-400'
              }`}
            />
          </div>
          <div>
            <h4 className="font-bold text-sm text-on-surface">{profile.name}</h4>
            <p className="text-xs text-secondary">{profile.email}</p>
          </div>
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
              profile.isLoggedIn ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
            }`}
          >
            {profile.isLoggedIn ? 'Signed In' : 'Guest Mode'}
          </span>
        </div>

        {profile.isLoggedIn && (
          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1">Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container text-xs text-on-surface"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container text-xs text-on-surface"
              />
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-surface-container">
          <button
            onClick={handleToggleLogin}
            className={`w-full py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              profile.isLoggedIn
                ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                : 'bg-primary text-white hover:bg-primary-container shadow'
            }`}
          >
            {profile.isLoggedIn ? (
              <>
                <LogOut className="w-4 h-4" />
                Sign Out
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                Sign In to MyDailyFit
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
