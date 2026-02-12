/*
 * Design: 「皇家金殿」东南亚宫廷美学
 * AR体验展示区：核心亮点，展示AR技术与老挝文化的结合
 */
import { motion } from "framer-motion";
import { Smartphone, Eye, MapPin, History } from "lucide-react";
import { useLanguage } from "@/contexts/ConfigContext";

const AR_DEMO = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663339511512/rubmvkinydjrvzwE.jpg";
const AR_BANNER = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663339511512/vZDCDCZHrSJlwDYD.jpg";

const featuresData = {
  CN: [
    {
      icon: Eye,
      title: "实景 AR识别",
      desc: "对准古迹，即刃呈现历史信息与3D重建画面",
    },
    {
      icon: MapPin,
      title: "智能导览",
      desc: "基于GPS定位的AR兴趣点推送，不错过任何精彩",
    },
    {
      icon: History,
      title: "时空穿越",
      desc: "AR还原万年前的王朝盛景，沉浸式历史体验",
    },
    {
      icon: Smartphone,
      title: "多语言支持",
      desc: "支持中、英、老、泰等多语言AR解说",
    },
  ],
  EN: [
    {
      icon: Eye,
      title: "Real-World AR Recognition",
      desc: "Point at ancient sites and instantly see historical information and 3D reconstructions",
    },
    {
      icon: MapPin,
      title: "Smart Navigation",
      desc: "GPS-based AR points of interest push, never miss any highlights",
    },
    {
      icon: History,
      title: "Time Travel",
      desc: "AR recreates ancient dynasty splendor, immersive historical experience",
    },
    {
      icon: Smartphone,
      title: "Multi-Language Support",
      desc: "Support Chinese, English, Lao, Thai and more languages for AR narration",
    },
  ],
};

export default function ARExperience() {
  const { language } = useLanguage();
  const features = featuresData[language];

  const i18nText = {
    CN: {
      coreTitle: 'AR增强现实体验',
      coreDesc: '将前沿的增强现实技术与老挝丰富的历史文化遗产完美融合，为游客带来前所未有的沉浸式文旅体验',
      mainTitle: '指向古迹，',
      mainSubtitle: '重温王朝的辉煌历史',
      mainDesc: '只需将手机对准老挝的历史古迹，AR技术将即刻为您呈现丰富的历史信息、3D建筑重建和沉浸式的文化故事。',
      arScanning: 'AR识别中...',
      stats: [
        { num: '50+', label: 'AR景点' },
        { num: '6', label: '语言支持' },
        { num: '1000+', label: '历史故事' },
      ],
    },
    EN: {
      coreTitle: 'AR Augmented Reality Experience',
      coreDesc: 'Perfectly blend cutting-edge augmented reality technology with Laos rich historical and cultural heritage, bringing unprecedented immersive tourism experiences to visitors.',
      mainTitle: 'Point to Ancient Sites,',
      mainSubtitle: 'Relive the Glory of Dynasties',
      mainDesc: 'Simply point your phone at Laos historical sites, and AR technology will instantly present you with rich historical information, 3D architectural reconstructions, and immersive cultural stories.',
      arScanning: 'AR Scanning...',
      stats: [
        { num: '50+', label: 'AR Sites' },
        { num: '6', label: 'Languages' },
        { num: '1000+', label: 'Stories' },
      ],
    },
  };

  const content = i18nText[language];

  return (
    <section id="ar-experience" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={AR_BANNER}
          alt="AR旅游概念"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF8E7] via-[#FFF8E7]/95 to-[#FFF8E7]" />
      </div>

      <div className="container relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="text-[#C8A45C] text-sm tracking-[0.3em] uppercase font-medium">
            {language === 'CN' ? '核心技术' : 'Core Technology'}
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-[#3D2B1F] mt-3 mb-4">
            {content.coreTitle}
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent mx-auto mb-4" />
          <p className="text-[#6B5B4F] max-w-2xl mx-auto leading-relaxed">
            {content.coreDesc}
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-8 bg-gradient-to-br from-[#C8A45C]/20 to-[#8B2D2D]/10 rounded-[3rem] blur-3xl" />

              {/* Phone frame */}
              <div className="relative w-[280px] sm:w-[320px] rounded-[2.5rem] overflow-hidden border-[6px] border-[#2A2A2A] shadow-2xl shadow-black/30">
                <img
                  src={AR_DEMO}
                  alt="AR演示 - 塔銮增强现实"
                  className="w-full h-auto"
                />
                {/* Phone notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#2A2A2A] rounded-b-2xl" />
              </div>

              {/* Floating labels */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -right-4 top-1/4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-lg border border-[#C8A45C]/20"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-medium text-[#3D2B1F]">{content.arScanning}</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.5 }}
                className="absolute -left-4 bottom-1/3 bg-gradient-to-r from-[#C8A45C] to-[#D4B06A] rounded-xl px-4 py-2.5 shadow-lg"
              >
                <span className="text-xs font-medium text-white">📍 塔銮 · AD 1566</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="font-display text-2xl lg:text-3xl font-bold text-[#3D2B1F] mb-3">
              {content.mainTitle}<br />
              <span className="text-[#8B2D2D]">{content.mainSubtitle}</span>
            </h3>
            <p className="text-[#6B5B4F] mb-8 leading-relaxed">
              {content.mainDesc}
            </p>

            <div className="space-y-5">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C8A45C]/15 to-[#C8A45C]/5 border border-[#C8A45C]/20 flex items-center justify-center shrink-0 group-hover:from-[#C8A45C]/25 group-hover:to-[#C8A45C]/10 transition-all duration-300">
                    <feature.icon size={20} className="text-[#C8A45C]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#3D2B1F] mb-1">{feature.title}</h4>
                    <p className="text-sm text-[#8B7B6F] leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              {content.stats.map((stat: any) => (
                <div key={stat.label} className="text-center p-3 rounded-xl bg-[#C8A45C]/5 border border-[#C8A45C]/10">
                  <div className="font-display text-2xl font-bold text-[#C8A45C]">{stat.num}</div>
                  <div className="text-xs text-[#8B7B6F] mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
