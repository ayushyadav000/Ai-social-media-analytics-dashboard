import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  ThumbsUp,
  Percent,
  Eye,
  DollarSign,
  Megaphone,
  TrendingUp,
  Sparkles,
  Zap,
} from 'lucide-react';
import { WidgetItem } from '../components/DragDropWidgets';
import { InteractiveCharts } from '../components/InteractiveCharts';

interface DashboardViewProps {
  widgets: WidgetItem[];
  platform: 'total' | 'instagram' | 'youtube' | 'linkedin' | 'twitter';
  setPlatform: (p: 'total' | 'instagram' | 'youtube' | 'linkedin' | 'twitter') => void;
  onNavigateToTab: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  widgets,
  platform,
  setPlatform,
  onNavigateToTab,
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'followers':
        return <Users className="w-5 h-5 text-blue-500" />;
      case 'likes':
        return <ThumbsUp className="w-5 h-5 text-purple-500" />;
      case 'engagement':
        return <Percent className="w-5 h-5 text-pink-500" />;
      case 'reach':
        return <Eye className="w-5 h-5 text-emerald-500" />;
      case 'revenue':
        return <DollarSign className="w-5 h-5 text-amber-500" />;
      default:
        return <Megaphone className="w-5 h-5 text-sky-400" />;
    }
  };

  const visibleWidgets = widgets.filter((w) => w.visible);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-800 p-6 shadow-xl relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-1 text-[10px] font-bold bg-white/10 rounded-full uppercase tracking-wider flex items-center gap-1.5 w-max mb-3">
              <Zap className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
              Pulse Engine V2.6 Active
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Good day, growth creator!
            </h2>
            <p className="text-xs sm:text-sm text-indigo-100/80 max-w-xl mt-1.5 leading-relaxed">
              Your overall social media channels are experiencing an upward trajectory. Interactive campaigns are currently converting 12.4% higher than your average base.
            </p>
          </div>

          <button
            onClick={() => onNavigateToTab('posts')}
            className="px-5 py-2.5 rounded-xl bg-white text-indigo-700 hover:bg-slate-50 transition font-bold text-xs shadow-lg active:scale-95 flex items-center justify-center gap-1.5 self-start cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
            Launch AI Creator Panel
          </button>
        </div>
      </div>

      {/* Customizable Metric KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {visibleWidgets.map((widget) => (
          <motion.div
            key={widget.id}
            layoutId={`kpi-card-${widget.id}`}
            whileHover={{ y: -4, transition: { duration: 0.15 } }}
            className="rounded-2xl border border-white/10 dark:border-white/5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-4.5 shadow-lg relative overflow-hidden"
          >
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                {widget.title}
              </span>
              <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800">
                {getIcon(widget.type)}
              </div>
            </div>

            <div className="mt-2.5">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white font-mono">
                {widget.value}
              </h3>
              <p className="text-[10px] text-emerald-500 font-semibold flex items-center gap-0.5 mt-0.5">
                <TrendingUp className="w-3 h-3 text-emerald-500" />
                {widget.change}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Platform Filter Bar */}
      <div className="rounded-xl border border-white/10 dark:border-white/5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-3.5 flex flex-wrap gap-2.5 items-center justify-between shadow-sm">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          Filter Performance Charts:
        </span>

        <div className="flex flex-wrap items-center gap-1.5">
          {([
            { id: 'total', name: 'All Channels' },
            { id: 'instagram', name: 'Instagram' },
            { id: 'youtube', name: 'YouTube' },
            { id: 'linkedin', name: 'LinkedIn' },
            { id: 'twitter', name: 'Twitter/X' },
          ] as const).map((plat) => (
            <button
              key={plat.id}
              onClick={() => setPlatform(plat.id)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                platform === plat.id
                  ? 'bg-indigo-500 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {plat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Performance & Charts section */}
      <InteractiveCharts platform={platform} />
    </div>
  );
};
