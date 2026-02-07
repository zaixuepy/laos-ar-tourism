/*
 * Design: 「皇家金殿」东南亚宫廷美学
 * 行程推荐：时间线形式展示精选旅游路线
 */
import { motion } from "framer-motion";
import { Clock, MapPin, Camera, Utensils, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const MONKS_IMG = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663339511512/PiHeFAaxulrdkNXW.jpg";
const NIGHT_MARKET_IMG = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663339511512/VtSAovhszLgDNfmL.jpg";
const KUANGSI_IMG = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663339511512/fthjqzBkwpYZrsNk.jpg";

const itineraries = [
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
];

export default function Itinerary() {
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
            Recommended Itineraries
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-[#3D2B1F] mt-3 mb-4">
            精选行程推荐
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent mx-auto mb-4" />
          <p className="text-[#6B5B4F] max-w-lg mx-auto leading-relaxed">
            由资深旅行专家精心策划，每条路线均配备AR增强现实导览
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
                  onClick={() => toast("功能即将上线", { description: "行程预订功能正在开发中" })}
                  className="w-full py-2.5 bg-gradient-to-r from-[#C8A45C]/10 to-[#C8A45C]/5 border border-[#C8A45C]/20 rounded-xl text-[#8B6B3D] font-medium text-sm hover:from-[#C8A45C]/20 hover:to-[#C8A45C]/10 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  查看详情 <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
