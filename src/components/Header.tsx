import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Logo } from './Logo';
import { PlusCircle, Sparkles } from 'lucide-react';
import { UserProfile } from '../types/wardrobe';

interface HeaderProps {
  onOpenUploadModal: () => void;
  onOpenProfileModal: () => void;
  onOpenPaymentModal: () => void;
  clothesCount: number;
  profile: UserProfile;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenUploadModal,
  onOpenProfileModal,
  onOpenPaymentModal,
  clothesCount,
  profile,
}) => {
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 whitespace-nowrap ${
      isActive
        ? 'bg-surface-container-lowest text-primary shadow-sm'
        : 'text-secondary hover:text-on-surface'
    }`;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-surface/90 border-b border-surface-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <Link to="/">
          <Logo />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-surface-container-low p-1.5 rounded-full border border-surface-container">
          <NavLink to="/" end className={getNavClass}>
            Morning Guide
          </NavLink>

          <NavLink to="/planner" className={getNavClass}>
            Outfit Planner
          </NavLink>

          <NavLink to="/closet" className={getNavClass}>
            <span className="flex items-center gap-1.5">
              My Closet
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-secondary-container text-secondary font-bold">
                {clothesCount}
              </span>
            </span>
          </NavLink>

          <NavLink to="/avatar" className={getNavClass}>
            3D Mannequin
          </NavLink>

          <NavLink to="/travel" className={getNavClass}>
            Travel Capsule
          </NavLink>

          <NavLink to="/insights" className={getNavClass}>
            Insights
          </NavLink>

          <NavLink to="/settings" className={getNavClass}>
            Settings
          </NavLink>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenPaymentModal}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold shadow-sm transition-all ${
              profile.isPro
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-gradient-to-r from-primary to-primary-container text-white hover:opacity-95'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>{profile.isPro ? 'Pro Active' : 'Upgrade Pro'}</span>
          </button>

          <button
            onClick={onOpenUploadModal}
            className="hidden sm:flex items-center gap-1.5 bg-secondary-container hover:bg-surface-container-highest text-primary text-xs font-bold px-3.5 py-2 rounded-full border border-secondary-container transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Garment</span>
          </button>

          <button
            onClick={onOpenProfileModal}
            title={profile.isLoggedIn ? `Signed in as ${profile.name}` : 'Login'}
            className="flex items-center gap-2 pl-2 border-l border-surface-container focus:outline-none group"
          >
            <div className="relative">
              <img
                src={profile.avatarUrl}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary/60 transition-all"
              />
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ring-white ${
                  profile.isLoggedIn ? 'bg-emerald-500' : 'bg-slate-400'
                }`}
              />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};