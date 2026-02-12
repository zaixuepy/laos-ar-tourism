/*
 * Design: 「皇家金殿」东南亚宫廷美学
 * Footer：优雅的底部区域 + 模拟App底部导航栏
 */
import { motion } from "framer-motion";
import { Home, Compass, Map, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/ConfigContext";

const LOGO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663339511512/rLLGYBbaZSFXGCCN.png";

const i18nText = {
  CN: {
    brandName: "探索老挝",
    brandDesc: "东南亚首个AR智慧文旅平台，用增强现实技术连接千年文明与现代旅行。",
    quickLinks: "快速链接",
    quickLinksItems: ["AR体验", "热门目的地", "行程推荐", "攻略资讯"],
    services: "服务",
    servicesItems: ["景区门票", "酒店预订", "导游导览", "文创特产"],
    contact: "联系我们",
    copyright: "© 2026 探索老挝 AR. All rights reserved.",
    privacy: "隐私政策",
    terms: "服务条款",
    partnership: "合作洽谈",
    tabHome: "首页",
    tabServices: "服务",
    tabItinerary: "行程",
    tabProfile: "我的",
    featureComingSoon: "功能即将上线",
    personalCenterDesc: "个人中心正在开发中",
  },
  EN: {
    brandName: "Explore Laos",
    brandDesc: "Southeast Asia's first AR smart tourism platform, connecting millennia of civilization with modern travel through augmented reality.",
    quickLinks: "Quick Links",
    quickLinksItems: ["AR Experience", "Popular Destinations", "Itinerary Suggestions", "Travel Guides"],
    services: "Services",
    servicesItems: ["Tickets", "Hotel Booking", "Guide Services", "Souvenirs"],
    contact: "Contact Us",
    copyright: "© 2026 Explore Laos AR. All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    partnership: "Partnership",
    tabHome: "Home",
    tabServices: "Services",
    tabItinerary: "Itinerary",
    tabProfile: "Profile",
    featureComingSoon: "Coming Soon",
    personalCenterDesc: "Personal center is in development",
  },
};

const getBottomTabs = (language: 'CN' | 'EN') => [
  { icon: Home, label: i18nText[language].tabHome, active: true },
  { icon: Compass, label: i18nText[language].tabServices, active: false },
  { icon: Map, label: i18nText[language].tabItinerary, active: false },
  { icon: User, label: i18nText[language].tabProfile, active: false },
];

export default function Footer() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);
  const bottomTabs = getBottomTabs(language);
  const content = i18nText[language];

  return (
    <>
      {/* Main Footer */}
      <footer className="bg-[#2A1F14] text-white/80 pt-16 pb-24 lg:pb-8 relative overflow-hidden">
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B2D2D] via-[#C8A45C] to-[#8B2D2D]" />

        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img src={LOGO_URL} alt={content.brandName} className="h-10 w-auto" />
                <div>
                  <h3 className="font-display text-lg font-bold text-white">{content.brandName}</h3>
                  <p className="text-[10px] text-[#C8A45C] tracking-[0.2em]">EXPLORE LAOS AR</p>
                </div>
              </div>
              <p className="text-sm text-white/50 leading-relaxed">
                {content.brandDesc}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-[#C8A45C] mb-4 text-sm tracking-wider">{content.quickLinks}</h4>
              <div className="space-y-2.5">
                {content.quickLinksItems.map((link) => (
                  <a key={link} href="#" className="block text-sm text-white/50 hover:text-[#C8A45C] transition-colors">
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-[#C8A45C] mb-4 text-sm tracking-wider">{content.services}</h4>
              <div className="space-y-2.5">
                {content.servicesItems.map((link) => (
                  <a key={link} href="#" className="block text-sm text-white/50 hover:text-[#C8A45C] transition-colors">
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-[#C8A45C] mb-4 text-sm tracking-wider">{content.contact}</h4>
              <div className="space-y-2.5 text-sm text-white/50">
                <p>2918058304@qq.com</p>
                <p>+86 134 6784 3123</p>
                <p>老挝万象市中心/中国武汉中南民族大学</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30">
              {content.copyright}
            </p>
            <div className="flex items-center gap-4 text-xs text-white/30">
              <a href="#" className="hover:text-[#C8A45C] transition-colors">{content.privacy}</a>
              <a href="#" className="hover:text-[#C8A45C] transition-colors">{content.terms}</a>
              <a href="#" className="hover:text-[#C8A45C] transition-colors">{content.partnership}</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Tab Bar (模仿App) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur-xl border-t border-[#C8A45C]/15 shadow-lg shadow-black/10">
        <div className="flex items-center justify-around h-16 max-w-md mx-auto">
          {bottomTabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => {
                setActiveTab(i);
                if (i === 0) {
                  document.querySelector("#hero")?.scrollIntoView({ behavior: "smooth" });
                } else if (i === 1) {
                  document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
                } else if (i === 2) {
                  document.querySelector("#itinerary")?.scrollIntoView({ behavior: "smooth" });
                } else {
                  toast(content.featureComingSoon, { description: content.personalCenterDesc });
                }
              }}
              className={`flex flex-col items-center gap-1 px-3 py-1 transition-all ${
                activeTab === i ? "text-[#8B2D2D]" : "text-[#8B7B6F]"
              }`}
            >
              <tab.icon size={20} strokeWidth={activeTab === i ? 2.5 : 1.5} />
              <span className={`text-[10px] ${activeTab === i ? "font-semibold" : "font-normal"}`}>
                {tab.label}
              </span>
              {activeTab === i && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute top-0 w-12 h-0.5 bg-[#8B2D2D] rounded-full"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
