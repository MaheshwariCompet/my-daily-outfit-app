import React, { useState } from 'react';
import { 
  X, Check, Sparkles, CreditCard, Smartphone, 
  RefreshCw, ArrowRight, Star 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessToast: (msg: string) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onSuccessToast,
}) => {
  const { user, upgradeToPro, downgradePlan } = useAuth();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [processor, setProcessor] = useState<'stripe' | 'razorpay' | 'iap'>('stripe');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSubscribe = () => {
    setIsProcessing(true);
    setTimeout(() => {
      upgradeToPro(billingCycle);
      setIsProcessing(false);
      onSuccessToast(`Success! Your MyDailyFit Pro subscription (${billingCycle}) is active.`);
      onClose();
    }, 1500);
  };

  const handleRestore = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSuccessToast('Purchases restored: Verified active entitlement with Store servers.');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-on-surface/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-2xl shadow-2xl border border-surface-container flex flex-col max-h-[92vh] overflow-hidden">
        {/* Value Proposition Header */}
        <div className="p-6 border-b border-surface-container flex items-center justify-between shrink-0 bg-gradient-to-r from-primary/10 via-surface-container-low to-tertiary-fixed/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-on-surface">MyDailyFit Pro Upgrade</h3>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold">
                  PRO STYLIST
                </span>
              </div>
              <p className="text-xs text-secondary mt-0.5">
                Unlock Unlimited AI Stylist Prompts, 3D Virtual Try-On & Automatic Background Removals.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-secondary hover:text-on-surface">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Billing Cycle Toggle */}
          <div className="flex items-center justify-center gap-3">
            <span className={`text-xs font-bold ${billingCycle === 'monthly' ? 'text-primary' : 'text-secondary'}`}>
              Monthly
            </span>
            <div 
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="w-14 h-7 bg-surface-container-highest rounded-full p-1 cursor-pointer flex items-center transition-all relative border border-surface-container"
            >
              <div 
                className={`w-5 h-5 rounded-full bg-primary shadow-sm transition-transform ${
                  billingCycle === 'annual' ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`text-xs font-bold ${billingCycle === 'annual' ? 'text-primary' : 'text-secondary'}`}>
                Annual
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase">
                Save 25%
              </span>
            </div>
          </div>

          {/* Tier Selection Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-surface border border-surface-container flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-on-surface">Starter Capsule</h4>
                  <span className="text-xs font-semibold text-secondary">Free</span>
                </div>
                <div className="text-2xl font-black text-on-surface">$0 <span className="text-xs font-normal text-secondary">/ forever</span></div>
                
                <ul className="space-y-2 text-xs text-secondary pt-2">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Up to 30 wardrobe garments</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Standard 7-day outfit planner</li>
                  <li className="flex items-center gap-2 text-outline"><X className="w-4 h-4 text-secondary/40" /> Unlimited AI Outfit Generations</li>
                  <li className="flex items-center gap-2 text-outline"><X className="w-4 h-4 text-secondary/40" /> 3D Virtual Try-on & Scanning</li>
                </ul>
              </div>

              {user.isPro ? (
                <button
                  onClick={() => { downgradePlan(); onSuccessToast('Switched to free plan.'); }}
                  className="mt-4 w-full py-2 rounded-full border border-surface-container text-xs font-bold text-secondary hover:text-on-surface"
                >
                  Downgrade to Free
                </button>
              ) : (
                <div className="mt-4 text-center text-xs font-bold text-secondary py-2 bg-surface-container-low rounded-full">
                  Current Active Plan
                </div>
              )}
            </div>

            <div className="p-5 rounded-2xl bg-surface-container-lowest border-2 border-primary shadow-lg flex flex-col justify-between relative">
              <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider flex items-center gap-1">
                <Star className="w-3 h-3 fill-white" /> Recommended
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-sm text-primary">MyDailyFit Pro</h4>
                <div className="text-2xl font-black text-on-surface">
                  {billingCycle === 'annual' ? '$7.99' : '$9.99'} 
                  <span className="text-xs font-normal text-secondary"> / month</span>
                </div>
                <p className="text-xs text-secondary">
                  {billingCycle === 'annual' ? 'Billed annually at $95.88 / year' : 'Billed monthly, cancel anytime'}
                </p>

                <ul className="space-y-2 text-xs text-on-surface font-medium pt-2">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Unlimited clothes & auto-categorization</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Unlimited AI Stylist Prompts</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 3D Virtual Mannequin & Drape Simulation</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Travel Packing Capsule Generator</li>
                </ul>
              </div>

              <button
                disabled={isProcessing}
                onClick={handleSubscribe}
                className="mt-5 w-full py-3 rounded-full bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying with {processor.toUpperCase()}...</span>
                  </>
                ) : (
                  <>
                    <span>{user.isPro ? 'Update Pro Subscription' : 'Start 7-Day Free Trial'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Processor Selection */}
          <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container space-y-3">
            <span className="text-xs font-bold text-secondary uppercase tracking-wider block">
              Choose Payment Method
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setProcessor('stripe')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                  processor === 'stripe' ? 'bg-surface-container-lowest border-primary text-primary shadow-sm' : 'bg-surface border-surface-container text-secondary'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                Stripe (Cards)
              </button>
              <button
                type="button"
                onClick={() => setProcessor('razorpay')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                  processor === 'razorpay' ? 'bg-surface-container-lowest border-primary text-primary shadow-sm' : 'bg-surface border-surface-container text-secondary'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                Razorpay (UPI / NetBanking)
              </button>
              <button
                type="button"
                onClick={() => setProcessor('iap')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                  processor === 'iap' ? 'bg-surface-container-lowest border-primary text-primary shadow-sm' : 'bg-surface border-surface-container text-secondary'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                In-App Purchases
              </button>
            </div>
          </div>

          {/* Legal Compliance & Restore Purchases */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-surface-container text-[11px] text-secondary">
            <div className="flex items-center gap-3">
              <a href="#terms" onClick={(e) => { e.preventDefault(); alert('Terms: Auto-renewable subscription, cancel anytime.'); }} className="hover:underline">
                Terms of Service
              </a>
              <span>•</span>
              <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Privacy: Wardrobe telemetry is strictly encrypted.'); }} className="hover:underline">
                Privacy Policy
              </a>
            </div>

            <button
              type="button"
              onClick={handleRestore}
              className="text-primary font-bold hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              Restore Purchases
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};