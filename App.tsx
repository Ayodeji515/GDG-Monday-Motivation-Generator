
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

  const updateScale = () => {
    if (previewContainerRef.current) {
      const container = previewContainerRef.current;
      const padding = window.innerWidth < 1024 ? 20 : 40; 
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
    updateScale();
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  useEffect(() => {
    updateScale();
  }, [details]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleDownload = async () => {
    const element = document.getElementById('graphic-preview');
    if (!element) return;
    try {
      setIsDownloading(true);
      await new Promise(r => setTimeout(r, 500));
      const dataUrl = await htmlToImage.toPng(element, {
        quality: 1,
        pixelRatio: 3,
        width: 1080,
        height: 1350,
      });
      const link = document.createElement('a');
      link.download = `GDG-Monday-Motivation-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Export failed:', error);
      alert('Could not generate image. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-[#F8F9FA] flex flex-col font-sans overflow-hidden">
      {/* Header Bar */}
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between z-50 flex-shrink-0">
        <div className="flex items-center gap-3">
          <BracketsLogo className="w-9 h-9" />
          <div className="flex flex-col">
            <h1 className="text-xs font-black text-slate-900 tracking-tighter uppercase leading-none">Graphic Engine</h1>
            <span className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-0.5">Monday Motivation</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setDetails(DEFAULT_DETAILS)}
            className="p-2.5 text-slate-400 hover:text-blue-500 rounded-full transition-all"
            title="Reset to Default"
          >
            <RefreshCw size={18} />
          </button>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-[10px] tracking-[0.15em] uppercase transition-all shadow-md active:scale-95 ${
              isDownloading ? 'bg-slate-100 text-slate-300' : 'bg-[#4285F4] text-white hover:bg-[#1A73E8]'
            }`}
          >
            <Download size={14} />
            {isDownloading ? 'Exporting...' : 'Download Graphic'}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Editor Sidebar */}
        <aside className="w-full lg:w-[440px] bg-white border-b lg:border-b-0 lg:border-r border-slate-200 overflow-y-auto p-6 sm:p-10 order-2 lg:order-1 flex-shrink-0">
          <div className="space-y-10 max-w-[400px] mx-auto">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Post Editor</h2>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Upload content for Monday Motivation</p>
            </div>

            <div className="space-y-8">
              {/* Main Content Text Area */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Type size={14} className="text-blue-500" /> Content Input
                </label>
                <textarea
                  ref={textAreaRef}
                  name="quote"
                  value={details.quote}
                  onChange={handleInputChange}
                  className="w-full min-h-[160px] px-5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-500 outline-none transition-all resize-none text-slate-800 font-bold text-lg leading-relaxed shadow-sm"
                  placeholder="Paste the motivation text here..."
                />
              </div>

              {/* Identity Configuration */}
              <div className="grid grid-cols-1 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <MapPin size={12} /> Chapter Name
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
                    <AtSign size={12} /> Social Handle
                  </label>
                  <input
                    type="text"
                    name="socialHandle"
                    value={details.socialHandle}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-500 outline-none transition-all text-slate-700 font-bold text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100">
              <div className="p-5 bg-slate-50 rounded-2xl flex items-start gap-4 text-slate-500">
                <Layout size={20} className="mt-1 flex-shrink-0" />
                <p className="text-[11px] font-medium leading-relaxed">
                  The graphic is fixed at 1080x1350px (Portrait 4:5), optimized for Instagram, LinkedIn, and Twitter.
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Live Preview Area */}
        <section ref={previewContainerRef} className="flex-1 bg-slate-100 flex items-center justify-center p-4 relative order-1 lg:order-2 overflow-hidden">
          <div 
            className="relative shadow-2xl bg-white transition-all duration-300 ease-out flex-shrink-0" 
            style={{ width: `${1080 * scale}px`, height: `${1350 * scale}px` }}
          >
            <div 
              className="absolute top-0 left-0 w-[1080px] h-[1350px] origin-top-left" 
              style={{ transform: `scale(${scale})` }}
            >
              <GraphicTemplate id="graphic-preview" details={details} />
            </div>
          </div>
          <div className="absolute top-6 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none select-none">
            <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.6em]">Real-time Live Preview</span>
          </div>
        </section>

      </main>
    </div>
  );
};

export default App;
