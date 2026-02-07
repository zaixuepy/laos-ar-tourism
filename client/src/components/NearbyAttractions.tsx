/*
 * Design: 「皇家金殿」东南亚宫廷美学
 * 周边景区：横向滚动卡片展示
 */
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { toast } from "sonner";

const attractions = [
  {
    name: "光西瀑布",
    nameEn: "Kuang Si Falls",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663339511512/DfYCXQgErsrcCMOr.jpg",
  },
  {
    name: "塔銮",
    nameEn: "Pha That Luang",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663339511512/hDpJzCISzsmdeTXF.jpg",
  },
  {
    name: "蓝色泻湖",
    nameEn: "Blue Lagoon",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663339511512/QdBLdvTOeggLZazh.jpg",
  },
  {
    name: "湄公河日落",
    nameEn: "Mekong Sunset",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663339511512/WCSCjDdVlQoWgexN.jpg",
  },
  {
    name: "瓦普寺",
    nameEn: "Wat Phou",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663339511512/MEDySDruxKMLbwty.jpg",
  },
];

export default function NearbyAttractions() {
  return (
    <section className="py-12 lg:py-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-6"
        >
          <h3 className="font-display text-xl lg:text-2xl font-bold text-[#3D2B1F]">
            周边景区
          </h3>
          <button
            onClick={() => toast("功能即将上线", { description: "更多景区正在开发中" })}
            className="text-sm text-[#C8A45C] font-medium hover:text-[#8B6B3D] transition-colors"
          >
            查看全部 →
          </button>
        </motion.div>

        {/* Horizontal Scroll */}
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          {attractions.map((attr, i) => (
            <motion.div
              key={attr.name}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => toast("功能即将上线", { description: `${attr.name}详情页正在开发中` })}
              className="shrink-0 w-40 lg:w-48 group cursor-pointer"
            >
              <div className="relative h-48 lg:h-56 rounded-xl overflow-hidden mb-2">
                <img
                  src={attr.image}
                  alt={attr.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-sm font-medium">
                  <MapPin size={12} className="text-[#C8A45C]" />
                  <span>{attr.name}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
