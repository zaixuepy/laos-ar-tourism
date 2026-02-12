
- [x] 升级项目为全栈（web-db-user）
- [x] 解决升级后的代码冲突（Home.tsx, App.tsx）
- [x] 运行数据库迁移 pnpm db:push
- [x] 集成文件存储功能（S3 storagePut/storageGet）
- [x] 创建文件上传API端点
- [x] 创建文件管理前端界面
- [x] 编写vitest测试（13个测试全部通过）

## 重构：运行时配置驱动 + WebAR + AI Agent
- [x] 创建 public/config.json 外部配置文件
- [x] 创建 ConfigContext 全局配置上下文
- [x] 重构 App.tsx 启动时 fetch config.json
- [x] 重构所有现有组件读取 ConfigContext（移除硬编码）
- [x] 实现 ARScene 组件（MindAR + A-Frame 懒加载）
- [x] 实现 AI 智能助手组件（AIAgent 聊天 Widget）
- [x] 实现开发者调试面板（DebugPanel，?debug=true）
- [x] 编写 vitest 测试
- [x] 保存检查点

## 新增任务：国际化和视觉效果增强
- [x] 增强国际化系统（i18n）- 添加更完整的翻译
- [x] 实现浮动语言切换按钮（右上角 CN/EN）
- [x] 优化 MindAR 识别配置
- [x] 增强光照系统（DirectionalLight + AmbientLight + HemisphereLight）
- [x] 实现泛光效果（UnrealBloomPass）
- [x] 添加粒子系统（黄金粒子和花瓣）
- [x] 改进模型动画（旋转和浮动）
- [x] 优化信息卡样式和动画
- [x] 编写新的 vitest 测试
- [x] 保存最终检查点
