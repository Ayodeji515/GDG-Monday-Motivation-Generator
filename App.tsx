
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
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 px-4 sm:px-6 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <BracketsLogo className="w-8 h-8" />
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">Monday Motivation</h1>
          </div>
          <button 
            onClick={resetToDefault}
            className="text-slate-400 hover:text-blue-600 flex items-center gap-1.5 text-xs font-semibold transition-colors bg-slate-50 hover:bg-blue-50 px-2.5 py-1.5 rounded-lg border border-slate-100"
          >
            <RefreshCw size={12} />
            Reset
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:items-start mb-10">
        
        {/* Editor Side */}
        <section className="bg-white rounded-[24px] shadow-xl shadow-slate-200/50 p-5 sm:p-6 space-y-5 border border-slate-100 order-2 lg:order-1">
          <div className="space-y-0.5">
            <h2 className="text-xl font-bold text-slate-900">Customizer</h2>
            <p className="text-slate-400 text-xs">The graphic text will auto-scale to fit.</p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
               {/* Read-Only Chapter Name */}
               <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex justify-between items-center px-0.5">
                  <span className="flex items-center gap-1"><MapPin size={10} className="text-blue-500" /> Chapter</span>
                </label>
                <div className="px-3 py-2 rounded-lg border border-slate-50 bg-slate-50/50 text-slate-500 font-medium text-[11px] truncate">
                  {details.chapterName}
                </div>
              </div>

              {/* Read-Only Context Text */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex justify-between items-center px-0.5">
                  <span className="flex items-center gap-1"><Layout size={10} className="text-green-500" /> Context</span>
                </label>
                <div className="px-3 py-2 rounded-lg border border-slate-50 bg-slate-50/50 text-slate-500 font-medium text-[11px]">
                  {details.subText}
                </div>
              </div>
            </div>

            {/* Editable Quote - Compact starting size, auto-expanding */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1 px-0.5">
                <Type size={12} className="text-red-500" />
                Quote Content
              </label>
              <textarea
                ref={textAreaRef}
                name="quote"
                value={details.quote}
                onChange={handleInputChange}
                className="w-full min-h-[40px] px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all resize-none overflow-hidden shadow-sm text-slate-700 leading-normal font-medium text-sm"
                placeholder="Type your message here..."
              />
              <p className="text-[9px] text-slate-400 italic px-0.5">Starts small, expands as you type.</p>
            </div>

            {/* Read-Only Social Handle */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex justify-between items-center px-0.5">
                <span className="flex items-center gap-1"><AtSign size={10} className="text-yellow-500" /> Handle</span>
              </label>
              <div className="px-3 py-2 rounded-lg border border-slate-50 bg-slate-50/50 text-slate-500 font-bold text-[11px]">
                @{details.socialHandle}
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className={`w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-sm shadow-lg transition-all h-12 ${
                isDownloading 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100 active:scale-[0.98]'
              }`}
            >
              {isDownloading ? (
                <>
                  <RefreshCw className="animate-spin" size={16} />
                  Exporting...
                </>
              ) : (
                <>
                  <Download size={18} />
                  Download PNG
                </>
              )}
            </button>
          </div>
        </section>

        {/* Preview Side */}
        <section className="flex flex-col items-center order-1 lg:order-2">
          <div className="w-full mb-3 flex justify-between items-center px-1">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Preview</h3>
          </div>
          
          <div className="w-full max-w-[480px] flex justify-center bg-slate-200/10 p-4 sm:p-5 rounded-[24px] border border-dashed border-slate-200">
             <div className="relative shadow-2xl rounded-xl overflow-hidden bg-white w-full" style={{ aspectRatio: '1080 / 1350' }}>
               <div className="absolute top-0 left-0 w-[1080px] h-[1350px] origin-top-left" style={{ transform: `scale(${window.innerWidth < 640 ? (window.innerWidth - 72) / 1080 : 0.38})` }}>
                 <GraphicTemplate id="graphic-preview" details={details} />
               </div>
             </div>
          </div>
        </section>
      </main>

      <footer className="py-6 border-t border-slate-100 mt-auto bg-white px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-300 font-medium text-[10px] tracking-widest uppercase">GDG Internal Tooling</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
