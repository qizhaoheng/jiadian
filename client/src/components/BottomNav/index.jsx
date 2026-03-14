import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, List, ArrowLeftRight, Layout, BookOpen } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const BottomNav = () => {
  const navItems = [
    { icon: Home, label: '首页', path: '/' },
    { icon: List, label: '家电库', path: '/appliances' },
    { icon: ArrowLeftRight, label: '对比', path: '/compare' },
    { icon: Layout, label: '方案', path: '/plans' },
    { icon: BookOpen, label: '知识库', path: '/knowledge' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-16 flex items-center justify-around z-50">
      {navItems.map(({ icon: Icon, label, path }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center justify-center space-y-1 w-full h-full text-xs font-medium transition-colors duration-200",
              isActive ? "text-blue-600" : "text-gray-500 hover:text-blue-500"
            )
          }
        >
          {React.createElement(Icon, { size: 24 })}
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
