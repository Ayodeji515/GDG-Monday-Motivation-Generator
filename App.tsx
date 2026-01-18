
import React, { useState, useRef, useEffect } from 'react';
import GraphicTemplate from './components/GraphicTemplate.tsx';
import { GraphicDetails, DEFAULT_DETAILS } from './types.ts';
import * as htmlToImage from 'html-to-image';
import { RefreshCw, Layout, Type, MapPin, AtSign, Download } from 'lucide-react';
import { BracketsLogo } from './components/GDGLogo.tsx';

const App: React.FC = () => {
  const [details, setDetails] = useState<GraphicDetails>(DEFAULT_DETAILS);
  const [isDownloading, setIsDownloading] = useState(false);
  const [scale, setScale] = useState(0.4);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  // Dynamic Scaling Engine - Optimized to maximize "big" output visibility
  const updateScale = () => {
    if (previewContainerRef.current) {
      const container = previewContainerRef.current;
      // Tight paddings to maximize the "big" feel on all screens
      const horizontalPadding = window.innerWidth < 640 ? 16 : 40;
      const verticalPadding = window.innerWidth < 640 ? 16 : 40;
      
      const availableWidth = container.clientWidth - horizontalPadding;
      const availableHeight = container.clientHeight - verticalPadding;
      
      const scaleX = availableWidth / 1080;
      const scaleY = availableHeight / 1350;
      
      // Fill as much of the container as possible without overflow
      const newScale = Math.min(scaleX, scaleY);
      setScale(Math.max(newScale, 0.05)); 
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updateScale);
    const timer = setTimeout(updateScale, 150);
    return () => {
      window.removeEventListener('resize', updateScale);
      clearTimeout(timer);
    };
  }, []);

  // Sync scale when details change as it might affect layout
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
    if (typeof value === 'string') {
      setDetails(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDownload = async () => {
    const element = document.getElementById('graphic-preview');
    if (!element) return;

    try {
      setIsDownloading(true);
      // Wait for layout stability
      await new Promise(r => setTimeout(r, 600));
      
      const dataUrl = await htmlToImage.toPng(element, {
        quality: 1,
        pixelRatio: 2.5, // High resolution output
        width: 1080,
        height: 1350,
      });

      const link = document.createElement('a');
      link.download = `GDG-Motivation-${new Date().getTime()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Download failed:', error);
      alert('Error generating image. Please try a modern browser.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#F8F9FA] flex flex-col font-sans overflow-hidden">
      {/* Header Bar */}
      <header className="bg-white border-b border-[#E8EAED] px-4 py-3 sm:px-8 flex-shrink-0 z-20 shadow-sm">
        <div className="flex justify-between items-center w-full max-w-[1600px] mx-auto">
          <div className="flex items-center gap-3">
            <BracketsLogo className="w-10 h-10" />
            <div className="hidden sm:block">
              <span className="text-sm font-black text-[#202124] tracking-tight uppercase block leading-none">
                GDG Graphic Engine
              </span>
              <span className="text-[10px] text-[#5F6368] font-bold uppercase tracking-widest leading-none">
                Monday Motivation
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setDetails(prev => ({ ...prev, quote: "" }))}
              className="p-2.5 text-[#5F6368] hover:text-[#4285F4] hover:bg-[#F1F3F4] rounded-full transition-all"
              title="Clear text"
            >
              <RefreshCw size={20} />
            </button>
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs tracking-widest uppercase transition-all shadow-md active:scale-95 ${
                isDownloading 
                ? 'bg-[#F1F3F4] text-[#BDC1C6]' 
                : 'bg-[#4285F4] text-white hover:bg-[#1A73E8] shadow-[#4285F420]'
              }`}
            >
              <Download size={16} />
              {isDownloading ? 'Processing...' : 'Export PNG'}
            </button>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 flex flex-col lg:flex-row w-full overflow-hidden">
        
        {/* Editor Sidebar */}
        <section className="w-full lg:w-[460px] p-6 sm:p-10 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-[#E8EAED] bg-white overflow-y-auto order-2 lg:order-1 shadow-inner lg:shadow-none">
          <div className="space-y-10 max-w-[500px] mx-auto">
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-[#202124] leading-tight">Post Configuration</h2>
              <p className="text-[#5F6368] text-[11px] font-bold uppercase tracking-[0.2em]">Customize your weekly motivation</p>
            </div>

            <div className="space-y-8">
              {/* Quote Input */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-[#5F6368] uppercase tracking-[0.2em] flex items-center gap-2">
                  <Type size={14} className="text-[#4285F4]" /> Message Content
                </label>
                <textarea
                  ref={textAreaRef}
                  name="quote"
                  value={details.quote}
                  onChange={handleInputChange}
                  className="w-full min-h-[140px] px-5 py-4 rounded-2xl border-2 border-[#F1F3F4] bg-[#F8F9FA] focus:bg-white focus:border-[#4285F4] outline-none transition-all resize-none text-[#202124] leading-relaxed font-bold text-lg shadow-sm"
                  placeholder="Paste your motivational quote here..."
                />
              </div>

              {/* Readonly Info */}
              <div className="grid grid-cols-1 gap-5">
                <div className="p-5 rounded-2xl bg-[#E8F0FE] border border-[#D2E3FC]">
                   <label className="text-[9px] font-black text-[#1967D2] uppercase tracking-[0.2em] mb-2 block">
                    <MapPin size={10} className="inline mr-1" /> Verified Chapter
                  </label>
                  <p className="text-[#1967D2] font-bold text-sm leading-tight">
                    {details.chapterName}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#E6F4EA] border border-[#CEEAD6]">
                  <label className="text-[9px] font-black text-[#137333] uppercase tracking-[0.2em] mb-2 block">
                    <AtSign size={10} className="inline mr-1" /> Social Presence
                  </label>
                  <p className="text-[#137333] font-bold text-sm leading-tight">
                    @{details.socialHandle}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-[#F1F3F4]">
              <div className="p-5 bg-[#F1F3F4] rounded-2xl flex items-start gap-4">
                <Layout size={20} className="text-[#5F6368] mt-1" />
                <p className="text-[11px] text-[#5F6368] font-medium leading-relaxed">
                  The high-resolution preview updates in real-time. Text size scales automatically to ensure a perfect fit within the signature blue box.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Live Preview Pane */}
        <section 
          ref={previewContainerRef}
          className="flex-1 bg-[#F1F3F4] flex flex-col items-center justify-center relative overflow-hidden order-1 lg:order-2 p-4"
        >
          {/* Scaled Render Container */}
          <div 
            className="relative shadow-[0_24px_48px_-12px_rgba(0,0,0,0.15)] bg-white transition-all duration-300 ease-out" 
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
          
          <div className="mt-8 opacity-20 hidden sm:block">
            <p className="text-[10px] font-black text-[#202124] uppercase tracking-[0.8em] select-none">
              REAL-TIME OUTPUT RENDERING
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
