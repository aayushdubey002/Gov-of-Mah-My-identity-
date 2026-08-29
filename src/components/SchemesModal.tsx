import React, { useState } from 'react';
import { Language, Scheme } from '../types';
import { translations, sampleSchemes } from '../data/portalData';
import { getText } from '../utils/localized';
import { 
  X, 
  Gift, 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Building2, 
  Users,
  Sun
} from 'lucide-react';

interface SchemesModalProps {
  lang: Language;
  onClose: () => void;
  onApplyScheme: (scheme: Scheme) => void;
}

export const SchemesModal: React.FC<SchemesModalProps> = ({
  lang,
  onClose,
  onApplyScheme
}) => {
  const t = translations[lang];
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredSchemes = sampleSchemes.filter(sch => {
    const sTitle = getText(sch.title, lang).toLowerCase();
    const sBenefit = getText(sch.subsidyBenefit, lang).toLowerCase();
    const sDept = getText(sch.department, lang).toLowerCase();
    const sBadge = getText(sch.badge, lang).toLowerCase();
    const term = searchTerm.toLowerCase();

    const matchesSearch = 
      sTitle.includes(term) ||
      sBenefit.includes(term) ||
      sDept.includes(term);

    const enTitle = getText(sch.title, 'en');
    const enBadge = getText(sch.badge, 'en');

    const matchesCat = 
      activeCategory === 'all' ||
      (activeCategory === 'women' && (enTitle.includes('Ladki Bahin') || enBadge.includes('Women') || sBadge.includes('महिला'))) ||
      (activeCategory === 'farmer' && (enTitle.includes('Solar') || enTitle.includes('Kisan') || enBadge.includes('Farmer') || sBadge.includes('शेतकरी'))) ||
      (activeCategory === 'education' && (enTitle.includes('Scholarship') || enBadge.includes('Students') || sBadge.includes('विद्यार्थी')));

    return matchesSearch && matchesCat;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white p-6 relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-2xl">
              <Gift className="w-6 h-6 text-amber-200" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-200 uppercase tracking-widest">
                Maharashtra Direct Benefit Transfer (DBT)
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                {t.schemesCardTitle}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar and Category Tabs */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="schemes-search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={lang === 'mr' ? 'योजनेचे नाव किंवा लाभ शोधा (उदा. लाडकी बहीण, सौर पंप...)' : 'Search schemes, benefits or eligibility...'}
              className="w-full pl-10 pr-3 py-2.5 text-sm font-medium rounded-xl border border-slate-300 outline-none bg-white focus:border-amber-600 shadow-2xs"
            />
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 font-['Outfit',sans-serif] text-sm">
            {[
              { id: 'all', label: lang === 'mr' ? 'सर्व योजना' : 'All Schemes' },
              { id: 'women', label: lang === 'mr' ? 'महिला व बालविकास' : 'Women & Child' },
              { id: 'farmer', label: lang === 'mr' ? 'शेतकरी व कृषी' : 'Agriculture & Farmers' },
              { id: 'education', label: lang === 'mr' ? 'विद्यार्थी व शिक्षण' : 'Students & Youth' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-amber-600 text-white shadow-xs font-black'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50 space-y-4">
          {filteredSchemes.map((sch) => (
            <div
              key={sch.id}
              className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-amber-400 shadow-sm transition-all space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200">
                    {getText(sch.badge, lang)}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {getText(sch.department, lang)}
                  </span>
                </div>

                <h4 className="text-base sm:text-lg font-black text-slate-900 mt-2">
                  {getText(sch.title, lang)}
                </h4>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide block">
                      {lang === 'mr' ? 'शासकीय अनुदान व लाभ' : 'Financial Subsidy / Benefit'}
                    </span>
                    <p className="text-xs font-black text-emerald-950 mt-0.5">
                      {getText(sch.subsidyBenefit, lang)}
                    </p>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">
                      {lang === 'mr' ? 'पात्रता अटी' : 'Eligibility Check'}
                    </span>
                    <p className="text-xs text-slate-700 mt-0.5">
                      {getText(sch.eligibility, lang)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">
                  Target: {getText(sch.beneficiaryType, lang) || 'All Citizens'}
                </span>
                <button
                  id={`apply-scheme-btn-${sch.id}`}
                  onClick={() => {
                    onClose();
                    onApplyScheme(sch);
                  }}
                  className="bg-[#0F5132] hover:bg-[#0b3d26] text-white px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>{t.applyNow}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
