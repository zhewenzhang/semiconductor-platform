import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Table, Button, Tag, Space, Modal, Form, Input, Select, message } from 'antd';
import { 
  UserOutlined, 
  SettingOutlined, 
  DatabaseOutlined, 
  SafetyCertificateOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExportOutlined,
  ImportOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { supabase } from '../services/supabase';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface Company {
  id: string;
  name: string;
  name_en: string;
  ticker: string;
  region: string;
  industry: string;
  market_cap: number;
  status: string;
  created_at: string;
}

interface Roadmap {
  id: string;
  node: string;
  process_node: string;
  status: string;
  published_at: string;
  companies?: { name: string };
}

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('companies');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [form] = Form.useForm();

  // Fetch companies
  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setCompanies(data || []);
    } catch (err: any) {
      message.error('获取公司数据失败: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch roadmaps
  const fetchRoadmaps = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('roadmaps')
        .select('*, companies(name)')
        .order('published_at', { ascending: false });
      
      if (error) throw error;
      setRoadmaps(data || []);
    } catch (err: any) {
      message.error('获取Roadmap数据失败: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'companies') fetchCompanies();
    if (activeTab === 'roadmaps') fetchRoadmaps();
  }, [activeTab]);

  const companyColumns = [
    {
      title: '公司名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <span className="text-white">{text}</span>,
    },
    {
      title: '英文名称',
      dataIndex: 'name_en',
      key: 'name_en',
      render: (text: string) => <span className="text-gray-400">{text}</span>,
    },
    {
      title: '股票代码',
      dataIndex: 'ticker',
      key: 'ticker',
    },
    {
      title: '地区',
      dataIndex: 'region',
      key: 'region',
      render: (text: string) => <Tag>{text}</Tag>,
    },
    {
      title: '行业',
      dataIndex: 'industry',
      key: 'industry',
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: '市值 (B$)',
      dataIndex: 'market_cap',
      key: 'market_cap',
      render: (val: number) => <span className="text-green-400">${val || 0}</span>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'published' ? 'green' : 'gold'}>
          {status === 'published' ? '已发布' : '草稿'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Company) => (
        <Space>
          <Button type="text" icon={<EditOutlined />} size="small" />
          <Button type="text" danger icon={<DeleteOutlined />} size="small" />
        </Space>
      ),
    },
  ];

  const roadmapColumns = [
    {
      title: '公司',
      dataIndex: ['companies', 'name'],
      key: 'company',
      render: (text: string) => <span className="text-white">{text}</span>,
    },
    {
      title: '制程节点',
      key: 'node',
      render: (_: any, record: Roadmap) => (
        <span>{record.node} ({record.process_node})</span>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === '量产' ? 'green' : status === '试产' ? 'orange' : 'default'}>
          {status}
        </Tag>
      ),
    },
    {
      title: '发布时间',
      dataIndex: 'published_at',
      key: 'published_at',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space>
          <Button type="text" icon={<EditOutlined />} size="small" />
          <Button type="text" danger icon={<DeleteOutlined />} size="small" />
        </Space>
      ),
    },
  ];

  const tabs = [
    { key: 'companies', icon: <DatabaseOutlined />, label: '公司管理' },
    { key: 'roadmaps', icon: <SettingOutlined />, label: 'Roadmap管理' },
    { key: 'insights', icon: <SafetyCertificateOutlined />, label: '洞察管理' },
    { key: 'users', icon: <UserOutlined />, label: '用户管理' },
    { key: 'settings', icon: <SettingOutlined />, label: '系统设置' },
  ];

  return (
    <div className="animate-fadeIn">
      {/* 页面标题 */}
      <div className="mb-6">
        <Title level={2} className="text-white mb-1">
          后台管理
        </Title>
        <Text className="text-gray-400">
          管理平台数据、用户和系统设置
        </Text>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card className="card">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-400 text-sm">公司总数</div>
                <div className="text-3xl font-bold text-white">{companies.length}</div>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <DatabaseOutlined className="text-blue-500 text-xl" />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="card">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-400 text-sm">Roadmap项目</div>
                <div className="text-3xl font-bold text-white">{roadmaps.length}</div>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <SettingOutlined className="text-green-500 text-xl" />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="card">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-400 text-sm">洞察文章</div>
                <div className="text-3xl font-bold text-white">4</div>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <SafetyCertificateOutlined className="text-purple-500 text-xl" />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="card">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-400 text-sm">注册用户</div>
                <div className="text-3xl font-bold text-white">1</div>
              </div>
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <UserOutlined className="text-orange-500 text-xl" />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 管理内容 */}
      <Card className="card">
        {/* Tab 导航 */}
        <div className="flex items-center gap-2 mb-6 border-b border-dark-100 pb-4 overflow-x-auto">
          {tabs.map((tab) => (
            <Button
              key={tab.key}
              type={activeTab === tab.key ? 'primary' : 'text'}
              icon={tab.icon}
              onClick={() => setActiveTab(tab.key)}
              className={activeTab === tab.key ? '' : 'text-gray-400'}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* 工具栏 */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex gap-2">
            <Input placeholder="搜索..." className="w-64" />
            <Select placeholder="状态" allowClear className="w-32">
              <Option value="published">已发布</Option>
              <Option value="draft">草稿</Option>
            </Select>
          </div>
          <Space wrap>
            <Button icon={<ReloadOutlined />} onClick={() => {
              if (activeTab === 'companies') fetchCompanies();
              if (activeTab === 'roadmaps') fetchRoadmaps();
            }}>
              刷新
            </Button>
            <Button icon={<ImportOutlined />}>导入</Button>
            <Button icon={<ExportOutlined />}>导出</Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>
              添加{activeTab === 'companies' ? '公司' : activeTab === 'roadmaps' ? 'Roadmap' : '内容'}
            </Button>
          </Space>
        </div>

        {/* 表格 */}
        <Table
          columns={activeTab === 'companies' ? companyColumns : roadmapColumns}
          dataSource={activeTab === 'companies' ? companies : roadmaps}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          loading={loading}
        />
      </Card>

      {/* 添加/编辑弹窗 */}
      <Modal
        title={activeTab === 'companies' ? '添加公司' : '添加Roadmap'}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical">
          {activeTab === 'companies' ? (
            <>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="公司名称" name="name" rules={[{ required: true }]}>
                    <Input placeholder="输入公司名称" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="英文名称" name="name_en">
                    <Input placeholder="输入英文名称" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="股票代码" name="ticker">
                    <Input placeholder="如: TSMC" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="市值 (B$)" name="market_cap">
                    <Input type="number" placeholder="如: 5600" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="地区" name="region">
                    <Select placeholder="选择地区">
                      <Option value="台湾">台湾</Option>
                      <Option value="中国大陆">中国大陆</Option>
                      <Option value="美国">美国</Option>
                      <Option value="韩国">韩国</Option>
                      <Option value="日本">日本</Option>
                      <Option value="欧洲">欧洲</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="行业" name="industry">
                    <Select placeholder="选择行业">
                      <Option value="设计">设计</Option>
                      <Option value="制造">制造</Option>
                      <Option value="封测">封测</Option>
                      <Option value="设备">设备</Option>
                      <Option value="材料">材料</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </>
          ) : (
            <>
              <Form.Item label="公司" name="company_id" rules={[{ required: true }]}>
                <Select placeholder="选择公司">
                  {companies.map(c => (
                    <Option key={c.id} value={c.id}>{c.name}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="制程节点" name="node" rules={[{ required: true }]}>
                    <Input placeholder="如: N3, 3nm" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="状态" name="status">
                    <Select placeholder="选择状态">
                      <Option value="量产">量产</Option>
                      <Option value="试产">试产</Option>
                      <Option value="研发">研发</Option>
                      <Option value="计划">计划</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}
          <Form.Item className="mb-0 flex justify-end gap-2">
            <Button onClick={() => setModalVisible(false)}>取消</Button>
            <Button type="primary" htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Admin;
