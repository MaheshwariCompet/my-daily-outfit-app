import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Logo } from './Logo';
import { PlusCircle } from 'lucide-react';
import { UserProfile } from '../types/wardrobe';

interface HeaderProps {
  onOpenUploadModal: () => void;
  onOpenProfileModal: () => void;
  clothesCount: number;
  profile: UserProfile;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenUploadModal,
  onOpenProfileModal,
  clothesCount,
  profile,
}) => {
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    `px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
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

        <nav className="hidden md:flex items-center gap-1.5 bg-surface-container-low p-1.5 rounded-full border border-surface-container">
          <NavLink to="/" end className={getNavClass}>
            Morning Guide
          </NavLink>

          <NavLink to="/planner" className={getNavClass}>
            Outfit Planner
          </NavLink>

          <NavLink to="/closet" className={getNavClass}>
            <span className="flex items-center gap-2">
              My Closet
              <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-secondary-container text-secondary font-bold">
                {clothesCount}
              </span>
            </span>
          </NavLink>

          <NavLink to="/insights" className={getNavClass}>
            Insights & Habits
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenUploadModal}
            className="flex items-center gap-2 bg-primary hover:bg-primary-container text-white text-sm font-medium px-4 py-2.5 rounded-full shadow-sm hover:shadow active:scale-95 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Add Clothes</span>
          </button>

          <button
            onClick={onOpenProfileModal}
            title={profile.isLoggedIn ? `Logged in as ${profile.name}` : 'Login / Profile'}
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
