/*
 * Design: 「皇家金殿」东南亚宫廷美学
 * 导航栏：固定顶部，半透明磨砂玻璃效果，金色调
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, FolderOpen } from "lucide-react";

const LOGO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663339511512/rLLGYBbaZSFXGCCN.png";

const navItems = [
  { label: "首页", href: "#hero" },
  { label: "AR体验", href: "#ar-experience" },
  { label: "热门目的地", href: "#destinations" },
  { label: "服务", href: "#services" },
  { label: "行程推荐", href: "#itinerary" },
  { label: "关于我们", href: "#about" },
  { label: "文件管理", href: "/files", isPage: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#FFF8E7]/90 backdrop-blur-xl shadow-lg shadow-[#C8A45C]/10"
            : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick("#hero"); }}
            className="flex items-center gap-3"
          >
            <img src={LOGO_URL} alt="探索老挝" className="h-10 lg:h-12 w-auto" />
            <div className="hidden sm:block">
              <h1 className="font-display text-lg lg:text-xl font-bold text-[#8B2D2D] leading-tight">
                探索老挝
              </h1>
              <p className="text-[10px] lg:text-xs text-[#C8A45C] tracking-[0.2em] font-medium">
                EXPLORE LAOS AR
              </p>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { if (!(item as any).isPage) { e.preventDefault(); handleNavClick(item.href); } }}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  scrolled
                    ? "text-[#3D2B1F] hover:text-[#8B2D2D] hover:bg-[#C8A45C]/10"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {(item as any).isPage && <FolderOpen size={14} className="inline mr-1" />}
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button className={`p-2 rounded-full transition-all ${
              scrolled ? "text-[#3D2B1F] hover:bg-[#C8A45C]/10" : "text-white/80 hover:bg-white/10"
            }`}>
              <Search size={18} />
            </button>
            <button className="px-5 py-2 bg-gradient-to-r from-[#C8A45C] to-[#D4B06A] text-white text-sm font-medium rounded-full shadow-lg shadow-[#C8A45C]/30 hover:shadow-xl hover:shadow-[#C8A45C]/40 transition-all duration-300 hover:-translate-y-0.5">
              开始AR之旅
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-lg transition-all ${
              scrolled ? "text-[#3D2B1F]" : "text-white"
            }`}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#FFF8E7]/98 backdrop-blur-2xl pt-20"
          >
            <div className="container flex flex-col gap-2 py-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => { if (!(item as any).isPage) { e.preventDefault(); handleNavClick(item.href); } }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="px-4 py-4 text-lg font-display font-semibold text-[#3D2B1F] border-b border-[#C8A45C]/20 hover:text-[#8B2D2D] hover:pl-6 transition-all"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-[#C8A45C] to-[#D4B06A] text-white font-medium rounded-full shadow-lg"
              >
                开始AR之旅
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
