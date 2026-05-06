import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';

interface AuthPagesProps {
  onLoginSuccess: (user: { name: string; email: string; avatar: string; role: string }) => void;
}

export const AuthPages: React.FC<AuthPagesProps> = ({ onLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      onLoginSuccess({
        name: 'Ayush Yadav',
        email: 'ayush.yadav@omnipulse.ai',
        avatar: 'ayush img.jpeg',
        role: 'Lead Growth Creator',
      });
      setIsLoading(false);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    if (mode === 'login') {
      if (!email || !password) {
        setErrorMsg('Please fill in all fields');
        setIsLoading(false);
        return;
      }
      setTimeout(() => {
        onLoginSuccess({
          name: name || 'Ayush Yadav',
          email: email,
          avatar: 'ayush img.jpeg',
          role: 'Lead Growth Creator',
        });
        setIsLoading(false);
      }, 1000);
    } else if (mode === 'signup') {
      if (!name || !email || !password) {
        setErrorMsg('Please fill in all fields');
        setIsLoading(false);
        return;
      }
      setTimeout(() => {
        onLoginSuccess({
          name: name,
          email: email,
          avatar: 'ayush img.jpeg',
          role: 'Creator Associate',
        });
        setIsLoading(false);
      }, 1000);
    } else {
      if (!email) {
        setErrorMsg('Please enter your email address');
        setIsLoading(false);
        return;
      }
      setTimeout(() => {
        setIsSuccess(true);
        setIsLoading(false);
      }, 1200);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-slate-950 text-white">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-950/40 via-slate-950 to-slate-950 -z-10" />
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -z-10 animate-pulse" />

      {/* Main Container Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 shadow-2xl relative"
      >
        {/* Logo Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-xl shadow-indigo-500/20 mb-3">
            <Sparkles className="w-6 h-6 text-white animate-spin-slow" />
          </div>
          <h2 className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-indigo-300">
            OmniPulse AI
          </h2>
          <p className="text-xs text-indigo-200/50 mt-1">Unified Social Media AI Engine & Analytics</p>
        </div>

        <AnimatePresence mode="wait">
          {isSuccess && mode === 'forgot' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-6 space-y-4"
            >
              <div className="w-14 h-14 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 mx-auto border border-emerald-500/20">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-100">Reset Email Dispatched</h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                We've sent a secure link to <span className="text-indigo-400 font-semibold">{email}</span> to reset your password.
              </p>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setMode('login');
                }}
                className="text-xs text-indigo-400 font-bold hover:underline"
              >
                Back to Login
              </button>
            </motion.div>
          ) : (
            <motion.form
              key={mode}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <h3 className="text-base font-bold text-slate-100 mb-1 capitalize">
                {mode === 'login' ? 'Welcome back' : mode === 'signup' ? 'Create SaaS account' : 'Reset password'}
              </h3>

              {errorMsg && (
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs text-center font-medium">
                  {errorMsg}
                </div>
              )}

              {/* Form Fields */}
              <div className="space-y-3">
                {mode === 'signup' && (
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-white/10 bg-white/[0.04] text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                    />
                  </div>
                )}

                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-white/10 bg-white/[0.04] text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                  />
                </div>

                {mode !== 'forgot' && (
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-white/10 bg-white/[0.04] text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                    />
                  </div>
                )}
              </div>

              {/* Extras line */}
              {mode === 'login' && (
                <div className="flex justify-between items-center text-[10px] text-slate-400">
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="checkbox" className="rounded bg-white/5 border-white/10 text-indigo-500 focus:ring-0" />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-indigo-400 font-semibold hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="space-y-3.5 pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-500/20 active:scale-98 disabled:opacity-50 disabled:pointer-events-none transition cursor-pointer"
                >
                  {isLoading ? 'Processing securely...' : mode === 'login' ? 'Login with Email' : mode === 'signup' ? 'Complete Sign Up' : 'Send Recovery Email'}
                  {!isLoading && <ArrowRight className="w-3.5 h-3.5" />}
                </button>

                {/* Demo Quickfill */}
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={handleDemoLogin}
                    disabled={isLoading}
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-indigo-300 font-bold text-xs flex items-center justify-center gap-1.5 transition hover:bg-indigo-500/15 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Explore with Demo Admin
                  </button>
                )}
              </div>

              {/* Bottom Switch */}
              <div className="text-[11px] text-center text-slate-400 pt-4 border-t border-white/5">
                {mode === 'login' ? (
                  <>
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('signup')}
                      className="text-indigo-400 font-bold hover:underline"
                    >
                      Sign Up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="text-indigo-400 font-bold hover:underline"
                    >
                      Log In
                    </button>
                  </>
                )}
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
