import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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
}

const ConfigContext = createContext<ConfigContextType>({
  config: null,
  loading: true,
  error: null,
});

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    <ConfigContext.Provider value={{ config, loading, error }}>
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

export default ConfigContext;
