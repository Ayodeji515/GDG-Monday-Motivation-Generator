
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
   * Optimized font size scaling to ensure maximum impact within the 1080x1350 canvas.
   */
  const getFontSize = (text: string) => {
    const length = text.length;
    if (length < 30) return '94px';
    if (length < 60) return '84px';
    if (length < 100) return '72px';
    if (length < 180) return '60px';
    if (length < 300) return '50px';
    if (length < 450) return '42px';
    return '36px';
  };

  const quoteText = details.quote || "Success is not final,\nfailure is not fatal.";
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
      {/* 1. TOP HEADER SECTION - TIGHTER VERTICAL SPACING */}
      <div className="flex flex-col items-center mt-14 mb-8">
        <div className="mb-5">
          <BracketsLogo className="w-28 h-28" />
        </div>
        <h2 className="text-[34px] font-medium text-[#3C4043] tracking-tight">Google Developer Groups</h2>
        <div className="flex items-center gap-2 text-[24px] font-medium mt-1 text-[#4285F4]">
          <span className="font-bold">{details.subText}</span>
          <span className="mx-1 opacity-50">•</span>
          <span>{details.chapterName}</span>
        </div>
      </div>

      {/* 2. MAIN TITLE - INCREASED IMPACT */}
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-[150px] font-black text-[#1F1F1F] leading-[0.88] text-center tracking-tighter uppercase">
          Monday<br />Motivation
        </h1>
      </div>

      {/* 3. QUOTE CONTAINER (WITH STACKED EFFECT) */}
      <div className="flex-1 flex flex-col items-center w-full px-16 justify-center pb-20">
        <div className="relative w-full bg-[#4285F4] rounded-[50px] py-16 px-16 flex flex-col items-center justify-center text-white text-center shadow-[0_20px_60px_-10px_rgba(66,133,244,0.3)] min-h-[500px]">
           
           {/* Top Double Quote Icon */}
           <div className="mb-10 flex justify-center">
             <Quote size={64} className="text-[#1F1F1F] rotate-180" fill="currentColor" strokeWidth={0} />
           </div>
           
           {/* Auto-responsive text area */}
           <div className="flex items-center justify-center w-full flex-1 mb-10 px-4">
             <p 
              className="font-medium leading-[1.25] max-w-[840px] whitespace-pre-line z-10 relative"
              style={{ fontSize }}
             >
               {quoteText}
             </p>
           </div>

           {/* Bottom Double Quote Icon */}
           <div className="flex justify-center">
             <Quote size={64} className="text-[#1F1F1F]" fill="currentColor" strokeWidth={0} />
           </div>
           
           {/* STACKED PILLS (Visual depth) */}
           <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[75%] h-14 bg-[#1A73E8] -z-10 rounded-full"></div>
           <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[55%] h-14 bg-[#185ABC] -z-20 rounded-full"></div>
        </div>
      </div>

      {/* 4. FOOTER BRANDING (Full Width, Zero Gaps) */}
      <div className="w-full bg-[#E8F0FE] h-44 mt-auto flex items-center justify-between px-20 border-t border-white/40">
        {/* Left Footer Group */}
        <div className="flex items-center gap-8">
          <BracketsLogo className="w-24 h-24" />
          <div className="flex flex-col">
            <span className="text-[36px] font-bold text-[#1F1F1F] tracking-tight leading-none mb-1">Google Developer Groups</span>
            <span className="text-[24px] font-medium text-[#4285F4]">{details.chapterName}</span>
          </div>
        </div>

        {/* Right Footer Group */}
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-5 bg-[#D2E3FC]/40 py-2.5 px-6 rounded-full border border-white/50">
            <div className="flex items-center gap-4 text-[#1F1F1F]">
              <Instagram size={36} strokeWidth={2.5} />
              <Twitter size={36} fill="currentColor" strokeWidth={0} />
              <Linkedin size={36} fill="currentColor" strokeWidth={0} />
            </div>
            <span className="text-[24px] font-bold text-[#1F1F1F] tracking-tighter ml-2">
              {details.socialHandle}
            </span>
          </div>
          
          <div className="text-[#5F6368] opacity-50">
            <Globe size={58} strokeWidth={1.2} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphicTemplate;
