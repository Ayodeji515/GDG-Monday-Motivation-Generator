
import React from 'react';

interface GDGLogoProps {
  className?: string;
}

/**
 * High-fidelity reconstruction of the Developer Brackets Logo
 * Optimized for clarity in graphic templates.
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
      d="M36 22L20 38" 
      stroke="#EA4335" 
      strokeWidth="12" 
      strokeLinecap="round" 
    />
    {/* Left Bracket - Bottom (Blue) */}
    <path 
      d="M20 38L36 54" 
      stroke="#4285F4" 
      strokeWidth="12" 
      strokeLinecap="round" 
    />
    
    {/* Right Bracket - Top (Green) */}
    <path 
      d="M64 22L80 38" 
      stroke="#34A853" 
      strokeWidth="12" 
      strokeLinecap="round" 
    />
    {/* Right Bracket - Bottom (Yellow/Orange) */}
    <path 
      d="M80 38L64 54" 
      stroke="#FBBC04" 
      strokeWidth="12" 
      strokeLinecap="round" 
    />
  </svg>
);

export const GDGLogo: React.FC<GDGLogoProps> = ({ className }) => <BracketsLogo className={className} />;
