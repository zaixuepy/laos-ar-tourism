import { useConfigSafe } from "@/contexts/ConfigContext";
import ARScene from "@/components/ARScene";
import DebugPanel from "@/components/DebugPanel";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

export default function ARPage() {
  const { config } = useConfigSafe();
  const [isDebugMode, setIsDebugMode] = useState(false);
  const [modelParams, setModelParams] = useState<Record<string, { scale: string; position: string; rotation: string }>>({});

  useEffect(() => {
    // Check URL for debug mode
    const params = new URLSearchParams(window.location.search);
    setIsDebugMode(params.get("debug") === "true");

    // Initialize model params from config
    if (config?.ar?.models) {
      const initial: Record<string, { scale: string; position: string; rotation: string }> = {};
      config.ar.models.forEach((m) => {
        initial[m.id] = {
          scale: m.scale,
          position: m.position,
          rotation: m.rotation,
        };
      });
      setModelParams(initial);
    }
  }, [config]);

  if (!config) return null;

  const handleParamChange = (modelId: string, param: string, value: string) => {
    setModelParams((prev) => ({
      ...prev,
      [modelId]: {
        ...prev[modelId],
        [param]: value,
      },
    }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Back button */}
      <a
        href="/"
        className="absolute top-4 left-4 z-[60] flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-all"
      >
        <ArrowLeft size={16} />
        <span className="text-sm">返回首页</span>
      </a>

      {/* AR Scene */}
      <ARScene config={config} modelParams={modelParams} />

      {/* Debug Panel (only in debug mode) */}
      {isDebugMode && (
        <DebugPanel
          config={config}
          modelParams={modelParams}
          onParamChange={handleParamChange}
        />
      )}
    </div>
  );
}
