import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sun, CalendarRange, Layers, User, Plane, Settings } from 'lucide-react';

interface BottomNavProps {
  clothesCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ clothesCount }) => {
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center justify-center flex-1 py-1.5 text-[10px] font-semibold transition-colors ${
      isActive ? 'text-primary font-bold' : 'text-secondary hover:text-on-surface'
    }`;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-xl border-t border-surface-container pb-safe">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto px-1">
        <NavLink to="/" end className={getNavClass}>
          <Sun className="w-4 h-4 mb-0.5" />
          <span>Guide</span>
        </NavLink>

        <NavLink to="/planner" className={getNavClass}>
          <CalendarRange className="w-4 h-4 mb-0.5" />
          <span>Planner</span>
        </NavLink>

        <NavLink to="/closet" className={getNavClass}>
          <div className="relative">
            <Layers className="w-4 h-4 mb-0.5" />
            <span className="absolute -top-1 -right-2 px-1 text-[8px] rounded-full bg-primary text-white">
              {clothesCount}
            </span>
          </div>
          <span>Closet</span>
        </NavLink>

        <NavLink to="/avatar" className={getNavClass}>
          <User className="w-4 h-4 mb-0.5" />
          <span>3D Fit</span>
        </NavLink>

        <NavLink to="/travel" className={getNavClass}>
          <Plane className="w-4 h-4 mb-0.5" />
          <span>Travel</span>
        </NavLink>

        <NavLink to="/settings" className={getNavClass}>
          <Settings className="w-4 h-4 mb-0.5" />
          <span>Sync</span>
        </NavLink>
      </div>
    </nav>
  );
};