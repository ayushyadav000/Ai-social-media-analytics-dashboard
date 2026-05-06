import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  ThumbsUp,
  Share2,
  Calendar,
  Eye,
  Plus,
  TrendingUp,
  Clock,
  Search,
} from 'lucide-react';
import { Post } from '../types';
import { postsData } from '../data/mockData';

export const SocialFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(postsData);
  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Scheduling post state
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [newPlatform, setNewPlatform] = useState<'linkedin' | 'instagram' | 'twitter' | 'youtube'>('linkedin');
  const [newDate, setNewDate] = useState('2026-04-15 11:00 AM');
  const [newHashtags, setNewHashtags] = useState('');

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return (
          <svg className="w-4 h-4 text-pink-500 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
        );
      case 'linkedin':
        return (
          <svg className="w-4 h-4 text-blue-600 fill-current" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        );
      case 'twitter':
        return (
          <svg className="w-4 h-4 text-slate-800 dark:text-sky-400 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case 'youtube':
        return (
          <svg className="w-4 h-4 text-red-500 fill-current" viewBox="0 0 24 24">
            <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.507a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.507 9.388.507 9.388.507s7.517 0 9.388-.507a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    const hashtagsArr = newHashtags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)
      .map((tag) => (tag.startsWith('#') ? tag : `#${tag}`));

    const newPost: Post = {
      id: `post-${Date.now()}`,
      content: newContent,
      platform: newPlatform,
      status: 'scheduled',
      likes: 0,
      comments: 0,
      shares: 0,
      reach: 0,
      engagementRate: 0,
      scheduledDate: newDate,
      hashtags: hashtagsArr.length > 0 ? hashtagsArr : ['#SaaSPulse', '#Productivity'],
    };

    setPosts([newPost, ...posts]);
    setNewContent('');
    setNewHashtags('');
    setShowScheduleForm(false);
  };

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  const filteredPosts = posts.filter((post) => {
    const matchesPlatform = filterPlatform === 'all' || post.platform === filterPlatform;
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.hashtags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesPlatform && matchesStatus && matchesSearch;
  });

  const scheduledPosts = posts.filter((p) => p.status === 'scheduled');
  const trendingTags = [
    { tag: '#SaaSInnovation', reach: '184k', trend: '+12.4%' },
    { tag: '#UIUXTrends', reach: '92k', trend: '+8.1%' },
    { tag: '#GenerativeAI', reach: '240k', trend: '+18.9%' },
    { tag: '#AsynchronousWork', reach: '42k', trend: '+4.5%' },
    { tag: '#NoCodeSaaS', reach: '115k', trend: '+14.2%' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Feed & Filter Section (2 columns on large screens) */}
      <div className="lg:col-span-2 space-y-6">
        {/* Controls Bar */}
        <div className="rounded-xl border border-white/10 dark:border-white/5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-4 flex flex-col sm:flex-row gap-3 justify-between items-center">
          {/* Search */}
          <div className="relative w-full sm:max-w-xs">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Search className="w-3.5 h-3.5" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts or hashtags..."
              className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-lg text-xs">
              <button
                onClick={() => setFilterPlatform('all')}
                className={`px-2.5 py-1 rounded-md font-medium transition ${
                  filterPlatform === 'all'
                    ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                All Platforms
              </button>
              {['linkedin', 'instagram', 'twitter', 'youtube'].map((plat) => (
                <button
                  key={plat}
                  onClick={() => setFilterPlatform(plat)}
                  className={`px-2 py-1 rounded-md font-medium capitalize transition ${
                    filterPlatform === plat
                      ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  {plat === 'twitter' ? 'X' : plat}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowScheduleForm(!showScheduleForm)}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-500/10 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Post</span>
            </button>
          </div>
        </div>

        {/* Schedule Form Modal / Panel */}
        <AnimatePresence>
          {showScheduleForm && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.02] dark:bg-indigo-500/[0.03] backdrop-blur-md p-5"
            >
              <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                Schedule a Social Post
              </h4>
              <form onSubmit={handleCreatePost} className="space-y-4">
                <div>
                  <textarea
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    required
                    placeholder="Write your post details here..."
                    className="w-full h-20 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 dark:text-slate-500 mb-1">
                      Platform
                    </label>
                    <select
                      value={newPlatform}
                      onChange={(e: any) => setNewPlatform(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
                    >
                      <option value="linkedin">LinkedIn</option>
                      <option value="instagram">Instagram</option>
                      <option value="twitter">Twitter / X</option>
                      <option value="youtube">YouTube</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 dark:text-slate-500 mb-1">
                      Schedule Date / Time
                    </label>
                    <input
                      type="text"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 dark:text-slate-500 mb-1">
                      Hashtags (Comma separated)
                    </label>
                    <input
                      type="text"
                      value={newHashtags}
                      onChange={(e) => setNewHashtags(e.target.value)}
                      placeholder="e.g. SaaS, Tech, Design"
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowScheduleForm(false)}
                    className="px-3.5 py-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 text-xs font-semibold bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition shadow-md shadow-indigo-500/10 cursor-pointer"
                  >
                    Confirm Schedule
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Posts feed */}
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/20 dark:bg-slate-900/20 p-12 text-center">
              <p className="text-sm text-slate-400 dark:text-slate-500">No posts match your filters.</p>
              <button
                onClick={() => {
                  setFilterPlatform('all');
                  setFilterStatus('all');
                  setSearchQuery('');
                }}
                className="text-xs text-indigo-500 font-semibold underline mt-1"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-white/10 dark:border-white/5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-5 shadow-lg relative overflow-hidden"
              >
                {/* Header info */}
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-800">
                      {getPlatformIcon(post.platform)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <span className="capitalize">{post.platform} channel</span>
                        {post.status === 'scheduled' ? (
                          <span className="text-[9px] font-bold text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded">
                            Scheduled
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                            Published
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-0.5">
                        {post.status === 'scheduled' ? (
                          <>
                            <Clock className="w-3 h-3 text-amber-500" />
                            {post.scheduledDate}
                          </>
                        ) : (
                          <>
                            <Eye className="w-3 h-3 text-indigo-500" />
                            {(post.reach).toLocaleString()} estimated reach
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="text-[10px] text-slate-400 hover:text-rose-500 font-semibold py-1 px-2 hover:bg-rose-500/5 dark:hover:bg-rose-500/10 rounded transition"
                  >
                    Delete
                  </button>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {post.content}
                  </p>

                  {/* Hash tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {post.hashtags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-semibold text-indigo-500 hover:underline cursor-pointer bg-indigo-500/[0.04] px-2 py-0.5 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Optional Image */}
                  {post.image && (
                    <div className="w-full max-h-48 overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800 mt-2">
                      <img src={post.image} alt="Post content preview" className="w-full h-full object-cover" />
                    </div>
                  )}

                  {/* Stats Footer (Only shown for published posts) */}
                  {post.status === 'published' && (
                    <div className="flex items-center gap-6 border-t border-slate-100 dark:border-slate-800/80 pt-3.5 mt-3 text-xs text-slate-500">
                      <div className="flex items-center gap-1.5 hover:text-indigo-500 dark:hover:text-indigo-400 transition cursor-pointer">
                        <ThumbsUp className="w-4 h-4" />
                        <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                          {post.likes}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 hover:text-indigo-500 dark:hover:text-indigo-400 transition cursor-pointer">
                        <MessageSquare className="w-4 h-4" />
                        <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                          {post.comments}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 hover:text-indigo-500 dark:hover:text-indigo-400 transition cursor-pointer">
                        <Share2 className="w-4 h-4" />
                        <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                          {post.shares}
                        </span>
                      </div>
                      <div className="ml-auto text-[10px] font-bold bg-indigo-500/10 text-indigo-500 px-2.5 py-0.5 rounded-full">
                        {post.engagementRate}% Engagement
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Sidebar Utilities (Trending Hashtags & Calendar - 1 column) */}
      <div className="space-y-6">
        {/* Trending Hashtags */}
        <div className="rounded-2xl border border-white/10 dark:border-white/5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-5 shadow-lg">
          <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-500" />
            Trending AI Hashtags
          </h3>

          <div className="space-y-3">
            {trendingTags.map((tag, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-800">
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 hover:underline cursor-pointer">
                    {tag.tag}
                  </div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                    {tag.reach} potential reach
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                  {tag.trend}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Scheduled Posts Calendar Widget */}
        <div className="rounded-2xl border border-white/10 dark:border-white/5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-5 shadow-lg">
          <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-500" />
            Scheduled Queue ({scheduledPosts.length})
          </h3>

          <div className="space-y-3">
            {scheduledPosts.length === 0 ? (
              <div className="py-6 text-center">
                <p className="text-[11px] text-slate-400 dark:text-slate-500">No scheduled posts queue</p>
              </div>
            ) : (
              scheduledPosts.map((post) => (
                <div key={post.id} className="p-3 rounded-xl bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {getPlatformIcon(post.platform)}
                      <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 capitalize">
                        {post.platform}
                      </span>
                    </div>
                    <span className="text-[9px] font-semibold text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      Queue
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                    {post.content}
                  </p>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono font-medium">
                    {post.scheduledDate}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
