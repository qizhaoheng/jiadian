import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X, ArrowLeftRight, HelpCircle } from 'lucide-react';
import { applianceApi } from '../../api';
import CompareTable from '../../components/CompareTable';
import { specTemplates, applianceTypes } from '../../data/specTemplates';

const Compare = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [allAppliances, setAllAppliances] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [compareType, setCompareType] = useState('dishwasher');
  const [isSelecting, setIsSelecting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await applianceApi.getAll();
        setAllAppliances(response.data);
        
        const initialSelect = searchParams.get('select');
        if (initialSelect) {
          const app = response.data.find(a => a.id === initialSelect);
          if (app) {
            setCompareType(app.type);
            setSelectedIds([initialSelect]);
          }
        }
      } catch (error) {
        console.error('Error fetching appliances', error);
      }
    };
    fetchData();
  }, [searchParams]);

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      if (selectedIds.length >= 4) {
        alert('最多只能对比4件家电');
        return;
      }
      const app = allAppliances.find(a => a.id === id);
      if (selectedIds.length > 0 && app.type !== compareType) {
        if (window.confirm('不同类型的家电无法对比，是否切换到新类型并清空当前选择？')) {
          setCompareType(app.type);
          setSelectedIds([id]);
        }
      } else {
        if (selectedIds.length === 0) setCompareType(app.type);
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const selectedAppliances = allAppliances.filter(a => selectedIds.includes(a.id));
  const availableAppliances = allAppliances.filter(a => a.type === compareType || selectedIds.length === 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 px-4 pt-6 max-w-mobile mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">参数对比</h1>
      </div>

      {/* Selected Items */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm font-bold text-gray-500">已选对比型号 ({selectedIds.length}/4)</h2>
          {selectedIds.length > 0 && (
            <button onClick={() => setSelectedIds([])} className="text-xs text-blue-600 font-bold">清空</button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {selectedAppliances.map(app => (
            <div key={app.id} className="bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-xl flex items-center shadow-sm">
              <span className="text-xs font-bold text-blue-700 max-w-[80px] truncate">{app.brand} {app.name}</span>
              <button onClick={() => toggleSelect(app.id)} className="ml-2 text-blue-400 hover:text-blue-600">
                <X size={14} />
              </button>
            </div>
          ))}
          {selectedIds.length < 4 && (
            <button 
              onClick={() => setIsSelecting(true)}
              className="px-3 py-1.5 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-xs font-bold flex items-center hover:border-blue-300 hover:text-blue-400"
            >
              <Plus size={14} className="mr-1" />
              添加
            </button>
          )}
        </div>
      </div>

      {/* Comparison Result */}
      {selectedIds.length >= 2 ? (
        <div className="space-y-4 animate-in fade-in duration-500">
          <CompareTable 
            appliances={selectedAppliances} 
            template={specTemplates[compareType] || []} 
          />
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex items-start">
            <HelpCircle size={18} className="text-orange-500 mr-2 mt-0.5" />
            <div className="text-xs text-orange-700 leading-relaxed">
              <p className="font-bold mb-1">小助手提示：</p>
              综合评分根据参数权重和价格自动计算，S级参数权重最高。推荐型号为您提供最优性价比参考。
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-gray-400 space-y-4 text-center">
          <ArrowLeftRight size={48} className="opacity-10" />
          <div>
            <p className="text-sm font-bold text-gray-500">请至少选择2件家电进行对比</p>
            <p className="text-xs mt-1">您可以从家电库中选择，或点击上方“添加”</p>
          </div>
          <button 
            onClick={() => setIsSelecting(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100 active:scale-95"
          >
            立即选择
          </button>
        </div>
      )}

      {/* Selection Drawer */}
      {isSelecting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[101] flex items-end justify-center">
          <div className="bg-white w-full max-w-mobile h-[80vh] rounded-t-[20px] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-bold">选择对比型号</h2>
              <button onClick={() => setIsSelecting(false)} className="p-2 text-gray-400">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                {applianceTypes.map(type => (
                  <button 
                    key={type.value}
                    onClick={() => { setCompareType(type.value); setSelectedIds([]); }}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${compareType === type.value ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
              
              {availableAppliances.length > 0 ? (
                availableAppliances.map(app => (
                  <div 
                    key={app.id}
                    onClick={() => toggleSelect(app.id)}
                    className={`p-4 rounded-xl border transition-all duration-200 flex items-center justify-between ${selectedIds.includes(app.id) ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-gray-100 hover:bg-gray-50'}`}
                  >
                    <div>
                      <div className="font-bold text-gray-800">{app.brand} {app.name}</div>
                      <div className="text-xs text-gray-400 mt-1">¥{app.price} | {app.type}</div>
                    </div>
                    {selectedIds.includes(app.id) && (
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white">
                        <Plus size={16} className="rotate-45" />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-gray-400 text-sm">
                  暂无此类家电，请先去添加
                </div>
              )}
            </div>
            
            <div className="p-4 border-t bg-gray-50">
              <button 
                onClick={() => setIsSelecting(false)}
                className="w-full py-3 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100"
              >
                确定 ({selectedIds.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Compare;
