/*
 * Design: 「皇家金殿」东南亚宫廷美学
 * 热门目的地：卡片流展示老挝核心旅游目的地
 */
import { motion } from "framer-motion";
import { MapPin, Star, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/ConfigContext";

const destinationsData = {
  CN: [
    {
      name: "琅勃拉邦",
      nameEn: "Luang Prabang",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663339511512/PvIGCKYsNHlkixJd.jpg",
      desc: "世界文化遗产古城，清晨布施、金碧辉煌的寺庙群与湄公河交汇的宁静之地",
      rating: 4.9,
      arCount: 18,
      tags: ["世界遗产", "寺庙", "布施"],
    },
    {
      name: "万象",
      nameEn: "Vientiane",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663339511512/grNBdGEdwJjSRGvH.jpg",
      desc: "老挝首都，塔銮金塔、凯旋门与法式殖民建筑交织的东南亚明珠",
      rating: 4.7,
      arCount: 15,
      tags: ["首都", "塔銮", "凯旋门"],
    },
    {
      name: "万荣",
      nameEn: "Vang Vieng",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663339511512/cBvjPzMTsMVJaGnS.jpg",
      desc: "喀斯特地貌与南松河的完美邂逅，热气球、蓝色泻湖与户外探险天堂",
      rating: 4.8,
      arCount: 12,
      tags: ["自然风光", "探险", "蓝色泻湖"],
    },
    {
      name: "占巴塞",
      nameEn: "Champasak",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663339511512/sxjOBJmxfQhCogms.jpg",
      desc: "瓦普寺遗址所在地，高棉文明的北方前哨，千年石刻诉说着古老的故事",
      rating: 4.6,
      arCount: 10,
      tags: ["世界遗产", "考古", "高棉文化"],
    },
  ],
  EN: [
    {
      name: "Luang Prabang",
      nameEn: "Luang Prabang",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663339511512/PvIGCKYsNHlkixJd.jpg",
      desc: "A UNESCO World Heritage ancient city with serene morning alms-giving, magnificent temples, and the Mekong River confluence",
      rating: 4.9,
      arCount: 18,
      tags: ["World Heritage", "Temples", "Alms-giving"],
    },
    {
      name: "Vientiane",
      nameEn: "Vientiane",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663339511512/grNBdGEdwJjSRGvH.jpg",
      desc: "The capital of Laos, where the golden Pha That Luang, Patuxai Gate, and French colonial architecture blend",
      rating: 4.7,
      arCount: 15,
      tags: ["Capital", "Pha That Luang", "Patuxai"],
    },
    {
      name: "Vang Vieng",
      nameEn: "Vang Vieng",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663339511512/cBvjPzMTsMVJaGnS.jpg",
      desc: "Karst landscape meets the Nam Song River with hot air balloons, blue lagoons, and outdoor adventure paradise",
      rating: 4.8,
      arCount: 12,
      tags: ["Natural Beauty", "Adventure", "Blue Lagoon"],
    },
    {
      name: "Champasak",
      nameEn: "Champasak",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663339511512/sxjOBJmxfQhCogms.jpg",
      desc: "Home to Wat Phu temple ruins, a northern outpost of Khmer civilization with ancient stone carvings",
      rating: 4.6,
      arCount: 10,
      tags: ["World Heritage", "Archaeology", "Khmer Culture"],
    },
  ],
};

const i18nText = {
  CN: {
    sectionLabel: "Popular Destinations",
    title: "热门目的地",
    description: "探索老挝最令人心动的旅游胜地，每一处都配备了AR增强现实导览",
    arSites: "AR景点",
    learnMore: "了解更多",
    comingSoon: "功能即将上线",
    detailsDesc: (name: string) => `${name}详情页正在开发中`,
  },
  EN: {
    sectionLabel: "Popular Destinations",
    title: "Popular Destinations",
    description: "Explore the most captivating tourist destinations in Laos, each equipped with AR augmented reality tours",
    arSites: "AR Sites",
    learnMore: "Learn More",
    comingSoon: "Coming Soon",
    detailsDesc: (name: string) => `${name} details page is under development`,
  },
};

export default function Destinations() {
  const { language } = useLanguage();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const destinations = destinationsData[language];
  const content = i18nText[language];

  return (
    <section id="destinations" className="py-20 lg:py-28 bg-gradient-to-b from-[#FFF8E7] to-[#F5EDD8]">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#C8A45C] text-sm tracking-[0.3em] uppercase font-medium">
            {content.sectionLabel}
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-[#3D2B1F] mt-3 mb-4">
            {content.title}
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent mx-auto mb-4" />
          <p className="text-[#6B5B4F] max-w-lg mx-auto leading-relaxed">
            {content.description}
          </p>
        </motion.div>

        {/* Destination Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => toast(content.comingSoon, { description: content.detailsDesc(dest.name) })}
              className="group relative rounded-2xl overflow-hidden bg-white shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-[#C8A45C]/15 transition-all duration-500 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-56 lg:h-64 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredIdx === i ? "scale-110" : "scale-100"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* AR Badge */}
                <div className="absolute top-3 right-3 bg-[#C8A45C]/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  {dest.arCount} {content.arSites}
                </div>

                {/* Location */}
                <div className="absolute bottom-3 left-3">
                  <h3 className="font-display text-xl font-bold text-white mb-0.5">
                    {dest.name}
                  </h3>
                  <div className="flex items-center gap-1 text-white/70 text-xs">
                    <MapPin size={12} />
                    <span>{dest.nameEn}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-sm text-[#6B5B4F] leading-relaxed mb-3 line-clamp-2">
                  {dest.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {dest.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full bg-[#C8A45C]/8 text-[#8B6B3D] border border-[#C8A45C]/15"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-[#C8A45C]/10">
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-[#C8A45C] fill-[#C8A45C]" />
                    <span className="text-sm font-semibold text-[#3D2B1F]">{dest.rating}</span>
                  </div>
                  <span className="text-xs text-[#C8A45C] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    {content.learnMore} <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
