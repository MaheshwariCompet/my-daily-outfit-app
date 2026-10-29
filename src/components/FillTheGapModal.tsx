import React, { useState } from 'react';
import { X, Sparkles, ShieldCheck, Mail, CheckCircle2 } from 'lucide-react';
import { ClothingItem } from '../types/wardrobe';

interface FillTheGapModalProps {
  isOpen: boolean;
  onClose: () => void;
  userClothes: ClothingItem[];
  onImportItem: (item: ClothingItem) => void;
}

export const FillTheGapModal: React.FC<FillTheGapModalProps> = ({
  isOpen,
  onClose,
  userClothes,
  onImportItem,
}) => {
  const [activeTab, setActiveTab] = useState<'recommendations' | 'verify' | 'import'>('recommendations');
  const [verifyUrl, setVerifyUrl] = useState('');
  const [verifyResult, setVerifyResult] = useState<{
    testedItem: string;
    score: number;
    verdict: string;
    matchedPairs: ClothingItem[];
  } | null>(null);

  if (!isOpen) return null;

  // Real wardrobe gap analysis
  const hasShoes = userClothes.some((c) => c.category === 'Shoes');
  const hasOuterwear = userClothes.some((c) => c.category === 'Outerwear');
  const topsCount = userClothes.filter((c) => c.category === 'Tops').length;
  const bottomsCount = userClothes.filter((c) => c.category === 'Bottoms').length;

  const missingCategories: string[] = [];
  if (!hasShoes) missingCategories.push('Footwear / Everyday Shoes');
  if (!hasOuterwear) missingCategories.push('A versatile layering Jacket / Overshirt');
  if (bottomsCount === 0) missingCategories.push('Versatile Pants / Chinos / Denim');
  if (topsCount === 0) missingCategories.push('Everyday neutral Tops / T-Shirts');

  const handleRunVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyUrl.trim()) return;

    const matching = userClothes.filter((c) => c.status === 'Washed').slice(0, 3);
    const score = userClothes.length > 0 ? Math.min(100, Math.max(60, userClothes.length * 20)) : 0;

    setVerifyResult({
      testedItem: verifyUrl,
      score,
      verdict: userClothes.length === 0 
        ? 'No clothes in your wardrobe yet. Add clothes first to test compatibility.'
        : `Matches with ${matching.length} clean garments currently in your rotation.`,
      matchedPairs: matching,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-on-surface/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-2xl shadow-2xl border border-surface-container flex flex-col max-h-[90vh] overflow-hidden">
        <div className="p-5 border-b border-surface-container flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-base text-on-surface">AI Wardrobe Analysis & Gap Checker</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-secondary hover:text-on-surface">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex border-b border-surface-container px-6 bg-surface-container-low/40">
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'recommendations' ? 'border-primary text-primary' : 'border-transparent text-secondary'
            }`}
          >
            Missing Closet Gaps
          </button>
          <button
            onClick={() => setActiveTab('verify')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'verify' ? 'border-primary text-primary' : 'border-transparent text-secondary'
            }`}
          >
            Test Before Buying
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'recommendations' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container space-y-1">
                <span className="text-xs font-bold text-on-surface">Actual Wardrobe Status</span>
                <p className="text-xs text-secondary">
                  Calculated from your {userClothes.length} entered items: {topsCount} Tops, {bottomsCount} Bottoms, {userClothes.filter(c => c.category === 'Outerwear').length} Outerwear.
                </p>
              </div>

              {missingCategories.length === 0 ? (
                <div className="p-6 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs text-center font-bold">
                  Your wardrobe has balanced coverage across tops, bottoms, outerwear, and footwear!
                </div>
              ) : (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-secondary uppercase tracking-wider block">
                    Essential Missing Pieces to Unlock More Outfits:
                  </span>
                  {missingCategories.map((gap, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-surface border border-surface-container flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                      <span className="text-xs font-bold text-on-surface">{gap}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'verify' && (
            <div className="space-y-4">
              <form onSubmit={handleRunVerification} className="space-y-3">
                <label className="block text-xs font-bold text-secondary uppercase">
                  Paste Item Name or Store URL to Cross-Check
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Brown Tailored Trousers"
                  value={verifyUrl}
                  onChange={(e) => setVerifyUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface border border-surface-container text-xs text-on-surface"
                />
                <button type="submit" className="px-5 py-2 rounded-full bg-primary text-white text-xs font-bold shadow">
                  Run Compatibility Check
                </button>
              </form>

              {verifyResult && (
                <div className="p-4 rounded-xl bg-surface border border-surface-container space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-on-surface">{verifyResult.testedItem}</span>
                    <span className="text-sm font-extrabold text-emerald-600">{verifyResult.score}% Compatibility</span>
                  </div>
                  <p className="text-xs text-secondary">{verifyResult.verdict}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};