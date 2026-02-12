/*
 * Design: 「皇家金殿」东南亚宫廷美学
 * 导航栏：固定顶部，半透明磨砂玻璃效果，金色调
 * 配置驱动：从 config.json 读取导航项
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Globe } from "lucide-react";
import { useConfig, useLanguage } from "@/contexts/ConfigContext";

export default function Navbar() {
  const config = useConfig();
  const { language, setLanguage } = useLanguage();
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
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#hero");
            }}
            className="flex items-center gap-3"
          >
            <img src={config.site.logo} alt={config.site.title} className="h-10 lg:h-12 w-auto" />
            <div className="hidden sm:block">
              <h1 className="font-display text-lg lg:text-xl font-bold text-[#8B2D2D] leading-tight">
                {config.site.title}
              </h1>
              <p className="text-[10px] lg:text-xs text-[#C8A45C] tracking-[0.2em] font-medium">
                {config.site.titleEn}
              </p>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {config.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  scrolled
                    ? "text-[#3D2B1F] hover:text-[#8B2D2D] hover:bg-[#C8A45C]/10"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              className={`p-2 rounded-full transition-all ${
                scrolled ? "text-[#3D2B1F] hover:bg-[#C8A45C]/10" : "text-white/80 hover:bg-white/10"
              }`}
            >
              <Search size={18} />
            </button>
            
            {/* Language Toggle Button */}
            <motion.button
              onClick={() => setLanguage(language === 'CN' ? 'EN' : 'CN')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-2 rounded-full font-medium text-sm transition-all flex items-center gap-2 ${
                scrolled
                  ? "bg-[#C8A45C]/20 text-[#8B2D2D] hover:bg-[#C8A45C]/30"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              title="切换语言 / Switch Language"
            >
              <Globe size={16} />
              <span>{language}</span>
            </motion.button>
            
            <a
              href="/ar"
              className="px-5 py-2 bg-gradient-to-r from-[#C8A45C] to-[#D4B06A] text-white text-sm font-medium rounded-full shadow-lg shadow-[#C8A45C]/30 hover:shadow-xl hover:shadow-[#C8A45C]/40 transition-all duration-300 hover:-translate-y-0.5"
            >
              {language === 'CN' ? '开始AR之旅' : 'Start AR Tour'}
            </a>
          </div>

          {/* Language Toggle (Mobile) */}
          <motion.button
            onClick={() => setLanguage(language === 'CN' ? 'EN' : 'CN')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`lg:hidden p-2 rounded-full transition-all ${
              scrolled ? "text-[#8B2D2D]" : "text-white"
            }`}
            title="切换语言 / Switch Language"
          >
            <Globe size={20} />
          </motion.button>

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
              {config.nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="px-4 py-4 text-lg font-display font-semibold text-[#3D2B1F] border-b border-[#C8A45C]/20 hover:text-[#8B2D2D] hover:pl-6 transition-all"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href="/ar"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-[#C8A45C] to-[#D4B06A] text-white font-medium rounded-full shadow-lg text-center"
              >
                {language === 'CN' ? '开始AR之旅' : 'Start AR Tour'}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
