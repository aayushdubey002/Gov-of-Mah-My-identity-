import React, { useState, useEffect } from 'react';
import { 
  Building2, ArrowLeft, ArrowRight, ShieldCheck, 
  Clock, CreditCard, FileText, CheckCircle2, Zap, RefreshCw, AlertCircle 
} from 'lucide-react';
import { apiService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { getText } from '../../utils/localized';

interface CitizenServiceDetailPageProps {
  serviceId: string;
  onNavigate: (path: string) => void;
}

export const CitizenServiceDetailPage: React.FC<CitizenServiceDetailPageProps> = ({
  serviceId,
  onNavigate
}) => {
  const { user } = useAuth();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.getServices().then((services) => {
      const match = services.find((s) => s.id === serviceId) || {
        id: serviceId,
        name: 'Maharashtra State Post-Matric Scholarship',
        departmentName: 'Higher & Technical Education Department',
        category: 'Education & Welfare',
        processingDays: 7,
        fee: 'Free / विनामूल्य',
        description: 'Direct Benefit Transfer scholarship for higher education students with autonomous automated revenue and education record verification.',
        requiredApis: ['Revenue & Land Records API', 'Higher Education SIS API', 'Aadhaar Tokenization'],
        requiredDocs: ['Aadhaar', 'Income Certificate', 'College Enrollment Record']
      };
      setService(match);
      setLoading(false);
    });
  }, [serviceId]);

  if (loading || !service) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500">
        <RefreshCw className="w-8 h-8 animate-spin mx-auto text-emerald-600 mb-2" />
        <p className="font-bold text-sm">Loading service details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back button */}
      <button
        onClick={() => onNavigate('/citizen/services')}
        className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Services</span>
      </button>

      {/* Main Service Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full inline-block">
              {getText(service.category) || 'Government Scheme'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
              {getText(service.name)}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{getText(service.departmentName) || 'State Department'}</span>
            </p>
          </div>

          <button
            onClick={() => onNavigate(`/citizen/apply/${service.id}`)}
            className="bg-emerald-800 hover:bg-emerald-900 text-white px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <span>Apply Now (Pre-filled)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Badges Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Statutory SLA</span>
            <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>{service.processingDays || 7} Working Days</span>
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Government Fee</span>
            <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
              <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
              <span>{getText(service.fee) || 'Free'}</span>
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Mode of Service</span>
            <span className="font-bold text-emerald-800 flex items-center gap-1 mt-0.5">
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Digital & Paperless</span>
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Verification</span>
            <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Autonomous API Setu</span>
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h3 className="font-bold text-slate-900 text-sm">Service Overview & Scope</h3>
          <p>
            {getText(service.description || service.shortDesc || 'This service is provisioned directly through the Maharashtra Citizen Interoperability Middleware. Citizens can apply without physical document submissions.')}
          </p>
        </div>

        {/* Connected Microservices Check */}
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 space-y-3 text-xs">
          <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <span>Automated Cross-Department Microservices Invoked:</span>
          </div>
          <p className="text-emerald-900 leading-relaxed text-[11px]">
            When applying for this service, our middleware automatically connects with the following authoritative state registries to fetch tamper-proof credentials:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px]">
            <div className="bg-white p-2.5 rounded-xl border border-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Revenue Dept • Annual Income Verification</span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Higher Education • Student SIS Database</span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>UIDAI • Aadhaar KYC Vault (Masked)</span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>DigiLocker • Document Hash Matcher</span>
            </div>
          </div>
        </div>

        {/* Call to action footer */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            Citizen Profile: <strong className="text-slate-800">{user?.name || 'Rahul Sharma'}</strong> (100% Eligible)
          </p>

          <button
            onClick={() => onNavigate(`/citizen/apply/${service.id}`)}
            className="w-full sm:w-auto bg-[#0F5132] hover:bg-[#0b3d26] text-white px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Proceed to Autonomous Application</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
