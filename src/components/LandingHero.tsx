import React from 'react';
import { motion } from 'motion/react';
import { MajhiOlakhLogo } from './MajhiOlakhLogo';
import { Language } from '../types';
import { translations } from '../data/portalData';
import { ArrowRight, Globe, ShieldCheck, Sparkles, Building2, Landmark, CheckCircle } from 'lucide-react';

interface LandingHeroProps {
  onStart: () => void;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onStart,
  lang,
  onLanguageChange
}) => {
  const t = translations[lang];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-linear-to-b from-amber-50/70 via-sky-50/50 to-emerald-50/80 flex flex-col justify-between">
      {/* Dynamic Background Illustration Scene */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        {/* Soft Golden Sunlight & Sky Atmosphere */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-gradient-radial from-amber-200/50 via-sky-200/20 to-transparent blur-3xl opacity-70" />

        {/* Scenic Illustrated Panorama Canvas Overlay */}
        <svg
          className="absolute inset-0 w-full h-full object-cover opacity-85"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#87CEEB" stopOpacity="0.4" />
              <stop offset="40%" stopColor="#FFF9E6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#E6F4EA" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="hillGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#A8D5BA" />
              <stop offset="100%" stopColor="#4D8C57" />
            </linearGradient>
            <linearGradient id="hillGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8FC29B" />
              <stop offset="100%" stopColor="#30683B" />
            </linearGradient>
            <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="goldDome" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
          </defs>

          {/* Distant Sahyadri Mountain Silhouettes */}
          <path
            d="M 0 380 Q 200 240, 420 340 T 840 290 Q 1100 220, 1440 330 L 1440 900 L 0 900 Z"
            fill="url(#hillGrad1)"
            opacity="0.35"
          />

          {/* Wind Turbines on Sahyadri Ridge */}
          <g stroke="#64748B" strokeWidth="2" opacity="0.6" transform="translate(360, 240)">
            <line x1="0" y1="0" x2="0" y2="70" />
            <circle cx="0" cy="0" r="3" fill="#64748B" />
            <line x1="0" y1="0" x2="-25" y2="-20" />
            <line x1="0" y1="0" x2="25" y2="-20" />
            <line x1="0" y1="0" x2="0" y2="30" />
          </g>
          <g stroke="#64748B" strokeWidth="1.5" opacity="0.5" transform="translate(420, 270) scale(0.7)">
            <line x1="0" y1="0" x2="0" y2="70" />
            <circle cx="0" cy="0" r="3" fill="#64748B" />
            <line x1="0" y1="0" x2="-25" y2="-20" />
            <line x1="0" y1="0" x2="25" y2="-20" />
          </g>

          {/* Rolling Agricultural Farmlands */}
          <path
            d="M 0 470 Q 280 430, 600 500 T 1440 480 L 1440 900 L 0 900 Z"
            fill="url(#hillGrad2)"
            opacity="0.45"
          />

          {/* Heritage Architectural Skyline Right (Temple Spire + Gateway of India + Train Viaduct) */}
          <g transform="translate(980, 160)" opacity="0.65">
            {/* Heritage Temple Shikhara */}
            <path d="M 60 220 L 75 80 L 90 220 Z" fill="#D97706" opacity="0.8" />
            <path d="M 75 80 L 75 55" stroke="#D97706" strokeWidth="3" />
            {/* Saffron Flag */}
            <path d="M 75 55 L 105 65 L 75 75 Z" fill="#EA580C" />
            <circle cx="75" cy="52" r="3.5" fill="#F59E0B" />

            {/* Gateway of India / Fort Arch Silhouette */}
            <rect x="180" y="120" width="160" height="150" fill="#B45309" rx="4" opacity="0.75" />
            <path d="M 220 270 L 220 180 Q 260 140 300 180 L 300 270 Z" fill="#FFF9E6" />
            <circle cx="210" cy="110" r="14" fill="#D97706" />
            <circle cx="310" cy="110" r="14" fill="#D97706" />

            {/* Railway Arch Bridge */}
            <g transform="translate(-160, 210)">
              <rect x="0" y="30" width="220" height="12" fill="#475569" />
              <path d="M 10 42 A 20 20 0 0 1 50 42 L 50 70 L 10 70 Z" fill="#64748B" opacity="0.6" />
              <path d="M 60 42 A 20 20 0 0 1 100 42 L 100 70 L 60 70 Z" fill="#64748B" opacity="0.6" />
              <path d="M 110 42 A 20 20 0 0 1 150 42 L 150 70 L 110 70 Z" fill="#64748B" opacity="0.6" />
              {/* Heritage Train Silhouette */}
              <rect x="40" y="8" width="60" height="22" fill="#B91C1C" rx="2" />
              <rect x="105" y="12" width="45" height="18" fill="#D97706" rx="2" />
              <circle cx="50" cy="30" r="4" fill="#1E293B" />
              <circle cx="70" cy="30" r="4" fill="#1E293B" />
              <circle cx="90" cy="30" r="4" fill="#1E293B" />
            </g>
          </g>

          {/* Left Foreground: Farmer on Red Tractor & Rural Greenery */}
          <g transform="translate(60, 480)" opacity="0.85">
            {/* Red Tractor Silhouette */}
            <rect x="100" y="90" width="85" height="50" fill="#DC2626" rx="6" />
            <rect x="150" y="55" width="28" height="40" fill="#B91C1C" rx="3" />
            {/* Exhaust Pipe */}
            <line x1="168" y1="55" x2="168" y2="25" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
            {/* Big Rear Wheel */}
            <circle cx="85" cy="140" r="38" fill="#1E293B" stroke="#CBD5E1" strokeWidth="5" />
            <circle cx="85" cy="140" r="16" fill="#DC2626" />
            {/* Front Small Wheel */}
            <circle cx="180" cy="150" r="22" fill="#1E293B" stroke="#CBD5E1" strokeWidth="4" />
            <circle cx="180" cy="150" r="8" fill="#DC2626" />
            {/* Farmer in White Kurta & Pheta / Turban */}
            <circle cx="115" cy="55" r="10" fill="#FDE68A" />
            <circle cx="116" cy="50" r="12" fill="#EA580C" opacity="0.9" /> {/* Orange Pheta */}
            <path d="M 105 68 Q 115 65 125 68 L 125 100 L 105 100 Z" fill="#FFFFFF" />
          </g>

          {/* River Stream Bottom-Left (Fisherman + Net + Water) */}
          <path
            d="M 0 680 Q 200 660, 400 710 T 800 720 L 800 900 L 0 900 Z"
            fill="url(#waterGrad)"
            opacity="0.75"
          />
          {/* River Ripple Lines */}
          <path d="M 60 740 Q 140 730 220 740" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <path d="M 180 780 Q 280 770 380 780" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
          <path d="M 40 820 Q 120 810 200 820" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.7" />

          {/* Fisherman Wooden Boat & Net Silhouette */}
          <g transform="translate(100, 710)" opacity="0.9">
            <path d="M 0 45 Q 60 65 140 45 L 125 65 Q 60 75 15 65 Z" fill="#78350F" />
            {/* Fisherman */}
            <circle cx="50" cy="24" r="8" fill="#D97706" />
            <path d="M 42 32 L 58 32 L 62 50 L 38 50 Z" fill="#F8FAFC" />
            {/* Fishing Net Arc */}
            <path d="M 65 30 Q 120 15 160 55" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
            <path d="M 65 30 Q 100 45 130 65" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
          </g>

          {/* Bottom-Right: Vidhan Bhavan / Supreme Court Dome & Scales of Justice */}
          <g transform="translate(1100, 500)" opacity="0.9">
            {/* Government Court Dome */}
            <path d="M 80 180 Q 160 40 240 180 Z" fill="url(#goldDome)" />
            {/* Dome Spire with Indian Flag */}
            <line x1="160" y1="40" x2="160" y2="0" stroke="#475569" strokeWidth="3" />
            {/* Tiranga Flag */}
            <rect x="160" y="0" width="36" height="8" fill="#FF9933" />
            <rect x="160" y="8" width="36" height="8" fill="#FFFFFF" />
            <rect x="160" y="16" width="36" height="8" fill="#138808" />
            <circle cx="178" cy="12" r="3" fill="#000080" />

            {/* Pillar Portico */}
            <rect x="60" y="180" width="200" height="24" fill="#FEF3C7" stroke="#D97706" />
            <line x1="80" y1="204" x2="80" y2="280" stroke="#D97706" strokeWidth="8" />
            <line x1="120" y1="204" x2="120" y2="280" stroke="#D97706" strokeWidth="8" />
            <line x1="160" y1="204" x2="160" y2="280" stroke="#D97706" strokeWidth="8" />
            <line x1="200" y1="204" x2="200" y2="280" stroke="#D97706" strokeWidth="8" />
            <line x1="240" y1="204" x2="240" y2="280" stroke="#D97706" strokeWidth="8" />

            {/* Scales of Justice in Golden Glow */}
            <g transform="translate(30, 210)" stroke="#B45309" strokeWidth="2.5" fill="none">
              <line x1="40" y1="10" x2="40" y2="70" />
              <line x1="15" y1="20" x2="65" y2="20" strokeWidth="3" />
              <path d="M 15 20 L 5 45 L 25 45 Z" fill="#F59E0B" />
              <path d="M 65 20 L 55 45 L 75 45 Z" fill="#F59E0B" />
            </g>
          </g>

          {/* Center-Bottom: School Children Studying & Peacock */}
          <g transform="translate(720, 640)" opacity="0.85">
            {/* Boy & Girl Student Reading */}
            <circle cx="40" cy="80" r="14" fill="#FDE68A" />
            <rect x="25" y="95" width="30" height="35" fill="#3B82F6" rx="4" />
            <rect x="22" y="105" width="22" height="15" fill="#FFFFFF" stroke="#334155" /> {/* Book */}

            <circle cx="85" cy="88" r="13" fill="#FDE68A" />
            <rect x="72" y="102" width="26" height="30" fill="#EC4899" rx="4" />
            <rect x="78" y="110" width="20" height="14" fill="#FFFFFF" stroke="#334155" /> {/* Book */}

            {/* Peacock in Foreground */}
            <g transform="translate(-80, 50)">
              <ellipse cx="20" cy="30" rx="14" ry="8" fill="#0284C7" />
              <circle cx="30" cy="22" r="5" fill="#0369A1" />
              <path d="M 8 30 Q -25 15 -10 50 Q 5 45 10 32 Z" fill="#059669" />
              <circle cx="-12" cy="28" r="3" fill="#0284C7" />
              <circle cx="-5" cy="40" r="3" fill="#0284C7" />
            </g>
          </g>
        </svg>

        {/* Tree Foliage Frame at Top Edges */}
        <div className="absolute top-0 left-0 w-96 h-64 bg-radial from-emerald-800/20 via-emerald-900/10 to-transparent blur-2xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-64 bg-radial from-emerald-800/20 via-emerald-900/10 to-transparent blur-2xl pointer-events-none" />
      </div>

      {/* Centerpiece Hero Title & Glowing Start Button (Exact layout of landing page.jpeg) */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 my-auto py-10 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col items-center max-w-2xl"
        >
          {/* Official Emblem Logo */}
          <div className="mb-4">
            <MajhiOlakhLogo size={110} showText={false} />
          </div>

          {/* Main Large Devanagari Title matching screenshot */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#192238] tracking-tight font-['Tiro_Devanagari_Marathi',serif] drop-shadow-md select-none leading-tight">
            माझी ओळख
          </h1>

          {/* Ornamental Subtitle flourish */}
          <div className="flex items-center gap-3 my-2 text-amber-900 font-semibold">
            <span className="text-lg text-emerald-800 font-serif">❧</span>
            <span className="text-2xl sm:text-3xl font-bold tracking-wide font-['Outfit',sans-serif] text-slate-800">
              My Identity
            </span>
            <span className="text-lg text-emerald-800 font-serif">❧</span>
          </div>

          <p className="text-base sm:text-lg text-slate-700 font-medium max-w-lg mb-8 drop-shadow-xs bg-white/60 backdrop-blur-xs px-4 py-1.5 rounded-full border border-amber-200/60 mt-2">
            {lang === 'mr' && 'सर्व १२५०+ शासकीय सेवा एकाच ठिकाणी'}
            {lang === 'hi' && 'सभी 1250+ सरकारी सेवाएं एक ही जगह'}
            {lang === 'en' && '1200+ Government Services, One Digital Platform'}
          </p>

          {/* Iconic Frosted Glass "Start" Pill Button with Soft Glow */}
          <motion.button
            id="landing-start-button"
            onClick={onStart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative cursor-pointer px-16 sm:px-20 py-4 sm:py-5 rounded-full bg-linear-to-b from-white/90 to-amber-50/80 backdrop-blur-md text-emerald-950 font-extrabold text-2xl sm:text-3xl tracking-wide shadow-xl hover:shadow-2xl border-2 border-white/90 hover:border-amber-400 transition-all duration-300 flex items-center gap-4"
            style={{
              boxShadow: '0 10px 30px -5px rgba(217, 119, 6, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.8)'
            }}
          >
            <span className="font-['Outfit',sans-serif] font-bold text-[#1E3A2B] group-hover:text-emerald-900">
              {t.startPortal}
            </span>
            <ArrowRight className="w-7 h-7 text-emerald-800 transition-transform duration-300 group-hover:translate-x-2" />
          </motion.button>

          {/* Decorative Divider beneath button matching image */}
          <div className="flex items-center gap-3 mt-6 text-amber-800/80">
            <div className="w-12 h-px bg-amber-700/40" />
            <Sparkles className="w-4 h-4 text-amber-700" />
            <div className="w-12 h-px bg-amber-700/40" />
          </div>
        </motion.div>
      </main>

      {/* Bottom Highlights & Quick Navigation */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-300/40 bg-white/70 backdrop-blur-md rounded-t-3xl shadow-sm">
        <div className="flex items-center gap-6 text-xs sm:text-sm font-semibold text-slate-700">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>1200+ {t.statsServicesLabel}</span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-600" />
            <span>25+ {t.departments}</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>{lang === 'mr' ? 'आरोग्य, महसूल, शिक्षण, कृषी' : 'Revenue, Health, Agri, Transport'}</span>
          </div>
        </div>

        <button
          id="landing-explore-direct"
          onClick={onStart}
          className="text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 underline underline-offset-4 flex items-center gap-1.5 cursor-pointer"
        >
          {t.exploreDepartments} →
        </button>
      </footer>
    </div>
  );
};
