# 部署指南

基于 [Vercel AI Chatbot](https://github.com/vercel/ai-chatbot) 修改的部署指南

## 环境要求

- Node.js 18+ 或更高版本
- pnpm 或 npm 或 yarn
- Vercel 账号
- Neon 数据库 (PostgreSQL)

## 部署步骤

### 1. 准备代码

```bash
# 克隆仓库
git clone <仓库地址>
cd chatbot

# 安装依赖
pnpm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env.local` 并填写必要的环境变量：

```bash
# 认证密钥 (使用命令生成: openssl rand -base64 32)
AUTH_SECRET=your_auth_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000  # 开发环境

# 数据库配置 (从 Neon 获取)
POSTGRES_URL=your_postgres_url
POSTGRES_PRISMA_URL=your_postgres_url
POSTGRES_URL_NON_POOLING=your_postgres_url?pgbouncer=true

# Vercel Blob 存储 (可选)
BLOB_READ_WRITE_TOKEN=your_blob_token
```

### 3. 设置 Neon 数据库

1. 访问 [Neon](https://neon.tech/) 并创建免费账户
2. 创建新项目
3. 在项目设置中获取数据库连接字符串
4. 将连接字符串填入 `.env.local` 文件

### 4. 本地开发

```bash
# 运行开发服务器
pnpm dev
```

### 5. 部署到 Vercel

1. 将代码推送到 GitHub 仓库
2. 访问 [Vercel](https://vercel.com) 并登录
3. 点击 "New Project"
4. 导入您的 GitHub 仓库
5. 在环境变量设置中，添加 `.env.local` 中的所有变量
6. 点击 "Deploy"

### 6. 配置生产环境

部署完成后，更新生产环境变量：

1. 在 Vercel 项目设置中，更新 `NEXTAUTH_URL` 为您的生产域名
2. 确保所有敏感信息都已在 Vercel 环境变量中设置

## 故障排除

### 数据库迁移失败

如果数据库迁移失败，可以手动运行：

```bash
pnpm db:migrate
```

### 缺少依赖

确保所有依赖都已安装：

```bash
pnpm install
```

## 基于修改

- 添加了 `@vercel/edge` 依赖
- 更新了构建脚本以支持 Vercel 部署
- 添加了 `vercel.json` 配置文件
- 优化了环境变量处理

## 许可证

MIT
