import React from 'react';

interface CategoryVisualIconProps {
  type: string;
  className?: string;
  size?: number;
}

export const CategoryVisualIcon: React.FC<CategoryVisualIconProps> = ({
  type,
  className = '',
  size = 72
}) => {
  // Return custom SVG illustrations for the category and department cards
  switch (type.toLowerCase()) {
    case 'agriculture':
    case 'agriculture & farmers':
    case 'tractor':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#ECFDF5" />
          {/* Green Hillocks */}
          <path d="M 10 75 Q 40 55 90 75 Z" fill="#A7F3D0" />
          {/* Tractor Body */}
          <rect x="35" y="44" width="38" height="22" rx="3" fill="#16A34A" />
          <rect x="52" y="28" width="18" height="20" rx="2" fill="#15803D" />
          {/* Exhaust */}
          <rect x="62" y="16" width="3" height="14" fill="#334155" />
          <path d="M 60 16 Q 63 10 68 12" stroke="#64748B" strokeWidth="2" fill="none" />
          {/* Big Rear Wheel */}
          <circle cx="34" cy="66" r="16" fill="#1E293B" stroke="#F1F5F9" strokeWidth="2.5" />
          <circle cx="34" cy="66" r="6" fill="#F59E0B" />
          {/* Front Wheel */}
          <circle cx="68" cy="70" r="10" fill="#1E293B" stroke="#F1F5F9" strokeWidth="2" />
          <circle cx="68" cy="70" r="4" fill="#F59E0B" />
          {/* Sprouting Plant */}
          <path d="M 78 48 Q 84 40 90 44 Q 84 50 78 48 Z" fill="#059669" />
        </svg>
      );

    case 'education':
    case 'school education':
    case 'books':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#EFF6FF" />
          {/* Stack of Colorful Books */}
          <rect x="25" y="65" width="50" height="10" rx="2" fill="#EA580C" />
          <rect x="25" y="53" width="50" height="10" rx="2" fill="#2563EB" />
          <rect x="28" y="41" width="44" height="10" rx="2" fill="#059669" />
          {/* White pages stripes */}
          <line x1="28" y1="67" x2="72" y2="67" stroke="#FFF" strokeWidth="1.5" />
          <line x1="28" y1="55" x2="72" y2="55" stroke="#FFF" strokeWidth="1.5" />
          {/* Graduation Cap at Top */}
          <polygon points="50,22 75,32 50,42 25,32" fill="#1E293B" />
          <rect x="42" y="38" width="16" height="8" fill="#0F172A" rx="1" />
          <path d="M 68 34 L 74 46" stroke="#D97706" strokeWidth="2" />
          <circle cx="74" cy="47" r="2.5" fill="#D97706" />
        </svg>
      );

    case 'land & property':
    case 'land, property & revenue':
    case 'home':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#ECFDF5" />
          {/* Traditional House + Green Plot */}
          <path d="M 12 78 Q 50 62 88 78 Z" fill="#6EE7B7" />
          <rect x="30" y="48" width="40" height="28" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
          {/* Roof */}
          <polygon points="50,26 76,48 24,48" fill="#DC2626" />
          {/* Door & Window */}
          <rect x="44" y="58" width="12" height="18" fill="#78350F" rx="1" />
          <rect x="58" y="52" width="8" height="8" fill="#60A5FA" />
          {/* 7/12 Stamp Stamp */}
          <circle cx="75" cy="40" r="12" fill="#059669" />
          <path d="M 70 40 L 74 44 L 80 36" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'transport':
    case 'transport & vehicles':
    case 'bus':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#FFFBEB" />
          {/* Yellow State Transport Bus */}
          <rect x="22" y="32" width="56" height="38" rx="6" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
          {/* Windshield & Windows */}
          <rect x="26" y="36" width="16" height="14" rx="2" fill="#E0F2FE" />
          <rect x="46" y="36" width="12" height="10" rx="1" fill="#E0F2FE" />
          <rect x="62" y="36" width="12" height="10" rx="1" fill="#E0F2FE" />
          {/* Red Stripe */}
          <rect x="22" y="54" width="56" height="4" fill="#DC2626" />
          {/* Headlights */}
          <circle cx="26" cy="62" r="3" fill="#FEF08A" />
          {/* Wheels */}
          <circle cx="34" cy="70" r="8" fill="#1E293B" stroke="#FFF" strokeWidth="2" />
          <circle cx="66" cy="70" r="8" fill="#1E293B" stroke="#FFF" strokeWidth="2" />
        </svg>
      );

    case 'health':
    case 'health & medical':
    case 'heart':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#FFF1F2" />
          {/* Red Heart & Stethoscope */}
          <path
            d="M 50 36 C 45 22 28 22 28 38 C 28 54 50 68 50 68 C 50 68 72 54 72 38 C 72 22 55 22 50 36 Z"
            fill="#E11D48"
          />
          {/* Medical Cross White */}
          <rect x="47" y="36" width="6" height="16" fill="#FFF" rx="1" />
          <rect x="42" y="41" width="16" height="6" fill="#FFF" rx="1" />
          {/* Stethoscope */}
          <path
            d="M 28 62 C 28 78, 68 84, 72 66"
            stroke="#475569"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="72" cy="66" r="4.5" fill="#94A3B8" stroke="#334155" strokeWidth="1.5" />
        </svg>
      );

    case 'police':
    case 'police & safety':
    case 'shield':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#EFF6FF" />
          {/* Police Badge / Star Shield */}
          <path
            d="M 50 20 L 76 32 V 54 C 76 70 50 82 50 82 C 50 82 24 70 24 54 V 32 Z"
            fill="#1D4ED8"
          />
          {/* Golden Star Inside */}
          <path
            d="M 50 34 L 54 44 L 64 45 L 56 52 L 59 62 L 50 56 L 41 62 L 44 52 L 36 45 L 46 44 Z"
            fill="#FBBF24"
          />
        </svg>
      );

    case 'jobs':
    case 'jobs & employment':
    case 'jobs, employment & skills':
    case 'briefcase':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#FAF5FF" />
          {/* Purple Executive Briefcase */}
          <rect x="24" y="38" width="52" height="38" rx="5" fill="#7E22CE" />
          {/* Handle */}
          <path d="M 40 38 V 28 C 40 25 60 25 60 28 V 38" stroke="#581C87" strokeWidth="4" fill="none" />
          {/* Metal Corner Accents & Lock */}
          <rect x="24" y="52" width="52" height="4" fill="#A855F7" />
          <rect x="46" y="50" width="8" height="8" rx="1.5" fill="#FBBF24" />
          <circle cx="50" cy="54" r="1.5" fill="#78350F" />
        </svg>
      );

    case 'ration':
    case 'ration & food':
    case 'food, ration & consumer':
    case 'sack':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#FFF7ED" />
          {/* Burlap Grain Sack + Wheat Grains */}
          <path
            d="M 32 38 Q 32 30 50 30 Q 68 30 68 38 C 72 50 74 76 68 76 C 58 78 42 78 32 76 C 26 76 28 50 32 38 Z"
            fill="#D97706"
          />
          {/* Rope around sack neck */}
          <path d="M 34 38 Q 50 42 66 38" stroke="#78350F" strokeWidth="2.5" />
          {/* Bowl of Rice / Grains */}
          <path d="M 52 62 Q 74 62 82 72 L 52 72 Z" fill="#FDE68A" />
          <circle cx="70" cy="58" r="2.5" fill="#F59E0B" />
          <circle cx="76" cy="59" r="2.5" fill="#F59E0B" />
          <circle cx="73" cy="55" r="2.5" fill="#F59E0B" />
        </svg>
      );

    case 'grid':
    case 'departments':
    case 'view more':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#F0FDF4" />
          {/* 4 App Grid Squares in Green */}
          <rect x="30" y="30" width="16" height="16" rx="4" fill="#16A34A" />
          <rect x="54" y="30" width="16" height="16" rx="4" fill="#22C55E" />
          <rect x="30" y="54" width="16" height="16" rx="4" fill="#22C55E" />
          <rect x="54" y="54" width="16" height="16" rx="4" fill="#16A34A" />
        </svg>
      );

    case 'women':
    case 'women & child development':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#FDF2F8" />
          <circle cx="50" cy="38" r="14" fill="#DB2777" />
          <path d="M 28 78 C 28 60 72 60 72 78 Z" fill="#BE185D" />
          <path d="M 44 48 Q 50 56 56 48" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'energy':
    case 'electricity & energy':
    case 'zap':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#FEFCE8" />
          <polygon points="56,18 28,52 48,52 42,82 72,44 52,44" fill="#EAB308" stroke="#CA8A04" strokeWidth="1.5" />
        </svg>
      );

    case 'water':
    case 'water & irrigation':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#ECFEFF" />
          <path d="M 50 20 C 50 20 25 55 25 68 C 25 82 36 84 50 84 C 64 84 75 82 75 68 C 75 55 50 20 50 20 Z" fill="#06B6D4" />
          <path d="M 42 55 Q 50 48 56 55" stroke="#FFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        </svg>
      );

    case 'legal':
    case 'legal & courts':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#FFFBEB" />
          <line x1="50" y1="24" x2="50" y2="76" stroke="#78350F" strokeWidth="4" />
          <line x1="24" y1="36" x2="76" y2="36" stroke="#78350F" strokeWidth="4" />
          <polygon points="24,36 14,56 34,56" fill="#D97706" />
          <polygon points="76,36 66,56 86,56" fill="#D97706" />
          <rect x="36" y="74" width="28" height="6" fill="#78350F" rx="2" />
        </svg>
      );

    case 'fisheries':
    case 'fisheries & coastal zone development':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#F0F9FF" />
          <path d="M 18 64 Q 50 78 82 64 L 75 74 Q 50 84 25 74 Z" fill="#0284C7" />
          <path d="M 48 28 C 65 30 78 44 78 44 C 78 44 65 58 48 60 C 35 55 24 44 24 44 C 24 44 35 32 48 28 Z" fill="#0EA5E9" />
          <polygon points="24,44 14,34 14,54" fill="#0284C7" />
          <circle cx="64" cy="40" r="2.5" fill="#FFF" />
        </svg>
      );

    default:
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#F1F5F9" />
          <rect x="30" y="32" width="40" height="38" rx="4" fill="#475569" />
          <rect x="36" y="40" width="28" height="6" fill="#94A3B8" rx="1" />
          <rect x="36" y="52" width="20" height="6" fill="#94A3B8" rx="1" />
        </svg>
      );
  }
};
