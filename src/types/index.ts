export interface Post {
  id: string;
  content: string;
  platform: 'instagram' | 'youtube' | 'linkedin' | 'twitter';
  status: 'published' | 'scheduled' | 'draft';
  likes: number;
  comments: number;
  shares: number;
  reach: number;
  engagementRate: number;
  image?: string;
  scheduledDate?: string;
  hashtags: string[];
}

export interface Campaign {
  id: string;
  name: string;
  platform: 'instagram' | 'youtube' | 'linkedin' | 'twitter' | 'all';
  status: 'active' | 'completed' | 'paused';
  budget: number;
  spent: number;
  reach: number;
  conversions: number;
  roi: number;
}

export interface MessageThread {
  id: string;
  senderName: string;
  senderAvatar: string;
  platform: 'instagram' | 'youtube' | 'linkedin' | 'twitter';
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  online: boolean;
  messages: {
    id: string;
    sender: 'user' | 'them';
    text: string;
    time: string;
  }[];
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'alert' | 'success' | 'info' | 'message';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
  activeTask?: string;
}

export interface PlatformMetric {
  followers: number;
  likes: number;
  engagementRate: number;
  reach: number;
  revenue: number;
  growth: number;
}

export interface DashboardMetrics {
  instagram: PlatformMetric;
  youtube: PlatformMetric;
  linkedin: PlatformMetric;
  twitter: PlatformMetric;
  total: PlatformMetric;
}
