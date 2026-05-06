import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Copy, Check, Hash, Calendar, BarChart, RefreshCw } from 'lucide-react';
import { aiHashtagSuggestions, postingTimes } from '../data/mockData';

export const AICaptionGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState<'professional' | 'casual' | 'bold' | 'witty'>('professional');
  const [platform, setPlatform] = useState<'linkedin' | 'instagram' | 'twitter' | 'youtube'>('linkedin');
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCaption, setGeneratedCaption] = useState('');
  const [copied, setCopied] = useState(false);
  const [sentimentProjection, setSentimentProjection] = useState<number | null>(null);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate API generation delay
    setTimeout(() => {
      let caption = '';
      const hashtags = aiHashtagSuggestions[platform === 'linkedin' ? 'SaaS' : platform === 'instagram' ? 'Design' : platform === 'twitter' ? 'Marketing' : 'Tech'] || [];
      const tagsStr = hashtags.slice(0, 4).join(' ');

      if (platform === 'linkedin') {
        if (tone === 'professional') {
          caption = `🚀 Excited to announce our progress on ${topic}! Our engineering team has worked tirelessly to build an asynchronous integration designed specifically to simplify workflows for modern remote teams. \n\nCheck out our full product brief in the comments! 👇\n\n${tagsStr}`;
        } else if (tone === 'bold') {
          caption = `🔥 Stop wasting hours on manual integrations. With ${topic}, we are completely reimagining how high-performance organizations operate. \n\nAre you ready to level up? Drop a comment or DM us to get early beta access today! ⚡\n\n${tagsStr}`;
        } else {
          caption = `Work shouldn't feel like a chore. That's why we built ${topic} — to give you your time back. ⏱️\n\nTake a look at how we're modernizing workflow automation and let us know your favorite feature. \n\n${tagsStr}`;
        }
      } else if (platform === 'instagram') {
        caption = `Designing a better experience with ${topic} 💎✨ We focus on the tiny details so you can focus on the big ideas. Minimal clutter, gorgeous glassmorphic themes, and buttery smooth transitions. \n\nWhich view is your absolute favorite? Comment below! 👇\n\n${tagsStr}`;
      } else if (platform === 'twitter') {
        caption = `Most startups fail because of poor workflow optimization. \n\nWe solved that with ${topic}. Streamlined, fully automated, and 10x faster. \n\nRead the breakdown: link.co/pulse 📊⚡\n\n${tagsStr}`;
      } else {
        caption = `How to Scale Your Workflows in 2026 Using ${topic}! 💻🎬 \n\nIn this complete breakdown, we walk through the exact pipeline we used to triple our active engagement rate and cut manual overhead by 40%.\n\nSubscribe for more SaaS insights! \n\n${tagsStr}`;
      }

      setGeneratedCaption(caption);
      setSentimentProjection(tone === 'professional' ? 96 : tone === 'bold' ? 92 : 88);
      setIsGenerating(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCaption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleHashtagClick = (tag: string) => {
    if (generatedCaption) {
      setGeneratedCaption((prev) => {
        if (prev.includes(tag)) return prev;
        return `${prev} ${tag}`;
      });
    }
  };

  const getRecommendedTime = () => {
    return postingTimes[platform] || { time: '9:00 AM', days: 'Mon-Wed', score: 90 };
  };

  return (
    <div className="rounded-2xl border border-white/10 dark:border-white/5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-6 shadow-xl relative overflow-hidden">
      {/* Sparkle background glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-500">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-800 dark:text-white">AI Creator Panel</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Generate high-converting, platform-ready copy in seconds</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              What is your post about?
            </label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. A new product launch showcasing custom interactive widgets..."
              className="w-full h-24 px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder-slate-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Target Platform
              </label>
              <select
                value={platform}
                onChange={(e: any) => setPlatform(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              >
                <option value="linkedin">LinkedIn Post</option>
                <option value="instagram">Instagram Caption</option>
                <option value="twitter">Twitter/X Thread</option>
                <option value="youtube">YouTube Description</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Brand Tone
              </label>
              <select
                value={tone}
                onChange={(e: any) => setTone(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              >
                <option value="professional">Professional</option>
                <option value="casual">Casual & Warm</option>
                <option value="bold">Bold & Confident</option>
                <option value="witty">Witty & Fun</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-slate-500 dark:text-slate-400">Length:</span>
            <div className="flex bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-lg text-xs">
              {(['short', 'medium', 'long'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLength(l)}
                  className={`px-3 py-1 rounded-md font-medium capitalize transition ${
                    length === l
                      ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm'
                      : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !topic.trim()}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg hover:shadow-indigo-500/20 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition cursor-pointer"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                AI is brainstorming...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Copy
              </>
            )}
          </button>
        </div>

        {/* Right Output / Result */}
        <div className="rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 p-4.5 flex flex-col justify-between min-h-[220px]">
          <AnimatePresence mode="wait">
            {isGenerating ? (
              /* Loading Skeletons */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3.5 w-full flex-1 justify-center flex flex-col"
              >
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4 animate-pulse" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-full animate-pulse" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-5/6 animate-pulse" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-1/2 animate-pulse" />
              </motion.div>
            ) : generatedCaption ? (
              /* Generated Output */
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 flex flex-col justify-between"
              >
                <div className="relative">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded-full capitalize">
                      {tone} tone
                    </span>
                    <button
                      onClick={copyToClipboard}
                      className="p-1 rounded bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition"
                      title="Copy to clipboard"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <textarea
                    value={generatedCaption}
                    onChange={(e) => setGeneratedCaption(e.target.value)}
                    className="w-full h-36 bg-transparent resize-none text-xs text-slate-700 dark:text-slate-200 focus:outline-none leading-relaxed"
                  />
                </div>

                {/* AI Suggestions Footer */}
                <div className="border-t border-slate-100 dark:border-slate-800/80 pt-3 mt-3">
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1 mr-1 mt-1">
                      <Hash className="w-3 h-3" /> Extra Hashtags:
                    </span>
                    {['#GrowthMindset', '#SaaSPlatform', '#FutureAI', '#WorkflowMastery'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleHashtagClick(tag)}
                        className="text-[9px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-500/5 transition"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-[10px] bg-white/40 dark:bg-slate-900/40 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                      <div>
                        <div className="font-bold text-slate-700 dark:text-slate-300">Best Time</div>
                        <div>{getRecommendedTime().time} ({getRecommendedTime().days.split(',')[0]})</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 border-l border-slate-100 dark:border-slate-800 pl-3">
                      <BarChart className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      <div>
                        <div className="font-bold text-slate-700 dark:text-slate-300">Sentiment Score</div>
                        <div>{sentimentProjection}% Positive Impact</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Empty state */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 flex flex-col items-center justify-center text-center p-4"
              >
                <div className="w-10 h-10 rounded-full border border-dashed border-slate-300 dark:border-slate-800 flex items-center justify-center mb-2.5 text-slate-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300">Waiting for inspiration</h4>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 max-w-[220px] mt-1 leading-relaxed">
                  Enter your topic, choose your platform & tone, then click "Generate Copy" to start.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
