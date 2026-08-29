import React, { useState } from 'react';
import { Language, Department } from '../types';
import { translations, departmentsData, sampleServices } from '../data/portalData';
import { CategoryVisualIcon } from './CategoryVisualIcon';
import { getText } from '../utils/localized';
import { 
  Search, 
  ArrowRight, 
  CreditCard, 
  FileSearch, 
  Download, 
  Gift, 
  MessageSquareWarning, 
  Smartphone, 
  HelpCircle, 
  Facebook, 
  Twitter, 
  Youtube, 
  Instagram,
  CheckCircle,
  Landmark,
  Building2,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface MainDashboardProps {
  lang: Language;
  onNavigate: (view: 'dashboard' | 'departments' | 'landing') => void;
  onSelectDepartment: (dept: Department) => void;
  onOpenTrackModal: (id?: string) => void;
  onOpenGrievanceModal: () => void;
  onOpenSchemesModal: () => void;
  onOpenHelpModal: () => void;
  onOpenServiceDetail: (serviceId: string) => void;
}

export const MainDashboard: React.FC<MainDashboardProps> = ({
  lang,
  onNavigate,
  onSelectDepartment,
  onOpenTrackModal,
  onOpenGrievanceModal,
  onOpenSchemesModal,
  onOpenHelpModal,
  onOpenServiceDetail
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [trackInputId, setTrackInputId] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const t = translations[lang];

  // Search filter
  const filteredServices = sampleServices.filter(s => {
    const sName = getText(s.name, lang).toLowerCase();
    const sNameEn = getText(s.name, 'en').toLowerCase();
    const sDesc = getText(s.shortDesc, lang).toLowerCase();
    const q = searchQuery.toLowerCase();
    return sName.includes(q) || sNameEn.includes(q) || sDesc.includes(q);
  });

  const filteredDepts = departmentsData.filter(d => {
    const dTitle = getText(d.title, lang).toLowerCase();
    const dTitleEn = getText(d.title, 'en').toLowerCase();
    const q = searchQuery.toLowerCase();
    return dTitle.includes(q) || dTitleEn.includes(q);
  });

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenTrackModal(trackInputId.trim() || 'MH-2026-REV-84920');
  };

  // Primary 8 Featured Category Cards matching main dashboard.jpeg
  const featuredCategories = [
    {
      id: 4,
      title: lang === 'mr' ? 'कृषी व शेतकरी' : lang === 'hi' ? 'कृषि एवं किसान' : 'Agriculture & Farmers',
      count: '125+ Services',
      type: 'agriculture',
      btnColor: 'bg-[#0F5132] hover:bg-[#0b3d26]',
      deptObj: departmentsData.find(d => d.id === 4)
    },
    {
      id: 2,
      title: lang === 'mr' ? 'शिक्षण' : lang === 'hi' ? 'शिक्षा' : 'Education',
      count: '150+ Services',
      type: 'education',
      btnColor: 'bg-[#1E40AF] hover:bg-[#1e3a8a]',
      deptObj: departmentsData.find(d => d.id === 2)
    },
    {
      id: 5,
      title: lang === 'mr' ? 'जमीन व मालमत्ता' : lang === 'hi' ? 'भूमि एवं संपत्ति' : 'Land & Property',
      count: '95+ Services',
      type: 'land & property',
      btnColor: 'bg-[#0F5132] hover:bg-[#0b3d26]',
      deptObj: departmentsData.find(d => d.id === 5)
    },
    {
      id: 6,
      title: lang === 'mr' ? 'परिवहन व वाहने' : lang === 'hi' ? 'परिवहन एवं वाहन' : 'Transport & Vehicles',
      count: '110+ Services',
      type: 'transport',
      btnColor: 'bg-[#D97706] hover:bg-[#b45309]',
      deptObj: departmentsData.find(d => d.id === 6)
    },
    {
      id: 8,
      title: lang === 'mr' ? 'आरोग्य सेवा' : lang === 'hi' ? 'स्वास्थ्य सेवाएं' : 'Health Services',
      count: '85+ Services',
      type: 'health',
      btnColor: 'bg-[#BE123C] hover:bg-[#9f1239]',
      deptObj: departmentsData.find(d => d.id === 8)
    },
    {
      id: 7,
      title: lang === 'mr' ? 'पोलीस व सुरक्षा' : lang === 'hi' ? 'पुलिस एवं सुरक्षा' : 'Police & Safety',
      count: '60+ Services',
      type: 'police',
      btnColor: 'bg-[#1D4ED8] hover:bg-[#1e40af]',
      deptObj: departmentsData.find(d => d.id === 7)
    },
    {
      id: 9,
      title: lang === 'mr' ? 'रोजगार व उपजीविका' : lang === 'hi' ? 'रोजगार एवं कौशल' : 'Jobs & Employment',
      count: '120+ Services',
      type: 'jobs',
      btnColor: 'bg-[#7E22CE] hover:bg-[#6b21a8]',
      deptObj: departmentsData.find(d => d.id === 9)
    },
    {
      id: 19,
      title: lang === 'mr' ? 'अन्न व रेशन' : lang === 'hi' ? 'राशन एवं खाद्य' : 'Ration & Food',
      count: '75+ Services',
      type: 'ration',
      btnColor: 'bg-[#C2410C] hover:bg-[#9a3412]',
      deptObj: departmentsData.find(d => d.id === 19)
    },
    {
      id: 0,
      title: lang === 'mr' ? 'अधिक विभाग' : lang === 'hi' ? 'अन्य विभाग' : 'View More',
      count: 'Departments',
      type: 'departments',
      btnColor: 'bg-[#0F5132] hover:bg-[#0b3d26]',
      isAllDepts: true
    }
  ];

  return (
    <div className="w-full bg-[#F4F7F4] min-h-screen pb-12">
      
      {/* 1. Hero Banner with Farmer & Agriculture landscape background */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#EBF5EE] via-[#F7FAF7] to-[#E9F3EC] border-b border-slate-200/80 pt-8 pb-10">
        
        {/* Scenic Decorative Silhouette in background */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none hidden lg:block">
          <CategoryVisualIcon type="agriculture" size={400} className="transform translate-x-20 -translate-y-10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Col: Headings + Search Bar + Metric Counters */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#112318] tracking-tight font-['Mukta',sans-serif] leading-tight">
                  {t.heroTitle}
                </h1>
                <p className="text-slate-600 text-sm sm:text-base font-medium mt-2 max-w-xl">
                  {t.heroSubtitle}
                </p>
              </div>

              {/* Integrated Search Box */}
              <div className="relative max-w-2xl">
                <form 
                  onSubmit={(e) => { e.preventDefault(); setShowSearchResults(true); }}
                  className="flex items-center bg-white rounded-xl shadow-md border-2 border-emerald-600/30 focus-within:border-emerald-700 p-1.5 transition-all"
                >
                  <div className="pl-3.5 pr-2 text-slate-400">
                    <Search className="w-5 h-5 text-emerald-700" />
                  </div>
                  <input
                    id="portal-search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSearchResults(e.target.value.length > 0);
                    }}
                    placeholder={t.searchPlaceholder}
                    className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-sm sm:text-base font-medium outline-none py-2 px-1"
                  />
                  <button
                    id="portal-search-btn"
                    type="submit"
                    className="bg-[#0F5132] hover:bg-[#0b3d26] text-white px-6 sm:px-8 py-2.5 rounded-lg text-sm sm:text-base font-bold shadow-xs transition-colors cursor-pointer shrink-0"
                  >
                    {t.searchBtn}
                  </button>
                </form>

                {/* Instant Search Results Dropdown */}
                {showSearchResults && searchQuery.trim() && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 max-h-96 overflow-y-auto p-4 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        {lang === 'mr' ? 'शोध परिणाम' : 'Search Results'} ({filteredServices.length + filteredDepts.length})
                      </span>
                      <button 
                        onClick={() => setShowSearchResults(false)} 
                        className="text-xs text-slate-400 hover:text-slate-600"
                      >
                        ✕ Close
                      </button>
                    </div>

                    {filteredServices.length > 0 && (
                      <div>
                        <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wide mb-2">
                          {t.services}
                        </h4>
                        <div className="space-y-1.5">
                          {filteredServices.map(srv => (
                            <div
                              key={srv.id}
                              onClick={() => {
                                onOpenServiceDetail(srv.id);
                                setShowSearchResults(false);
                              }}
                              className="p-2.5 hover:bg-emerald-50 rounded-xl cursor-pointer transition-colors flex items-center justify-between"
                            >
                              <div>
                                <p className="text-sm font-bold text-slate-900">{getText(srv.name, lang)}</p>
                                <p className="text-xs text-slate-500">{getText(srv.category, lang)} • {srv.processingDays || 7} {t.days}</p>
                              </div>
                              <span className="text-xs font-bold text-emerald-700">{getText(srv.fee, lang)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {filteredDepts.length > 0 && (
                      <div>
                        <h4 className="text-xs font-bold text-blue-800 uppercase tracking-wide mb-2">
                          {t.departments}
                        </h4>
                        <div className="space-y-1.5">
                          {filteredDepts.map(dept => (
                            <div
                              key={dept.id}
                              onClick={() => {
                                onSelectDepartment(dept);
                                setShowSearchResults(false);
                              }}
                              className="p-2.5 hover:bg-blue-50 rounded-xl cursor-pointer transition-colors flex items-center justify-between"
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center">
                                  {dept.number}
                                </span>
                                <p className="text-sm font-bold text-slate-900">{getText(dept.title, lang)}</p>
                              </div>
                              <span className="text-xs text-slate-400">{dept.servicesCount}+ {t.services}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {filteredServices.length === 0 && filteredDepts.length === 0 && (
                      <p className="text-sm text-slate-500 py-4 text-center">
                        {lang === 'mr' ? 'कोणतेही परिणाम सापडले नाहीत.' : 'No services found matching your keyword.'}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Highlight Stats matching screenshot: 1200+ Services, 38+ Depts, One Platform */}
              <div className="flex flex-wrap items-center gap-6 sm:gap-10 pt-2 text-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">
                      {t.statsServices}
                    </div>
                    <div className="text-xs font-semibold text-slate-500">
                      {t.statsServicesLabel}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-100 text-blue-900">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">
                      {t.statsDepts}
                    </div>
                    <div className="text-xs font-semibold text-slate-500">
                      {t.statsDeptsLabel}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-900">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">
                      {t.statsOnePlatform}
                    </div>
                    <div className="text-xs font-semibold text-slate-500">
                      {t.statsOnePlatformLabel}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Quick Services Sidecard matching screenshot */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl p-5 shadow-md border border-slate-200/90 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                    {t.quickServicesTitle}
                  </h3>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                    24x7
                  </span>
                </div>

                <div className="space-y-2 font-['Outfit',sans-serif]">
                  <button
                    id="quick-aadhaar"
                    onClick={() => onOpenServiceDetail('srv-income')}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-slate-800 hover:text-emerald-900 font-bold text-sm transition-all cursor-pointer text-left border border-slate-100 hover:border-slate-300 shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-orange-100 text-orange-800 shrink-0">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <span>{t.aadhaarServices}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>

                  <button
                    id="quick-track"
                    onClick={() => onOpenTrackModal()}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-slate-800 hover:text-emerald-900 font-bold text-sm transition-all cursor-pointer text-left border border-slate-100 hover:border-slate-300 shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-100 text-blue-800 shrink-0">
                        <FileSearch className="w-4 h-4" />
                      </div>
                      <span>{t.trackApplication}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>

                  <button
                    id="quick-download"
                    onClick={() => onOpenServiceDetail('srv-712')}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-slate-800 hover:text-emerald-900 font-bold text-sm transition-all cursor-pointer text-left border border-slate-100 hover:border-slate-300 shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 shrink-0">
                        <Download className="w-4 h-4" />
                      </div>
                      <span>{t.downloadCertificate} (7/12)</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>

                  <button
                    id="quick-schemes"
                    onClick={onOpenSchemesModal}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-slate-800 hover:text-emerald-900 font-bold text-sm transition-all cursor-pointer text-left border border-slate-100 hover:border-slate-300 shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-100 text-purple-800 shrink-0">
                        <Gift className="w-4 h-4" />
                      </div>
                      <span>{t.schemeInfo}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>

                  <button
                    id="quick-complaint"
                    onClick={onOpenGrievanceModal}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-slate-800 hover:text-emerald-900 font-bold text-sm transition-all cursor-pointer text-left border border-slate-100 hover:border-slate-300 shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-red-100 text-red-800 shrink-0">
                        <MessageSquareWarning className="w-4 h-4" />
                      </div>
                      <span>{t.fileComplaint}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Popular Category Cards Grid matching main dashboard.jpeg */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {lang === 'mr' ? 'मुख्य सेवा प्रभाग' : lang === 'hi' ? 'मुख्य सेवा श्रेणियां' : 'Featured Services by Category'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === 'mr' ? 'नागरिकांसाठी सर्वाधिक वापरल्या जाणाऱ्या शासकीय सेवा' : 'Most frequently accessed public e-services across Maharashtra'}
            </p>
          </div>
          <button
            id="view-all-depts-link"
            onClick={() => onNavigate('departments')}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
          >
            {t.all25Departments} →
          </button>
        </div>

        {/* 9 Cards in 3x3 / responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-9 gap-4">
          {featuredCategories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md border border-slate-200/80 transition-all flex flex-col justify-between items-center text-center group xl:col-span-1"
            >
              {/* Category Title at Top */}
              <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 mb-2 h-8 flex items-center justify-center leading-snug">
                {cat.title}
              </h3>

              {/* Illustrated Visual Center */}
              <div className="my-2 transition-transform duration-300 group-hover:scale-105">
                <CategoryVisualIcon type={cat.type} size={84} />
              </div>

              {/* Service Count Badge */}
              <div className="text-[11px] font-bold text-slate-600 mb-3 bg-slate-50 px-2.5 py-0.5 rounded-full border border-slate-100">
                {cat.count}
              </div>

              {/* View Button with Arrow */}
              <button
                id={`cat-card-btn-${idx}`}
                onClick={() => {
                  if (cat.isAllDepts) {
                    onNavigate('departments');
                  } else if (cat.deptObj) {
                    onSelectDepartment(cat.deptObj);
                  }
                }}
                className={`w-full py-2 px-3 rounded-full text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-transform duration-200 active:scale-95 cursor-pointer shadow-xs ${cat.btnColor}`}
              >
                <span>{t.viewAllServices.split(' ')[0]}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Bottom Action Utilities Row matching main dashboard.jpeg */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Card 1: Track Application with Input Form */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800">
                  <FileSearch className="w-4 h-4" />
                </div>
                <h4 className="font-extrabold text-xs text-slate-900">{t.trackAppCardTitle}</h4>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">
                {t.trackAppCardDesc}
              </p>
            </div>

            <form onSubmit={handleTrackSubmit} className="mt-3 space-y-2">
              <input
                id="bottom-track-input"
                type="text"
                value={trackInputId}
                onChange={(e) => setTrackInputId(e.target.value)}
                placeholder={t.trackAppInputPlaceholder}
                className="w-full text-xs p-2 rounded-lg border border-slate-300 outline-none focus:border-emerald-600 text-slate-800"
              />
              <button
                id="bottom-track-btn"
                type="submit"
                className="w-full bg-[#0F5132] hover:bg-[#0b3d26] text-white py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors"
              >
                {t.trackBtn}
              </button>
            </form>
          </div>

          {/* Card 2: Schemes */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-amber-50 text-amber-800">
                  <Gift className="w-4 h-4" />
                </div>
                <h4 className="font-extrabold text-xs text-slate-900">{t.schemesCardTitle}</h4>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">
                {t.schemesCardDesc}
              </p>
            </div>
            <button
              id="bottom-schemes-btn"
              onClick={onOpenSchemesModal}
              className="mt-3 w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-2 rounded-lg text-xs font-bold cursor-pointer transition-colors border border-slate-200"
            >
              {t.viewSchemesBtn}
            </button>
          </div>

          {/* Card 3: File a Complaint */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-teal-50 text-teal-800">
                  <MessageSquareWarning className="w-4 h-4" />
                </div>
                <h4 className="font-extrabold text-xs text-slate-900">{t.fileComplaintCardTitle}</h4>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">
                {t.fileComplaintCardDesc}
              </p>
            </div>
            <button
              id="bottom-complaint-btn"
              onClick={onOpenGrievanceModal}
              className="mt-3 w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-2 rounded-lg text-xs font-bold cursor-pointer transition-colors border border-slate-200"
            >
              {t.fileComplaintBtn}
            </button>
          </div>

          {/* Card 4: Help Center */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <h4 className="font-extrabold text-xs text-slate-900">{t.helpCenterCardTitle}</h4>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">
                {t.helpCenterCardDesc}
              </p>
            </div>
            <button
              id="bottom-help-btn"
              onClick={onOpenHelpModal}
              className="mt-3 w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-2 rounded-lg text-xs font-bold cursor-pointer transition-colors border border-slate-200"
            >
              {t.getHelpBtn}
            </button>
          </div>

          {/* Card 5: Mobile App Download */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-sky-50 text-sky-800">
                  <Smartphone className="w-4 h-4" />
                </div>
                <h4 className="font-extrabold text-xs text-slate-900">{t.mobileAppCardTitle}</h4>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">
                {t.mobileAppCardDesc}
              </p>
            </div>
            <button
              id="bottom-app-btn"
              onClick={() => alert('Majhi Olakh Mobile App is available on Google Play & iOS App Store.')}
              className="mt-3 w-full bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-lg text-xs font-bold cursor-pointer transition-colors flex items-center justify-center gap-1.5"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.googlePlayBtn}</span>
            </button>
          </div>

        </div>
      </section>

      {/* 4. Official Prototype Footer matching screenshot */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-300/80 pt-8 text-slate-600">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8">
          
          {/* Disclaimer Col */}
          <div className="md:col-span-6 space-y-2">
            <h5 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
              {t.disclaimerTitle}
            </h5>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              {t.disclaimerText}
            </p>
          </div>

          {/* Important Links Col */}
          <div className="md:col-span-3 space-y-2">
            <h5 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
              {t.importantLinks}
            </h5>
            <ul className="grid grid-cols-2 gap-1 text-[11px] text-slate-600">
              <li><a href="#disclaimer" className="hover:text-emerald-800">Disclaimer</a></li>
              <li><a href="#privacy" className="hover:text-emerald-800">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-emerald-800">Terms & Conditions</a></li>
              <li><a href="#accessibility" className="hover:text-emerald-800">Accessibility</a></li>
              <li><a href="#sitemap" className="hover:text-emerald-800">Sitemap</a></li>
              <li><a href="#contact" className="hover:text-emerald-800">Contact Us</a></li>
            </ul>
          </div>

          {/* Connect With Us Col */}
          <div className="md:col-span-3 space-y-2">
            <h5 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
              {t.connectWithUs}
            </h5>
            <div className="flex items-center gap-3 text-slate-700">
              <a href="#facebook" className="p-2 bg-slate-100 hover:bg-emerald-100 rounded-full hover:text-emerald-800 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#twitter" className="p-2 bg-slate-100 hover:bg-emerald-100 rounded-full hover:text-emerald-800 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#youtube" className="p-2 bg-slate-100 hover:bg-emerald-100 rounded-full hover:text-emerald-800 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#instagram" className="p-2 bg-slate-100 hover:bg-emerald-100 rounded-full hover:text-emerald-800 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
            <p className="text-[11px] text-slate-500 pt-2">
              {t.copyright}
            </p>
          </div>

        </div>
      </footer>
    </div>
  );
};
