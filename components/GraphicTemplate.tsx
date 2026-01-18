
import React from 'react';
import { GraphicDetails } from '../types.ts';
import { Instagram, Twitter, Linkedin, Globe, Quote } from 'lucide-react';
import { BracketsLogo } from './GDGLogo.tsx';

interface GraphicTemplateProps {
  details: GraphicDetails;
  id: string;
}

const GraphicTemplate: React.FC<GraphicTemplateProps> = ({ details, id }) => {
  /**
   * Precise font size scaling to ensure responsiveness within the 1080x1350 canvas.
   */
  const getFontSize = (text: string) => {
    const length = text.length;
    if (length < 40) return '82px';
    if (length < 80) return '72px';
    if (length < 120) return '62px';
    if (length < 200) return '54px';
    if (length < 350) return '44px';
    if (length < 500) return '38px';
    return '32px';
  };

  const quoteText = details.quote || "Your Motivation Here";
  const fontSize = getFontSize(quoteText);

  return (
    <div 
      id={id}
      className="relative flex flex-col items-center bg-[#EFF4FF] overflow-hidden"
      style={{ 
        width: '1080px', 
        height: '1350px', 
        fontFamily: "'Google Sans', 'Inter', sans-serif"
      }}
    >
      {/* 1. TOP HEADER SECTION */}
      <div className="flex flex-col items-center mt-12 mb-10">
        <div className="mb-4">
          <BracketsLogo className="w-28 h-28" />
        </div>
        <h2 className="text-[34px] font-medium text-[#3C4043] tracking-tight">Google Developer Groups</h2>
        <div className="flex items-center gap-2 text-[22px] font-medium mt-1 text-[#4285F4]">
          <span>{details.subText}</span>
          <span className="mx-1">•</span>
          <span>{details.chapterName}</span>
        </div>
      </div>

      {/* 2. MAIN TITLE */}
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-[145px] font-bold text-[#1F1F1F] leading-[0.9] text-center tracking-tighter">
          Monday<br />Motivation
        </h1>
      </div>

      {/* 3. QUOTE CONTAINER (WITH STACKED EFFECT) */}
      <div className="flex-1 flex flex-col items-center w-full px-16 justify-center pb-24">
        <div className="relative w-full bg-[#4285F4] rounded-[50px] py-16 px-16 flex flex-col items-center justify-center text-white text-center shadow-lg min-h-[500px]">
           
           {/* Top Double Quote Icon */}
           <div className="mb-10 flex justify-center">
             <Quote size={54} className="text-[#1F1F1F] rotate-180" fill="currentColor" strokeWidth={0} />
           </div>
           
           {/* Auto-responsive text area */}
           <div className="flex items-center justify-center w-full flex-1 mb-10">
             <p 
              className="font-medium leading-[1.25] max-w-[880px] whitespace-pre-line z-10 relative"
              style={{ fontSize }}
             >
               {quoteText}
             </p>
           </div>

           {/* Bottom Double Quote Icon */}
           <div className="flex justify-center">
             <Quote size={54} className="text-[#1F1F1F]" fill="currentColor" strokeWidth={0} />
           </div>
           
           {/* STACKED PILLS (As seen in reference image) */}
           {/* Pill Layer 1 (Medium width) */}
           <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[75%] h-14 bg-[#1A73E8] -z-10 rounded-full"></div>
           {/* Pill Layer 2 (Smallest width) */}
           <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[55%] h-14 bg-[#185ABC] -z-20 rounded-full"></div>
        </div>
      </div>

      {/* 4. FOOTER BRANDING (Refined Layout) */}
      <div className="w-full bg-[#E8F0FE] h-44 mt-auto flex items-center justify-between px-16 border-t border-white/20">
        {/* Left Footer Group */}
        <div className="flex items-center gap-6">
          <BracketsLogo className="w-24 h-24" />
          <div className="flex flex-col">
            <span className="text-[34px] font-medium text-[#1F1F1F] tracking-tight">Google Developer Groups</span>
            <span className="text-[22px] font-medium text-[#4285F4]">{details.chapterName}</span>
          </div>
        </div>

        {/* Right Footer Group */}
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-4 bg-[#D2E3FC]/30 py-2 px-4 rounded-full">
            <div className="flex items-center gap-3 text-[#1F1F1F]">
              <Instagram size={32} strokeWidth={2.2} />
              <Twitter size={32} fill="currentColor" strokeWidth={0} />
              <Linkedin size={32} fill="currentColor" strokeWidth={0} />
            </div>
            <span className="text-[22px] font-bold text-[#1F1F1F] tracking-tight ml-2">
              {details.socialHandle}
            </span>
          </div>
          
          <div className="text-[#5F6368] opacity-60">
            <Globe size={52} strokeWidth={1.2} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphicTemplate;
