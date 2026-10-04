export interface VideoTimestamp {
  time: string;
  seconds: number;
  label: string;
}

export interface YouTubeVideo {
  id: string;
  youtubeId: string; // YouTube video ID or embed link
  title: string;
  description: string;
  category: 'ROBOTICS' | 'SCIENCE' | 'CODING' | 'GREEN_TECH' | 'INNOVATORS';
  categoryLabel: string;
  duration: string;
  views: string;
  likes: string;
  uploadDate: string;
  thumbnailUrl: string;
  badge?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  ageGroup: string;
  keyTakeaways: string[];
  materialsNeeded?: string[];
  timestamps?: VideoTimestamp[];
  projectLink?: string;
}

export interface YouTubeShort {
  id: string;
  youtubeId: string;
  title: string;
  views: string;
  duration: string;
  category: string;
  thumbnailUrl: string;
  tags: string[];
}

export interface ChannelInfo {
  name: string;
  handle: string;
  subscribers: string;
  videoCount: string;
  totalViews: string;
  bio: string;
  bannerImage: string;
  avatarUrl: string;
  channelUrl: string;
  verified: boolean;
}
