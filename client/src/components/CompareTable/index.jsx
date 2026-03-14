import React from 'react';
import { CheckCircle2, TrendingDown, TrendingUp } from 'lucide-react';

const CompareTable = ({ appliances, template }) => {
  if (!appliances || appliances.length === 0) return null;

  const getBetterValue = (specName, values) => {
    const spec = template.find(s => s.name === specName);
    if (!spec) return null;

    if (spec.type === 'number') {
      const numValues = values.map(v => parseFloat(v)).filter(v => !isNaN(v));
      if (numValues.length === 0) return null;
      
      // Determine if higher or lower is better
      const isLowerBetter = spec.name.includes('噪音') || spec.name.includes('能耗') || spec.name.includes('价格');
      const targetValue = isLowerBetter ? Math.min(...numValues) : Math.max(...numValues);
      return targetValue;
    }
    return null;
  };

  const calculateScore = (appliance) => {
    let score = 0;
    let totalWeight = 0;

    template.forEach(spec => {
      const weight = spec.importance === 'S' ? 3 : spec.importance === 'A' ? 2 : 1;
      totalWeight += weight;

      const value = appliance.specs[spec.name];
      if (!value) return;

      if (spec.type === 'number') {
        const num = parseFloat(value);
        if (spec.recommended) {
          const rec = parseFloat(spec.recommended.replace(/[^0-9.]/g, ''));
          const isGreater = spec.recommended.includes('≥');
          if ((isGreater && num >= rec) || (!isGreater && num <= rec)) {
            score += weight;
          }
        } else {
          score += weight * 0.5; // Default partial score for having data
        }
      } else if (value) {
        score += weight;
      }
    });

    // Add price factor (lower price, higher score contribution)
    const prices = appliances.map(a => parseFloat(a.price)).filter(p => !isNaN(p));
    const minPrice = Math.min(...prices);
    const priceRatio = minPrice / parseFloat(appliance.price);
    score += priceRatio * 5; // Price has a high weight

    return Math.round((score / (totalWeight + 5)) * 100);
  };

  const scores = appliances.map(calculateScore);
  const maxScore = Math.max(...scores);
  const recommendedIndex = scores.indexOf(maxScore);

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="p-3 text-left font-semibold text-gray-500 w-24 border-r">参数</th>
            {appliances.map((app, idx) => (
              <th key={app.id} className="p-3 text-center min-w-[120px]">
                <div className="text-blue-600 font-bold truncate">{app.brand}</div>
                <div className="text-gray-400 text-[10px] truncate font-normal">{app.name}</div>
                {idx === recommendedIndex && (
                  <div className="mt-1 inline-flex items-center px-2 py-0.5 bg-green-100 text-green-700 text-[10px] rounded-full">
                    <CheckCircle2 size={10} className="mr-1" />
                    推荐
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {/* Price */}
          <tr>
            <td className="p-3 font-medium text-gray-600 border-r bg-gray-50/30">价格</td>
            {appliances.map((app) => {
              const price = parseFloat(app.price);
              const minPrice = Math.min(...appliances.map(a => parseFloat(a.price)));
              const isBest = price === minPrice;
              return (
                <td key={app.id} className={`p-3 text-center ${isBest ? 'bg-orange-50 font-bold text-orange-600' : ''}`}>
                  ¥{app.price}
                  {isBest && <TrendingDown size={12} className="inline ml-1" />}
                </td>
              );
            })}
          </tr>

          {/* Specs */}
          {template.map(spec => {
            const values = appliances.map(app => app.specs[spec.name]);
            const betterValue = getBetterValue(spec.name, values);
            
            return (
              <tr key={spec.name}>
                <td className="p-3 font-medium text-gray-600 border-r bg-gray-50/30">
                  {spec.name}
                  {spec.unit && <span className="text-[10px] text-gray-400 block font-normal">({spec.unit})</span>}
                </td>
                {appliances.map((app) => {
                  const val = app.specs[spec.name];
                  const isBetter = betterValue !== null && parseFloat(val) === betterValue;
                  return (
                    <td key={app.id} className={`p-3 text-center ${isBetter ? 'bg-blue-50 font-bold text-blue-600' : ''}`}>
                      {val || '-'}
                      {isBetter && (spec.name.includes('容量') ? <TrendingUp size={12} className="inline ml-1" /> : <TrendingDown size={12} className="inline ml-1" />)}
                    </td>
                  );
                })}
              </tr>
            );
          })}

          {/* Score */}
          <tr className="border-t-2 border-gray-100">
            <td className="p-3 font-bold text-gray-800 border-r bg-gray-50">综合评分</td>
            {scores.map((score, idx) => (
              <td key={idx} className="p-3 text-center">
                <div className={`text-xl font-black ${idx === recommendedIndex ? 'text-green-600 scale-110' : 'text-gray-400'}`}>
                  {score}
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CompareTable;
