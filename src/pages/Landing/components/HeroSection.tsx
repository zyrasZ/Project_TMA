import { useState, useEffect } from 'react';

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const mockups = [
    '/mockups/mockup-1.png',
    '/mockups/mockup-2.png',
    '/mockups/mockup-3.png',
    '/mockups/mockup-4.png',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mockups.length);
    }, 3000); // Đổi ảnh mỗi 3 giây
    return () => clearInterval(timer);
  }, [mockups.length]);

  return (
    <section className="relative w-full min-h-screen bg-surface overflow-hidden flex flex-col">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* The 800x800 Primary Blob from Figma */}
        <div 
          className="absolute w-[800px] h-[800px] rounded-full mix-blend-multiply opacity-100 animate-blob"
          style={{ 
            top: '402px', 
            left: '560px', 
            background: '#18A0A0', 
            filter: 'blur(600px)',
            transform: 'translate(-50%, -50%)' // Center the blob around the coordinate
          }}
        ></div>
      </div>

      {/* Hero Content */}
      <div className="flex-1 flex flex-col items-center pt-[168px] px-4 md:px-10 text-center z-10 w-full max-w-[1728px] mx-auto">
        <div className="flex flex-col items-center w-full max-w-[1408px]">
          <h1 className="text-3xl md:text-[4vw] 2xl:text-[72px] font-bold text-content-main leading-tight 2xl:leading-[90px] mb-4 tracking-tight md:whitespace-nowrap">
            Hệ thống quản lý trạm xăng dầu <span className="text-primary">IGAS</span>
          </h1>
          <p className="text-lg md:text-xl text-content-sub max-w-2xl mb-8">
            Giải pháp hoàn hảo cho trạm xăng dầu của bạn. Giám sát mọi hoạt động bơm xăng dầu và xuất hoá đơn điện tử.
          </p>
          <button 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-white text-[16px] leading-[32px] font-semibold transition-colors duration-300 ease-out"
            style={{
              width: '173px',
              height: '56px',
              padding: '0 24px',
              borderRadius: '14px',
              gap: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `linear-gradient(${isHovered ? '#0f8a8a' : '#18A0A0'}, ${isHovered ? '#0f8a8a' : '#18A0A0'}) padding-box, linear-gradient(97.94deg, rgba(255, 255, 255, 0.7) -2.27%, rgba(255, 255, 255, 0.3) 105.46%) border-box`,
              border: '6px solid transparent',
              backdropFilter: 'blur(10px)',
              transition: 'background 0.3s ease-out'
            }}
          >
            Đăng nhập
          </button>
        </div>
      </div>

      {/* Mockup Dashboard Slider */}
      <div className="relative w-full max-w-6xl mx-auto mt-16 mb-24 px-4 z-10 flex flex-col items-center">
        <div className="relative w-full bg-white rounded-[32px] shadow-[0_20px_60px_rgba(24,160,160,0.15)] overflow-hidden border border-gray-200">
          {/* Images */}
          {mockups.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Mockup ${idx + 1}`}
              className={`${
                idx === 0 ? 'relative' : 'absolute top-0 left-0'
              } w-full h-auto object-contain transition-opacity duration-1000 ease-in-out ${
                idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            />
          ))}
          
          {/* Slider Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {mockups.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? 'bg-primary w-8' : 'bg-white hover:bg-gray-200 shadow-md'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
