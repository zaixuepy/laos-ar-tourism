/*
 * Design: 「皇家金殿」东南亚宫廷美学
 * 首页：纵向叙事卷轴布局，配置驱动架构
 */
import { useConfigSafe } from "@/contexts/ConfigContext";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServiceGrid from "@/components/ServiceGrid";
import PromoBanner from "@/components/PromoBanner";
import ARExperience from "@/components/ARExperience";
import FeatureBanners from "@/components/FeatureBanners";
import NearbyAttractions from "@/components/NearbyAttractions";
import Destinations from "@/components/Destinations";
import Itinerary from "@/components/Itinerary";
import GuideSection from "@/components/GuideSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import AIAgent from "@/components/AIAgent";

export default function Home() {
  const { config, loading, error } = useConfigSafe();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF8E7] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-[#C8A45C]/20 border-t-[#C8A45C] animate-spin mx-auto mb-4" />
          <p className="text-[#6B5B4F]">正在加载配置...</p>
        </div>
      </div>
    );
  }

  if (error || !config) {
    return (
      <div className="min-h-screen bg-[#FFF8E7] flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-[#8B2D2D]/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-[#8B2D2D] text-2xl">!</span>
          </div>
          <h2 className="font-display text-xl text-[#3D2B1F] font-bold mb-2">
            配置加载失败
          </h2>
          <p className="text-[#6B5B4F] text-sm mb-4">
            无法加载 config.json 文件。请检查文件是否存在于 public/ 目录下。
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-[#C8A45C] text-white rounded-full text-sm hover:bg-[#B89448] transition-colors"
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8E7]">
      <Navbar />
      <HeroSection />
      <ServiceGrid />
      <PromoBanner />
      <FeatureBanners />
      <NearbyAttractions />
      <ARExperience />
      <Destinations />
      <Itinerary />
      <GuideSection />
      <AboutSection />
      <Footer />
      <AIAgent />
    </div>
  );
}
