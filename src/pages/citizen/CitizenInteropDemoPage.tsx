import React, { useState } from 'react';
import { 
  Play, CheckCircle2, AlertCircle, Clock, Database, Server, 
  ArrowRight, ShieldCheck, RefreshCw, FileText, Code, Layers, 
  Sparkles, ExternalLink, Activity
} from 'lucide-react';
import { apiService } from '../../services/api';
import { InteropStepResult } from '../../types';

interface CitizenInteropDemoPageProps {
  onNavigate: (path: string) => void;
}

export const CitizenInteropDemoPage: React.FC<CitizenInteropDemoPageProps> = ({ onNavigate }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);
  const [results, setResults] = useState<InteropStepResult[]>([]);
  const [commonDataModel, setCommonDataModel] = useState<any>(null);
  const [createdAppId, setCreatedAppId] = useState<string | null>(null);
  const [selectedStepDetail, setSelectedStepDetail] = useState<InteropStepResult | null>(null);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const runDemo = async () => {
    setIsRunning(true);
    setResults([]);
    setActiveStepIndex(0);
    setCommonDataModel(null);
    setCreatedAppId(null);
    setErrorMessage(null);
    setSelectedStepDetail(null);

    try {
      // Execute Real Backend Interoperability Pipeline
      const response = await apiService.runScholarshipDemo();

      if (response.steps && response.steps.length > 0) {
        // Animate sequential completion for visual feedback
        for (let i = 0; i < response.steps.length; i++) {
          setActiveStepIndex(i);
          await new Promise((r) => setTimeout(r, 260));
          setResults((prev) => [...prev, response.steps[i]]);
        }
      }

      if (response.success) {
        setCommonDataModel(response.commonDataModel);
        setCreatedAppId(response.applicationId);
        setExecutionTime(response.totalDurationMs);
        if (response.steps && response.steps.length > 0) {
          setSelectedStepDetail(response.steps[response.steps.length - 2]); // select CDM step by default
        }
      } else {
        setErrorMessage(response.message || 'Interoperability pipeline failed.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Server error occurred during execution.');
    } finally {
      setIsRunning(false);
      setActiveStepIndex(-1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Top Breadcrumb & Title */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
          <span>SIH 26129 Core Innovation</span>
          <span>•</span>
          <span>Interoperability Middleware Layer</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-serif">
              Autonomous Multi-Department Scholarship Orchestration
            </h1>
            <p className="text-slate-600 text-sm mt-1 max-w-3xl leading-relaxed">
              Demonstrating live data aggregation across <strong>Citizen Registry</strong>, <strong>Revenue Department</strong>, and <strong>Higher Education SIS</strong> without asking the citizen to re-enter or upload duplicate paper certificates.
            </p>
          </div>

          {/* Big Action Button */}
          <button
            id="btn-run-interop-demo"
            onClick={runDemo}
            disabled={isRunning}
            className={`px-6 py-3.5 rounded-xl font-black text-sm text-white shadow-lg flex items-center justify-center gap-2.5 transition-all transform active:scale-95 cursor-pointer whitespace-nowrap ${
              isRunning
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 hover:shadow-emerald-900/20'
            }`}
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>ORCHESTRATING PIPELINE...</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>RUN INTEROPERABILITY DEMO</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Visual Pipeline Flow Diagram */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white rounded-2xl p-5 sm:p-6 mb-8 shadow-xl border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-400" />
            <h2 className="font-bold text-sm sm:text-base text-emerald-100">
              Live Interoperability Architectural Path
            </h2>
          </div>
          <span className="text-[11px] font-mono bg-emerald-950 text-emerald-300 px-2.5 py-1 rounded-md border border-emerald-800">
            Real Backend HTTP/2 Microservices
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 text-center text-xs">
          {[
            { label: 'Citizen', icon: '👤', sub: 'Single Login' },
            { label: 'Unified Portal', icon: '🏛️', sub: 'Majhi Olakh' },
            { label: 'API Gateway', icon: '🛡️', sub: 'Rate Limiter' },
            { label: 'Consent Mgr', icon: '🔐', sub: 'DPDP Check' },
            { label: 'Dept Connectors', icon: '🔌', sub: 'Rev / Edu / Reg' },
            { label: 'Data Transform', icon: '⚡', sub: 'CDM Mapping' },
            { label: 'Workflow Engine', icon: '⚙️', sub: 'State Machine' },
            { label: 'Unified Tracking', icon: '📋', sub: '7-Step Timeline' }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all ${
                activeStepIndex === idx
                  ? 'bg-emerald-600/30 border-emerald-400 text-emerald-300 ring-2 ring-emerald-400'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300'
              }`}
            >
              <span className="text-xl mb-1">{item.icon}</span>
              <span className="font-bold text-[11px] leading-tight">{item.label}</span>
              <span className="text-[9px] text-slate-400 mt-0.5">{item.sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Execution Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Real-Time Execution Status Table */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-700" />
                <span>Microservice Pipeline Execution Status</span>
              </h3>
              {executionTime !== null && (
                <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full">
                  Total Time: {executionTime}ms
                </span>
              )}
            </div>

            {results.length === 0 && !isRunning && !errorMessage && (
              <div className="text-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                <Play className="w-10 h-10 text-emerald-600 mx-auto mb-3 opacity-60" />
                <p className="font-bold text-slate-800 text-sm">Ready to Test Interoperability</p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  Click the <strong>RUN INTEROPERABILITY DEMO</strong> button above to trigger real asynchronous cross-department data fetching.
                </p>
              </div>
            )}

            {/* Error banner if consent is blocked or error occurred */}
            {errorMessage && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl mb-4 text-xs text-red-800">
                <div className="flex items-center gap-2 font-bold mb-1">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span>Pipeline Execution Stopped</span>
                </div>
                <p>{errorMessage}</p>
                <div className="mt-3">
                  <button
                    onClick={() => onNavigate('/citizen/consent')}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    Open Consent Manager to Allow Data Sharing
                  </button>
                </div>
              </div>
            )}

            {/* List of Steps */}
            <div className="space-y-2.5">
              {results.map((res, index) => {
                const isSelected = selectedStepDetail?.step === res.step;
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedStepDetail(res)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/70 shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        res.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {res.status === 'SUCCESS' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
                      </div>

                      <div>
                        <p className="text-xs sm:text-sm font-bold text-slate-900">{res.title}</p>
                        <p className="text-[11px] text-slate-500 truncate max-w-[240px] sm:max-w-xs">{res.description}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider ${
                        res.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-900' : 'bg-red-100 text-red-900'
                      }`}>
                        {res.status}
                      </span>
                      <p className="text-[10px] font-mono text-slate-400 mt-0.5">{res.durationMs}ms</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Success Next Step Banner */}
            {createdAppId && (
              <div className="mt-5 p-4 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center justify-between">
                <div>
                  <p className="font-bold text-xs text-emerald-950">Application Registered in Unified System</p>
                  <p className="text-xs text-emerald-800 font-mono mt-0.5">{createdAppId}</p>
                </div>
                <button
                  onClick={() => onNavigate(`/citizen/applications/${createdAppId}`)}
                  className="bg-emerald-800 hover:bg-emerald-900 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span>Track Timeline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

          </div>
        </div>

        {/* Right Column: Live JSON Payload & Common Data Model Visualizer */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 border border-slate-800 shadow-xl">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-xs sm:text-sm text-emerald-100 uppercase tracking-wider font-mono">
                  {selectedStepDetail ? selectedStepDetail.title : 'Live Data Payload Inspector'}
                </h3>
              </div>
              {selectedStepDetail?.endpoint && (
                <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                  {selectedStepDetail.endpoint}
                </span>
              )}
            </div>

            {selectedStepDetail ? (
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Response Data Output:</p>
                  <pre className="p-3 bg-slate-950 rounded-xl text-emerald-300 text-xs font-mono overflow-x-auto max-h-72 leading-relaxed border border-slate-800">
                    {JSON.stringify(selectedStepDetail.response, null, 2)}
                  </pre>
                </div>

                {selectedStepDetail.request && (
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Outgoing Request Context:</p>
                    <pre className="p-3 bg-slate-950 rounded-xl text-slate-300 text-xs font-mono overflow-x-auto max-h-36 leading-relaxed border border-slate-800">
                      {JSON.stringify(selectedStepDetail.request, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-20 text-center text-slate-500 text-xs">
                Select any executed pipeline step on the left to inspect raw microservice headers and JSON payloads.
              </div>
            )}

            {/* Common Data Model Showcase */}
            {commonDataModel && (
              <div className="mt-4 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <Sparkles className="w-4 h-4" />
                    <span className="font-bold text-xs uppercase tracking-wider font-mono">
                      Generated Common Data Model (CDM)
                    </span>
                  </div>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-mono">
                    ISO-8601 & DPDP Standard
                  </span>
                </div>
                <pre className="p-3 bg-slate-950 rounded-xl text-cyan-300 text-xs font-mono overflow-x-auto max-h-56 leading-relaxed border border-slate-800">
                  {JSON.stringify(commonDataModel, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
