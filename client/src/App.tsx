import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ConfigProvider, useConfigSafe } from "./contexts/ConfigContext";
import Home from "./pages/Home";
import FileManager from "./pages/FileManager";
import { lazy, Suspense } from "react";

// Lazy load AR page
const ARPage = lazy(() => import("./pages/ARPage"));

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/files"} component={FileManager} />
      <Route path={"/ar"}>
        <Suspense fallback={<ARLoadingScreen />}>
          <ARPage />
        </Suspense>
      </Route>
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function ARLoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 bg-[#1a1a2e] flex flex-col items-center justify-center">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 rounded-full border-4 border-[#C8A45C]/20" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#C8A45C] animate-spin" />
        <div className="absolute inset-3 rounded-full border-4 border-transparent border-b-[#D4B06A] animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
      </div>
      <h2 className="text-[#C8A45C] text-xl font-display font-bold mb-2">正在加载 AR 引擎</h2>
      <p className="text-white/50 text-sm">首次加载可能需要几秒钟...</p>
    </div>
  );
}

function ConfigLoadingScreen() {
  return (
    <div className="min-h-screen bg-[#FFF8E7] flex flex-col items-center justify-center">
      <div className="relative w-16 h-16 mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-[#C8A45C]/20" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#C8A45C] animate-spin" />
      </div>
      <h2 className="font-display text-xl text-[#3D2B1F] font-bold">探索老挝 AR</h2>
      <p className="text-[#6B5B4F] text-sm mt-2">正在加载配置...</p>
    </div>
  );
}

function ConfigErrorScreen({ error }: { error: string }) {
  return (
    <div className="min-h-screen bg-[#FFF8E7] flex flex-col items-center justify-center p-8">
      <div className="w-16 h-16 rounded-full bg-[#8B2D2D]/10 flex items-center justify-center mb-6">
        <span className="text-[#8B2D2D] text-2xl">!</span>
      </div>
      <h2 className="font-display text-xl text-[#3D2B1F] font-bold mb-2">配置加载失败</h2>
      <p className="text-[#6B5B4F] text-sm text-center max-w-md">
        无法加载 config.json 配置文件。请检查文件是否存在于 public/ 目录下。
      </p>
      <pre className="mt-4 p-4 bg-white/80 rounded-lg text-xs text-[#8B2D2D] max-w-md overflow-auto">
        {error}
      </pre>
    </div>
  );
}

function AppContent() {
  const { config, loading, error } = useConfigSafe();

  if (loading) return <ConfigLoadingScreen />;
  if (error || !config) return <ConfigErrorScreen error={error || "Unknown error"} />;

  return (
    <>
      <Toaster />
      <Router />
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <ConfigProvider>
          <TooltipProvider>
            <AppContent />
          </TooltipProvider>
        </ConfigProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
