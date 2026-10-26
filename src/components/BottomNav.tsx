import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sun, CalendarRange, Layers, PieChart } from 'lucide-react';

interface BottomNavProps {
  clothesCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ clothesCount }) => {
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center justify-center flex-1 py-2 text-[11px] font-semibold transition-colors ${
      isActive ? 'text-primary font-bold' : 'text-secondary hover:text-on-surface'
    }`;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-xl border-t border-surface-container pb-safe">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto px-2">
        <NavLink to="/" end className={getNavClass}>
          <Sun className="w-5 h-5 mb-1" />
          <span>Guide</span>
        </NavLink>

        <NavLink to="/planner" className={getNavClass}>
          <CalendarRange className="w-5 h-5 mb-1" />
          <span>Planner</span>
        </NavLink>

        <NavLink to="/closet" className={getNavClass}>
          <div className="relative">
            <Layers className="w-5 h-5 mb-1" />
            <span className="absolute -top-1 -right-2 px-1 text-[9px] rounded-full bg-primary text-white">
              {clothesCount}
            </span>
          </div>
          <span>Closet</span>
        </NavLink>

        <NavLink to="/insights" className={getNavClass}>
          <PieChart className="w-5 h-5 mb-1" />
          <span>Insights</span>
        </NavLink>
      </div>
    </nav>
  );
};
