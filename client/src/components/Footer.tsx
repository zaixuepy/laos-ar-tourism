/*
 * Design: 「皇家金殿」东南亚宫廷美学
 * Footer：优雅的底部区域 + 模拟App底部导航栏
 */
import { motion } from "framer-motion";
import { Home, Compass, Map, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const LOGO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663339511512/rLLGYBbaZSFXGCCN.png";

const bottomTabs = [
  { icon: Home, label: "首页", active: true },
  { icon: Compass, label: "服务", active: false },
  { icon: Map, label: "行程", active: false },
  { icon: User, label: "我的", active: false },
];

export default function Footer() {
  const [activeTab, setActiveTab] = useState(0);

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
                <img src={LOGO_URL} alt="探索老挝" className="h-10 w-auto" />
                <div>
                  <h3 className="font-display text-lg font-bold text-white">探索老挝</h3>
                  <p className="text-[10px] text-[#C8A45C] tracking-[0.2em]">EXPLORE LAOS AR</p>
                </div>
              </div>
              <p className="text-sm text-white/50 leading-relaxed">
                东南亚首个AR智慧文旅平台，用增强现实技术连接千年文明与现代旅行。
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-[#C8A45C] mb-4 text-sm tracking-wider">快速链接</h4>
              <div className="space-y-2.5">
                {["AR体验", "热门目的地", "行程推荐", "攻略资讯"].map((link) => (
                  <a key={link} href="#" className="block text-sm text-white/50 hover:text-[#C8A45C] transition-colors">
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-[#C8A45C] mb-4 text-sm tracking-wider">服务</h4>
              <div className="space-y-2.5">
                {["景区门票", "酒店预订", "导游导览", "文创特产"].map((link) => (
                  <a key={link} href="#" className="block text-sm text-white/50 hover:text-[#C8A45C] transition-colors">
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-[#C8A45C] mb-4 text-sm tracking-wider">联系我们</h4>
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
              © 2026 探索老挝 AR. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-white/30">
              <a href="#" className="hover:text-[#C8A45C] transition-colors">隐私政策</a>
              <a href="#" className="hover:text-[#C8A45C] transition-colors">服务条款</a>
              <a href="#" className="hover:text-[#C8A45C] transition-colors">合作洽谈</a>
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
                  toast("功能即将上线", { description: "个人中心正在开发中" });
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
