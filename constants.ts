import { Destination, JapanEvent, Language, LanguageCode } from './types';

export const APP_NAME = "NihonGo";

export const LANGUAGES: Language[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
];

export const UI_TRANSLATIONS: Record<LanguageCode, any> = {
  en: {
    nav: { home: 'Home', explore: 'Explore', map: 'Map', events: 'Events', guide: 'Guide' },
    hero: { badge: 'Discover Japan with AI', title: 'Experience Japan\nLike a Local', subtitle: 'Your personal intelligent guide to the Land of the Rising Sun.', cta: 'Ask the Guide' },
    map: { title: 'Smart Map & Route', nearby: 'Explore Nearby', route: 'Route Planner', locate: 'Get My Location', locating: 'Locating...', unknown: 'Unknown Location', find: 'Find', from: 'From', to: 'To', plan: 'Plan Route' },
    events: { title: 'Local Events & Festivals', subtitle: 'Discover the vibrant celebrations across Japan.', filterAll: 'All Months' }
  },
  es: {
    nav: { home: 'Inicio', explore: 'Explorar', map: 'Mapa', events: 'Eventos', guide: 'Guía' },
    hero: { badge: 'Descubre Japón con IA', title: 'Vive Japón\nComo un Local', subtitle: 'Tu guía personal inteligente para el País del Sol Naciente.', cta: 'Preguntar a la Guía' },
    map: { title: 'Mapa Inteligente', nearby: 'Explorar Cerca', route: 'Ruta', locate: 'Mi Ubicación', locating: 'Ubicando...', unknown: 'Ubicación Desconocida', find: 'Buscar', from: 'Desde', to: 'Hasta', plan: 'Planear Ruta' },
    events: { title: 'Eventos y Festivales', subtitle: 'Descubre las vibrantes celebraciones en todo Japón.', filterAll: 'Todos los Meses' }
  },
  fr: {
    nav: { home: 'Accueil', explore: 'Explorer', map: 'Carte', events: 'Événements', guide: 'Guide' },
    hero: { badge: 'Découvrez le Japon avec l\'IA', title: 'Vivez le Japon\nComme un Local', subtitle: 'Votre guide personnel intelligent pour le Pays du Soleil Levant.', cta: 'Demander au Guide' },
    map: { title: 'Carte Intelligente', nearby: 'Explorer à Proximité', route: 'Itinéraire', locate: 'Ma Position', locating: 'Localisation...', unknown: 'Lieu Inconnu', find: 'Trouver', from: 'De', to: 'À', plan: 'Calculer l\'itinéraire' },
    events: { title: 'Événements Locaux', subtitle: 'Découvrez les célébrations vibrantes à travers le Japon.', filterAll: 'Tous les Mois' }
  },
  zh: {
    nav: { home: '首页', explore: '探索', map: '地图', events: '活动', guide: '向导' },
    hero: { badge: 'AI 探索日本', title: '像当地人一样\n体验日本', subtitle: '您的日出之国个人智能向导。', cta: '咨询向导' },
    map: { title: '智能地图', nearby: '附近探索', route: '路线规划', locate: '获取位置', locating: '定位中...', unknown: '未知位置', find: '查找', from: '起点', to: '终点', plan: '规划路线' },
    events: { title: '当地活动与节日', subtitle: '探索日本各地充满活力的庆典。', filterAll: '所有月份' }
  },
  ko: {
    nav: { home: '홈', explore: '탐험', map: '지도', events: '이벤트', guide: '가이드' },
    hero: { badge: 'AI로 일본 발견하기', title: '현지인처럼\n일본 즐기기', subtitle: '해가 뜨는 나라를 위한 당신의 개인 지능형 가이드.', cta: '가이드에게 묻기' },
    map: { title: '스마트 지도', nearby: '주변 탐색', route: '경로 플래너', locate: '내 위치', locating: '위치 확인 중...', unknown: '알 수 없는 위치', find: '찾기', from: '출발', to: '도착', plan: '경로 계획' },
    events: { title: '지역 이벤트 및 축제', subtitle: '일본 전역의 활기찬 축제를 발견하세요.', filterAll: '모든 달' }
  }
};

