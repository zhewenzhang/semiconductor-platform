import React, { useState } from 'react';
import { Table, Card, Input, Select, Button, Tag, Space, Drawer, Descriptions, Empty } from 'antd';
import { SearchOutlined, FilterOutlined, ExportOutlined, ImportOutlined, PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { Company } from '../types';
import CompanyFilters from '../components/companies/CompanyFilters';
import CompanyDetail from '../components/companies/CompanyDetail';

const { Search } = Input;
const { Option } = Select;

const Companies: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    region: undefined as string | undefined,
    industry: undefined as string | undefined,
    status: undefined as string | undefined,
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 100,
  });

  // 模拟数据
  const mockCompanies: Company[] = [
    {
      id: '1',
      name: '台积电',
      nameEn: 'TSMC',
      country: '台湾',
      region: '台湾',
      industry: '制造',
      foundedYear: 1987,
      headquarters: '新竹',
      marketCap: 5600,
      status: 'active',
      tags: ['晶圆代工', '全球第一'],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
    },
    {
      id: '2',
      name: '三星电子',
      nameEn: 'Samsung Electronics',
      country: '韩国',
      region: '韩国',
      industry: '制造',
      foundedYear: 1969,
      headquarters: '首尔',
      marketCap: 3720,
      status: 'active',
      tags: ['综合半导体', '存储芯片'],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
    },
    {
      id: '3',
      name: '英特尔',
      nameEn: 'Intel',
      country: '美国',
      region: '美国',
      industry: '制造',
      foundedYear: 1968,
      headquarters: '圣克拉拉',
      marketCap: 1680,
      status: 'active',
      tags: ['CPU', 'IDM'],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
    },
    {
      id: '4',
      name: '中芯国际',
      nameEn: 'SMIC',
      country: '中国大陆',
      region: '中国大陆',
      industry: '制造',
      foundedYear: 2000,
      headquarters: '上海',
      marketCap: 180,
      status: 'active',
      tags: ['晶圆代工', '国产替代'],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
    },
  ];

  const columns: ColumnsType<Company> = [
    {
      title: '公司名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <div className="font-medium text-white">{text}</div>
          <div className="text-gray-400 text-sm">{record.nameEn}</div>
        </div>
      ),
      sorter: true,
    },
    {
      title: '地区',
      dataIndex: 'region',
      key: 'region',
      render: (region) => (
        <Tag color="blue">{region}</Tag>
      ),
      filters: [
        { text: '中国大陆', value: '中国大陆' },
        { text: '台湾', value: '台湾' },
        { text: '美国', value: '美国' },
        { text: '韩国', value: '韩国' },
      ],
    },
    {
      title: '行业',
      dataIndex: 'industry',
      key: 'industry',
      render: (industry) => (
        <Tag color="purple">{industry}</Tag>
      ),
    },
    {
      title: '市值',
      dataIndex: 'marketCap',
      key: 'marketCap',
      render: (value) => `$${value}B`,
      sorter: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : status === 'pending' ? 'gold' : 'default'}>
          {status === 'active' ? '运营中' : status === 'pending' ? '待审核' : '已停运'}
        </Tag>
      ),
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date) => date,
      sorter: true,
    },
  ];

  const handleTableChange = (newPagination: any) => {
    setPagination(newPagination);
  };

  const handleViewDetail = (company: Company) => {
    setSelectedCompany(company);
    setDrawerVisible(true);
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
    setSelectedCompany(null);
  };

  return (
    <div className="animate-fadeIn">
      {/* 页面标题 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">公司库</h1>
          <p className="text-gray-400">收录全球主要半导体公司信息</p>
        </div>
        <Space>
          <Button icon={<ImportOutlined />}>导入</Button>
          <Button icon={<ExportOutlined />}>导出</Button>
          <Button type="primary" icon={<PlusOutlined />}>添加公司</Button>
        </Space>
      </div>

      {/* 筛选器 */}
      <Card className="card mb-6">
        <div className="flex flex-wrap gap-4">
          <Search
            placeholder="搜索公司名称"
            allowClear
            style={{ width: 250 }}
            prefix={<SearchOutlined />}
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
          <Select
            placeholder="地区"
            allowClear
            style={{ width: 150 }}
            value={filters.region}
            onChange={(value) => setFilters({ ...filters, region: value })}
          >
            <Option value="中国大陆">🇨🇳 中国大陆</Option>
            <Option value="台湾">🇹🇼 台湾</Option>
            <Option value="美国">🇺🇸 美国</Option>
            <Option value="韩国">🇰🇷 韩国</Option>
            <Option value="日本">🇯🇵 日本</Option>
            <Option value="欧洲">🇪🇺 欧洲</Option>
          </Select>
          <Select
            placeholder="行业"
            allowClear
            style={{ width: 150 }}
            value={filters.industry}
            onChange={(value) => setFilters({ ...filters, industry: value })}
          >
            <Option value="设计">💻 设计</Option>
            <Option value="制造">🏭 制造</Option>
            <Option value="封测">📦 封测</Option>
            <Option value="设备">⚙️ 设备</Option>
            <Option value="材料">🔬 材料</Option>
            <Option value="IP/EDA">📐 IP/EDA</Option>
          </Select>
          <Select
            placeholder="状态"
            allowClear
            style={{ width: 120 }}
            value={filters.status}
            onChange={(value) => setFilters({ ...filters, status: value })}
          >
            <Option value="active">运营中</Option>
            <Option value="pending">待审核</Option>
            <Option value="inactive">已停运</Option>
          </Select>
        </div>
      </Card>

      {/* 表格 */}
      <Card className="card">
        <Table
          columns={columns}
          dataSource={mockCompanies}
          rowKey="id"
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条 / 共 ${total} 条`,
          }}
          onChange={handleTableChange}
          onRow={(record) => ({
            onClick: () => handleViewDetail(record),
            className: 'cursor-pointer',
          })}
          locale={{ emptyText: <Empty description="暂无数据" /> }}
        />
      </Card>

      {/* 详情抽屉 */}
      <Drawer
        title={selectedCompany?.name}
        placement="right"
        width={600}
        open={drawerVisible}
        onClose={handleCloseDrawer}
      >
        {selectedCompany && <CompanyDetail company={selectedCompany} />}
      </Drawer>
    </div>
  );
};

export default Companies;
