import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users2, Check, Trash, Megaphone, Briefcase } from 'lucide-react';
import { TeamMember, Campaign } from '../types';
import { teamMembers as initialMembers, campaignsData } from '../data/mockData';

export const CollaborationPanel: React.FC = () => {
  const [members] = useState<TeamMember[]>(initialMembers);
  const [campaigns] = useState<Campaign[]>(campaignsData);

  // Simple task list state
  const [tasks, setTasks] = useState([
    { id: '1', text: 'Approve Spring launch YouTube script', assignee: 'Sophia Loren', completed: true },
    { id: '2', text: 'Increase budget on LinkedIn campaign', assignee: 'James Carter', completed: false },
    { id: '3', text: 'Design new Glassmorphic graphic pack', assignee: 'Maya Lin', completed: false },
    { id: '4', text: 'Sync Analytics report for Q2 budget meeting', assignee: 'You', completed: false },
  ]);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState('You');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    setTasks([
      ...tasks,
      {
        id: `task-${Date.now()}`,
        text: newTaskText,
        assignee: newTaskAssignee,
        completed: false,
      },
    ]);
    setNewTaskText('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-emerald-500';
      case 'busy':
        return 'bg-amber-500';
      default:
        return 'bg-slate-400';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Active Campaigns Tracker (2 Columns on large screens) */}
      <div className="lg:col-span-2 space-y-6">
        <div className="rounded-2xl border border-white/10 dark:border-white/5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-6 shadow-xl relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-indigo-500" />
                Active Marketing Campaigns
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Track ROI, conversions, and budget utilization in real-time
              </p>
            </div>
            <span className="text-[10px] font-bold text-indigo-500 bg-indigo-500/10 px-2.5 py-1 rounded-full">
              {campaigns.length} active promotions
            </span>
          </div>

          <div className="space-y-4">
            {campaigns.map((camp) => {
              const pctSpent = (camp.spent / camp.budget) * 100;
              return (
                <div
                  key={camp.id}
                  className="p-4.5 rounded-xl bg-slate-50/60 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-800 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {camp.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 capitalize">
                        Platform: {camp.platform} · Status:{' '}
                        <span
                          className={`font-semibold ${
                            camp.status === 'active'
                              ? 'text-emerald-500'
                              : camp.status === 'paused'
                              ? 'text-amber-500'
                              : 'text-indigo-500'
                          }`}
                        >
                          {camp.status}
                        </span>
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-800 dark:text-white block font-mono">
                        {camp.roi}x ROI
                      </span>
                      <span className="text-[9px] text-emerald-500 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        +{camp.conversions} Sales
                      </span>
                    </div>
                  </div>

                  {/* Budget Slider/Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>Spent: ${camp.spent.toLocaleString()}</span>
                      <span>Budget: ${camp.budget.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <motion.div
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${pctSpent}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Task Board Widget */}
        <div className="rounded-2xl border border-white/10 dark:border-white/5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-6 shadow-xl">
          <h3 className="text-base font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-4">
            <Briefcase className="w-5 h-5 text-indigo-500" />
            Team Task Manager
          </h3>

          <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              required
              placeholder="Assign a new task to your team..."
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <select
              value={newTaskAssignee}
              onChange={(e) => setNewTaskAssignee(e.target.value)}
              className="px-2 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
            >
              <option value="You">You</option>
              {members.map((m) => (
                <option key={m.id} value={m.name}>
                  {m.name.split(' ')[0]}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="px-4.5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md cursor-pointer"
            >
              Assign
            </button>
          </form>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                  task.completed
                    ? 'bg-emerald-500/[0.02] border-emerald-500/10 opacity-60 line-through'
                    : 'bg-slate-50/50 dark:bg-slate-950/20 border-slate-100 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center transition cursor-pointer ${
                      task.completed
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800'
                    }`}
                  >
                    {task.completed && <Check className="w-3.5 h-3.5" />}
                  </button>
                  <div>
                    <p className="text-xs text-slate-700 dark:text-slate-200">{task.text}</p>
                    <span className="text-[9px] text-slate-400 dark:text-slate-500">
                      Assigned to: <span className="font-semibold text-indigo-500">{task.assignee}</span>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-slate-400 hover:text-rose-500 p-1.5 rounded transition"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Member List (1 Column) */}
      <div className="space-y-6">
        <div className="rounded-2xl border border-white/10 dark:border-white/5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-5 shadow-lg">
          <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Users2 className="w-4.5 h-4.5 text-indigo-500" />
            Active Team Members ({members.length})
          </h3>

          <div className="space-y-4">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-800 transition hover:bg-slate-100/50 dark:hover:bg-slate-850/20"
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 object-cover"
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 ${getStatusColor(
                      member.status
                    )}`}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                      {member.name}
                    </h4>
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">
                      {member.role.split(' ')[0]}
                    </span>
                  </div>

                  {member.activeTask ? (
                    <p className="text-[10px] text-indigo-500 dark:text-indigo-400 mt-0.5 truncate font-medium">
                      🎯 {member.activeTask}
                    </p>
                  ) : (
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 italic">
                      No active task
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button className="w-full py-2 border border-dashed border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 rounded-xl text-xs font-semibold transition mt-4 cursor-pointer">
            + Invite Team Member
          </button>
        </div>
      </div>
    </div>
  );
};
