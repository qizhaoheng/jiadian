import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../../api';

const Login = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError('请输入标识');
      return;
    }
    try {
      setLoading(true);
      setError('');
      const response = await loginApi.login(identifier.trim());
      if (response.data?.success) {
        localStorage.setItem('identifier', response.data.identifier);
        window.dispatchEvent(new Event('identifier-changed'));
        navigate('/', { replace: true });
      } else {
        setError('标识无效');
      }
    } catch {
      setError('标识无效');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-12 max-w-mobile mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h1 className="text-2xl font-black text-gray-800 mb-2 text-center">家电决策助手</h1>
        <p className="text-xs text-gray-400 text-center mb-6">请输入你的标识进入系统</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="请输入你的标识"
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
          />
          {error && <div className="text-xs text-red-500 text-center">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100 disabled:opacity-60"
          >
            {loading ? '进入中...' : '进入系统'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
