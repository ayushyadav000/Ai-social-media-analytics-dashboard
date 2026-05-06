import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Heart,
} from 'lucide-react';
import { AuthPages } from './components/AuthPages';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { DashboardView } from './pages/DashboardView';
import { AnalyticsView } from './pages/AnalyticsView';
import { SocialFeed } from './components/SocialFeed';
import { AICaptionGenerator } from './components/AICaptionGenerator';
import { ChatSupport } from './components/ChatSupport';
import { CollaborationPanel } from './components/CollaborationPanel';
import { SettingsView } from './pages/SettingsView';
import { DragDropWidgets, WidgetItem } from './components/DragDropWidgets';
import { notificationsList } from './data/mockData';
import { NotificationItem } from './types';

export default function App() {
  const [user, setUser] = useState<{ name: string; email: string; avatar: string; role: string } | null>(null);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [language, setLanguage] = useState<string>('en');
  const [loading, setLoading] = useState<boolean>(false);
  
  // Dashboard Interactive State
  const [platform, setPlatform] = useState<'total' | 'instagram' | 'youtube' | 'linkedin' | 'twitter'>('total');
  const [notifications, setNotifications] = useState<NotificationItem[]>(notificationsList);

  // Reorderable widgets list
  const [widgets, setWidgets] = useState<WidgetItem[]>([
    { id: '1', title: 'Total Followers', value: '245,900', change: '+12.4% this mo', trend: 'up', color: 'from-blue-500 to-indigo-500', visible: true, type: 'followers' },
    { id: '2', title: 'Total Engagement', value: '4.8%', change: '+1.2% vs last week', trend: 'up', color: 'from-pink-500 to-rose-500', visible: true, type: 'engagement' },
    { id: '3', title: 'Total Likes', value: '184,200', change: '+8.5% this mo', trend: 'up', color: 'from-purple-500 to-indigo-600', visible: true, type: 'likes' },
    { id: '4', title: 'Estimated Reach', value: '1.89M', change: '+18.1% vs Q1', trend: 'up', color: 'from-emerald-400 to-teal-600', visible: true, type: 'reach' },
    { id: '5', title: 'Ad Revenue', value: '$14,250', change: '+$2,100 this mo', trend: 'up', color: 'from-amber-400 to-orange-500', visible: true, type: 'revenue' },
    { id: '6', title: 'Campaigns Run', value: '4 Active', change: 'ROI average 3.8x', trend: 'up', color: 'from-sky-400 to-blue-500', visible: true, type: 'campaigns' },
  ]);

  // Sync dark/light theme classes on body
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Trigger tab simulation skeleton loader
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const addNotification = (title: string, desc: string, type: 'alert' | 'success' | 'info' | 'message') => {
    const newItem: NotificationItem = {
      id: `notif-${Date.now()}`,
      title,
      description: desc,
      time: 'Just now',
      read: false,
      type,
    };
    setNotifications((prev) => [newItem, ...prev]);
  };

  const handleLogout = () => {
    setUser(null);
  };

  // If user is not logged in, display the Authentication Flow
  if (!user) {
    return <AuthPages onLoginSuccess={(u) => setUser(u)} />;
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {/* Decorative background blurs */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-indigo-500/5 dark:bg-indigo-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-purple-500/5 dark:bg-purple-500/10 blur-[120px]" />
      </div>

      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setMobileSidebarOpen(false);
        }}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        unreadCount={unreadCount}
        activeCampaignsCount={4}
        onLogout={handleLogout}
      />

      {/* Mobile Sidebar Overlay Drawer */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black md:hidden"
            />
            {/* Mobile Drawer */}
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed inset-y-0 left-0 z-50 w-64 md:hidden"
            >
              <Sidebar
                activeTab={activeTab}
                setActiveTab={(tab) => {
                  setActiveTab(tab);
                  setMobileSidebarOpen(false);
                }}
                collapsed={false}
                setCollapsed={() => {}}
                unreadCount={unreadCount}
                activeCampaignsCount={4}
                onLogout={handleLogout}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className={`transition-all duration-300 min-h-screen flex flex-col ${collapsed ? 'md:pl-20' : 'md:pl-64'}`}>
        {/* Top Navbar */}
        <Navbar
          notifications={notifications}
          setNotifications={setNotifications}
          theme={theme}
          setTheme={setTheme}
          language={language}
          setLanguage={setLanguage}
          user={user}
          onLogout={handleLogout}
          onOpenSidebarMobile={() => setMobileSidebarOpen(true)}
        />

        {/* Content Section */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          <AnimatePresence mode="wait">
            {loading ? (
              /* High-fidelity Glassmorphic Loading Skeleton */
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="h-28 bg-slate-200/50 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl animate-pulse w-full border border-slate-100 dark:border-slate-800" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="h-64 bg-slate-200/50 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl animate-pulse col-span-2 border border-slate-100 dark:border-slate-800" />
                  <div className="h-64 bg-slate-200/50 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl animate-pulse border border-slate-100 dark:border-slate-800" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Tab Pages Router switch */}
                {activeTab === 'dashboard' && (
                  <>
                    <DashboardView
                      widgets={widgets}
                      platform={platform}
                      setPlatform={setPlatform}
                      onNavigateToTab={setActiveTab}
                    />

                    {/* Drag-and-Drop and AI insights bottom panels */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
                      <DragDropWidgets widgets={widgets} setWidgets={setWidgets} />
                      
                      {/* AI-powered insights panel */}
                      <div className="rounded-2xl border border-white/10 dark:border-white/5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl" />
                        <div>
                          <span className="text-[9px] font-bold text-indigo-500 bg-indigo-500/10 px-2.5 py-0.75 rounded-full flex items-center gap-1.5 w-max mb-3">
                            <Sparkles className="w-3.5 h-3.5 animate-bounce" />
                            AI Insight Assistant
                          </span>
                          <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-2">
                            Optimizing Conversion ROI
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                            Our LLM models have analyzed your YouTube & LinkedIn postings. Video descriptions focusing on <span className="font-semibold text-indigo-500">asynchronous workflow solutions</span> obtain a 42% higher retention spike within the first 15 seconds.
                          </p>
                        </div>

                        <div className="space-y-2 text-xs border-t border-slate-100 dark:border-slate-800/80 pt-4">
                          <div className="flex items-center justify-between text-slate-500">
                            <span>Predicted Growth Index:</span>
                            <span className="font-bold text-slate-800 dark:text-white">+18.4% Q2</span>
                          </div>
                          <div className="flex items-center justify-between text-slate-500">
                            <span>Top Converting Category:</span>
                            <span className="font-bold text-indigo-500">SaaS Automation</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'analytics' && (
                  <AnalyticsView
                    platform={platform}
                    setPlatform={setPlatform}
                    addNotification={addNotification}
                  />
                )}

                {activeTab === 'posts' && (
                  <>
                    <AICaptionGenerator />
                    <SocialFeed />
                  </>
                )}

                {activeTab === 'messages' && <ChatSupport />}

                {activeTab === 'followers' && <CollaborationPanel />}

                {activeTab === 'settings' && (
                  <SettingsView
                    user={user}
                    setUser={setUser}
                    language={language}
                    setLanguage={setLanguage}
                    addNotification={addNotification}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Beautiful Footer */}
        <footer className="py-6 mt-auto border-t border-slate-200/50 dark:border-white/5 text-center text-[11px] text-slate-400 dark:text-slate-500 flex flex-col sm:flex-row items-center justify-between px-6 gap-2">
          <div>
            &copy; 2026 <span className="font-bold text-slate-600 dark:text-slate-400"> Ayush Yadav</span>. All rights reserved worldwide.
          </div>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            <span>for high-performance builders.</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
