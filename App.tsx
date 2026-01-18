
import React, { useState, useRef, useEffect } from 'react';
import GraphicTemplate from './components/GraphicTemplate.tsx';
import { GraphicDetails, DEFAULT_DETAILS } from './types.ts';
import * as htmlToImage from 'html-to-image';
import { Download, RefreshCw, Layout, Type, MapPin, AtSign, Lock } from 'lucide-react';
import { BracketsLogo } from './components/GDGLogo.tsx';

const App: React.FC = () => {
  const [details, setDetails] = useState<GraphicDetails>(DEFAULT_DETAILS);
  const [isDownloading, setIsDownloading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Update window width on resize for the preview scale calculation
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      // Small delay to ensure any layout shifts are settled
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

  // Calculate the scale for the preview based on container width
  // Mobile needs more padding, Desktop can have a larger scale
  const getPreviewScale = () => {
    const containerPadding = windowWidth < 640 ? 40 : 80;
    const maxContainerWidth = Math.min(windowWidth - containerPadding, 500);
    return maxContainerWidth / 1080;
  };

  const scale = getPreviewScale();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      {/* Responsive Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 px-4 sm:px-6 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <BracketsLogo className="w-8 h-8 sm:w-10 sm:h-10" />
            <h1 className="text-sm sm:text-lg font-bold text-slate-900 tracking-tight whitespace-nowrap">
              Monday Motivation
            </h1>
          </div>
          <button 
            onClick={resetToDefault}
            className="text-slate-400 hover:text-blue-600 flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold transition-colors bg-slate-50 hover:bg-blue-50 px-2.5 py-1.5 rounded-lg border border-slate-100"
          >
            <RefreshCw size={12} />
            <span className="hidden xs:inline">Reset</span>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:items-start">
        
        {/* Editor Side */}
        <section className="bg-white rounded-[24px] sm:rounded-[32px] shadow-xl shadow-slate-200/50 p-5 sm:p-8 space-y-6 border border-slate-100 order-2 lg:order-1">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Customizer</h2>
            <p className="text-slate-400 text-xs sm:text-sm">Enter the weekly message. The graphic will auto-scale the text.</p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
               {/* Read-Only Chapter Name */}
               <div className="space-y-1.5">
                <label className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest flex justify-between items-center px-1">
                  <span className="flex items-center gap-1"><MapPin size={10} className="text-blue-500" /> Chapter</span>
                </label>
                <div className="px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-slate-50 bg-slate-50/50 text-slate-500 font-medium text-[11px] sm:text-xs truncate">
                  {details.chapterName}
                </div>
              </div>

              {/* Read-Only Context Text */}
              <div className="space-y-1.5">
                <label className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest flex justify-between items-center px-1">
                  <span className="flex items-center gap-1"><Layout size={10} className="text-green-500" /> Context</span>
                </label>
                <div className="px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-slate-50 bg-slate-50/50 text-slate-500 font-medium text-[11px] sm:text-xs">
                  {details.subText}
                </div>
              </div>
            </div>

            {/* Editable Quote - Dynamic Height */}
            <div className="space-y-2">
              <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1 px-1">
                <Type size={12} className="text-red-500" />
                Quote Content
              </label>
              <textarea
                ref={textAreaRef}
                name="quote"
                value={details.quote}
                onChange={handleInputChange}
                className="w-full min-h-[48px] px-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all resize-none overflow-hidden shadow-sm text-slate-700 leading-relaxed font-medium text-sm sm:text-base"
                placeholder="Type your motivation message here..."
              />
              <p className="text-[10px] text-slate-400 italic px-1">Text field expands as you type. Lines will break automatically.</p>
            </div>

            {/* Read-Only Social Handle */}
            <div className="space-y-1.5">
              <label className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest flex justify-between items-center px-1">
                <span className="flex items-center gap-1"><AtSign size={10} className="text-yellow-500" /> Social Handle</span>
              </label>
              <div className="px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-slate-50 bg-slate-50/50 text-slate-500 font-bold text-[11px] sm:text-xs">
                @{details.socialHandle}
              </div>
            </div>
          </div>

          <div className="pt-2 sm:pt-4">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className={`w-full flex items-center justify-center gap-2.5 py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base shadow-lg transition-all h-14 sm:h-16 ${
                isDownloading 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100 active:scale-[0.98]'
              }`}
            >
              {isDownloading ? (
                <>
                  <RefreshCw className="animate-spin" size={18} />
                  Generating PNG...
                </>
              ) : (
                <>
                  <Download size={20} />
                  Download Graphic
                </>
              )}
            </button>
          </div>
        </section>

        {/* Preview Side */}
        <section className="flex flex-col items-center order-1 lg:order-2">
          <div className="w-full mb-4 flex justify-between items-center px-2">
            <h3 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">Post Preview</h3>
          </div>
          
          <div className="w-full flex justify-center bg-slate-100/50 p-4 sm:p-8 rounded-[32px] sm:rounded-[40px] border border-dashed border-slate-200 overflow-hidden">
             {/* Scaled Preview Box */}
             <div 
               className="relative shadow-2xl rounded-2xl overflow-hidden bg-white" 
               style={{ 
                 width: `${1080 * scale}px`, 
                 height: `${1350 * scale}px` 
               }}
             >
               <div 
                className="absolute top-0 left-0 w-[1080px] h-[1350px] origin-top-left" 
                style={{ transform: `scale(${scale})` }}
               >
                 <GraphicTemplate id="graphic-preview" details={details} />
               </div>
             </div>
          </div>
          <p className="mt-4 text-[10px] text-slate-400 font-medium">1080 x 1350 (4:5 Aspect Ratio)</p>
        </section>
      </main>

      <footer className="py-8 border-t border-slate-100 mt-auto bg-white px-6">
        <div className="max-w-7xl mx-auto text-center space-y-1">
          <p className="text-slate-400 font-semibold text-[10px] sm:text-xs tracking-widest uppercase">
            Google Developer Groups Internal Tooling
          </p>
          <p className="text-slate-300 text-[10px]">Federal University Oye, Ekiti</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
