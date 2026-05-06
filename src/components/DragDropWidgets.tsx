import React from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowUp, ArrowDown, Move, RotateCcw } from 'lucide-react';

export interface WidgetItem {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  color: string;
  visible: boolean;
  type: 'followers' | 'likes' | 'engagement' | 'reach' | 'revenue' | 'campaigns';
}

interface DragDropWidgetsProps {
  widgets: WidgetItem[];
  setWidgets: React.Dispatch<React.SetStateAction<WidgetItem[]>>;
}

export const DragDropWidgets: React.FC<DragDropWidgetsProps> = ({ widgets, setWidgets }) => {
  const toggleVisibility = (id: string) => {
    setWidgets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, visible: !w.visible } : w))
    );
  };

  const moveWidget = (index: number, direction: 'up' | 'down') => {
    const nextIndex = direction === 'up' ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= widgets.length) return;

    const updated = [...widgets];
    const temp = updated[index];
    updated[index] = updated[nextIndex];
    updated[nextIndex] = temp;
    setWidgets(updated);
  };

  const resetWidgets = () => {
    setWidgets([
      { id: '1', title: 'Total Followers', value: '245,900', change: '+12.4% this mo', trend: 'up', color: 'from-blue-500 to-indigo-500', visible: true, type: 'followers' },
      { id: '2', title: 'Total Engagement', value: '4.8%', change: '+1.2% vs last week', trend: 'up', color: 'from-pink-500 to-rose-500', visible: true, type: 'engagement' },
      { id: '3', title: 'Total Likes', value: '184,200', change: '+8.5% this mo', trend: 'up', color: 'from-purple-500 to-indigo-600', visible: true, type: 'likes' },
      { id: '4', title: 'Estimated Reach', value: '1.89M', change: '+18.1% vs Q1', trend: 'up', color: 'from-emerald-400 to-teal-600', visible: true, type: 'reach' },
      { id: '5', title: 'Ad Revenue', value: '$14,250', change: '+$2,100 this mo', trend: 'up', color: 'from-amber-400 to-orange-500', visible: true, type: 'revenue' },
      { id: '6', title: 'Campaigns Run', value: '4 Active', change: 'ROI average 3.8x', trend: 'up', color: 'from-sky-400 to-blue-500', visible: true, type: 'campaigns' },
    ]);
  };

  return (
    <div className="rounded-2xl border border-white/10 dark:border-white/5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-5 shadow-xl">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Workspace Customizer
          </h3>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
            Hide/show metrics or change layout order
          </p>
        </div>

        <button
          onClick={resetWidgets}
          className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/5 dark:hover:bg-indigo-500/10 rounded-lg transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Layout
        </button>
      </div>

      <div className="space-y-2 max-h-[290px] overflow-y-auto pr-1">
        {widgets.map((widget, i) => (
          <motion.div
            key={widget.id}
            layout
            className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all ${
              widget.visible
                ? 'bg-slate-50/50 dark:bg-slate-950/20 border-slate-100 dark:border-slate-800'
                : 'bg-slate-200/20 dark:bg-slate-900/10 border-transparent opacity-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Move className="w-3.5 h-3.5 text-slate-400 drag-handle cursor-grab active:cursor-grabbing" />
              <div>
                <div className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  {widget.title}
                  {!widget.visible && (
                    <span className="text-[8px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.25 rounded">
                      Hidden
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">
                  Current: <span className="font-bold text-slate-600 dark:text-slate-400">{widget.value}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Order buttons */}
              <button
                disabled={i === 0}
                onClick={() => moveWidget(i, 'up')}
                className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-500 hover:bg-indigo-500/5 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
                title="Move Up"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
              <button
                disabled={i === widgets.length - 1}
                onClick={() => moveWidget(i, 'down')}
                className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-500 hover:bg-indigo-500/5 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
                title="Move Down"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>

              {/* Show/Hide button */}
              <button
                onClick={() => toggleVisibility(widget.id)}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  widget.visible
                    ? 'text-indigo-500 hover:bg-indigo-500/5 hover:text-indigo-600'
                    : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                }`}
                title={widget.visible ? 'Hide Widget' : 'Show Widget'}
              >
                {widget.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
