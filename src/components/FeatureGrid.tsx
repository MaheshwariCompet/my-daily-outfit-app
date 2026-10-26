import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarRange, Sparkles, History, Ruler, ArrowRight } from 'lucide-react';

interface FeatureGridProps {
  onGenerateCombo: () => void;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({ onGenerateCombo }) => {
  const navigate = useNavigate();

  const tools = [
    {
      title: 'Saved Clothes Plans',
      desc: 'Browse multi-day schedules, weekly presets, and saved capsule rotations',
      icon: CalendarRange,
      action: () => navigate('/planner'),
      badge: 'Active Presets',
    },
    {
      title: 'Outfit Combinations Generator',
      desc: 'Let smart rules pair complementary colors and weather-safe layers instantly',
      icon: Sparkles,
      action: onGenerateCombo,
      badge: 'Click to Generate',
    },
    {
      title: 'Wear History & Rotation Log',
      desc: 'Visualize past outfits, detect unworn clothes, and sustain conscious habits',
      icon: History,
      action: () => navigate('/insights'),
      badge: '45 Days Logged',
    },
    {
      title: 'Fit & Fabric Comfort Notes',
      desc: 'Simple ratings, sizing tips, and wash cycle tracking to keep outfits fresh',
      icon: Ruler,
      action: () => navigate('/closet'),
      badge: '14 Ready Pieces',
    },
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-on-surface">Wardrobe Workflow Tools</h2>
        <span className="text-xs uppercase font-bold text-secondary tracking-wider">
          Daily Decision Architecture
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map((tool, idx) => {
          const Icon = tool.icon;
          return (
            <div
              key={idx}
              onClick={tool.action}
              className="group bg-surface-container-lowest p-5 rounded-2xl border border-surface-container hover:border-primary/40 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-surface-container text-secondary">
                    {tool.badge}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-on-surface group-hover:text-primary transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-secondary mt-1 leading-relaxed">{tool.desc}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
                <span>Open tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
