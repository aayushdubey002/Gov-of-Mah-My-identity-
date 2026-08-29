import React, { useState, useEffect } from 'react';
import { 
  Building2, Server, CheckCircle2, RefreshCw, 
  ArrowRight, Users, Activity, Shield 
} from 'lucide-react';
import { apiService } from '../../services/api';
import { getText } from '../../utils/localized';

interface AdminDepartmentsPageProps {
  onNavigate: (path: string) => void;
}

export const AdminDepartmentsPage: React.FC<AdminDepartmentsPageProps> = ({ onNavigate }) => {
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.getAdminDepartments().then((data) => {
      setDepartments(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-purple-800 uppercase tracking-wider mb-1">
          <span>State Interoperability Connectors</span>
          <span>•</span>
          <span>25 Connected Ministries</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
          Connected Government Departments
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
          Manage REST/SOAP endpoint mappings, officer counts, and live health monitors across all 25 participating departments.
        </p>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-12 text-slate-500">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-purple-600 mb-2" />
          <p className="font-bold text-sm">Loading department connectors...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <div key={dept.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
                    {dept.code}
                  </span>
                  <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{dept.health}</span>
                  </span>
                </div>

                <h2 className="text-base font-bold text-slate-900 leading-snug">{getText(dept.name)}</h2>
                
                <div className="pt-2 space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Services:</span>
                    <span className="font-bold text-slate-800">{dept.servicesCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Desk Officers:</span>
                    <span className="font-bold text-slate-800">{dept.officersCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">API Endpoint:</span>
                    <span className="font-mono font-bold text-purple-900">{dept.apiEndpoint}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-emerald-700 font-bold">Uptime: 99.98%</span>
                <button
                  onClick={() => onNavigate('/admin/integrations')}
                  className="text-purple-900 font-bold hover:underline"
                >
                  Configure Schema →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
