/*
 * Design: 「皇家金殿」东南亚宫廷美学
 * 关于我们：项目愿景、团队信息和联系方式
 */
import { motion } from "framer-motion";
import { Globe, Users, Award, Mail, Phone, MapPin } from "lucide-react";

const LUANG_AERIAL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663339511512/qhrOTqcTdxKKusPW.jpg";

const stats = [
  { icon: Globe, num: "50+", label: "AR景点覆盖" },
  { icon: Users, num: "100K+", label: "预期用户" },
  { icon: Award, num: "3", label: "世界遗产" },
];

const partners = [
  "老挝旅游部",
  "UNESCO亚太区",
  "中老铁路文旅",
  "东盟数字经济",
  "华为云AR",
  "腾讯文旅",
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={LUANG_AERIAL}
          alt="琅勃拉邦鸟瞰"
          className="w-full h-full object-cover opacity-8"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF8E7] via-[#FFF8E7]/97 to-[#FFF8E7]" />
      </div>

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
            About Us
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-[#3D2B1F] mt-3 mb-4">
            关于我们
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent mx-auto" />
        </motion.div>

        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h3 className="font-display text-2xl lg:text-3xl font-bold text-[#3D2B1F] mb-6">
            用科技<span className="text-[#8B2D2D]">重新定义</span>文旅体验
          </h3>
          <p className="text-[#6B5B4F] leading-relaxed text-base lg:text-lg mb-4">
            「探索老挝AR」致力于将前沿的增强现实技术与老挝深厚的历史文化底蕴相结合，
            打造东南亚首个AR智慧文旅平台。我们相信，科技不仅能让旅行更便捷，
            更能让文化遗产以全新的方式触达每一位旅行者。
          </p>
          <p className="text-[#6B5B4F] leading-relaxed text-base lg:text-lg">
            随着中老铁路的开通和东盟数字经济的蓬勃发展，
            老挝正迎来文旅产业的黄金时代。我们的使命是成为连接中国游客与老挝文化的数字桥梁，
            让每一次旅行都成为一次深度的文化对话。
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 lg:gap-8 max-w-2xl mx-auto mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center p-4 lg:p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-[#C8A45C]/10"
            >
              <stat.icon className="mx-auto mb-3 text-[#C8A45C]" size={28} />
              <div className="font-display text-3xl lg:text-4xl font-bold text-[#C8A45C] mb-1">
                {stat.num}
              </div>
              <div className="text-xs lg:text-sm text-[#8B7B6F]">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h4 className="font-display text-lg font-semibold text-[#3D2B1F] mb-6">
            战略合作伙伴
          </h4>
          <div className="flex flex-wrap justify-center gap-3 lg:gap-4 max-w-3xl mx-auto">
            {partners.map((partner) => (
              <div
                key={partner}
                className="px-5 py-2.5 rounded-full bg-white/80 border border-[#C8A45C]/15 text-sm text-[#6B5B4F] font-medium"
              >
                {partner}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 lg:p-10 border border-[#C8A45C]/15 shadow-lg shadow-[#C8A45C]/5"
        >
          <h4 className="font-display text-xl font-bold text-[#3D2B1F] text-center mb-6">
            投资者联系方式
          </h4>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-10 h-10 rounded-full bg-[#C8A45C]/10 flex items-center justify-center">
                <Mail size={18} className="text-[#C8A45C]" />
              </div>
              <span className="text-sm text-[#6B5B4F]">2918058304@qq.com</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-10 h-10 rounded-full bg-[#C8A45C]/10 flex items-center justify-center">
                <Phone size={18} className="text-[#C8A45C]" />
              </div>
              <span className="text-sm text-[#6B5B4F]">+86 134 6784 3123</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-10 h-10 rounded-full bg-[#C8A45C]/10 flex items-center justify-center">
                <MapPin size={18} className="text-[#C8A45C]" />
              </div>
              <span className="text-sm text-[#6B5B4F]">万象市中心 / 中国武汉中南民族大学</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
