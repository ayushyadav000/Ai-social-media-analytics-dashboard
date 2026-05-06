import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Search, CheckCheck, RefreshCw, Star, Info, MessageSquare } from 'lucide-react';
import { MessageThread } from '../types';
import { messageThreads as initialThreads } from '../data/mockData';

export const ChatSupport: React.FC = () => {
  const [threads, setThreads] = useState<MessageThread[]>(initialThreads);
  const [selectedThreadId, setSelectedThreadId] = useState<string>(initialThreads[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeThread = threads.find((t) => t.id === selectedThreadId);

  // Scroll to bottom when message list changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeThread?.messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !selectedThreadId) return;

    const textToSend = inputValue;
    setInputValue('');

    // Update messages for current thread
    setThreads((prevThreads) =>
      prevThreads.map((thread) => {
        if (thread.id === selectedThreadId) {
          const updatedMessages = [
            ...thread.messages,
            {
              id: `msg-user-${Date.now()}`,
              sender: 'user' as const,
              text: textToSend,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          ];
          return {
            ...thread,
            lastMessage: textToSend,
            unread: false,
            timestamp: 'Just now',
            messages: updatedMessages,
          };
        }
        return thread;
      }),
    );

    // Simulate creator/lead typing and reply
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setThreads((prevThreads) =>
        prevThreads.map((thread) => {
          if (thread.id === selectedThreadId) {
            let replyText = "That sounds fantastic! Let me double-check with my manager and send over the details.";
            if (textToSend.toLowerCase().includes('contract') || textToSend.toLowerCase().includes('sign')) {
              replyText = "Perfect, received and signed! Really excited to partner together on this launching phase.";
            } else if (textToSend.toLowerCase().includes('price') || textToSend.toLowerCase().includes('cost')) {
              replyText = "Our sponsored packages start at $1,200. I can send you a detailed media kit if you want!";
            } else if (textToSend.toLowerCase().includes('hello') || textToSend.toLowerCase().includes('hi')) {
              replyText = `Hey there! Great to connect. How can I help support your brand today?`;
            }

            const updatedMessages = [
              ...thread.messages,
              {
                id: `msg-them-${Date.now()}`,
                sender: 'them' as const,
                text: replyText,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              },
            ];
            return {
              ...thread,
              lastMessage: replyText,
              timestamp: 'Just now',
              messages: updatedMessages,
            };
          }
          return thread;
        }),
      );
    }, 1800);
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return 'text-pink-500 bg-pink-500/10';
      case 'linkedin':
        return 'text-blue-500 bg-blue-500/10';
      case 'twitter':
        return 'text-slate-700 bg-slate-100 dark:text-sky-400 dark:bg-sky-400/10';
      default:
        return 'text-red-500 bg-red-500/10';
    }
  };

  const filteredThreads = threads.filter((t) =>
    t.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="rounded-2xl border border-white/10 dark:border-white/5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md shadow-xl overflow-hidden h-[540px] flex">
      {/* Threads List (Left panel) */}
      <div className="w-80 border-r border-slate-100 dark:border-slate-800/80 flex flex-col h-full bg-white/10 dark:bg-slate-900/10">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800/80 space-y-3">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-indigo-500" />
            Social Messaging Inbox
          </h3>
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chat or creators..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredThreads.map((thread) => (
            <button
              key={thread.id}
              onClick={() => {
                setSelectedThreadId(thread.id);
                // Mark as read
                setThreads((prev) =>
                  prev.map((t) => (t.id === thread.id ? { ...t, unread: false } : t)),
                );
              }}
              className={`w-full flex gap-3 p-3 rounded-xl text-left transition ${
                selectedThreadId === thread.id
                  ? 'bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/10'
                  : 'hover:bg-slate-100/50 dark:hover:bg-slate-800/40 border border-transparent'
              }`}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={thread.senderAvatar}
                  alt={thread.senderName}
                  className="w-10 h-10 rounded-full object-cover border border-slate-150 dark:border-slate-800"
                />
                {thread.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                    {thread.senderName}
                  </h4>
                  <span className="text-[9px] text-slate-400 font-mono flex-shrink-0">
                    {thread.timestamp}
                  </span>
                </div>

                <p className={`text-[11px] mt-0.5 truncate ${
                  thread.unread ? 'text-slate-800 dark:text-slate-200 font-bold' : 'text-slate-400 dark:text-slate-400'
                }`}>
                  {thread.lastMessage}
                </p>

                <div className="flex items-center justify-between mt-1.5">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${getPlatformColor(thread.platform)}`}>
                    {thread.platform}
                  </span>
                  {thread.unread && (
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Active Conversation Box (Right panel) */}
      <div className="flex-1 flex flex-col h-full relative">
        {activeThread ? (
          <>
            {/* Chat header */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between bg-white/10 dark:bg-slate-900/10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={activeThread.senderAvatar}
                    alt={activeThread.senderName}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  {activeThread.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white dark:border-slate-900" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {activeThread.senderName}
                  </h4>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">
                    {activeThread.online ? 'Active now · ' : 'Offline · '} via{' '}
                    <span className="capitalize">{activeThread.platform}</span>
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="p-1.5 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                  <Star className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                  <Info className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat body scrolling */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeThread.messages.map((message) => {
                const isUser = message.sender === 'user';
                return (
                  <div
                    key={message.id}
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] p-3.5 rounded-2xl text-xs relative leading-relaxed ${
                        isUser
                          ? 'bg-gradient-to-tr from-indigo-500 to-purple-500 text-white rounded-tr-none shadow-md shadow-indigo-500/5'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'
                      }`}
                    >
                      <p>{message.text}</p>
                      <div
                        className={`text-[9px] mt-1.5 font-mono text-right flex items-center justify-end gap-1 ${
                          isUser ? 'text-white/70' : 'text-slate-400 dark:text-slate-500'
                        }`}
                      >
                        <span>{message.time}</span>
                        {isUser && <CheckCheck className="w-3 h-3 text-white/95" />}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Typing indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="flex justify-start"
                  >
                    <div className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 p-3 rounded-2xl rounded-tl-none flex items-center gap-1.5 text-xs">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>{activeThread.senderName.split(' ')[0]} is typing...</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Chat inputs */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 dark:border-slate-800/80 bg-white/10 dark:bg-slate-900/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={`Reply to ${activeThread.senderName.split(' ')[0]}...`}
                  className="flex-1 px-4.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="p-2.5 rounded-xl bg-indigo-500 text-white font-semibold shadow-md shadow-indigo-500/10 active:scale-95 disabled:opacity-50 disabled:pointer-events-none hover:bg-indigo-600 transition cursor-pointer"
                >
                  <Send className="w-4.5 h-4.5" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
            <p className="text-sm text-slate-400 dark:text-slate-500">Select a message thread to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};
