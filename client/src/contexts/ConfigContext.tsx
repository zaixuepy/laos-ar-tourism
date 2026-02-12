import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Internationalization helper
export const i18n = {
  CN: {
    appTitle: '探索老挝 AR',
    appSubtitle: 'AR奇遇，指尖上的千年文明',
    language: '中文',
    switchLanguage: '切换语言',
    loading: '加载中...',
    error: '加载失败',
  },
  EN: {
    appTitle: 'Explore Laos AR',
    appSubtitle: 'AR Adventure, Thousand-Year Civilization at Your Fingertips',
    language: 'English',
    switchLanguage: 'Switch Language',
    loading: 'Loading...',
    error: 'Failed to load',
  },
};

// Config type definitions
export interface SiteConfig {
  site: {
    title: string;
    titleEn: string;
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    heroBackground: string;
    logo: string;
    colors: {
      primary: string;
      secondary: string;
      ivory: string;
      dark: string;
      muted: string;
    };
  };
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  nav: Array<{ label: string; href: string; isPage?: boolean }>;
  services: Array<{
    icon: string;
    label: string;
    desc: string;
    color: string;
  }>;
  destinations: Array<{
    name: string;
    nameEn: string;
    image: string;
    desc: string;
    rating: number;
    arCount: number;
    tags: string[];
  }>;
  nearbyAttractions: Array<{
    name: string;
    nameEn: string;
    image: string;
  }>;
  itineraries: Array<{
    title: string;
    days: number;
    price: string;
    highlights: string[];
    image: string;
  }>;
  guides: Array<{
    title: string;
    category: string;
    image: string;
    date: string;
  }>;
  about: {
    vision: string;
    mission: string;
    stats: Array<{ num: string; label: string }>;
    partners: string[];
    backgroundImage: string;
  };
  ar: {
    mindFile: string;
    models: Array<{
      id: string;
      name: string;
      targetIndex: number;
      path: string;
      scale: string;
      position: string;
      rotation: string;
    }>;
  };
  aiAgent: {
    enabled: boolean;
    welcomeMessage: string;
    avatar: string;
    name: string;
    quickReplies: string[];
    fallbackResponses: string[];
  };
  promo: {
    title: string;
    subtitle: string;
    cta: string;
    backgroundGradient: string;
  };
  featureBanners: {
    guide: { title: string; subtitle: string };
    calendar: { title: string; subtitle: string };
  };
  footer: {
    copyright: string;
    icp: string;
    links: Array<{ label: string; href: string }>;
  };
}

interface ConfigContextType {
  config: SiteConfig | null;
  loading: boolean;
  error: string | null;
  language: 'CN' | 'EN';
  setLanguage: (lang: 'CN' | 'EN') => void;
}

const ConfigContext = createContext<ConfigContextType>({
  config: null,
  loading: true,
  error: null,
  language: 'CN',
  setLanguage: () => {},
});

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguageState] = useState<'CN' | 'EN'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('language') as 'CN' | 'EN') || 'CN';
    }
    return 'CN';
  });

  const setLanguage = (lang: 'CN' | 'EN') => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  useEffect(() => {
    fetch("/config.json")
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load config: ${res.status}`);
        return res.json();
      })
      .then((data: SiteConfig) => {
        setConfig(data);
        // Update document title from config
        document.title = data.site.title;
        setLoading(false);
      })
      .catch((err) => {
        console.error("[Config] Failed to load config.json:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <ConfigContext.Provider value={{ config, loading, error, language, setLanguage }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig(): SiteConfig {
  const { config, loading, error } = useContext(ConfigContext);
  if (loading || !config) {
    throw new Error("Config not loaded yet. Use useConfigSafe() for nullable access.");
  }
  return config;
}

export function useConfigSafe() {
  return useContext(ConfigContext);
}

export function useLanguage() {
  const { language, setLanguage } = useContext(ConfigContext);
  return { language, setLanguage };
}

export { ConfigContext };
export default ConfigContext;
