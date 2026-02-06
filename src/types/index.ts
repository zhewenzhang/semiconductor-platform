// 公司类型定义
export interface Company {
  id: string;
  name: string;
  nameEn: string;
  logo?: string;
  country: string;
  region: '中国大陆' | '台湾' | '美国' | '日本' | '韩国' | '欧洲' | '其他';
  industry: '设计' | '制造' | '封测' | '设备' | '材料' | 'IP/EDA' | '其他';
  foundedYear: number;
  headquarters: string;
  website?: string;
  description?: string;
  marketCap?: number; // 市值（亿美元）
  revenue?: number; // 年营收（亿美元）
  employees?: number;
  stockCode?: string; // 股票代码
  stockMarket?: string; // 上市市场
  status: 'active' | 'pending' | 'inactive';
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// Roadmap 类型定义
export interface Roadmap {
  id: string;
  companyId: string;
  companyName: string;
  node: string; // 工艺节点，如 "3nm", "5nm", "7nm"
  processType: 'FinFET' | 'GAA' | 'FD-SOI' | '传统CMOS' | '其他';
  status: 'planning' | 'in_progress' | 'completed' | 'delayed' | 'cancelled';
  startDate: string; // 计划开始时间
  endDate: string; // 计划结束时间
  actualDate?: string; // 实际完成时间
  capacity?: string; // 月产能
  waferSize: '6英寸' | '8英寸' | '12英寸' | '18英寸';
  yieldRate?: number; // 良率
  investment?: number; // 投资额（亿美元）
  notes?: string;
  sources: string[]; // 数据来源
  createdAt: string;
  updatedAt: string;
}

// 行业洞察类型
export interface Insight {
  id: string;
  title: string;
  category: '趋势' | '市场' | '技术' | '政策' | '并购' | '其他';
  summary: string;
  content: string;
  tags: string[];
  relatedCompanies: string[]; // 相关公司ID
  publishedAt: string;
  source?: string;
  readCount: number;
}

// 用户类型
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
  lastLogin?: string;
}

// 统计数据类型
export interface StatsData {
  totalCompanies: number;
  activeRoadmaps: number;
  publishedInsights: number;
  totalInvestments: number;
}

// 筛选条件类型
export interface CompanyFilters {
  search?: string;
  country?: string;
  region?: string;
  industry?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

export interface RoadmapFilters {
  search?: string;
  companyId?: string;
  node?: string;
  processType?: string;
  status?: string;
  startYear?: number;
  endYear?: number;
}

// 分页响应类型
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
