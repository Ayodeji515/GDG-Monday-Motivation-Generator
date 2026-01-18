
import React from 'react';
import { GraphicDetails } from '../types.ts';
import { Instagram, Twitter, Linkedin, Globe, Quote } from 'lucide-react';
import { BracketsLogo } from './GDGLogo.tsx';

interface GraphicTemplateProps {
  details: GraphicDetails;
  id: string;
}

const GraphicTemplate: React.FC<GraphicTemplateProps> = ({ details, id }) => {
  return (
    <div 
      id={id}
      className="relative flex flex-col items-center bg-[#F3F6FF] overflow-hidden pb-12"
      style={{ 
        width: '1080px', 
        height: '1350px', 
        fontFamily: "'Google Sans', sans-serif"
      }}
    >
      {/* Top Header Section */}
      <div className="flex flex-col items-center mt-14 mb-14">
        <div className="mb-6">
          <BracketsLogo className="w-36 h-36" />
        </div>
        <h2 className="text-3xl font-medium text-gray-500 tracking-tight">Google Developer Groups</h2>
        <div className="flex items-center gap-2 text-2xl text-gray-400 font-normal mt-1">
          <span className="opacity-70">{details.subText} •</span>
          <span>{details.chapterName}</span>
        </div>
      </div>

      {/* Main Title */}
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-[130px] font-bold text-gray-900 leading-[1.0] text-center tracking-tighter">
          Monday<br />Motivation
        </h1>
      </div>

      {/* Quote Container */}
      <div className="flex-1 flex flex-col items-center w-full px-20 justify-center">
        <div className="relative w-full bg-[#4285F4] rounded-[56px] py-28 px-20 flex flex-col items-center justify-center text-white text-center shadow-2xl overflow-hidden">
           {/* Centered Quote Icon in background as requested - solid black with low opacity for watermark effect */}
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <Quote size={420} className="text-black opacity-[0.08] rotate-180" fill="currentColor" />
           </div>
           
           <p className="text-[54px] font-medium leading-[1.2] max-w-[840px] whitespace-pre-line z-10 relative">
             {details.quote || "Your Motivation Here"}
           </p>
           
           {/* Depth layers */}
           <div className="absolute -bottom-7 w-[92%] h-14 bg-[#1A73E8] -z-10 rounded-[40px] opacity-90"></div>
           <div className="absolute -bottom-12 w-[78%] h-14 bg-[#1967D2] -z-20 rounded-[30px] opacity-80"></div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="w-full bg-white h-52 mt-auto flex items-center justify-between px-20 border-t border-gray-100 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-8">
          <BracketsLogo className="w-28 h-28" />
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-gray-900">Google Developer Groups</span>
            <span className="text-2xl font-medium text-blue-600">{details.chapterName}</span>
          </div>
        </div>

        <div className="flex items-center gap-12">
          <div className="flex items-center gap-5 text-gray-900">
            <Instagram size={40} strokeWidth={2.5} />
            <Twitter size={40} fill="currentColor" strokeWidth={0} />
            <Linkedin size={40} fill="#0077b5" strokeWidth={0} />
            <span className="text-2xl font-bold ml-1 tracking-tight">@{details.socialHandle}</span>
          </div>
          <div className="w-[2px] h-14 bg-gray-200"></div>
          <Globe size={48} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default GraphicTemplate;
