export enum MessageRole {
  USER = 'user',
  MODEL = 'model'
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: number;
  groundingLinks?: GroundingLink[];
}

export interface GroundingLink {
  title: string;
  uri: string;
  sourceType: 'maps' | 'web';
}

export interface Destination {
  id: string;
  name: string;
  japaneseName: string;
  description: string;
  imageUrl: string;
  category: 'culture' | 'nature' | 'food' | 'city';
  region: string;
}

export interface JapanEvent {
  id: string;
  name: string;
  japaneseName: string;
  date: string; // Text description of date (e.g., "July 1-31")
  month: number; // 1-12 for filtering
  location: string;
  description: string;
  imageUrl: string;
}

export type LanguageCode = 'en' | 'es' | 'fr' | 'zh' | 'ko';

export interface Language {
  code: LanguageCode;
  label: string;
  flag: string;
}

export enum PageView {
  HOME = 'home',
  EXPLORE = 'explore',
  GUIDE = 'guide',
  MAP = 'map',
  EVENTS = 'events'
}
