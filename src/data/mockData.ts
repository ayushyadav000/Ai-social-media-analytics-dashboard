import { Post, Campaign, MessageThread, TeamMember, DashboardMetrics, NotificationItem } from '../types';

export const dashboardMetrics: DashboardMetrics = {
  total: { followers: 245900, likes: 184200, engagementRate: 4.8, reach: 1890000, revenue: 14250, growth: 12.4 },
  instagram: { followers: 112000, likes: 98000, engagementRate: 5.6, reach: 850000, revenue: 6400, growth: 14.2 },
  youtube: { followers: 64000, likes: 45000, engagementRate: 6.2, reach: 520000, revenue: 5100, growth: 8.5 },
  linkedin: { followers: 38400, likes: 21200, engagementRate: 3.4, reach: 310000, revenue: 1850, growth: 18.1 },
  twitter: { followers: 31500, likes: 20000, engagementRate: 2.9, reach: 210000, revenue: 900, growth: 6.8 },
};

export const postsData: Post[] = [
  {
    id: 'post-1',
    content: '🚀 Harness the power of generative AI in your SaaS workflow! Our latest update brings seamless integrations with all your favorite tools. Read the full guide here.',
    platform: 'linkedin',
    status: 'published',
    likes: 342,
    comments: 28,
    shares: 45,
    reach: 12400,
    engagementRate: 5.4,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    hashtags: ['AI', 'SaaS', 'Productivity', 'TechInnovation'],
  },
  {
    id: 'post-2',
    content: 'Creating visual identity has never been this satisfying. In our new design breakdown, we explain how glassmorphism shapes current web design trends. 💎✨',
    platform: 'instagram',
    status: 'published',
    likes: 1284,
    comments: 92,
    shares: 114,
    reach: 42000,
    engagementRate: 6.8,
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=600&q=80',
    hashtags: ['WebDesign', 'UIUX', 'Glassmorphism', 'FigmaDesign'],
  },
  {
    id: 'post-3',
    content: 'How to scale your marketing campaign in 2026 without breaking the bank. Complete step-by-step checklist! 📈💼',
    platform: 'twitter',
    status: 'scheduled',
    likes: 0,
    comments: 0,
    shares: 0,
    reach: 0,
    engagementRate: 0,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    scheduledDate: '2026-04-12 10:30 AM',
    hashtags: ['GrowthMarketing', 'SaaSStrategy', 'StartupTips'],
  },
  {
    id: 'post-4',
    content: '10 Secrets of High-Converting Landing Pages. In this video, we break down our top-performing templates line-by-line. 💻🎬',
    platform: 'youtube',
    status: 'published',
    likes: 4590,
    comments: 320,
    shares: 780,
    reach: 98000,
    engagementRate: 7.2,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80',
    hashtags: ['WebDevelopment', 'ConversionRate', 'SaaSBuilder'],
  },
  {
    id: 'post-5',
    content: 'The future of remote collaboration is asynchronous. Here is why your team should adapt starting today.',
    platform: 'linkedin',
    status: 'scheduled',
    likes: 0,
    comments: 0,
    shares: 0,
    reach: 0,
    engagementRate: 0,
    scheduledDate: '2026-04-13 09:00 AM',
    hashtags: ['RemoteWork', 'FutureOfWork', 'Collaboration'],
  },
];

export const campaignsData: Campaign[] = [
  {
    id: 'camp-1',
    name: 'SaaS Spring Launch 2026',
    platform: 'all',
    status: 'active',
    budget: 8000,
    spent: 4200,
    reach: 320000,
    conversions: 1840,
    roi: 3.4,
  },
  {
    id: 'camp-2',
    name: 'LinkedIn Lead Gen Series',
    platform: 'linkedin',
    status: 'active',
    budget: 3500,
    spent: 2900,
    reach: 110000,
    conversions: 890,
    roi: 4.1,
  },
  {
    id: 'camp-3',
    name: 'Instagram Micro-Influencers',
    platform: 'instagram',
    status: 'paused',
    budget: 5000,
    spent: 5000,
    reach: 480000,
    conversions: 2100,
    roi: 2.8,
  },
  {
    id: 'camp-4',
    name: 'YouTube Tech Review Placements',
    platform: 'youtube',
    status: 'completed',
    budget: 12000,
    spent: 12000,
    reach: 950000,
    conversions: 6200,
    roi: 5.2,
  },
];

export const messageThreads: MessageThread[] = [
  {
    id: 'msg-1',
    senderName: 'Sarah Jenkins (TechVibe)',
    senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    platform: 'instagram',
    lastMessage: 'Let’s lock in the sponsorship details for next week!',
    timestamp: '10 mins ago',
    unread: true,
    online: true,
    messages: [
      { id: '1', sender: 'them', text: 'Hey there! I saw your campaign requirements.', time: '10:00 AM' },
      { id: '2', sender: 'user', text: 'Hi Sarah! Great, would love to hear your thoughts.', time: '10:15 AM' },
      { id: '3', sender: 'them', text: 'Your guidelines look very reasonable. Let’s lock in the sponsorship details for next week!', time: '10:45 AM' },
    ],
  },
  {
    id: 'msg-2',
    senderName: 'Michael Chen (DevLead)',
    senderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    platform: 'linkedin',
    lastMessage: 'Awesome, sent the contract over via signNow.',
    timestamp: '2 hours ago',
    unread: false,
    online: true,
    messages: [
      { id: '1', sender: 'them', text: 'Hello, our team would love to write a post highlighting your product.', time: 'Yesterday' },
      { id: '2', sender: 'user', text: 'That sounds amazing Michael. Here is our link structure.', time: 'Yesterday' },
      { id: '3', sender: 'them', text: 'Awesome, sent the contract over via signNow.', time: '2 hours ago' },
    ],
  },
  {
    id: 'msg-3',
    senderName: 'Elena Rostova',
    senderAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    platform: 'twitter',
    lastMessage: 'Thanks for replying so quickly!',
    timestamp: '1 day ago',
    unread: false,
    online: false,
    messages: [
      { id: '1', sender: 'them', text: 'Quick question: Is the campaign open to European creators?', time: '2 days ago' },
      { id: '2', sender: 'user', text: 'Yes, absolutely! We support creators globally.', time: '1 day ago' },
      { id: '3', sender: 'them', text: 'Thanks for replying so quickly!', time: '1 day ago' },
    ],
  },
];

