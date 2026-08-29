import React, { useState, useEffect } from 'react';
import { 
  UserCheck, Shield, CheckCircle2, RefreshCw, FileText, 
  Lock, Save, Database, Building2, ExternalLink, Key, Hash
} from 'lucide-react';
import { apiService } from '../../services/api';
import { CitizenProfile } from '../../types';

interface CitizenProfilePageProps {
  onNavigate: (path: string) => void;
}

export const CitizenProfilePage: React.FC<CitizenProfilePageProps> = ({ onNavigate }) => {
  const [profile, setProfile] = useState<CitizenProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('');
  const [annualIncome, setAnnualIncome] = useState<number>(180000);
  const [casteCategory, setCasteCategory] = useState('OBC');
  const [bankAccountNo, setBankAccountNo] = useState('');
  const [bankIfsc, setBankIfsc] = useState('');

  useEffect(() => {
    apiService.getProfile().then((data) => {
      setProfile(data);
      setFullName(data.fullName || '');
      setEmail(data.email || '');
      setPhone(data.phone || '');
      setAddress(data.address || '');
      setDistrict(data.district || 'Pune');
      setAnnualIncome(data.annualIncome || 180000);
      setCasteCategory(data.casteCategory || 'OBC');
      setBankAccountNo(data.bankAccountNo || '489201928392');
      setBankIfsc(data.bankIfsc || 'SBIN0001234');
      setLoading(false);
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg(null);

    try {
      const updated = await apiService.updateProfile({
        fullName,
        email,
        phone,
        address,
        district,
        annualIncome: Number(annualIncome),
        casteCategory,
        bankAccountNo,
        bankIfsc
      });
      setProfile(updated);
      setSuccessMsg('Master Citizen Profile updated! All future applications will auto-populate with this verified data.');
    } catch (err: any) {
      alert('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500">
        <RefreshCw className="w-8 h-8 animate-spin mx-auto text-emerald-600 mb-2" />
        <p className="font-bold text-sm">Loading Unified Master Profile from State Registry...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-2xl border border-emerald-300 shrink-0">
            {profile?.fullName ? profile.fullName.charAt(0) : 'R'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
                {profile?.fullName}
              </h1>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>KYC Verified</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Citizen ID: <strong className="text-slate-800">{profile?.citizenId}</strong> • State Central Registry
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('/citizen/consent')}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5 text-purple-700" />
            <span>Manage Department Permissions</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs text-emerald-950 font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main Grid: Profile Form + Verified Digital Document Vault */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form: Editable Master Information (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">Unified Demographic & Financial Details</h2>
            <p className="text-xs text-slate-500">
              Information entered here is stored once in the State Interoperability Data Hub and automatically pre-fills every application.
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Name (as per Aadhaar)</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden font-medium"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden font-medium"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Mobile Number (Linked to Aadhaar)</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden font-medium"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">District</label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Permanent Residential Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden font-medium"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Annual Family Income (₹)</label>
                <input
                  type="number"
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden font-medium"
                  required
                />
                <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
                  ✓ Verified by Revenue Dept (Tahasildar Office)
                </span>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Caste / Category</label>
                <select
                  value={casteCategory}
                  onChange={(e) => setCasteCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden font-medium"
                >
                  <option value="OPEN">General / Open</option>
                  <option value="OBC">Other Backward Class (OBC)</option>
                  <option value="SC">Scheduled Caste (SC)</option>
                  <option value="ST">Scheduled Tribe (ST)</option>
                  <option value="EWS">Economically Weaker Section (EWS)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div>
                <label className="font-bold text-slate-700 block mb-1">DBT Linked Bank Account</label>
                <input
                  type="text"
                  value={bankAccountNo}
                  onChange={(e) => setBankAccountNo(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden font-mono"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Bank IFSC Code</label>
                <input
                  type="text"
                  value={bankIfsc}
                  onChange={(e) => setBankIfsc(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden font-mono uppercase"
                  required
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={saving}
                className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {saving ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Synchronizing with Interoperability Hub...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save & Update Master Profile</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Vault: Verified Certificates & DigiLocker SHA-256 Hashes (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-700" />
                <h3 className="font-bold text-sm text-slate-900">Verified Document Vault</h3>
              </div>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                DigiLocker Connected
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              These digital credentials are cryptographically signed by official department certificate authorities. Officers verify the hash instantly.
            </p>

            <div className="space-y-3 text-xs">
              {profile?.verifiedDocuments.map((doc, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{doc.documentType}</span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{doc.status}</span>
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-600">
                    <p>Doc ID: <span className="font-mono font-bold text-slate-800">{doc.documentNumber}</span></p>
                    <p>Issuer: {doc.issuedBy} ({doc.issuedDate})</p>
                  </div>

                  <div className="pt-1 text-[10px] text-slate-400 font-mono flex items-center gap-1 truncate">
                    <Hash className="w-3 h-3 shrink-0 text-slate-400" />
                    <span className="truncate">{doc.verificationHash}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Interoperability Explanation Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md border border-slate-800 space-y-3 text-xs">
            <h4 className="font-bold text-emerald-400 text-sm flex items-center gap-1.5 font-serif">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>How Interoperability Works</span>
            </h4>
            <p className="text-slate-300 leading-relaxed">
              When applying for a new benefit (like a Post-Matric Scholarship or Business License), the system queries these verified document hashes via the <strong>Common Data Model API</strong> without asking you to scan paper documents.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
