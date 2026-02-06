import React from 'react';
import { List, Tag, Typography } from 'antd';
import { ClockCircleOutlined, EditOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface UpdateItem {
  id: string;
  type: 'company' | 'roadmap' | 'insight';
  title: string;
  time: string;
  operator?: string;
}

const updates: UpdateItem[] = [
  { id: '1', type: 'company', title: '台积电更新3nm产能数据', time: '5分钟前', operator: 'admin' },
  { id: '2', type: 'roadmap', title: '三星电子添加2nm Roadmap', time: '1小时前', operator: 'editor' },
  { id: '3', type: 'insight', title: '发布"2024全球晶圆代工展望"', time: '2小时前', operator: 'admin' },
  { id: '4', type: 'company', title: '中芯国际新增14nm数据', time: '3小时前', operator: 'editor' },
  { id: '5', type: 'roadmap', title: '英特尔更新Intel 4进度', time: '5小时前', operator: 'admin' },
];

const RecentUpdates: React.FC = () => {
  const getTypeColor = (type: string): string => {
    const colors: Record<string, string> = {
      company: 'blue',
      roadmap: 'green',
      insight: 'purple',
    };
    return colors[type] || 'default';
  };

  const getTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      company: '公司',
      roadmap: 'Roadmap',
      insight: '洞察',
    };
    return labels[type] || type;
  };

  return (
    <List
      dataSource={updates}
      renderItem={(item) => (
        <List.Item className="py-3 border-b border-dark-100 last:border-0 hover:bg-dark-100/50 px-2 rounded transition-colors">
          <div className="w-full">
            <div className="flex items-center justify-between mb-1">
              <Tag color={getTypeColor(item.type)} className="text-xs">
                {getTypeLabel(item.type)}
              </Tag>
              <span className="text-gray-500 text-xs flex items-center gap-1">
                <ClockCircleOutlined />
                {item.time}
              </span>
            </div>
            <Text className="text-gray-300 block text-sm">{item.title}</Text>
            {item.operator && (
              <Text className="text-gray-500 text-xs mt-1 block">
                <EditOutlined className="mr-1" />
                由 {item.operator} 更新
              </Text>
            )}
          </div>
        </List.Item>
      )}
    />
  );
};

export default RecentUpdates;
