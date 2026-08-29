import React, { useState } from 'react';
import { 
  Code, Play, Copy, CheckCircle2, Server, 
  ExternalLink, Layers, ShieldCheck, Database 
} from 'lucide-react';

interface ApiDocsPageProps {
  onNavigate: (path: string) => void;
}

export const ApiDocsPage: React.FC<ApiDocsPageProps> = ({ onNavigate }) => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('GET /api/services');
  const [responseOutput, setResponseOutput] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const endpoints = [
    { method: 'GET', path: '/api/services', desc: 'List all government schemes & required APIs', body: null },
    { method: 'GET', path: '/api/profile', desc: 'Get Unified Citizen Profile (KYC & Vault)', body: null },
    { method: 'GET', path: '/api/consents', desc: 'Get active DPDP consent tokens', body: null },
    { method: 'POST', path: '/api/interop/scholarship-demo', desc: 'Execute autonomous scholarship pipeline', body: {} },
    { method: 'GET', path: '/api/applications', desc: 'Query applications across all departments', body: null },
    { method: 'GET', path: '/api/admin/metrics', desc: 'Get system throughput & microservice telemetry', body: null },
    { method: 'GET', path: '/api/departments/legacy/record', desc: 'Query legacy XML/DBF record via CDM adapter', body: null },
    { method: 'GET', path: '/api/departments/revenue/income/CIT-MH-84920', desc: 'Fetch revenue verified income certificate', body: null },
    { method: 'GET', path: '/api/departments/education/sis/CIT-MH-84920', desc: 'Fetch higher education SIS enrollment record', body: null }
  ];

  const handleTest = async (ep: typeof endpoints[0]) => {
    setLoading(true);
    setResponseOutput(null);
    try {
      const token = localStorage.getItem('gov_jwt_token');
      const res = await fetch(ep.path, {
        method: ep.method,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: ep.body ? JSON.stringify(ep.body) : undefined
      });
      const data = await res.json();
      setResponseOutput(data);
    } catch (err: any) {
      setResponseOutput({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
          <span>OpenAPI 3.0 Standard</span>
          <span>•</span>
          <span>API Setu Directory Compatible</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
          State Interoperability REST API Reference
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
          Official API documentation conforming to National Data Governance Framework (NDGF) and API Setu guidelines.
        </p>
      </div>

      {/* Endpoints Grid & Live Runner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Endpoints List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="text-sm font-bold text-slate-900">Available Microservices</h2>
          <div className="space-y-2">
            {endpoints.map((ep, idx) => {
              const isSelected = selectedEndpoint === `${ep.method} ${ep.path}`;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedEndpoint(`${ep.method} ${ep.path}`);
                    handleTest(ep);
                  }}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer space-y-1 ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/70 shadow-xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded font-mono ${
                      ep.method === 'GET' ? 'bg-blue-100 text-blue-900' : 'bg-emerald-100 text-emerald-900'
                    }`}>
                      {ep.method}
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-900">{ep.path}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">{ep.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Interactive Response Console (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4 text-xs font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-emerald-400 font-bold">{selectedEndpoint}</span>
            
            <button
              onClick={() => copyToClipboard(JSON.stringify(responseOutput, null, 2))}
              className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="min-h-96">
            {loading ? (
              <div className="py-24 text-center text-slate-400 space-y-2">
                <Server className="w-8 h-8 animate-pulse mx-auto text-emerald-400" />
                <p>Executing live HTTP request...</p>
              </div>
            ) : responseOutput ? (
              <pre className="text-emerald-300 overflow-x-auto max-h-[500px] leading-relaxed p-2">
                {JSON.stringify(responseOutput, null, 2)}
              </pre>
            ) : (
              <div className="py-24 text-center text-slate-500">
                Click any endpoint on the left to fire a live test query.
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
