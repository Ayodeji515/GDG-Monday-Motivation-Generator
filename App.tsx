
import React, { useState, useRef, useEffect } from 'react';
import GraphicTemplate from './components/GraphicTemplate.tsx';
import { GraphicDetails, DEFAULT_DETAILS } from './types.ts';
import * as htmlToImage from 'html-to-image';
import { Download, RefreshCw, Layout, Type, MapPin, AtSign } from 'lucide-react';
import { BracketsLogo } from './components/GDGLogo.tsx';

const App: React.FC = () => {
  const [details, setDetails] = useState<GraphicDetails>(DEFAULT_DETAILS);
  const [isDownloading, setIsDownloading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
      await new Promise(r => setTimeout(r, 300));
      
      const dataUrl = await htmlToImage.toPng(element, {
        quality: 1,
        pixelRatio: 3,
        width: 1080,
        height: 1350,
      });

      const link = document.createElement('a');
      link.download = `GDG-Monday-Motivation.png`;
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

  // Calculate scaling for all screens with minimal margins
  const getPreviewScale = () => {
    const horizontalPadding = windowWidth < 640 ? 32 : 64;
    const availableWidth = windowWidth < 1024 
      ? windowWidth - horizontalPadding 
      : (windowWidth / 2) - horizontalPadding;
    
    // We want the preview to be large but constrained by a max width on desktop
    const targetWidth = Math.min(availableWidth, 540); 
    return targetWidth / 1080;
  };

  const scale = getPreviewScale();

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans overflow-x-hidden">
      {/* Tight Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50 px-4 py-3 sm:px-6">
        <div className="max-w-full mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BracketsLogo className="w-8 h-8 sm:w-10 sm:h-10" />
            <span className="text-sm sm:text-lg font-bold text-slate-900 tracking-tight uppercase">
              Motivation Generator
            </span>
          </div>
          <button 
            onClick={resetToDefault}
            className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
            title="Reset Quote"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </header>

      {/* Main Content Area - Flexible and Tight */}
      <main className="flex-1 flex flex-col lg:flex-row w-full">
        
        {/* Editor Pane */}
        <section className="w-full lg:w-1/2 p-4 sm:p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-slate-100 flex flex-col gap-6">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">CUSTOMIZER</h2>
            <p className="text-slate-400 text-xs sm:text-sm font-medium">Update content for next Monday's post.</p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
               <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
                  <MapPin size={10} className="inline mr-1 text-blue-500" /> Chapter
                </label>
                <div className="px-3 py-2 rounded-lg bg-slate-50 text-slate-500 font-semibold text-[11px] truncate">
                  {details.chapterName}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
                  <Layout size={10} className="inline mr-1 text-green-500" /> Context
                </label>
                <div className="px-3 py-2 rounded-lg bg-slate-50 text-slate-500 font-semibold text-[11px]">
                  {details.subText}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">
                <Type size={12} className="inline mr-1 text-red-500" /> Motivational Quote
              </label>
              <textarea
                ref={textAreaRef}
                name="quote"
                value={details.quote}
                onChange={handleInputChange}
                className="w-full min-h-[50px] px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-0 outline-none transition-all resize-none overflow-hidden text-slate-800 leading-relaxed font-semibold text-base sm:text-lg bg-slate-50/30"
                placeholder="What's the message for this week?"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
                <AtSign size={10} className="inline mr-1 text-yellow-500" /> Handle
              </label>
              <div className="px-3 py-2 rounded-lg bg-slate-50 text-slate-500 font-bold text-[11px]">
                @{details.socialHandle}
              </div>
            </div>
          </div>

          <div className="mt-auto pt-6">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-sm sm:text-base tracking-widest uppercase transition-all h-16 shadow-xl active:scale-[0.98] ${
                isDownloading 
                ? 'bg-slate-100 text-slate-300' 
                : 'bg-[#4285F4] text-white hover:bg-blue-600 shadow-blue-200'
              }`}
            >
              {isDownloading ? (
                <>
                  <RefreshCw className="animate-spin" size={20} />
                  PROCESSING...
                </>
              ) : (
                <>
                  <Download size={22} />
                  EXPORT IMAGE
                </>
              )}
            </button>
          </div>
        </section>

        {/* Preview Pane */}
        <section className="w-full lg:w-1/2 bg-[#F8FAFC] flex flex-col items-center justify-center p-6 sm:p-12 relative min-h-[500px]">
          <div className="absolute top-4 left-4 sm:top-8 sm:left-8">
            <span className="text-[10px] font-black text-slate-300 tracking-[0.3em] uppercase">LIVE PREVIEW</span>
          </div>

          {/* Scaled Preview Box */}
          <div 
            className="relative shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] rounded-2xl overflow-hidden bg-white ring-1 ring-slate-100" 
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
          
          <div className="mt-6 flex flex-col items-center gap-1 opacity-40">
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">1080 x 1350 • PNG</p>
          </div>
        </section>
      </main>

      <footer className="py-4 border-t border-slate-50 bg-white">
        <div className="px-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-[#4285F4] font-black text-[10px] tracking-widest uppercase">GDG CAMPUS TOOLING</p>
          <p className="text-slate-300 text-[9px] font-medium tracking-wide">DESIGNED FOR GOOGLE DEVELOPER GROUPS</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
