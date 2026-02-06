import React from 'react';
import { Card, Typography } from 'antd';
import { EyeOutlined, CalendarOutlined } from '@ant-design/icons';
import type { Company } from '../../types';

const { Title, Text, Paragraph } = Typography;

interface CompanyDetailProps {
  company: Company;
}

const CompanyDetail: React.FC<CompanyDetailProps> = ({ company }) => {
  return (
    <div>
      {/* 基本信息 */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-primary-500/20 rounded-xl flex items-center justify-center">
            <span className="text-primary-500 text-2xl font-bold">
              {company.name.charAt(0)}
            </span>
          </div>
          <div>
            <Title level={4} className="text-white mb-1">{company.name}</Title>
            <Text className="text-gray-400">{company.nameEn}</Text>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Text className="text-gray-500 text-sm">地区</Text>
            <div className="text-white">{company.region}</div>
          </div>
          <div>
            <Text className="text-gray-500 text-sm">行业</Text>
            <div className="text-white">{company.industry}</div>
          </div>
          <div>
            <Text className="text-gray-500 text-sm">成立年份</Text>
            <div className="text-white">{company.foundedYear}</div>
          </div>
          <div>
            <Text className="text-gray-500 text-sm">总部</Text>
            <div className="text-white">{company.headquarters}</div>
          </div>
          <div>
            <Text className="text-gray-500 text-sm">市值</Text>
            <div className="text-white">{company.marketCap ? `$${company.marketCap}B` : '-'}</div>
          </div>
          <div>
            <Text className="text-gray-500 text-sm">员工数</Text>
            <div className="text-white">{company.employees ? `${company.employees.toLocaleString()}` : '-'}</div>
          </div>
        </div>
      </div>

      {/* 描述 */}
      {company.description && (
        <div className="mb-6">
          <Text className="text-gray-500 text-sm mb-2 block">公司简介</Text>
          <Paragraph className="text-gray-300">{company.description}</Paragraph>
        </div>
      )}

      {/* 标签 */}
      {company.tags && company.tags.length > 0 && (
        <div className="mb-6">
          <Text className="text-gray-500 text-sm mb-2 block">标签</Text>
          <div className="flex flex-wrap gap-2">
            {company.tags.map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 bg-dark-100 rounded-full text-sm text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 联系信息 */}
      <div className="border-t border-dark-100 pt-4">
        <div className="grid grid-cols-2 gap-4">
          {company.website && (
            <div>
              <Text className="text-gray-500 text-sm">官网</Text>
              <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-primary-500 block">
                {company.website}
              </a>
            </div>
          )}
          {company.stockCode && (
            <div>
              <Text className="text-gray-500 text-sm">股票代码</Text>
              <div className="text-white">
                {company.stockCode} ({company.stockMarket})
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 时间信息 */}
      <div className="border-t border-dark-100 pt-4 mt-4">
        <div className="flex items-center gap-4 text-gray-500 text-sm">
          <span className="flex items-center gap-1">
            <CalendarOutlined />
            创建时间: {company.createdAt}
          </span>
          <span>|</span>
          <span className="flex items-center gap-1">
            <EyeOutlined />
            更新时间: {company.updatedAt}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
