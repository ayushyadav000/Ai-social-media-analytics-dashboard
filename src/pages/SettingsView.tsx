import React, { useState } from 'react';
import {
  Sliders,
  Bell,
  Lock,
  Globe,
  Check,
  User,
} from 'lucide-react';

interface SettingsViewProps {
  user: { name: string; email: string; avatar: string; role: string } | null;
  setUser: React.Dispatch<React.SetStateAction<{ name: string; email: string; avatar: string; role: string } | null>>;
  language: string;
  setLanguage: (lang: string) => void;
  addNotification: (title: string, desc: string, type: 'alert' | 'success' | 'info' | 'message') => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  user,
  setUser,
  language,
  setLanguage,
  addNotification,
}) => {
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profileRole, setProfileRole] = useState(user?.role || '');
  
  // Integrations state
  const [connections, setConnections] = useState([
    { id: 'instagram', name: 'Instagram Creator Pro', handle: '@omnipulse_app', connected: true },
    { id: 'youtube', name: 'YouTube Analytics API', handle: 'OmniPulse SaaS Tech', connected: true },
    { id: 'linkedin', name: 'LinkedIn Share API', handle: 'Alex Rivera (Staff)', connected: true },
    { id: 'twitter', name: 'Twitter/X Post Integration', handle: '@OmniPulseAI', connected: false },
  ]);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // Preference switches
  const [prefSwitches, setPrefSwitches] = useState({
    emailAlerts: true,
    budgetWarnings: true,
    weeklyDigests: false,
    analyticsSpikes: true,
  });

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileName.trim()) return;

    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        name: profileName,
        role: profileRole,
      };
    });

    addNotification(
      'Profile Updated',
      'Your administrative account details were updated successfully.',
      'success'
    );
  };

  const handleToggleConnection = (id: string) => {
    setLoadingId(id);
    setTimeout(() => {
      setConnections((prev) =>
        prev.map((c) => {
          if (c.id === id) {
            const nextConnected = !c.connected;
            addNotification(
              nextConnected ? 'Integration Connected' : 'Integration Disconnected',
              `${c.name} has been ${nextConnected ? 'successfully linked' : 'removed'} from your workspace.`,
              nextConnected ? 'success' : 'info'
            );
            return { ...c, connected: nextConnected, handle: nextConnected ? '@omnipulse_new' : 'Not linked' };
          }
          return c;
        })
      );
      setLoadingId(null);
    }, 1200);
  };

  const toggleSwitch = (key: keyof typeof prefSwitches) => {
    setPrefSwitches((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const languages = [
    { code: 'en', name: 'English (US)' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Profile & General Settings (2 Cols on desktop) */}
      <div className="lg:col-span-2 space-y-6">
        {/* Profile Settings */}
        <div className="rounded-2xl border border-white/10 dark:border-white/5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-6 shadow-xl">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800/80">
            <User className="w-4.5 h-4.5 text-indigo-500" />
            Administrative Profile Settings
          </h3>

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 pb-2">
              <img
                src={user?.avatar}
                alt="Profile avatar"
                className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500/20 shadow-md"
              />
              <div className="text-center sm:text-left">
                <h4 className="text-xs font-bold text-slate-800 dark:text-white">{user?.name}</h4>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{user?.email}</p>
                <span className="text-[9px] font-bold text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded-full mt-1.5 inline-block">
                  Role: {user?.role}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                  Job Role / Title
                </label>
                <input
                  type="text"
                  value={profileRole}
                  onChange={(e) => setProfileRole(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-4.5 py-2 text-xs font-bold bg-indigo-500 text-white rounded-xl shadow-md hover:bg-indigo-600 transition cursor-pointer"
              >
                Save Profile Changes
              </button>
            </div>
          </form>
        </div>

        {/* Social Accounts Connections */}
        <div className="rounded-2xl border border-white/10 dark:border-white/5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-6 shadow-xl">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800/80">
            <Sliders className="w-4.5 h-4.5 text-indigo-500" />
            Social Account Integrations
          </h3>

          <div className="space-y-3.5">
            {connections.map((conn) => (
              <div
                key={conn.id}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-800"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {conn.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 font-mono">
                    {conn.connected ? conn.handle : 'Integration inactive'}
                  </p>
                </div>

                <button
                  onClick={() => handleToggleConnection(conn.id)}
                  disabled={loadingId !== null}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                    conn.connected
                      ? 'bg-rose-500/10 text-rose-500 hover:bg-rose-500/20'
                      : 'bg-indigo-500 text-white hover:bg-indigo-600'
                  }`}
                >
                  {loadingId === conn.id && (
                    <svg className="animate-spin h-3.5 w-3.5 text-current" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  )}
                  <span>
                    {loadingId === conn.id ? 'Syncing...' : conn.connected ? 'Disconnect' : 'Connect API'}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications and Multi-language Prefs (1 Col) */}
      <div className="space-y-6">
        {/* Languages Selection Panel */}
        <div className="rounded-2xl border border-white/10 dark:border-white/5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-5 shadow-lg">
          <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 text-indigo-500" />
            Workspace Language
          </h3>

          <div className="space-y-1.5">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-left transition ${
                  language === lang.code
                    ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-300'
                }`}
              >
                <span>{lang.name}</span>
                {language === lang.code && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>

        {/* Real-time Alerts Panel */}
        <div className="rounded-2xl border border-white/10 dark:border-white/5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-5 shadow-lg">
          <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Bell className="w-4 h-4 text-indigo-500" />
            Alert Preferences
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Email alerts</h4>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">Receive campaign ROI updates</p>
              </div>
              <button
                onClick={() => toggleSwitch('emailAlerts')}
                className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                  prefSwitches.emailAlerts ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-800'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${
                    prefSwitches.emailAlerts ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Ad budget alerts</h4>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">Notify at 90% budget cap</p>
              </div>
              <button
                onClick={() => toggleSwitch('budgetWarnings')}
                className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                  prefSwitches.budgetWarnings ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-800'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${
                    prefSwitches.budgetWarnings ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Weekly summaries</h4>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">Send digest every Monday</p>
              </div>
              <button
                onClick={() => toggleSwitch('weeklyDigests')}
                className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                  prefSwitches.weeklyDigests ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-800'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${
                    prefSwitches.weeklyDigests ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="p-3 bg-indigo-500/5 rounded-xl border border-indigo-500/10 mt-4 flex gap-2">
            <Lock className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Any toggled settings are saved locally to your browser profile session storage automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
