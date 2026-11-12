export type CommitteeType = 'growth' | 'esg' | 'developmental';

export type PublishStatus = 'draft' | 'published' | 'private';

export interface ImpactMetric {
  id: string;
  category: string;
  title: string;
  value: string;
  unit: string;
  description: string;
  order: number;
  highlight?: boolean;
  updatedAt?: string;
}

export interface Activity {
  id: string;
  year: number; // 2024, 2025, 2026
  committee: CommitteeType;
  title: string;
  objective?: string;
  content: string;
  results?: string;
  images?: string[];
  videos?: string[];
  status: PublishStatus;
  updatedAt?: string;
}

export interface Moment {
  id: string;
  title: string;
  year: number;
  committee: CommitteeType;
  description: string;
  mediaType: 'photo' | 'video';
  url: string;
  additionalUrls?: string[];
  thumbnail?: string;
  status: PublishStatus;
  order: number;
  updatedAt?: string;
}

export interface Voice {
  id: string;
  name: string;
  committee: CommitteeType;
  title: string;
  content: string;
  profilePhotoUrl?: string;
  status: PublishStatus;
  order: number;
  updatedAt?: string;
}

export interface HighlightStory {
  id: string;
  committee: CommitteeType;
  title: string;
  subtitle: string;
  background: string; // 개선이 필요했던 배경
  action: string;     // 직원위원회의 실천 내용
  result: string;     // 실제 변화와 성과
  imageUrl: string;
  imageCaption: string;
}

export interface SiteSettings {
  id: string;
  heroTitle: string;
  heroSubTitle: string;
  heroDescription: string;
  heroMessage: string;
  heroBgUrl?: string;
  heroVideoUrl?: string;
  updatedAt?: string;
}

export interface CommitteeInfo {
  id: CommitteeType;
  name: string;
  tagline: string;
  description: string;
  color: string;
  hex: string;
  iconName: string;
}
