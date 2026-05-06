import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  Globe,
  Check,
  User,
  Sliders,
  CreditCard,
  LogOut,
} from 'lucide-react';
import { NotificationItem } from '../types';

interface NavbarProps {
  notifications: NotificationItem[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
  language: string;
  setLanguage: (lang: string) => void;
  user: { name: string; email: string; avatar: string; role: string } | null;
  onLogout: () => void;
  onOpenSidebarMobile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  notifications,
  setNotifications,
  theme,
  setTheme,
  language,
  setLanguage,
  user,
  onLogout,
  onOpenSidebarMobile,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);

  const languages = [
    { code: 'en', name: 'English (US)' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Language helper: languages can be expanded in translations.

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-slate-200/50 dark:border-white/5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md px-4 flex items-center justify-between">
      {/* Mobile Sidebar Toggle & Search */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={onOpenSidebarMobile}
          className="md:hidden p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <Sliders className="w-5 h-5 transform rotate-90" />
        </button>

        <div className="relative w-full max-w-xs sm:max-w-sm hidden sm:block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 dark:text-slate-500">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search analytics, posts, campaigns..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-indigo-400/50 transition-all placeholder-slate-400 dark:placeholder-slate-500"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 sm:gap-3.5 relative z-40">
        {/* Multi-language Selector */}
        <div className="relative">
          <button
            onClick={() => {
              setShowLanguage(!showLanguage);
              setShowNotifications(false);
              setShowProfile(false);
            }}
            className="flex items-center gap-1.5 p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition cursor-pointer"
          >
            <Globe className="w-4 h-4" />
            <span className="text-xs font-semibold hidden md:inline uppercase">{language}</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          <AnimatePresence>
            {showLanguage && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-48 rounded-xl border border-white/10 bg-white dark:bg-slate-900 shadow-xl p-1.5 backdrop-blur-md"
              >
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Select Language
                </div>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setShowLanguage(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-left transition ${
                      language === lang.code
                        ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <span>{lang.name}</span>
                    {language === lang.code && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition cursor-pointer"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notifications Icon & Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
              setShowLanguage(false);
            }}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition cursor-pointer relative"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse border border-white dark:border-slate-900" />
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-white/10 bg-white dark:bg-slate-900 shadow-2xl p-4 backdrop-blur-md"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-2">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-white">Notifications</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      You have {unreadCount} unread alerts
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={markAllRead}
                      className="text-[10px] text-indigo-500 hover:underline font-semibold"
                    >
                      Mark all read
                    </button>
                    <span className="text-slate-300 dark:text-slate-700">|</span>
                    <button
                      onClick={clearNotifications}
                      className="text-[10px] text-rose-500 hover:underline font-semibold"
                    >
                      Clear all
                    </button>
                  </div>
                </div>

                <div className="max-h-64 overflow-y-auto space-y-2.5 pr-1.5">
                  {notifications.length === 0 ? (
                    <div className="py-8 text-center">
                      <p className="text-xs text-slate-400 dark:text-slate-500">No new notifications</p>
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-2.5 rounded-xl border transition-all ${
                          notif.read
                            ? 'bg-transparent border-transparent opacity-65'
                            : 'bg-indigo-500/[0.02] dark:bg-indigo-500/[0.04] border-indigo-500/5'
                        }`}
                      >
                        <div className="flex gap-2.5">
                          <span
                            className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                              notif.type === 'success'
                                ? 'bg-emerald-500'
                                : notif.type === 'alert'
                                ? 'bg-rose-500'
                                : 'bg-indigo-500'
                            }`}
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <h5 className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                                {notif.title}
                              </h5>
                              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                                {notif.time}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                              {notif.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Profile Info & Dropdown */}
        {user && (
          <div className="relative">
            <button
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
                setShowLanguage(false);
              }}
              className="flex items-center gap-2 p-1 rounded-full sm:rounded-xl sm:pr-2.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition cursor-pointer"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full border border-indigo-500/30 object-cover"
              />
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  {user.name}
                </div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500 leading-none">
                  {user.role}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 hidden sm:block text-slate-400" />
            </button>

            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-56 rounded-2xl border border-white/10 bg-white dark:bg-slate-900 shadow-2xl p-2 backdrop-blur-md"
                >
                  <div className="px-3 py-2.5 border-b border-slate-100 dark:border-slate-800">
                    <div className="text-xs font-bold text-slate-800 dark:text-white">{user.name}</div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 truncate mt-0.5">
                      {user.email}
                    </div>
                  </div>

                  <div className="p-1 space-y-0.5">
                    <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition">
                      <User className="w-4 h-4 text-indigo-500" />
                      <span>My Profile</span>
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition">
                      <Sliders className="w-4 h-4 text-purple-500" />
                      <span>Social Accounts</span>
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition">
                      <CreditCard className="w-4 h-4 text-emerald-500" />
                      <span>Billing & Plan</span>
                    </button>
                  </div>

                  <div className="border-t border-slate-100 dark:border-slate-800 p-1 mt-1">
                    <button
                      onClick={onLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </header>
  );
};
