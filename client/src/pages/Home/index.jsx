import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, History, List, ArrowLeftRight, Layout, BookOpen, ChevronRight } from 'lucide-react';
import { applianceApi, planApi } from '../../api';
import ApplianceCard from '../../components/ApplianceCard';

const Home = () => {
  const [recentAppliances, setRecentAppliances] = useState([]);
  const [recentPlans, setRecentPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appResponse, planResponse] = await Promise.all([
          applianceApi.getAll(),
          planApi.getAll()
        ]);
        setRecentAppliances(appResponse.data.slice(-3).reverse());
        setRecentPlans(planResponse.data.slice(-2).reverse());
      } catch (error) {
        console.error('Error fetching home data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const menuItems = [
    { icon: List, label: '家电库', path: '/appliances', color: 'bg-blue-500' },
    { icon: ArrowLeftRight, label: '参数对比', path: '/compare', color: 'bg-orange-500' },
    { icon: Layout, label: '方案库', path: '/plans', color: 'bg-green-500' },
    { icon: BookOpen, label: '选购知识', path: '/knowledge', color: 'bg-purple-500' },
  ];

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="animate-pulse text-blue-600 font-bold">加载中...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20 px-4 pt-6 max-w-mobile mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-800 tracking-tight">家电决策助手</h1>
          <p className="text-gray-400 text-xs mt-1">你的私人购物决策专家</p>
        </div>
        <button 
          onClick={() => navigate('/appliances?add=true')}
          className="p-2.5 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200 active:scale-95 transition-transform"
        >
          <PlusCircle size={24} />
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {menuItems.map(({ icon: Icon, label, path, color }) => (
          <div 
            key={path}
            onClick={() => navigate(path)}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-2 active:bg-gray-50 cursor-pointer"
          >
            <div className={`p-3 rounded-xl ${color} text-white shadow-md`}>
              {React.createElement(Icon, { size: 24 })}
            </div>
            <span className="font-bold text-gray-700 text-sm">{label}</span>
          </div>
        ))}
      </div>

      {/* Recent Appliances */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800 flex items-center">
            <History size={20} className="mr-2 text-blue-600" />
            最近添加
          </h2>
          <button onClick={() => navigate('/appliances')} className="text-xs text-gray-400 font-medium flex items-center">
            查看全部 <ChevronRight size={14} />
          </button>
        </div>
        
        {recentAppliances.length > 0 ? (
          recentAppliances.map(app => (
            <ApplianceCard 
              key={app.id} 
              appliance={app} 
              onEdit={() => navigate(`/appliances?edit=${app.id}`)}
              onDelete={async (id) => {
                await applianceApi.delete(id);
                setRecentAppliances(recentAppliances.filter(a => a.id !== id));
              }}
              onClick={() => navigate(`/appliances?id=${app.id}`)}
            />
          ))
        ) : (
          <div className="bg-white rounded-xl p-8 border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-gray-400 space-y-2">
            <PlusCircle size={32} className="opacity-20" />
            <p className="text-xs font-medium">暂无家电，快去添加吧</p>
          </div>
        )}
      </section>

      {/* Recent Plans */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800 flex items-center">
            <Layout size={20} className="mr-2 text-green-600" />
            最近方案
          </h2>
          <button onClick={() => navigate('/plans')} className="text-xs text-gray-400 font-medium flex items-center">
            查看全部 <ChevronRight size={14} />
          </button>
        </div>
        
        <div className="space-y-3">
          {recentPlans.length > 0 ? (
            recentPlans.map(plan => (
              <div 
                key={plan.id}
                onClick={() => navigate(`/plans?id=${plan.id}`)}
                className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-gray-800">{plan.name}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    包含 {Object.keys(plan.appliances || {}).length} 件家电
                  </div>
                </div>
                <div className="text-green-600 font-black">
                  ¥{Object.values(plan.appliances || {}).reduce((sum, app) => sum + (parseFloat(app.price) || 0), 0)}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl p-6 border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-gray-400 space-y-2 text-center">
              <p className="text-[10px] font-medium opacity-50">尚未创建选购方案</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
