import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X, Layout, HelpCircle, Save, Trash2, ChevronRight } from 'lucide-react';
import { applianceApi, planApi } from '../../api';
import { applianceTypes } from '../../data/specTemplates';

const Plans = () => {
  const navigate = useNavigate();
  
  const [plans, setPlans] = useState([]);
  const [allAppliances, setAllAppliances] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [currentPlan, setCurrentPlan] = useState({ name: '', appliances: {} });
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectingFor, setSelectingFor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [planResponse, appResponse] = await Promise.all([
          planApi.getAll(),
          applianceApi.getAll()
        ]);
        setPlans(planResponse.data);
        setAllAppliances(appResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);

  const handleSavePlan = async () => {
    if (!currentPlan.name) return alert('请输入方案名称');
    try {
      if (currentPlan.id) {
        await planApi.update(currentPlan.id, currentPlan);
      } else {
        await planApi.create(currentPlan);
      }
      setIsCreating(false);
      setCurrentPlan({ name: '', appliances: {} });
      const planResponse = await planApi.getAll();
      setPlans(planResponse.data);
    } catch {
      alert('保存失败');
    }
  };

  const handleDeletePlan = async (id) => {
    if (window.confirm('确定要删除这个方案吗？')) {
      try {
        await planApi.delete(id);
        setPlans(plans.filter(p => p.id !== id));
      } catch {
        alert('删除失败');
      }
    }
  };

  const openSelection = (type) => {
    setSelectingFor(type);
    setIsSelecting(true);
  };

  const selectAppliance = (app) => {
    setCurrentPlan({
      ...currentPlan,
      appliances: { ...currentPlan.appliances, [app.type]: app }
    });
    setIsSelecting(false);
  };

  const calculateTotal = (planAppliances) => {
    return Object.values(planAppliances || {}).reduce((sum, app) => sum + (parseFloat(app.price) || 0), 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 px-4 pt-6 max-w-mobile mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">方案库</h1>
        <div className="flex-1" />
        {!isCreating && (
          <button 
            onClick={() => setIsCreating(true)}
            className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm font-bold flex items-center shadow-md shadow-green-100"
          >
            <Plus size={16} className="mr-1" />
            创建
          </button>
        )}
      </div>

      {isCreating ? (
        <div className="space-y-6 animate-in slide-in-from-bottom duration-300">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500">方案名称</label>
              <input 
                type="text"
                placeholder="如：全屋家电经济款"
                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-lg font-bold"
                value={currentPlan.name}
                onChange={(e) => setCurrentPlan({ ...currentPlan, name: e.target.value })}
              />
            </div>

            <div className="space-y-3 pt-4">
              <h3 className="text-sm font-bold text-gray-500 border-b pb-2">家电组合</h3>
              {applianceTypes.map(type => {
                const selected = currentPlan.appliances[type.value];
                return (
                  <div 
                    key={type.value}
                    onClick={() => openSelection(type.value)}
                    className={`p-4 rounded-xl border flex items-center justify-between transition-all duration-200 cursor-pointer ${selected ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-gray-100 hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-3 ${selected ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-gray-100 text-gray-400'}`}>
                        <Layout size={20} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-400">{type.label}</div>
                        <div className={`font-bold ${selected ? 'text-blue-700' : 'text-gray-300 italic'}`}>
                          {selected ? `${selected.brand} ${selected.name}` : '点击选择型号'}
                        </div>
                      </div>
                    </div>
                    {selected ? (
                      <div className="text-right">
                        <div className="text-blue-600 font-black">¥{selected.price}</div>
                        <div className="text-[10px] text-blue-400 font-medium">点击更换</div>
                      </div>
                    ) : (
                      <Plus size={18} className="text-gray-300" />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-6 border-t flex justify-between items-center">
              <div>
                <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">预估总价</div>
                <div className="text-2xl font-black text-green-600">¥{calculateTotal(currentPlan.appliances)}</div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-3 bg-gray-100 text-gray-500 rounded-xl text-sm font-bold active:bg-gray-200"
                >
                  取消
                </button>
                <button 
                  onClick={handleSavePlan}
                  className="px-6 py-3 bg-green-600 text-white rounded-xl text-sm font-bold flex items-center shadow-lg shadow-green-100 active:scale-95"
                >
                  <Save size={18} className="mr-2" />
                  保存方案
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {plans.length > 0 ? (
            plans.map(plan => (
              <div key={plan.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col space-y-4 hover:border-green-300 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 tracking-tight">{plan.name}</h3>
                    <p className="text-[10px] text-gray-400 mt-0.5">包含 {Object.keys(plan.appliances || {}).length} 件家电</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-black text-green-600">¥{calculateTotal(plan.appliances)}</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {Object.entries(plan.appliances || {}).map(([type, app]) => (
                    <div key={type} className="px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-lg flex items-center text-[10px] text-gray-500 font-bold">
                      <span className="text-blue-600 mr-1.5">{applianceTypes.find(t => t.value === type)?.label}</span>
                      <span className="max-w-[80px] truncate">{app.brand} {app.name}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-3 border-t border-gray-50 space-x-3">
                  <button 
                    onClick={() => handleDeletePlan(plan.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                  <button 
                    onClick={() => { setCurrentPlan(plan); setIsCreating(true); }}
                    className="px-4 py-2 bg-gray-50 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-100 transition-colors"
                  >
                    详情与编辑
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl p-12 border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-gray-400 space-y-4 text-center">
              <Layout size={48} className="opacity-10" />
              <div>
                <p className="text-sm font-bold text-gray-500">尚未创建任何选购方案</p>
                <p className="text-xs mt-1">方案可以帮助您快速计算全屋家电总价</p>
              </div>
              <button 
                onClick={() => setIsCreating(true)}
                className="px-6 py-2 bg-green-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-green-100 active:scale-95"
              >
                立即创建
              </button>
            </div>
          )}
        </div>
      )}

      {/* Selection Drawer */}
      {isSelecting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[101] flex items-end justify-center">
          <div className="bg-white w-full max-w-mobile h-[70vh] rounded-t-[20px] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-bold">选择 {applianceTypes.find(t => t.value === selectingFor)?.label}</h2>
              <button onClick={() => setIsSelecting(false)} className="p-2 text-gray-400">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {allAppliances.filter(a => a.type === selectingFor).length > 0 ? (
                allAppliances.filter(a => a.type === selectingFor).map(app => (
                  <div 
                    key={app.id}
                    onClick={() => selectAppliance(app)}
                    className="p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all duration-200 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-gray-800">{app.brand} {app.name}</div>
                      <div className="text-xs text-gray-400 mt-1">¥{app.price}</div>
                    </div>
                    <ChevronRight size={18} className="text-gray-300" />
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-gray-400 text-sm">
                  暂无型号，请先去家电库添加
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plans;
