import React, { useState } from 'react';
import { Settings, Mail, Calendar, Check, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const SettingsScreen: React.FC = () => {
  const { user, updateAccountSettings } = useAuth();
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const toggleGmail = () => {
    const next = !user.connectedGmail;
    updateAccountSettings({ connectedGmail: next });
    setSyncStatus(next ? 'Connected Gmail account for order confirmation parsing.' : 'Disconnected Gmail.');
  };

  const toggleCalendar = () => {
    const next = !user.connectedCalendar;
    updateAccountSettings({ connectedCalendar: next });
    setSyncStatus(next ? 'Connected Calendar permission for outfit scheduling.' : 'Disconnected Calendar.');
  };

  const handleTestCalendarEventFetch = () => {
    setIsSyncing(true);
    setSyncStatus('Syncing calendar events from your device...');
    setTimeout(() => {
      setIsSyncing(false);
      setSyncStatus('Calendar in sync! Outfit suggestions now adapt to your scheduled events.');
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto py-2 px-4 space-y-6">
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container shadow-sm space-y-1">
        <h2 className="text-xl font-bold text-on-surface">Account Settings & Connected Accounts</h2>
        <p className="text-xs text-secondary">
          Manage synchronization for email receipts and calendar event titles.
        </p>
      </div>

      {syncStatus && (
        <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{syncStatus}</span>
        </div>
      )}

      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-on-surface">Connected Services</h3>

        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-surface border border-surface-container flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-red-600" />
              <div>
                <h4 className="font-bold text-xs text-on-surface">Gmail Order Receipt Sync</h4>
                <p className="text-[11px] text-secondary">Automatically import clothing orders from Zara, Amazon, etc.</p>
              </div>
            </div>
            <button
              onClick={toggleGmail}
              className={`px-4 py-2 rounded-full text-xs font-bold ${
                user.connectedGmail ? 'bg-rose-50 text-rose-600' : 'bg-primary text-white'
              }`}
            >
              {user.connectedGmail ? 'Disconnect Gmail' : 'Connect Gmail'}
            </button>
          </div>

          <div className="p-4 rounded-xl bg-surface border border-surface-container flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <div>
                <h4 className="font-bold text-xs text-on-surface">Smart Calendar Sync</h4>
                <p className="text-[11px] text-secondary">Allow the app to read event titles to match your dress code.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {user.connectedCalendar && (
                <button
                  onClick={handleTestCalendarEventFetch}
                  disabled={isSyncing}
                  className="px-3 py-1.5 rounded-full bg-surface-container text-xs font-bold text-primary flex items-center gap-1"
                >
                  <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                  Sync Events
                </button>
              )}
              <button
                onClick={toggleCalendar}
                className={`px-4 py-2 rounded-full text-xs font-bold ${
                  user.connectedCalendar ? 'bg-rose-50 text-rose-600' : 'bg-primary text-white'
                }`}
              >
                {user.connectedCalendar ? 'Disconnect Calendar' : 'Connect Calendar'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};