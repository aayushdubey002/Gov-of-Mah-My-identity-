import React from 'react';
import { 
  Building2, Shield, CheckCircle2, ArrowRight, Activity, 
  Sparkles, Lock, Database, Layers, UserCheck, FileText, Globe 
} from 'lucide-react';
import { useAuth, DEMO_ACCOUNTS } from '../context/AuthContext';
import { UserRole } from '../types';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { switchRole } = useAuth();

  const handleQuickLogin = async (role: UserRole) => {
    await switchRole(role);
    if (role === 'citizen') onNavigate('/citizen/dashboard');
    else if (role === 'officer') onNavigate('/officer/dashboard');
    else if (role === 'admin') onNavigate('/admin/dashboard');
  };

  return (
    <div className="space-y-16 py-8">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#0F5132] via-[#0D4329] to-[#0A3622] text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-emerald-600/30">
          <div className="relative z-10 max-w-3xl space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-400/20 border border-emerald-400/30 text-emerald-200 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>SIH 26129 • Maharashtra Interoperability Framework</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight font-serif leading-[1.1]">
              माझी ओळख <br />
              <span className="text-emerald-300 text-2xl sm:text-4xl lg:text-5xl font-sans font-extrabold">
                One Citizen Profile. 25 Connected Departments.
              </span>
            </h1>

            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
              Solving government data silos through a high-throughput Interoperability Middleware Layer. Enter your details once; automatically apply, verify, and track benefits across every department without duplicate paperwork.
            </p>

            {/* Quick Portal Launchers */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => onNavigate('/citizen/dashboard')}
                className="bg-white text-emerald-950 hover:bg-emerald-50 px-6 py-3.5 rounded-xl font-black text-sm shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
              >
                <span>Enter Citizen Portal</span>
                <ArrowRight className="w-4 h-4 text-emerald-800" />
              </button>

              <button
                onClick={() => onNavigate('/citizen/services')}
                className="bg-emerald-800/90 hover:bg-emerald-700 text-white border border-emerald-500/50 px-6 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Explore 25+ Online Services</span>
              </button>
            </div>

          </div>

          <div className="absolute right-[-40px] bottom-[-40px] opacity-10 pointer-events-none">
            <Building2 className="w-96 h-96 text-white" />
          </div>
        </div>
      </section>

      {/* 3 User Persona Direct Access Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
            Single Sign-On (SSO) Role Personas
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
            Select Your Role to Test Live Interoperability
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Instant 1-click access to test all 3 personas without manually typing passwords.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Citizen Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:shadow-xl hover:border-emerald-500 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <UserCheck className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 font-serif">Citizen Portal</h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">citizen@demo.com</p>
              </div>

              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Unified Citizen Master Profile</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Pre-filled applications across 25 depts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>7-Step Unified Tracking & Certificates</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>DPDP Act Consent Manager</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleQuickLogin('citizen')}
              className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Login as Citizen (Rahul Sharma)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Officer Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:shadow-xl hover:border-amber-500 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 font-serif">Desk Officer Console</h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">officer@demo.com</p>
              </div>

              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Consolidated Application Dossier</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Automated API Verification Checks</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Approve, Reject & Correction Requests</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Digitally Signed Certificate Issuance</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleQuickLogin('officer')}
              className="w-full py-3 bg-amber-800 hover:bg-amber-900 text-white font-bold rounded-xl text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Login as Officer (Rajesh Deshmukh)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Admin Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:shadow-xl hover:border-purple-500 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-900 flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 font-serif">System Administrator</h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">admin@demo.com</p>
              </div>

              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Real-Time API Ingress & Recharts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Legacy System Adapter & CDM Mapper</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>API Logs with Failed Request Retries</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Statewide Security Audit Trail</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleQuickLogin('admin')}
              className="w-full py-3 bg-purple-900 hover:bg-purple-950 text-white font-bold rounded-xl text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Login as Admin (S. K. Nandanwar)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* Real Problems Solved Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Core Mission & Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-white">
              Connecting Existing Systems Instead of Replacing Them
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Addressing the 6 structural bottlenecks in contemporary public service delivery:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <span className="font-bold text-emerald-300 text-sm block">1. No Repeated Submissions</span>
              <p className="text-slate-300 leading-relaxed">
                Citizens enter details once into the Unified Profile. All subsequent schemes auto-pull verified records via API Setu & State Registry.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <span className="font-bold text-emerald-300 text-sm block">2. Single Window Access</span>
              <p className="text-slate-300 leading-relaxed">
                Eliminates the need to navigate 25+ disconnected department websites with separate login credentials.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <span className="font-bold text-emerald-300 text-sm block">3. 7-Step Unified Tracking</span>
              <p className="text-slate-300 leading-relaxed">
                Real-time visibility across Revenue, Education, and Transport verifications in a single consolidated timeline.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <span className="font-bold text-emerald-300 text-sm block">4. Interoperable Data Standards</span>
              <p className="text-slate-300 leading-relaxed">
                The Common Data Model (CDM) standardizes heterogeneous department databases without forcing costly database rewrites.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <span className="font-bold text-emerald-300 text-sm block">5. Consolidated Officer View</span>
              <p className="text-slate-300 leading-relaxed">
                Desk officers receive pre-calculated, automated API verification reports for fast and corruption-free scrutiny.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <span className="font-bold text-emerald-300 text-sm block">6. Legacy Adapter Middleware</span>
              <p className="text-slate-300 leading-relaxed">
                Seamlessly bridges decades-old XML/DBF legacy systems with modern RESTful cloud microservices.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
