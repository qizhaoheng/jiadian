# 家电决策助手 (Appliance Helper)

一款帮助用户记录、对比和挑选家电的移动端网页应用。

## 核心功能

1.  **家电库**: 记录不同品牌和型号的家电参数。
2.  **参数模板**: 根据家电类型（洗碗机、冰箱、洗衣机等）自动生成核心参数输入框。
3.  **智能对比**: 支持 2-4 个型号同屏对比，自动高亮更优参数。
4.  **方案管理**: 自由组合不同型号形成选购方案，自动计算全屋总价。
5.  **知识库**: 提供专业的家电选购建议，看懂核心参数。
6.  **文件存储**: 无需数据库，数据实时保存至 `server/data/*.json` 文件。

## 技术栈

*   **前端**: React, Vite, TailwindCSS, Lucide React (图标)
*   **后端**: Node.js, Express
*   **存储**: JSON 文件存储

## 快速启动

### 1. 安装依赖

在根目录下运行：
```bash
npm install
cd server && npm install
cd ../client && npm install
```

### 2. 启动项目

**同时启动后端和前端（推荐）:**
```bash
npm run dev
```

**或者分开启动:**

启动后端服务 (Port 3001):
```bash
npm run server
```

启动前端应用 (Port 5173):
```bash
npm run client
```

## 目录结构

*   `server/`: Express 后端代码
*   `client/`: React 前端代码
*   `server/data/`: JSON 数据存储位置

## PWA 支持

支持添加到手机桌面，提供类原生 App 的使用体验。
