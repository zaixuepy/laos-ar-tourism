/*
 * Design: 「皇家金殿」东南亚宫廷美学
 * 服务入口网格：模仿游敦煌的功能入口，老挝特色图标
 */
import { motion } from "framer-motion";
import { Camera, Utensils, Landmark, Hotel, Ticket, Music, Compass, ShoppingBag } from "lucide-react";

const services = [
  { icon: Camera, label: "AR景点", desc: "增强现实导览", color: "#C8A45C" },
  { icon: Utensils, label: "老挝美食", desc: "地道风味推荐", color: "#8B2D2D" },
  { icon: Landmark, label: "文化遗产", desc: "世界遗产探索", color: "#2E6B8A" },
  { icon: Hotel, label: "酒店住宿", desc: "精选住宿体验", color: "#C8A45C" },
  { icon: Ticket, label: "景区门票", desc: "便捷购票服务", color: "#8B2D2D" },
  { icon: Music, label: "特色演出", desc: "传统文化表演", color: "#2E6B8A" },
  { icon: Compass, label: "导游导览", desc: "专业向导服务", color: "#C8A45C" },
  { icon: ShoppingBag, label: "文创特产", desc: "手工艺品精选", color: "#8B2D2D" },
];

export default function ServiceGrid() {
  return (
    <section id="services" className="py-20 lg:py-28 relative">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-pattern" />

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
            Our Services
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-[#3D2B1F] mt-3 mb-4">
            一站式文旅服务
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent mx-auto mb-4" />
          <p className="text-[#6B5B4F] max-w-lg mx-auto leading-relaxed">
            从AR智慧导览到地道美食推荐，为您打造全方位的老挝旅行体验
          </p>
        </motion.div>

        {/* Service Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6 max-w-4xl mx-auto">
          {services.map((service, i) => (
            <motion.div
              key={service.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group flex flex-col items-center p-5 lg:p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#C8A45C]/10 hover:border-[#C8A45C]/30 hover:shadow-xl hover:shadow-[#C8A45C]/10 transition-all duration-300 cursor-pointer"
            >
              <div
                className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${service.color}15, ${service.color}25)`,
                  border: `1px solid ${service.color}30`,
                }}
              >
                <service.icon
                  size={26}
                  style={{ color: service.color }}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="font-semibold text-[#3D2B1F] text-sm lg:text-base mb-1">
                {service.label}
              </h3>
              <p className="text-[#8B7B6F] text-xs hidden sm:block">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
