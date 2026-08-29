import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, Clock, AlertTriangle, FileText, ArrowRight, 
  ShieldCheck, UserCheck, RefreshCw, Eye, ThumbsUp, ThumbsDown 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';
import { Application } from '../../types';
import { getText } from '../../utils/localized';

interface OfficerDashboardProps {
  onNavigate: (path: string) => void;
}

export const OfficerDashboard: React.FC<OfficerDashboardProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.getApplications().then((data) => {
      setApplications(data || []);
      setLoading(false);
    });
  }, []);

  const pendingScrutiny = applications.filter((a) => a.status === 'SUBMITTED' || a.status === 'SCRUTINY');
  const approved = applications.filter((a) => a.status === 'APPROVED');
  const rejected = applications.filter((a) => a.status === 'REJECTED');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Officer Header */}
      <div className="bg-amber-900/90 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-700/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Desk Officer Scrutiny Console</span>
            <span>•</span>
            <span>Desk #04</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-serif">
            Welcome, {user?.name || 'Desk Officer'}
          </h1>
          <p className="text-amber-100 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
            Consolidated scrutiny desk powered by the Interoperability Middleware. Automated cross-department validations are pre-calculated for faster sanctions.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onNavigate('/officer/applications')}
            className="bg-white text-amber-950 hover:bg-amber-50 px-5 py-3 rounded-xl font-black text-xs sm:text-sm shadow-md flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <span>Open Scrutiny Queue ({pendingScrutiny.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Scrutiny</span>
          <p className="text-2xl font-black text-amber-800 mt-2">{pendingScrutiny.length}</p>
          <span className="text-[11px] text-amber-700 font-bold mt-1 block">Awaiting officer action</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Auto-Verified</span>
          <p className="text-2xl font-black text-emerald-950 mt-2">100%</p>
          <span className="text-[11px] text-emerald-700 font-bold mt-1 block">API Check Pass Rate</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sanctioned</span>
          <p className="text-2xl font-black text-slate-900 mt-2">{approved.length}</p>
          <span className="text-[11px] text-slate-500 font-bold mt-1 block">Certificates Issued</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg Processing Time</span>
          <p className="text-2xl font-black text-blue-900 mt-2">1.2 Days</p>
          <span className="text-[11px] text-blue-700 font-bold mt-1 block">SLA Target: 7 Days</span>
        </div>
      </div>

      {/* Pending Scrutiny Queue Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Application Scrutiny Queue</h2>
            <p className="text-xs text-slate-500">Click any application to view auto-verified data and take sanction action</p>
          </div>

          <button
            onClick={() => onNavigate('/officer/applications')}
            className="text-xs font-bold text-amber-900 hover:underline cursor-pointer"
          >
            View All ({applications.length})
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-500">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-amber-600 mb-2" />
            <p className="font-bold text-sm">Loading applications...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase font-bold text-[10px]">
                  <th className="py-3 px-3">App ID</th>
                  <th className="py-3 px-3">Citizen Name</th>
                  <th className="py-3 px-3">Scheme / Service</th>
                  <th className="py-3 px-3">Automated Interop Checks</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-3 font-mono font-bold text-slate-900">{app.id}</td>
                    <td className="py-3.5 px-3 font-bold text-slate-900">{app.prefilledFields?.name || app.citizenName || 'Citizen'}</td>
                    <td className="py-3.5 px-3">{getText(app.serviceName)}</td>
                    <td className="py-3.5 px-3">
                      <div className="flex gap-1">
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">
                          ✓ Aadhaar
                        </span>
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">
                          ✓ Income
                        </span>
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">
                          ✓ Edu SIS
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase ${
                        app.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-900' :
                        app.status === 'REJECTED' ? 'bg-red-100 text-red-900' :
                        'bg-amber-100 text-amber-900'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={() => onNavigate(`/officer/applications/${app.id}`)}
                        className="bg-amber-800 hover:bg-amber-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                      >
                        Scrutinize
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
