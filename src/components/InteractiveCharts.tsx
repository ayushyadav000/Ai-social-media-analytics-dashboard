import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Users, Award } from 'lucide-react';
import { weeklyAnalytics, monthlyAnalytics, sentimentData } from '../data/mockData';

interface ChartsProps {
  platform: 'total' | 'instagram' | 'youtube' | 'linkedin' | 'twitter';
}

export const InteractiveCharts: React.FC<ChartsProps> = ({ platform }) => {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly'>('weekly');
  const [activeMetric, setActiveMetric] = useState<'revenue' | 'engagement' | 'followers'>('revenue');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const data = timeframe === 'weekly' ? weeklyAnalytics : monthlyAnalytics;

  // Platform styling
  const platformColors = {
    total: { stroke: '#6366f1', fill: 'rgba(99, 102, 241, 0.15)', text: 'text-indigo-500' },
    instagram: { stroke: '#ec4899', fill: 'rgba(236, 72, 153, 0.15)', text: 'text-pink-500' },
    youtube: { stroke: '#ef4444', fill: 'rgba(239, 68, 68, 0.15)', text: 'text-red-500' },
    linkedin: { stroke: '#0a66c2', fill: 'rgba(10, 102, 194, 0.15)', text: 'text-blue-500' },
    twitter: { stroke: '#1da1f2', fill: 'rgba(29, 161, 242, 0.15)', text: 'text-sky-400' },
  };

  const currentColor = platformColors[platform];

  // Map values based on selected metric
  const getVal = (item: any) => {
    if (activeMetric === 'followers') {
      return platform === 'total' ? item.total : item[platform];
    }
    if (activeMetric === 'revenue') {
      // Scale down slightly for non-total platforms
      const baseRev = item.revenue;
      if (platform === 'total') return baseRev;
      if (platform === 'instagram') return baseRev * 0.45;
      if (platform === 'youtube') return baseRev * 0.35;
      if (platform === 'linkedin') return baseRev * 0.13;
      return baseRev * 0.07;
    }
    if (activeMetric === 'engagement') {
      const baseEng = item.engagement;
      if (platform === 'total') return baseEng;
      if (platform === 'instagram') return baseEng * 1.15;
      if (platform === 'youtube') return baseEng * 1.3;
      if (platform === 'linkedin') return baseEng * 0.7;
      return baseEng * 0.6;
    }
    return 0;
  };

  const values = data.map(getVal);
  const maxVal = Math.max(...values) * 1.15 || 1;
  const minVal = Math.min(...values) * 0.85 > 0 ? Math.min(...values) * 0.85 : 0;

  // Chart Dimensions
  const chartHeight = 220;
  const chartWidth = 500;
  const paddingX = 40;
  const paddingY = 20;

  const getCoordinates = () => {
    const points: { x: number; y: number; label: string; rawValue: number }[] = [];
    const stepX = (chartWidth - paddingX * 2) / (data.length - 1);
    
    for (let i = 0; i < data.length; i++) {
      const x = paddingX + i * stepX;
      const val = values[i];
      // Normalize y
      const y = chartHeight - paddingY - ((val - minVal) / (maxVal - minVal || 1)) * (chartHeight - paddingY * 2);
      points.push({ x, y, label: data[i].name, rawValue: val });
    }
    return points;
  };

  const coords = getCoordinates();

  // SVG Line path creation
  const linePath = coords.reduce((acc, point, i) => {
    return i === 0 ? `M ${point.x} ${point.y}` : `${acc} L ${point.x} ${point.y}`;
  }, '');

  // Gradient area path creation
  const areaPath = coords.length > 0 
    ? `${linePath} L ${coords[coords.length - 1].x} ${chartHeight - paddingY} L ${coords[0].x} ${chartHeight - paddingY} Z` 
    : '';

  // Format metric value
  const formatValue = (val: number) => {
    if (activeMetric === 'revenue') {
      return `$${Math.round(val).toLocaleString()}`;
    }
    if (activeMetric === 'followers') {
      return `${Math.round(val).toLocaleString()}`;
    }
    return `${val.toFixed(1)}%`;
  };

  // Pie/Donut Chart variables (Share of total)
  const platforms = [
    { key: 'instagram', name: 'Instagram', val: 112000, color: 'bg-pink-500', fill: '#ec4899' },
    { key: 'youtube', name: 'YouTube', val: 64000, color: 'bg-red-500', fill: '#ef4444' },
    { key: 'linkedin', name: 'LinkedIn', val: 38400, color: 'bg-blue-600', fill: '#2563eb' },
    { key: 'twitter', name: 'Twitter/X', val: 31500, color: 'bg-sky-400', fill: '#38bdf8' },
  ];
  const totalFollowers = platforms.reduce((acc, p) => acc + p.val, 0);

  // SVG Donut calculation
  let accumulatedPercent = 0;
  const donutSlices = platforms.map((p) => {
    const percent = p.val / totalFollowers;
    const startPercent = accumulatedPercent;
    accumulatedPercent += percent;
    return { ...p, percent, startPercent };
  });

  // Coordinates for pie segments are calculated directly via stroke-dasharray properties.

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Interactive Line Chart - 2 cols on desktop */}
      <div className="lg:col-span-2 rounded-2xl border border-white/10 dark:border-white/5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-6 shadow-xl relative overflow-hidden">
        {/* Decorative background gradients */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-2xl" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-2">
              <TrendingUp className={`w-5 h-5 ${currentColor.text}`} />
              Performance Timeline
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">
              Showing {activeMetric} analytics for {platform === 'total' ? 'all channels' : platform}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Timeframe selector */}
            <div className="flex bg-slate-200/50 dark:bg-slate-800/60 p-0.5 rounded-lg text-xs">
              <button
                onClick={() => setTimeframe('weekly')}
                className={`px-3 py-1.5 rounded-md font-medium transition ${
                  timeframe === 'weekly'
                    ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setTimeframe('monthly')}
                className={`px-3 py-1.5 rounded-md font-medium transition ${
                  timeframe === 'monthly'
                    ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                Monthly
              </button>
            </div>

            {/* Metric Selector */}
            <div className="flex bg-slate-200/50 dark:bg-slate-800/60 p-0.5 rounded-lg text-xs">
              {(['revenue', 'followers', 'engagement'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setActiveMetric(m)}
                  className={`px-2 py-1.5 rounded-md font-medium capitalize transition ${
                    activeMetric === m
                      ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  {m === 'revenue' ? '$ Rev' : m === 'followers' ? 'Aud' : 'Eng'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SVG Chart area */}
        <div className="relative w-full h-[240px] mt-4">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full h-full overflow-visible"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={currentColor.stroke} stopOpacity={0.4} />
                <stop offset="100%" stopColor={currentColor.stroke} stopOpacity={0.0} />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((p, idx) => {
              const y = paddingY + p * (chartHeight - paddingY * 2);
              const gridVal = maxVal - p * (maxVal - minVal);
              return (
                <g key={idx} className="opacity-30">
                  <line
                    x1={paddingX}
                    y1={y}
                    x2={chartWidth - paddingX}
                    y2={y}
                    stroke="currentColor"
                    strokeWidth="0.5"
                    strokeDasharray="4 4"
                    className="text-slate-400 dark:text-slate-600"
                  />
                  <text
                    x={paddingX - 8}
                    y={y + 4}
                    textAnchor="end"
                    fontSize="9"
                    className="fill-slate-400 dark:fill-slate-500 font-mono"
                  >
                    {activeMetric === 'revenue'
                      ? `$${Math.round(gridVal)}`
                      : activeMetric === 'followers' && gridVal >= 1000
                      ? `${(gridVal / 1000).toFixed(0)}k`
                      : gridVal.toFixed(1)}
                  </text>
                </g>
              );
            })}

            {/* Filled Area path with Framer Motion */}
            {coords.length > 0 && (
              <motion.path
                d={areaPath}
                fill="url(#chartGradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              />
            )}

            {/* Stroke Line with Framer Motion */}
            {coords.length > 0 && (
              <motion.path
                d={linePath}
                fill="none"
                stroke={currentColor.stroke}
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0.2 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
            )}

            {/* Horizontal Labels */}
            {coords.map((pt, idx) => (
              <text
                key={idx}
                x={pt.x}
                y={chartHeight - 4}
                textAnchor="middle"
                fontSize="10"
                className="fill-slate-400 dark:fill-slate-400 font-medium"
              >
                {pt.label}
              </text>
            ))}

            {/* Interactive Circles / Hover points */}
            {coords.map((pt, idx) => (
              <g
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                className="cursor-pointer"
              >
                {/* Larger transparent hover target */}
                <circle cx={pt.x} cy={pt.y} r="14" fill="transparent" />
                
                {/* Visual point */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={hoveredIndex === idx ? '6' : '4'}
                  fill={currentColor.stroke}
                  stroke={hoveredIndex === idx ? '#fff' : 'transparent'}
                  strokeWidth="2"
                  className="transition-all duration-150"
                />
              </g>
            ))}
          </svg>

          {/* Floating Tooltip inside container */}
          <AnimatePresence>
            {hoveredIndex !== null && coords[hoveredIndex] && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute z-30 bg-white/90 dark:bg-slate-900/95 border border-white/20 dark:border-white/10 rounded-xl p-3 shadow-xl backdrop-blur-md text-xs"
                style={{
                  left: `${(coords[hoveredIndex].x / chartWidth) * 100}%`,
                  top: `${(coords[hoveredIndex].y / chartHeight) * 100 - 30}%`,
                  transform: 'translate(-50%, -100%)',
                }}
              >
                <div className="font-semibold text-slate-800 dark:text-white">
                  {coords[hoveredIndex].label}
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block"
                    style={{ backgroundColor: currentColor.stroke }}
                  />
                  <span className="text-slate-500 dark:text-slate-400 capitalize">
                    {activeMetric}:
                  </span>
                  <span className="font-bold text-slate-800 dark:text-white font-mono">
                    {formatValue(coords[hoveredIndex].rawValue)}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Platform Comparison Donut & Sentiment Section */}
      <div className="flex flex-col gap-6">
        {/* Audience Share (Donut Chart) */}
        <div className="rounded-2xl border border-white/10 dark:border-white/5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-6 shadow-xl relative overflow-hidden flex-1">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-500/10 dark:bg-pink-500/5 rounded-full blur-2xl" />
          
          <h3 className="text-base font-semibold text-slate-800 dark:text-white flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-indigo-500" />
            Audience Distribution
          </h3>

          <div className="flex items-center justify-between gap-2 h-full py-2">
            {/* Donut SVG */}
            <div className="relative w-32 h-32 flex-shrink-0">
              <svg viewBox="0 0 42 42" className="w-full h-full transform -rotate-90">
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="4.2" />
                {donutSlices.map((slice, i) => {
                  const strokeDasharray = `${slice.percent * 100} ${100 - slice.percent * 100}`;
                  const strokeDashoffset = 100 - slice.startPercent * 100 + 25; // 25 coordinates with the -90deg rotation
                  return (
                    <circle
                      key={i}
                      cx="21"
                      cy="21"
                      r="15.915"
                      fill="transparent"
                      stroke={slice.fill}
                      strokeWidth="4.5"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-300 hover:stroke-[5.2] cursor-pointer"
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">Total</span>
                <span className="text-sm font-bold text-slate-800 dark:text-white font-mono">245.9k</span>
              </div>
            </div>

            {/* Legend items */}
            <div className="flex flex-col gap-2.5 text-xs flex-1 ml-4 justify-center">
              {donutSlices.map((p, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 min-w-[75px]">
                    <span className={`w-2.5 h-2.5 rounded-full ${p.color}`} />
                    <span className="text-slate-600 dark:text-slate-400 truncate">{p.name}</span>
                  </div>
                  <span className="font-semibold text-slate-800 dark:text-white font-mono text-right">
                    {(p.percent * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Brand Sentiment Card */}
        <div className="rounded-2xl border border-white/10 dark:border-white/5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-6 shadow-xl relative overflow-hidden flex-1">
          <h3 className="text-base font-semibold text-slate-800 dark:text-white flex items-center gap-2 mb-3">
            <Award className="w-5 h-5 text-emerald-500" />
            AI Sentiment Analysis
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Audience response on <span className="capitalize font-semibold text-indigo-500">{platform}</span> mentions
          </p>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-emerald-500 font-medium flex items-center gap-1">🟢 Positive</span>
                <span className="font-bold text-slate-800 dark:text-white font-mono">
                  {sentimentData[platform].positive}%
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <motion.div
                  className="bg-emerald-500 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${sentimentData[platform].positive}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-1">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500 dark:text-slate-400">Neutral</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 font-mono">
                    {sentimentData[platform].neutral}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <motion.div
                    className="bg-slate-400 dark:bg-slate-500 h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${sentimentData[platform].neutral}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-rose-500">Negative</span>
                  <span className="font-semibold text-rose-600 dark:text-rose-400 font-mono">
                    {sentimentData[platform].negative}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <motion.div
                    className="bg-rose-500 h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${sentimentData[platform].negative}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
