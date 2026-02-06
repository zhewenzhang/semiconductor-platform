import React, { useEffect, useState } from 'react';
import { Row, Col, Card, List, Tag, Typography } from 'antd';
import { 
  BankOutlined, 
  ProjectOutlined, 
  LineChartOutlined, 
  DollarOutlined,
  ArrowRightOutlined,
  FireOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import StatsCard from '../components/common/StatsCard';
import TrendChart from '../components/dashboard/TrendChart';
import RecentUpdates from '../components/dashboard/RecentUpdates';

const { Title, Text } = Typography;

interface Company {
  id: string;
  name: string;
  name_en: string;
  ticker: string;
  region: string;
  industry: string;
  market_cap: number;
}

interface Insight {
  id: string;
  title: string;
  category: string;
  summary: string;
  tags: string[];
  read_count: number;
  published_at: string;
}

interface Roadmap {
  id: string;
  node: string;
  process_node: string;
  status: string;
  published_at: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCompanies: 0,
    activeRoadmaps: 0,
    publishedInsights: 0,
  });
  const [topCompanies, setTopCompanies] = useState<Company[]>([]);
  const [hotInsights, setHotInsights] = useState<Insight[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch counts
        const [companiesResult, roadmapsResult, insightsResult] = await Promise.all([
          supabase.from('companies').select('id', { count: 'exact', head: true }),
          supabase.from('roadmaps').select('id', { count: 'exact', head: true }),
          supabase.from('insights').select('id', { count: 'exact', head: true }),
        ]);

        setStats({
          totalCompanies: companiesResult.count || 0,
          activeRoadmaps: roadmapsResult.count || 0,
          publishedInsights: insightsResult.count || 0,
        });

        // Fetch top companies by market cap
        const { data: companies } = await supabase
          .from('companies')
          .select('*')
          .order('market_cap', { ascending: false })
          .limit(5);
        
        if (companies) {
          setTopCompanies(companies);
        }

        // Fetch hot insights
        const { data: insights } = await supabase
          .from('insights')
          .select('*')
          .order('read_count', { ascending: false })
          .limit(4);
        
        if (insights) {
          setHotInsights(insights);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="animate-fadeIn">
      {/* 页面标题 */}
      <div className="mb-8">
        <Title level={2} className="text-white mb-2">
          芯片产业分析平台
        </Title>
        <Text className="text-gray-400">
          专业级的半导体行业数据分析和洞察平台
        </Text>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} className="mb-8">
        <Col xs={24} sm={12} lg={6}>
          <StatsCard
            title="收录公司"
            value={stats.totalCompanies}
            icon={<BankOutlined />}
            trend={5.2}
            trendLabel="较上月"
            color="#3646fc"
            onClick={() => navigate('/companies')}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatsCard
            title="Roadmap 项目"
            value={stats.activeRoadmaps}
            icon={<ProjectOutlined />}
            trend={12.8}
            trendLabel="较上月"
            color="#52c41a"
            onClick={() => navigate('/roadmap')}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatsCard
            title="行业洞察"
            value={stats.publishedInsights}
            icon={<LineChartOutlined />}
            trend={8.5}
            trendLabel="较上周"
            color="#fa8c16"
            onClick={() => navigate('/insights')}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatsCard
            title="总投资规模"
            value={2850}
            icon={<DollarOutlined />}
            suffix="亿美元"
            trend={15.3}
            trendLabel="较去年"
            color="#eb2f96"
          />
        </Col>
      </Row>

      {/* 图表和更新区域 */}
      <Row gutter={[16, 16]} className="mb-8">
        <Col xs={24} lg={16}>
          <Card
            title="行业趋势"
            className="card h-full"
            extra={<ArrowRightOutlined className="cursor-pointer" />}
          >
            <TrendChart />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card
            title="最新更新"
            className="card h-full"
            extra={<ArrowRightOutlined className="cursor-pointer" />}
          >
            <RecentUpdates />
          </Card>
        </Col>
      </Row>

      {/* 头部玩家 */}
      <Row gutter={[16, 16]} className="mb-8">
        <Col xs={24} lg={12}>
          <Card title="头部玩家 (按市值)" className="card">
            <List
              dataSource={topCompanies}
              renderItem={(item, index) => (
                <List.Item className="py-3 border-b border-dark-100 last:border-0">
                  <div className="flex items-center gap-4 w-full">
                    <span className="text-2xl font-bold text-primary-500 w-8">
                      #{index + 1}
                    </span>
                    <div className="flex-1">
                      <div className="font-medium text-white">{item.name}</div>
                      <div className="text-gray-400 text-sm">
                        {item.region} · {item.industry} · ${item.market_cap || 0}B
                      </div>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="热门洞察" className="card">
            <List
              dataSource={hotInsights}
              renderItem={(item) => (
                <List.Item className="py-3 border-b border-dark-100 last:border-0">
                  <div className="w-full">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-medium text-white hover:text-primary-500 cursor-pointer">
                        {item.title}
                      </span>
                      <Tag color="red">
                        <FireOutlined /> {item.read_count}
                      </Tag>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tag color="blue">{item.category}</Tag>
                      <span className="text-gray-400 text-xs flex items-center gap-1">
                        <ClockCircleOutlined /> {new Date(item.published_at || Date.now()).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
