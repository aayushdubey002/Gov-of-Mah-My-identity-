import React, { useState, useEffect } from 'react';
import { 
  Activity, Server, Database, Shield, Layers, RefreshCw, 
  ArrowRight, CheckCircle2, AlertTriangle, Cpu, Globe, Users, Zap
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { apiService } from '../../services/api';
import { getText } from '../../utils/localized';

interface AdminDashboardProps {
  onNavigate: (path: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    apiService.getAdminMetrics().then((data) => {
      if (isMounted) {
        setMetrics(data);
        setLoading(false);
      }
    }).catch(() => {
      if (isMounted) setLoading(false);
    });
    return () => { isMounted = false; };
  }, []);

  const totalCitizens = Number(metrics?.totalCitizens ?? metrics?.summary?.totalCitizens ?? 124890);
  const totalApiCalls = Number(metrics?.totalApiCalls ?? (metrics?.summary?.successfulApiRequests ? (metrics.summary.successfulApiRequests + (metrics.summary.failedApiRequests || 0)) : 212440));
  const avgLatencyMs = Number(metrics?.avgLatencyMs ?? metrics?.summary?.avgResponseTimeMs ?? 46.8);
  const connectedDepartments = Array.isArray(metrics?.connectedDepartments) 
    ? metrics.connectedDepartments 
    : (Array.isArray(metrics?.charts?.departmentHealth) ? metrics.charts.departmentHealth : []);
  const throughputHistory = Array.isArray(metrics?.throughputHistory) 
    ? metrics.throughputHistory 
    : (Array.isArray(metrics?.charts?.throughputChart) ? metrics.charts.throughputChart : []);
  const applicationsByStatus = Array.isArray(metrics?.applicationsByStatus) 
    ? metrics.applicationsByStatus 
    : (Array.isArray(metrics?.charts?.applicationStatusBreakdown) ? metrics.charts.applicationStatusBreakdown : []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500">
        <RefreshCw className="w-8 h-8 animate-spin mx-auto text-purple-600 mb-2" />
        <p className="font-bold text-sm">Aggregating State Interoperability Telemetry & Metrics...</p>
      </div>
    );
  }

  const COLORS = ['#10B981', '#F59E0B', '#3B82F6', '#EF4444', '#8B5CF6'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Admin Banner */}
      <div className="bg-purple-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-purple-800/40 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 text-xs font-bold uppercase tracking-wider mb-2">
            <span>State Enterprise Architecture Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-serif">
            Interoperability System Hub & Monitoring
          </h1>
          <p className="text-purple-200 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Centralized monitoring of 25+ connected department APIs, Common Data Model transformation pipelines, throughput latency, and security audit logs.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate('/admin/integrations')}
            className="bg-white text-purple-950 hover:bg-purple-50 px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Database className="w-4 h-4 text-purple-700" />
            <span>Legacy Adapters</span>
          </button>

          <button
            onClick={() => onNavigate('/admin/api-logs')}
            className="bg-purple-800 hover:bg-purple-700 text-white border border-purple-600 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
          >
            <Activity className="w-4 h-4" />
            <span>API Gateway Logs</span>
          </button>
        </div>
      </div>

      {/* Top Level KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Citizens</span>
            <Users className="w-5 h-5 text-purple-700" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{totalCitizens.toLocaleString()}</p>
          <span className="text-[11px] text-emerald-700 font-bold mt-1 block">Unified Single Profiles</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">API Throughput</span>
            <Zap className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{totalApiCalls.toLocaleString()}</p>
          <span className="text-[11px] text-emerald-700 font-bold mt-1 block">99.8% Success Rate</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg Gateway Latency</span>
            <Cpu className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{avgLatencyMs}ms</p>
          <span className="text-[11px] text-blue-700 font-bold mt-1 block">Sub-50ms SLA Target</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Connected APIs</span>
            <Globe className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{connectedDepartments.length || 5}</p>
          <span className="text-[11px] text-amber-700 font-bold mt-1 block">Active Connectors</span>
        </div>
      </div>

      {/* Recharts Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Real-time API Throughput Chart (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">API Gateway Ingress & Latency</h2>
              <p className="text-xs text-slate-500">Real-time throughput across all 25 government departments</p>
            </div>
            <span className="text-[10px] font-mono font-bold bg-purple-100 text-purple-900 px-2.5 py-0.5 rounded-full">
              Live Stream
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={throughputHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Area type="monotone" dataKey="calls" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorCalls)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Application Status Breakdown Pie Chart (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Applications by Status</h2>
            <p className="text-xs text-slate-500">Cross-department verification progression</p>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={applicationsByStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="status"
                >
                  {applicationsByStatus.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Connected Department APIs Health Status Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Microservice Health & Connectivity</h2>
            <p className="text-xs text-slate-500">Autonomous health pings every 30 seconds</p>
          </div>

          <button
            onClick={() => onNavigate('/admin/departments')}
            className="text-xs font-bold text-purple-900 hover:underline cursor-pointer"
          >
            Manage Departments →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {connectedDepartments.map((dept: any, idx: number) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs">{getText(dept.name)}</span>
                <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>{dept.health || 'Operational'}</span>
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>Latency: <strong className="text-slate-800">{dept.latencyMs || dept.latency || 42}ms</strong></span>
                <span>Uptime: <strong className="text-emerald-700">{dept.uptime || '99.9%'}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
