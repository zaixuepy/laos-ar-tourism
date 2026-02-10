
- [x] 升级项目为全栈（web-db-user）
- [x] 解决升级后的代码冲突（Home.tsx, App.tsx）
- [x] 运行数据库迁移 pnpm db:push
- [x] 集成文件存储功能（S3 storagePut/storageGet）
- [x] 创建文件上传API端点
- [x] 创建文件管理前端界面
- [x] 编写vitest测试（13个测试全部通过）

## 重构：运行时配置驱动 + WebAR + AI Agent
- [ ] 创建 public/config.json 外部配置文件
- [ ] 创建 ConfigContext 全局配置上下文
- [ ] 重构 App.tsx 启动时 fetch config.json
- [ ] 重构所有现有组件读取 ConfigContext（移除硬编码）
- [ ] 实现 ARScene 组件（MindAR + A-Frame 懒加载）
- [ ] 实现 AI 智能助手组件（AIAgent 聊天 Widget）
- [ ] 实现开发者调试面板（DebugPanel，?debug=true）
- [ ] 编写 vitest 测试
- [ ] 保存检查点
