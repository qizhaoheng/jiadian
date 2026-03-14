import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { specTemplates, applianceTypes } from '../../data/specTemplates';
import { X, Save } from 'lucide-react';

const SpecForm = ({ initialData, onSave, onCancel }) => {
  const navigate = useNavigate();
  const createInitialFormData = (data) => ({
    brand: data?.brand || '',
    name: data?.name || '',
    type: data?.type || 'dishwasher',
    price: data?.price || '',
    specs: data?.specs || {},
    tags: data?.tags || [],
    note: data?.note || ''
  });

  const [formData, setFormData] = useState(() => createInitialFormData(initialData));

  const [tagInput, setTagInput] = useState('');

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    const template = specTemplates[newType];
    const newSpecs = {};
    template.forEach(spec => {
      newSpecs[spec.name] = '';
    });
    setFormData({ ...formData, type: newType, specs: newSpecs });
  };

  const handleSpecChange = (name, value) => {
    setFormData({
      ...formData,
      specs: { ...formData.specs, [name]: value }
    });
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      }
      setTagInput('');
    }
  };

  const removeTag = (tag) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const currentTemplate = specTemplates[formData.type] || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-end justify-center">
      <div className="bg-white w-full max-w-mobile h-[90vh] rounded-t-[20px] overflow-hidden flex flex-col shadow-2xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">{initialData ? '编辑家电' : '新增家电'}</h2>
          <button onClick={onCancel} className="p-2 text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* 基本信息 */}
          <div className="space-y-3">
            <h3 className="font-semibold text-blue-600 border-l-4 border-blue-600 pl-2">基本信息</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-gray-500 font-medium">品牌</label>
                <input
                  type="text"
                  required
                  placeholder="如：西门子"
                  className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-500 font-medium">型号</label>
                <input
                  type="text"
                  required
                  placeholder="如：SJ235W01JC"
                  className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-gray-500 font-medium">类型</label>
                <select
                  className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm"
                  value={formData.type}
                  onChange={handleTypeChange}
                  disabled={!!initialData}
                >
                  {applianceTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-500 font-medium">价格 (¥)</label>
                <input
                  type="number"
                  required
                  placeholder="0"
                  className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* 关键参数 */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-blue-600 border-l-4 border-blue-600 pl-2">关键参数</h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigate(`/knowledge?type=${formData.type}`)}
                  className="text-[10px] text-blue-600 font-bold"
                >
                  查看选购指南
                </button>
                <span className="text-[10px] text-gray-400">根据类型自动生成</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {currentTemplate.map(spec => (
                <div key={spec.name} className="space-y-1">
                  <label className="text-xs text-gray-500 font-medium flex items-center">
                    {spec.name}
                    {spec.importance === 'S' && <span className="ml-1 text-red-500 text-[8px] font-bold">S级</span>}
                    {spec.unit && <span className="ml-1 text-gray-400">({spec.unit})</span>}
                  </label>
                  {spec.type === 'select' ? (
                    <select
                      className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm"
                      value={formData.specs[spec.name] || ''}
                      onChange={(e) => handleSpecChange(spec.name, e.target.value)}
                    >
                      <option value="">请选择</option>
                      {spec.options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={spec.type}
                      placeholder={spec.recommended ? `推荐 ${spec.recommended}` : ''}
                      className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm"
                      value={formData.specs[spec.name] || ''}
                      onChange={(e) => handleSpecChange(spec.name, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 标签 */}
          <div className="space-y-1 pt-2">
            <label className="text-xs text-gray-500 font-medium">标签 (按回车添加)</label>
            <input
              type="text"
              placeholder="如：高性价比、高颜值"
              className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
            />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {formData.tags.map(tag => (
                <span key={tag} className="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs rounded-full flex items-center">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="ml-1 text-blue-300 hover:text-blue-500">
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* 备注 */}
          <div className="space-y-1 pt-2">
            <label className="text-xs text-gray-500 font-medium">个人评价 / 备注</label>
            <textarea
              placeholder="记录你的选购初衷或顾虑..."
              className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm h-24 resize-none"
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            />
          </div>
        </form>

        <div className="p-4 border-t bg-gray-50 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600"
          >
            取消
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-3 bg-blue-600 rounded-xl text-sm font-bold text-white flex items-center justify-center"
          >
            <Save size={18} className="mr-2" />
            保存家电
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecForm;
