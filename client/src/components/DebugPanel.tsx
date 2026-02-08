import { useState } from "react";
import { Copy, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import type { SiteConfig } from "@/contexts/ConfigContext";

interface DebugPanelProps {
  config: SiteConfig;
  modelParams: Record<string, { scale: string; position: string; rotation: string }>;
  onParamChange: (modelId: string, param: string, value: string) => void;
}

export default function DebugPanel({
  config,
  modelParams,
  onParamChange,
}: DebugPanelProps) {
  const [expanded, setExpanded] = useState(true);
  const [selectedModelId, setSelectedModelId] = useState(config.ar.models[0]?.id || "");

  const selectedModel = config.ar.models.find((m) => m.id === selectedModelId);
  const params = modelParams[selectedModelId];

  const handleCopyJSON = () => {
    if (!params) return;

    const jsonStr = JSON.stringify(
      {
        id: selectedModelId,
        scale: params.scale,
        position: params.position,
        rotation: params.rotation,
      },
      null,
      2
    );

    navigator.clipboard.writeText(jsonStr).then(() => {
      toast.success("已复制到剪贴板", {
        description: "粘贴到 config.json 中的 ar.models 数组即可",
      });
    });
  };

  const parseVector = (str: string): [number, number, number] => {
    const parts = str.split(" ").map(Number);
    return [parts[0] || 0, parts[1] || 0, parts[2] || 0];
  };

  const handleSliderChange = (param: string, axis: number, value: number) => {
    if (!params) return;

    const current = parseVector(params[param as keyof typeof params]);
    current[axis] = value;
    const newValue = current.join(" ");

    onParamChange(selectedModelId, param, newValue);
  };

  if (!selectedModel || !params) return null;

  const scale = parseVector(params.scale);
  const position = parseVector(params.position);
  const rotation = parseVector(params.rotation);

  return (
    <div className="fixed bottom-8 right-8 z-[100] max-w-sm">
      {/* Panel Container */}
      <div className="bg-black/95 backdrop-blur-xl border border-[#C8A45C]/30 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#C8A45C]/20 to-[#8B2D2D]/20 border-b border-[#C8A45C]/20 cursor-pointer hover:bg-gradient-to-r hover:from-[#C8A45C]/30 hover:to-[#8B2D2D]/30 transition-colors"
          onClick={() => setExpanded(!expanded)}
        >
          <h3 className="text-[#C8A45C] font-bold text-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C8A45C] animate-pulse" />
            开发者调试面板
          </h3>
          {expanded ? (
            <ChevronUp size={18} className="text-[#C8A45C]" />
          ) : (
            <ChevronDown size={18} className="text-[#C8A45C]" />
          )}
        </div>

        {/* Content */}
        {expanded && (
          <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            {/* Model Selector */}
            <div>
              <label className="block text-xs font-semibold text-[#C8A45C] mb-2 uppercase tracking-wider">
                选择模型
              </label>
              <select
                value={selectedModelId}
                onChange={(e) => setSelectedModelId(e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-[#C8A45C]/20 rounded-lg text-white text-sm focus:outline-none focus:border-[#C8A45C]/50 transition-colors"
              >
                {config.ar.models.map((m) => (
                  <option key={m.id} value={m.id} className="bg-black">
                    {m.name || m.id}
                  </option>
                ))}
              </select>
            </div>

            {/* Scale Controls */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-[#D4B06A] uppercase tracking-wider">
                缩放 (Scale)
              </h4>
              {["X", "Y", "Z"].map((axis, idx) => (
                <div key={axis}>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs text-white/70">{axis} 轴</label>
                    <span className="text-xs font-mono text-[#C8A45C]">
                      {scale[idx].toFixed(2)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.1"
                    value={scale[idx]}
                    onChange={(e) =>
                      handleSliderChange("scale", idx, parseFloat(e.target.value))
                    }
                    className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#C8A45C]"
                  />
                </div>
              ))}
            </div>

            {/* Position Controls */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-[#D4B06A] uppercase tracking-wider">
                位置 (Position)
              </h4>
              {["X", "Y", "Z"].map((axis, idx) => (
                <div key={axis}>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs text-white/70">{axis} 轴</label>
                    <span className="text-xs font-mono text-[#C8A45C]">
                      {position[idx].toFixed(2)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    step="0.1"
                    value={position[idx]}
                    onChange={(e) =>
                      handleSliderChange("position", idx, parseFloat(e.target.value))
                    }
                    className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#C8A45C]"
                  />
                </div>
              ))}
            </div>

            {/* Rotation Controls */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-[#D4B06A] uppercase tracking-wider">
                旋转 (Rotation)
              </h4>
              {["X", "Y", "Z"].map((axis, idx) => (
                <div key={axis}>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs text-white/70">{axis} 轴</label>
                    <span className="text-xs font-mono text-[#C8A45C]">
                      {rotation[idx].toFixed(0)}°
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    step="1"
                    value={rotation[idx]}
                    onChange={(e) =>
                      handleSliderChange("rotation", idx, parseFloat(e.target.value))
                    }
                    className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#C8A45C]"
                  />
                </div>
              ))}
            </div>

            {/* Copy JSON Button */}
            <button
              onClick={handleCopyJSON}
              className="w-full px-4 py-3 bg-gradient-to-r from-[#C8A45C] to-[#D4B06A] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#C8A45C]/50 transition-all flex items-center justify-center gap-2 text-sm"
            >
              <Copy size={14} />
              复制 JSON 参数
            </button>

            {/* Current Values Display */}
            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
              <p className="text-xs text-white/50 mb-2 font-mono">当前参数：</p>
              <pre className="text-xs text-[#C8A45C] font-mono overflow-x-auto whitespace-pre-wrap break-words">
                {JSON.stringify(
                  {
                    scale: params.scale,
                    position: params.position,
                    rotation: params.rotation,
                  },
                  null,
                  2
                )}
              </pre>
            </div>

            {/* Instructions */}
            <div className="p-3 bg-[#8B2D2D]/10 rounded-lg border border-[#8B2D2D]/20">
              <p className="text-xs text-white/70 leading-relaxed">
                💡 <strong>提示：</strong>调整滑块实时预览模型效果，满意后点击"复制 JSON 参数"按钮，粘贴到 config.json 中保存。
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Floating Badge (when collapsed) */}
      {!expanded && (
        <div className="mt-2 text-center text-xs text-[#C8A45C]/70 px-3 py-1 bg-black/50 rounded-full border border-[#C8A45C]/20">
          点击展开调试面板
        </div>
      )}
    </div>
  );
}
