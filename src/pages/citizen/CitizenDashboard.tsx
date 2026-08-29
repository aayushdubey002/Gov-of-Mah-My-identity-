import React, { useState, useEffect } from 'react';
import { 
  FileText, CheckCircle2, Clock, AlertTriangle, ArrowRight, 
  Shield, User, UserCheck, Layers, Sparkles, Building2, ExternalLink, 
  PlusCircle, Award, TrendingUp, Activity, HelpCircle, Lock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';
import { Application, CitizenProfile, GovernmentService } from '../../types';
import { getText } from '../../utils/localized';

interface CitizenDashboardProps {
  onNavigate: (path: string) => void;
}

export const CitizenDashboard: React.FC<CitizenDashboardProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<CitizenProfile | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [services, setServices] = useState<GovernmentService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiService.getProfile(),
      apiService.getApplications(),
      apiService.getServices()
    ]).then(([prof, apps, servs]) => {
      setProfile(prof);
      setApplications(apps);
      setServices(servs);
      setLoading(false);
    });
  }, []);

  const approvedCount = applications.filter((a) => a.status === 'APPROVED').length;
  const pendingCount = applications.filter((a) => a.status !== 'APPROVED' && a.status !== 'REJECTED').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Hero Interoperability Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#0F5132] via-[#0D4329] to-[#0A3622] text-white p-6 sm:p-8 shadow-xl border border-emerald-700/40">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>Unified Citizen Ecosystem • SIH 26129</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight font-serif">
              Welcome back, {user?.name || profile?.fullName || 'Citizen'}
            </h1>
            
            <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed max-w-xl">
              One Unified Profile connects across all 25 Maharashtra Government Departments. Never submit duplicate documents, income proofs, or residency certificates again.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <button
              onClick={() => onNavigate('/citizen/profile')}
              className="bg-white text-emerald-950 hover:bg-emerald-50 px-5 py-3 rounded-xl font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <User className="w-4 h-4 text-emerald-700" />
              <span>View Master Profile & Vault</span>
            </button>

            <button
              onClick={() => onNavigate('/citizen/services')}
              className="bg-emerald-800/80 hover:bg-emerald-700 text-white border border-emerald-500/50 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Apply for Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Ambient watermark background decorative icon */}
        <div className="absolute right-[-20px] bottom-[-20px] opacity-10 pointer-events-none">
          <Building2 className="w-72 h-72 text-white" />
        </div>
      </div>

      {/* Core Highlights Metric Widgets */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div 
          onClick={() => onNavigate('/citizen/applications')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Applications</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{applications.length}</p>
          <p className="text-[11px] text-blue-700 font-semibold mt-1 flex items-center gap-1">
            <span>{pendingCount} in progress</span>
            <span>•</span>
            <span className="text-emerald-700 font-bold">{approvedCount} approved</span>
          </p>
        </div>

        <div 
          onClick={() => onNavigate('/citizen/profile')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Verified Vault</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-emerald-950 mt-2">4/4</p>
          <p className="text-[11px] text-emerald-700 font-bold mt-1">
            ✓ DigiLocker & State Sync Active
          </p>
        </div>

        <div 
          onClick={() => onNavigate('/citizen/consent')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Consent Tokens</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-purple-950 mt-2">3 Active</p>
          <p className="text-[11px] text-purple-700 font-semibold mt-1">
            DPDP Act Compliance
          </p>
        </div>

        <div 
          onClick={() => onNavigate('/citizen/grievances')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Grievances SLA</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">100%</p>
          <p className="text-[11px] text-emerald-700 font-bold mt-1">
            Zero SLA breaches
          </p>
        </div>

      </div>

      {/* Main 2-Column Content: Recent Applications + Quick Services */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (7 cols): Recent Unified Applications & Tracking */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Recent Applications</h2>
                <p className="text-xs text-slate-500">Track real-time cross-department verification statuses</p>
              </div>

              <button
                onClick={() => onNavigate('/citizen/applications')}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {applications.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs">
                No applications submitted yet. Apply for a service below!
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {applications.slice(0, 3).map((app) => (
                  <div 
                    key={app.id}
                    onClick={() => onNavigate(`/citizen/applications/${app.id}`)}
                    className="py-3.5 flex items-center justify-between hover:bg-slate-50 rounded-xl px-2 transition-colors cursor-pointer"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{getText(app.serviceName)}</span>
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider ${
                          app.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-900' :
                          app.status === 'REJECTED' ? 'bg-red-100 text-red-900' :
                          'bg-amber-100 text-amber-900'
                        }`}>
                          {app.status.replace('_', ' ')}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                        <span>{app.id}</span>
                        <span>•</span>
                        <span>{getText(app.departmentName)}</span>
                        <span>•</span>
                        <span>{new Date(app.createdAt || Date.now()).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Unified Profile Summary Card */}
          <div className="bg-emerald-50/70 rounded-2xl p-6 border border-emerald-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-emerald-900 font-bold">
                <UserCheck className="w-5 h-5 text-emerald-700" />
                <span>Unified Citizen Master Profile</span>
              </div>
              <button
                onClick={() => onNavigate('/citizen/profile')}
                className="text-xs font-bold text-emerald-800 hover:underline cursor-pointer"
              >
                Edit Master Data
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-white p-2.5 rounded-lg border border-emerald-100">
                <span className="text-[10px] text-slate-400 block">Citizen ID</span>
                <span className="font-bold text-slate-800">{profile?.citizenId || 'CIT-MH-84920'}</span>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-emerald-100">
                <span className="text-[10px] text-slate-400 block">Aadhaar (Vault Token)</span>
                <span className="font-bold text-slate-800">{profile?.aadhaarNumber || 'XXXX-XXXX-8921'}</span>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-emerald-100">
                <span className="text-[10px] text-slate-400 block">Verified Income (Revenue Dept)</span>
                <span className="font-bold text-slate-800">₹{profile?.annualIncome?.toLocaleString() || '1,80,000'}</span>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-emerald-100">
                <span className="text-[10px] text-slate-400 block">Caste Category</span>
                <span className="font-bold text-slate-800">{profile?.casteCategory || 'OBC'}</span>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-emerald-100">
                <span className="text-[10px] text-slate-400 block">Education SIS ID</span>
                <span className="font-bold text-slate-800">{profile?.educationQualification || 'B.Tech (SPPU)'}</span>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-emerald-100">
                <span className="text-[10px] text-slate-400 block">Domicile Certificate</span>
                <span className="font-bold text-emerald-800">✓ Verified (MH-DOM-2023)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Popular Government Services Quick Launcher */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Apply for Services</h2>
                <p className="text-xs text-slate-500">Auto-filled instantly from your verified profile</p>
              </div>
            </div>

            <div className="space-y-3">
              {services.slice(0, 4).map((serv) => (
                <div 
                  key={serv.id}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition-all flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-950 block">
                      {getText(serv.name)}
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      {getText(serv.departmentName)} • {serv.processingDays || 7} Days SLA
                    </span>
                  </div>

                  <button
                    onClick={() => onNavigate(`/citizen/apply/${serv.id}`)}
                    className="bg-emerald-800 hover:bg-emerald-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-2xs cursor-pointer shrink-0"
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('/citizen/services')}
              className="w-full mt-4 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>View All Available Government Schemes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
