import React from 'react';
import { Tag, Edit, Trash2 } from 'lucide-react';

const ApplianceCard = ({ appliance, onEdit, onDelete, onClick }) => {
  const { brand, name, price, specs, tags } = appliance;

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-3 active:scale-[0.98] transition-all duration-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold text-gray-800">
          <span className="text-blue-600 mr-2">{brand}</span>
          {name}
        </h3>
        <span className="text-xl font-bold text-orange-500">¥{price}</span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm text-gray-500 mb-3">
        {Object.entries(specs).slice(0, 4).map(([key, value]) => (
          <div key={key} className="flex items-center">
            <span className="font-medium mr-1">{key}:</span>
            <span className="text-gray-700 truncate">{value}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {tags?.map(tag => (
          <span key={tag} className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] rounded-full flex items-center">
            <Tag size={10} className="mr-1" />
            {tag}
          </span>
        ))}
      </div>

      <div className="flex justify-end space-x-3 pt-2 border-t border-gray-50">
        <button 
          onClick={(e) => { e.stopPropagation(); onEdit(appliance); }}
          className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors"
        >
          <Edit size={18} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(appliance.id); }}
          className="p-1.5 text-gray-500 hover:text-red-600 transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default ApplianceCard;
