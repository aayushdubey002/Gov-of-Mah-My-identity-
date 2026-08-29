import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, Shield, ArrowLeft, Send, Sparkles, 
  Building2, FileText, Lock, RefreshCw, AlertCircle, ExternalLink 
} from 'lucide-react';
import { apiService } from '../../services/api';
import { CitizenProfile, GovernmentService } from '../../types';
import { getText } from '../../utils/localized';

interface CitizenApplyPageProps {
  serviceId: string;
  onNavigate: (path: string) => void;
}

export const CitizenApplyPage: React.FC<CitizenApplyPageProps> = ({ serviceId, onNavigate }) => {
  const [service, setService] = useState<GovernmentService | null>(null);
  const [profile, setProfile] = useState<CitizenProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [consentAgreed, setConsentAgreed] = useState(true);

  // Dynamic Service Specific Inputs
  const [purposeOrRemarks, setPurposeOrRemarks] = useState('');
  const [institutionName, setInstitutionName] = useState('COEP Technological University, Pune');
  const [rollNumber, setRollNumber] = useState('PRN-2023-8849');
  const [courseYear, setCourseYear] = useState('Third Year (T.E.)');

  useEffect(() => {
    Promise.all([
      apiService.getServiceById(serviceId),
      apiService.getProfile()
    ]).then(([serv, prof]) => {
      setService(serv);
      setProfile(prof);
      setLoading(false);
    });
  }, [serviceId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentAgreed) {
      alert('Please agree to the DPDP Consent declaration.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await apiService.submitApplication(
        serviceId,
        {
          purposeOrRemarks: purposeOrRemarks || `Application for ${getText(service?.name)}`,
          institutionName,
          rollNumber,
          courseYear,
          submissionChannel: 'MAJHI_OLAKH_INTEROP_PORTAL'
        },
        {
          name: profile?.fullName,
          aadhaar: profile?.aadhaarNumber,
          income: profile?.annualIncome,
          caste: profile?.casteCategory,
          address: profile?.address
        }
      );

      if (res.success && res.applicationId) {
        onNavigate(`/citizen/applications/${res.applicationId}`);
      }
    } catch (err: any) {
      alert('Failed to submit application: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !service) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500">
        <RefreshCw className="w-8 h-8 animate-spin mx-auto text-emerald-600 mb-2" />
        <p className="font-bold text-sm">Preparing Auto-Prefilled Application Dossier...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back Button */}
      <button
        onClick={() => onNavigate('/citizen/services')}
        className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Services Catalog</span>
      </button>

      {/* Service Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
          <span>{getText(service.departmentName)}</span>
          <span>•</span>
          <span>SLA: {service.processingDays || 7} Days</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 font-serif">{getText(service.name)}</h1>
        <p className="text-xs text-slate-600 leading-relaxed">{getText(service.description || service.shortDesc)}</p>
      </div>

      {/* Auto-Prefill Interoperability Banner */}
      <div className="p-5 bg-linear-to-r from-emerald-50 to-teal-50 border border-emerald-300 rounded-3xl space-y-2 shadow-xs">
        <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm">
          <Sparkles className="w-4 h-4 text-emerald-700" />
          <span>Zero Paperwork: Verified Records Pre-filled Automatically</span>
        </div>
        <p className="text-xs text-emerald-800 leading-relaxed">
          The Interoperability Middleware has retrieved your verified demographic, income, and education credentials from the <strong>Citizen Central Registry</strong>. You do not need to re-upload documents.
        </p>
      </div>

      {/* The Application Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 text-xs">
        
        {/* Section 1: Pre-filled Readonly Verified Data */}
        <div className="space-y-3">
          <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-700" />
            <span>1. Verified Citizen Identity (From Unified Profile)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div>
              <span className="text-[10px] text-slate-400 block">Full Name</span>
              <span className="font-bold text-slate-800">{profile?.fullName}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Aadhaar (Vault)</span>
              <span className="font-bold text-slate-800">{profile?.aadhaarNumber}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Certified Annual Income</span>
              <span className="font-bold text-slate-800">₹{profile?.annualIncome?.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Category</span>
              <span className="font-bold text-slate-800">{profile?.casteCategory}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Permanent District</span>
              <span className="font-bold text-slate-800">{profile?.district}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">DigiLocker Status</span>
              <span className="font-bold text-emerald-800">✓ 4 Documents Synced</span>
            </div>
          </div>
        </div>

        {/* Section 2: Service Specific Questions */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-700" />
            <span>2. Service Specific Application Details</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Educational Institution / College Name</label>
              <input
                type="text"
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden font-medium"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">PRN / Student Enrollment Roll No</label>
              <input
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden font-medium"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Current Academic Year</label>
              <input
                type="text"
                value={courseYear}
                onChange={(e) => setCourseYear(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden font-medium"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Purpose / Remarks for Officer</label>
              <input
                type="text"
                placeholder="e.g. Higher Technical Studies Scholarship"
                value={purposeOrRemarks}
                onChange={(e) => setPurposeOrRemarks(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden font-medium"
              />
            </div>
          </div>
        </div>

        {/* Section 3: DPDP Consent Checkbox */}
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl space-y-2">
          <div className="flex items-start gap-2.5">
            <input
              type="checkbox"
              id="dpdp-consent"
              checked={consentAgreed}
              onChange={(e) => setConsentAgreed(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
            />
            <label htmlFor="dpdp-consent" className="text-xs text-purple-950 font-medium leading-relaxed cursor-pointer">
              <strong>Statutory Consent Declaration (DPDP Act 2023):</strong> I hereby give my electronic consent to <strong>{service.departmentName}</strong> and Majhi Olakh to access my verified identity, income, and educational credentials via the Interoperability Middleware exclusively for processing this application.
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            {submitting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Submitting & Orchestrating Department APIs...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Application (Instant Auto-Verification)</span>
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
};
