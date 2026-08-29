import React, { useState, useEffect } from 'react';
import { Language, TrackingRecord } from '../types';
import { translations, sampleTrackRecords } from '../data/portalData';
import { getText, safeArray } from '../utils/localized';
import { 
  X, 
  Search, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Download, 
  ShieldCheck, 
  User, 
  Building,
  AlertCircle,
  Activity,
  Layers,
  ArrowRight
} from 'lucide-react';

interface TrackApplicationModalProps {
  initialId?: string;
  lang: Language;
  onClose: () => void;
}

export const TrackApplicationModal: React.FC<TrackApplicationModalProps> = ({
  initialId = '',
  lang,
  onClose
}) => {
  const [searchId, setSearchId] = useState(initialId || 'DEMO-EDU-001');
  const [currentRecord, setCurrentRecord] = useState<TrackingRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const t = translations[lang];

  const performLookup = async (idToLookup: string) => {
    const cleanId = idToLookup.trim();
    if (!cleanId) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/track-application/${encodeURIComponent(cleanId)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.record) {
          setCurrentRecord(data.record);
          setIsSearched(true);
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      console.warn("Backend track fetch fallback:", err);
    }

    // Fallback to local sample or generated record
    if (sampleTrackRecords[cleanId]) {
      setCurrentRecord(sampleTrackRecords[cleanId]);
    } else {
      // Dynamic fallback record for custom entered IDs
      setCurrentRecord({
        id: cleanId,
        applicantName: "Aditya Ramesh Patil (नागरिक अर्जदार)",
        serviceName: {
          en: cleanId.includes('EDU') ? "Academic Verification Certificate" : "Government e-Citizen Service",
          mr: cleanId.includes('EDU') ? "शैक्षणिक पडताळणी प्रमाणपत्र" : "शासकीय ई-नागरिक सेवा",
          hi: cleanId.includes('EDU') ? "शैक्षणिक सत्यापन प्रमाण पत्र" : "सरकारी ई-नागरिक सेवा"
        },
        departmentName: {
          en: cleanId.includes('EDU') ? "School Education & Sports Department" : "District Collectorate, Maharashtra",
          mr: cleanId.includes('EDU') ? "शालेय शिक्षण व क्रीडा विभाग" : "जिल्हाधिकारी कार्यालय, महाराष्ट्र शासन",
          hi: cleanId.includes('EDU') ? "स्कूल शिक्षा एवं खेल विभाग" : "जिलाधिकारी कार्यालय, महाराष्ट्र"
        },
        appliedDate: "2026-08-28",
        status: "under_scrutiny",
        estimatedCompletion: "2026-09-04",
        steps: [
          {
            title: { en: "Submitted Online", mr: "अर्ज ऑनलाइन सादर केला", hi: "आवेदन ऑनलाइन जमा किया" },
            date: "28 Aug 2026, 11:30 AM",
            completed: true,
            remarks: { en: "Application registered in API gateway.", mr: "अर्ज प्राप्त झाला.", hi: "आवेदन प्राप्त हुआ।" }
          },
          {
            title: { en: "Documents Verified", mr: "कागदपत्रे पडताळली", hi: "दस्तावेज़ सत्यापित" },
            date: "28 Aug 2026, 02:15 PM",
            completed: true,
            remarks: { en: "API Setu authentic proof verified.", mr: "डिजिटल पुरावा पडताळला.", hi: "सत्यापन पूर्ण।" }
          },
          {
            title: { en: "Processing & Scrutiny", mr: "दप्तर तपासणी व प्रक्रिया", hi: "प्रक्रिया जारी" },
            date: "In Progress (चालू आहे)",
            completed: false,
            remarks: { en: "Officer review under RTS Act.", mr: "अधिकाऱ्याकडे सोपवला आहे.", hi: "जांच प्रक्रिया जारी।" }
          },
          {
            title: { en: "Approved", mr: "मंजूर करण्यात आला", hi: "स्वीकृत" },
            date: "Pending",
            completed: false,
            remarks: { en: "Competent authority sign-off.", mr: "मंजुरी प्रलंबित.", hi: "स्वीकृति बाकी।" }
          },
          {
            title: { en: "Completed & Issued", mr: "प्रमाणपत्र वितरण", hi: "वितरित" },
            date: "Pending",
            completed: false,
            remarks: { en: "Certificate pushed to DigiLocker.", mr: "डिजिटल लॉकरमध्ये उपलब्ध होईल.", hi: "डिजिटल लॉकर में उपलब्ध होगा।" }
          }
        ]
      });
    }
    setIsSearched(true);
    setLoading(false);
  };

  useEffect(() => {
    if (initialId) {
      setSearchId(initialId);
      performLookup(initialId);
    } else {
      performLookup('DEMO-EDU-001');
    }
  }, [initialId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId.trim()) {
      performLookup(searchId);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0F5132] to-[#166534] text-white p-6 relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black text-emerald-950 bg-emerald-300 px-2 py-0.5 rounded-full uppercase tracking-wider">
                DEMO APPLICATION TRACKING
              </span>
              <span className="text-xs font-bold text-emerald-200">
                Maharashtra RTS Act 2015
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              {t.trackApplication}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5 bg-slate-50">
          
          {/* Search Box & Quick Sample Chips */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="modal-track-search-input"
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder={t.trackAppInputPlaceholder}
                  className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 outline-none focus:border-emerald-600 uppercase"
                />
              </div>
              <button
                id="modal-track-submit-btn"
                type="submit"
                disabled={loading}
                className="bg-[#0F5132] hover:bg-[#0b3d26] text-white px-6 py-2.5 rounded-xl font-bold text-xs cursor-pointer shadow-xs"
              >
                {loading ? 'Searching...' : t.trackBtn}
              </button>
            </form>

            {/* Sample Application quick buttons */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
              <span className="text-slate-500 font-bold">Try Demo Application IDs:</span>
              {[
                { id: 'DEMO-EDU-001', label: 'Education Marksheet (Verified)' },
                { id: 'DEMO-MAHA-789', label: 'Driving Licence (Approved)' },
                { id: 'DEMO-AGRI-102', label: 'PM Kisan DBT (Processing)' },
                { id: 'MH-2026-REV-84920', label: '7/12 Land Extract (Delivered)' }
              ].map((chip) => (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => {
                    setSearchId(chip.id);
                    performLookup(chip.id);
                  }}
                  className={`px-2.5 py-1 rounded-lg font-mono font-bold cursor-pointer border transition-all ${
                    searchId === chip.id
                      ? 'bg-emerald-700 text-white border-emerald-800'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                  }`}
                >
                  {chip.id}
                </button>
              ))}
            </div>
          </div>

          {/* Record Display */}
          {currentRecord && (
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              
              {/* Application Summary Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono font-black text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">
                      {currentRecord.id}
                    </span>
                    <span className="text-[10px] font-black text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                      DEMO APPLICATION
                    </span>
                    {currentRecord.status === 'delivered' ? (
                      <span className="text-[10px] font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        🟢 Delivered / Approved
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        🟡 In Processing
                      </span>
                    )}
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                    {getText(currentRecord.serviceName, lang)}
                  </h4>
                  <p className="text-xs text-slate-500 font-semibold">
                    {getText(currentRecord.departmentName, lang)}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Applicant</span>
                  <span className="text-xs font-bold text-slate-800">{currentRecord.applicantName || 'Citizen'}</span>
                  <span className="text-[10px] text-emerald-700 block font-semibold mt-0.5">Applied: {currentRecord.appliedDate}</span>
                </div>
              </div>

              {/* 5-Step Pipeline: Submitted -> Verified -> Processing -> Approved -> Completed */}
              <div className="space-y-3">
                <h5 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Interoperable Service Pipeline</span>
                </h5>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {safeArray(currentRecord.steps).map((step: any, idx: number) => (
                    <div key={idx} className="relative flex items-start gap-3">
                      <div
                        className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          step.completed
                            ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {step.completed ? '✓' : idx + 1}
                      </div>

                      <div className="flex-1 bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-0.5">
                        <div className="flex items-center justify-between flex-wrap gap-1">
                          <span className={`text-xs font-bold ${step.completed ? 'text-slate-900' : 'text-slate-600'}`}>
                            {getText(step.title, lang)}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-500">
                            {step.date}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600">
                          {getText(step.remarks, lang)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  onClick={() => alert(`Downloading verified digital acknowledgment for ${currentRecord.id}`)}
                  className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-slate-600" />
                  <span>Download Digital Copy</span>
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
