/*
 * Design: 「皇家金殿」东南亚宫廷美学
 * 攻略与资讯：旅游攻略卡片展示
 */
import { motion } from "framer-motion";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/ConfigContext";

const MEKONG_SUNSET = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663339511512/CDzLlITMRwccsdvv.jpg";
const BLUE_LAGOON = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663339511512/QdBLdvTOeggLZazh.jpg";
const FOOD_IMG = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663339511512/byxfDYIQecTxylVk.jpg";
const MONKS_IMG2 = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663339511512/bcwzsxKplxSXscRF.jpg";

const guidesData = {
  CN: [
    {
      title: "琅勃拉邦三日完美攻略",
      desc: "从清晨布施到夜市美食，手把手教你玩转这座世界遗产古城",
      image: MONKS_IMG2,
      date: "2026-01-15",
      category: "攻略",
      readTime: "8分钟",
    },
    {
      title: "老挝美食地图：不可错过的十大佳肴",
      desc: "从Laap到糯米饭，探索老挝最地道的味觉体验",
      image: FOOD_IMG,
      date: "2026-01-20",
      category: "攻略",
      readTime: "6分钟",
    },
    {
      title: "万荣蓝色泻湖探险指南",
      desc: "如何选择最适合你的蓝色泻湖，以及周边隐藏的宝藏景点",
      image: BLUE_LAGOON,
      date: "2026-01-25",
      category: "攻略",
      readTime: "5分钟",
    },
    {
      title: "湄公河日落：最佳观赏地点推荐",
      desc: "在老挝的哪些地方可以看到最美的湄公河日落",
      image: MEKONG_SUNSET,
      date: "2026-02-01",
      category: "资讯",
      readTime: "4分钟",
    },
  ],
  EN: [
    {
      title: "Perfect 3-Day Luang Prabang Guide",
      desc: "From morning alms-giving to night market food, learn how to explore this UNESCO World Heritage city",
      image: MONKS_IMG2,
      date: "2026-01-15",
      category: "Guides",
      readTime: "8 min",
    },
    {
      title: "Laos Food Map: 10 Must-Try Dishes",
      desc: "From Laap to sticky rice, explore the most authentic flavors of Laos",
      image: FOOD_IMG,
      date: "2026-01-20",
      category: "Guides",
      readTime: "6 min",
    },
    {
      title: "Vang Vieng Blue Lagoon Adventure Guide",
      desc: "How to choose the best blue lagoon for you and hidden gems nearby",
      image: BLUE_LAGOON,
      date: "2026-01-25",
      category: "Guides",
      readTime: "5 min",
    },
    {
      title: "Mekong Sunset: Best Viewing Spots",
      desc: "Where to watch the most beautiful Mekong River sunsets in Laos",
      image: MEKONG_SUNSET,
      date: "2026-02-01",
      category: "News",
      readTime: "4 min",
    },
  ],
};

const i18nText = {
  CN: {
    sectionLabel: "Travel Guides",
    title: "攻略与资讯",
    tabGuides: "攻略",
    tabNews: "资讯",
    readMore: "阅读全文",
    comingSoon: "功能即将上线",
    articleDesc: "文章详情页正在开发中",
  },
  EN: {
    sectionLabel: "Travel Guides",
    title: "Guides & News",
    tabGuides: "Guides",
    tabNews: "News",
    readMore: "Read More",
    comingSoon: "Coming Soon",
    articleDesc: "Article details page is under development",
  },
};

export default function GuideSection() {
  const { language } = useLanguage();
  const guides = guidesData[language];
  const content = i18nText[language];
  
  const tabLabels = language === 'CN' ? ["攻略", "资讯"] : ["Guides", "News"];
  const [activeTab, setActiveTab] = useState(tabLabels[0]);
  const filtered = guides.filter((g) => g.category === activeTab);

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-[#F5EDD8] to-[#FFF8E7]">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-[#C8A45C] text-sm tracking-[0.3em] uppercase font-medium">
            {content.sectionLabel}
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-[#3D2B1F] mt-3 mb-4">
            {content.title}
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent mx-auto" />
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-1 mb-10">
          {tabLabels.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab
                  ? "bg-[#C8A45C] text-white shadow-lg shadow-[#C8A45C]/30"
                  : "text-[#6B5B4F] hover:bg-[#C8A45C]/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Guide Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((guide, i) => (
            <motion.div
              key={guide.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => toast(content.comingSoon, { description: content.articleDesc })}
              className="group bg-white rounded-2xl overflow-hidden shadow-md shadow-black/5 hover:shadow-xl hover:shadow-[#C8A45C]/10 transition-all duration-500 cursor-pointer"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white/80 text-xs">
                  <BookOpen size={12} />
                  <span>{guide.readTime}</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1.5 text-[#8B7B6F] text-xs mb-2">
                  <Calendar size={12} />
                  <span>{guide.date}</span>
                </div>
                <h3 className="font-semibold text-[#3D2B1F] mb-2 line-clamp-1 group-hover:text-[#8B2D2D] transition-colors">
                  {guide.title}
                </h3>
                <p className="text-sm text-[#8B7B6F] line-clamp-2 leading-relaxed">
                  {guide.desc}
                </p>
                <div className="mt-3 flex items-center gap-1 text-[#C8A45C] text-xs font-medium group-hover:gap-2 transition-all">
                  {content.readMore} <ArrowRight size={12} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
