/**
 * AR 信息卡组件
 * 识别目标后显示的信息卡，支持国际化和流畅动画
 */

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "@/contexts/ConfigContext";

interface ARInfoCardProps {
  isVisible: boolean;
  onClose: () => void;
  targetId: string;
  targetName: string;
  targetNameEn: string;
  description: string;
  descriptionEn: string;
  details?: {
    [key: string]: string;
  };
  detailsEn?: {
    [key: string]: string;
  };
  image?: string;
}

export default function ARInfoCard({
  isVisible,
  onClose,
  targetId,
  targetName,
  targetNameEn,
  description,
  descriptionEn,
  details = {},
  detailsEn = {},
  image,
}: ARInfoCardProps) {
  const { language } = useLanguage();

  const displayName = language === 'CN' ? targetName : targetNameEn;
  const displayDescription = language === 'CN' ? description : descriptionEn;
  const displayDetails = language === 'CN' ? details : detailsEn;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />

          {/* 信息卡 */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[80vh] overflow-y-auto"
          >
            <div className="bg-gradient-to-t from-[#1a1a2e] via-[#1a1a2e]/95 to-[#1a1a2e]/90 backdrop-blur-xl border-t border-[#C8A45C]/20 rounded-t-3xl shadow-2xl">
              {/* 顶部操作栏 */}
              <div className="flex items-center justify-between p-6 border-b border-[#C8A45C]/10">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl font-bold text-[#C8A45C]"
                >
                  {displayName}
                </motion.h2>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                >
                  <X size={24} />
                </motion.button>
              </div>

              {/* 内容区域 */}
              <div className="p-6 space-y-6">
                {/* 图片 */}
                {image && (
                  <motion.img
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 }}
                    src={image}
                    alt={displayName}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                )}

                {/* 描述 */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2"
                >
                  <p className="text-white/80 leading-relaxed">
                    {displayDescription}
                  </p>
                </motion.div>

                {/* 详细信息 */}
                {Object.keys(displayDetails).length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#C8A45C]/10"
                  >
                    {Object.entries(displayDetails).map(([key, value], index) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        className="bg-white/5 rounded-lg p-4 border border-[#C8A45C]/10 hover:border-[#C8A45C]/30 transition-colors"
                      >
                        <p className="text-[#C8A45C] text-sm font-medium mb-1">
                          {key}
                        </p>
                        <p className="text-white/70 text-sm">
                          {value}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* 操作按钮 */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="flex gap-3 pt-4 border-t border-[#C8A45C]/10"
                >
                  <button
                    onClick={onClose}
                    className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors"
                  >
                    {language === 'CN' ? '关闭' : 'Close'}
                  </button>
                  <button
                    className="flex-1 px-4 py-3 bg-[#C8A45C]/20 hover:bg-[#C8A45C]/30 text-[#C8A45C] font-medium rounded-lg transition-colors border border-[#C8A45C]/30"
                  >
                    {language === 'CN' ? '了解更多' : 'Learn More'}
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
