import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, CheckCircle2, Clock, AlertCircle, Shield, 
  Building2, FileText, Download, Award, QrCode, RefreshCw, UserCheck
} from 'lucide-react';
import { apiService } from '../../services/api';
import { Application } from '../../types';
import { getText, safeArray } from '../../utils/localized';

interface CitizenApplicationDetailPageProps {
  applicationId: string;
  onNavigate: (path: string) => void;
}

export const CitizenApplicationDetailPage: React.FC<CitizenApplicationDetailPageProps> = ({
  applicationId,
  onNavigate
}) => {
  const [app, setApp] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  useEffect(() => {
    apiService.getApplicationById(applicationId).then((data) => {
      setApp(data);
      setLoading(false);
    });
  }, [applicationId]);

  if (loading || !app) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500">
        <RefreshCw className="w-8 h-8 animate-spin mx-auto text-emerald-600 mb-2" />
        <p className="font-bold text-sm">Loading Application Dossier...</p>
      </div>
    );
  }

  const isApproved = app.status === 'APPROVED';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Back Navigation */}
      <button
        onClick={() => onNavigate('/citizen/applications')}
        className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Applications</span>
      </button>

      {/* Main Header Info Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-extrabold bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
              {app.id}
            </span>
            <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
              app.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
              app.status === 'REJECTED' ? 'bg-red-100 text-red-900 border border-red-300' :
              'bg-blue-100 text-blue-900 border border-blue-300'
            }`}>
              {app.status.replace('_', ' ')}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
            {getText(app.serviceName)}
          </h1>

          <p className="text-xs text-slate-500">
            {getText(app.departmentName)} • Submitted on {new Date(app.createdAt || app.appliedDate || Date.now()).toLocaleString()}
          </p>
        </div>

        {isApproved && (
          <button
            onClick={() => setShowCertificateModal(true)}
            className="bg-emerald-800 hover:bg-emerald-900 text-white px-5 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <Award className="w-4 h-4 text-emerald-300" />
            <span>Download Digital Certificate</span>
          </button>
        )}
      </div>

      {/* 7-Step Unified Tracking Timeline */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
            <span>Orchestration Ledger</span>
            <span>•</span>
            <span>Real-Time State Machine</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900">7-Step Unified Interoperability Timeline</h2>
          <p className="text-xs text-slate-500">
            Each stage reflects cryptographic verifications completed asynchronously across department APIs.
          </p>
        </div>

        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
          {safeArray(app.timeline || app.workflowSteps).map((step: any, idx: number) => {
            const isCompleted = step.status === 'COMPLETED' || step.status === 'VERIFIED';
            const isInProgress = step.status === 'IN_PROGRESS' || step.status === 'UNDER_VERIFICATION';
            const stepNum = step.step || idx + 1;
            
            return (
              <div key={step.stepId || step.step || idx} className="relative group">
                {/* Status Dot / Icon */}
                <div className={`absolute -left-6 sm:-left-8 top-0.5 w-6 sm:w-8 h-6 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-transform group-hover:scale-110 ${
                  isCompleted ? 'bg-emerald-600 text-white shadow-xs' :
                  isInProgress ? 'bg-amber-500 text-white animate-pulse' :
                  'bg-slate-100 text-slate-400 border border-slate-300'
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> :
                   isInProgress ? <Clock className="w-4 h-4" /> :
                   stepNum}
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <span className="font-bold text-xs sm:text-sm text-slate-900">
                      Step {stepNum}: {getText(step.title || step.name || `Verification Step ${stepNum}`)}
                    </span>

                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider self-start sm:self-auto ${
                      isCompleted ? 'bg-emerald-100 text-emerald-900' :
                      isInProgress ? 'bg-amber-100 text-amber-900' :
                      'bg-slate-200 text-slate-600'
                    }`}>
                      {step.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {getText(step.remarks) || 'Verification in progress.'}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1">
                    <span>Officer / Service: {getText(step.actor || step.officerName || step.apiSource || 'Interoperability Daemon')}</span>
                    {step.timestamp && <span>{new Date(step.timestamp).toLocaleTimeString()}</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Verified Data Dossier Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Pre-filled Credentials */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3 text-xs">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-700" />
            <span>Pre-Filled Identity Dossier</span>
          </h3>

          <div className="space-y-2 text-slate-700">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-400">Citizen Name</span>
              <span className="font-bold">{app.prefilledFields?.name || 'Rahul Sharma'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-400">Aadhaar Token</span>
              <span className="font-mono font-bold">{app.prefilledFields?.aadhaar || 'XXXX-XXXX-8921'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-400">Certified Income</span>
              <span className="font-bold">₹{app.prefilledFields?.income?.toLocaleString() || '1,80,000'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-400">Category</span>
              <span className="font-bold">{app.prefilledFields?.caste || 'OBC'}</span>
            </div>
          </div>
        </div>

        {/* Cross-Department Verification Checks */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3 text-xs">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-700" />
            <span>Microservice API Verifications</span>
          </h3>

          <div className="space-y-2">
            {safeArray(app.departmentVerifications || app.workflowSteps).map((v: any, i: number) => (
              <div key={i} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">{getText(v.departmentName || v.department || v.name)}</p>
                  <p className="text-[10px] text-slate-500">{getText(v.remarks || 'Automated verification check')}</p>
                </div>
                <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>{v.status || 'VERIFIED'}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Digital Certificate Preview Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border-4 border-[#0F5132]/30 shadow-2xl relative space-y-6">
            
            {/* Certificate Header */}
            <div className="text-center space-y-2 border-b-2 border-emerald-800/20 pb-4">
              <div className="w-12 h-12 rounded-full bg-[#0F5132] text-white mx-auto flex items-center justify-center shadow-md">
                <Award className="w-7 h-7 text-emerald-300" />
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-wide font-serif">
                Government of Maharashtra
              </h2>
              <p className="text-xs font-bold text-emerald-900 uppercase">
                {getText(app.departmentName)} • Unified Public Service Portal
              </p>
              <p className="text-[10px] text-slate-500 font-mono">
                Official Digital Certificate • Ref: {app.certificateId || `MH-CERT-${app.id}`}
              </p>
            </div>

            {/* Certificate Body */}
            <div className="space-y-4 text-xs text-slate-700 leading-relaxed bg-amber-50/40 p-5 rounded-2xl border border-amber-200/60 font-serif">
              <p className="text-center font-bold text-sm text-slate-900">
                CERTIFICATE OF SANCTION / APPROVAL
              </p>

              <p>
                This is to certify that <strong>{app.prefilledFields?.name || 'Rahul Sharma'}</strong>, holding Citizen ID <strong>CIT-MH-84920</strong> has been officially granted approval for <strong>{getText(app.serviceName)}</strong>.
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2 font-sans">
                <div>
                  <span className="text-slate-400 text-[10px] block">Application Reference:</span>
                  <span className="font-mono font-bold text-slate-900">{app.id}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Sanction Date:</span>
                  <span className="font-bold text-slate-900">{new Date().toLocaleDateString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Sanctioning Officer:</span>
                  <span className="font-bold text-slate-900">Rajesh Deshmukh (Desk Officer)</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Digital Seal Status:</span>
                  <span className="font-bold text-emerald-800">✓ Cryptographically Signed</span>
                </div>
              </div>
            </div>

            {/* Certificate Footer with QR Code & Digital Signature Hash */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-slate-900 text-white rounded-xl flex items-center justify-center p-1.5 shadow-xs">
                  <QrCode className="w-full h-full text-emerald-300" />
                </div>
                <div className="text-[10px] text-slate-500 font-mono space-y-0.5">
                  <p className="font-bold text-slate-800">Scan to Verify Authenticity</p>
                  <p>SHA-256: 9e2b...4a89</p>
                  <p className="text-emerald-800 font-bold">DigiLocker Integration Ready</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    alert('Certificate downloaded to your device as PDF with digital signature.');
                    setShowCertificateModal(false);
                  }}
                  className="bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
                <button
                  onClick={() => setShowCertificateModal(false)}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-2 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
