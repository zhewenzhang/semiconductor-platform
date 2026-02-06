import React, { useState } from 'react';
import { Input, Badge, Avatar, Dropdown } from 'antd';
import { SearchOutlined, BellOutlined, UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppStore } from '../../stores';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { globalSearch, setGlobalSearch, user, logout } = useAppStore();
  const [searchValue, setSearchValue] = useState(globalSearch);

  const handleSearch = (value: string) => {
    setGlobalSearch(value);
    if (location.pathname !== '/companies') {
      navigate('/companies');
    }
  };

  const userMenu = {
    items: [
      {
        key: 'profile',
        icon: <UserOutlined />,
        label: '个人中心',
      },
      {
        key: 'settings',
        icon: <SettingOutlined />,
        label: '设置',
      },
      {
        type: 'divider' as const,
      },
      {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: '退出登录',
        onClick: logout,
      },
    ],
  };

  const notificationMenu = {
    items: [
      {
        key: '1',
        label: (
          <div className="py-2">
            <div className="font-medium">新的公司数据已更新</div>
            <div className="text-gray-400 text-sm">5分钟前</div>
          </div>
        ),
      },
      {
        key: '2',
        label: (
          <div className="py-2">
            <div className="font-medium">TSMC 3nm roadmap 更新</div>
            <div className="text-gray-400 text-sm">1小时前</div>
          </div>
        ),
      },
    ],
  };

  return (
    <header className="h-16 bg-dark-200 border-b border-dark-100 px-6 flex items-center justify-between flex-shrink-0">
      {/* 搜索框 */}
      <div className="flex-1 max-w-xl">
        <Input
          placeholder="搜索公司、节点、技术..."
          prefix={<SearchOutlined className="text-gray-400" />}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onPressEnter={(e) => handleSearch((e.target as HTMLInputElement).value)}
          className="bg-dark-300 border-dark-100 rounded-lg h-10 text-white placeholder-gray-500"
          allowClear
        />
      </div>

      {/* 右侧工具栏 */}
      <div className="flex items-center gap-4 flex-shrink-0">
        {/* 通知 */}
        <Dropdown menu={notificationMenu} placement="bottomRight">
          <Badge count={2} size="small">
            <BellOutlined className="text-xl text-gray-400 hover:text-white cursor-pointer" />
          </Badge>
        </Dropdown>

        {/* 用户菜单 */}
        {user ? (
          <Dropdown menu={userMenu} placement="bottomRight">
            <div className="flex items-center gap-2 cursor-pointer hover:bg-dark-100 px-3 py-1 rounded-lg transition-colors">
              <Avatar size={32} src={user.avatar} icon={<UserOutlined />} />
              <span className="text-white whitespace-nowrap">{user.username}</span>
            </div>
          </Dropdown>
        ) : (
          <button 
            onClick={() => navigate('/login')}
            className="bg-primary-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors whitespace-nowrap"
          >
            登录
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
