
import React from 'react';

interface GDGLogoProps {
  className?: string;
  size?: number;
}

/**
 * High-fidelity reconstruction of the Developer Brackets Logo
 * Adjusted with more "breathing room" between the bracket pairs.
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
      d="M38 25L23 40" 
      stroke="#EA4335" 
      strokeWidth="11" 
      strokeLinecap="round" 
    />
    {/* Left Bracket - Bottom (Blue) */}
    <path 
      d="M23 40L38 55" 
      stroke="#4285F4" 
      strokeWidth="11" 
      strokeLinecap="round" 
    />
    
    {/* Right Bracket - Top (Green) */}
    <path 
      d="M62 25L77 40" 
      stroke="#34A853" 
      strokeWidth="11" 
      strokeLinecap="round" 
    />
    {/* Right Bracket - Bottom (Yellow/Orange) */}
    <path 
      d="M77 40L62 55" 
      stroke="#FBBC04" 
      strokeWidth="11" 
      strokeLinecap="round" 
    />
  </svg>
);

export const GDGLogo: React.FC<GDGLogoProps> = ({ className }) => <BracketsLogo className={className} />;
export const GoogleColorsLogo: React.FC<GDGLogoProps> = ({ className }) => <BracketsLogo className={className} />;
export const GDGMark: React.FC<{ size?: number }> = ({ size }) => <BracketsLogo className={`w-${size/4} h-${size/4}`} />;
export const GoogleBrandingIcon: React.FC<{ className?: string }> = ({ className }) => <BracketsLogo className={className} />;
