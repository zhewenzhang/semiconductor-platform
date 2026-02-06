import React, { useState } from 'react';
import { Card, Row, Col, Tag, Button, Typography, List, Avatar, Space } from 'antd';
import { 
  LineChartOutlined, 
  EyeOutlined, 
  ClockCircleOutlined,
  ArrowRightOutlined,
  FireOutlined
} from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import type { Insight } from '../types';

const { Title, Text, Paragraph } = Typography;

const Insights: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

  // 模拟数据
  const insights: Insight[] = [
    {
      id: '1',
      title: '2024年全球晶圆代工市场展望',
      category: '趋势',
      summary: '随着AI和高性能计算需求的持续增长，全球晶圆代工市场预计将保持两位数增长...',
      content: '',
      tags: ['晶圆代工', '市场分析', '2024'],
      relatedCompanies: ['1', '2'],
      publishedAt: '2024-01-15',
      readCount: 1523,
    },
    {
      id: '2',
      title: 'GAA晶体管技术深度解析',
      category: '技术',
      summary: 'GAA（Gate-All-Around）晶体管是下一代先进制程的关键技术，本文将深入分析其技术优势...',
      content: '',
      tags: ['GAA', '晶体管', '先进制程'],
      relatedCompanies: ['1', '2'],
      publishedAt: '2024-01-12',
      readCount: 2341,
    },
    {
      id: '3',
      title: '国产半导体设备突破分析',
      category: '政策',
      summary: '在美日荷三国联合限制下，中国半导体设备国产替代进程加速，多个细分领域取得突破...',
      content: '',
      tags: ['国产替代', '半导体设备', '政策分析'],
      relatedCompanies: ['4'],
      publishedAt: '2024-01-10',
      readCount: 3456,
    },
    {
      id: '4',
      title: 'AI芯片市场竞争格局',
      category: '市场',
      summary: 'NVIDIA凭借CUDA生态和Hopper架构在AI芯片市场保持领先地位，但AMD和英特尔正在加速追赶...',
      content: '',
      tags: ['AI芯片', 'NVIDIA', 'AMD', '竞争格局'],
      relatedCompanies: ['3', '5', '6'],
      publishedAt: '2024-01-08',
      readCount: 4521,
    },
  ];

  const categories = ['趋势', '市场', '技术', '政策', '并购', '其他'];

  // 图表配置
  const marketTrendOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
    },
    legend: {
      data: ['晶圆代工', '存储芯片', '逻辑芯片'],
      textStyle: { color: '#a0aec0' },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ['2020', '2021', '2022', '2023', '2024E'],
      axisLine: { lineStyle: { color: '#4a5568' } },
      axisLabel: { color: '#a0aec0' },
    },
    yAxis: {
      type: 'value',
      name: '市场规模 (亿美元)',
      axisLine: { lineStyle: { color: '#4a5568' } },
      axisLabel: { color: '#a0aec0' },
      splitLine: { lineStyle: { color: '#2d3748' } },
    },
    series: [
      {
        name: '晶圆代工',
        type: 'bar',
        data: [850, 950, 1020, 1100, 1250],
        itemStyle: { color: '#3646fc' },
      },
      {
        name: '存储芯片',
        type: 'bar',
        data: [1200, 1350, 1100, 950, 1100],
        itemStyle: { color: '#52c41a' },
      },
      {
        name: '逻辑芯片',
        type: 'bar',
        data: [680, 780, 850, 920, 1050],
        itemStyle: { color: '#fa8c16' },
      },
    ],
  };

  const abfDemandOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024'],
      axisLine: { lineStyle: { color: '#4a5568' } },
      axisLabel: { color: '#a0aec0' },
    },
    yAxis: {
      type: 'value',
      name: '需求指数',
      axisLine: { lineStyle: { color: '#4a5568' } },
      axisLabel: { color: '#a0aec0' },
      splitLine: { lineStyle: { color: '#2d3748' } },
    },
    series: [
      {
        name: 'ABF需求',
        type: 'line',
        smooth: true,
        data: [85, 92, 105, 118, 135],
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(54, 70, 252, 0.5)' },
              { offset: 1, color: 'rgba(54, 70, 252, 0)' },
            ],
          },
        },
        itemStyle: { color: '#3646fc' },
      },
    ],
  };

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      '趋势': 'blue',
      '市场': 'green',
      '技术': 'purple',
      '政策': 'orange',
      '并购': 'red',
      '其他': 'default',
    };
    return colors[category] || 'default';
  };

  return (
    <div className="animate-fadeIn">
      {/* 页面标题 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">行业洞察</h1>
          <p className="text-gray-400">专业的半导体行业研究报告和深度分析</p>
        </div>
        <Space>
          <Button type="primary">发布洞察</Button>
        </Space>
      </div>

      {/* 分类筛选 */}
      <Card className="card mb-6">
        <div className="flex items-center gap-4">
          <span className="text-gray-400">分类:</span>
          <Tag 
            color={!selectedCategory ? 'primary' : 'default'}
            className="cursor-pointer"
            onClick={() => setSelectedCategory(undefined)}
          >
            全部
          </Tag>
          {categories.map((cat) => (
            <Tag
              key={cat}
              color={selectedCategory === cat ? getCategoryColor(cat) : 'default'}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Tag>
          ))}
        </div>
      </Card>

      {/* 图表区域 */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} lg={12}>
          <Card title="市场规模趋势" className="card h-80">
            <ReactECharts option={marketTrendOption} style={{ height: '100%' }} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="ABF基板需求指数" className="card h-80">
            <ReactECharts option={abfDemandOption} style={{ height: '100%' }} />
          </Card>
        </Col>
      </Row>

      {/* 洞察列表 */}
      <Card title="最新洞察" className="card">
        <List
          itemLayout="vertical"
          dataSource={insights}
          renderItem={(item) => (
            <List.Item className="py-4 border-b border-dark-100 last:border-0">
              <div className="flex gap-6">
                {/* 左侧内容 */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Tag color={getCategoryColor(item.category)}>{item.category}</Tag>
                    <span className="text-gray-400 text-sm flex items-center gap-1">
                      <ClockCircleOutlined />
                      {item.publishedAt}
                    </span>
                  </div>
                  
                  <Title level={4} className="text-white mb-2 hover:text-primary-500 cursor-pointer">
                    {item.title}
                  </Title>
                  
                  <Paragraph className="text-gray-400 mb-3" ellipsis={{ rows: 2 }}>
                    {item.summary}
                  </Paragraph>
                  
                  <div className="flex items-center gap-3">
                    {item.tags.map((tag) => (
                      <Tag key={tag} className="bg-dark-300 border-dark-100">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                </div>

                {/* 右侧统计 */}
                <div className="flex flex-col items-center justify-center gap-2 min-w-[80px]">
                  <div className="text-center">
                    <div className="flex items-center gap-1 justify-center text-gray-400">
                      <EyeOutlined />
                      <span>{item.readCount}</span>
                    </div>
                    <div className="text-xs text-gray-500">阅读量</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1 justify-center text-orange-400">
                      <FireOutlined />
                      <span>{Math.floor(item.readCount / 100)}</span>
                    </div>
                    <div className="text-xs text-gray-500">热度</div>
                  </div>
                </div>
              </div>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default Insights;
