import React, { useState, useEffect } from 'react';
import { 
  FileText, Search, Filter, Clock, CheckCircle2, 
  AlertCircle, ArrowRight, Eye, RefreshCw, PlusCircle 
} from 'lucide-react';
import { apiService } from '../../services/api';
import { Application } from '../../types';
import { getText, safeArray } from '../../utils/localized';

interface CitizenApplicationsPageProps {
  onNavigate: (path: string) => void;
}

export const CitizenApplicationsPage: React.FC<CitizenApplicationsPageProps> = ({ onNavigate }) => {
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

  const filteredApps = applications.filter((app) => {
    const sId = String(app.id || '').toLowerCase();
    const sName = getText(app.serviceName).toLowerCase();
    const sDept = getText(app.departmentName).toLowerCase();
    const term = searchTerm.toLowerCase();
    const matchesSearch = sId.includes(term) || sName.includes(term) || sDept.includes(term);
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase">Approved</span>;
      case 'REJECTED':
        return <span className="bg-red-100 text-red-900 border border-red-300 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase">Rejected</span>;
      case 'CORRECTION_REQUIRED':
        return <span className="bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase">Correction Req.</span>;
      default:
        return <span className="bg-blue-100 text-blue-900 border border-blue-300 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase">In Verification</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
            <span>Unified Application Tracking</span>
            <span>•</span>
            <span>Single Consolidated Ledger</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
            My Government Applications
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
            All applications submitted across any department are consolidated here. Track automated verification stages in real time.
          </p>
        </div>

        <button
          onClick={() => onNavigate('/citizen/services')}
          className="bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer whitespace-nowrap"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Apply for New Scheme</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search by Application ID, Scheme, or Department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-hidden shadow-2xs"
          />
        </div>

        <div className="sm:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-hidden font-medium shadow-2xs cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="APPROVED">Approved</option>
            <option value="SUBMITTED">Under Verification</option>
            <option value="SCRUTINY">Under Scrutiny</option>
            <option value="CORRECTION_REQUIRED">Correction Required</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applications List */}
      {loading ? (
        <div className="text-center py-16 text-slate-500">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-emerald-600 mb-2" />
          <p className="font-bold text-sm">Loading applications from state ledger...</p>
        </div>
      ) : filteredApps.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-3">
          <FileText className="w-12 h-12 text-slate-300 mx-auto" />
          <h2 className="text-base font-bold text-slate-800">No applications found</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You don't have any applications matching the selected criteria.
          </p>
          <button
            onClick={() => onNavigate('/citizen/services')}
            className="mt-2 bg-emerald-800 text-white px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>Explore Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApps.map((app) => (
            <div
              key={app.id}
              onClick={() => onNavigate(`/citizen/applications/${app.id}`)}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xs hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-extrabold bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
                    {app.id}
                  </span>
                  {getStatusBadge(app.status)}
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-900 transition-colors">
                    {getText(app.serviceName)}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {getText(app.departmentName)} • Submitted on {new Date(app.createdAt || app.appliedDate || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>

                {/* Microservice Verification Pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {safeArray(app.departmentVerifications || app.workflowSteps).map((v: any, i: number) => (
                    <span 
                      key={i} 
                      className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                        v.status === 'VERIFIED' || v.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{getText(v.departmentName || v.department || v.name)}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0">
                <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                  <span>Track 7-Step Timeline</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
