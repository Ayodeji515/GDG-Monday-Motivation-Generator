
import React, { useState, useRef, useEffect } from 'react';
import GraphicTemplate from './components/GraphicTemplate.tsx';
import { GraphicDetails, DEFAULT_DETAILS } from './types.ts';
import * as htmlToImage from 'html-to-image';
import { Download, RefreshCw, Layout, Type, MapPin, AtSign, Lock } from 'lucide-react';
import { BracketsLogo } from './components/GDGLogo.tsx';

const App: React.FC = () => {
  const [details, setDetails] = useState<GraphicDetails>(DEFAULT_DETAILS);
  const [isDownloading, setIsDownloading] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-expand textarea as content grows
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [details.quote]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleDownload = async () => {
    const element = document.getElementById('graphic-preview');
    if (!element) return;

    try {
      setIsDownloading(true);
      await new Promise(r => setTimeout(r, 200));
      
      const dataUrl = await htmlToImage.toPng(element, {
        quality: 1,
        pixelRatio: 3,
        width: 1080,
        height: 1350,
      });

      const link = document.createElement('a');
      link.download = `Monday-Motivation-${details.chapterName.replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Failed to generate image:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const resetToDefault = () => {
    setDetails(prev => ({ ...prev, quote: "" }));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Responsive Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 px-4 sm:px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <BracketsLogo className="w-10 h-10" />
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">GDG Monday Motivation</h1>
          </div>
          <button 
            onClick={resetToDefault}
            className="text-slate-500 hover:text-blue-600 flex items-center gap-2 text-sm font-semibold transition-colors bg-slate-50 px-3 py-2 rounded-lg"
          >
            <RefreshCw size={14} />
            Reset Quote
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:items-start mb-12">
        
        {/* Editor Side */}
        <section className="bg-white rounded-[32px] shadow-xl shadow-slate-200/50 p-6 sm:p-8 space-y-6 border border-slate-100 order-2 lg:order-1">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900">Customizer</h2>
            <p className="text-slate-500 text-sm">Update the weekly text. Branding is locked to GDG standards.</p>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {/* Read-Only Chapter Name */}
               <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex justify-between items-center px-1">
                  <span className="flex items-center gap-1"><MapPin size={12} className="text-blue-500" /> Chapter</span>
                  <Lock size={10} />
                </label>
                <div className="px-3 py-2.5 rounded-xl border border-slate-100 bg-slate-50 text-slate-600 font-medium text-xs">
                  {details.chapterName}
                </div>
              </div>

              {/* Read-Only Context Text */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex justify-between items-center px-1">
                  <span className="flex items-center gap-1"><Layout size={12} className="text-green-500" /> Context</span>
                  <Lock size={10} />
                </label>
                <div className="px-3 py-2.5 rounded-xl border border-slate-100 bg-slate-50 text-slate-600 font-medium text-xs">
                  {details.subText}
                </div>
              </div>
            </div>

            {/* Editable Quote - Smaller starting size, auto-expanding */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1 px-1">
                <Type size={12} className="text-red-500" />
                Motivation Quote
              </label>
              <textarea
                ref={textAreaRef}
                name="quote"
                value={details.quote}
                onChange={handleInputChange}
                className="w-full min-h-[44px] px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all resize-none overflow-hidden shadow-sm text-slate-700 leading-normal font-medium text-sm"
                placeholder="Enter quote..."
              />
            </div>

            {/* Read-Only Social Handle */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex justify-between items-center px-1">
                <span className="flex items-center gap-1"><AtSign size={12} className="text-yellow-500" /> Handle</span>
                <Lock size={10} />
              </label>
              <div className="px-3 py-2.5 rounded-xl border border-slate-100 bg-slate-50 text-slate-600 font-bold text-xs">
                @{details.socialHandle}
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-base shadow-lg transition-all h-14 ${
                isDownloading 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100 active:scale-[0.98]'
              }`}
            >
              {isDownloading ? (
                <>
                  <RefreshCw className="animate-spin" size={20} />
                  Generating...
                </>
              ) : (
                <>
                  <Download size={20} />
                  Download Post
                </>
              )}
            </button>
          </div>
        </section>

        {/* Preview Side */}
        <section className="flex flex-col items-center order-1 lg:order-2">
          <div className="w-full mb-4 flex justify-between items-center px-2">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Post Preview</h3>
          </div>
          
          <div className="w-full max-w-[500px] flex justify-center bg-slate-200/20 p-4 sm:p-6 rounded-[32px] border border-dashed border-slate-300">
             <div className="relative shadow-2xl rounded-2xl overflow-hidden bg-white w-full" style={{ aspectRatio: '1080 / 1350' }}>
               <div className="absolute top-0 left-0 w-[1080px] h-[1350px] origin-top-left" style={{ transform: `scale(${window.innerWidth < 640 ? (window.innerWidth - 80) / 1080 : 0.38})` }}>
                 <GraphicTemplate id="graphic-preview" details={details} />
               </div>
             </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-slate-200 mt-auto bg-white px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-400 font-medium text-xs tracking-wider uppercase">Google Developer Groups</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
