
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

  // Dynamic Scaling Engine - Optimized to maximize "big" output visibility
  const updateScale = () => {
    if (previewContainerRef.current) {
      const container = previewContainerRef.current;
      // Tight paddings to maximize the "big" feel
      const horizontalPadding = 16;
      const verticalPadding = 16;
      
      const availableWidth = container.clientWidth - horizontalPadding;
      const availableHeight = container.clientHeight - verticalPadding;
      
      const scaleX = availableWidth / 1080;
      const scaleY = availableHeight / 1350;
      
      // Fill as much of the container as possible
      const newScale = Math.min(scaleX, scaleY);
      setScale(Math.max(newScale, 0.05)); 
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updateScale);
    // Use a small timeout to ensure the container has its final dimensions after layout
    const timer = setTimeout(updateScale, 100);
    return () => {
      window.removeEventListener('resize', updateScale);
      clearTimeout(timer);
    };
  }, []);

  // Sync scale when details change as it might affect layout (though scaling is static dimensions)
  useEffect(() => {
    updateScale();
  }, [details]);

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
      // Wait for any final layout rendering
      await new Promise(r => setTimeout(r, 500));
      
      const dataUrl = await htmlToImage.toPng(element, {
        quality: 1,
        pixelRatio: 3, // Very high quality
        width: 1080,
        height: 1350,
      });

      const link = document.createElement('a');
      link.download = `GDG-Monday-Motivation-${new Date().toLocaleDateString().replace(/\//g, '-')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Download failed:', error);
      alert('Could not generate image. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-white flex flex-col font-sans overflow-hidden">
      {/* Tight Header */}
      <header className="bg-white border-b border-slate-100 px-4 py-2 sm:px-6 flex-shrink-0 z-20">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <BracketsLogo className="w-8 h-8 sm:w-10 sm:h-10" />
            <span className="text-[10px] sm:text-xs font-black text-slate-900 tracking-tighter uppercase">
              Monday Motivation Editor
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => setDetails(prev => ({ ...prev, quote: "" }))}
              className="p-2 text-slate-300 hover:text-blue-500 transition-colors"
              title="Reset content"
            >
              <RefreshCw size={16} />
            </button>
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className={`px-4 sm:px-6 py-2 rounded-full font-black text-[10px] sm:text-xs tracking-widest uppercase transition-all shadow-md active:scale-95 ${
                isDownloading 
                ? 'bg-slate-100 text-slate-300' 
                : 'bg-[#4285F4] text-white hover:bg-blue-600 shadow-blue-100'
              }`}
            >
              {isDownloading ? '...' : 'Download PNG'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container: Column on Mobile (Preview Top), Row on Desktop */}
      <main className="flex-1 flex flex-col lg:flex-row w-full overflow-hidden">
        
        {/* Live Preview Pane: Prominent at the top on mobile */}
        <section 
          ref={previewContainerRef}
          className="w-full h-[55vh] lg:h-full lg:flex-1 bg-[#F1F3F4] flex flex-col items-center justify-center relative overflow-hidden order-1 lg:order-2 p-2"
        >
          {/* Output Scaled Wrapper */}
          <div 
            className="relative shadow-2xl bg-white transition-transform duration-300 ease-out flex-shrink-0" 
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
          
          <div className="absolute bottom-2 right-2 opacity-30 pointer-events-none">
            <p className="text-[8px] font-black text-slate-900 uppercase tracking-widest">
              1080x1350 (4:5)
            </p>
          </div>
        </section>

        {/* Editor Sidebar: Scrollable below preview on mobile */}
        <section className="w-full lg:w-[420px] p-6 lg:p-10 flex-shrink-0 border-t lg:border-t-0 lg:border-r border-slate-100 bg-white overflow-y-auto order-2 lg:order-1 shadow-2xl lg:shadow-none">
          <div className="space-y-8">
            <div className="space-y-1">
              <h2 className="text-xl font-black text-slate-900 leading-none">CONFIG</h2>
              <p className="text-slate-400 text-[9px] font-bold uppercase tracking-[0.2em]">Live content update</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Type size={12} className="text-blue-500" /> Motivational Message
                </label>
                <textarea
                  ref={textAreaRef}
                  name="quote"
                  value={details.quote}
                  onChange={handleInputChange}
                  className="w-full min-h-[100px] px-4 py-3 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-500 outline-none transition-all resize-none text-slate-800 leading-relaxed font-bold text-base shadow-sm"
                  placeholder="Type your motivation here..."
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <MapPin size={10} className="text-red-500" /> Campus Location
                  </label>
                  <div className="px-4 py-3 rounded-xl bg-slate-50 text-slate-400 font-bold text-xs border border-slate-50">
                    {details.chapterName}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <AtSign size={10} className="text-green-500" /> Social ID
                  </label>
                  <div className="px-4 py-3 rounded-xl bg-slate-50 text-slate-400 font-bold text-xs border border-slate-50">
                    @{details.socialHandle}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-50">
              <div className="p-4 bg-blue-50/50 rounded-2xl flex items-start gap-3">
                <Layout size={18} className="text-blue-400 mt-1" />
                <p className="text-[10px] text-blue-800/70 font-bold uppercase leading-tight">
                  The preview above shows the exact output for Instagram & LinkedIn. Text scales automatically as you type.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
