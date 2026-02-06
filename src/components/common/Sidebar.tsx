import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { DashboardOutlined, BankOutlined, ProjectOutlined, ExperimentOutlined, SettingOutlined, ControlOutlined } from '@ant-design/icons';
import { useAppStore } from '../../stores';

interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  path: string;
  roles?: string[];
}

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { sidebarCollapsed, user } = useAppStore();

  const menuItems: MenuItem[] = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: '首页',
      path: '/',
    },
    {
      key: 'companies',
      icon: <BankOutlined />,
      label: '公司库',
      path: '/companies',
    },
    {
      key: 'roadmap',
      icon: <ProjectOutlined />,
      label: 'Roadmap',
      path: '/roadmap',
    },
    {
      key: 'insights',
      icon: <ExperimentOutlined />,
      label: '行业洞察',
      path: '/insights',
    },
  ];

  const adminItems: MenuItem[] = [
    {
      key: 'admin',
      icon: <ControlOutlined />,
      label: '后台管理',
      path: '/admin',
      roles: ['admin'],
    },
  ];

  const allItems = user?.role === 'admin' ? [...menuItems, ...adminItems] : menuItems;

  return (
    <aside 
      className={`
        bg-dark-200 border-r border-dark-100 
        transition-all duration-300 flex flex-col flex-shrink-0
        ${sidebarCollapsed ? 'w-16' : 'w-64'}
      `}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-dark-100 flex-shrink-0">
        <div 
          className="flex items-center gap-3 cursor-pointer w-full"
          onClick={() => window.location.href = '/'}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          {!sidebarCollapsed && (
            <span className="text-lg font-semibold text-white whitespace-nowrap overflow-hidden text-ellipsis">芯片产业分析</span>
          )}
        </div>
      </div>

      {/* 菜单 */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {allItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== '/' && location.pathname.startsWith(item.path));
            
            return (
              <li key={item.key}>
                <NavLink
                  to={item.path}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-primary-500/20 text-primary-500' 
                      : 'text-gray-400 hover:text-white hover:bg-dark-100'
                    }
                  `}
                >
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  {!sidebarCollapsed && (
                    <span className="font-medium whitespace-nowrap">{item.label}</span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* 底部设置 */}
      <div className="border-t border-dark-100 p-4 flex-shrink-0">
        <NavLink
          to="/settings"
          className={`
            flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
            ${location.pathname === '/settings'
              ? 'bg-primary-500/20 text-primary-500'
              : 'text-gray-400 hover:text-white hover:bg-dark-100'
            }
          `}
        >
          <SettingOutlined className="text-xl flex-shrink-0" />
          {!sidebarCollapsed && (
            <span className="font-medium whitespace-nowrap">设置</span>
          )}
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
