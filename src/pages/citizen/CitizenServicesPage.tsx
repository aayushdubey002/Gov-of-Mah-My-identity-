import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Building2, Clock, FileText, ArrowRight, 
  Sparkles, CheckCircle2, ShieldCheck, HelpCircle 
} from 'lucide-react';
import { apiService } from '../../services/api';
import { GovernmentService } from '../../types';
import { getText } from '../../utils/localized';

interface CitizenServicesPageProps {
  onNavigate: (path: string) => void;
}

export const CitizenServicesPage: React.FC<CitizenServicesPageProps> = ({ onNavigate }) => {
  const [services, setServices] = useState<GovernmentService[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.getServices().then((data) => {
      setServices(data || []);
      setLoading(false);
    });
  }, []);

  const departments = ['ALL', ...Array.from(new Set(services.map((s) => getText(s.departmentName)).filter(Boolean)))];

  const filteredServices = services.filter((s) => {
    const sName = getText(s.name).toLowerCase();
    const sDesc = getText(s.description || s.shortDesc).toLowerCase();
    const sDept = getText(s.departmentName);
    const search = searchTerm.toLowerCase();
    const matchesSearch = sName.includes(search) || sDesc.includes(search) || sDept.toLowerCase().includes(search);
    const matchesDept = selectedDept === 'ALL' || sDept === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title & Search Bar */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
            <span>25 Maharashtra Government Departments</span>
            <span>•</span>
            <span>Single Window Access</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
            Unified Government Services Catalog
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            All services on this portal are connected to the <strong>Interoperability Middleware</strong>. Your profile data and verified certificates are auto-prefilled instantaneously.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search services (e.g. Income, Scholarship, Domicile, License)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-hidden shadow-2xs"
            />
          </div>

          <div className="sm:w-64">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-hidden font-medium shadow-2xs cursor-pointer"
            >
              {departments.map((dept, idx) => (
                <option key={idx} value={dept}>
                  {dept === 'ALL' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md hover:border-emerald-500 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {getText(service.departmentName)}
                </span>
                <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{service.processingDays || 7} Days SLA</span>
                </span>
              </div>

              <h2 className="text-base font-bold text-slate-900 leading-snug">
                {getText(service.name)}
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                {getText(service.description || service.shortDesc)}
              </p>

              {/* Interop Connected APIs Badge */}
              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Connected Microservice APIs:
                </span>
                <div className="flex flex-wrap gap-1">
                  {(service.requiredApis || service.connectedApis || ['/api/departments/registry/citizen']).map((api: string, i: number) => (
                    <span key={i} className="text-[9px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      {api}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">
                Fee: {service.fee === 0 ? 'Free (RTS Act)' : (typeof service.fee === 'object' ? 'Free (RTS Act)' : String(service.fee || 'Free'))}
              </span>

              <button
                onClick={() => onNavigate(`/citizen/apply/${service.id}`)}
                className="bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-transform active:scale-95 cursor-pointer"
              >
                <span>Apply with Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
