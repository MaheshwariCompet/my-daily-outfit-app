import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ showText = true }) => {
  return (
    <div className="flex items-center gap-3 cursor-pointer group select-none">
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-surface-container-low border border-primary/10 shadow-sm group-hover:border-primary/30 transition-all duration-300">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 text-primary transition-transform group-hover:scale-105"
        >
          <path
            d="M16 6C17.6569 6 19 7.34315 19 9C19 10.3 18.17 11.4 17 11.8V13.2L26 20C26.7 20.5 26.2 22 25.3 22H6.7C5.8 22 5.3 20.5 6 20L15 13.2V11.8C13.83 11.4 13 10.3 13 9C13 7.34315 14.3431 6 16 6Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-primary"
          />
          <circle cx="22" cy="22" r="6" fill="#10b981" />
          <path
            d="M19.5 22L21.2 23.7L24.5 20.4"
            stroke="#ffffff"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-lg tracking-tight text-on-surface">
              My<span className="text-primary">DailyFit</span>
            </span>
            <span className="px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
              Ready
            </span>
          </div>
          <span className="text-[11px] font-medium text-secondary -mt-0.5">
            Anti-Stress Wardrobe Planner
          </span>
        </div>
      )}
    </div>
  );
};