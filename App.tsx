
import React, { useState, useRef, useEffect } from 'react';
import GraphicTemplate from './components/GraphicTemplate.tsx';
import { GraphicDetails, DEFAULT_DETAILS } from './types.ts';
import * as htmlToImage from 'html-to-image';
import { Download, RefreshCw, Type, MapPin, AtSign, Layout } from 'lucide-react';
import { BracketsLogo } from './components/GDGLogo.tsx';

const App: React.FC = () => {
  const [details, setDetails] = useState<GraphicDetails>(DEFAULT_DETAILS);
  const [isDownloading, setIsDownloading] = useState(false);
  const [scale, setScale] = useState(0.4);
  
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Responsive Scaling Logic: Maximizes the "big" preview on any screen size
  const updateScale = () => {
    if (previewContainerRef.current) {
      const container = previewContainerRef.current;
      const padding = window.innerWidth < 1024 ? 24 : 64;
      
      const availableWidth = container.clientWidth - padding;
      const availableHeight = container.clientHeight - padding;
      
      const scaleX = availableWidth / 1080;
      const scaleY = availableHeight / 1350;
      
      const newScale = Math.min(scaleX, scaleY);
      setScale(Math.max(newScale, 0.1)); 
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updateScale);
    const timer = setTimeout(updateScale, 100);
    return () => {
      window.removeEventListener('resize', updateScale);
      clearTimeout(timer);
    };
  }, []);

  // Sync scale when content changes (in case of dynamic layout shifts)
  useEffect(() => {
    updateScale();
  }, [details]);

  // Auto-resize textarea for better UX
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
      // Wait for font/rendering stability
      await new Promise(r => setTimeout(r, 500));
      
      const dataUrl = await htmlToImage.toPng(element, {
        quality: 1,
        pixelRatio: 3, // Ultra-sharp 3x export
        width: 1080,
        height: 1350,
      });

      const link = document.createElement('a');
      link.download = `GDG-Monday-Motivation-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F8F9FA] flex flex-col font-sans overflow-x-hidden">
      {/* Navigation Header */}
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <BracketsLogo className="w-10 h-10" />
          <div className="flex flex-col">
            <h1 className="text-sm font-black text-slate-900 tracking-tight uppercase leading-none">
              Graphic Studio
            </h1>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
              GDG Motivation Engine
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setDetails(DEFAULT_DETAILS)}
            className="p-2 text-slate-300 hover:text-blue-500 transition-colors"
            title="Reset to defaults"
          >
            <RefreshCw size={18} />
          </button>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs tracking-widest uppercase transition-all shadow-lg active:scale-95 ${
              isDownloading 
              ? 'bg-slate-100 text-slate-300 cursor-not-allowed' 
              : 'bg-[#4285F4] text-white hover:bg-blue-600 shadow-blue-100'
            }`}
          >
            <Download size={14} />
            {isDownloading ? 'Generating...' : 'Download PNG'}
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Editor Pane */}
        <aside className="w-full lg:w-[420px] bg-white border-r border-slate-200 overflow-y-auto p-8 lg:p-10 order-2 lg:order-1">
          <div className="space-y-10">
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-900 leading-tight">Configure Post</h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Live Content Editor</p>
            </div>

            <div className="space-y-8">
              {/* Quote Block */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Type size={14} className="text-blue-500" /> Motivational Message
                </label>
                <textarea
                  ref={textAreaRef}
                  name="quote"
                  value={details.quote}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-500 outline-none transition-all resize-none text-slate-800 font-bold text-lg leading-relaxed shadow-sm"
                  placeholder="Type your motivation here..."
                />
              </div>

              {/* Identity Block */}
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <MapPin size={12} className="text-red-500" /> Chapter Name
                  </label>
                  <input
                    type="text"
                    name="chapterName"
                    value={details.chapterName}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-500 outline-none transition-all text-slate-700 font-bold text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <AtSign size={12} className="text-green-500" /> Social Handle
                  </label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">@</span>
                    <input
                      type="text"
                      name="socialHandle"
                      value={details.socialHandle}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-5 py-3 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-500 outline-none transition-all text-slate-700 font-bold text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Hint Box */}
            <div className="pt-8 border-t border-slate-100">
              <div className="p-5 bg-blue-50 rounded-2xl flex items-start gap-4">
                <Layout size={20} className="text-blue-400 mt-1" />
                <p className="text-[11px] text-blue-800 font-medium leading-relaxed">
                  The preview scales automatically to fit your screen. For the final image, we use an industry-standard 1080x1350 resolution (4:5 aspect ratio) for maximum social media impact.
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Preview Pane */}
        <section 
          ref={previewContainerRef}
          className="flex-1 h-[65vh] lg:h-full bg-slate-100 flex items-center justify-center p-6 relative order-1 lg:order-2"
        >
          {/* Dynamic Scale Wrapper */}
          <div 
            className="relative shadow-2xl bg-white flex-shrink-0 transition-transform duration-300 ease-out" 
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

          <div className="absolute bottom-6 right-8 opacity-20 pointer-events-none select-none">
            <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.5em]">
              Real-time Output
            </span>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
