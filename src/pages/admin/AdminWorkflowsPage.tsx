import React, { useState, useEffect } from 'react';
import { 
  Layers, GitBranch, CheckCircle2, ArrowRight, 
  Settings, RefreshCw, Activity 
} from 'lucide-react';
import { apiService } from '../../services/api';
import { getText, safeArray } from '../../utils/localized';

interface AdminWorkflowsPageProps {
  onNavigate: (path: string) => void;
}

export const AdminWorkflowsPage: React.FC<AdminWorkflowsPageProps> = ({ onNavigate }) => {
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.getAdminWorkflows().then((data) => {
      setWorkflows(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-purple-800 uppercase tracking-wider mb-1">
          <span>Workflow Orchestration Engine</span>
          <span>•</span>
          <span>BPMN & State Machines</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
          Configured Interoperability Workflows
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
          State machine pipelines orchestrating multi-department verification sequence, automated fallback rules, and RTS Act SLA enforcement.
        </p>
      </div>

      {/* Workflows List */}
      {loading ? (
        <div className="text-center py-12 text-slate-500">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-purple-600 mb-2" />
          <p className="font-bold text-sm">Loading workflow definitions...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {workflows.map((wf) => (
            <div key={wf.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold bg-purple-100 text-purple-900 px-2 py-0.5 rounded">
                      {wf.id}
                    </span>
                    <h2 className="text-base font-bold text-slate-900">{getText(wf.name)}</h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{getText(wf.department)}</p>
                </div>

                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full self-start sm:self-auto">
                  SLA: {wf.slaDays} Working Days
                </span>
              </div>

              {/* Visual State Machine Steps */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Orchestrated Sequence:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                  {safeArray(wf.steps).map((step: any, idx: number) => (
                    <div 
                      key={idx} 
                      className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center text-xs flex flex-col items-center justify-center space-y-1"
                    >
                      <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 font-bold text-[10px] flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="font-bold text-slate-800 text-[11px] leading-tight">{getText(step)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
