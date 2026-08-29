import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, PlusCircle, Clock, CheckCircle2, AlertCircle, 
  Send, RefreshCw, MessageSquare, ArrowRight, Shield 
} from 'lucide-react';
import { apiService } from '../../services/api';
import { Grievance } from '../../types';
import { getText } from '../../utils/localized';

interface CitizenGrievancesPageProps {
  onNavigate: (path: string) => void;
}

export const CitizenGrievancesPage: React.FC<CitizenGrievancesPageProps> = ({ onNavigate }) => {
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form
  const [department, setDepartment] = useState('Higher Education Department');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [applicationId, setApplicationId] = useState('');

  const loadGrievances = async () => {
    const data = await apiService.getGrievances();
    setGrievances(data);
    setLoading(false);
  };

  useEffect(() => {
    loadGrievances();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await apiService.createGrievance({
        department,
        subject,
        description,
        applicationId: applicationId || undefined
      });
      setShowModal(false);
      setSubject('');
      setDescription('');
      setApplicationId('');
      await loadGrievances();
    } catch (err: any) {
      alert('Failed to submit grievance');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
            <span>RTS Act Public Grievance Redressal</span>
            <span>•</span>
            <span>Time-Bound Resolution</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
            Unified Grievance Redressal Desk
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Submit inquiries or disputes regarding delays, data mismatch, or verification issues across any department. Every complaint is tracked with guaranteed SLAs.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-800 hover:bg-emerald-900 text-white px-5 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer whitespace-nowrap"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Lodge New Grievance</span>
        </button>
      </div>

      {/* Grievances List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Your Registered Grievances</h2>

        {loading ? (
          <div className="text-center py-12 text-slate-500">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-emerald-600 mb-2" />
            <p className="font-bold text-sm">Loading grievance ledger...</p>
          </div>
        ) : grievances.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center text-slate-500 text-xs space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <p className="font-bold text-slate-800">No active grievances</p>
            <p className="text-slate-400">All your public service requests are operating within SLA.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {grievances.map((g) => (
              <div key={g.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-extrabold bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
                      {g.id}
                    </span>
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full uppercase">
                      {g.status.replace('_', ' ')}
                    </span>
                  </div>

                  <span className="text-xs text-slate-400 font-mono">
                    Lodge Date: {new Date(g.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">{getText(g.subject || (g as any).title)}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{getText(g.department || (g as any).departmentName)}</p>
                </div>

                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                  {getText(g.description)}
                </p>

                {g.resolutionRemarks && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950">
                    <span className="font-bold block text-[11px] uppercase tracking-wider mb-0.5">Official Redressal Remarks:</span>
                    <p>{getText(g.resolutionRemarks)}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* New Grievance Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900">Lodge Official Grievance</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Target Department</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 font-medium"
                >
                  <option value="Higher Education Department">Higher Education Department</option>
                  <option value="Revenue & Land Records">Revenue & Land Records</option>
                  <option value="Transport Department">Transport Department</option>
                  <option value="Public Health Department">Public Health Department</option>
                  <option value="Social Welfare Department">Social Welfare Department</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Subject / Query Title</label>
                <input
                  type="text"
                  placeholder="e.g. Delay in verification of income certificate"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Related Application ID (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. APP-2025-001"
                  value={applicationId}
                  onChange={(e) => setApplicationId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  placeholder="Provide complete details regarding the grievance..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  {submitting ? 'Submitting...' : 'Submit Grievance'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
