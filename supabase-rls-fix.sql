-- Supabase SQL Script (简化版 - 无 RLS)
-- 在 SQL Editor 中执行此脚本以修复 RLS 问题

-- 删除有问题的 users 表 RLS
DROP POLICY IF EXISTS "Public can read users" ON users;
DROP POLICY IF EXISTS "Admins can do everything" ON users;

-- 重新启用 RLS（仅用于 companies、roadmaps、insights）
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE insights ENABLE ROW LEVEL SECURITY;

-- 创建允许公开读取的策略
CREATE POLICY "Public can read companies" ON companies FOR SELECT USING (true);
CREATE POLICY "Public can read roadmaps" ON roadmaps FOR SELECT USING (true);
CREATE POLICY "Public can read insights" ON insights FOR SELECT USING (true);

-- 对于 users 表，暂时禁用 RLS（因为缺少 auth.users 关联）
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- 现在可以插入测试数据
