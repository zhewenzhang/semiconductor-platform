import React from 'react';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: number;
  trendLabel?: string;
  prefix?: string;
  suffix?: string;
  format?: 'number' | 'currency' | 'percent';
  color?: string;
  onClick?: () => void;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendLabel,
  prefix = '',
  suffix = '',
  format = 'number',
  color = '#3646fc',
  onClick,
}) => {
  const formatValue = (val: number | string): string => {
    if (typeof val === 'string') return val;
    
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('zh-CN', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(val);
      case 'percent':
        return `${val.toFixed(1)}%`;
      default:
        return new Intl.NumberFormat('zh-CN').format(val);
    }
  };

  return (
    <div 
      className={`
        card card-hover cursor-pointer
        ${onClick ? 'hover:border-primary-500' : ''}
      `}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        {/* 左侧内容 */}
        <div className="flex-1">
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">
            {prefix}{formatValue(value)}{suffix}
          </p>
          
          {/* 趋势指示 */}
          {trend !== undefined && (
            <div className="flex items-center gap-2 mt-2">
              <span className={`flex items-center text-sm ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {trend >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                <span className="ml-1">{Math.abs(trend).toFixed(1)}%</span>
              </span>
              {trendLabel && (
                <span className="text-gray-500 text-sm">{trendLabel}</span>
              )}
            </div>
          )}
        </div>

        {/* 右侧图标 */}
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <span style={{ color }} className="text-2xl">
            {icon}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
