import React, { useState, useEffect, useRef } from "react";
import { ArrowUp, ChevronDown, Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register GSAP plugins
gsap.registerPlugin(ScrollToPlugin);

const TOTAL_FRAMES = 180;

interface Section {
  title: string;
  subtitle: string;
  description: string;
  range: [number, number];
}

const SECTIONS_EN: Section[] = [
  {
    title: "The Technological Infrastructure for Your SaaS Solutions",
    subtitle: "Advanced Cloud Architecture",
    description: "High-performance, stable, and highly functional software architecture designed to accelerate development and eliminate networking and computing complexities. We provide the core engines enabling you to hit the market in record time.",
    range: [0.0, 0.20],
  },
  {
    title: "Efficient Innovation & Maximum Performance",
    subtitle: "Lean Engineering",
    description: "We break down bloated architectures in favor of clean code, microservices, and efficient user interfaces. Every component is engineered to maximize response speed, minimize resource overhead, and ensure a smooth, goal-oriented user experience.",
    range: [0.25, 0.45],
  },
  {
    title: "High-Performance Engine",
    subtitle: "Scalable Execution",
    description: "Our core systems feature advanced rendering and processing engines, built-in hardware acceleration, and asynchronous real-time data streaming—ensuring zero latency and absolute reliability under heavy enterprise workloads.",
    range: [0.50, 0.70],
  },
  {
    title: "Give Your Organization the Required Tech Edge",
    subtitle: "Enterprise Software Solutions",
    description: "Join developers, entrepreneurs, architects, and established enterprises building the future of scalable SaaS platforms.",
    range: [0.75, 0.95],
  },
  {
    title: "Connect With Us",
    subtitle: "Strategic Partnerships & Development",
    description: "We are currently accepting selective integrations, dedicated development projects, and strategic partnerships for large-scale SaaS systems.",
    range: [0.97, 1.00],
  }
];

const SECTIONS_HE: Section[] = [
  {
    title: "התשתית הטכנולוגית ליישום פתרונות ה-SaaS שלכם",
    subtitle: "ארכיטקטורת ענן מתקדמת",
    description: "ארכיטקטורת תוכנה מתקדמת, יציבה ובעלת פונקציונליות גבוהה, המתוכננת להאצת פיתוח וביטול מורכבויות רשת ומחשוב. אנו מספקים את הכלים ומנועי הליבה המאפשרים לכם להביא מוצרים לשוק במהירות חסרת תקדים.",
    range: [0.0, 0.20],
  },
  {
    title: "חדשנות יעילה וביצועים מקסימליים",
    subtitle: "הנדסת מוצר חכמה (Lean Engineering)",
    description: "אנו מפרקים ארכיטקטורות תוכנה מנופחות לטובת קוד נקי, רכיבי מיקרו-שירותים (Microservices) וממשקי משתמש יעילים. כל רכיב מערכת מתוכנן במטרה למקסם את מהירות התגובה, לצמצם צריכת משאבים ולהבטיח חוויית משתמש חלקה וממוקדת מטרה.",
    range: [0.25, 0.45],
  },
  {
    title: "ארכיטקטורה עתירת ביצועים (High-Performance Engine)",
    subtitle: "ביצועים בקנה מידה רחב",
    description: "מערכות הליבה שלנו כוללות מנועי רינדור ועיבוד מתקדמים, תמיכה מובנית בהאצת חומרה (Hardware Acceleration), וניהול אסינכרוני של זרימת נתונים בזמן אמת – המבטיחים אפס השהייה (Zero-Latency) ומענה מושלם לעומסי עבודה כבדים בקנה מידה רחב.",
    range: [0.50, 0.70],
  },
  {
    title: "העניקו לארגון שלכם את היתרון הטכנולוגי הנדרש",
    subtitle: "פתרונות תוכנה מתקדמים",
    description: "הצטרפו ליזמים, ארכיטקטים וחברות מבוססות הבונים את העתיד של פתרונות התוכנה וה-SaaS בקנה מידה רחב.",
    range: [0.75, 0.95],
  },
  {
    title: "התחברו אלינו",
    subtitle: "שותפות אסטרטגית ופיתוח",
    description: "אנו פתוחים כעת לאינטגרציות מורכבות, פרויקטי פיתוח ייעודיים ושותפויות אסטרטגיות למערכות SaaS רחבות היקף.",
    range: [0.97, 1.00],
  }
];

const TRANSLATIONS = {
  en: {
    navHome: "Home",
    navPhilosophy: "Architecture",
    navPrecision: "Solutions",
    navBegin: "Products",
    navCTA: "Request Demo",
    ctaGetInTouch: "Request Tech Demo",
    formName: "Name & Company Name",
    formNamePlaceholder: "John Doe, Tech Corp",
    formEmail: "Corporate Email",
    formEmailPlaceholder: "john@company.com",
    formMessage: "Project description / requirements",
    formMessagePlaceholder: "Tell us about your requirements...",
    formSubmit: "Submit Request",
    formSuccessTitle: "Request Submitted Successfully",
    formSuccessDesc: (name: string) => `Thank you, ${name}. Our tech team will get back to you shortly to schedule a demo.`,
    formSuccessResend: "Submit another request",
    preloaderText: "PRELOADING CINEMATIC FRAMES",
    scrollDown: "Scroll Down",
  },
  he: {
    navHome: "ראשי",
    navPhilosophy: "ארכיטקטורה",
    navPrecision: "פתרונות",
    navBegin: "מוצרים",
    navCTA: "בקשת דמו",
    ctaGetInTouch: "תיאום דמו טכנולוגי",
    formName: "שם מלא ושם חברה",
    formNamePlaceholder: "ישראל ישראלי, חברת טכנולוגיה בע\"מ",
    formEmail: "אימייל עסקי",
    formEmailPlaceholder: "name@company.com",
    formMessage: "פרטי הפרויקט / דרישות",
    formMessagePlaceholder: "ספרו לנו על הדרישות שלכם...",
    formSubmit: "שלח בקשה",
    formSuccessTitle: "הבקשה התקבלה בהצלחה",
    formSuccessDesc: (name: string) => `תודה לך, ${name}. הצוות הטכנולוגי שלנו יחזור אליך בהקדם לתיאום הדמו.`,
    formSuccessResend: "שלח בקשה נוספת",
    preloaderText: "טוען פריימים קולנועיים...",
    scrollDown: "גללו מטה",
  }
};

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentFrameRef = useRef<number>(0);
  const frameObjRef = useRef({ val: 0 });

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadedProgress, setLoadedProgress] = useState<number>(0);
  const [scrollFraction, setScrollFraction] = useState<number>(0);

  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [lang, setLang] = useState<'en' | 'he'>('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const SECTIONS = lang === 'en' ? SECTIONS_EN : SECTIONS_HE;
  const t = TRANSLATIONS[lang];


  // 1. Frame preloading
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const pad = (num: number, size: number) => num.toString().padStart(size, "0");
      
      const handleLoadComplete = () => {
        loadedCount++;
        setLoadedProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          setTimeout(() => {
            setLoading(false);
          }, 800);
        }
      };

      img.onload = handleLoadComplete;
      img.onerror = handleLoadComplete; // fallback to prevent blocking
      img.src = `/frames/ezgif-frame-${pad(i, 3)}.jpg`;
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  // 2. Manual Object-fit cover draw logic
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const img = images[index];
    if (!img || !img.complete) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    const canvasRatio = canvasWidth / canvasHeight;
    const imgRatio = imgWidth / imgHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
    }

    const ZOOM_FACTOR = 1.35;
    const zoomedWidth = drawWidth * ZOOM_FACTOR;
    const zoomedHeight = drawHeight * ZOOM_FACTOR;
    const zoomedOffsetX = offsetX - (zoomedWidth - drawWidth) / 2;
    const zoomedOffsetY = offsetY - (zoomedHeight - drawHeight) / 2;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, zoomedOffsetX, zoomedOffsetY, zoomedWidth, zoomedHeight);
  };

  // 3. Canvas Resizing
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameRef.current);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [images]);

  // 4. Scroll mapping with GSAP frame transition interpolation
  useEffect(() => {
    if (loading || images.length === 0) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

          if (maxScroll > 0) {
            const fraction = Math.max(0, Math.min(1, scrollTop / maxScroll));
            setScrollFraction(fraction);

            const targetFrameIndex = Math.min(
              TOTAL_FRAMES - 1,
              Math.floor(fraction * TOTAL_FRAMES)
            );

            // Smoothly interpolate the frame updates using GSAP
            gsap.to(frameObjRef.current, {
              val: targetFrameIndex,
              duration: 0.35, // smooth interpolation timing
              ease: "power2.out",
              overwrite: "auto",
              onUpdate: () => {
                const index = Math.round(frameObjRef.current.val);
                if (currentFrameRef.current !== index) {
                  currentFrameRef.current = index;
                  drawFrame(index);
                }
              }
            });
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial draw once loading is done
    drawFrame(0);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, images]);

  // 5. Interactive Mouse Parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xPercent = clientX / innerWidth - 0.5;
      const yPercent = clientY / innerHeight - 0.5;

      gsap.to(canvasRef.current, {
        x: -xPercent * 30,
        y: -yPercent * 30,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 6. Programmatic Scroll Navigation
  const handleScrollTo = (fraction: number) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetScroll = fraction * maxScroll;

    gsap.to(window, {
      scrollTo: targetScroll,
      duration: 1.5,
      ease: "power3.inOut",
    });
  };

  // Helper to calculate opacity and transform based on scroll fraction
  const getSectionOpacityAndTransform = (
    fraction: number,
    start: number,
    end: number
  ) => {
    // If it's the last section (ending at 1.0)
    if (end === 1.0) {
      const startFade = start;
      const endFade = start + 0.02; // fade in quickly over 2% of scroll
      if (fraction < startFade) {
        return { opacity: 0, y: 30 };
      }
      
      const opacity = Math.min(1, Math.max(0, (fraction - startFade) / (endFade - startFade)));
      const y = 30 - opacity * 30; // slides from 30px to 0px
      return { opacity, y };
    }

    const fadeZone = 0.06;
    if (fraction < start - 0.02 || fraction > end + 0.02) {
      return { opacity: 0, y: 30 };
    }

    let opacity = 1;
    if (start > 0.0 && fraction < start + fadeZone) {
      opacity = Math.max(0, (fraction - start) / fadeZone);
    } else if (fraction > end - fadeZone) {
      opacity = Math.max(0, (end - fraction) / fadeZone);
    }

    const rangeLength = end - start;
    const relativePosition = (fraction - start) / rangeLength;
    const y = 30 - relativePosition * 60; // slides from 30px to -30px
    return { opacity, y };
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  // Calculate maximum active section opacity to drive background dimming
  let activeOpacity = 0;
  let isLastSectionActive = false;
  SECTIONS.forEach((section, idx) => {
    const { opacity } = getSectionOpacityAndTransform(
      scrollFraction,
      section.range[0],
      section.range[1]
    );
    if (opacity > activeOpacity) {
      activeOpacity = opacity;
      isLastSectionActive = idx === SECTIONS.length - 1;
    }
  });

  const dimmingFactor = isLastSectionActive ? 0.82 : 0.60;
  const overlayOpacity = activeOpacity * dimmingFactor;

  return (
    <div 
      dir={lang === 'he' ? "rtl" : "ltr"}
      className={`relative w-full h-[500vh] bg-black text-white selection:bg-white selection:text-black ${
        lang === 'he' ? 'text-right' : ''
      }`}
    >
      {/* SVG Hardware-accelerated Sharpen Filter */}
      <svg className="absolute w-0 h-0 pointer-events-none select-none overflow-hidden">
        <defs>
          <filter id="sharpen-filter">
            <feConvolveMatrix
              order="3"
              preserveAlpha="true"
              kernelMatrix="-0.5 -1 -0.5 -1 7 -1 -0.5 -1 -0.5"
            />
          </filter>
        </defs>
      </svg>

      {/* Background canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        style={{
          transform: "scale(1.05)",
          filter: "url(#sharpen-filter) contrast(1.03) brightness(1.02)",
          backfaceVisibility: "hidden",
        }}
      />

      {/* Cinematic Vignette Overlay */}
      <div className="fixed inset-0 pointer-events-none z-10 cinematic-vignette" />

      {/* Dynamic Background Dimming Overlay */}
      <div
        className="fixed inset-0 bg-black pointer-events-none transition-opacity duration-150"
        style={{ opacity: overlayOpacity, zIndex: 15 }}
      />

      {/* Glassmorphic Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex flex-row justify-between items-center px-4 sm:px-8 py-4 sm:py-6 max-w-7xl mx-auto w-full backdrop-blur-sm bg-black/10 border-b border-white/5">
        <div
          onClick={() => handleScrollTo(0)}
          className="text-2xl sm:text-3xl tracking-tight text-white select-none cursor-pointer font-normal transition-all duration-300 hover:opacity-90 font-serif"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          y.e.s. Systems<sup className="text-xs ml-0.5 tracking-normal align-super">®</sup>
        </div>

        <div className="hidden md:flex flex-row items-center gap-10">
          <button
            onClick={() => handleScrollTo(0)}
            className={`text-sm font-medium transition-colors duration-300 cursor-pointer ${
              scrollFraction < 0.1 ? "text-white" : "text-white/60 hover:text-white"
            }`}
          >
            {t.navHome}
          </button>
          <button
            onClick={() => handleScrollTo(0.35)}
            className={`text-sm font-medium transition-colors duration-300 cursor-pointer ${
              scrollFraction >= 0.2 && scrollFraction < 0.48
                ? "text-white"
                : "text-white/60 hover:text-white"
            }`}
          >
            {t.navPhilosophy}
          </button>
          <button
            onClick={() => handleScrollTo(0.6)}
            className={`text-sm font-medium transition-colors duration-300 cursor-pointer ${
              scrollFraction >= 0.48 && scrollFraction < 0.73
                ? "text-white"
                : "text-white/60 hover:text-white"
            }`}
          >
            {t.navPrecision}
          </button>
          <button
            onClick={() => handleScrollTo(0.88)}
            className={`text-sm font-medium transition-colors duration-300 cursor-pointer ${
              scrollFraction >= 0.73 ? "text-white" : "text-white/60 hover:text-white"
            }`}
          >
            {t.navBegin}
          </button>
        </div>

        <div className="flex flex-row items-center gap-3 sm:gap-4">
          <button
            onClick={() => setLang(lang === 'en' ? 'he' : 'en')}
            className="text-xs tracking-wider uppercase font-semibold text-white/60 hover:text-white transition-colors cursor-pointer px-2.5 sm:px-3 py-1.5 border border-white/10 rounded-lg hover:bg-white/5 bg-black/10 backdrop-blur-sm font-sans"
          >
            {lang === 'en' ? 'עב' : 'EN'}
          </button>
          <button
            onClick={() => handleScrollTo(0.88)}
            className="hidden md:inline-block liquid-glass rounded-full px-6 py-2.5 text-sm text-white hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 font-medium tracking-wide shadow-lg cursor-pointer"
          >
            {t.navCTA}
          </button>
          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden flex items-center justify-center p-2 border border-white/10 rounded-lg bg-black/10 backdrop-blur-sm text-white hover:bg-white/5 transition-colors cursor-pointer"
            title="Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Mobile Glassmorphic Overlay Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-lg flex flex-col justify-center items-center gap-8 animate-fade-rise font-sans">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-white/60 hover:text-white hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/10 rounded-full bg-white/5"
            title="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={() => {
              handleScrollTo(0);
              setMobileMenuOpen(false);
            }}
            className="text-2xl font-normal text-white hover:opacity-80 transition-all font-serif"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            {t.navHome}
          </button>
          <button
            onClick={() => {
              handleScrollTo(0.35);
              setMobileMenuOpen(false);
            }}
            className="text-2xl font-normal text-white hover:opacity-80 transition-all font-serif"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            {t.navPhilosophy}
          </button>
          <button
            onClick={() => {
              handleScrollTo(0.6);
              setMobileMenuOpen(false);
            }}
            className="text-2xl font-normal text-white hover:opacity-80 transition-all font-serif"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            {t.navPrecision}
          </button>
          <button
            onClick={() => {
              handleScrollTo(0.88);
              setMobileMenuOpen(false);
            }}
            className="text-2xl font-normal text-white hover:opacity-80 transition-all font-serif"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            {t.navBegin}
          </button>

          <div className="w-16 h-px bg-white/15 my-4" />

          <button
            onClick={() => {
              handleScrollTo(1.0);
              setMobileMenuOpen(false);
            }}
            className="liquid-glass rounded-full px-8 py-3 text-sm text-white hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 font-medium tracking-wide shadow-lg cursor-pointer"
          >
            {t.navCTA}
          </button>
        </div>
      )}

      {/* Narrative Section Overlays */}
      <div className="fixed inset-0 pointer-events-none z-20">
        {SECTIONS.map((section, idx) => {
          const { opacity, y } = getSectionOpacityAndTransform(
            scrollFraction,
            section.range[0],
            section.range[1]
          );

          if (opacity <= 0) return null;

          return (
            <div
              key={idx}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 transition-all duration-150 ease-out select-none"
              style={{
                opacity: opacity,
                transform: `translateY(${y}px)`,
                pointerEvents: opacity > 0.5 ? "auto" : "none",
              }}
            >
              <div className={`max-w-2xl rounded-3xl transition-all duration-300 max-h-[85vh] flex flex-col backdrop-blur-md bg-black/40 border border-white/10 shadow-[0_24px_50px_rgba(0,0,0,0.7)] ${
                idx === SECTIONS.length - 1 ? "p-5 sm:p-8 md:p-10" : "p-6 sm:p-10 md:p-12"
              }`}>
                {/* Scrollable inner content prevents scrolling the glowing card border */}
                <div className="w-full overflow-y-auto no-scrollbar pr-1 flex flex-col items-center max-h-full">
                  <span className="text-[10px] tracking-[0.3em] text-white/50 uppercase font-semibold mb-4 block">
                    {section.subtitle}
                  </span>
                  <h2
                    className={`${
                      idx === SECTIONS.length - 1 ? "text-2xl sm:text-4xl" : "text-3xl sm:text-5xl md:text-6xl"
                    } font-normal leading-tight text-white mb-4 font-serif animate-fade-rise`}
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    {section.title}
                  </h2>
                  <p className={`${
                    idx === SECTIONS.length - 1 ? "text-xs sm:text-sm max-w-md" : "text-white/70 text-sm sm:text-base md:text-lg max-w-xl"
                  } mx-auto leading-relaxed animate-fade-rise-delay`}>
                    {section.description}
                  </p>
                  
                  {idx === 0 && (
                    <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center animate-fade-rise-delay-2 font-sans">
                      <button
                        onClick={() => handleScrollTo(1.0)}
                        className="liquid-glass rounded-full px-6 py-3 text-sm text-white hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 font-medium tracking-wide cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-white/10"
                      >
                        {lang === 'he' ? "תיאום דמו טכנולוגי" : "Schedule Tech Demo"}
                      </button>
                      <button
                        onClick={() => handleScrollTo(0.88)}
                        className="bg-white/10 hover:bg-white/20 border border-white/10 rounded-full px-6 py-3 text-sm text-white hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 font-medium tracking-wide cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.5)]"
                      >
                        {lang === 'he' ? "לבניית המערכת שלך" : "Build Your System"}
                      </button>
                    </div>
                  )}

                  {idx === SECTIONS.length - 2 && (
                    <button
                      onClick={() => handleScrollTo(1.0)}
                      className="liquid-glass rounded-full px-8 py-3.5 text-sm text-white mt-8 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 font-medium tracking-wide cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-white/10 animate-fade-rise-delay-2 font-sans"
                    >
                      {t.ctaGetInTouch}
                    </button>
                  )}

                  {idx === SECTIONS.length - 1 && (
                    <div className={`mt-4 w-full max-w-md mx-auto animate-fade-rise-delay-2 ${
                      lang === 'he' ? 'text-right' : 'text-left'
                    }`}>
                      {!formSubmitted ? (
                        <form onSubmit={handleFormSubmit} className="space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans">
                            <div>
                              <label className="text-[10px] tracking-widest text-white/50 uppercase block mb-1 font-medium">{t.formName}</label>
                              <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder={t.formNamePlaceholder}
                                className="w-full bg-white/10 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all font-sans"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] tracking-widest text-white/50 uppercase block mb-1 font-medium">{t.formEmail}</label>
                              <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder={t.formEmailPlaceholder}
                                className="w-full bg-white/10 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all font-sans"
                              />
                            </div>
                          </div>
                          <div className="font-sans">
                            <label className="text-[10px] tracking-widest text-white/50 uppercase block mb-1 font-medium">{t.formMessage}</label>
                            <textarea
                              required
                              rows={2}
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              placeholder={t.formMessagePlaceholder}
                              className="w-full bg-white/10 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all resize-none font-sans"
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full liquid-glass rounded-xl py-2.5 text-xs text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 font-medium tracking-wide cursor-pointer border border-white/10 font-sans"
                          >
                            {t.formSubmit}
                          </button>
                        </form>
                      ) : (
                        <div className="text-center py-6 animate-fade-rise">
                          <p className="text-white font-medium text-base mb-2 font-serif" style={{ fontFamily: "'Instrument Serif', serif" }}>
                            {t.formSuccessTitle}
                          </p>
                          <p className="text-white/60 text-xs leading-relaxed max-w-xs mx-auto">
                            {t.formSuccessDesc(formData.name)}
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              setFormSubmitted(false);
                              setFormData({ name: "", email: "", message: "" });
                            }}
                            className="text-white/40 hover:text-white/70 text-[10px] uppercase tracking-widest mt-6 underline decoration-white/20 transition-all cursor-pointer font-sans"
                          >
                            {t.formSuccessResend}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Dot Navigation Indicators */}
      <div className={`fixed top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4 z-40 ${
        lang === 'he' ? 'left-8' : 'right-8'
      }`}>
        {SECTIONS.map((section, idx) => {
          const midRange = (section.range[0] + section.range[1]) / 2;
          const isActive =
            scrollFraction >= section.range[0] &&
            scrollFraction <= section.range[1];

          return (
            <button
              key={idx}
              onClick={() => handleScrollTo(midRange)}
              className={`group flex items-center gap-3 cursor-pointer py-1.5 focus:outline-none ${
                lang === 'he' ? 'flex-row-reverse justify-end' : 'justify-end'
              }`}
              title={section.title}
            >
              <span className="opacity-0 group-hover:opacity-100 text-[10px] uppercase tracking-widest text-white/70 transition-all duration-300 font-medium">
                {section.title}
              </span>
              <div
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  isActive
                    ? "bg-white scale-125 shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                    : "bg-white/30 group-hover:bg-white/75"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Floating bottom indicator / scroll-to-top */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        {scrollFraction < 0.05 ? (
          <div className="flex flex-col items-center gap-1.5 animate-bounce opacity-80 select-none">
            <span className="text-[10px] tracking-widest uppercase text-white/50 font-sans">
              {t.scrollDown}
            </span>
            <ChevronDown className="w-4 h-4 text-white/50" />
          </div>
        ) : (
          scrollFraction > 0.85 && (
            <button
              onClick={() => handleScrollTo(0)}
              className="liquid-glass p-3.5 rounded-full hover:scale-105 active:scale-95 transition-all text-white border border-white/10 cursor-pointer shadow-lg flex items-center justify-center animate-fade-rise"
              title={lang === 'he' ? "חזרה למעלה" : "Back to Top"}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          )
        )}
      </div>

      {/* Real-time preloading screen */}
      <div
        className={`fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${
          loading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-md w-full px-8 flex flex-col items-center">
          <div
            className="text-4xl sm:text-5xl tracking-tight text-white mb-6 select-none font-serif"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            y.e.s. Systems
          </div>

          <div className="w-full bg-white/10 h-[2px] rounded-full overflow-hidden mb-3 relative">
            <div
              className="bg-white h-full transition-all duration-300 ease-out shadow-[0_0_12px_rgba(255,255,255,0.8)]"
              style={{ width: `${loadedProgress}%` }}
            />
          </div>

          <div className="flex justify-between w-full text-[10px] tracking-widest text-white/40 uppercase font-mono">
            <span>{t.preloaderText}</span>
            <span className="text-white font-medium">{loadedProgress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

