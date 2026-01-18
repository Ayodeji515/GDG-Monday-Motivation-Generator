
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

  // Responsive Scaling Logic: Adjusts the preview to fit the available screen space perfectly
  const updateScale = () => {
    if (previewContainerRef.current) {
      const container = previewContainerRef.current;
      const horizontalPadding = window.innerWidth < 640 ? 20 : 60;
      const verticalPadding = window.innerWidth < 640 ? 20 : 60;
      
      const availableWidth = container.clientWidth - horizontalPadding;
      const availableHeight = container.clientHeight - verticalPadding;
      
      // Target aspect ratio is 1080/1350 (0.8)
      const scaleX = availableWidth / 1080;
      const scaleY = availableHeight / 1350;
      
      // Use the smaller scale to ensure it fits both width and height
      const newScale = Math.min(scaleX, scaleY);
      setScale(Math.max(newScale, 0.15)); // Minimum 15% scale to prevent vanishing
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updateScale);
    // Initial scale calculation with a small delay to allow DOM settling
    const timer = setTimeout(updateScale, 100);
    return () => {
      window.removeEventListener('resize', updateScale);
      clearTimeout(timer);
    };
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
      // Brief wait to ensure no pending renders affect the output
      await new Promise(r => setTimeout(r, 400));
      
      // Force 1080x1350 dimensions for the final PNG regardless of screen size
      const dataUrl = await htmlToImage.toPng(element, {
        quality: 1,
        pixelRatio: 2, // High DPI export
        width: 1080,
        height: 1350,
      });

      const link = document.createElement('a');
      link.download = `GDG-Motivation-${new Date().toISOString().split('T')[0]}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Failed to generate image:', error);
      alert('Generation failed. Please try a shorter quote or refresh.');
    } finally {
      setIsDownloading(false);
    }
  };

  const resetToDefault = () => {
    setDetails(prev => ({ ...prev, quote: "" }));
  };

  return (
    <div className="h-screen w-screen bg-white flex flex-col font-sans overflow-hidden">
      {/* Ultra-Slim Header */}
      <header className="bg-white border-b border-slate-100 px-4 py-2 sm:px-6 flex-shrink-0">
        <div className="flex justify-between items-center max-w-full mx-auto">
          <div className="flex items-center gap-2">
            <BracketsLogo className="w-7 h-7 sm:w-9 sm:h-9" />
            <span className="text-xs sm:text-sm font-black text-slate-900 tracking-tighter uppercase">
              GDG MOTIVATION GEN
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={resetToDefault}
              className="p-2 text-slate-300 hover:text-blue-500 transition-all rounded-full hover:bg-slate-50"
              title="Clear text"
            >
              <RefreshCw size={16} />
            </button>
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-black text-[10px] tracking-widest uppercase transition-all shadow-md active:scale-95 ${
                isDownloading 
                ? 'bg-slate-100 text-slate-300' 
                : 'bg-[#4285F4] text-white hover:bg-blue-600 shadow-blue-100'
              }`}
            >
              {isDownloading ? 'Working...' : 'Download PNG'}
            </button>
          </div>
        </div>
      </header>

      {/* Zero-Spacing Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row w-full overflow-hidden">
        
        {/* Editor Pane: Scrollable on Desktop, Header on Mobile */}
        <section className="w-full lg:w-[400px] xl:w-[450px] p-5 sm:p-8 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-slate-100 bg-white overflow-y-auto">
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black text-slate-900 leading-none">CONTENT</h2>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Configure for Monday</p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Type size={12} className="text-red-500" /> Message Body
                </label>
                <textarea
                  ref={textAreaRef}
                  name="quote"
                  value={details.quote}
                  onChange={handleInputChange}
                  className="w-full min-h-[80px] px-4 py-3 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-blue-500 outline-none transition-all resize-none text-slate-800 leading-relaxed font-bold text-base shadow-inner"
                  placeholder="What's the message for this week?"
                />
                <div className="flex justify-between px-1">
                  <span className="text-[9px] text-slate-300 font-bold uppercase italic">Text scales automatically</span>
                  <span className="text-[9px] text-slate-400 font-bold">{details.quote.length} chars</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    <MapPin size={10} className="inline mr-1 text-blue-500" /> Chapter Name
                  </label>
                  <div className="px-4 py-3 rounded-xl bg-slate-50 text-slate-400 font-bold text-xs truncate border border-slate-100">
                    {details.chapterName}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    <AtSign size={10} className="inline mr-1 text-yellow-500" /> Social Identity
                  </label>
                  <div className="px-4 py-3 rounded-xl bg-slate-50 text-slate-400 font-bold text-xs border border-slate-100">
                    @{details.socialHandle}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-50">
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl">
                <Layout size={20} className="text-blue-500 flex-shrink-0" />
                <p className="text-[10px] text-blue-700 font-bold leading-tight uppercase">
                  Designed for the 4:5 aspect ratio (1080x1350) for maximum Instagram feed visibility.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Live Preview Pane: Dynamic Space Filler */}
        <section 
          ref={previewContainerRef}
          className="flex-1 bg-[#F1F3F4] flex flex-col items-center justify-center relative overflow-hidden p-4"
        >
          {/* Scaled Preview Box */}
          <div 
            className="relative shadow-2xl rounded-sm overflow-hidden bg-white ring-8 ring-white/50 transition-transform duration-300 ease-out" 
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
          
          <div className="mt-4 flex flex-col items-center gap-1 opacity-30 select-none">
            <p className="text-[9px] font-black text-slate-900 uppercase tracking-[0.5em]">OUTPUT: 1080 x 1350 PX</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
