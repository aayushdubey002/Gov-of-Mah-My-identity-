import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/portalData';
import { 
  X, 
  Smartphone, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  Fingerprint, 
  ArrowRight,
  User
} from 'lucide-react';

interface LoginModalProps {
  lang: Language;
  onClose: () => void;
  onLoginSuccess: (userName: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  lang,
  onClose,
  onLoginSuccess
}) => {
  const t = translations[lang];
  const [method, setMethod] = useState<'mobile' | 'aadhaar'>('mobile');
  const [mobileNum, setMobileNum] = useState('9822019482');
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('7492');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpStep(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess('Shrikant Deshmukh');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-[#0F5132] text-white p-6 relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-2xl">
              <ShieldCheck className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-200 uppercase tracking-widest">
                Maharashtra Single Sign-On (SSO)
              </span>
              <h3 className="text-lg font-black text-white">
                {lang === 'mr' ? 'नागरिक प्रवेश (Citizen Login)' : 'Citizen Login / Register'}
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

        {/* Content */}
        <div className="p-6 bg-slate-50 space-y-4">
          
          <div className="flex bg-slate-200/90 p-1.5 rounded-2xl text-sm font-extrabold font-['Outfit',sans-serif] shadow-inner gap-1">
            <button
              onClick={() => { setMethod('mobile'); setOtpStep(false); }}
              className={`flex-1 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                method === 'mobile'
                  ? 'bg-white text-emerald-950 shadow-sm font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-4 h-4 text-emerald-700" />
              <span>Mobile OTP</span>
            </button>
            <button
              onClick={() => { setMethod('aadhaar'); setOtpStep(false); }}
              className={`flex-1 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                method === 'aadhaar'
                  ? 'bg-white text-emerald-950 shadow-sm font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Fingerprint className="w-4 h-4 text-emerald-700" />
              <span>Aadhaar eKYC</span>
            </button>
          </div>

          {!otpStep ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {method === 'mobile' 
                    ? (lang === 'mr' ? 'मोबाईल क्रमांक प्रविष्ट करा' : 'Enter 10-digit Mobile Number')
                    : (lang === 'mr' ? '१२ अंकी आधार क्रमांक प्रविष्ट करा' : 'Enter 12-digit Aadhaar Number')}
                </label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="login-input"
                    type="text"
                    required
                    value={mobileNum}
                    onChange={(e) => setMobileNum(e.target.value)}
                    placeholder={method === 'mobile' ? '98220XXXXX' : 'XXXX-XXXX-XXXX'}
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm font-bold rounded-xl border border-slate-300 outline-none focus:border-emerald-600 bg-white"
                  />
                </div>
              </div>

              <button
                id="send-otp-btn"
                type="submit"
                className="w-full bg-[#0F5132] hover:bg-[#0b3d26] text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>{lang === 'mr' ? 'OTP पाठवा (Send OTP)' : 'Send Verification OTP'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4 animate-in fade-in">
              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs text-emerald-900">
                OTP sent to <strong>{mobileNum}</strong>. Use demo OTP: <strong>7492</strong>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Enter 4-digit OTP
                </label>
                <input
                  id="otp-input"
                  type="text"
                  required
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full text-center text-lg font-mono font-black py-2 rounded-xl border border-slate-300 outline-none focus:border-emerald-600 bg-white"
                />
              </div>

              <button
                id="verify-otp-btn"
                type="submit"
                className="w-full bg-[#0F5132] hover:bg-[#0b3d26] text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Verify & Login</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="pt-2 text-center">
            <button
              onClick={() => {
                onLoginSuccess('Guest Citizen');
                onClose();
              }}
              className="text-xs font-bold text-slate-500 hover:text-emerald-800 cursor-pointer"
            >
              Continue as Guest Citizen →
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