export const teamMembers: TeamMember[] = [
  { id: 'tm-1', name: 'Sophia Loren', role: 'Social Media Manager', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', status: 'online', activeTask: 'Reviewing AI Captions' },
  { id: 'tm-2', name: 'James Carter', role: 'Ad Specialist', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80', status: 'online', activeTask: 'Optimizing CPC Campaigns' },
  { id: 'tm-3', name: 'Maya Lin', role: 'Graphic Designer', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80', status: 'busy', activeTask: 'Rendering Spring Promos' },
  { id: 'tm-4', name: 'Alex Thompson', role: 'AI Analyst', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80', status: 'offline' },
];

export const notificationsList: NotificationItem[] = [
  { id: 'n-1', title: 'New follower spike!', description: 'Instagram gained 1.4k new followers in the last 4 hours.', time: '5m ago', read: false, type: 'success' },
  { id: 'n-2', title: 'Campaign Alert', description: 'YouTube Tech Review Campaign has reached 90% budget spending.', time: '1h ago', read: false, type: 'alert' },
  { id: 'n-3', title: 'New message received', description: 'Sarah Jenkins sent you a message: "Let\'s lock in the sponsorship..."', time: '2h ago', read: true, type: 'message' },
  { id: 'n-4', title: 'Ad Performance', description: 'Average cost per click (CPC) on LinkedIn lead campaigns dropped by 12%.', time: '5h ago', read: true, type: 'info' },
];

// Analytical Data Series
export const weeklyAnalytics = [
  { name: 'Mon', total: 120, instagram: 50, youtube: 30, linkedin: 25, twitter: 15, revenue: 1100, engagement: 4.1 },
  { name: 'Tue', total: 135, instagram: 55, youtube: 35, linkedin: 28, twitter: 17, revenue: 1300, engagement: 4.5 },
  { name: 'Wed', total: 160, instagram: 68, youtube: 42, linkedin: 32, twitter: 18, revenue: 1550, engagement: 4.9 },
  { name: 'Thu', total: 145, instagram: 58, youtube: 40, linkedin: 30, twitter: 17, revenue: 1400, engagement: 4.3 },
  { name: 'Fri', total: 185, instagram: 78, youtube: 48, linkedin: 38, twitter: 21, revenue: 1900, engagement: 5.2 },
  { name: 'Sat', total: 210, instagram: 92, youtube: 54, linkedin: 42, twitter: 22, revenue: 2100, engagement: 5.8 },
  { name: 'Sun', total: 195, instagram: 84, youtube: 50, linkedin: 40, twitter: 21, revenue: 1800, engagement: 5.5 },
];

export const monthlyAnalytics = [
  { name: 'Jan', total: 4200, instagram: 1800, youtube: 1100, linkedin: 800, twitter: 500, revenue: 8400, engagement: 3.8 },
  { name: 'Feb', total: 4900, instagram: 2100, youtube: 1300, linkedin: 950, twitter: 550, revenue: 9900, engagement: 4.0 },
  { name: 'Mar', total: 5800, instagram: 2500, youtube: 1600, linkedin: 1100, twitter: 600, revenue: 11800, engagement: 4.3 },
  { name: 'Apr', total: 7200, instagram: 3200, youtube: 2000, linkedin: 1350, twitter: 650, revenue: 14250, engagement: 4.8 },
];

export const sentimentData = {
  instagram: { positive: 68, neutral: 24, negative: 8 },
  youtube: { positive: 75, neutral: 18, negative: 7 },
  linkedin: { positive: 82, neutral: 15, negative: 3 },
  twitter: { positive: 45, neutral: 35, negative: 20 },
  total: { positive: 67, neutral: 23, negative: 10 },
};

export const postingTimes = {
  instagram: { time: '6:00 PM - 9:00 PM', days: 'Wed, Fri, Sun', score: 94 },
  youtube: { time: '12:00 PM - 3:00 PM', days: 'Thu, Fri', score: 88 },
  linkedin: { time: '8:00 AM - 10:00 AM', days: 'Tue, Wed, Thu', score: 92 },
  twitter: { time: '1:00 PM - 4:00 PM', days: 'Mon, Wed', score: 85 },
};

export const aiHashtagSuggestions = {
  SaaS: ['#SaaS', '#CloudComputing', '#B2BTech', '#SoftwareDevelopment', '#SaaSLife', '#SaaSGrowth'],
  Design: ['#UIUX', '#WebDesign', '#Glassmorphism', '#FigmaCommunity', '#ProductDesign', '#UIDesign'],
  Marketing: ['#GrowthMarketing', '#DigitalMarketing', '#LeadGeneration', '#ContentStrategy', '#B2BMarketing'],
  Tech: ['#ArtificialIntelligence', '#TechStartup', '#GenerativeAI', '#Innovators', '#Web3', '#CodingLife'],
};
