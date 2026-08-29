import React, { useState } from 'react';
import { Department, Language } from '../types';
import { translations, departmentsData } from '../data/portalData';
import { CategoryVisualIcon } from './CategoryVisualIcon';
import { getText } from '../utils/localized';
import { 
  Search, 
  ChevronRight, 
  HelpCircle, 
  Sprout, 
  Filter,
  CheckCircle2,
  Building,
  Layers
} from 'lucide-react';

interface DepartmentsViewProps {
  lang: Language;
  onSelectDepartment: (dept: Department) => void;
  onOpenHelpModal: () => void;
  onOpenSearchFocus: () => void;
}

export const DepartmentsView: React.FC<DepartmentsViewProps> = ({
  lang,
  onSelectDepartment,
  onOpenHelpModal,
  onOpenSearchFocus
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const t = translations[lang];

  const filteredDepartments = departmentsData.filter(dept => {
    const dTitle = getText(dept.title, lang).toLowerCase();
    const dTitleEn = getText(dept.title, 'en').toLowerCase();
    const dSubtitle = getText(dept.subtitle, lang).toLowerCase();
    const term = searchTerm.toLowerCase();

    const matchesSearch = 
      dTitle.includes(term) ||
      dTitleEn.includes(term) ||
      dSubtitle.includes(term) ||
      dept.number.toString() === searchTerm.trim();

    const matchesCategory = 
      selectedCategory === 'all' || dept.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full bg-[#F4F7F4] min-h-screen pb-16">
      
      {/* Top Banner & Header Section */}
      <section className="bg-gradient-to-b from-white to-[#F0F5F1] border-b border-slate-200/90 pt-8 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#112318] tracking-tight font-['Mukta',sans-serif]">
                {t.all25Departments}
              </h1>
              <p className="text-slate-600 text-xs sm:text-sm font-medium mt-1">
                {t.exploreDepartments}
              </p>
            </div>

            {/* Search & Filter Controls matching 3rd page.jpeg */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              
              {/* Search Box */}
              <div className="relative flex-1 sm:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="dept-search-input"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t.searchDepartments}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl bg-white border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none text-slate-800 shadow-2xs"
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Filter Dropdown matching screenshot */}
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-300 shadow-2xs">
                <span className="text-xs font-semibold text-slate-500 shrink-0">
                  {t.filterBy}
                </span>
                <select
                  id="dept-filter-dropdown"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="text-xs font-bold text-slate-800 bg-transparent outline-none cursor-pointer pr-2"
                >
                  <option value="all">{t.allDeptsOption}</option>
                  <option value="core">{lang === 'mr' ? 'महसूल व मुख्य' : 'Core & Revenue'}</option>
                  <option value="rural">{lang === 'mr' ? 'कृषी व ग्रामीण' : 'Agriculture & Rural'}</option>
                  <option value="welfare">{lang === 'mr' ? 'कल्याण व शिक्षण' : 'Welfare & Education'}</option>
                  <option value="infrastructure">{lang === 'mr' ? 'पायाभूत सुविधा' : 'Infrastructure & Energy'}</option>
                  <option value="legal">{lang === 'mr' ? 'पोलीस व न्याय' : 'Legal & Police'}</option>
                  <option value="urban">{lang === 'mr' ? 'उद्योग व नगरविकास' : 'Industry & Urban'}</option>
                </select>
              </div>

            </div>
          </div>

          {/* Quick Filter Category Tabs with enhanced typography and larger font */}
          <div className="mt-5 pt-4 border-t border-slate-200/80 flex items-center gap-2 overflow-x-auto pb-1 font-['Outfit',sans-serif]">
            {[
              { id: 'all', label: t.allDeptsOption },
              { id: 'core', label: lang === 'mr' ? 'महसूल व मुख्य' : 'Core & Revenue' },
              { id: 'rural', label: lang === 'mr' ? 'कृषी व ग्रामीण' : 'Agriculture & Rural' },
              { id: 'welfare', label: lang === 'mr' ? 'कल्याण व शिक्षण' : 'Welfare & Education' },
              { id: 'infrastructure', label: lang === 'mr' ? 'पायाभूत सुविधा' : 'Infrastructure & Energy' },
              { id: 'legal', label: lang === 'mr' ? 'पोलीस व न्याय' : 'Legal & Police' },
              { id: 'urban', label: lang === 'mr' ? 'उद्योग व नगरविकास' : 'Industry & Urban' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-[#0F5132] text-white shadow-sm font-black'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* 25 Department Cards Grid matching 3rd page.jpeg layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredDepartments.map((dept) => {
            return (
              <div
                key={dept.id}
                onClick={() => onSelectDepartment(dept)}
                className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md border border-slate-200/90 hover:border-emerald-400 transition-all duration-200 flex flex-col justify-between cursor-pointer group"
              >
                {/* Header with Number & Title */}
                <div>
                  <div className="flex items-baseline gap-1.5 mb-1.5">
                    <span className="font-extrabold text-xs text-slate-900 font-mono">
                      {dept.number}.
                    </span>
                    <h3 className="font-bold text-xs text-slate-900 leading-snug group-hover:text-emerald-800 transition-colors">
                      {getText(dept.title, lang)}
                    </h3>
                  </div>

                  <p className="text-[10px] text-slate-500 line-clamp-2 leading-tight min-h-[24px]">
                    {getText(dept.subtitle, lang)}
                  </p>
                </div>

                {/* Central Visual Illustration */}
                <div className="my-3.5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <CategoryVisualIcon type={dept.title.en.toLowerCase()} size={72} />
                </div>

                {/* Footer with "View Services >" Link */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-600 group-hover:text-emerald-800 flex items-center gap-1">
                    {t.viewAllServices}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-800 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>

        {filteredDepartments.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center max-w-md mx-auto my-8 border border-slate-200">
            <Building className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="font-bold text-slate-800 text-sm">
              {lang === 'mr' ? 'कोणताही विभाग आढळला नाही' : 'No departments match your filter'}
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              {lang === 'mr' ? 'कृपया शोध शब्द तपासा किंवा सर्व विभाग निवडा.' : 'Try changing your search terms or filter.'}
            </p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
              className="mt-4 px-4 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

      </section>

      {/* Bottom CTA Banner matching 3rd page.jpeg */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/90 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: Sprout icon + Title + Desc */}
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 shrink-0 border border-emerald-100">
              <Sprout className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm sm:text-base text-slate-900">
                {t.cantFindTitle}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                {t.cantFindDesc}
              </p>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              id="cta-help-center-btn"
              onClick={onOpenHelpModal}
              className="flex-1 md:flex-none px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-300 shadow-2xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-slate-600" />
              <span>{t.goToHelpCenter}</span>
            </button>

            <button
              id="cta-search-services-btn"
              onClick={() => {
                const searchEl = document.getElementById('dept-search-input');
                if (searchEl) searchEl.focus();
              }}
              className="flex-1 md:flex-none px-5 py-2.5 rounded-xl bg-[#0F5132] hover:bg-[#0b3d26] text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4 text-emerald-300" />
              <span>{t.searchServicesBtn}</span>
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
