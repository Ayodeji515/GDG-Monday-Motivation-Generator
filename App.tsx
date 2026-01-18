
import React, { useState, useRef, useEffect } from 'react';
import GraphicTemplate from './components/GraphicTemplate.tsx';
import { GraphicDetails, DEFAULT_DETAILS } from './types.ts';
import * as htmlToImage from 'html-to-image';
import { Download, RefreshCw, Type, MapPin, AtSign } from 'lucide-react';
import { BracketsLogo } from './components/GDGLogo.tsx';

const App: React.FC = () => {
  const [details, setDetails] = useState<GraphicDetails>(DEFAULT_DETAILS);
  const [isDownloading, setIsDownloading] = useState(false);
  const [scale, setScale] = useState(0.4);
  
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const updateScale = () => {
    if (previewContainerRef.current) {
      const container = previewContainerRef.current;
      // Use smaller padding on mobile to maximize graphic size
      const isMobile = window.innerWidth < 1024;
      const padding = isMobile ? 16 : 48;
      
      const availableWidth = container.clientWidth - padding;
      const availableHeight = container.clientHeight - padding;
      
      const scaleX = availableWidth / 1080;
      const scaleY = availableHeight / 1600;
      
      const newScale = Math.min(scaleX, scaleY);
      // Ensure it doesn't get too small to see, but fits the screen
      setScale(Math.max(newScale, 0.01)); 
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updateScale);
    // Use a small timeout to ensure layout has settled
    const timer = setTimeout(updateScale, 100);
    return () => {
      window.removeEventListener('resize', updateScale);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    updateScale();
  }, [details]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDetails(prev => ({ ...prev, quote: e.target.value }));
  };

  const handleDownload = async () => {
    const element = document.getElementById('graphic-preview');
    if (!element) return;
    try {
      setIsDownloading(true);
      // Small delay for UI feedback
      await new Promise(r => setTimeout(r, 400)); 
      const dataUrl = await htmlToImage.toPng(element, {
        quality: 1,
        pixelRatio: 3, 
        width: 1080,
        height: 1600,
      });
      const link = document.createElement('a');
      link.download = `GDG-Monday-Motivation-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#F8F9FA] flex flex-col font-sans overflow-hidden">
      {/* Header Bar */}
      <header className="h-14 lg:h-16 bg-white border-b border-slate-200 px-4 lg:px-6 flex items-center justify-between z-50 flex-shrink-0 shadow-sm">
        <div className="flex items-center gap-2 lg:gap-3">
          <BracketsLogo className="w-7 h-7 lg:w-9 h-9" />
          <div className="flex flex-col">
            <h1 className="text-[10px] lg:text-xs font-black text-slate-900 tracking-tighter uppercase leading-none">Graphic Studio</h1>
            <span className="text-[8px] lg:text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-0.5">Monday Motivation</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 lg:gap-4">
          <button 
            onClick={() => setDetails(prev => ({ ...prev, quote: "" }))}
            className="p-2 text-slate-400 hover:text-blue-500 rounded-full transition-all active:bg-blue-50"
            title="Clear Message"
          >
            <RefreshCw size={16} />
          </button>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className={`flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-2.5 rounded-full font-bold text-[9px] lg:text-[10px] tracking-[0.1em] lg:tracking-[0.15em] uppercase transition-all shadow-md active:scale-95 ${
              isDownloading ? 'bg-slate-100 text-slate-300' : 'bg-[#4285F4] text-white hover:bg-[#1A73E8] shadow-blue-100'
            }`}
          >
            <Download size={14} />
            {isDownloading ? '...' : 'Download'}
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Live Preview Area - Hero on Mobile (Top) */}
        <section 
          ref={previewContainerRef} 
          className="flex-[1.5] lg:flex-1 bg-slate-100 flex items-center justify-center p-4 lg:p-8 relative overflow-hidden order-1 lg:order-2"
        >
          <div 
            className="relative shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] bg-white transition-all duration-300 ease-out flex-shrink-0" 
            style={{ 
              width: `${1080 * scale}px`, 
              height: `${1600 * scale}px` 
            }}
          >
            <div 
              className="absolute top-0 left-0 w-[1080px] h-[1600px] origin-top-left" 
              style={{ transform: `scale(${scale})` }}
            >
              <GraphicTemplate id="graphic-preview" details={details} />
            </div>
          </div>
        </section>

        {/* Editor Sidebar - Bottom on Mobile */}
        <aside className="flex-1 lg:w-[440px] lg:flex-none bg-white border-t lg:border-t-0 lg:border-r border-slate-200 overflow-y-auto p-5 lg:p-10 order-2 lg:order-1 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] lg:shadow-none">
          <div className="space-y-6 lg:space-y-10 max-w-[400px] mx-auto">
            <div className="hidden lg:block space-y-1">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Post Editor</h2>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Type your weekly motivation below</p>
            </div>

            <div className="space-y-6 lg:space-y-8">
              {/* Main Content Text Area */}
              <div className="space-y-2 lg:space-y-3">
                <label className="text-[9px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Type size={12} className="text-blue-500" /> Motivational Message
                </label>
                <textarea
                  ref={textAreaRef}
                  value={details.quote}
                  onChange={handleInputChange}
                  className="w-full h-32 lg:min-h-[180px] lg:h-auto px-4 lg:px-5 py-3 lg:py-4 rounded-xl lg:rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-500 outline-none transition-all resize-none text-slate-800 font-bold text-sm lg:text-lg leading-relaxed shadow-sm"
                  placeholder="Paste the motivation text here..."
                />
              </div>

              {/* Identity Branding (Mobile-Optimized Layout) */}
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 lg:gap-5">
                <div className="p-3 lg:p-5 rounded-xl lg:rounded-2xl bg-slate-50 border border-slate-100 flex items-center lg:items-start gap-2 lg:gap-4 opacity-70">
                  <div className="hidden lg:block p-2 bg-white rounded-lg shadow-sm">
                    <MapPin size={16} className="text-slate-500" />
                  </div>
                  <div>
                    <label className="text-[7px] lg:text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-0.5 lg:mb-1">Organization</label>
                    <p className="text-slate-700 font-bold text-[10px] lg:text-sm leading-tight truncate">{details.chapterName}</p>
                  </div>
                </div>

                <div className="p-3 lg:p-5 rounded-xl lg:rounded-2xl bg-slate-50 border border-slate-100 flex items-center lg:items-start gap-2 lg:gap-4 opacity-70">
                   <div className="hidden lg:block p-2 bg-white rounded-lg shadow-sm">
                    <AtSign size={16} className="text-slate-500" />
                  </div>
                  <div>
                    <label className="text-[7px] lg:text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-0.5 lg:mb-1">Social</label>
                    <p className="text-slate-700 font-bold text-[10px] lg:text-sm leading-tight truncate">@{details.socialHandle}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

      </main>
    </div>
  );
};

export default App;
