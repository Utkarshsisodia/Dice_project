import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Auth = ({ onClose }) => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(username, email, password);
      }
      // SUCCESS: Close the modal automatically!
      if (onClose) onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "w-full bg-[#0f212e] border border-[#2f4553] rounded-[4px] text-white font-bold text-[14px] px-4 py-3 focus:outline-none focus:border-[#557086] transition-colors";

  return (
    // MODAL BACKDROP: Fixed to the screen, dark semi-transparent background
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 font-sans">
      
      {/* MODAL CONTAINER */}
      <div className="relative w-full max-w-md bg-[#1a2c38] p-8 rounded-lg shadow-2xl border border-[#2f4553]/30 animate-in fade-in zoom-in-95 duration-200">
        
        {/* CLOSE BUTTON */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[#0f212e] text-[#b1bad3] hover:text-white hover:bg-[#2f4553] transition-colors"
        >
          ✕
        </button>

        <div className="flex justify-center mb-8 mt-2">
          <div className="bg-[#0f212e] p-1 rounded-full flex items-center w-full shadow-inner">
            <button 
              onClick={() => { setIsLogin(true); setError(''); }}
              className={`flex-1 h-[40px] text-[14px] font-bold rounded-full transition-colors ${isLogin ? 'bg-[#2f4553] text-white shadow-sm' : 'text-[#b1bad3] hover:text-white'}`}
            >
              Sign In
            </button>
            <button 
              onClick={() => { setIsLogin(false); setError(''); }}
              className={`flex-1 h-[40px] text-[14px] font-bold rounded-full transition-colors ${!isLogin ? 'bg-[#2f4553] text-white shadow-sm' : 'text-[#b1bad3] hover:text-white'}`}
            >
              Register
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-[#e9113c]/10 border border-[#e9113c]/50 text-[#e9113c] px-4 py-2 rounded-[4px] text-sm font-bold mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[#b1bad3] text-[13px] font-bold tracking-wide">Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className={inputStyle} required={!isLogin} />
            </div>
          )}
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[#b1bad3] text-[13px] font-bold tracking-wide">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputStyle} required />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#b1bad3] text-[13px] font-bold tracking-wide">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputStyle} required />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-[50px] bg-[#00e701] hover:bg-[#00c701] disabled:opacity-50 active:scale-[0.98] rounded-[4px] text-[#0f212e] font-black text-[15px] tracking-wide transition-all mt-4"
          >
            {loading ? 'Loading...' : isLogin ? 'Play Now' : 'Create Account'}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Auth;