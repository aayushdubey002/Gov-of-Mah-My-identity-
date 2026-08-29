import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Search, Filter, RefreshCw, Lock, 
  User, CheckCircle2, FileText, Database 
} from 'lucide-react';
import { apiService } from '../../services/api';
import { AuditLog } from '../../types';

interface AdminAuditLogsPageProps {
  onNavigate: (path: string) => void;
}

export const AdminAuditLogsPage: React.FC<AdminAuditLogsPageProps> = ({ onNavigate }) => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    apiService.getAuditLogs().then((data) => {
      setLogs(data);
      setLoading(false);
    });
  }, []);

  const filtered = logs.filter((l) => 
    l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.resource.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-purple-800 uppercase tracking-wider mb-1">
          <span>Immutable Audit Ledger</span>
          <span>•</span>
          <span>DPDP & CERT-In Compliant</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
          Statewide Security & Access Audit Trail
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
          Cryptographically timestamped log of all citizen consent transactions, officer approvals, and cross-department API queries.
        </p>
      </div>

      {/* Search bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          placeholder="Filter audit entries by User, Action, Department, or Resource ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-purple-600 focus:outline-hidden shadow-2xs"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        {loading ? (
          <div className="text-center py-12 text-slate-500">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-purple-600 mb-2" />
            <p className="font-bold text-sm">Loading security audit records...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase font-bold text-[10px]">
                  <th className="py-3 px-3">Timestamp</th>
                  <th className="py-3 px-3">Actor & Role</th>
                  <th className="py-3 px-3">Action Executed</th>
                  <th className="py-3 px-3">Department</th>
                  <th className="py-3 px-3">Target Resource</th>
                  <th className="py-3 px-3 text-right">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {filtered.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-3 text-slate-500 font-mono">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="py-3.5 px-3 font-bold text-slate-900">
                      <div>{log.user}</div>
                      <span className="text-[10px] text-purple-700 font-bold uppercase">{log.role}</span>
                    </td>
                    <td className="py-3.5 px-3 font-bold text-slate-800">{log.action}</td>
                    <td className="py-3.5 px-3 text-slate-600">{log.department}</td>
                    <td className="py-3.5 px-3 font-mono text-slate-700">{log.resource}</td>
                    <td className="py-3.5 px-3 text-right">
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase ${
                        log.result === 'SUCCESS' ? 'bg-emerald-100 text-emerald-900' : 'bg-red-100 text-red-900'
                      }`}>
                        {log.result}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
