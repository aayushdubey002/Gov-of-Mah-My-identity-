import React, { useState, useEffect } from 'react';
import { 
  Building2, Shield, ShieldCheck, User, Bell, ChevronDown, CheckCircle2, 
  ExternalLink, LogOut, FileText, ArrowRight, Activity, 
  Layers, Lock, Database, Globe, UserCheck, Search
} from 'lucide-react';
import { useAuth, DEMO_ACCOUNTS } from '../context/AuthContext';
import { Language, UserRole } from '../types';
import { apiService } from '../services/api';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  lang,
  onLanguageChange
}) => {
  const { user, logout, switchRole } = useAuth();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);
  const [notificationsList, setNotificationsList] = useState<any[]>([]);

  useEffect(() => {
    apiService.getNotifications().then((data) => {
      setNotificationsList(data);
      setUnreadCount(data.filter((n) => !n.read).length);
    });
  }, [currentPath]);

  const handleRoleSwitch = async (role: UserRole) => {
    await switchRole(role);
    setRoleSwitcherOpen(false);
    if (role === 'citizen') onNavigate('/citizen/dashboard');
    else if (role === 'officer') onNavigate('/officer/dashboard');
    else if (role === 'admin') onNavigate('/admin/dashboard');
  };

  const getRoleBadgeColor = (role: string) => {
    if (role === 'admin') return 'bg-purple-100 text-purple-800 border-purple-300';
    if (role === 'officer') return 'bg-amber-100 text-amber-900 border-amber-300';
    return 'bg-emerald-100 text-emerald-900 border-emerald-300';
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      
      {/* Top Interoperability & SSO Role Bar */}
      <div className="bg-[#103B2B] text-white px-3 sm:px-6 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          {/* 3 Active Role Switcher In-Line occupying the bar */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-4">
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Active Role:</span>
            </span>

            <div className="flex items-center bg-emerald-950/80 p-1 rounded-xl border border-emerald-700/70 shadow-inner gap-1 sm:gap-1.5">
              {/* Citizen */}
              <button
                id="header-role-citizen"
                onClick={() => handleRoleSwitch('citizen')}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer ${
                  user?.role === 'citizen'
                    ? 'bg-emerald-500 text-emerald-950 shadow-md ring-2 ring-emerald-300 font-extrabold scale-100'
                    : 'text-emerald-200 hover:text-white hover:bg-emerald-800/70'
                }`}
                title="Switch to Citizen Portal (Rahul Sharma)"
              >
                <User className="w-3.5 h-3.5" />
                <span>Citizen</span>
                {user?.role === 'citizen' && (
                  <span className="bg-emerald-950/20 text-emerald-950 text-[10px] px-1.5 py-0.2 rounded font-black hidden sm:inline">
                    Active
                  </span>
                )}
              </button>

              {/* Desk Officer */}
              <button
                id="header-role-officer"
                onClick={() => handleRoleSwitch('officer')}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer ${
                  user?.role === 'officer'
                    ? 'bg-amber-400 text-amber-950 shadow-md ring-2 ring-amber-300 font-extrabold scale-100'
                    : 'text-emerald-200 hover:text-white hover:bg-emerald-800/70'
                }`}
                title="Switch to Desk Officer Console (Rajesh Deshmukh)"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Desk Officer</span>
                {user?.role === 'officer' && (
                  <span className="bg-amber-950/20 text-amber-950 text-[10px] px-1.5 py-0.2 rounded font-black hidden sm:inline">
                    Active
                  </span>
                )}
              </button>

              {/* System Admin */}
              <button
                id="header-role-admin"
                onClick={() => handleRoleSwitch('admin')}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer ${
                  user?.role === 'admin'
                    ? 'bg-purple-400 text-purple-950 shadow-md ring-2 ring-purple-300 font-extrabold scale-100'
                    : 'text-emerald-200 hover:text-white hover:bg-emerald-800/70'
                }`}
                title="Switch to System Administrator Console (S.K. Nandanwar)"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>System Administrator</span>
                {user?.role === 'admin' && (
                  <span className="bg-purple-950/20 text-purple-950 text-[10px] px-1.5 py-0.2 rounded font-black hidden sm:inline">
                    Active
                  </span>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* Logo & Portal Title */}
          <div 
            onClick={() => onNavigate(user?.role === 'officer' ? '/officer/dashboard' : user?.role === 'admin' ? '/admin/dashboard' : '/citizen/dashboard')}
            className="flex items-center gap-3 cursor-pointer select-none shrink-0"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-linear-to-br from-[#0F5132] to-[#0A3622] flex items-center justify-center text-white shadow-md border border-emerald-600/30">
              <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-300" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight font-serif">
                  माझी ओळख
                </span>
                <span className="text-xs sm:text-sm font-bold text-emerald-800 uppercase tracking-wider">
                  MAHARASHTRA
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-500 hidden sm:block">
                Unified Government Interoperability Gateway
              </span>
            </div>
          </div>

          {/* Role-Specific Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            
            {/* CITIZEN LINKS */}
            {(!user || user.role === 'citizen') && (
              <>
                <button
                  onClick={() => onNavigate('/citizen/dashboard')}
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-bold transition-all cursor-pointer ${
                    currentPath === '/citizen/dashboard' || currentPath === '/'
                      ? 'bg-emerald-100 text-emerald-950 shadow-2xs border border-emerald-300'
                      : 'text-slate-700 hover:text-emerald-900 hover:bg-slate-100'
                  }`}
                >
                  Dashboard
                </button>

                <button
                  onClick={() => onNavigate('/citizen/services')}
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-bold transition-all cursor-pointer ${
                    currentPath.startsWith('/citizen/services') || currentPath.startsWith('/citizen/apply')
                      ? 'bg-emerald-100 text-emerald-950 shadow-2xs border border-emerald-300'
                      : 'text-slate-700 hover:text-emerald-900 hover:bg-slate-100'
                  }`}
                >
                  Services
                </button>

                <button
                  onClick={() => onNavigate('/citizen/applications')}
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-bold transition-all cursor-pointer ${
                    currentPath.startsWith('/citizen/applications')
                      ? 'bg-emerald-100 text-emerald-950 shadow-2xs border border-emerald-300'
                      : 'text-slate-700 hover:text-emerald-900 hover:bg-slate-100'
                  }`}
                >
                  Track Applications
                </button>

                <button
                  onClick={() => onNavigate('/citizen/profile')}
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-bold transition-all cursor-pointer ${
                    currentPath === '/citizen/profile'
                      ? 'bg-emerald-100 text-emerald-950 shadow-2xs border border-emerald-300'
                      : 'text-slate-700 hover:text-emerald-900 hover:bg-slate-100'
                  }`}
                >
                  Unified Profile
                </button>

                <button
                  onClick={() => onNavigate('/citizen/consent')}
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-bold transition-all cursor-pointer ${
                    currentPath === '/citizen/consent'
                      ? 'bg-emerald-100 text-emerald-950 shadow-2xs border border-emerald-300'
                      : 'text-slate-700 hover:text-emerald-900 hover:bg-slate-100'
                  }`}
                >
                  Consent Manager
                </button>

                <button
                  onClick={() => onNavigate('/citizen/grievances')}
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-bold transition-all cursor-pointer ${
                    currentPath === '/citizen/grievances'
                      ? 'bg-emerald-100 text-emerald-950 shadow-2xs border border-emerald-300'
                      : 'text-slate-700 hover:text-emerald-900 hover:bg-slate-100'
                  }`}
                >
                  Grievances
                </button>
              </>
            )}

            {/* OFFICER LINKS */}
            {user?.role === 'officer' && (
              <>
                <button
                  onClick={() => onNavigate('/officer/dashboard')}
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-bold transition-all cursor-pointer ${
                    currentPath === '/officer/dashboard'
                      ? 'bg-amber-100 text-amber-950 shadow-2xs border border-amber-300'
                      : 'text-slate-700 hover:text-amber-900 hover:bg-slate-100'
                  }`}
                >
                  Officer Dashboard
                </button>

                <button
                  onClick={() => onNavigate('/officer/applications')}
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-bold transition-all cursor-pointer ${
                    currentPath.startsWith('/officer/applications')
                      ? 'bg-amber-100 text-amber-950 shadow-2xs border border-amber-300'
                      : 'text-slate-700 hover:text-amber-900 hover:bg-slate-100'
                  }`}
                >
                  Application Scrutiny Desk
                </button>
              </>
            )}

            {/* ADMIN LINKS */}
            {user?.role === 'admin' && (
              <>
                <button
                  onClick={() => onNavigate('/admin/dashboard')}
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-bold transition-all cursor-pointer ${
                    currentPath === '/admin/dashboard'
                      ? 'bg-purple-100 text-purple-950 shadow-2xs border border-purple-300'
                      : 'text-slate-700 hover:text-purple-900 hover:bg-slate-100'
                  }`}
                >
                  System Dashboard
                </button>

                <button
                  onClick={() => onNavigate('/admin/integrations')}
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-bold transition-all cursor-pointer ${
                    currentPath === '/admin/integrations'
                      ? 'bg-purple-100 text-purple-950 shadow-2xs border border-purple-300'
                      : 'text-slate-700 hover:text-purple-900 hover:bg-slate-100'
                  }`}
                >
                  Legacy & API Connectors
                </button>

                <button
                  onClick={() => onNavigate('/admin/api-logs')}
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-bold transition-all cursor-pointer ${
                    currentPath === '/admin/api-logs'
                      ? 'bg-purple-100 text-purple-950 shadow-2xs border border-purple-300'
                      : 'text-slate-700 hover:text-purple-900 hover:bg-slate-100'
                  }`}
                >
                  API Logs & Retries
                </button>

                <button
                  onClick={() => onNavigate('/admin/audit-logs')}
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-bold transition-all cursor-pointer ${
                    currentPath === '/admin/audit-logs'
                      ? 'bg-purple-100 text-purple-950 shadow-2xs border border-purple-300'
                      : 'text-slate-700 hover:text-purple-900 hover:bg-slate-100'
                  }`}
                >
                  Audit Trail
                </button>

                <button
                  onClick={() => onNavigate('/admin/departments')}
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-bold transition-all cursor-pointer ${
                    currentPath === '/admin/departments'
                      ? 'bg-purple-100 text-purple-950 shadow-2xs border border-purple-300'
                      : 'text-slate-700 hover:text-purple-900 hover:bg-slate-100'
                  }`}
                >
                  Departments
                </button>

                <button
                  onClick={() => onNavigate('/admin/workflows')}
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-bold transition-all cursor-pointer ${
                    currentPath === '/admin/workflows'
                      ? 'bg-purple-100 text-purple-950 shadow-2xs border border-purple-300'
                      : 'text-slate-700 hover:text-purple-900 hover:bg-slate-100'
                  }`}
                >
                  Workflows
                </button>
              </>
            )}

          </nav>

          {/* Right Action Tools: Language + Notifications + User SSO Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Selector */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-full border border-slate-300 text-xs font-bold shadow-2xs">
              <button
                onClick={() => onLanguageChange('mr')}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  lang === 'mr' ? 'bg-[#0F5132] text-white shadow-xs' : 'text-slate-700 hover:text-emerald-900'
                }`}
              >
                मराठी
              </button>
              <button
                onClick={() => onLanguageChange('hi')}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  lang === 'hi' ? 'bg-[#0F5132] text-white shadow-xs' : 'text-slate-700 hover:text-emerald-900'
                }`}
              >
                हिंदी
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  lang === 'en' ? 'bg-[#0F5132] text-white shadow-xs' : 'text-slate-700 hover:text-emerald-900'
                }`}
              >
                EN
              </button>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-full text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-600 text-white font-bold text-[10px] rounded-full flex items-center justify-center border-2 border-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 py-3 z-50">
                  <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">Notifications ({notificationsList.length})</span>
                    <button 
                      onClick={() => setNotificationsOpen(false)}
                      className="text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notificationsList.map((n) => (
                      <div 
                        key={n.id} 
                        onClick={() => {
                          if (n.linkUrl) onNavigate(n.linkUrl);
                          setNotificationsOpen(false);
                        }}
                        className={`p-3 text-xs hover:bg-slate-50 transition-colors cursor-pointer ${!n.read ? 'bg-emerald-50/50' : ''}`}
                      >
                        <p className="font-bold text-slate-900">{n.title}</p>
                        <p className="text-slate-600 mt-0.5 leading-relaxed">{n.message}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">
                          {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* SSO Profile Pill / Auth Button */}
            {user ? (
              <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-300/80 rounded-full pl-2.5 pr-1.5 py-1 shadow-2xs">
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-900 leading-tight truncate max-w-[100px] sm:max-w-[140px]">
                    {user.name.split(' ')[0]}
                  </span>
                  <span className="text-[9px] font-bold text-emerald-800 uppercase tracking-tight">
                    {user.role}
                  </span>
                </div>

                <button
                  onClick={logout}
                  title="Logout"
                  className="p-1.5 hover:bg-red-50 text-slate-500 hover:text-red-600 rounded-full transition-colors cursor-pointer ml-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onNavigate('/login')}
                className="bg-[#0F5132] hover:bg-[#0b3d26] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-xs transition-transform active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <User className="w-3.5 h-3.5 text-emerald-300" />
                <span>Single Sign-On (SSO)</span>
              </button>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
