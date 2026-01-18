
import React from 'react';
import { GraphicDetails } from '../types.ts';
import { Instagram, Twitter, Linkedin, Globe, Quote } from 'lucide-react';
import { BracketsLogo } from './GDGLogo.tsx';

interface GraphicTemplateProps {
  details: GraphicDetails;
  id: string;
}

const GraphicTemplate: React.FC<GraphicTemplateProps> = ({ details, id }) => {
  const chapterName = details?.chapterName || "Federal University Oye Ekiti";
  const subText = details?.subText || "On Campus";
  const socialHandle = details?.socialHandle || "GDGocFuoye";
  const quoteText = details?.quote || "You don't need to know everything\nYou just need to keep learning";

  const getFontSize = (text: string) => {
    const length = text.length;
    if (length === 0) return '72px';
    if (length < 40) return '82px';
    if (length < 90) return '68px';
    if (length < 150) return '54px';
    return '44px';
  };

  const fontSize = getFontSize(quoteText);

  return (
    <div 
      id={id}
      className="relative flex flex-col items-center bg-[#EFF4FF] overflow-hidden"
      style={{ 
        width: '1080px', 
        height: '1600px', 
        fontFamily: "'Google Sans', 'Inter', sans-serif"
      }}
    >
      {/* Main Content Wrapper to group everything except the very bottom spacing if any */}
      <div className="flex flex-col items-center w-full flex-1">
        
        {/* 1. TOP HEADER SECTION */}
        <div className="flex flex-col items-center mt-16 mb-8">
          <div className="mb-4">
            <BracketsLogo className="w-24 h-24" />
          </div>
          <h2 className="text-[34px] font-medium text-[#5F6368] tracking-tight">Google Developer Groups</h2>
          <div className="flex items-center gap-1.5 text-[22px] font-medium mt-1">
            <span className="text-[#4285F4] font-semibold">{subText}</span>
            <span className="mx-0.5 text-[#5F6368] opacity-60">•</span>
            <span className="text-[#5F6368] font-semibold">{chapterName}</span>
          </div>
        </div>

        {/* 2. MAIN TITLE */}
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-[170px] font-bold text-[#1F1F1F] leading-[0.88] text-center tracking-tighter">
            Monday<br />Motivation
          </h1>
        </div>

        {/* 3. CENTER QUOTE BOX */}
        <div className="flex flex-col items-center w-full px-16 justify-center mt-4 mb-20">
          <div className="relative w-full bg-[#4285F4] rounded-[50px] py-20 px-16 flex flex-col items-center justify-center text-[#1F1F1F] text-center shadow-lg min-h-[560px]">
             
             <div className="mb-10 opacity-90">
               <Quote size={52} className="rotate-180" fill="currentColor" strokeWidth={0} />
             </div>
             
             <div className="flex items-center justify-center w-full flex-1 mb-10">
               <p 
                className="font-medium leading-[1.3] max-w-[850px] whitespace-pre-line"
                style={{ fontSize }}
               >
                 {quoteText}
               </p>
             </div>

             <div className="opacity-90">
               <Quote size={52} fill="currentColor" strokeWidth={0} />
             </div>
             
             <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[76%] h-14 bg-[#1A73E8] -z-10 rounded-[35px]"></div>
             <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[54%] h-14 bg-[#185ABC] -z-20 rounded-[35px]"></div>
          </div>
        </div>
      </div>

      {/* 4. FOOTER BRANDING - Shifted Up Closer */}
      <div className="w-full bg-white h-56 flex items-center justify-between px-20 border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] pb-6">
        {/* Left Side: Branding */}
        <div className="flex items-center gap-6">
          <BracketsLogo className="w-24 h-24" />
          <div className="flex flex-col">
            <span className="text-[38px] font-bold text-[#1F1F1F] tracking-tight leading-none mb-1">
              Google Developer Groups
            </span>
            <span className="text-[24px] font-bold text-[#4285F4] tracking-tight leading-none">
              {chapterName}
            </span>
          </div>
        </div>

        {/* Right Side: Socials, Handle, and Globe */}
        <div className="flex items-center gap-14">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3.5 text-[#1F1F1F]">
              <div className="w-11 h-11 rounded-full border-[3px] border-[#1F1F1F] flex items-center justify-center">
                <Instagram size={22} strokeWidth={2.8} />
              </div>
              <div className="w-11 h-11 rounded-full bg-[#1F1F1F] flex items-center justify-center text-white">
                <Twitter size={22} fill="currentColor" strokeWidth={0} />
              </div>
              <div className="w-11 h-11 rounded-full bg-[#1F1F1F] flex items-center justify-center text-white">
                <Linkedin size={22} fill="currentColor" strokeWidth={0} />
              </div>
            </div>
            {/* Handle Text */}
            <span className="text-[32px] font-bold text-[#1F1F1F] tracking-tight">
              {socialHandle}
            </span>
          </div>
          
          {/* Globe Icon */}
          <div className="text-[#1F1F1F] opacity-90">
            <Globe size={64} strokeWidth={1.2} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphicTemplate;
