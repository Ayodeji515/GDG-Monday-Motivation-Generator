
import React from 'react';
import { GraphicDetails } from '../types.ts';
import { Instagram, Twitter, Linkedin, Globe, Quote } from 'lucide-react';
import { BracketsLogo } from './GDGLogo.tsx';

interface GraphicTemplateProps {
  details: GraphicDetails;
  id: string;
}

const GraphicTemplate: React.FC<GraphicTemplateProps> = ({ details, id }) => {
  // Safe rendering values to prevent Error #31
  const chapterNameText = details?.chapterName || "Google Developer Groups";
  const subText = details?.subText || "On Campus";
  const socialHandle = details?.socialHandle || "GDG";
  const quoteText = details?.quote || "You don't need to know everything\nYou just need to keep learning";

  /**
   * Adaptive typography for the quote.
   * Ensures the text remains legible regardless of length.
   */
  const getFontSize = (text: string) => {
    const length = text.length;
    if (length === 0) return '72px';
    if (length < 50) return '82px';
    if (length < 100) return '68px';
    if (length < 160) return '56px';
    return '44px';
  };

  const fontSize = getFontSize(quoteText);

  return (
    <div 
      id={id}
      className="relative flex flex-col items-center bg-[#F1F3F4] overflow-hidden"
      style={{ 
        width: '1080px', 
        height: '1350px', 
        fontFamily: "'Google Sans', 'Inter', sans-serif"
      }}
    >
      {/* --- HEADER --- */}
      <div className="flex flex-col items-center mt-14 mb-10">
        <div className="mb-5 scale-110">
          <BracketsLogo className="w-24 h-24" />
        </div>
        <h2 className="text-[34px] font-medium text-[#5F6368] tracking-tight">
          Google Developer Groups
        </h2>
        <div className="flex items-center gap-2 text-[22px] font-medium mt-1.5 text-[#4285F4]">
          <span className="font-semibold">{subText}</span>
          <span className="mx-0.5 opacity-40">•</span>
          <span className="font-semibold">{chapterNameText}</span>
        </div>
      </div>

      {/* --- HERO TITLE --- */}
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-[160px] font-bold text-[#202124] leading-[0.85] text-center tracking-tighter">
          Monday<br />Motivation
        </h1>
      </div>

      {/* --- QUOTE BOX (Signature Component) --- */}
      <div className="flex-1 flex flex-col items-center w-full px-16 justify-center pb-32">
        <div className="relative w-full bg-[#4285F4] rounded-[60px] py-20 px-16 flex flex-col items-center justify-center text-white text-center shadow-2xl min-h-[520px] z-10">
           
           {/* Top Ornament */}
           <div className="mb-12 opacity-80">
             <Quote size={56} className="text-[#1F1F1F] rotate-180" fill="currentColor" strokeWidth={0} />
           </div>
           
           {/* Quote Body */}
           <div className="flex items-center justify-center w-full flex-1 mb-12">
             <p 
              className="font-medium leading-[1.35] max-w-[880px] whitespace-pre-line"
              style={{ fontSize }}
             >
               {quoteText}
             </p>
           </div>

           {/* Bottom Ornament */}
           <div className="opacity-80">
             <Quote size={56} className="text-[#1F1F1F]" fill="currentColor" strokeWidth={0} />
           </div>
           
           {/* Layered Pill Depth Effect (The "Shadows") */}
           <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-[78%] h-14 bg-[#1A73E8] -z-10 rounded-[35px]"></div>
           <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-[56%] h-14 bg-[#185ABC] -z-20 rounded-[35px]"></div>
        </div>
      </div>

      {/* --- BRAND FOOTER --- */}
      <footer className="w-full bg-white h-48 mt-auto flex items-center justify-between px-20 border-t border-[#E8EAED] shadow-[0_-8px_32px_rgba(0,0,0,0.02)]">
        {/* Logo and Chapter */}
        <div className="flex items-center gap-6">
          <BracketsLogo className="w-20 h-20" />
          <div className="flex flex-col justify-center">
            <span className="text-[36px] font-bold text-[#202124] tracking-tight leading-none mb-1.5">
              Google Developer Groups
            </span>
            <span className="text-[22px] font-bold text-[#4285F4] tracking-tight leading-none">
              {chapterNameText}
            </span>
          </div>
        </div>

        {/* Social Presence */}
        <div className="flex items-center gap-16">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-4 text-[#202124]">
              <div className="flex items-center justify-center p-2 rounded-full border-[3px] border-[#202124]">
                <Instagram size={30} strokeWidth={2.5} />
              </div>
              <div className="flex items-center justify-center p-2 rounded-full border-[3px] border-[#202124]">
                <Twitter size={30} fill="currentColor" strokeWidth={0} />
              </div>
              <div className="flex items-center justify-center p-2 rounded-full border-[3px] border-[#202124]">
                <Linkedin size={30} fill="currentColor" strokeWidth={0} />
              </div>
            </div>
            <span className="text-[30px] font-bold text-[#202124] tracking-tight ml-2">
              {socialHandle}
            </span>
          </div>
          
          <div className="text-[#202124] opacity-90 ml-2">
            <Globe size={60} strokeWidth={1.2} />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GraphicTemplate;
