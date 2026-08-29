import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, CheckCircle2, Clock, AlertCircle, 
  ArrowRight, RefreshCw, Eye 
} from 'lucide-react';
import { apiService } from '../../services/api';
import { Application } from '../../types';
import { getText } from '../../utils/localized';

interface OfficerApplicationsPageProps {
  onNavigate: (path: string) => void;
}

export const OfficerApplicationsPage: React.FC<OfficerApplicationsPageProps> = ({ onNavigate }) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    apiService.getApplications().then((data) => {
      setApplications(data || []);
      setLoading(false);
    });
  }, []);

  const filtered = applications.filter((app) => {
    const sId = String(app.id || '').toLowerCase();
    const sName = getText(app.serviceName).toLowerCase();
    const cName = String(app.prefilledFields?.name || app.citizenName || '').toLowerCase();
    const term = searchTerm.toLowerCase();
    const matchesSearch = sId.includes(term) || sName.includes(term) || cName.includes(term);
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1">
          <span>Official Department Scrutiny Desk</span>
          <span>•</span>
          <span>Role Based Access Control</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
          Application Scrutiny & Sanction Ledger
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
          Inspect automatically verified citizen dossiers, verify cross-department proofs, and issue digitally signed approval certificates.
        </p>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search by App ID, Citizen Name, or Scheme..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-amber-600 focus:outline-hidden shadow-2xs"
          />
        </div>

        <div className="sm:w-56">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-amber-600 font-medium shadow-2xs cursor-pointer"
          >
            <option value="ALL">All Application Statuses</option>
            <option value="SUBMITTED">Submitted (Pending)</option>
            <option value="SCRUTINY">In Scrutiny</option>
            <option value="APPROVED">Approved / Sanctioned</option>
            <option value="CORRECTION_REQUIRED">Correction Required</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
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
                  <th className="py-3 px-3">Service / Scheme</th>
                  <th className="py-3 px-3">Certified Income</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Submission Date</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {filtered.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-3 font-mono font-bold text-slate-900">{app.id}</td>
                    <td className="py-3.5 px-3 font-bold text-slate-900">{app.prefilledFields?.name || app.citizenName || 'Rahul Sharma'}</td>
                    <td className="py-3.5 px-3">{getText(app.serviceName)}</td>
                    <td className="py-3.5 px-3">₹{app.prefilledFields?.income?.toLocaleString() || '1,80,000'}</td>
                    <td className="py-3.5 px-3">
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                        app.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-900' :
                        app.status === 'REJECTED' ? 'bg-red-100 text-red-900' :
                        'bg-amber-100 text-amber-900'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-500 font-mono">
                      {new Date(app.createdAt || app.appliedDate || Date.now()).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={() => onNavigate(`/officer/applications/${app.id}`)}
                        className="bg-amber-800 hover:bg-amber-900 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-2xs cursor-pointer"
                      >
                        Scrutiny Dossier
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
