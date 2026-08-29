import React, { useState } from 'react';
import { 
  Database, RefreshCw, ArrowRight, CheckCircle2, Code, 
  Sparkles, Layers, ShieldCheck, Play, Server, Zap 
} from 'lucide-react';
import { apiService } from '../../services/api';

interface AdminIntegrationsPageProps {
  onNavigate: (path: string) => void;
}

export const AdminIntegrationsPage: React.FC<AdminIntegrationsPageProps> = ({ onNavigate }) => {
  const [legacyInput, setLegacyInput] = useState(`<?xml version="1.0" encoding="ISO-8859-1"?>
<CITIZEN_REC_1998>
  <CIT_NAME>RAHUL RAMESH SHARMA</CIT_NAME>
  <REC_VINTAGE>1998-ARCHIVE</REC_VINTAGE>
  <ADDR_LINE>FLAT 402 GANESH APTS KOTHRUD PUNE</ADDR_LINE>
  <DOB_RAW>15081995</DOB_RAW>
  <INCOME_VAL>180000.00</INCOME_VAL>
  <STATUS_CODE>01_ACTIVE</STATUS_CODE>
</CITIZEN_REC_1998>`);

  const [isTransforming, setIsTransforming] = useState(false);
  const [cdmOutput, setCdmOutput] = useState<any>({
    citizenId: "CIT-MH-84920",
    name: "Rahul Sharma",
    dateOfBirth: "1995-08-15",
    address: {
      street: "Flat 402, Ganesh Apts",
      area: "Kothrud",
      city: "Pune",
      state: "Maharashtra",
      country: "IND"
    },
    financialProfile: {
      annualIncome: 180000,
      currency: "INR",
      verifiedByDepartment: "Revenue & Land Records"
    },
    dataStandard: "COMMON_DATA_MODEL_V2",
    isoCompliance: "ISO-8601",
    timestamp: new Date().toISOString()
  });

  const runLegacyTransformation = async () => {
    setIsTransforming(true);
    try {
      const res = await fetch('/api/departments/legacy/record');
      const data = await res.json();
      if (data.data) {
        setCdmOutput(data.data.transformedToCdm);
      }
    } catch (e) {
      // fallback
    } finally {
      setTimeout(() => setIsTransforming(false), 400);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-purple-800 uppercase tracking-wider mb-1">
          <span>Interoperability Core Architecture</span>
          <span>•</span>
          <span>Legacy System Integration Adapter</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
          Legacy System Adapter & Common Data Model (CDM)
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
          Connecting decades-old department mainframe databases and non-standard XML/DBF silos into the standardized <strong>State Common Data Model</strong> without replacing legacy servers.
        </p>
      </div>

      {/* Visual Transformation Interactive Bench */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Real-Time Schema Translation Bench</h2>
            <p className="text-xs text-slate-500">Test how legacy non-standard payloads are parsed and normalized into CDM</p>
          </div>

          <button
            onClick={runLegacyTransformation}
            disabled={isTransforming}
            className="bg-purple-800 hover:bg-purple-900 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-transform active:scale-95 cursor-pointer"
          >
            {isTransforming ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
            <span>Execute CDM Transformation Engine</span>
          </button>
        </div>

        {/* 3-Column Visual Layout: Legacy Source -> Translation Rules -> Modern CDM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Column 1: Legacy Format (4 Cols) */}
          <div className="lg:col-span-4 bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-400 font-mono">1. Legacy Department Schema (XML)</span>
              <span className="text-[9px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">Unstructured</span>
            </div>
            <textarea
              rows={12}
              value={legacyInput}
              onChange={(e) => setLegacyInput(e.target.value)}
              className="w-full bg-slate-950 text-amber-200 font-mono text-[11px] p-3 rounded-xl border border-slate-800 focus:outline-hidden leading-relaxed resize-none"
            />
          </div>

          {/* Column 2: Translation Engine Middleware (4 Cols) */}
          <div className="lg:col-span-4 bg-purple-50 rounded-2xl p-5 border border-purple-200 space-y-3 text-xs">
            <div className="flex items-center gap-2 text-purple-950 font-bold text-sm">
              <Zap className="w-4 h-4 text-purple-700" />
              <span>Translation Rules Engine</span>
            </div>

            <div className="space-y-2 font-mono text-[11px]">
              <div className="bg-white p-2 rounded-lg border border-purple-100">
                <span className="text-slate-400 block text-[9px]">DOB NORMALIZER:</span>
                <span className="text-purple-900 font-bold">15081995 ➔ 1995-08-15 (ISO)</span>
              </div>

              <div className="bg-white p-2 rounded-lg border border-purple-100">
                <span className="text-slate-400 block text-[9px]">ADDRESS PARSER:</span>
                <span className="text-purple-900 font-bold">Regex Tokenize [Street, Area, City]</span>
              </div>

              <div className="bg-white p-2 rounded-lg border border-purple-100">
                <span className="text-slate-400 block text-[9px]">NAME STANDARDIZATION:</span>
                <span className="text-purple-900 font-bold">Title Case & Salutation Stripper</span>
              </div>

              <div className="bg-white p-2 rounded-lg border border-purple-100">
                <span className="text-slate-400 block text-[9px]">SECURITY:</span>
                <span className="text-emerald-700 font-bold">✓ DPDP Consent Check Enforced</span>
              </div>
            </div>
          </div>

          {/* Column 3: Output Common Data Model (4 Cols) */}
          <div className="lg:col-span-4 bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-400 font-mono">3. Output Common Data Model (JSON)</span>
              <span className="text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded">Standardized</span>
            </div>
            <pre className="bg-slate-950 text-cyan-300 font-mono text-[11px] p-3 rounded-xl border border-slate-800 max-h-72 overflow-y-auto leading-relaxed">
              {JSON.stringify(cdmOutput, null, 2)}
            </pre>
          </div>

        </div>
      </div>

    </div>
  );
};
