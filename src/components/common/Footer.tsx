import React from 'react';
import { GithubOutlined, MailOutlined, CloudServerOutlined } from '@ant-design/icons';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark-200 border-t border-dark-100 py-4 px-6 flex-shrink-0">
      <div className="flex items-center justify-between w-full">
        {/* 左侧信息 */}
        <div className="flex items-center gap-6 flex-wrap">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <CloudServerOutlined />
            <span>数据更新时间: {new Date().toLocaleDateString('zh-CN')}</span>
          </div>
          <div className="text-gray-500 text-sm">
            © {currentYear} 芯片产业分析平台. All rights reserved.
          </div>
        </div>

        {/* 右侧链接 */}
        <div className="flex items-center gap-6">
          <a 
            href="#" 
            className="flex items-center gap-2 text-gray-400 hover:text-primary-500 transition-colors text-sm"
          >
            <GithubOutlined />
            <span>GitHub</span>
          </a>
          <a 
            href="#" 
            className="flex items-center gap-2 text-gray-400 hover:text-primary-500 transition-colors text-sm"
          >
            <MailOutlined />
            <span>联系我们</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
