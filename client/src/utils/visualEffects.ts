/**
 * 高级视觉效果模块
 * 包含：黄金时刻光照、泛光效果、粒子系统、动画控制
 */

export interface VisualEffectsConfig {
  enableBloom: boolean;
  bloomStrength: number;
  bloomRadius: number;
  bloomThreshold: number;
  particleCount: number;
  particleSize: number;
  lightingIntensity: number;
}

export const DEFAULT_VISUAL_CONFIG: VisualEffectsConfig = {
  enableBloom: true,
  bloomStrength: 1.8,
  bloomRadius: 0.6,
  bloomThreshold: 0.85,
  particleCount: 800,
  particleSize: 0.1,
  lightingIntensity: 1.2,
};

/**
 * 黄金时刻光照配置
 * 模拟老挝日落时的温暖光照
 */
export const GOLDEN_HOUR_LIGHTING = {
  // 主光源（太阳光）
  directional: {
    color: 0xffa500,      // 橙色
    intensity: 1.2,
    position: [5, 10, 7],
    castShadow: true,
    shadowMapSize: 2048,
  },
  // 环境光
  ambient: {
    color: 0xd4af37,      // 金色
    intensity: 0.6,
  },
  // 半球光（天空光）
  hemisphere: {
    skyColor: 0xffa500,   // 黄金
    groundColor: 0x8b4513, // 棕色
    intensity: 0.8,
  },
  // 点光源（装饰光）
  point: {
    color: 0xd4af37,      // 金色
    intensity: 1.5,
    distance: 50,
    position: [0, 5, 0],
  },
  // 补光
  fill: {
    color: 0x87ceeb,      // 天蓝色
    intensity: 0.4,
    position: [-5, 5, -5],
  },
};

/**
 * 粒子系统配置
 */
export const PARTICLE_CONFIGS = {
  goldenDust: {
    color: 0xd4af37,      // 金色
    emissive: 0xffa500,   // 橙色发射光
    emissiveIntensity: 0.6,
    size: 0.1,
    count: 800,
    speed: 0.02,
    lifetime: 5000,
  },
  fallingPetals: {
    color: 0xff69b4,      // 粉红色
    emissive: 0xff1493,   // 深粉红发射光
    emissiveIntensity: 0.4,
    size: 0.15,
    count: 600,
    speed: 0.01,
    lifetime: 8000,
  },
};

/**
 * 动画配置
 */
export const ANIMATION_CONFIGS = {
  rotation: {
    speed: 0.01,          // rad/frame
    axis: 'y' as const,
  },
  floating: {
    amplitude: 0.5,       // 浮动幅度
    frequency: 1,         // 频率 (Hz)
  },
  pulse: {
    minScale: 0.95,
    maxScale: 1.05,
    duration: 2000,       // ms
  },
};

/**
 * 获取响应式视觉效果配置
 * 根据设备性能调整
 */
export function getResponsiveVisualConfig(): VisualEffectsConfig {
  // 检测设备性能
  const isLowEnd = /iPhone|iPad|Android|Mobile/.test(navigator.userAgent);
  const isMobile = window.innerWidth < 768;

  if (isLowEnd || isMobile) {
    // 低端设备：降低效果
    return {
      ...DEFAULT_VISUAL_CONFIG,
      bloomStrength: 1.2,
      bloomRadius: 0.4,
      particleCount: 400,
      lightingIntensity: 0.8,
    };
  }

  return DEFAULT_VISUAL_CONFIG;
}

/**
 * 颜色工具函数
 */
export const ColorUtils = {
  // 十六进制转 RGB
  hexToRgb: (hex: number) => {
    const r = (hex >> 16) & 255;
    const g = (hex >> 8) & 255;
    const b = hex & 255;
    return { r: r / 255, g: g / 255, b: b / 255 };
  },

  // RGB 转十六进制
  rgbToHex: (r: number, g: number, b: number) => {
    return ((r * 255) << 16) | ((g * 255) << 8) | (b * 255);
  },

  // 颜色插值
  lerp: (color1: number, color2: number, t: number) => {
    const rgb1 = ColorUtils.hexToRgb(color1);
    const rgb2 = ColorUtils.hexToRgb(color2);
    const r = rgb1.r + (rgb2.r - rgb1.r) * t;
    const g = rgb1.g + (rgb2.g - rgb1.g) * t;
    const b = rgb1.b + (rgb2.b - rgb1.b) * t;
    return ColorUtils.rgbToHex(r, g, b);
  },
};

/**
 * 动画工具函数
 */
export const AnimationUtils = {
  // 正弦波动画
  sine: (t: number, amplitude: number = 1, frequency: number = 1) => {
    return amplitude * Math.sin(t * frequency * Math.PI * 2);
  },

  // 余弦波动画
  cosine: (t: number, amplitude: number = 1, frequency: number = 1) => {
    return amplitude * Math.cos(t * frequency * Math.PI * 2);
  },

  // 缓动函数
  easeInOutQuad: (t: number) => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  },

  easeInOutCubic: (t: number) => {
    return t < 0.5 ? 4 * t * t * t : 1 + (t - 1) * (2 * (t - 2)) * (2 * (t - 2));
  },

  // 脉冲动画
  pulse: (t: number, minScale: number = 0.95, maxScale: number = 1.05) => {
    const normalized = (Math.sin(t * Math.PI * 2) + 1) / 2;
    return minScale + (maxScale - minScale) * normalized;
  },
};

/**
 * 性能监控工具
 */
export class PerformanceMonitor {
  private frameCount = 0;
  private lastTime = Date.now();
  private fps = 60;

  update() {
    this.frameCount++;
    const now = Date.now();
    const delta = now - this.lastTime;

    if (delta >= 1000) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.lastTime = now;
    }

    return this.fps;
  }

  getFPS() {
    return this.fps;
  }

  isLowPerformance() {
    return this.fps < 30;
  }
}

/**
 * 视觉效果预设
 */
export const VISUAL_PRESETS = {
  // 高质量预设
  high: {
    enableBloom: true,
    bloomStrength: 2.0,
    bloomRadius: 0.8,
    bloomThreshold: 0.7,
    particleCount: 1200,
    particleSize: 0.12,
    lightingIntensity: 1.5,
  },
  // 标准预设
  standard: DEFAULT_VISUAL_CONFIG,
  // 低质量预设
  low: {
    enableBloom: true,
    bloomStrength: 1.0,
    bloomRadius: 0.3,
    bloomThreshold: 0.9,
    particleCount: 300,
    particleSize: 0.08,
    lightingIntensity: 0.8,
  },
  // 演示预设
  demo: {
    enableBloom: true,
    bloomStrength: 1.8,
    bloomRadius: 0.6,
    bloomThreshold: 0.85,
    particleCount: 800,
    particleSize: 0.1,
    lightingIntensity: 1.2,
  },
};
