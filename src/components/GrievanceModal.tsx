import React, { useState } from 'react';
import { Language } from '../types';
import { translations, departmentsData, sampleGrievances } from '../data/portalData';
import { getText } from '../utils/localized';
import { 
  X, 
  MessageSquareWarning, 
  CheckCircle2, 
  AlertCircle, 
  Upload, 
  FileText, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

interface GrievanceModalProps {
  lang: Language;
  onClose: () => void;
}

export const GrievanceModal: React.FC<GrievanceModalProps> = ({
  lang,
  onClose
}) => {
  const t = translations[lang];
  const [tab, setTab] = useState<'new' | 'history'>('new');
  const [department, setDepartment] = useState('Revenue & Land');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [applicantName, setApplicantName] = useState('Vijay Patil');
  const [mobile, setMobile] = useState('9822019482');
  const [submittedToken, setSubmittedToken] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = `MH-GRV-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setSubmittedToken(token);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-800 to-rose-900 text-white p-6 relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-2xl">
              <MessageSquareWarning className="w-6 h-6 text-rose-200" />
            </div>
            <div>
              <span className="text-xs font-bold text-rose-200 uppercase tracking-widest">
                CM Grievance Redressal (आपले सरकार तक्रार)
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                {t.fileComplaint}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-200 bg-slate-100/70 px-6 pt-3 gap-2">
          <button
            onClick={() => { setTab('new'); setSubmittedToken(null); }}
            className={`pb-3 px-4 text-sm sm:text-[15px] font-bold font-['Outfit',sans-serif] tracking-wide transition-all cursor-pointer border-b-2 flex items-center gap-2 ${
              tab === 'new'
                ? 'border-red-600 text-red-950 font-black bg-white rounded-t-xl shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquareWarning className="w-4 h-4 text-red-700 shrink-0" />
            <span>{lang === 'mr' ? 'नवीन तक्रार नोंदवा' : 'Register New Grievance'}</span>
          </button>
          <button
            onClick={() => setTab('history')}
            className={`pb-3 px-4 text-sm sm:text-[15px] font-bold font-['Outfit',sans-serif] tracking-wide transition-all cursor-pointer border-b-2 flex items-center gap-2 ${
              tab === 'history'
                ? 'border-red-600 text-red-950 font-black bg-white rounded-t-xl shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4 text-red-700 shrink-0" />
            <span>{lang === 'mr' ? 'मागील तक्रारींची स्थिती' : 'Previous Grievances'}</span>
            <span className="ml-1 px-2 py-0.5 text-xs bg-red-100 text-red-800 rounded-full font-black">2</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50">
          {tab === 'new' && !submittedToken && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      {lang === 'mr' ? 'नागरिकाचे नाव' : 'Citizen Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none focus:border-red-600"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      {lang === 'mr' ? 'मोबाईल क्रमांक' : 'Mobile Number'}
                    </label>
                    <input
                      type="text"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none focus:border-red-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    {lang === 'mr' ? 'संबंधित शासकीय विभाग' : 'Concerned Government Department'}
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none bg-white font-semibold"
                  >
                    {departmentsData.map(d => (
                      <option key={d.id} value={getText(d.title, lang)}>{d.number}. {getText(d.title, lang)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    {lang === 'mr' ? 'तक्रारीचा विषय (Subject)' : 'Subject / Issue Heading'}
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={lang === 'mr' ? 'उदा. ट्रान्सफॉर्मर जळाला, रेशन धान्य वाटपात अडचण...' : 'e.g. Delay in issuing 7/12 extract or water pipeline leak'}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    {lang === 'mr' ? 'तक्रारीचा सविस्तर तपशील' : 'Detailed Grievance Description'}
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={lang === 'mr' ? 'तक्रारीचे सविस्तर वर्णन, गावाचे नाव व तारीख लिहा...' : 'Provide complete incident background, location, and dates...'}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none focus:border-red-600"
                  />
                </div>

              </div>

              <button
                id="submit-grievance-btn"
                type="submit"
                className="w-full bg-red-700 hover:bg-red-800 text-white py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors"
              >
                <span>{lang === 'mr' ? 'तक्रार दाखल करा (Register Grievance)' : 'Submit Official Grievance'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {tab === 'new' && submittedToken && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 text-center space-y-4 animate-in zoom-in-95">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-black text-slate-900">
                {lang === 'mr' ? 'तक्रार यशस्वीरित्या नोंदवली गेली!' : 'Grievance Successfully Registered!'}
              </h4>
              <p className="text-xs text-slate-600">
                Grievance Tracking Token: <span className="font-bold text-red-700 font-mono text-sm">{submittedToken}</span>
              </p>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {lang === 'mr'
                  ? 'सदर तक्रार संबंधित तालुका/जिल्हास्तरीय नोडल अधिकाऱ्यांकडे वर्ग करण्यात आली असून २१ दिवसांत निवारण केले जाईल.'
                  : 'Assigned to District Nodal Officer under RTS Grievance Rules for resolution within 21 working days.'}
              </p>
              <button
                onClick={() => setSubmittedToken(null)}
                className="px-6 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                File Another Complaint
              </button>
            </div>
          )}

          {tab === 'history' && (
            <div className="space-y-3">
              {sampleGrievances.map((grv) => (
                <div key={grv.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                      {grv.id}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      grv.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                    }`}>
                      {grv.status}
                    </span>
                  </div>
                  <h5 className="font-bold text-xs text-slate-900">{getText(grv.subject, lang)}</h5>
                  <p className="text-[11px] text-slate-500">{getText(grv.department, lang)} • Filed on {grv.date}</p>
                  <div className="bg-slate-50 p-2.5 rounded-xl text-[11px] text-slate-700 border border-slate-100">
                    <span className="font-bold text-slate-900">Officer Action: </span>
                    {getText(grv.officerRemarks, lang)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
