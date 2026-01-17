
import React from 'react';

interface GDGLogoProps {
  className?: string;
  size?: number;
}

/**
 * High-fidelity reconstruction of the Developer Brackets Logo
 * featuring the rounded capsule shapes in Google colors.
 */
export const BracketsLogo: React.FC<GDGLogoProps> = ({ className = "w-16 h-16" }) => (
  <svg 
    viewBox="0 0 100 80" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Left Bracket - Top (Red) */}
    <path 
      d="M45 25L30 40" 
      stroke="#EA4335" 
      strokeWidth="12" 
      strokeLinecap="round" 
    />
    {/* Left Bracket - Bottom (Blue) */}
    <path 
      d="M30 40L45 55" 
      stroke="#4285F4" 
      strokeWidth="12" 
      strokeLinecap="round" 
    />
    
    {/* Right Bracket - Top (Green) */}
    <path 
      d="M55 25L70 40" 
      stroke="#34A853" 
      strokeWidth="12" 
      strokeLinecap="round" 
    />
    {/* Right Bracket - Bottom (Yellow/Orange) */}
    <path 
      d="M70 40L55 55" 
      stroke="#FBBC04" 
      strokeWidth="12" 
      strokeLinecap="round" 
    />
  </svg>
);

// Fallback legacy components kept for reference or alternative UI spots
export const GDGLogo: React.FC<GDGLogoProps> = ({ className }) => <BracketsLogo className={className} />;
export const GoogleColorsLogo: React.FC<GDGLogoProps> = ({ className }) => <BracketsLogo className={className} />;
export const GDGMark: React.FC<{ size?: number }> = ({ size }) => <BracketsLogo className={`w-${size/4} h-${size/4}`} />;
export const GoogleBrandingIcon: React.FC<{ className?: string }> = ({ className }) => <BracketsLogo className={className} />;
