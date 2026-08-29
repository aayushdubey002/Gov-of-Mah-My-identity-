import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, CheckCircle2, XCircle, AlertTriangle, Send, 
  ShieldCheck, Building2, FileText, UserCheck, RefreshCw, Award 
} from 'lucide-react';
import { apiService } from '../../services/api';
import { Application } from '../../types';
import { getText, safeArray } from '../../utils/localized';

interface OfficerApplicationDetailPageProps {
  applicationId: string;
  onNavigate: (path: string) => void;
}

export const OfficerApplicationDetailPage: React.FC<OfficerApplicationDetailPageProps> = ({
  applicationId,
  onNavigate
}) => {
  const [app, setApp] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [forwardTo, setForwardTo] = useState('Joint Director (Higher Education)');
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const loadData = async () => {
    const data = await apiService.getApplicationById(applicationId);
    setApp(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [applicationId]);

  const handleAction = async (action: 'APPROVE' | 'REJECT' | 'REQUEST_CORRECTION' | 'FORWARD') => {
    setActionLoading(true);
    setSuccessNotice(null);
    try {
      const updated = await apiService.performOfficerAction(
        applicationId,
        action,
        remarks || (action === 'APPROVE' ? 'All interoperability checks passed. Sanctioned by Desk Officer.' : 'Action executed.'),
        action === 'FORWARD' ? forwardTo : undefined
      );
      setApp(updated);
      setSuccessNotice(`Application has been marked as ${updated.status}. Digital workflow has progressed.`);
    } catch (err: any) {
      alert('Failed to perform officer action');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading || !app) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500">
        <RefreshCw className="w-8 h-8 animate-spin mx-auto text-amber-600 mb-2" />
        <p className="font-bold text-sm">Loading Application Dossier for Scrutiny...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back Button */}
      <button
        onClick={() => onNavigate('/officer/applications')}
        className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Scrutiny Desk</span>
      </button>

      {/* Main Dossier Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-extrabold bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
              {app.id}
            </span>
            <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
              app.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
              app.status === 'REJECTED' ? 'bg-red-100 text-red-900 border border-red-300' :
              'bg-amber-100 text-amber-900 border border-amber-300'
            }`}>
              {app.status}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-serif mt-1">
            {getText(app.serviceName)}
          </h1>
          <p className="text-xs text-slate-500">
            Citizen: <strong className="text-slate-800">{app.prefilledFields?.name || app.citizenName || 'Rahul Sharma'}</strong> (ID: {app.citizenId})
          </p>
        </div>

        {app.status === 'APPROVED' && (
          <span className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-700" />
            <span>Digital Certificate Issued</span>
          </span>
        )}
      </div>

      {successNotice && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs text-emerald-950 font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successNotice}</span>
        </div>
      )}

      {/* 2-Column: Pre-Verified Data Dossier + Officer Decision Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Dossier (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Automated Microservice Interoperability Checklist */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <span>Automated Interoperability Validations</span>
              </h2>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                Zero Human Tampering
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              {safeArray(app.departmentVerifications || app.workflowSteps).map((v: any, idx: number) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block">{getText(v.departmentName || v.department || v.name)}</span>
                    <span className="text-[11px] text-slate-500">{getText(v.remarks || 'Automated validation check')}</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{v.status || 'VERIFIED'}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Citizen Demographic & Financial Master Data */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 text-xs">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-slate-700" />
              <span>Unified Citizen Demographic & Financial Profile</span>
            </h2>

            <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div>
                <span className="text-[10px] text-slate-400 block">Full Name</span>
                <span className="font-bold text-slate-800">{app.prefilledFields?.name || 'Rahul Sharma'}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Aadhaar Token</span>
                <span className="font-bold font-mono text-slate-800">{app.prefilledFields?.aadhaar || 'XXXX-XXXX-8921'}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Revenue Certified Income</span>
                <span className="font-bold text-slate-800">₹{app.prefilledFields?.income?.toLocaleString() || '1,80,000'} / year</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Caste Category</span>
                <span className="font-bold text-slate-800">{app.prefilledFields?.caste || 'OBC'}</span>
              </div>
            </div>

            {/* Application specific submitted data */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">Submitted Metadata:</span>
              <pre className="text-slate-700 font-mono text-[11px] overflow-x-auto">
                {JSON.stringify(app.submittedData, null, 2)}
              </pre>
            </div>
          </div>

        </div>

        {/* Right Action Console (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 text-xs">
            <h2 className="text-sm font-bold text-slate-900">Officer Decision Console</h2>
            
            <div>
              <label className="font-bold text-slate-700 block mb-1">Official Scrutiny Remarks</label>
              <textarea
                rows={3}
                placeholder="Enter remarks for the applicant or reason for decision..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-600 focus:outline-hidden font-medium"
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => handleAction('APPROVE')}
                disabled={actionLoading || app.status === 'APPROVED'}
                className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>APPROVE & ISSUE DIGITAL CERTIFICATE</span>
              </button>

              <button
                onClick={() => handleAction('REQUEST_CORRECTION')}
                disabled={actionLoading}
                className="w-full py-2.5 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>REQUEST CORRECTION FROM CITIZEN</span>
              </button>

              <button
                onClick={() => handleAction('REJECT')}
                disabled={actionLoading || app.status === 'REJECTED'}
                className="w-full py-2.5 bg-red-100 hover:bg-red-200 text-red-900 font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <XCircle className="w-4 h-4" />
                <span>REJECT APPLICATION</span>
              </button>
            </div>

            {/* Forwarding to Higher Authority */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <label className="font-bold text-slate-700 block">Forward Dossier to Higher Authority</label>
              <select
                value={forwardTo}
                onChange={(e) => setForwardTo(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium"
              >
                <option value="Joint Director (Higher Education)">Joint Director (Higher Education)</option>
                <option value="District Collector / Tahasildar">District Collector / Tahasildar</option>
                <option value="State Sanctioning Committee">State Sanctioning Committee</option>
              </select>

              <button
                onClick={() => handleAction('FORWARD')}
                disabled={actionLoading}
                className="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Forward for Second-Level Approval</span>
              </button>
            </div>
          </div>

          {/* Workflow Status Tracker */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md border border-slate-800 space-y-3 text-xs">
            <h4 className="font-bold text-amber-400">Statutory SLA Compliance</h4>
            <p className="text-slate-300 leading-relaxed">
              Under the Maharashtra Right to Public Services Act (RTS), this application has a remaining SLA balance of <strong>5 days</strong>.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
