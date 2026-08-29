import React, { useState, useEffect } from 'react';
import { 
  Lock, Shield, CheckCircle2, XCircle, AlertCircle, 
  RefreshCw, Key, ArrowRight, Layers, Clock, FileText 
} from 'lucide-react';
import { apiService } from '../../services/api';
import { ConsentRecord } from '../../types';

interface CitizenConsentPageProps {
  onNavigate: (path: string) => void;
}

export const CitizenConsentPage: React.FC<CitizenConsentPageProps> = ({ onNavigate }) => {
  const [consents, setConsents] = useState<ConsentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const loadConsents = async () => {
    const data = await apiService.getConsents();
    setConsents(data);
    setLoading(false);
  };

  useEffect(() => {
    loadConsents();
  }, []);

  const handleRevoke = async (id: string) => {
    setProcessingId(id);
    try {
      await apiService.revokeConsent(id);
      await loadConsents();
      setActionMessage('Consent revoked. The requesting department can no longer query your data.');
    } catch (err: any) {
      alert('Failed to revoke consent');
    } finally {
      setProcessingId(null);
    }
  };

  const handleGrant = async (dept: string, purpose: string, fields: string[]) => {
    setLoading(true);
    try {
      await apiService.grantConsent(dept, purpose, fields);
      await loadConsents();
      setActionMessage('Consent granted successfully under DPDP Act 2023 guidelines.');
    } catch (err: any) {
      alert('Failed to grant consent');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
            <span>Digital Personal Data Protection (DPDP) Act 2023</span>
            <span>•</span>
            <span>Citizen Data Sovereignty</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
            Consent Management Portal
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Zero data is shared between government departments without your explicit authorization. You have full granular control to grant or revoke access anytime.
          </p>
        </div>

        <div className="bg-purple-50 border border-purple-200 p-3.5 rounded-2xl flex items-center gap-3 shrink-0">
          <Lock className="w-6 h-6 text-purple-700 shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-purple-950 block">Encrypted Token Architecture</span>
            <span className="text-purple-800 text-[11px]">Time-bound OAuth-style Consent</span>
          </div>
        </div>
      </div>

      {actionMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs text-emerald-950 font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Active Consents Cards Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Department Access Authorizations</h2>

        {loading ? (
          <div className="text-center py-12 text-slate-500">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-emerald-600 mb-2" />
            <p className="font-bold text-sm">Loading DPDP consent ledger...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {consents.map((consent) => {
              const isAllowed = consent.status === 'ALLOWED';
              return (
                <div 
                  key={consent.id}
                  className={`bg-white rounded-3xl p-6 border shadow-2xs flex flex-col justify-between space-y-4 transition-all ${
                    isAllowed ? 'border-slate-200' : 'border-red-200 bg-red-50/20'
                  }`}
                >
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">
                        {consent.requestingDepartment}
                      </span>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider ${
                        isAllowed ? 'bg-emerald-100 text-emerald-900' : 'bg-red-100 text-red-900'
                      }`}>
                        {consent.status}
                      </span>
                    </div>

                    <p className="text-slate-600 leading-relaxed">
                      <strong>Purpose:</strong> {consent.purpose}
                    </p>

                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Authorized Data Attributes:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {consent.requestedFields.map((field, i) => (
                          <span key={i} className="text-[10px] font-mono bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-bold">
                            {field}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 text-[10px] text-slate-400 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Valid until: {new Date(consent.validUntil).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    {isAllowed ? (
                      <button
                        onClick={() => handleRevoke(consent.id)}
                        disabled={processingId === consent.id}
                        className="w-full py-2 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Revoke Access (Deny)</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleGrant(consent.requestingDepartment, consent.purpose, consent.requestedFields)}
                        className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Re-authorize (Allow)</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
