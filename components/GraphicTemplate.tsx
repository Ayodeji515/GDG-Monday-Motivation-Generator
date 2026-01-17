
import React from 'react';
import { GraphicDetails } from '../types.ts';
import { Instagram, Twitter, Linkedin, Globe, Quote } from 'lucide-react';

interface GraphicTemplateProps {
  details: GraphicDetails;
  id: string;
}

const GraphicTemplate: React.FC<GraphicTemplateProps> = ({ details, id }) => {
  return (
    <div 
      id={id}
      className="relative flex flex-col items-center bg-[#F3F6FF] overflow-hidden"
      style={{ 
        width: '1080px', 
        height: '1350px', 
        transform: 'scale(1)', 
        fontFamily: "'Google Sans', sans-serif"
      }}
    >
      <div className="flex flex-col items-center mt-12 mb-16">
        <div className="flex gap-2 mb-4">
          <svg width="60" height="60" viewBox="0 0 24 24">
             <path d="M12 2l4.5 9h-9L12 2z" fill="#4285F4"/>
             <path d="M12 22l-4.5-9h9l-4.5 9z" fill="#34A853"/>
             <path d="M2 12l9-4.5v9L2 12z" fill="#EA4335"/>
             <path d="M22 12l-9 4.5v-9L22 12z" fill="#FBBC04"/>
          </svg>
        </div>
        <h2 className="text-3xl font-medium text-gray-500">Google Developer Groups</h2>
        <div className="flex items-center gap-1 text-xl text-gray-400 font-normal">
          <span className="opacity-70">{details.subText} •</span>
          <span>{details.chapterName}</span>
        </div>
      </div>

      <div className="flex flex-col items-center mb-12">
        <h1 className="text-[120px] font-bold text-gray-900 leading-[1.1] text-center">
          Monday<br />Motivation
        </h1>
      </div>

      <div className="flex-1 flex flex-col items-center w-full px-20">
        <div className="relative w-full bg-[#4285F4] rounded-[48px] py-24 px-16 flex flex-col items-center justify-center text-white text-center shadow-xl">
           <Quote size={64} className="absolute top-12 text-blue-300 opacity-50 rotate-180" />
           <p className="text-5xl font-medium leading-tight max-w-[800px] whitespace-pre-line">
             {details.quote}
           </p>
           <Quote size={64} className="absolute bottom-12 text-blue-300 opacity-50" />
           
           <div className="absolute -bottom-6 w-[90%] h-12 bg-[#1A73E8] -z-10 rounded-[32px] opacity-90"></div>
           <div className="absolute -bottom-10 w-[75%] h-12 bg-[#1967D2] -z-20 rounded-[24px] opacity-80"></div>
        </div>
      </div>

      <div className="w-full bg-white h-44 mt-auto flex items-center justify-between px-16 border-t border-gray-100">
        <div className="flex items-center gap-6">
          <svg width="70" height="70" viewBox="0 0 24 24">
             <path d="M12 2l4.5 9h-9L12 2z" fill="#4285F4"/>
             <path d="M12 22l-4.5-9h9l-4.5 9z" fill="#34A853"/>
             <path d="M2 12l9-4.5v9L2 12z" fill="#EA4335"/>
             <path d="M22 12l-9 4.5v-9L22 12z" fill="#FBBC04"/>
          </svg>
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-gray-800">Google Developer Groups</span>
            <span className="text-2xl font-medium text-blue-600">{details.chapterName}</span>
          </div>
        </div>

        <div className="flex items-center gap-10">
          <div className="flex items-center gap-4 text-gray-800">
            <Instagram size={36} />
            <Twitter size={36} fill="black" />
            <Linkedin size={36} fill="#0077b5" stroke="none" />
            <span className="text-2xl font-semibold ml-2">{details.socialHandle}</span>
          </div>
          <div className="w-px h-12 bg-gray-200"></div>
          <Globe size={44} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default GraphicTemplate;
