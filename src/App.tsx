import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import { useAppStore } from './stores';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Sidebar from './components/common/Sidebar';

// Pages
import Home from './pages/Home';
import Companies from './pages/Companies';
import Roadmap from './pages/Roadmap';
import Insights from './pages/Insights';
import Admin from './pages/Admin';
import Login from './pages/Login';

const { Content } = Layout;

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { sidebarCollapsed } = useAppStore();
  const sidebarWidth = sidebarCollapsed ? 64 : 256;

  return (
    <Layout className="min-h-screen bg-dark-300 flex flex-row">
      {/* 侧边栏 - flex item */}
      <Sidebar />
      
      {/* 主内容区域 */}
      <Layout className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />
        
        {/* Content */}
        <Content className="flex-1 overflow-auto p-6">
          {children}
        </Content>
        
        {/* Footer */}
        <Footer />
      </Layout>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      {/* 公共路由 */}
      <Route path="/login" element={<Login />} />
      
      {/* 受保护路由 */}
      <Route
        path="/*"
        element={
          <AppLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/admin" element={<Admin />} />
              
              {/* 404 */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AppLayout>
        }
      />
    </Routes>
  );
};

export default App;
