import React, { useState } from 'react';
import { Card, Row, Col, Select, DatePicker, Button, Tag, Empty, Space } from 'antd';
import { CalendarOutlined, FilterOutlined, ExportOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import type { Roadmap } from '../types';

const { RangePicker } = DatePicker;
const { Option } = Select;

const Roadmap: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = useState<string | undefined>();
  const [selectedNode, setSelectedNode] = useState<string | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();

  // 模拟数据
  const mockRoadmaps: Roadmap[] = [
    {
      id: '1',
      companyId: '1',
      companyName: '台积电',
      node: '3nm',
      processType: 'FinFET',
      status: 'in_progress',
      startDate: '2022-01-01',
      endDate: '2023-12-31',
      capacity: '10万片/月',
      waferSize: '12英寸',
      yieldRate: 78,
      investment: 200,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
      sources: ['TSMC官网'],
    },
    {
      id: '2',
      companyId: '1',
      companyName: '台积电',
      node: '2nm',
      processType: 'GAA',
      status: 'planning',
      startDate: '2024-01-01',
      endDate: '2025-12-31',
      capacity: '5万片/月',
      waferSize: '12英寸',
      investment: 280,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
      sources: ['TSMC官网'],
    },
    {
      id: '3',
      companyId: '2',
      companyName: '三星电子',
      node: '3nm',
      processType: 'GAA',
      status: 'in_progress',
      startDate: '2022-06-01',
      endDate: '2024-06-30',
      capacity: '5万片/月',
      waferSize: '12英寸',
      yieldRate: 60,
      investment: 170,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
      sources: ['三星官网'],
    },
    {
      id: '4',
      companyId: '3',
      companyName: '英特尔',
      node: 'Intel 4',
      processType: 'FinFET',
      status: 'completed',
      startDate: '2022-01-01',
      endDate: '2023-12-31',
      actualDate: '2023-12-31',
      capacity: '3万片/月',
      waferSize: '12英寸',
      yieldRate: 85,
      investment: 150,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
      sources: ['英特尔官网'],
    },
  ];

  // Timeline chart 配置
  const timelineOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ['2022', '2023', '2024', '2025', '2026'],
      axisLine: { lineStyle: { color: '#4a5568' } },
      axisLabel: { color: '#a0aec0' },
    },
    yAxis: {
      type: 'category',
      data: ['TSMC', 'Samsung', 'Intel', '中芯国际', 'AMD'],
      axisLine: { lineStyle: { color: '#4a5568' } },
      axisLabel: { color: '#a0aec0' },
    },
    series: [
      {
        name: '工艺节点',
        type: 'scatter',
        symbolSize: 20,
        data: [
          [0, 0, '3nm'],
          [1, 0, '3nm'],
          [2, 0, '2nm'],
          [1, 1, '3nm'],
          [2, 1, '2nm'],
          [0, 2, 'Intel 4'],
          [2, 2, 'Intel 3'],
          [0, 3, '14nm'],
          [1, 3, '7nm'],
          [1, 4, '5nm'],
        ],
        itemStyle: {
          color: function(params: any) {
            const colors: Record<string, string> = {
              '3nm': '#3646fc',
              '2nm': '#52c41a',
              'Intel 4': '#fa8c16',
              'Intel 3': '#eb2f96',
              '14nm': '#13c2c2',
              '7nm': '#722ed1',
              '5nm': '#f5222d',
            };
            return colors[params.data[2]] || '#3646fc';
          },
        },
      },
    ],
  };

  // Gantt chart 配置
  const ganttOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'time',
      min: '2022-01-01',
      max: '2026-12-31',
      axisLine: { lineStyle: { color: '#4a5568' } },
      axisLabel: { color: '#a0aec0', formatter: '{yyyy}' },
    },
    yAxis: {
      type: 'category',
      data: ['TSMC 3nm', 'TSMC 2nm', 'Samsung 3nm', 'Intel 4', 'Intel 3'],
      axisLine: { lineStyle: { color: '#4a5568' } },
      axisLabel: { color: '#a0aec0' },
    },
    series: [
      {
        type: 'custom',
        renderItem: function(params: any, api: any) {
          const categoryIndex = api.value(0);
          const start = api.coord([api.value(1), categoryIndex]);
          const end = api.coord([api.value(2), categoryIndex]);
          const height = api.size([0, 1])[1] * 0.6;
          
          const colors: Record<string, string> = {
            planning: '#1890ff',
            in_progress: '#52c41a',
            completed: '#52c41a',
            delayed: '#ff4d4f',
          };
          
          return {
            type: 'rect',
            shape: {
              x: start[0],
              y: start[1] - height / 2,
              width: end[0] - start[0],
              height: height,
              r: 4,
            },
            style: api.style({
              fill: colors[api.value(3)] || '#1890ff',
              stroke: '#fff',
              lineWidth: 0,
            }),
          };
        },
        encode: {
          x: [1, 2],
          y: 0,
        },
        data: [
          { value: [0, '2022-01-01', '2024-06-30', 'in_progress'], itemStyle: { color: '#52c41a' } },
          { value: [1, '2024-01-01', '2025-12-31', 'planning'] },
          { value: [2, '2022-06-01', '2024-06-30', 'delayed'] },
          { value: [3, '2022-01-01', '2023-12-31', 'completed'] },
          { value: [4, '2023-01-01', '2024-12-31', 'in_progress'] },
        ],
      },
    ],
  };

  const getStatusTag = (status: string) => {
    const config: Record<string, { color: string; text: string }> = {
      planning: { color: 'blue', text: '规划中' },
      in_progress: { color: 'processing', text: '进行中' },
      completed: { color: 'success', text: '已完成' },
      delayed: { color: 'error', text: '已延期' },
      cancelled: { color: 'default', text: '已取消' },
    };
    const { color, text } = config[status] || { color: 'default', text: status };
    return <Tag color={color}>{text}</Tag>;
  };

  return (
    <div className="animate-fadeIn">
      {/* 页面标题 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Roadmap</h1>
          <p className="text-gray-400">全球半导体工艺节点演进路线图</p>
        </div>
        <Space>
          <Button icon={<ExportOutlined />}>导出</Button>
        </Space>
      </div>

      {/* 筛选器 */}
      <Card className="card mb-6">
        <div className="flex flex-wrap gap-4">
          <Select
            placeholder="公司"
            allowClear
            style={{ width: 180 }}
            value={selectedCompany}
            onChange={setSelectedCompany}
          >
            <Option value="1">台积电</Option>
            <Option value="2">三星电子</Option>
            <Option value="3">英特尔</Option>
            <Option value="4">中芯国际</Option>
          </Select>
          <Select
            placeholder="工艺节点"
            allowClear
            style={{ width: 150 }}
            value={selectedNode}
            onChange={setSelectedNode}
          >
            <Option value="3nm">3nm</Option>
            <Option value="2nm">2nm</Option>
            <Option value="5nm">5nm</Option>
            <Option value="7nm">7nm</Option>
            <Option value="14nm">14nm</Option>
          </Select>
          <Select
            placeholder="工艺类型"
            allowClear
            style={{ width: 150 }}
            value={selectedStatus}
            onChange={setSelectedStatus}
          >
            <Option value="FinFET">FinFET</Option>
            <Option value="GAA">GAA</Option>
            <Option value="FD-SOI">FD-SOI</Option>
          </Select>
          <RangePicker picker="year" />
          <Button icon={<FilterOutlined />}>筛选</Button>
        </div>
      </Card>

      {/* 图表区域 */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} lg={12}>
          <Card title="工艺节点时间轴" className="card h-96">
            <ReactECharts option={timelineOption} style={{ height: '100%' }} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="项目进度甘特图" className="card h-96">
            <ReactECharts option={ganttOption} style={{ height: '100%' }} />
          </Card>
        </Col>
      </Row>

      {/* 详细列表 */}
      <Card title="Roadmap 详细列表" className="card">
        <div className="space-y-4">
          {mockRoadmaps.map((item) => (
            <div 
              key={item.id}
              className="flex items-center justify-between p-4 bg-dark-100 rounded-lg hover:bg-dark-100/80 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-primary-500 font-bold">{item.node}</span>
                </div>
                <div>
                  <div className="font-medium text-white">{item.companyName}</div>
                  <div className="text-gray-400 text-sm">
                    {item.processType} · {item.waferSize}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-gray-400 text-sm">投资额</div>
                  <div className="text-white font-medium">${item.investment}B</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400 text-sm">产能</div>
                  <div className="text-white font-medium">{item.capacity}</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400 text-sm">良率</div>
                  <div className="text-white font-medium">{item.yieldRate || '-'}%</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400 text-sm">计划时间</div>
                  <div className="text-white font-medium">
                    {item.startDate} ~ {item.endDate}
                  </div>
                </div>
                {getStatusTag(item.status)}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Roadmap;
