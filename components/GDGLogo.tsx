
import React from 'react';

interface GDGLogoProps {
  className?: string;
}

export const GDGLogo: React.FC<GDGLogoProps> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 20L20 35L20 65L50 80L80 65V35L50 20Z" fill="white" />
    <path d="M50 25L25 38.5V61.5L50 75L75 61.5V38.5L50 25Z" fill="white" />
    {/* Simplified GDG colored shapes */}
    <path d="M50 35L35 43V57L50 65L65 57V43L50 35Z" fill="#F1F3F4" />
    <path d="M38 45L45 42V50H38V45Z" fill="#4285F4" />
    <path d="M45 42L52 45V50H45V42Z" fill="#EA4335" />
    <path d="M38 50H45V58L38 55V50Z" fill="#FBBC04" />
    <path d="M45 50H52V58L45 55V50Z" fill="#34A853" />
  </svg>
);

// High fidelity Google G-Logo inspired shapes
export const GoogleColorsLogo: React.FC<GDGLogoProps> = ({ className = "w-10" }) => (
  <div className={`flex items-center justify-center gap-1 ${className}`}>
    <div className="w-1/4 h-1/4 bg-[#4285F4] rounded-full rotate-45"></div>
    <div className="w-1/4 h-1/4 bg-[#EA4335] rounded-full -rotate-45"></div>
    <div className="w-1/4 h-1/4 bg-[#FBBC04] rounded-full rotate-12"></div>
    <div className="w-1/4 h-1/4 bg-[#34A853] rounded-full -rotate-12"></div>
  </div>
);

export const GDGMark: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <div className="flex flex-col items-center">
    <div className="flex gap-1 mb-1">
      <svg width={size/2.5} height={size/2.5} viewBox="0 0 24 24">
        <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" fill="#4285F4" opacity="0.9"/>
        <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" fill="#EA4335" opacity="0.6" transform="translate(2,0)"/>
      </svg>
    </div>
  </div>
);

// Using actual Google branded shapes for the icon at the top
export const GoogleBrandingIcon: React.FC<{ className?: string }> = ({ className = "w-16" }) => (
  <svg viewBox="0 0 100 60" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M30 30 L50 10 L70 30 L50 50 Z" fill="#4285F4" />
    <path d="M50 30 L70 10 L90 30 L70 50 Z" fill="#34A853" />
    <path d="M10 30 L30 10 L50 30 L30 50 Z" fill="#EA4335" />
    <path d="M30 50 L50 30 L70 50 L50 70 Z" fill="#FBBC04" />
  </svg>
);
