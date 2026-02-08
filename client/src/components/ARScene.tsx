import { useEffect, useRef, useState } from "react";
import type { SiteConfig } from "@/contexts/ConfigContext";

interface ARSceneProps {
  config: SiteConfig;
  modelParams: Record<string, { scale: string; position: string; rotation: string }>;
}

export default function ARScene({ config, modelParams }: ARSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "scanning" | "found" | "error">("loading");
  const [loadProgress, setLoadProgress] = useState(0);
  const sceneInitialized = useRef(false);

  useEffect(() => {
    if (sceneInitialized.current) return;
    sceneInitialized.current = true;

    loadARLibraries();
  }, []);

  async function loadARLibraries() {
    try {
      setLoadProgress(10);

      // Load A-Frame
      if (!(window as any).AFRAME) {
        await loadScript("https://aframe.io/releases/1.5.0/aframe.min.js");
      }
      setLoadProgress(40);

      // Load MindAR
      if (!(window as any).MINDAR) {
        await loadScript("https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js");
      }
      setLoadProgress(70);

      // Wait a tick for libs to initialize
      await new Promise((r) => setTimeout(r, 500));
      setLoadProgress(100);

      setStatus("ready");

      // Initialize the AR scene after a brief delay
      setTimeout(() => {
        initARScene();
      }, 300);
    } catch (err) {
      console.error("[AR] Failed to load libraries:", err);
      setStatus("error");
    }
  }

  function loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) { resolve(); return; }
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load: ${src}`));
      document.head.appendChild(script);
    });
  }

  function initARScene() {
    if (!containerRef.current) return;

    const arConfig = config.ar;
    if (!arConfig?.mindFile || !arConfig?.models?.length) {
      setStatus("scanning");
      // Show demo mode if no mind file
      return;
    }

    setStatus("scanning");

    // Build A-Frame scene HTML
    const modelsHtml = arConfig.models.map((model) => {
      const params = modelParams[model.id] || model;
      return `
        <a-entity mindar-image-target="targetIndex: ${model.targetIndex}">
          <a-gltf-model
            src="${model.path}"
            scale="${params.scale}"
            position="${params.position}"
            rotation="${params.rotation}"
            animation="property: rotation; to: 0 360 0; loop: true; dur: 20000; easing: linear"
          ></a-gltf-model>
        </a-entity>
      `;
    }).join("\n");

    const sceneHtml = `
      <a-scene
        mindar-image="imageTargetSrc: ${arConfig.mindFile}; autoStart: true; uiLoading: no; uiScanning: no; uiError: no;"
        color-space="sRGB"
        renderer="colorManagement: true; physicallyCorrectLights: true"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
        embedded
        style="width: 100%; height: 100%; position: absolute; top: 0; left: 0;"
      >
        <a-assets>
          ${arConfig.models.map((m) => `<a-asset-item id="model-${m.id}" src="${m.path}"></a-asset-item>`).join("\n")}
        </a-assets>

        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        ${modelsHtml}
      </a-scene>
    `;

    containerRef.current.innerHTML = sceneHtml;

    // Listen for target found/lost events
    const scene = containerRef.current.querySelector("a-scene");
    if (scene) {
      scene.addEventListener("arReady", () => {
        setStatus("scanning");
      });

      // Listen on targets
      const targets = containerRef.current.querySelectorAll("[mindar-image-target]");
      targets.forEach((target) => {
        target.addEventListener("targetFound", () => setStatus("found"));
        target.addEventListener("targetLost", () => setStatus("scanning"));
      });
    }
  }

  // Update model params in real-time (for debug mode)
  useEffect(() => {
    if (!containerRef.current || status === "loading") return;

    config.ar.models.forEach((model) => {
      const params = modelParams[model.id];
      if (!params) return;

      const entity = containerRef.current?.querySelector(
        `[mindar-image-target="targetIndex: ${model.targetIndex}"] a-gltf-model`
      );
      if (entity) {
        entity.setAttribute("scale", params.scale);
        entity.setAttribute("position", params.position);
        entity.setAttribute("rotation", params.rotation);
      }
    });
  }, [modelParams, status]);

  return (
    <div className="relative w-full h-full">
      {/* AR Container */}
      <div ref={containerRef} className="absolute inset-0" />

      {/* Loading Overlay */}
      {status === "loading" && (
        <div className="absolute inset-0 z-10 bg-[#1a1a2e] flex flex-col items-center justify-center transition-opacity duration-500">
          <div className="relative w-20 h-20 mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-[#C8A45C]/20" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#C8A45C] animate-spin" />
          </div>
          <h3 className="text-[#C8A45C] text-lg font-bold mb-2">加载 AR 引擎</h3>
          <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#C8A45C] to-[#D4B06A] rounded-full transition-all duration-300"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <p className="text-white/40 text-xs mt-2">{loadProgress}%</p>
        </div>
      )}

      {/* Scanning Overlay */}
      {status === "scanning" && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* Scan frame indicator */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-64 h-64">
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#C8A45C] rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#C8A45C] rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#C8A45C] rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#C8A45C] rounded-br-lg" />

              {/* Scanning line animation */}
              <div className="absolute inset-x-4 top-4 h-0.5 bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent animate-pulse opacity-60" 
                style={{ animation: "scanLine 2s ease-in-out infinite" }} />
            </div>
          </div>

          {/* Instruction text */}
          <div className="absolute bottom-24 left-0 right-0 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-black/50 backdrop-blur-sm rounded-full">
              <div className="w-2 h-2 rounded-full bg-[#C8A45C] animate-pulse" />
              <span className="text-white text-sm">将摄像头对准识别图</span>
            </div>
          </div>
        </div>
      )}

      {/* Found Overlay */}
      {status === "found" && (
        <div className="absolute top-20 left-0 right-0 z-10 text-center pointer-events-none">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#C8A45C]/90 backdrop-blur-sm rounded-full animate-bounce-in">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-white text-sm font-medium">识别成功！3D模型已加载</span>
          </div>
        </div>
      )}

      {/* Error Overlay */}
      {status === "error" && (
        <div className="absolute inset-0 z-10 bg-[#1a1a2e] flex flex-col items-center justify-center p-8">
          <div className="w-16 h-16 rounded-full bg-[#8B2D2D]/20 flex items-center justify-center mb-4">
            <span className="text-[#8B2D2D] text-2xl">!</span>
          </div>
          <h3 className="text-white text-lg font-bold mb-2">AR 加载失败</h3>
          <p className="text-white/50 text-sm text-center max-w-md mb-6">
            无法加载 AR 引擎。请检查网络连接或使用支持 WebRTC 的浏览器。
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-[#C8A45C] text-white rounded-full text-sm hover:bg-[#B89448] transition-colors"
          >
            重试
          </button>
        </div>
      )}

      {/* Scan line animation style */}
      <style>{`
        @keyframes scanLine {
          0%, 100% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(240px); opacity: 0.8; }
        }
        @keyframes bounce-in {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in { animation: bounce-in 0.5s ease-out; }
      `}</style>
    </div>
  );
}
