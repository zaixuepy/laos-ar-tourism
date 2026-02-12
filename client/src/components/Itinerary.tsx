/*
 * Design: 「皇家金殿」东南亚宫廷美学
 * 行程推荐：时间线形式展示精选旅游路线
 */
import { motion } from "framer-motion";
import { Clock, MapPin, Camera, Utensils, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/ConfigContext";

const MONKS_IMG = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663339511512/PiHeFAaxulrdkNXW.jpg";
const NIGHT_MARKET_IMG = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663339511512/VtSAovhszLgDNfmL.jpg";
const KUANGSI_IMG = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663339511512/fthjqzBkwpYZrsNk.jpg";

const itinerariesData = {
  CN: [
    {
      title: "七日世界遗产深度游",
      subtitle: "琅勃拉邦 → 万象 → 占巴塞",
      duration: "7天6晚",
      price: "¥4,980起",
      highlights: [
        "琅勃拉邦清晨布施体验",
        "塔銮AR历史重现",
        "瓦普寺高棉文明探秘",
        "湄公河日落游船",
      ],
      image: MONKS_IMG,
      tag: "最受欢迎",
    },
    {
      title: "三日万象休闲之旅",
      subtitle: "万象市区深度体验",
      duration: "3天2晚",
      price: "¥1,980起",
      highlights: [
        "塔銮+凯旋门AR导览",
        "老挝国家博物馆",
        "万象夜市美食探索",
        "湄公河畔日落漫步",
      ],
      image: NIGHT_MARKET_IMG,
      tag: "短途精选",
    },
    {
      title: "五日自然探险之旅",
      subtitle: "万荣 → 琅勃拉邦",
      duration: "5天4晚",
      price: "¥3,580起",
      highlights: [
        "万荣蓝色泻湖探险",
        "热气球俯瞰喀斯特地貌",
        "光西瀑布丛林徒步",
        "传统手工艺体验",
      ],
      image: KUANGSI_IMG,
      tag: "户外探险",
    },
  ],
  EN: [
    {
      title: "7-Day World Heritage Deep Dive",
      subtitle: "Luang Prabang → Vientiane → Champasak",
      duration: "7 days 6 nights",
      price: "From $698",
      highlights: [
        "Luang Prabang morning alms-giving experience",
        "Pha That Luang AR historical recreation",
        "Wat Phu Khmer civilization exploration",
        "Mekong River sunset cruise",
      ],
      image: MONKS_IMG,
      tag: "Most Popular",
    },
    {
      title: "3-Day Vientiane Leisure Trip",
      subtitle: "Vientiane city deep experience",
      duration: "3 days 2 nights",
      price: "From $278",
      highlights: [
        "Pha That Luang + Patuxai AR tour",
        "Laos National Museum",
        "Vientiane night market food exploration",
        "Mekong riverside sunset walk",
      ],
      image: NIGHT_MARKET_IMG,
      tag: "Short Trip",
    },
    {
      title: "5-Day Nature Adventure",
      subtitle: "Vang Vieng → Luang Prabang",
      duration: "5 days 4 nights",
      price: "From $498",
      highlights: [
        "Vang Vieng blue lagoon adventure",
        "Hot air balloon over karst landscape",
        "Kuang Si waterfall jungle trekking",
        "Traditional handicraft experience",
      ],
      image: KUANGSI_IMG,
      tag: "Outdoor Adventure",
    },
  ],
};

const i18nText = {
  CN: {
    sectionLabel: "Recommended Itineraries",
    title: "精选行程推荐",
    description: "由资深旅行专家精心策划，每条路线均配备AR增强现实导览",
    viewDetails: "查看详情",
    comingSoon: "功能即将上线",
    bookingDesc: "行程预订功能正在开发中",
  },
  EN: {
    sectionLabel: "Recommended Itineraries",
    title: "Recommended Itineraries",
    description: "Carefully curated by experienced travel experts, each route is equipped with AR augmented reality tours",
    viewDetails: "View Details",
    comingSoon: "Coming Soon",
    bookingDesc: "Itinerary booking feature is under development",
  },
};

export default function Itinerary() {
  const { language } = useLanguage();
  const itineraries = itinerariesData[language];
  const content = i18nText[language];

  return (
    <section id="itinerary" className="py-20 lg:py-28 relative">
      <div className="absolute inset-0 opacity-[0.02] bg-pattern" />

      <div className="container relative">
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

        {/* Itinerary Cards */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {itineraries.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-[#C8A45C]/15 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Tag */}
                <div className="absolute top-3 left-3 bg-[#8B2D2D] text-white text-xs font-medium px-3 py-1.5 rounded-full">
                  {item.tag}
                </div>

                {/* Duration & Price */}
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <div className="flex items-center gap-1.5 text-white/90 text-sm">
                    <Clock size={14} />
                    <span>{item.duration}</span>
                  </div>
                  <div className="text-[#E8D5A0] font-display font-bold text-lg">
                    {item.price}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-[#3D2B1F] mb-1">
                  {item.title}
                </h3>
                <div className="flex items-center gap-1 text-[#8B7B6F] text-sm mb-4">
                  <MapPin size={13} />
                  <span>{item.subtitle}</span>
                </div>

                {/* Highlights */}
                <div className="space-y-2.5 mb-5">
                  {item.highlights.map((hl, j) => (
                    <div key={j} className="flex items-start gap-2.5">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#C8A45C] shrink-0" />
                      <span className="text-sm text-[#6B5B4F]">{hl}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={() => toast(content.comingSoon, { description: content.bookingDesc })}
                  className="w-full py-2.5 bg-gradient-to-r from-[#C8A45C]/10 to-[#C8A45C]/5 border border-[#C8A45C]/20 rounded-xl text-[#8B6B3D] font-medium text-sm hover:from-[#C8A45C]/20 hover:to-[#C8A45C]/10 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {content.viewDetails} <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
