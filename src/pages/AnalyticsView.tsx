import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  RefreshCw,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { weeklyAnalytics, dashboardMetrics } from '../data/mockData';

interface AnalyticsViewProps {
  platform: 'total' | 'instagram' | 'youtube' | 'linkedin' | 'twitter';
  setPlatform: (p: 'total' | 'instagram' | 'youtube' | 'linkedin' | 'twitter') => void;
  addNotification: (title: string, desc: string, type: 'alert' | 'success' | 'info' | 'message') => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  platform,
  setPlatform,
  addNotification,
}) => {
  const [exporting, setExporting] = useState(false);
  const [exportStep, setExportStep] = useState('');
  const [exportSuccess, setExportSuccess] = useState(false);
  const [timePeriod, setTimePeriod] = useState<'weekly' | 'monthly'>('weekly');

  const handleExport = () => {
    setExporting(true);
    setExportSuccess(false);

    const steps = [
      'Aggregating database performance values...',
      'Compiling glassmorphic timeline charts...',
      'Running AI Brand Sentiment analysis models...',
      'Packing assets into PDF report schema...',
    ];

    let i = 0;
    setExportStep(steps[i]);

    const interval = setInterval(() => {
      i++;
      if (i < steps.length) {
        setExportStep(steps[i]);
      } else {
        clearInterval(interval);
        setExporting(false);
        setExportSuccess(true);
        addNotification(
          'Analytics Export Complete',
          'Your multi-platform performance PDF report has been downloaded successfully.',
          'success'
        );
        setTimeout(() => setExportSuccess(false), 4000);
      }
    }, 9000 / steps.length); // Total 9 seconds simulation
  };

  const getPlatformIcon = (plat: string) => {
    switch (plat) {
      case 'instagram':
        return (
          <svg className="w-4 h-4 text-pink-500 fill-current inline-block mr-1" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
        );
      case 'linkedin':
        return (
          <svg className="w-4 h-4 text-blue-600 fill-current inline-block mr-1" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        );
      case 'twitter':
        return (
          <svg className="w-4 h-4 text-slate-800 dark:text-sky-400 fill-current inline-block mr-1" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case 'youtube':
        return (
          <svg className="w-4 h-4 text-red-500 fill-current inline-block mr-1" viewBox="0 0 24 24">
            <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.507a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.507 9.388.507 9.388.507s7.517 0 9.388-.507a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">Detailed Analytics deep-dive</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Compare metrics, view platform-wise benchmarks, and generate customized reports
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExport}
            disabled={exporting}
            className="px-4 py-2 bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold text-xs rounded-xl shadow-md hover:shadow-indigo-500/10 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
          >
            {exporting ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>{exporting ? 'Generating Report...' : 'Export Analytics as PDF'}</span>
          </button>
        </div>
      </div>

      {/* Export Loader Overlay */}
      <AnimatePresence>
        {exporting && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.02] dark:bg-indigo-500/[0.04] p-5 flex items-center gap-4 shadow-inner"
          >
            <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500">
              <RefreshCw className="w-5 h-5 animate-spin" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Generating Secure PDF Export</h4>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 animate-pulse">
                {exportStep}
              </p>
            </div>
          </motion.div>
        )}

        {exportSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.02] dark:bg-emerald-500/[0.04] p-5 flex items-center gap-4 shadow-sm"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">PDF Report Ready!</h4>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                The document has been securely compiled and delivered to your download folder.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Platform Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {([
          { id: 'instagram', label: 'Instagram', metrics: dashboardMetrics.instagram },
          { id: 'youtube', label: 'YouTube', metrics: dashboardMetrics.youtube },
          { id: 'linkedin', label: 'LinkedIn', metrics: dashboardMetrics.linkedin },
          { id: 'twitter', label: 'Twitter / X', metrics: dashboardMetrics.twitter },
        ] as const).map((plat) => (
          <div
            key={plat.id}
            onClick={() => setPlatform(plat.id)}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              platform === plat.id
                ? 'bg-indigo-500/10 dark:bg-indigo-500/15 border-indigo-500/30 shadow-md'
                : 'bg-white/40 dark:bg-slate-900/40 border-white/10 dark:border-white/5 hover:bg-slate-100/50 dark:hover:bg-slate-800/40 shadow'
            }`}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                {getPlatformIcon(plat.id)}
                {plat.label}
              </span>
              <span className="text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                +{plat.metrics.growth}% Growth
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Audience:</span>
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                  {plat.metrics.followers.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Engagement:</span>
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                  {plat.metrics.engagementRate}%
                </span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Ads Revenue:</span>
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                  ${plat.metrics.revenue.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Data Table */}
      <div className="rounded-2xl border border-white/10 dark:border-white/5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Calendar className="w-4.5 h-4.5 text-indigo-500" />
              Multi-Channel Comparison Table
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Aggregated social metric values by day of week
            </p>
          </div>

          {/* Toggle switcher */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-xs self-start sm:self-auto">
            <button
              onClick={() => setTimePeriod('weekly')}
              className={`px-3 py-1.5 rounded-md font-medium transition ${
                timePeriod === 'weekly'
                  ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Weekly
            </button>
            <button
              disabled
              onClick={() => setTimePeriod('monthly')}
              className="px-3 py-1.5 rounded-md font-medium text-slate-300 dark:text-slate-600 cursor-not-allowed"
              title="Monthly table in compilation"
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800">
          <table className="w-full text-xs text-left text-slate-500 dark:text-slate-400 border-collapse">
            <thead className="bg-slate-50/80 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[9px] font-bold border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="px-5 py-3">Day</th>
                <th className="px-5 py-3">All Channels (Audience)</th>
                <th className="px-5 py-3 text-pink-500">Instagram</th>
                <th className="px-5 py-3 text-red-500">YouTube</th>
                <th className="px-5 py-3 text-blue-500">LinkedIn</th>
                <th className="px-5 py-3 text-sky-400">Twitter/X</th>
                <th className="px-5 py-3 text-emerald-500 text-right">Ad Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {weeklyAnalytics.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors"
                >
                  <td className="px-5 py-3 font-bold text-slate-800 dark:text-slate-200">
                    {row.name}
                  </td>
                  <td className="px-5 py-3 font-mono font-medium text-slate-700 dark:text-slate-300">
                    +{row.total}k
                  </td>
                  <td className="px-5 py-3 font-mono">+{row.instagram}k</td>
                  <td className="px-5 py-3 font-mono">+{row.youtube}k</td>
                  <td className="px-5 py-3 font-mono">+{row.linkedin}k</td>
                  <td className="px-5 py-3 font-mono">+{row.twitter}k</td>
                  <td className="px-5 py-3 font-mono font-bold text-slate-800 dark:text-white text-right">
                    ${row.revenue.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
