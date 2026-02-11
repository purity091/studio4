
import React, { useState, useCallback } from 'react';
import { Slide, Project, Point } from './types';
import { DEFAULT_PROJECT } from './constants';
import EditorSidebar from './components/EditorSidebar';
import Canvas from './components/Canvas';
import { generateSlideContent } from './services/geminiService';
import { Download, LayoutGrid, ChevronRight, ChevronLeft, Plus, Sparkles, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';

const App: React.FC = () => {
  const [project, setProject] = useState<Project>(DEFAULT_PROJECT);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const activeSlide = project.slides[activeSlideIndex];

  const updateSlide = useCallback((updatedSlide: Slide) => {
    setProject(prev => ({
      ...prev,
      slides: prev.slides.map((s, i) => i === activeSlideIndex ? updatedSlide : s)
    }));
  }, [activeSlideIndex]);

  const addNewSlide = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    const newSlide: Slide = {
      ...activeSlide,
      id: newId,
      header: 'موضوع جديد',
      subHeader: 'وصف فرعي للشريحة الجديدة',
      points: [
        { id: '1', title: 'بيانات 1', description: 'أدخل الوصف هنا', icon: 'globe', angle: 270 },
        { id: '2', title: 'بيانات 2', description: 'أدخل الوصف هنا', icon: 'zap', angle: 90 }
      ]
    };
    setProject(prev => ({
      ...prev,
      slides: [...prev.slides, newSlide]
    }));
    setActiveSlideIndex(project.slides.length);
  };

  const handleMagicWrite = async () => {
    setIsGenerating(true);
    const content = await generateSlideContent(activeSlide.header || "تكنولوجيا المستقبل");
    if (content) {
      const updatedPoints: Point[] = content.points.map((p: any, idx: number) => ({
        id: Math.random().toString(36).substr(2, 9),
        title: p.title,
        description: p.description,
        icon: p.icon || 'globe',
        angle: (idx * (360 / Math.max(1, content.points.length))) % 360
      }));

      updateSlide({
        ...activeSlide,
        header: content.header,
        subHeader: content.subHeader,
        points: updatedPoints
      });
    }
    setIsGenerating(false);
  };

  const downloadImage = async () => {
    const element = document.getElementById('infographic-capture-area');
    if (!element) return;

    try {
      setIsDownloading(true);
      
      // Wait for fonts
      await document.fonts.ready;
      
      // Small delay for DOM stability
      await new Promise(r => setTimeout(r, 600));
      
      const canvas = await html2canvas(element, {
        useCORS: true,
        allowTaint: true,
        scale: 2.5, // Reduced slightly from 3 to improve stability with gradients
        backgroundColor: activeSlide.backgroundColor,
        logging: false,
        onclone: (clonedDoc) => {
          const el = clonedDoc.getElementById('infographic-capture-area');
          if (el) {
            el.style.boxShadow = 'none';
            el.style.transform = 'none';
            
            // Fix text rendering
            const allText = el.querySelectorAll('h1, p, span');
            allText.forEach((t: any) => {
              t.style.lineHeight = '1.2';
              t.style.display = 'block';
            });
          }
        }
      });
      
      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `infographic-${Date.now()}.png`;
      link.href = image;
      link.click();
    } catch (error) {
      console.error('Download error:', error);
      alert('حدث خطأ أثناء التصدير.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="app-wrapper" dir="rtl">
      <EditorSidebar 
        slide={activeSlide} 
        updateSlide={updateSlide} 
        onMagicWrite={handleMagicWrite}
        isGenerating={isGenerating}
      />

      <div className="main-content">
        <header className="app-header">
          <div className="header-logo-container">
            <div className="logo-icon-box">
              <LayoutGrid className="w-6 h-6" />
            </div>
            <div>
              <h1 className="header-title-text">مصمم الكاروسيل الذكي</h1>
              <div className="status-indicator">
                <span className="dot-pulse"></span>
                <p className="status-label">Live Editor Active</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="nav-controls">
              <button 
                disabled={activeSlideIndex === 0}
                onClick={() => setActiveSlideIndex(i => i - 1)}
                className="nav-button"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="nav-counter">
                <span className="nav-counter-current">{activeSlideIndex + 1}</span>
                <span className="nav-counter-divider">/</span>
                <span>{project.slides.length}</span>
              </div>
              <button 
                disabled={activeSlideIndex === project.slides.length - 1}
                onClick={() => setActiveSlideIndex(i => i + 1)}
                className="nav-button"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
            
            <button 
              onClick={addNewSlide}
              className="button-secondary"
            >
              <Plus className="w-5 h-5" />
              شريحة
            </button>

            <button 
              onClick={downloadImage}
              disabled={isDownloading}
              className="button-primary"
            >
              {isDownloading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              )}
              {isDownloading ? 'جاري الرندر...' : 'تصدير بجودة مطابقة'}
            </button>
          </div>
        </header>

        <Canvas slide={activeSlide} />

        <div className="pagination-dots">
          {project.slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlideIndex(i)}
              className={`dot ${activeSlideIndex === i ? 'active' : 'inactive'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
