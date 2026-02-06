-- Supabase 数据库设置脚本
-- 在 https://supabase.com/project/uwvlduprxppwdkjkvwby/sql 执行

-- ========== 第 1 步：删除旧表（如果存在）==========
-- 注意：先删除子表再删除父表
DROP TABLE IF EXISTS roadmaps CASCADE;
DROP TABLE IF EXISTS insights CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS companies CASCADE;

-- ========== 第 2步：重新创建表 ==========

-- Companies 表
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  name_en VARCHAR(255),
  ticker VARCHAR(50),
  region VARCHAR(100),
  industry VARCHAR(100),
  description TEXT,
  website VARCHAR(255),
  headquarters VARCHAR(255),
  founded_year INT,
  employees INT,
  market_cap DECIMAL(15,2),
  revenue DECIMAL(15,2),
  status VARCHAR(20) DEFAULT 'published',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Roadmaps 表
CREATE TABLE roadmaps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  node VARCHAR(100),
  process_node VARCHAR(50),
  status VARCHAR(20) DEFAULT 'published',
  volume_sample DATE,
  risk_status VARCHAR(50),
  estimated_yield VARCHAR(50),
  remarks TEXT,
  published_at DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insights 表
CREATE TABLE insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  category VARCHAR(50),
  summary TEXT,
  content TEXT,
  tags TEXT[],
  cover_image VARCHAR(500),
  read_count INT DEFAULT 0,
  status VARCHAR(20) DEFAULT 'published',
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users 表（简化版）
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  role VARCHAR(20) DEFAULT 'editor',
  avatar_url VARCHAR(500),
  last_login_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========== 第 3步：创建索引 ==========
CREATE INDEX idx_companies_region ON companies(region);
CREATE INDEX idx_companies_industry ON companies(industry);
CREATE INDEX idx_roadmaps_company_id ON roadmaps(company_id);
CREATE INDEX idx_insights_category ON insights(category);
CREATE INDEX idx_insights_published_at ON insights(published_at DESC);

-- ========== 第 4步：插入测试数据 ==========

-- 插入公司数据
INSERT INTO companies (name, name_en, ticker, region, industry, market_cap) VALUES
('台积电', 'TSMC', 'TSM', '台湾', '制造', 5600),
('三星电子', 'Samsung Electronics', '005930.KS', '韩国', '制造', 3720),
('英特尔', 'Intel', 'INTC', '美国', '设计', 1680),
('英伟达', 'NVIDIA', 'NVDA', '美国', '设计', 9800),
('AMD', 'AMD', 'AMD', '美国', '设计', 2200),
('华为海思', 'HiSilicon', 'HW', '中国大陆', '设计', 0),
('中芯国际', 'SMIC', '688981.SS', '中国大陆', '制造', 450);

-- 插入洞察数据
INSERT INTO insights (title, category, summary, tags, read_count) VALUES
('2024年全球晶圆代工市场展望', '趋势', '随着AI和高性能计算需求的持续增长，全球晶圆代工市场预计将保持两位数增长。', ARRAY['晶圆代工', '市场分析', '2024'], 1523),
('GAA晶体管技术深度解析', '技术', 'GAA（Gate-All-Around）晶体管是下一代先进制程的关键技术。', ARRAY['GAA', '晶体管', '先进制程'], 2341),
('国产半导体设备突破分析', '政策', '在美日荷三国联合限制下，中国半导体设备国产替代进程加速。', ARRAY['国产替代', '半导体设备', '政策分析'], 3456),
('AI芯片市场竞争格局', '市场', 'NVIDIA凭借CUDA生态和Hopper架构在AI芯片市场保持领先地位。', ARRAY['AI芯片', 'NVIDIA', 'AMD'], 4521);

-- 插入 Roadmap 数据
INSERT INTO roadmaps (company_id, node, process_node, status, published_at) VALUES
((SELECT id FROM companies WHERE name = '台积电'), 'N3', '3nm', '量产', '2023-01-15'),
((SELECT id FROM companies WHERE name = '台积电'), 'N2', '2nm', '试产', '2025-01-01'),
((SELECT id FROM companies WHERE name = '三星电子'), 'SF3', '3nm', '试产', '2024-01-01'),
((SELECT id FROM companies WHERE name = '英特尔'), 'Intel 18A', '1.8nm', '研发', '2025-01-01'),
((SELECT id FROM companies WHERE name = '英伟达'), 'H100', '4nm', '量产', '2023-01-01');

-- ========== 验证数据 ==========
SELECT 'Companies' as table_name, COUNT(*) as count FROM companies
UNION ALL
SELECT 'Roadmaps' as table_name, COUNT(*) as count FROM roadmaps
UNION ALL
SELECT 'Insights' as table_name, COUNT(*) as count FROM insights;
