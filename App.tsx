
import React, { useState, useRef } from 'react';
import GraphicTemplate from './components/GraphicTemplate.tsx';
import { GraphicDetails, DEFAULT_DETAILS } from './types.ts';
import * as htmlToImage from 'html-to-image';
import { Download, RefreshCw, Sparkles, Layout, Type, MapPin, AtSign } from 'lucide-react';

const App: React.FC = () => {
  const [details, setDetails] = useState<GraphicDetails>(DEFAULT_DETAILS);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleDownload = async () => {
    const element = document.getElementById('graphic-preview');
    if (!element) return;

    try {
      setIsDownloading(true);
      await new Promise(r => setTimeout(r, 100));
      
      const dataUrl = await htmlToImage.toPng(element, {
        quality: 1,
        pixelRatio: 2,
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
    setDetails(DEFAULT_DETAILS);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Sparkles className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">GDG Motivation Generator</h1>
          </div>
          <button 
            onClick={resetToDefault}
            className="text-slate-500 hover:text-blue-600 flex items-center gap-2 text-sm font-medium transition-colors"
          >
            <RefreshCw size={16} />
            Reset to Defaults
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:items-start">
        <section className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6 lg:p-8 space-y-6 border border-slate-100">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900">Customizer</h2>
            <p className="text-slate-500">Tailor the Monday Motivation graphic for your chapter.</p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <MapPin size={16} className="text-blue-500" />
                  Chapter Name
                </label>
                <input
                  type="text"
                  name="chapterName"
                  value={details.chapterName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Layout size={16} className="text-green-500" />
                  Context Text
                </label>
                <input
                  type="text"
                  name="subText"
                  value={details.subText}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Type size={16} className="text-red-500" />
                Motivational Quote
              </label>
              <textarea
                name="quote"
                value={details.quote}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <AtSign size={16} className="text-yellow-500" />
                Social Handle
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">@</span>
                <input
                  type="text"
                  name="socialHandle"
                  value={details.socialHandle}
                  onChange={handleInputChange}
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-200 transition-all ${
                isDownloading 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]'
              }`}
            >
              {isDownloading ? (
                <>
                  <RefreshCw className="animate-spin" size={24} />
                  Generating Image...
                </>
              ) : (
                <>
                  <Download size={24} />
                  Download Graphic
                </>
              )}
            </button>
          </div>
        </section>

        <section className="flex flex-col items-center">
          <div className="w-full mb-4 flex justify-between items-center px-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Live Preview</h3>
            <span className="bg-blue-50 text-blue-600 text-[10px] px-2 py-1 rounded font-bold">1080x1350</span>
          </div>
          
          <div className="relative w-full aspect-[4/5] max-w-[540px] bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
             <div className="absolute inset-0 overflow-hidden bg-[#F3F6FF]">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 scale-[0.5] origin-top">
                 <GraphicTemplate id="graphic-preview" details={details} />
               </div>
             </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-slate-200 mt-auto bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
          Built for GDG Leads & Creatives • 2024
        </div>
      </footer>
    </div>
  );
};

export default App;
