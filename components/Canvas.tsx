
import React from 'react';
import { Slide } from '../types';
import { ICON_MAP } from '../constants';

interface CanvasProps {
  slide: Slide;
}

const Canvas: React.FC<CanvasProps> = ({ slide }) => {
  const getPosition = (angle: number, radius: number) => {
    const radian = (angle * Math.PI) / 180;
    return {
      x: 50 + radius * Math.cos(radian),
      y: 50 + radius * Math.sin(radian),
    };
  };

  const bgColor = slide.backgroundColor || '#FFFFFF';
  const accent = slide.accentColor || '#CC0000';
  const secondary = slide.secondaryColor || '#FFDE00';
  const textColor = slide.textColor || '#1A1A1A';

  // SVG gradient ID needs to be unique if multiple instances exist, 
  // but for this app single canvas structure, a static ID is fine.
  const gradientId = `glow-gradient-${slide.id}`;

  return (
    <div className="canvas-viewport">
      <style>{`
        ${slide.customCSS}
        /* تثبيت خصائص النصوص لضمان مطابقة التصدير للمعاينة */
        .export-text-fix {
          line-height: 1.2 !important;
          vertical-align: middle;
        }
        #infographic-capture-area * {
          box-sizing: border-box;
        }
      `}</style>

      <div
        id="infographic-capture-area"
        className="canvas-container infographic-canvas"
        style={{
          width: '640px',
          height: '800px',
          backgroundColor: bgColor,
          color: textColor,
          fontFamily: "'IBM Plex Sans Arabic', sans-serif"
        }}
      >
        {/* Background Gradients - Fixed for Export */}
        <div className="canvas-bg-overlay"
          style={{
            background: `linear-gradient(135deg, ${accent}15 0%, transparent 50%), linear-gradient(315deg, ${secondary}15 0%, transparent 50%)`
          }}
        />

        {/* Top Accents */}
        <div className="canvas-top-accents">
          <div className="flex-1" style={{ backgroundColor: accent }}></div>
          <div className="w-1/3" style={{ backgroundColor: secondary }}></div>
        </div>

        {/* Header Section */}
        <div className="canvas-header-section">
          <h1 className="canvas-title header-text export-text-fix" style={{ color: accent }}>
            {slide.header}
          </h1>
          <div className="canvas-subtitle-container">
            <p className="canvas-subtitle export-text-fix" style={{ color: textColor }}>
              {slide.subHeader}
            </p>
            <div className="canvas-subtitle-underline" style={{ backgroundColor: secondary }}></div>
          </div>
        </div>

        {/* Main Circular Area */}
        <div className="canvas-main-area">
          {/* Central Image & Glow - Using SVG for robust html2canvas export */}
          <div className="canvas-center-visual">
            <div className="w-full h-full relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 0, transform: 'scale(1.4)' }}>
                <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
                  <defs>
                    <radialGradient id={gradientId} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                      <stop offset="0%" stopColor={accent} stopOpacity="0.25" />
                      <stop offset="70%" stopColor={accent} stopOpacity="0.1" />
                      <stop offset="100%" stopColor={accent} stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle cx="50" cy="50" r="50" fill={`url(#${gradientId})`} />
                </svg>
              </div>

              <img
                src={slide.mainImageUrl}
                alt="Main Visual"
                crossOrigin="anonymous"
                className="canvas-center-image"
              />
            </div>
          </div>

          {/* Points - Uses Absolute positioning for stability */}
          {slide.points.map((point) => {
            const pos = getPosition(point.angle, 38);
            const isLeft = pos.x < 50;

            return (
              <div
                key={point.id}
                className="canvas-point-wrapper"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {/* Icon */}
                <div
                  className="canvas-point-icon-box"
                  style={{
                    backgroundColor: accent,
                    borderColor: secondary,
                    transform: 'rotate(3deg)'
                  }}
                >
                  <div style={{ transform: 'rotate(-3deg)' }}>
                    {ICON_MAP[point.icon] || ICON_MAP['globe']}
                  </div>
                </div>

                {/* Text Block */}
                <div className="canvas-point-text-block" style={{ alignItems: 'center', textAlign: 'center' }}>
                  <div className="mb-1 w-fit">
                    <span className="canvas-point-title-badge export-text-fix"
                      style={{ borderColor: accent, color: accent }}>
                      {point.title}
                    </span>
                  </div>
                  <p className="canvas-point-description export-text-fix" style={{ color: textColor }}>
                    {point.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="canvas-footer" style={{ backgroundColor: `${accent}0A`, borderTop: `1px solid ${secondary}33` }}>
          <div className="canvas-footer-content" style={{
            height: '50px',
            padding: '0 40px',
            alignItems: 'center'
          }}>
            {/* Right Side (Start in RTL) - Distinctive Name */}
            <div className="footer-right-container" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ position: 'relative', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundColor: secondary, transform: 'rotate(45deg)', borderRadius: '4px', opacity: 0.9 }}></div>
                <div style={{ position: 'absolute', width: '10px', height: '10px', backgroundColor: accent, borderRadius: '2px', transform: 'rotate(45deg)', zIndex: 10 }}></div>
              </div>
              <span className="footer-company-name export-text-fix" style={{ color: textColor, fontWeight: 900, fontSize: '1.2rem', letterSpacing: '-0.5px' }}>
                منصة المستثمر الاقتصادية
              </span>
            </div>

            {/* Left Side (End in RTL) - Professional URL (No Logo) */}
            <div className="footer-link-container" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{ width: '30px', height: '2px', backgroundColor: secondary, opacity: 0.8 }}></div>
              <span className="export-text-fix" style={{ color: accent, fontWeight: 800, fontSize: '1.1rem', letterSpacing: '1px' }}>
                al-investor.com
              </span>
            </div>
          </div>

          <div className="canvas-footer-accents">
            <div className="flex-1" style={{ backgroundColor: accent }}></div>
            <div className="w-1/4" style={{ backgroundColor: secondary }}></div>
            <div className="w-1/4" style={{ backgroundColor: accent }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
