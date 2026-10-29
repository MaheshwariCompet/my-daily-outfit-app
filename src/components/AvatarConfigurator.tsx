import React, { useState } from 'react';
import { User, Sliders, RotateCw, Layers } from 'lucide-react';
import { ClothingItem, AvatarMeasurements } from '../types/wardrobe';

interface AvatarConfiguratorProps {
  clothes: ClothingItem[];
}

export const AvatarConfigurator: React.FC<AvatarConfiguratorProps> = ({ clothes }) => {
  const [measurements, setMeasurements] = useState<AvatarMeasurements>({
    heightCm: 170,
    weightKg: 65,
    chestCm: 90,
    waistCm: 75,
    hipsCm: 95,
    posture: 'Neutral',
    bodyShape: 'Hourglass',
    genderStyle: 'Female Silhouette',
    drapeTension: 'Tailored Regular',
  });

  const [selectedGarmentId, setSelectedGarmentId] = useState<string>(clothes[0]?.id || '');
  const [rotationAngle, setRotationAngle] = useState(0);

  const selectedGarment = clothes.find((c) => c.id === selectedGarmentId) || clothes[0];

  return (
    <div className="max-w-4xl mx-auto py-2 px-4 space-y-6">
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container shadow-sm space-y-1">
        <h2 className="text-xl font-bold text-on-surface">3D Virtual Mannequin & Fit Preview</h2>
        <p className="text-xs text-secondary">
          Adjust your measurements to preview drape style using your actual uploaded garments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Mannequin Preview */}
        <div className="md:col-span-7 bg-surface-container-lowest p-6 rounded-2xl border border-surface-container flex flex-col items-center justify-between min-h-[420px]">
          <div className="relative w-full aspect-[3/4] flex items-center justify-center bg-surface-container-low rounded-2xl overflow-hidden p-6">
            <div style={{ transform: `rotateY(${rotationAngle}deg)` }} className="w-full h-full flex flex-col items-center justify-center transition-transform duration-500 relative">
              <svg viewBox="0 0 200 360" className="w-44 h-full drop-shadow-md">
                <ellipse cx="100" cy="40" rx="18" ry="24" fill="#cbdbf5" stroke="#30568b" strokeWidth="2" />
                <rect x="94" y="64" width="12" height="14" fill="#cbdbf5" />
                <path
                  d="M 68 78 L 72 150 L 68 210 L 132 210 L 128 150 L 132 78 Z"
                  fill="#30568b"
                  opacity="0.85"
                  stroke="#0b1c30"
                  strokeWidth="2"
                />
                <path d="M 72 210 L 76 340 M 128 210 L 124 340" stroke="#30568b" strokeWidth="10" strokeLinecap="round" />
                <path d="M 65 84 Q 52 140 54 185 M 135 84 Q 148 140 146 185" stroke="#30568b" strokeWidth="8" strokeLinecap="round" fill="none" />
              </svg>

              {selectedGarment && (
                <div className="absolute top-20 px-3 py-1 rounded-full bg-white shadow text-[10px] font-bold text-primary flex items-center gap-1.5 border border-primary/20">
                  <Layers className="w-3.5 h-3.5" />
                  <span>{selectedGarment.title}</span>
                </div>
              )}
            </div>

            <div className="absolute bottom-3 flex items-center gap-2 bg-surface-container-lowest/90 px-3 py-1.5 rounded-full border border-surface-container">
              <button onClick={() => setRotationAngle((prev) => (prev - 45 + 360) % 360)} className="p-1 hover:text-primary">
                <RotateCw className="w-4 h-4 transform -scale-x-100" />
              </button>
              <span className="text-[11px] font-bold text-secondary">Turn Mannequin</span>
              <button onClick={() => setRotationAngle((prev) => (prev + 45) % 360)} className="p-1 hover:text-primary">
                <RotateCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Controls & Garment Selector */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container space-y-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-primary" />
              <h3 className="font-bold text-xs text-on-surface uppercase tracking-wider">Measurements</h3>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-secondary uppercase mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={measurements.heightCm}
                  onChange={(e) => setMeasurements((prev) => ({ ...prev, heightCm: Number(e.target.value) }))}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-surface border border-surface-container text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-secondary uppercase mb-1">Waist (cm)</label>
                <input
                  type="number"
                  value={measurements.waistCm}
                  onChange={(e) => setMeasurements((prev) => ({ ...prev, waistCm: Number(e.target.value) }))}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-surface border border-surface-container text-xs"
                />
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container space-y-3">
            <span className="text-xs font-bold text-secondary uppercase tracking-wider block">
              Test Real Garments On Mannequin
            </span>
            {clothes.length === 0 ? (
              <p className="text-xs text-secondary py-2">No garments in closet to drape.</p>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {clothes.slice(0, 6).map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setSelectedGarmentId(c.id)}
                    className={`p-1.5 rounded-xl cursor-pointer border transition-all ${
                      selectedGarmentId === c.id ? 'border-primary ring-2 ring-primary/20' : 'border-surface-container'
                    }`}
                  >
                    <img src={c.imageUrl} alt={c.title} className="w-full aspect-square rounded-lg object-cover mb-1" />
                    <p className="text-[9px] font-bold truncate">{c.title}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};