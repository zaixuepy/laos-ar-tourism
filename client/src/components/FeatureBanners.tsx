/*
 * Design: 「皇家金殿」东南亚宫廷美学
 * 功能横幅：导游导览和活动日历（模仿游敦煌的横幅入口）
 */
import { motion } from "framer-motion";
import { MapPin, Calendar, ChevronRight, Navigation } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/ConfigContext";

const i18nText = {
  CN: {
    guideTitle: "AR导游导览",
    guideDesc: "智能语音 · 实景导航",
    guideComingSoon: "功能即将上线",
    guideDesc2: "AR导游导览功能正在开发中",
    eventTitle: "活动日历",
    eventDesc: "节庆活动 · 文化体验",
    eventComingSoon: "功能即将上线",
    eventDesc2: "活动日历功能正在开发中",
  },
  EN: {
    guideTitle: "AR Guide Tours",
    guideDesc: "Smart Voice · Real-time Navigation",
    guideComingSoon: "Coming Soon",
    guideDesc2: "AR guide tour feature is under development",
    eventTitle: "Event Calendar",
    eventDesc: "Festivals · Cultural Experiences",
    eventComingSoon: "Coming Soon",
    eventDesc2: "Event calendar feature is under development",
  },
};

export default function FeatureBanners() {
  const { language } = useLanguage();
  const content = i18nText[language];
  return (
    <section className="py-6 lg:py-10">
      <div className="container space-y-4">
        {/* AR导游导览 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onClick={() => toast(content.guideComingSoon, { description: content.guideDesc2 })}
          className="relative rounded-2xl overflow-hidden cursor-pointer group"
          style={{
            background: "linear-gradient(135deg, #FFF0E0 0%, #FFE4CC 50%, #FFDAB9 100%)",
          }}
        >
          <div className="px-6 lg:px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#C8A45C]/15 flex items-center justify-center">
                <Navigation size={22} className="text-[#C8A45C]" />
              </div>
              <div>
                <h3 className="font-display text-lg lg:text-xl font-bold text-[#8B2D2D]">
                  {content.guideTitle}
                </h3>
                <p className="text-sm text-[#8B6B3D]">{content.guideDesc}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[#C8A45C]">
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform delay-75 -ml-3" />
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform delay-150 -ml-3" />
            </div>
          </div>
        </motion.div>

        {/* 活动日历 */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onClick={() => toast(content.eventComingSoon, { description: content.eventDesc2 })}
          className="relative rounded-2xl overflow-hidden cursor-pointer group"
          style={{
            background: "linear-gradient(135deg, #FFF8E7 0%, #F5EDD8 50%, #EDE3CC 100%)",
          }}
        >
          <div className="px-6 lg:px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#8B2D2D]/10 flex items-center justify-center">
                <Calendar size={22} className="text-[#8B2D2D]" />
              </div>
              <div>
                <h3 className="font-display text-lg lg:text-xl font-bold text-[#8B2D2D]">
                  {content.eventTitle}
                </h3>
                <p className="text-sm text-[#8B6B3D]">{content.eventDesc}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[#8B2D2D]">
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform delay-75 -ml-3" />
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform delay-150 -ml-3" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
