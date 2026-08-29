import React, { useState } from 'react';
import { 
  Building2, Lock, User, ArrowRight, ShieldCheck, 
  CheckCircle2, RefreshCw, Key 
} from 'lucide-react';
import { useAuth, DEMO_ACCOUNTS } from '../context/AuthContext';
import { UserRole } from '../types';

interface AuthPageProps {
  mode: 'login' | 'register';
  onNavigate: (path: string) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ mode, onNavigate }) => {
  const { login, register, switchRole } = useAuth();
  
  const [email, setEmail] = useState('citizen@demo.com');
  const [password, setPassword] = useState('Citizen@123');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('citizen');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (mode === 'login') {
      const res = await login(email, password);
      if (res.success) {
        if (email.includes('officer')) onNavigate('/officer/dashboard');
        else if (email.includes('admin')) onNavigate('/admin/dashboard');
        else onNavigate('/citizen/dashboard');
      } else {
        setError(res.message || 'Login failed');
      }
    } else {
      const res = await register(name, email, password, role);
      if (res.success) {
        onNavigate('/citizen/dashboard');
      } else {
        setError(res.message || 'Registration failed');
      }
    }
    setLoading(false);
  };

  const handle1ClickDemo = async (targetRole: UserRole) => {
    await switchRole(targetRole);
    if (targetRole === 'citizen') onNavigate('/citizen/dashboard');
    else if (targetRole === 'officer') onNavigate('/officer/dashboard');
    else if (targetRole === 'admin') onNavigate('/admin/dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#0F5132] to-[#0A3622] text-white mx-auto flex items-center justify-center shadow-lg border border-emerald-600/40">
          <Building2 className="w-8 h-8 text-emerald-300" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 font-serif">
          {mode === 'login' ? 'Single Sign-On (SSO) Login' : 'Create Citizen Account'}
        </h1>
        <p className="text-xs text-slate-500">
          State Government of Maharashtra Unified Portal
        </p>
      </div>

      {/* 1-Click Demo Shortcut Bar */}
      <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl space-y-2 text-xs">
        <span className="font-bold text-emerald-950 block text-[11px] uppercase tracking-wider">
          ⚡ 1-Click Persona Sign-In (No typing needed):
        </span>
        <div className="grid grid-cols-3 gap-1.5 font-bold">
          <button
            type="button"
            onClick={() => handle1ClickDemo('citizen')}
            className="p-1.5 bg-white hover:bg-emerald-100 text-emerald-900 rounded-lg border border-emerald-300 text-[11px] transition-colors cursor-pointer"
          >
            Citizen
          </button>
          <button
            type="button"
            onClick={() => handle1ClickDemo('officer')}
            className="p-1.5 bg-white hover:bg-amber-100 text-amber-900 rounded-lg border border-amber-300 text-[11px] transition-colors cursor-pointer"
          >
            Officer
          </button>
          <button
            type="button"
            onClick={() => handle1ClickDemo('admin')}
            className="p-1.5 bg-white hover:bg-purple-100 text-purple-900 rounded-lg border border-purple-300 text-[11px] transition-colors cursor-pointer"
          >
            Admin
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4 text-xs">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-800 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="font-bold text-slate-700 block mb-1">Full Legal Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden font-medium"
                required
              />
            </div>
          )}

          <div>
            <label className="font-bold text-slate-700 block mb-1">Email / SSO Identifier</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. citizen@demo.com"
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden font-medium"
              required
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden font-medium font-mono"
              required
            />
          </div>

          {mode === 'register' && (
            <div>
              <label className="font-bold text-slate-700 block mb-1">User Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 font-medium"
              >
                <option value="citizen">Citizen</option>
                <option value="officer">Desk Officer</option>
                <option value="admin">System Administrator</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#0F5132] hover:bg-[#0b3d26] text-white font-bold rounded-xl text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Authenticating with Central SSO...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center border-t border-slate-100">
          {mode === 'login' ? (
            <p className="text-slate-500">
              New citizen?{' '}
              <button
                type="button"
                onClick={() => onNavigate('/register')}
                className="font-bold text-emerald-800 hover:underline cursor-pointer"
              >
                Register Unified Profile
              </button>
            </p>
          ) : (
            <p className="text-slate-500">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => onNavigate('/login')}
                className="font-bold text-emerald-800 hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>

    </div>
  );
};
