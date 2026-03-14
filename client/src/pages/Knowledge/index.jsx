import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, ChevronRight, HelpCircle, CheckCircle2 } from 'lucide-react';
import { knowledgeApi } from '../../api';
import { applianceTypes } from '../../data/specTemplates';

const Knowledge = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [knowledge, setKnowledge] = useState({});
  const [selectedType, setSelectedType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await knowledgeApi.get();
        setKnowledge(response.data);
      } catch (error) {
        console.error('Error fetching knowledge', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const type = searchParams.get('type');
    if (type) {
      setSelectedType(type);
    }
  }, [searchParams]);

  if (loading) return <div className="p-10 text-center text-gray-400">加载中...</div>;

  const currentKnowledge = selectedType ? knowledge[selectedType] : null;
  const recommendedList = currentKnowledge?.tips?.length ? currentKnowledge?.tips : currentKnowledge?.recommended || [];
  const avoidList = currentKnowledge?.avoid || [];
  const focusParams = currentKnowledge?.focusParams || [];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 px-4 pt-6 max-w-mobile mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        {selectedType ? (
          <button onClick={() => setSelectedType(null)} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft size={20} />
          </button>
        ) : (
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft size={20} />
          </button>
        )}
        <h1 className="text-xl font-bold text-gray-800">选购知识库</h1>
      </div>

      {!selectedType ? (
        <div className="grid grid-cols-1 gap-4">
          {applianceTypes.map(type => (
            <div 
              key={type.value}
              onClick={() => setSelectedType(type.value)}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:border-purple-300 transition-colors cursor-pointer group"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{type.label}选购指南</h3>
                  <p className="text-xs text-gray-400 mt-1">包含参数解释与选购建议</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-300" />
            </div>
          ))}
          
          <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 mt-4">
            <div className="flex items-center mb-3">
              <HelpCircle size={20} className="text-purple-600 mr-2" />
              <h3 className="font-bold text-purple-800 text-sm">为什么要看知识库？</h3>
            </div>
            <p className="text-xs text-purple-700 leading-relaxed opacity-80">
              家电参数众多，商家宣传往往避重就轻。我们的知识库为您提炼最核心的参数指标，帮助您在录入参数时就能看懂优劣，做出理性的购买决策。
            </p>
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-right duration-300 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-black text-gray-800 mb-2">{currentKnowledge?.title || '选购指南'}</h2>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-widest mb-4">Expert Buying Advice</p>
            {currentKnowledge?.intro && (
              <div className="text-sm text-gray-600 leading-relaxed mb-6">{currentKnowledge.intro}</div>
            )}
            {focusParams.length > 0 && (
              <div className="mb-6">
                <div className="text-xs font-bold text-gray-500 mb-2">重点参数</div>
                <div className="flex flex-wrap gap-2">
                  {focusParams.map(param => (
                    <span key={param} className="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">{param}</span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-purple-600 border-l-4 border-purple-600 pl-3">核心选购建议</h3>
              <div className="space-y-3">
                {recommendedList.map((tip, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-xl flex items-start">
                    <CheckCircle2 size={18} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 leading-relaxed font-medium">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {avoidList.length > 0 && (
              <div className="space-y-3 mt-6">
                <h3 className="text-sm font-bold text-red-500 border-l-4 border-red-500 pl-3">避坑提醒</h3>
                <div className="space-y-3">
                  {avoidList.map((tip, idx) => (
                    <div key={idx} className="bg-red-50 p-4 rounded-xl flex items-start">
                      <span className="w-2 h-2 rounded-full bg-red-400 mt-2 mr-3" />
                      <span className="text-sm text-red-700 leading-relaxed font-medium">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-10 p-4 bg-yellow-50 rounded-xl border border-yellow-100 flex items-start">
              <div className="bg-yellow-100 p-2 rounded-lg text-yellow-700 mr-3">
                <HelpCircle size={16} />
              </div>
              <div className="text-[11px] text-yellow-800 leading-relaxed">
                <p className="font-bold mb-1">录入小窍门：</p>
                在“家电库”添加新家电时，您可以随时切换到知识库查看参数标准，确保录入的数据准确且有参考价值。
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Knowledge;
