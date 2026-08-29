import React, { useState, useEffect } from 'react';
import { 
  Activity, Search, Filter, RefreshCw, CheckCircle2, 
  XCircle, AlertTriangle, RotateCcw, Clock, ShieldCheck, Database 
} from 'lucide-react';
import { apiService } from '../../services/api';
import { ApiLog } from '../../types';

interface AdminApiLogsPageProps {
  onNavigate: (path: string) => void;
}

export const AdminApiLogsPage: React.FC<AdminApiLogsPageProps> = ({ onNavigate }) => {
  const [logs, setLogs] = useState<ApiLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [retryingId, setRetryingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const loadLogs = async () => {
    const data = await apiService.getApiLogs();
    setLogs(data);
    setLoading(false);
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const handleRetry = async (id: string) => {
    setRetryingId(id);
    try {
      await apiService.retryApiLog(id);
      await loadLogs();
    } catch (err: any) {
      alert('Retry failed');
    } finally {
      setRetryingId(null);
    }
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = log.endpoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.sourceDepartment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.targetDepartment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || log.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-800 uppercase tracking-wider mb-1">
            <span>API Gateway Ingress Telemetry</span>
            <span>•</span>
            <span>Circuit Breaker & Resilience</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
            Interoperability API Logs & Circuit Breakers
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
            Monitor incoming cross-department payloads, HTTP response codes, latency overhead, and re-try failed network handshakes.
          </p>
        </div>

        <button
          onClick={loadLogs}
          className="bg-purple-800 hover:bg-purple-900 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh Real-Time Logs</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search by Endpoint, Department, or Method..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-purple-600 focus:outline-hidden shadow-2xs"
          />
        </div>

        <div className="sm:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-purple-600 font-medium shadow-2xs cursor-pointer"
          >
            <option value="ALL">All Status Codes</option>
            <option value="SUCCESS">SUCCESS (200 OK)</option>
            <option value="FAILED">FAILED (4xx / 5xx)</option>
            <option value="TIMEOUT">TIMEOUT (504)</option>
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        {loading ? (
          <div className="text-center py-12 text-slate-500">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-purple-600 mb-2" />
            <p className="font-bold text-sm">Loading API Gateway logs...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase font-bold text-[10px]">
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Method & Endpoint</th>
                  <th className="py-3 px-3">Source Dept</th>
                  <th className="py-3 px-3">Target Dept</th>
                  <th className="py-3 px-3">Latency</th>
                  <th className="py-3 px-3">Timestamp</th>
                  <th className="py-3 px-3 text-right">Circuit Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-3">
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase font-sans ${
                        log.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-900' :
                        log.status === 'FAILED' ? 'bg-red-100 text-red-900' :
                        'bg-amber-100 text-amber-900'
                      }`}>
                        {log.responseCode} {log.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="font-bold text-slate-900 mr-2">{log.method}</span>
                      <span className="text-slate-600">{log.endpoint}</span>
                    </td>
                    <td className="py-3.5 px-3 font-sans text-slate-700">{log.sourceDepartment}</td>
                    <td className="py-3.5 px-3 font-sans text-slate-700">{log.targetDepartment}</td>
                    <td className="py-3.5 px-3 font-bold text-slate-900">{log.latencyMs}ms</td>
                    <td className="py-3.5 px-3 text-slate-500 font-sans">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="py-3.5 px-3 text-right font-sans">
                      {log.status !== 'SUCCESS' ? (
                        <button
                          onClick={() => handleRetry(log.id)}
                          disabled={retryingId === log.id}
                          className="bg-purple-800 hover:bg-purple-900 text-white px-2.5 py-1 rounded-lg text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                        >
                          <RotateCcw className={`w-3 h-3 ${retryingId === log.id ? 'animate-spin' : ''}`} />
                          <span>{retryingId === log.id ? 'Retrying...' : 'Retry'}</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-emerald-700 font-bold">✓ Synced</span>
                      )}
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
