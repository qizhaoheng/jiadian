import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Plus, Search, ArrowLeft } from 'lucide-react';
import { applianceApi } from '../../api';
import ApplianceCard from '../../components/ApplianceCard';
import SpecForm from '../../components/SpecForm';
import { applianceTypes } from '../../data/specTemplates';

const Appliances = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [appliances, setAppliances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editAppliance, setEditAppliance] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await applianceApi.getAll();
      setAppliances(response.data);
    } catch (error) {
      console.error('Error fetching appliances', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    if (searchParams.get('add') === 'true') {
      setIsFormOpen(true);
      setEditAppliance(null);
    }
  }, [searchParams]);

  const handleSave = async (data) => {
    try {
      if (editAppliance) {
        await applianceApi.update(editAppliance.id, data);
      } else {
        await applianceApi.create(data);
      }
      setIsFormOpen(false);
      setEditAppliance(null);
      setSearchParams({});
      fetchData();
    } catch {
      alert('保存失败，请重试');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('确定要删除这家电吗？')) {
      try {
        await applianceApi.delete(id);
        fetchData();
      } catch {
        alert('删除失败');
      }
    }
  };

  const handleEdit = (app) => {
    setEditAppliance(app);
    setIsFormOpen(true);
  };

  const filteredAppliances = appliances.filter(app => {
    const matchesSearch = 
      app.brand.toLowerCase().includes(searchTerm.toLowerCase()) || 
      app.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || app.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20 px-4 pt-6 max-w-mobile mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">家电库</h1>
        <div className="flex-1" />
        <button 
          onClick={() => { setEditAppliance(null); setIsFormOpen(true); }}
          className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-bold flex items-center shadow-md shadow-blue-100"
        >
          <Plus size={16} className="mr-1" />
          新增
        </button>
      </div>

      {/* Search and Filter */}
      <div className="space-y-3 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="搜索品牌或型号..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-hide">
          <button 
            onClick={() => setFilterType('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${filterType === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-500 border border-gray-100 shadow-sm'}`}
          >
            全部
          </button>
          {applianceTypes.map(type => (
            <button 
              key={type.value}
              onClick={() => setFilterType(type.value)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${filterType === type.value ? 'bg-blue-600 text-white' : 'bg-white text-gray-500 border border-gray-100 shadow-sm'}`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="text-center py-20 text-gray-400 text-sm">正在加载中...</div>
      ) : filteredAppliances.length > 0 ? (
        <div className="space-y-1">
          {filteredAppliances.map(app => (
            <ApplianceCard 
              key={app.id} 
              appliance={app} 
              onEdit={handleEdit}
              onDelete={handleDelete}
              onClick={() => navigate(`/compare?select=${app.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 border border-gray-100 flex flex-col items-center justify-center text-gray-400 space-y-3">
          <Search size={48} className="opacity-10" />
          <p className="text-sm font-medium">没有找到符合条件的家电</p>
        </div>
      )}

      {/* Spec Form Modal */}
      {isFormOpen && (
        <SpecForm 
          key={editAppliance?.id || 'new'}
          initialData={editAppliance}
          onSave={handleSave}
          onCancel={() => { setIsFormOpen(false); setEditAppliance(null); setSearchParams({}); }}
        />
      )}
    </div>
  );
};

export default Appliances;