export const DESTINATIONS: Destination[] = [
  {
    id: '1',
    name: 'Kyoto',
    japaneseName: '京都',
    description: 'The cultural heart of Japan, famous for its classical Buddhist temples, gardens, imperial palaces, Shinto shrines, and traditional wooden houses.',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    category: 'culture',
    region: 'Kansai'
  },
  {
    id: '2',
    name: 'Akihabara',
    japaneseName: '秋葉原',
    description: 'A buzzing shopping hub famed for its electronics retailers, ranging from tiny stalls to vast department stores, and the center of otaku culture.',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    category: 'city',
    region: 'Tokyo'
  },
  {
    id: '3',
    name: 'Mount Fuji',
    japaneseName: '富士山',
    description: 'Japan\'s highest mountain and an active volcano. It is one of Japan\'s "Three Holy Mountains" and a UNESCO World Heritage site.',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    category: 'nature',
    region: 'Chubu'
  },
  {
    id: '4',
    name: 'Dotonbori',
    japaneseName: '道頓堀',
    description: 'A popular tourist destination in Osaka, running along the Dōtonbori canal. Known for its eccentric signage and vast array of restaurants.',
    imageUrl: 'https://picsum.photos/800/600?random=4',
    category: 'food',
    region: 'Osaka'
  },
  {
    id: '5',
    name: 'Naoshima',
    japaneseName: '直島',
    description: 'An island in the Seto Inland Sea that is known for its modern art museums, architecture, and sculptures.',
    imageUrl: 'https://picsum.photos/800/600?random=5',
    category: 'culture',
    region: 'Kagawa'
  },
  {
    id: '6',
    name: 'Hokkaido',
    japaneseName: '北海道',
    description: 'The northernmost of Japan’s main islands, known for its volcanoes, natural hot springs (onsen), and ski areas.',
    imageUrl: 'https://picsum.photos/800/600?random=6',
    category: 'nature',
    region: 'Hokkaido'
  }
];

export const JAPAN_EVENTS: JapanEvent[] = [
  {
    id: '1',
    name: 'Sapporo Snow Festival',
    japaneseName: 'さっぽろ雪まつり',
    date: 'Early February',
    month: 2,
    location: 'Sapporo, Hokkaido',
    description: 'One of Japan\'s most popular winter events, featuring hundreds of spectacular snow and ice sculptures.',
    imageUrl: 'https://picsum.photos/800/600?random=10'
  },
  {
    id: '2',
    name: 'Cherry Blossom Season (Hanami)',
    japaneseName: '花見',
    date: 'Late March - Early April',
    month: 4,
    location: 'Nationwide',
    description: 'The traditional custom of enjoying the transient beauty of flowers, flowers being almost always cherry blossoms.',
    imageUrl: 'https://picsum.photos/800/600?random=11'
  },
  {
    id: '3',
    name: 'Kanda Matsuri',
    japaneseName: '神田祭',
    date: 'Mid May (Odd numbered years)',
    month: 5,
    location: 'Tokyo',
    description: 'One of the three great festivals of Tokyo, featuring over 200 mikoshi (portable shrines) paraded through the streets.',
    imageUrl: 'https://picsum.photos/800/600?random=12'
  },
  {
    id: '4',
    name: 'Gion Matsuri',
    japaneseName: '祇園祭',
    date: 'July 1-31',
    month: 7,
    location: 'Kyoto',
    description: 'The festival of Yasaka Shrine, the most famous festival in Japan, culminating in a massive parade of floats.',
    imageUrl: 'https://picsum.photos/800/600?random=13'
  },
  {
    id: '5',
    name: 'Tenjin Matsuri',
    japaneseName: '天神祭',
    date: 'July 24-25',
    month: 7,
    location: 'Osaka',
    description: 'Ranked as one of Japan\'s top three festivals, featuring a land procession and a river procession with fireworks.',
    imageUrl: 'https://picsum.photos/800/600?random=14'
  },
  {
    id: '6',
    name: 'Awa Odori',
    japaneseName: '阿波おどり',
    date: 'August 12-15',
    month: 8,
    location: 'Tokushima',
    description: 'The largest dance festival in Japan, attracting over 1 million tourists every year.',
    imageUrl: 'https://picsum.photos/800/600?random=15'
  },
  {
    id: '7',
    name: 'Takayama Autumn Festival',
    japaneseName: '高山祭',
    date: 'October 9-10',
    month: 10,
    location: 'Takayama',
    description: 'Famous for its intricately carved floats that are lit with paper lanterns in the evening.',
    imageUrl: 'https://picsum.photos/800/600?random=16'
  }
];

export const SYSTEM_INSTRUCTION = (language: string) => `You are "NihonGo Guide", an expert, friendly, and polite travel assistant for international travelers visiting Japan. 
Your goal is to help users plan trips, understand culture, find restaurants, and navigate transportation.
- Always provide cultural context when relevant (e.g., etiquette).
- If asked about locations, try to provide specific recommendations.
- Keep answers concise but informative.
- Use formatting (bullet points, bold text) to make it readable.
- If you suggest a place, try to mention the nearest train station if known.
- Be enthusiastic about Japan!
- IMPORTANT: Please respond in the ${language} language.
`;
