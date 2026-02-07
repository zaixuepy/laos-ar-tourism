/*
 * Design: 「皇家金殿」东南亚宫廷美学
 * 首页：纵向叙事卷轴布局，如同展开一幅长卷画
 * 色彩：皇家金(#C8A45C) + 寺庙红(#8B2D2D) + 古卷象牙白(#FFF8E7)
 */
import { useAuth } from "@/_core/hooks/useAuth";
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

export default function Home() {
  const { user, loading, isAuthenticated } = useAuth();

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
    </div>
  );
}
