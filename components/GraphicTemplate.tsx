
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
   * Granular font size scaling to ensure responsiveness within the 1080x1350 canvas.
   * Scales based on character count to keep the text within the blue box.
   */
  const getFontSize = (text: string) => {
    const length = text.length;
    if (length < 40) return '88px';
    if (length < 80) return '76px';
    if (length < 120) return '66px';
    if (length < 200) return '58px';
    if (length < 350) return '48px';
    if (length < 500) return '40px';
    if (length < 700) return '32px';
    return '28px';
  };

  const quoteText = details.quote || "Your Motivation Here";
  const fontSize = getFontSize(quoteText);

  return (
    <div 
      id={id}
      className="relative flex flex-col items-center bg-[#F3F6FF] overflow-hidden"
      style={{ 
        width: '1080px', 
        height: '1350px', 
        fontFamily: "'Google Sans', sans-serif"
      }}
    >
      {/* Top Header Section */}
      <div className="flex flex-col items-center mt-12 mb-10">
        <div className="mb-4">
          <BracketsLogo className="w-32 h-32" />
        </div>
        <h2 className="text-2xl font-medium text-gray-500 tracking-tight">Google Developer Groups</h2>
        <div className="flex items-center gap-2 text-xl text-gray-400 font-normal mt-1">
          <span className="opacity-70">{details.subText} •</span>
          <span>{details.chapterName}</span>
        </div>
      </div>

      {/* Main Title */}
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-[120px] font-bold text-gray-900 leading-[0.95] text-center tracking-tighter">
          Monday<br />Motivation
        </h1>
      </div>

      {/* Quote Container Area */}
      <div className="flex-1 flex flex-col items-center w-full px-14 justify-center pb-12">
        <div className="relative w-full bg-[#4285F4] rounded-[64px] py-20 px-16 flex flex-col items-center justify-center text-white text-center shadow-2xl overflow-visible min-h-[520px] max-h-[720px]">
           
           {/* Top Double Quote Icon - Centered */}
           <div className="mb-8 flex justify-center">
             <Quote size={80} className="text-black rotate-180 opacity-90" fill="currentColor" />
           </div>
           
           {/* Auto-responsive text area with smooth transition */}
           <div className="flex items-center justify-center w-full flex-1 overflow-hidden">
             <p 
              className="font-medium leading-[1.3] max-w-[900px] whitespace-pre-line z-10 relative transition-all duration-300"
              style={{ fontSize }}
             >
               {quoteText}
             </p>
           </div>

           {/* Bottom Double Quote Icon - Centered */}
           <div className="mt-8 flex justify-center">
             <Quote size={80} className="text-black opacity-90" fill="currentColor" />
           </div>
           
           {/* Depth layers for visual flair */}
           <div className="absolute -bottom-6 w-[92%] h-12 bg-[#1A73E8] -z-10 rounded-[40px] opacity-90"></div>
           <div className="absolute -bottom-10 w-[82%] h-12 bg-[#1967D2] -z-20 rounded-[30px] opacity-80"></div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="w-full bg-white h-48 mt-auto flex items-center justify-between px-20 border-t border-gray-100 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-6">
          <BracketsLogo className="w-24 h-24" />
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-900">Google Developer Groups</span>
            <span className="text-xl font-medium text-blue-600">{details.chapterName}</span>
          </div>
        </div>

        <div className="flex items-center gap-10">
          <div className="flex items-center gap-4 text-gray-900">
            <Instagram size={36} strokeWidth={2.5} />
            <Twitter size={36} fill="currentColor" strokeWidth={0} />
            <Linkedin size={36} fill="#0077b5" strokeWidth={0} />
            <span className="text-xl font-bold ml-1 tracking-tight">@{details.socialHandle}</span>
          </div>
          <div className="w-[1.5px] h-12 bg-gray-200"></div>
          <Globe size={42} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default GraphicTemplate;
