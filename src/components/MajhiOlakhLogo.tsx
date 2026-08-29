import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textColor?: string;
  variant?: 'full' | 'icon-only' | 'horizontal';
}

export const MajhiOlakhLogo: React.FC<LogoProps> = ({
  className = '',
  size = 56,
  showText = true,
  variant = 'horizontal'
}) => {
  const Emblem = (
    <div 
      className="relative flex items-center justify-center rounded-full shrink-0 select-none transition-transform duration-300 hover:scale-105"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients matching the artwork */}
          <radialGradient id="discBg" cx="45%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#FBFBFA" />
            <stop offset="100%" stopColor="#EFECE6" />
          </radialGradient>

          <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D89A32" />
            <stop offset="50%" stopColor="#B3781A" />
            <stop offset="100%" stopColor="#DFA745" />
          </linearGradient>

          <linearGradient id="blueBody" x1="20%" y1="15%" x2="80%" y2="90%">
            <stop offset="0%" stopColor="#134B9E" />
            <stop offset="45%" stopColor="#0E387A" />
            <stop offset="100%" stopColor="#09204E" />
          </linearGradient>

          <linearGradient id="goldLoop" x1="20%" y1="10%" x2="90%" y2="90%">
            <stop offset="0%" stopColor="#E5AB35" />
            <stop offset="45%" stopColor="#C98B1B" />
            <stop offset="100%" stopColor="#8A6715" />
          </linearGradient>

          <linearGradient id="leafGreenLeft" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E6E34" />
            <stop offset="100%" stopColor="#34A352" />
          </linearGradient>

          <linearGradient id="leafGreenRight" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#165B2B" />
            <stop offset="100%" stopColor="#288F45" />
          </linearGradient>

          <linearGradient id="moonGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F3BA48" />
            <stop offset="100%" stopColor="#BF7D1B" />
          </linearGradient>

          <filter id="subtleShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="1" dy="2" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.18" />
          </filter>
        </defs>

        {/* 1. Background Circular Canvas */}
        <circle cx="200" cy="200" r="192" fill="url(#discBg)" />

        {/* 2. Outer Ornamental Borders */}
        {/* Double Outer Gold Ring */}
        <circle cx="200" cy="200" r="190" stroke="url(#goldRing)" strokeWidth="6" />
        <circle cx="200" cy="200" r="179" stroke="#165B2B" strokeWidth="4.5" />
        
        {/* Inner Green Boundary Ring */}
        <circle cx="200" cy="200" r="148" stroke="#165B2B" strokeWidth="4.5" />

        {/* 3. Border Floral / Citizen Motifs within the 148-179 Ring Track */}
        <g id="borderMotifs">
          {/* Top Leaf Sprigs & Top Center Citizen figure */}
          <g fill="#165B2B" stroke="#165B2B" strokeWidth="0.5">
            {/* Top Center Citizen */}
            <circle cx="200" cy="158" r="4.5" fill="#0E387A" stroke="none" />
            <path d="M 191 173 C 195 166, 205 166, 209 173 C 205 169, 195 169, 191 173 Z" fill="#0E387A" />

            {/* Top Left Leaves */}
            <path d="M 178 160 C 168 155, 150 160, 142 170 C 152 172, 170 168, 178 160 Z" />
            <path d="M 166 172 C 156 166, 138 174, 132 186 C 142 186, 158 180, 166 172 Z" />
            <path d="M 132 186 C 122 182, 106 194, 102 210 C 112 208, 126 198, 132 186 Z" />

            {/* Top Right Leaves */}
            <path d="M 222 160 C 232 155, 250 160, 258 170 C 248 172, 230 168, 222 160 Z" />
            <path d="M 234 172 C 244 166, 262 174, 268 186 C 258 186, 242 180, 234 172 Z" />
            <path d="M 268 186 C 278 182, 294 194, 298 210 C 288 208, 274 198, 268 186 Z" />
          </g>

          {/* Left & Right Gold Folk Scrollwork */}
          <g fill="none" stroke="url(#goldRing)" strokeWidth="3" strokeLinecap="round">
            {/* Left Arc Flourish */}
            <path d="M 88 195 C 78 208, 72 230, 78 250 C 82 236, 92 224, 102 218" />
            <circle cx="82" cy="220" r="3.5" fill="#D89A32" stroke="none" />

            {/* Right Arc Flourish */}
            <path d="M 312 195 C 322 208, 328 230, 322 250 C 318 236, 308 224, 298 218" />
            <circle cx="318" cy="220" r="3.5" fill="#D89A32" stroke="none" />
          </g>

          {/* Bottom Community / Warli Arc Motifs */}
          <g id="bottomCommunity">
            {/* Bottom Left Leaves */}
            <g fill="#165B2B">
              <path d="M 84 256 C 80 270, 90 288, 104 298 C 100 284, 94 268, 84 256 Z" />
              <path d="M 104 298 C 102 312, 118 328, 134 336 C 126 322, 118 308, 104 298 Z" />
              {/* Bottom Right Leaves */}
              <path d="M 316 256 C 320 270, 310 288, 296 298 C 300 284, 306 268, 316 256 Z" />
              <path d="M 296 298 C 298 312, 282 328, 266 336 C 274 322, 282 308, 296 298 Z" />
            </g>

            {/* Bottom Center Community Folk Figures (Gold and Green) */}
            <g stroke="url(#goldRing)" strokeWidth="3" fill="none">
              {/* Base Arches */}
              <path d="M 135 338 C 160 360, 240 360, 265 338" />
              <path d="M 152 346 C 172 364, 228 364, 248 346" />
            </g>
            {/* Folk Citizen Figures at bottom */}
            <g fill="url(#goldRing)">
              {/* Center Citizen */}
              <circle cx="200" cy="336" r="5" />
              <path d="M 188 358 C 194 346, 206 346, 212 358 Z" />

              {/* Left Citizen */}
              <circle cx="172" cy="334" r="4" />
              <path d="M 162 352 C 167 342, 177 342, 182 352 Z" />

              {/* Right Citizen */}
              <circle cx="228" cy="334" r="4" />
              <path d="M 218 352 C 223 342, 233 342, 238 352 Z" />
            </g>
          </g>
        </g>

        {/* 4. CENTRAL ARTWORK */}
        <g id="centralSymbol" filter="url(#subtleShadow)">
          {/* Top-Right Golden Crescent Moon */}
          <path
            d="M 268 98 C 248 106, 244 126, 252 144 C 262 136, 276 132, 290 134 C 278 120, 274 108, 268 98 Z"
            fill="url(#moonGold)"
          />

          {/* Golden Sun / Infinity Loop (Right Arc & Underneath) */}
          <path
            d="M 190 196 C 172 170, 220 132, 252 168 C 284 204, 256 254, 216 254 C 180 254, 158 226, 172 196"
            stroke="url(#goldLoop)"
            strokeWidth="24"
            strokeLinecap="round"
            fill="none"
          />

          {/* Dynamic Indigo Blue Human Figure */}
          {/* Head */}
          <circle cx="162" cy="140" r="16.5" fill="url(#blueBody)" />

          {/* Main Body Arch & Left Dynamic Movement */}
          {/* Stride / Leg extending back to the left */}
          <path
            d="M 182 178 C 146 172, 114 186, 96 236 C 120 216, 142 208, 168 214"
            fill="url(#blueBody)"
          />

          {/* Forward dynamic swoop extending down-right connecting to the base */}
          <path
            d="M 94 278 C 132 274, 166 230, 186 182 C 168 186, 144 208, 126 238 C 114 256, 104 270, 94 278 Z"
            fill="url(#blueBody)"
          />

          {/* Main forward blue curve wrapping under the golden loop */}
          <path
            d="M 152 178 C 178 174, 198 190, 224 234 C 242 262, 262 258, 266 236 C 264 274, 222 284, 186 264 C 158 248, 134 220, 118 266 C 144 218, 170 194, 228 228 C 246 238, 254 230, 254 218"
            stroke="url(#blueBody)"
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Two Vibrant Green Sprouting Leaves on the Right */}
          {/* Left / Upright Leaf */}
          <path
            d="M 226 182 C 220 134, 246 112, 254 116 C 264 122, 266 160, 242 196 C 234 192, 228 188, 226 182 Z"
            fill="url(#leafGreenLeft)"
          />

          {/* Right / Outward Leaf */}
          <path
            d="M 248 190 C 274 154, 308 152, 318 160 C 322 172, 298 206, 258 212 C 252 204, 248 196, 248 190 Z"
            fill="url(#leafGreenRight)"
          />

          {/* Central Stem connecting leaf base */}
          <path
            d="M 228 216 C 240 206, 248 196, 252 186"
            stroke="#1E6E34"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );

  if (variant === 'icon-only') {
    return <div className={`inline-flex items-center ${className}`}>{Emblem}</div>;
  }

  if (variant === 'full') {
    return (
      <div className={`inline-flex flex-col items-center text-center ${className}`}>
        {Emblem}
      </div>
    );
  }

  // Horizontal Header Layout
  return (
    <div className={`inline-flex items-center gap-3.5 ${className}`}>
      {Emblem}
      {showText && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-2xl tracking-tight text-[#1E2958] font-['Tiro_Devanagari_Marathi',serif]">
              माझी ओळख
            </span>
            <span className="text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300">
              Maharashtra
            </span>
          </div>
          <span className="text-xs font-semibold text-slate-600 tracking-wide">
            Majhi Olakh • One Identity, Every Government Service
          </span>
        </div>
      )}
    </div>
  );
};

