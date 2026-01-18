
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
   * Font size scaling for the quote to ensure it fits the box perfectly.
   */
  const getFontSize = (text: string) => {
    const length = text.length;
    if (length < 40) return '82px';
    if (length < 80) return '72px';
    if (length < 120) return '62px';
    if (length < 200) return '54px';
    return '44px';
  };

  const quoteText = details.quote || "You don't need to know everything\nYou just need to keep learning";
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
      {/* 1. HEADER */}
      <div className="flex flex-col items-center mt-12 mb-10">
        <div className="mb-4">
          <BracketsLogo className="w-24 h-24" />
        </div>
        <h2 className="text-[32px] font-medium text-[#5F6368] tracking-tight">Google Developer Groups</h2>
        <div className="flex items-center gap-1.5 text-[20px] font-medium mt-0.5 text-[#4285F4]">
          <span>{details.subText}</span>
          <span className="mx-0.5">•</span>
          <span>{details.chapterName}</span>
        </div>
      </div>

      {/* 2. MAIN TITLE */}
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-[145px] font-bold text-[#000000] leading-[0.85] text-center tracking-tighter">
          Monday<br />Motivation
        </h1>
      </div>

      {/* 3. QUOTE BOX WITH STACKED PILLS */}
      <div className="flex-1 flex flex-col items-center w-full px-16 justify-center pb-32">
        <div className="relative w-full bg-[#4285F4] rounded-[50px] py-20 px-16 flex flex-col items-center justify-center text-white text-center shadow-lg min-h-[500px]">
           
           {/* Top Quote */}
           <div className="mb-10">
             <Quote size={54} className="text-[#1F1F1F] rotate-180" fill="currentColor" strokeWidth={0} />
           </div>
           
           <div className="flex items-center justify-center w-full flex-1 mb-10">
             <p 
              className="font-medium leading-[1.3] max-w-[800px] whitespace-pre-line"
              style={{ fontSize }}
             >
               {quoteText}
             </p>
           </div>

           {/* Bottom Quote */}
           <div>
             <Quote size={54} className="text-[#1F1F1F]" fill="currentColor" strokeWidth={0} />
           </div>
           
           {/* The "Stacked Pills" effect from the image */}
           <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[70%] h-14 bg-[#1A73E8] -z-10 rounded-[30px]"></div>
           <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[50%] h-14 bg-[#185ABC] -z-20 rounded-[30px]"></div>
        </div>
      </div>

      {/* 4. FOOTER */}
      <div className="w-full bg-white h-40 mt-auto flex items-center justify-between px-16">
        {/* Left Side */}
        <div className="flex items-center gap-5">
          <BracketsLogo className="w-20 h-20" />
          <div className="flex flex-col">
            <span className="text-[34px] font-medium text-[#1F1F1F] tracking-tight">Google Developer Groups</span>
            <span className="text-[20px] font-medium text-[#4285F4] leading-tight">{details.chapterName}</span>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-[#1F1F1F]">
              <Instagram size={34} strokeWidth={2.2} />
              <Twitter size={34} fill="currentColor" strokeWidth={0} />
              <Linkedin size={34} fill="currentColor" strokeWidth={0} />
            </div>
            <span className="text-[24px] font-medium text-[#1F1F1F] ml-2 tracking-tight">
              {details.socialHandle}
            </span>
          </div>
          
          <div className="text-[#1F1F1F] opacity-80">
            <Globe size={48} strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphicTemplate;
