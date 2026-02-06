import dayjs from 'dayjs';
import type { Company, Roadmap, Insight } from '../types';

// 日期格式化
export const formatDate = (date: string | Date, format: string = 'YYYY-MM-DD'): string => {
  return dayjs(date).format(format);
};

export const formatDateTime = (date: string | Date): string => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};

// 数字格式化
export const formatNumber = (num: number, decimals: number = 0): string => {
  return new Intl.NumberFormat('zh-CN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

export const formatCurrency = (value: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatCompactNumber = (num: number): string => {
  if (num >= 1e12) return `${(num / 1e12).toFixed(1)}T`;
  if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
  return num.toString();
};

// 状态标签颜色
export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    // 公司状态
    active: 'green',
    pending: 'gold',
    inactive: 'default',
    
    // Roadmap状态
    planning: 'blue',
    in_progress: 'processing',
    completed: 'success',
    delayed: 'error',
    cancelled: 'default',
  };
  return colors[status] || 'default';
};

export const getStatusText = (status: string): string => {
  const texts: Record<string, string> = {
    active: '运营中',
    pending: '待审核',
    inactive: '已停运',
    planning: '规划中',
    in_progress: '进行中',
    completed: '已完成',
    delayed: '已延期',
    cancelled: '已取消',
  };
  return texts[status] || status;
};

// 地区映射
export const getRegionLabel = (region: string): string => {
  const labels: Record<string, string> = {
    '中国大陆': '🇨🇳 中国大陆',
    '台湾': '🇹🇼 台湾',
    '美国': '🇺🇸 美国',
    '日本': '🇯🇵 日本',
    '韩国': '🇰🇷 韩国',
    '欧洲': '🇪🇺 欧洲',
    '其他': '🌍 其他',
  };
  return labels[region] || region;
};

// 行业图标
export const getIndustryIcon = (industry: string): string => {
  const icons: Record<string, string> = {
    '设计': '💻',
    '制造': '🏭',
    '封测': '📦',
    '设备': '⚙️',
    '材料': '🔬',
    'IP/EDA': '📐',
    '其他': '📊',
  };
  return icons[industry] || '📊';
};

// 搜索过滤
export const filterBySearch = <T extends Record<string, any>>(
  items: T[], 
  searchText: string, 
  searchFields: (keyof T)[]
): T[] => {
  if (!searchText) return items;
  const lowerSearch = searchText.toLowerCase();
  return items.filter(item => 
    searchFields.some(field => 
      String(item[field] || '').toLowerCase().includes(lowerSearch)
    )
  );
};

// 排序
export const sortByField = <T extends Record<string, any>>(
  items: T[], 
  field: keyof T, 
  order: 'asc' | 'desc' = 'asc'
): T[] => {
  return [...items].sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

// 导出数据
export const exportToJSON = (data: any[], filename: string): void => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

export const exportToCSV = (data: any[], filename: string): void => {
  if (data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

// 导入CSV
export const parseCSV = async (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim());
        const headers = lines[0].split(',').map(h => h.trim());
        
        const data = lines.slice(1).map(line => {
          const values = line.split(',').map(v => v.trim());
          return headers.reduce((obj, header, index) => {
            obj[header] = values[index] || '';
            return obj;
          }, {} as any);
        });
        
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
};

// 颜色生成器
export const generateColor = (text: string): string => {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 50%)`;
};

// 内存计算
export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
