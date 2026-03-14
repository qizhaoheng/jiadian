import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../../api';

const Login = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    return Array.from({ length: 5 }).map(() => {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const rotate = Math.floor(Math.random() * 50) - 25;
      const translateY = Math.floor(Math.random() * 12) - 6;
      const translateX = Math.floor(Math.random() * 10) - 5;
      return { char, rotate, translateX, translateY };
    });
  };

  const [captchaChars, setCaptchaChars] = useState(() => generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const refreshCaptcha = () => {
    setCaptchaChars(generateCaptcha());
    setCaptchaInput('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError('请输入标识');
      return;
    }
    if (!captchaInput.trim()) {
      setError('请输入验证码');
      return;
    }
    const captchaValue = captchaChars.map((c) => c.char).join('');
    if (captchaInput.trim().toUpperCase() !== captchaValue) {
      setError('验证码错误');
      refreshCaptcha();
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
        refreshCaptcha();
      }
    } catch {
      setError('标识无效');
      refreshCaptcha();
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
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              placeholder="请输入验证码（不区分大小写）"
              className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
            />
            <button
              type="button"
              onClick={refreshCaptcha}
              className="relative px-4 py-3 bg-gray-100 text-gray-700 rounded-xl text-sm font-black tracking-widest overflow-hidden"
            >
              <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'repeating-linear-gradient(120deg, rgba(148,163,184,0.3) 0px, rgba(148,163,184,0.3) 2px, transparent 2px, transparent 6px)' }} />
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(60deg, rgba(59,130,246,0.25) 0px, rgba(59,130,246,0.25) 1px, transparent 1px, transparent 5px)' }} />
              <div className="relative flex items-center justify-center gap-1">
                {captchaChars.map((item, idx) => (
                  <span
                    key={`${item.char}-${idx}`}
                    className="inline-block"
                    style={{
                      transform: `translate(${item.translateX}px, ${item.translateY}px) rotate(${item.rotate}deg)`,
                    }}
                  >
                    {item.char}
                  </span>
                ))}
              </div>
            </button>
          </div>
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
