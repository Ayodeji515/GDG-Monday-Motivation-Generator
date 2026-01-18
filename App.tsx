
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

  /**
   * Powerful scaling engine that calculates the perfect fit for the 1080x1350 canvas
   * across all screen sizes, ensuring the "big" preview is always sharp and readable.
   */
  const updateScale = () => {
    if (previewContainerRef.current) {
      const container = previewContainerRef.current;
      // Minimal padding to maximize "Big" visibility as requested
      const padding = 24; 
      
      const availableWidth = container.clientWidth - padding;
      const availableHeight = container.clientHeight - padding;
      
      const scaleX = availableWidth / 1080;
      const scaleY = availableHeight / 1350;
      
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
      await new Promise(r => setTimeout(r, 600));
      
      const dataUrl = await htmlToImage.toPng(element, {
        quality: 1,
        pixelRatio: 2.5, // High resolution for professional social media posts
        width: 1080,
        height: 1350,
      });

      const link = document.createElement('a');
      link.download = `GDG-Motivation-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to generate image. Please check your browser permissions.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-[#F8F9FA] flex flex-col font-sans overflow-hidden">
      {/* Header Bar */}
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <BracketsLogo className="w-9 h-9" />
          <div className="flex flex-col">
            <h1 className="text-xs font-black text-slate-900 tracking-tighter uppercase leading-none">
              Graphic Studio
            </h1>
            <span className="text-[10px] text-blue-500 font-bold uppercase tracking-widest mt-0.5">
              Monday Motivation
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setDetails(prev => ({ ...prev, quote: "" }))}
            className="p-2.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-all"
            title="Clear Message"
          >
            <RefreshCw size={18} />
          </button>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-[10px] tracking-[0.15em] uppercase transition-all shadow-md active:scale-95 ${
              isDownloading 
              ? 'bg-slate-100 text-slate-300' 
              : 'bg-[#4285F4] text-white hover:bg-[#1A73E8] shadow-blue-100'
            }`}
          >
            <Download size={14} />
            {isDownloading ? 'Processing...' : 'Export Image'}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Live Preview Area - SHOWN FIRST ON MOBILE */}
        <section 
          ref={previewContainerRef}
          className="flex-1 h-[55vh] lg:h-full bg-slate-50 flex flex-col items-center justify-center p-4 lg:p-12 relative order-1 lg:order-2 overflow-hidden"
        >
          {/* Canvas Wrapper */}
          <div 
            className="relative shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] bg-white transition-all duration-300 ease-out" 
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
          
          <div className="absolute top-6 left-1/2 -translate-x-1/2 lg:bottom-10 lg:top-auto pointer-events-none opacity-20">
            <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.6em]">
              Real-time Preview
            </span>
          </div>
        </section>

        {/* Editor Sidebar */}
        <aside className="w-full lg:w-[440px] bg-white border-t lg:border-t-0 lg:border-r border-slate-200 overflow-y-auto p-6 sm:p-10 order-2 lg:order-1 shadow-2xl lg:shadow-none">
          <div className="space-y-10 max-w-[400px] mx-auto">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Post Content</h2>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Update post details below</p>
            </div>

            <div className="space-y-8">
              {/* Message Input */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Type size={14} className="text-blue-500" /> Motivational Quote
                </label>
                <textarea
                  ref={textAreaRef}
                  name="quote"
                  value={details.quote}
                  onChange={handleInputChange}
                  className="w-full min-h-[120px] px-5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-500 outline-none transition-all resize-none text-slate-800 font-bold text-lg leading-relaxed shadow-sm"
                  placeholder="Paste your weekly motivation message here..."
                />
              </div>

              {/* Branding Info */}
              <div className="grid grid-cols-1 gap-5">
                <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100 flex items-start gap-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <MapPin size={16} className="text-blue-500" />
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-blue-400 uppercase tracking-widest block mb-1">
                      Organization
                    </label>
                    <p className="text-blue-900 font-bold text-sm leading-tight">
                      {details.chapterName}
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4">
                   <div className="p-2 bg-white rounded-lg shadow-sm">
                    <AtSign size={16} className="text-slate-500" />
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                      Social Handle
                    </label>
                    <p className="text-slate-700 font-bold text-sm leading-tight">
                      @{details.socialHandle}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100">
              <div className="p-5 bg-slate-50 rounded-2xl flex items-start gap-4">
                <Layout size={20} className="text-slate-400 mt-1" />
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                  The graphic is fixed at 1080x1350px (Portrait 4:5). This format is optimized for high engagement on Instagram, Twitter, and LinkedIn.
                </p>
              </div>
            </div>
          </div>
        </aside>

      </main>
    </div>
  );
};

export default App;
