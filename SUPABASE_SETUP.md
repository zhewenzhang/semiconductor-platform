# Supabase 数据库配置指南

## 项目信息
- **项目 ID**: uwvlduprxppwdkjkvwby
- **项目 URL**: https://uwvlduprxppwdkjkvwby.supabase.co

## API Keys

### Anon Key（前端使用）
```
sb_publishable_NCyVuDM0d_Nkn50QvKdY-Q_OCQJsN5L
```

### Service Role Key（后端/管理使用）
```
<YOUR_SERVICE_ROLE_KEY>
```
⚠️ **仅在服务端使用，不要暴露到前端**

---

## 步骤 1：在 Supabase SQL Editor 中执行以下脚本

打开：https://supabase.com/project/uwvlduprxppwdkjkvwby/sql

复制并执行 `supabase-schema.sql` 文件中的内容。

---

## 步骤 2：配置前端环境变量

在 `semiconductor-platform` 目录下创建 `.env` 文件：

```env
VITE_SUPABASE_URL=https://uwvlduprxppwdkjkvwby.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_NCyVuDM0d_Nkn50QvKdY-Q_OCQJsN5L
```

---

## 步骤 3：验证配置

运行前端项目：
```bash
cd semiconductor-platform
npm run dev
```

访问 http://localhost:5173/admin 并刷新页面查看数据是否正常加载。
