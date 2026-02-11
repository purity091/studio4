
import React, { useState, useRef } from 'react';
import { Slide, Point, ColorTheme } from '../types';
import { ICON_MAP, COLOR_THEMES } from '../constants';
import { Plus, Trash2, Wand2, RefreshCw, Upload, Palette, Settings, Code, Image as ImageIcon } from 'lucide-react';

interface EditorSidebarProps {
  slide: Slide;
  updateSlide: (updated: Slide) => void;
  onMagicWrite: () => void;
  isGenerating: boolean;
}

const EditorSidebar: React.FC<EditorSidebarProps> = ({ slide, updateSlide, onMagicWrite, isGenerating }) => {
  const [activeTab, setActiveTab] = useState<'content' | 'style' | 'css'>('content');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateSlide({ ...slide, [name]: value });
  };

  const updatePoint = (pointId: string, updates: Partial<Point>) => {
    const updatedPoints = slide.points.map(p => p.id === pointId ? { ...p, ...updates } : p);
    updateSlide({ ...slide, points: updatedPoints });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateSlide({ ...slide, mainImageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateSlide({ ...slide, logoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const applyTheme = (theme: ColorTheme) => {
    updateSlide({
      ...slide,
      accentColor: theme.primary,
      secondaryColor: theme.secondary,
      backgroundColor: theme.bg,
      textColor: theme.text
    });
  };

  const addPoint = () => {
    if (slide.points.length >= 8) return;
    const newPoint: Point = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'نقطة جديدة',
      description: 'وصف قصير للنقطة المضافة',
      icon: 'globe',
      angle: (slide.points.length * 45) % 360
    };
    updateSlide({ ...slide, points: [...slide.points, newPoint] });
  };

  const removePoint = (id: string) => {
    updateSlide({ ...slide, points: slide.points.filter(p => p.id !== id) });
  };

  return (
    <div className="sidebar-container">
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <h2 className="sidebar-title">التصميم والمحتوى</h2>
        <button
          onClick={onMagicWrite}
          disabled={isGenerating}
          className="magic-button"
          title="توليد بالذكاء الاصطناعي"
        >
          {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
        </button>
      </div>

      {/* Tabs Header */}
      <div className="tabs-header">
        <button
          onClick={() => setActiveTab('content')}
          className={`tab-button ${activeTab === 'content' ? 'active' : ''}`}
        >
          <Settings className="w-4 h-4" /> المحتوى
        </button>
        <button
          onClick={() => setActiveTab('style')}
          className={`tab-button ${activeTab === 'style' ? 'active' : ''}`}
        >
          <Palette className="w-4 h-4" /> التنسيق
        </button>
        <button
          onClick={() => setActiveTab('css')}
          className={`tab-button css-tab ${activeTab === 'css' ? 'active' : ''}`}
        >
          <Code className="w-4 h-4" /> CSS
        </button>
      </div>

      {/* Tabs Content */}
      <div className={`sidebar-scroll-area ${activeTab === 'css' ? 'css-mode' : ''}`}>
        {activeTab === 'content' && (
          <>
            <div className="space-y-4">
              <div className="form-group">
                <label className="label-small">العنوان الرئيسي</label>
                <input
                  type="text"
                  name="header"
                  value={slide.header}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <div className="form-group">
                <label className="label-small">العنوان الفرعي</label>
                <textarea
                  name="subHeader"
                  value={slide.subHeader}
                  onChange={handleChange}
                  className="textarea-field"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="label-small">الصورة المركزية</label>
              <div className="flex gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="upload-button"
                >
                  <Upload className="w-4 h-4" /> رفع صورة
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="label-small">شعار الجهة (اللوغو)</label>
              <div className="flex gap-2 items-center">
                <input
                  type="file"
                  ref={logoInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleLogoUpload}
                />
                <button
                  onClick={() => logoInputRef.current?.click()}
                  className="upload-button"
                >
                  <ImageIcon className="w-4 h-4" />
                  {slide.logoUrl ? 'تغيير اللوغو' : 'رفع لوغو'}
                </button>
                {slide.logoUrl && (
                  <button
                    onClick={() => updateSlide({ ...slide, logoUrl: '' })}
                    className="delete-button-icon"
                    title="حذف اللوغو"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="section-header">
                <h3 className="section-title">عناصر البيانات</h3>
                <button
                  onClick={addPoint}
                  className="add-button"
                >
                  <Plus className="w-4 h-4" /> إضافة
                </button>
              </div>

              <div className="points-list">
                {slide.points.map((point) => (
                  <div key={point.id} className="point-card">
                    <button
                      onClick={() => removePoint(point.id)}
                      className="trash-button"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>

                    <div className="flex gap-2 mb-2">
                      <select
                        value={point.icon}
                        onChange={(e) => updatePoint(point.id, { icon: e.target.value })}
                        className="p-1.5 border border-gray-200 rounded-lg text-[10px] bg-white"
                      >
                        {Object.keys(ICON_MAP).map(icon => (
                          <option key={icon} value={icon}>{icon}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={point.title}
                        onChange={(e) => updatePoint(point.id, { title: e.target.value })}
                        placeholder="العنوان"
                        className="flex-1 p-1.5 border border-gray-200 rounded-lg text-xs font-bold bg-white"
                      />
                    </div>
                    <textarea
                      value={point.description}
                      onChange={(e) => updatePoint(point.id, { description: e.target.value })}
                      placeholder="الوصف"
                      className="w-full p-1.5 border border-gray-200 rounded-lg text-[10px] h-12 bg-white"
                    />
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-[10px] text-gray-400 font-bold">الزاوية:</span>
                      <input
                        type="range"
                        min="0"
                        max="359"
                        value={point.angle}
                        onChange={(e) => updatePoint(point.id, { angle: parseInt(e.target.value) })}
                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'style' && (
          <div className="space-y-8">
            <div>
              <label className="label-small mb-4 uppercase tracking-wider">الثيمات الجاهزة</label>
              <div className="theme-grid">
                {COLOR_THEMES.map((theme, idx) => (
                  <button
                    key={idx}
                    onClick={() => applyTheme(theme)}
                    className={`theme-card ${slide.accentColor === theme.primary ? 'active' : ''}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 rounded-full border border-gray-100" style={{ backgroundColor: theme.primary }}></div>
                      <div className="w-4 h-4 rounded-full border border-gray-100" style={{ backgroundColor: theme.secondary }}></div>
                      <span className="text-[10px] font-bold text-gray-700">{theme.name}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full w-1/3" style={{ backgroundColor: theme.primary }}></div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t">
              <label className="label-small mb-4 uppercase tracking-wider">تخصيص الألوان</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-gray-400 mb-1">الأساسي</label>
                  <input type="color" name="accentColor" value={slide.accentColor} onChange={handleChange} className="w-full h-10 p-1 bg-white border rounded-lg cursor-pointer" />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 mb-1">الثانوي</label>
                  <input type="color" name="secondaryColor" value={slide.secondaryColor} onChange={handleChange} className="w-full h-10 p-1 bg-white border rounded-lg cursor-pointer" />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 mb-1">الخلفية</label>
                  <input type="color" name="backgroundColor" value={slide.backgroundColor} onChange={handleChange} className="w-full h-10 p-1 bg-white border rounded-lg cursor-pointer" />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 mb-1">النصوص</label>
                  <input type="color" name="textColor" value={slide.textColor} onChange={handleChange} className="w-full h-10 p-1 bg-white border rounded-lg cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'css' && (
          <div className="h-full flex flex-col p-5">
            <div className="flex justify-end mb-6">
              <h2 className="text-[#00E1C1] font-bold text-lg">محرر CSS المتقدم</h2>
            </div>

            <div className="mb-2 text-left font-mono text-xs" dir="ltr">
              <span className="text-gray-400">Classes: </span>
              <span className="text-[#00E1C1]">.canvas-container</span>, <span className="text-[#00E1C1]">.header-text</span>...
            </div>

            <textarea
              name="customCSS"
              value={slide.customCSS}
              onChange={handleChange}
              spellCheck={false}
              dir="ltr"
              className="flex-1 w-full p-4 bg-[#020617] text-gray-300 font-mono text-xs rounded-xl border border-gray-800 focus:border-[#00E1C1] focus:ring-1 focus:ring-[#00E1C1] focus:outline-none resize-none leading-relaxed placeholder-gray-600"
              placeholder="...هنا لتخصيص التصميم CSS اكتب كود"
            />

            <button
              onClick={() => updateSlide({ ...slide, customCSS: '' })}
              className="mt-4 w-full py-3 bg-[#1e293b] text-gray-400 hover:text-white hover:bg-[#334155] border border-gray-700 rounded-lg font-medium transition-colors text-sm"
            >
              إعادة تعيين CSS
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorSidebar;
