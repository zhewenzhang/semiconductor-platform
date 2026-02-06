import React from 'react';
import { Card, Row, Col, Select, Input, DatePicker, Button, Space, Checkbox } from 'antd';
import { SearchOutlined, FilterOutlined, ReloadOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { Option } = Select;

interface CompanyFiltersProps {
  onFilterChange: (filters: any) => void;
  onReset: () => void;
}

const CompanyFilters: React.FC<CompanyFiltersProps> = ({ onFilterChange, onReset }) => {
  const [filters, setFilters] = React.useState({
    search: '',
    region: undefined as string | undefined,
    industry: undefined as string | undefined,
    status: undefined as string | undefined,
    country: undefined as string | undefined,
    dateRange: undefined as any,
    sortBy: 'updatedAt',
    sortOrder: 'desc',
  });

  const handleChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      search: '',
      region: undefined,
      industry: undefined,
      status: undefined,
      country: undefined,
      dateRange: undefined,
      sortBy: 'updatedAt',
      sortOrder: 'desc',
    };
    setFilters(resetFilters);
    onReset();
  };

  return (
    <Card className="card mb-4">
      <Row gutter={[16, 16]}>
        {/* 搜索 */}
        <Col xs={24} md={12} lg={8}>
          <Input
            placeholder="搜索公司名称、描述..."
            prefix={<SearchOutlined className="text-gray-400" />}
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            allowClear
          />
        </Col>

        {/* 地区 */}
        <Col xs={12} md={6} lg={4}>
          <Select
            placeholder="地区"
            allowClear
            style={{ width: '100%' }}
            value={filters.region}
            onChange={(value) => handleChange('region', value)}
          >
            <Option value="中国大陆">🇨🇳 中国大陆</Option>
            <Option value="台湾">🇹🇼 台湾</Option>
            <Option value="美国">🇺🇸 美国</Option>
            <Option value="韩国">🇰🇷 韩国</Option>
            <Option value="日本">🇯🇵 日本</Option>
            <Option value="欧洲">🇪🇺 欧洲</Option>
          </Select>
        </Col>

        {/* 行业 */}
        <Col xs={12} md={6} lg={4}>
          <Select
            placeholder="行业"
            allowClear
            style={{ width: '100%' }}
            value={filters.industry}
            onChange={(value) => handleChange('industry', value)}
          >
            <Option value="设计">💻 设计</Option>
            <Option value="制造">🏭 制造</Option>
            <Option value="封测">📦 封测</Option>
            <Option value="设备">⚙️ 设备</Option>
            <Option value="材料">🔬 材料</Option>
            <Option value="IP/EDA">📐 IP/EDA</Option>
          </Select>
        </Col>

        {/* 状态 */}
        <Col xs={12} md={6} lg={4}>
          <Select
            placeholder="状态"
            allowClear
            style={{ width: '100%' }}
            value={filters.status}
            onChange={(value) => handleChange('status', value)}
          >
            <Option value="active">✅ 运营中</Option>
            <Option value="pending">⏳ 待审核</Option>
            <Option value="inactive">❌ 已停运</Option>
          </Select>
        </Col>

        {/* 排序 */}
        <Col xs={12} md={6} lg={4}>
          <Select
            style={{ width: '100%' }}
            value={filters.sortBy}
            onChange={(value) => handleChange('sortBy', value)}
          >
            <Option value="updatedAt">按更新时间</Option>
            <Option value="name">按名称</Option>
            <Option value="marketCap">按市值</Option>
            <Option value="foundedYear">按成立年份</Option>
          </Select>
        </Col>
      </Row>

      {/* 高级筛选 */}
      <Row gutter={[16, 16]} className="mt-4 pt-4 border-t border-dark-100">
        <Col xs={24} md={12} lg={8}>
          <Select
            placeholder="国家/地区"
            allowClear
            style={{ width: '100%' }}
            value={filters.country}
            onChange={(value) => handleChange('country', value)}
          >
            <Option value="CN">中国</Option>
            <Option value="TW">台湾</Option>
            <Option value="US">美国</Option>
            <Option value="KR">韩国</Option>
            <Option value="JP">日本</Option>
            <Option value="NL">荷兰</Option>
          </Select>
        </Col>
        
        <Col xs={24} md={12} lg={8}>
          <Space>
            <Button 
              icon={<FilterOutlined />}
              onClick={() => onFilterChange(filters)}
            >
              应用筛选
            </Button>
            <Button 
              icon={<ReloadOutlined />}
              onClick={handleReset}
            >
              重置
            </Button>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default CompanyFilters;
