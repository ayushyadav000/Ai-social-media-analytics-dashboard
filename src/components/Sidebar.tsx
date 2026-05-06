import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  MessageSquare,
  Users2,
  Megaphone,
  Settings,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  collapsed: boolean;
  setCollapsed: (col: boolean) => void;
  unreadCount: number;
  activeCampaignsCount: number;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  unreadCount,
  activeCampaignsCount,
  onLogout,
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'posts', label: 'Posts & Feed', icon: FileText },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: unreadCount },
    { id: 'followers', label: 'Audience & Team', icon: Users2 },
    { id: 'campaigns', label: 'Campaigns', icon: Megaphone, badge: activeCampaignsCount },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 border-r border-white/10 dark:border-white/5 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl flex flex-col justify-between ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div>
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10 dark:border-white/5">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-indigo-950 dark:from-white dark:to-indigo-200 text-lg tracking-tight"
              >
                OmniPulse AI
              </motion.span>
            )}
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition shadow-sm"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1.5 mt-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-sm font-medium relative transition-all group ${
                  isActive
                    ? 'text-indigo-600 dark:text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/40 dark:hover:bg-slate-800/40'
                }`}
              >
                {/* Active Indicator Background */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabBg"
                    className="absolute inset-0 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-xl -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Left Active border bar */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabBar"
                    className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500"
                  />
                )}

                <Icon
                  className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-105 ${
                    isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'
                  }`}
                />

                {!collapsed && (
                  <span className="flex-1 text-left transition-opacity duration-150">
                    {item.label}
                  </span>
                )}

                {/* Badge if exists */}
                {!collapsed && item.badge !== undefined && item.badge > 0 && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white min-w-[18px] text-center shadow-sm">
                    {item.badge}
                  </span>
                )}

                {/* Mini dot badge when collapsed */}
                {collapsed && item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-rose-500 border border-white dark:border-slate-900" />
                )}

                {/* Tooltip on collapse */}
                {collapsed && (
                  <div className="absolute left-full ml-4 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition duration-150 shadow-md whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout / Bottom Section */}
      <div className="p-3 border-t border-white/10 dark:border-white/5 space-y-2">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all group relative"
        >
          <LogOut className="w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
          {!collapsed && <span>Logout</span>}
          {collapsed && (
            <div className="absolute left-full ml-4 px-2 py-1 bg-rose-600 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition duration-150 shadow-md whitespace-nowrap z-50">
              Logout
            </div>
          )}
        </button>

        {!collapsed && (
          <div className="p-3 rounded-xl bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-transparent border border-indigo-500/10 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
            <div className="font-semibold text-slate-800 dark:text-slate-300 flex items-center gap-1.5 mb-1 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              AI Insights Active
            </div>
            SaaS Campaign ROI is currently performing 14% higher than Q1 average.
          </div>
        )}
      </div>
    </aside>
  );
};
