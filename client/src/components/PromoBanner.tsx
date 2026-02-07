/*
 * Design: 「皇家金殿」东南亚宫廷美学
 * 促销横幅：模仿游敦煌的"得票根享优惠"横幅
 */
import { motion } from "framer-motion";
import { Ticket, ArrowRight, Sparkles } from "lucide-react";
import { toast } from "sonner";

const NIGHT_MARKET = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663339511512/VtSAovhszLgDNfmL.jpg";

export default function PromoBanner() {
  return (
    <section className="py-8 lg:py-12">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onClick={() => toast("功能即将上线", { description: "AR门票预订功能正在开发中" })}
          className="relative rounded-2xl overflow-hidden cursor-pointer group"
        >
          {/* Background */}
          <div className="absolute inset-0">
            <img
              src={NIGHT_MARKET}
              alt="老挝夜市"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#8B2D2D]/90 via-[#8B2D2D]/70 to-[#C8A45C]/60" />
          </div>

          {/* Content */}
          <div className="relative px-6 lg:px-10 py-6 lg:py-8 flex items-center justify-between">
            <div className="flex items-center gap-4 lg:gap-6">
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Ticket size={24} className="text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles size={14} className="text-[#E8D5A0]" />
                  <span className="text-[#E8D5A0] text-xs tracking-wider uppercase font-medium">
                    限时特惠
                  </span>
                </div>
                <h3 className="font-display text-lg lg:text-2xl font-bold text-white">
                  AR门票套餐 · 畅游老挝
                </h3>
                <p className="text-white/70 text-sm mt-1 hidden sm:block">
                  购买AR增强导览门票，解锁全部景点AR体验
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-white font-medium shrink-0">
              <span className="hidden sm:inline text-sm">立即抢购</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
