import React, { useState, useEffect } from 'react';
import { 
  Users, Search, ShieldCheck, RefreshCw, 
  CheckCircle2, Lock, UserCheck, Key 
} from 'lucide-react';
import { apiService } from '../../services/api';

interface AdminUsersPageProps {
  onNavigate: (path: string) => void;
}

export const AdminUsersPage: React.FC<AdminUsersPageProps> = ({ onNavigate }) => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.getAdminUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-purple-800 uppercase tracking-wider mb-1">
          <span>Single Sign-On (SSO) & RBAC</span>
          <span>•</span>
          <span>Role Directory</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
          Users & Access Control Directory
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
          Manage identity federations, officer roles, citizen accounts, and system administrator privileges.
        </p>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        {loading ? (
          <div className="text-center py-12 text-slate-500">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-purple-600 mb-2" />
            <p className="font-bold text-sm">Loading users from central IAM directory...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase font-bold text-[10px]">
                  <th className="py-3 px-3">User ID</th>
                  <th className="py-3 px-3">Full Name</th>
                  <th className="py-3 px-3">Email Address</th>
                  <th className="py-3 px-3">Assigned Role</th>
                  <th className="py-3 px-3">Department / Division</th>
                  <th className="py-3 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-3 font-mono font-bold text-slate-900">{u.id}</td>
                    <td className="py-3.5 px-3 font-bold text-slate-900">{u.name}</td>
                    <td className="py-3.5 px-3 text-slate-600">{u.email}</td>
                    <td className="py-3.5 px-3">
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                        u.role === 'admin' ? 'bg-purple-100 text-purple-900 border border-purple-300' :
                        u.role === 'officer' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                        'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-600">{u.department || 'Citizen Public Access'}</td>
                    <td className="py-3.5 px-3 text-right">
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        Active SSO
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
