/*
 * Design: 「皇家金殿」东南亚宫廷美学
 * Hero Section：全屏沉浸式Banner，金色粒子效果，电影级构图
 * 配置驱动：从 config.json 读取文字和背景
 */
import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { useConfig } from "@/contexts/ConfigContext";

export default function HeroSection() {
  const config = useConfig();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={config.site.heroBackground}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#8B2D2D]/20 to-transparent" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-8 w-px h-32 bg-gradient-to-b from-transparent via-[#C8A45C]/60 to-transparent hidden lg:block" />
      <div className="absolute top-20 right-8 w-px h-32 bg-gradient-to-b from-transparent via-[#C8A45C]/60 to-transparent hidden lg:block" />

      {/* Content */}
      <div className="relative z-10 container text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          {/* Decorative top line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-24 h-px bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent mx-auto mb-8"
          />

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <Sparkles className="text-[#C8A45C]" size={16} />
            <span className="text-[#E8D5A0] text-sm tracking-[0.3em] uppercase font-medium">
              Augmented Reality Tourism
            </span>
            <Sparkles className="text-[#C8A45C]" size={16} />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="font-display text-5xl sm:text-6xl lg:text-8xl font-bold text-white mb-4 leading-tight"
          >
            {config.site.heroTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="font-display text-xl sm:text-2xl lg:text-3xl text-[#E8D5A0] font-light mb-2"
          >
            {config.site.heroSubtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-white/60 text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed"
          >
            {config.site.heroDescription}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="/ar"
              className="px-8 py-3.5 bg-gradient-to-r from-[#C8A45C] to-[#D4B06A] text-white font-semibold rounded-full shadow-2xl shadow-[#C8A45C]/30 hover:shadow-[#C8A45C]/50 transition-all duration-300 hover:-translate-y-1 text-base"
            >
              体验AR导览
            </a>
            <button
              onClick={() => document.querySelector("#destinations")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3.5 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300 text-base backdrop-blur-sm"
            >
              探索目的地
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs tracking-widest uppercase">向下滚动</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="text-[#C8A45C]" size={20} />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FFF8E7] to-transparent" />
    </section>
  );
}
