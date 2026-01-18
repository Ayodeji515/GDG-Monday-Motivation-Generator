
import React, { useState, useRef, useEffect } from 'react';
import GraphicTemplate from './components/GraphicTemplate.tsx';
import { GraphicDetails, DEFAULT_DETAILS } from './types.ts';
import * as htmlToImage from 'html-to-image';
import { Download, RefreshCw, Layout, Type, MapPin, AtSign } from 'lucide-react';
import { BracketsLogo } from './components/GDGLogo.tsx';

const App: React.FC = () => {
  const [details, setDetails] = useState<GraphicDetails>(DEFAULT_DETAILS);
  const [isDownloading, setIsDownloading] = useState(false);
  const [scale, setScale] = useState(0.5);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  // Dynamic Scaling Engine
  const updateScale = () => {
    if (previewContainerRef.current) {
      const container = previewContainerRef.current;
      const horizontalPadding = window.innerWidth < 640 ? 40 : 100;
      const verticalPadding = window.innerWidth < 640 ? 40 : 100;
      
      const availableWidth = container.clientWidth - horizontalPadding;
      const availableHeight = container.clientHeight - verticalPadding;
      
      const scaleX = availableWidth / 1080;
      const scaleY = availableHeight / 1350;
      
      const newScale = Math.min(scaleX, scaleY);
      setScale(Math.max(newScale, 0.1)); 
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updateScale);
    updateScale();
    return () => window.removeEventListener('resize', updateScale);
  }, []);

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
      await new Promise(r => setTimeout(r, 400));
      
      const dataUrl = await htmlToImage.toPng(element, {
        quality: 1,
        pixelRatio: 2, 
        width: 1080,
        height: 1350,
      });

      const link = document.createElement('a');
      link.download = `GDG-Monday-Motivation.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-white flex flex-col font-sans overflow-hidden">
      {/* Minimized Header */}
      <header className="bg-white border-b border-slate-100 px-6 py-3 flex-shrink-0 z-10">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-3">
            <BracketsLogo className="w-8 h-8 sm:w-10 sm:h-10" />
            <span className="text-sm font-black text-slate-900 tracking-tighter uppercase">
              Monday Motivation Editor
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setDetails(prev => ({ ...prev, quote: "" }))}
              className="text-slate-400 hover:text-blue-500 transition-colors"
            >
              <RefreshCw size={18} />
            </button>
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className={`px-6 py-2.5 rounded-full font-black text-xs tracking-widest uppercase transition-all shadow-lg active:scale-95 ${
                isDownloading 
                ? 'bg-slate-100 text-slate-300' 
                : 'bg-[#4285F4] text-white hover:bg-blue-600 shadow-blue-100'
              }`}
            >
              {isDownloading ? 'Working...' : 'Export 1080x1350 PNG'}
            </button>
          </div>
        </div>
      </header>

      {/* Main App Canvas */}
      <main className="flex-1 flex flex-col lg:flex-row w-full overflow-hidden">
        
        {/* Editor Sidebar */}
        <section className="w-full lg:w-[420px] p-8 border-b lg:border-b-0 lg:border-r border-slate-100 bg-white overflow-y-auto">
          <div className="space-y-8">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-900 leading-none">CUSTOMIZE</h2>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">Weekly Post Parameters</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Type size={14} className="text-blue-500" /> Quote Text
                </label>
                <textarea
                  ref={textAreaRef}
                  name="quote"
                  value={details.quote}
                  onChange={handleInputChange}
                  className="w-full min-h-[100px] px-5 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-blue-500 outline-none transition-all resize-none text-slate-800 leading-relaxed font-bold text-lg shadow-inner"
                  placeholder="Enter motivation message..."
                />
              </div>

              <div className="grid grid-cols-1 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <MapPin size={12} className="inline mr-1 text-red-500" /> Institution
                  </label>
                  <div className="px-5 py-3.5 rounded-xl bg-slate-50 text-slate-400 font-bold text-sm border border-slate-100">
                    {details.chapterName}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <AtSign size={12} className="inline mr-1 text-green-500" /> Social Handle
                  </label>
                  <div className="px-5 py-3.5 rounded-xl bg-slate-50 text-slate-400 font-bold text-sm border border-slate-100">
                    @{details.socialHandle}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-10 border-t border-slate-50 opacity-60">
              <div className="flex items-center gap-3 p-5 bg-slate-50 rounded-2xl">
                <Layout size={24} className="text-slate-400" />
                <p className="text-[11px] text-slate-500 font-bold uppercase leading-tight">
                  Image is optimized for 1080x1350px (Instagram 4:5 aspect ratio).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Live Preview Pane */}
        <section 
          ref={previewContainerRef}
          className="flex-1 bg-[#F9FAFB] flex flex-col items-center justify-center relative p-6 sm:p-12 overflow-hidden"
        >
          <div 
            className="relative shadow-2xl bg-white transition-transform duration-500 ease-in-out" 
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
          
          <div className="mt-8 flex flex-col items-center opacity-20 select-none">
            <p className="text-[10px] font-black text-slate-900 uppercase tracking-[0.5em]">
              POST PREVIEW • 1080x1350
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
