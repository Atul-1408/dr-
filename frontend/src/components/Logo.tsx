import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  showText?: boolean;
}

export default function Logo({
  className = '',
  size = 'md',
  variant = 'dark',
  showText = true,
}: LogoProps) {
  const iconSizes = {
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const titleSizes = {
    sm: 'text-base font-bold leading-tight',
    md: 'text-xl font-bold leading-tight',
    lg: 'text-2xl font-bold leading-tight',
  };

  const subtitleSizes = {
    sm: 'text-[10px] tracking-wider uppercase font-semibold',
    md: 'text-xs tracking-wider uppercase font-semibold',
    lg: 'text-sm tracking-wider uppercase font-semibold',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Brand Tooth Icon Matching Official Clinic Banner */}
      <div
        className={`${iconSizes[size]} relative flex items-center justify-center rounded-full bg-gradient-to-br from-teal-50 to-teal-100/60 p-1.5 border border-teal-500/30 shadow-xs transition-transform duration-300 hover:scale-105`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Sparkle Radiance */}
          <path d="M50 12V6M50 88V94M12 50H6M88 50H94" stroke="#0E7490" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
          <path d="M23 23L18 18M77 23L82 18M23 77L18 82M77 77L82 82" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
          
          {/* Circular Enclosing Ring */}
          <circle cx="50" cy="50" r="42" stroke="#0A5C67" strokeWidth="2.5" strokeDasharray="3 3" opacity="0.4" />

          {/* Smiling Tooth Body */}
          <path
            d="M32 28C24 28 20 36 20 46C20 60 28 72 35 84C37 87 40 86 42 82C45 76 47 67 50 67C53 67 55 76 58 82C60 86 63 87 65 84C72 72 80 60 80 46C80 36 76 28 68 28C62 28 56 32 50 35C44 32 38 28 32 28Z"
            fill="white"
            stroke="#0A5C67"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Happy Eyes */}
          <circle cx="41" cy="46" r="2.5" fill="#0A5C67" />
          <circle cx="59" cy="46" r="2.5" fill="#0A5C67" />

          {/* Gentle Smile Curve */}
          <path
            d="M42 55C45 59 55 59 58 55"
            stroke="#0A5C67"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Medical Cross on Upper Right Crown */}
          <rect x="67" y="24" width="3.5" height="11" rx="1.5" fill="#0284C7" />
          <rect x="63.25" y="27.75" width="11" height="3.5" rx="1.5" fill="#0284C7" />

          {/* Cheerful Star Sparkle */}
          <path
            d="M30 36L31 32L35 31L31 30L30 26L29 30L25 31L29 32L30 36Z"
            fill="#F59E0B"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span
            className={`${titleSizes[size]} tracking-tight font-extrabold font-sans ${
              variant === 'light' ? 'text-white' : 'text-[#064E55]'
            }`}
          >
            Happy Smiles
          </span>
          <span
            className={`${subtitleSizes[size]} ${
              variant === 'light' ? 'text-teal-200' : 'text-[#0284C7]'
            }`}
          >
            Dental Clinic
          </span>
        </div>
      )}
    </div>
  );
}
