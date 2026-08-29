import React from 'react';
import { Department, Language, ServiceItem } from '../types';
import { translations, sampleServices } from '../data/portalData';
import { CategoryVisualIcon } from './CategoryVisualIcon';
import { getText, safeArray } from '../utils/localized';
import { 
  X, 
  Clock, 
  FileText, 
  CheckCircle2, 
  ExternalLink, 
  Download, 
  ShieldCheck, 
  ArrowRight,
  AlertCircle,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';

interface DepartmentDetailModalProps {
  department: Department | null;
  lang: Language;
  onClose: () => void;
  onSelectService: (service: ServiceItem) => void;
  onOpenIntegrations?: () => void;
}

export const DepartmentDetailModal: React.FC<DepartmentDetailModalProps> = ({
  department,
  lang,
  onClose,
  onSelectService,
  onOpenIntegrations
}) => {
  if (!department) return null;
  const t = translations[lang];

  // Get matching services for this department
  const relatedServices = sampleServices.filter(s => s.departmentId === department.id || s.departmentId === department.number);

  // If no mock service exists in sampleServices, provide populated structured list
  const defaultServices: ServiceItem[] = department.popularServices.map((serviceName, idx) => ({
    id: `srv-${department.id}-${idx}`,
    name: {
      en: serviceName,
      mr: `${serviceName} (मराठी सेवा)`,
      hi: `${serviceName} (हिंदी सेवा)`
    },
    shortDesc: {
      en: `Apply for ${serviceName} under ${department.title.en} through Maharashtra Citizen Single Sign-on.`,
      mr: `${department.title.mr} अंतर्गत ${serviceName} साठी ऑनलाइन अर्ज करा.`,
      hi: `${department.title.hi} के तहत ${serviceName} हेतु आवेदन करें।`
    },
    departmentId: department.id,
    category: department.title.en,
    processingDays: 7 + (idx * 3),
    fee: idx % 2 === 0 ? 'Free / विनामूल्य' : `₹ ${33.60 + idx * 20}`,
    isOnline: true,
    apiStatus: idx === 0 && (department.id === 2 || department.id === 6) ? 'demo_available' : 'auth_required',
    requiredDocs: {
      en: ["Aadhaar Card", "Address Proof", "Relevant Certificates / Forms"],
      mr: ["आधार कार्ड", "रहिवासी दाखला", "संबंधित कागदपत्रे"],
      hi: ["आधार कार्ड", "निवास प्रमाण", "आवश्यक दस्तावेज"]
    },
    eligibility: {
      en: "Citizen residing in Maharashtra meeting department norms.",
      mr: "महाराष्ट्र शासनाच्या नियमांनुसार पात्र नागरिक.",
      hi: "महाराष्ट्र के नियमानुसार पात्र नागरिक।"
    }
  }));

  const displayServices = relatedServices.length > 0 ? relatedServices : defaultServices;
  const isEducationDept = department.id === 2 || department.number === 2 || department.id === 3;
  const isTransportDept = department.id === 6 || department.number === 6;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-2xl shrink-0 shadow-md">
              <CategoryVisualIcon type={department.title.en.toLowerCase()} size={56} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-amber-400 text-emerald-950 font-black text-xs px-2.5 py-0.5 rounded-full">
                  Dept #{department.number}
                </span>
                <span className="text-xs text-emerald-200 font-semibold">
                  {department.servicesCount}+ {t.services}
                </span>
                {isEducationDept && (
                  <span className="bg-emerald-400 text-emerald-950 font-black text-[11px] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Activity className="w-3 h-3" />
                    <span>🟢 API Setu Sandbox Demo Available</span>
                  </span>
                )}
                {isTransportDept && (
                  <span className="bg-emerald-400 text-emerald-950 font-black text-[11px] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Activity className="w-3 h-3" />
                    <span>🟢 Parivahan API Sandbox Available</span>
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                {getText(department.title, lang)}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 mt-0.5">
                {getText(department.subtitle, lang)}
              </p>
            </div>
          </div>
        </div>

        {/* Interoperability Architecture Bar */}
        <div className="bg-emerald-50 px-6 py-2.5 border-b border-emerald-200/70 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-emerald-950">
            <Layers className="w-4 h-4 text-emerald-700" />
            <span>Interoperability Architecture:</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-900 overflow-x-auto py-0.5">
            <span className="px-2 py-0.5 bg-white rounded border border-emerald-200">Citizen</span>
            <span className="text-emerald-500">→</span>
            <span className="px-2 py-0.5 bg-emerald-100 rounded border border-emerald-300 font-bold">Majhi Olakh Layer</span>
            <span className="text-emerald-500">→</span>
            <span className="px-2 py-0.5 bg-blue-100 text-blue-900 rounded border border-blue-300 font-bold">API Setu Gateway</span>
            <span className="text-emerald-500">→</span>
            <span className="px-2 py-0.5 bg-purple-100 text-purple-900 rounded border border-purple-300 font-bold">State Records</span>
          </div>
        </div>

        {/* Modal Content - List of citizen services */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 bg-slate-50">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              {lang === 'mr' ? 'उपलब्ध नागरिक सेवांची यादी' : 'Available Online Citizen Services'}
            </h3>
            <span className="text-xs text-emerald-800 font-bold bg-emerald-100 px-2.5 py-1 rounded-full">
              {displayServices.length} {t.services}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayServices.map((service, idx) => {
              const isDemo = service.apiStatus === 'demo_available' || service.apiDemoType !== undefined;
              return (
                <div
                  key={service.id || idx}
                  className={`bg-white rounded-2xl p-5 border shadow-2xs hover:shadow-md transition-all flex flex-col justify-between ${
                    isDemo ? 'border-emerald-400 ring-2 ring-emerald-500/20' : 'border-slate-200 hover:border-emerald-500'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <h4 className="font-extrabold text-sm text-slate-900 leading-snug">
                        {getText(service.name, lang)}
                      </h4>
                      {isDemo ? (
                        <span className="text-[10px] font-black text-emerald-950 bg-emerald-200 border border-emerald-400 px-2 py-0.5 rounded-full shrink-0">
                          🟢 API DEMO AVAILABLE
                        </span>
                      ) : service.apiStatus === 'auth_required' ? (
                        <span className="text-[10px] font-bold text-amber-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full shrink-0">
                          🟡 OFFICIAL API – AUTH REQUIRED
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-blue-900 bg-blue-100 border border-blue-300 px-2 py-0.5 rounded-full shrink-0">
                          🔵 OFFICIAL WEBSITE
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                      {getText(service.shortDesc, lang)}
                    </p>

                    <div className="flex items-center gap-4 mt-3 text-[11px] font-semibold text-slate-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>{service.processingDays || 7} {t.days}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{getText(service.fee, lang)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectService(service);
                      }}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 cursor-pointer transition-all shadow-2xs ${
                        isDemo
                          ? 'bg-[#0F5132] hover:bg-[#166534] text-white'
                          : 'bg-[#0F5132] hover:bg-[#0b3d26] text-white'
                      }`}
                    >
                      {isDemo ? (
                        <>
                          <Activity className="w-3.5 h-3.5 text-emerald-300" />
                          <span>Launch API Demo</span>
                        </>
                      ) : (
                        <>
                          <span>{t.applyNow}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>

                    {service.officialPortalUrl && (
                      <a
                        href={service.officialPortalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors shrink-0"
                        title="Visit Official Website"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 flex items-start gap-3 mt-4">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-900 leading-relaxed">
              {lang === 'mr'
                ? 'महाराष्ट्र लोकसेवा हक्क अधिनियम २०१५ नुसार सर्व सेवा विहित वेळेत देण्यास शासन बांधील आहे. विहित वेळेत सेवा न मिळाल्यास प्रथम अपील अधिकारी यांच्याकडे दाद मागता येते.'
                : 'All listed services are backed by the Maharashtra Right to Public Services Act, 2015 with legally guaranteed disposal time frames and multi-tier appellate redressal.'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between flex-wrap gap-2">
          {onOpenIntegrations && (
            <button
              onClick={() => {
                onClose();
                onOpenIntegrations();
              }}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>View API Setu Directory Status</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold cursor-pointer transition-colors ml-auto"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
