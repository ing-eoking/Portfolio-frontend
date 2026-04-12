import { useState, useEffect, useRef } from 'react';
import Robot from './Robot';

const Navbar = ({ activeSection, theme, toggleTheme }: any) => {
  const navLinks = [
    { id: 'home', label: '$HOME' },
    { id: 'about', label: '$ABOUT' },
    { id: 'skills', label: '$SKILLS' },
    { id: 'experience', label: '$EXPERIENCE' },
    { id: 'projects', label: '$PROJECTS' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-[#0a0a0c]/80 backdrop-blur-md border-b border-neutral-200 dark:border-[#222222] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div
          onClick={() => scrollToSection('home')}
          className="cursor-pointer group flex items-center justify-center gap-3 p-1"
          title="Home"
        >
          <img
            src="/icon.png"
            alt="YCKIM Logo"
            className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_12px_rgba(255,94,0,0.6)]"
          />
          <span className="text-xl font-bold tracking-wider text-[#ff5e00] group-hover:text-neutral-900 dark:group-hover:text-white transition-colors duration-300 font-['Chakra_Petch']">
            {'<YCKIM.ME/>'}
          </span>
        </div>

        <ul className="hidden md:flex gap-8 items-center">
          {navLinks.map((link: any) => (
            <li key={link.id}>
              <button
                onClick={() => scrollToSection(link.id)}
                className={`text-sm font-bold tracking-wider transition-all duration-300 ${activeSection === link.id
                  ? 'text-[#ff5e00] border-b-2 border-[#ff5e00] pb-1'
                  : 'text-neutral-400 dark:text-[#777777] hover:text-neutral-900 dark:text-white'
                  }`}
              >
                {link.label}
              </button>
            </li>
          ))}
          <li>
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-[#222222] transition-colors flex items-center justify-center">
              {theme === 'dark' ? (
                <img src="/sun.png" alt="Dark Mode" className="w-6 h-6 object-contain" />
              ) : (
                <img src="/moon.png" alt="Light Mode" className="w-6 h-6 object-contain" />
              )}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};


// [HERO SECTION]
const HeroSection = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => 'session-' + Math.random().toString(36).substr(2, 9));

  const [phase, setPhase] = useState(0);
  const [typedTitle, setTypedTitle] = useState('');
  const [typedDesc, setTypedDesc] = useState('');

  const fullText = "I'M YEONCHEOL";
  const descText = '반갑습니다. 로봇이 제 모든 포트폴리오를 학습했습니다.\n"기술 스택이 뭐야?" 처럼 궁금한 것을 바로 물어보세요.';

  const suggestions = [
    "어떤 프로젝트를 진행했어?",
    "주력 기술 스택이 뭐야?",
    "문제 해결 경험 알려줘"
  ];

  useEffect(() => {
    if (phase === 0) {
      let i = 0;
      const interval = setInterval(() => {
        setTypedTitle(fullText.substring(0, i + 1));
        i++;
        if (i >= fullText.length) {
          clearInterval(interval);
          setTimeout(() => setPhase(1), 1000);
        }
      }, 100);
      return () => clearInterval(interval);
    } else if (phase === 1) {
      let i = fullText.length;
      const interval = setInterval(() => {
        setTypedTitle(fullText.substring(0, i - 1));
        i--;
        if (i <= 0) {
          clearInterval(interval);
          setTimeout(() => setPhase(2), 300);
        }
      }, 50);
      return () => clearInterval(interval);
    } else if (phase === 2) {
      let i = 0;
      const interval = setInterval(() => {
        setTypedDesc(descText.substring(0, i + 1));
        i++;
        if (i >= descText.length) {
          clearInterval(interval);
          setTimeout(() => setPhase(4), 600);
        }
      }, 60);
      return () => clearInterval(interval);
    }
  }, [phase]);

  const submitQuestion = async (qText: string) => {
    if (!qText.trim()) return;
    setQuestion(qText);
    setLoading(true);
    try {
      const url = import.meta.env.VITE_SERVER_URL;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: qText, sessionId: sessionId })
      });
      if (!response.ok) throw new Error('Error');
      const data = await response.json();
      setAnswer(data.response);
    } catch (error) {
      setAnswer("죄송합니다. 서버 연결 상태를 확인해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const askAI = async (e: any) => {
    e.preventDefault();
    await submitQuestion(question);
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden bg-metal relative">
      <div className="pattern-diagonal absolute inset-0 z-0 mix-blend-overlay"></div>
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-8 md:gap-16 z-10">
        <div className="w-full md:w-5/12 flex justify-center md:justify-end order-1 md:order-1 relative">
          <div className="relative hover:scale-105 transition-transform duration-500">
            <Robot isSearching={loading} />
          </div>
        </div>
        <div className="w-full md:w-7/12 order-2 md:order-2 text-center md:text-left flex flex-col justify-start pt-12 md:pt-20 min-h-[350px] md:min-h-[450px]">
          <div className="w-full flex flex-col justify-start mb-4">
            {phase <= 1 && (
              <div className="w-full">
                <h1 className="text-5xl md:text-7xl font-black text-neutral-900 dark:text-white mb-2 leading-tight">
                  {typedTitle.length >= 4 ? (
                    <>
                      {typedTitle.substring(0, 4)}<span className="text-[#ff5e00]">{typedTitle.substring(4)}</span>
                    </>
                  ) : (
                    typedTitle
                  )}
                  {phase <= 1 && <span className="font-light text-[#ff5e00] animate-pulse">|</span>}
                </h1>
              </div>
            )}
            {phase >= 2 && (
              <div className="w-full">
                <p className="text-neutral-500 dark:text-[#aaaaaa] text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 whitespace-pre-wrap">
                  {typedDesc}
                  {phase === 2 && <span className="font-light text-[#ff5e00] animate-pulse">|</span>}
                </p>
              </div>
            )}
          </div>
          <div className={`w-full max-w-xl mx-auto md:mx-0 transition-all duration-1000 ease-out ${phase >= 4 ? 'opacity-100 blur-none translate-y-0' : 'opacity-0 blur-sm translate-y-4 pointer-events-none'}`}>
            <form onSubmit={askAI} className="relative group mb-4">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ff5e00] to-[#ffff00] rounded-xl blur opacity-20 group-focus-within:opacity-80 transition duration-500"></div>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="질문을 입력하세요 (예: 진행한 프로젝트 알려줘)"
                className="relative w-full bg-white dark:bg-[#111111] border border-neutral-200 dark:border-[#222222] text-neutral-900 dark:text-white pl-6 pr-14 py-4 rounded-lg shadow-2xl outline-none focus:border-[#ff5e00] placeholder:text-neutral-400 dark:text-[#555555] transition-all"
              />
              <button type="submit" disabled={loading} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-neutral-400 dark:text-[#777777] hover:text-[#ff5e00] transition-colors">
                {loading ? <div className="animate-spin w-5 h-5 border-2 border-[#ff5e00] border-t-transparent rounded-full"></div> :
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>}
              </button>
            </form>
            <div className="flex flex-wrap gap-1.5 md:gap-2 mb-6 justify-center md:justify-start drop-shadow">
              {suggestions.map((sug, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => submitQuestion(sug)}
                  disabled={loading}
                  style={{ clipPath: 'polygon(0% 0%, 92% 0%, 100% 50%, 92% 100%, 0% 100%)' }}
                  className="text-[11px] md:text-xs font-bold text-[#050505] bg-[#ff5e00] hover:bg-white hover:text-[#ff5e00] pl-2.5 pr-5 py-1.5 rounded-l-lg transition-colors disabled:opacity-50 flex items-center gap-1 whitespace-nowrap"
                >
                  <span className="text-[#ff003c] bg-neutral-50 dark:bg-[#050505] px-1 py-0.5 rounded-[2px] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] leading-none">#</span>{sug}
                </button>
              ))}
            </div>
            <div className={`transition-all duration-500 ease-out origin-top ${answer ? 'scale-100 opacity-100' : 'scale-95 opacity-0 h-0 overflow-hidden'}`}>
              <div className="bg-white dark:bg-[#111111] border border-[#ff5e00]/20 p-5 rounded-lg shadow-xl text-left relative">
                <div className="flex gap-4">
                  <div className="shrink-0 min-w-[32px] h-8 rounded bg-[#ff5e00] flex items-center justify-center text-[#050505] text-xs font-bold shadow-lg">AI</div>
                  <div className="text-neutral-800 dark:text-[#eeeeee] text-sm leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto pr-2
                        [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#333333] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-[#ff5e00]">
                    {answer}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const useIntersectionObserver = (options: any = {}, triggerOnce = true) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef<any>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        if (triggerOnce && targetRef.current) {
          observer.unobserve(targetRef.current);
        }
      } else {
        if (!triggerOnce) {
          setIsIntersecting(false);
        }
      }
    }, { threshold: 0.1, ...options });

    const current = targetRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [options, triggerOnce]);

  return [targetRef, isIntersecting] as const;
};

const AnimatedReveal = ({ children, delay = 0, direction = 'top', triggerOnce = true, className = "" }: any) => {
  const [ref, isVisible] = useIntersectionObserver({}, triggerOnce);

  const directions: any = {
    top: 'origin-top -translate-y-12 scale-y-75',
    left: 'origin-left -translate-x-12 scale-x-75',
    right: 'origin-right translate-x-12 scale-x-75',
    bottom: 'origin-bottom translate-y-12 scale-y-75',
  };

  return (
    <div ref={ref} className={`flex flex-col ${className}`}>
      <div
        style={{ transitionDelay: `${delay}ms` }}
        className={`transition-all duration-[800ms] ease-out flex-1 flex flex-col ${isVisible
          ? 'opacity-100 scale-100 translate-x-0 translate-y-0 blur-none'
          : `opacity-0 ${directions[direction] || directions.top} blur-sm pointer-events-none`
          } ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

const AnimatedTitle = ({ children, triggerOnce = true, suffix }: any) => {
  const [ref, isVisible] = useIntersectionObserver({}, triggerOnce);
  return (
    <div ref={ref}>
      <h2
        className="text-3xl font-bold text-neutral-900 dark:text-white mb-12 flex items-center gap-4 overflow-hidden relative"
      >
        {/* 아이콘 부분 */}
        <div className="relative shrink-0 z-10">
          <img src="/folder.png" alt="Folder" className="w-9 h-9 object-contain" />
        </div>

        {/* 텍스트와 텍스트를 비추는 광원 */}
        <div className="relative flex items-center">
          <span
            className={`relative z-10 transition-all duration-[600ms] ease-out origin-left inline-block ${isVisible ? 'opacity-100 scale-x-100 translate-x-0 blur-none' : 'opacity-0 scale-x-0 -translate-x-8 blur-sm pointer-events-none'
              }`}
          >
            {children}
          </span>
          {suffix}
        </div>
      </h2>
    </div>
  );
};

const ProjectModal = ({ project, onClose }: { project: any, onClose: () => void }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral-950/40 animate-backdrop-in"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-white dark:bg-[#0a0a0c] border border-[#ff5e00]/30 shadow-[0_0_50px_rgba(255,94,0,0.15)] rounded-2xl overflow-hidden flex flex-col animate-modal-in">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ff5e00] to-transparent"></div>

        <div className="p-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white uppercase tracking-tight">{project.title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-white/5 rounded-full transition-colors text-neutral-500 dark:text-[#777777] hover:text-neutral-900 dark:hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="py-20 flex flex-col items-center justify-center border border-dashed border-neutral-200 dark:border-white/10 rounded-xl bg-neutral-50/50 dark:bg-white/[0.02]">
            <div className="text-[#ff5e00] animate-pulse mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p className="text-xl font-bold text-neutral-400 dark:text-[#555555] tracking-widest uppercase">준비중...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// [ABOUT]
const AboutSection = () => (
  <section id="about" className="py-24 bg-neutral-50 dark:bg-[#050505] relative z-10">
    <div className="max-w-5xl mx-auto px-6">
      <AnimatedTitle>ABOUT ME</AnimatedTitle>
      <div className="grid md:grid-cols-2 gap-12 text-neutral-600 dark:text-[#cccccc]">
        <div className="space-y-6">
          <AnimatedReveal delay={100} direction="left">
            <div className="bg-white dark:bg-[#111111] p-6 rounded-xl border border-[#ff5e00]/10 hover:border-[#ff5e00] shadow-[0_0_15px_rgba(255,94,0,0)] hover:shadow-[0_0_15px_rgba(255,94,0,0.5)]/30 transition-colors">
              <h3 className="text-[#ff5e00] font-bold mb-2">🎓 EDUCATION</h3>
              <p className="text-xl font-bold text-neutral-900 dark:text-white">숭실대학교 졸업</p>
              <p>AI 융합학부 (공학사)</p>
              <p className="text-sm text-neutral-500 dark:text-[#aaaaaa] mt-2">학점: 3.98 / 4.5 (전공 4.03)</p>
            </div>
          </AnimatedReveal>
          <AnimatedReveal delay={250} direction="left">
            <div className="bg-white dark:bg-[#111111] p-6 rounded-xl border border-[#ff5e00]/10 hover:border-[#ff5e00] shadow-[0_0_15px_rgba(255,94,0,0)] hover:shadow-[0_0_15px_rgba(255,94,0,0.5)]/30 transition-colors">
              <h3 className="text-[#ff5e00] font-bold mb-2">🏆 AWARDS</h3>
              <p className="font-bold text-neutral-900 dark:text-white">스마트경진대회 최우수상 (2018)</p>
              <p className="text-sm text-neutral-500 dark:text-[#aaaaaa]">라즈베리파이를 활용한 3D 모션 캡처</p>
            </div>
          </AnimatedReveal>
        </div>
        <AnimatedReveal delay={400} direction="top">
          <div className="leading-loose text-lg">
            <em className="text-gray-400">“Never lose a holy curiosity!”</em>
            <p className="mb-4">
              안녕하세요, <strong className="text-neutral-900 dark:text-white">시스템 및 벡엔드 엔지니어 김연철</strong>입니다.
            </p>
            <p className="mb-4">
              C/C++ 기반의 로우 레벨 시스템부터 Python, Java를 활용한 웹 서비스까지
              폭넓은 기술 스택을 갖고 있습니다.
            </p>
            <p className="mb-4">
              메모리 관리, 동시성 처리, 네트워크 통신 등 시스템 개발에 강점을 가지고 있으며,
              항상 깊게 파고 들어 더 나은 서비스를 만들어가는 개발자를 꿈꾸고 있습니다.
            </p>
          </div>
        </AnimatedReveal>
      </div>
    </div>
  </section>
);

// [SKILLS]
const SkillsSection = () => {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 }, false);
  const GIST_URL = import.meta.env.VITE_GIST_URL;

  const fetchGistData = async () => {
    setLoading(true);

    if (!GIST_URL) {
      console.error("GIST_URL is undefined.");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(`${GIST_URL}?t=${new Date().getTime()}`);
      const fullData = await response.json();
      if (fullData?.plugins?.languages?.favorites) {
        const favorites = fullData.plugins.languages.favorites;
        const formattedSkills = favorites.map((item: any) => ({
          name: item.name,
          pct: Math.round(item.value * 100),
          color: item.color
        })).filter((skill: any) => skill.pct > 0);

        setSkills(formattedSkills);

        // 그래프 애니메이션이 끝날 때까지 아이콘을 유지함
        setIsAnimating(true);
        const totalDuration = (formattedSkills.length * 100) + 1000;
        setTimeout(() => setIsAnimating(false), totalDuration);
      }
    } catch (error) {
      console.error("Failed to load data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      fetchGistData();
    }
  }, [isVisible, GIST_URL]);

  return (
    <section ref={ref} id="skills" className="py-24 bg-white dark:bg-[#0a0a0c] relative">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedTitle
          suffix={(loading || isAnimating) && (
            <svg
              className="animate-spin h-5 w-5 ml-4 text-[#ff5e00] inline-block"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
        >
          SKILLS
        </AnimatedTitle>
        {loading && skills.length === 0 ? (
          <div className="text-center py-10 text-neutral-400 dark:text-[#777777] animate-pulse">GitHub 데이터 동기화 중...</div>
        ) : (
          <div className={`space-y-8 transition-all duration-1000 ease-in-out ${isVisible && !loading ? 'blur-none opacity-100' : 'blur-md opacity-30 pointer-events-none'}`}>
            {skills.map((skill, idx) => (
              <AnimatedReveal key={skill.name} delay={idx * 100} direction="left" triggerOnce={true}>
                <div>
                  <div className="flex justify-between mb-2 text-neutral-800 dark:text-[#eeeeee] font-bold tracking-wider text-sm uppercase font-['Chakra_Petch']">
                    <span>{skill.name}</span>
                    <span>{skill.pct}%</span>
                  </div>
                  <div className="w-full px-2 mt-1">
                    <div className="relative w-full h-[10px] bg-neutral-100 dark:bg-[#0c0c0c] border border-neutral-300 dark:border-[#222] overflow-hidden shadow-[inset_0_2px_5px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)]" style={{ transform: 'skewX(-40deg)' }}>
                      <div
                        className="h-full relative transition-all duration-1000 ease-out flex"
                        style={{
                          width: `${skill.pct}%`,
                          boxShadow: `0 0 15px ${skill.color || '#ff5e00'}40`
                        }}
                      >
                        <div className="flex-1 h-full" style={{ backgroundColor: skill.color || '#ff5e00' }}></div>
                        <div
                          className="w-[40px] h-full shrink-0"
                          style={{
                            backgroundImage: `repeating-linear-gradient(to right, ${skill.color || '#ff5e00'} 0px, ${skill.color || '#ff5e00'} 4px, transparent 4px, transparent 8px)`,
                            WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
                            maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// [EXPERIENCE]
const ExperienceSection = () => (
  <section id="experience" className="py-24 bg-neutral-50 dark:bg-[#050505] relative z-10">
    <div className="max-w-5xl mx-auto px-6">
      <AnimatedTitle>EXPERIENCE</AnimatedTitle>
      <AnimatedReveal>
        <div className="relative border-l-2 border-neutral-200 dark:border-[#222222] ml-4 space-y-12">
          <div className="pl-8 relative">
            <div className="absolute -left-[9px] top-0 w-4 h-4 bg-[#ff5e00] rounded-full border-4 border-[#0a0a0a] shadow-[0_0_10px_#ff5e00]"></div>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">잼투인 주식회사 (JaM2in)</h3>
            <p className="text-[#ff5e00] font-bold tracking-wide mb-4">2023.07 ~ 현재 | 서버 개발팀 (사원)</p>
            <ul className="list-disc list-outside text-neutral-600 dark:text-[#cccccc] space-y-3 ml-5">
              <li>
                <span className="font-semibold text-neutral-900 dark:text-white">Arcus (DB 캐시) 개발</span>
                <p className="mt-1 text-sm leading-relaxed">리팩토링 및 구조 개선 · 기능 설계 및 확장 · 버그 수정 및 안정화 · 테스트 개선</p>
              </li>
              <li>
                <span className="font-semibold text-neutral-900 dark:text-white">Arcus C Client Library 개발</span>
                <p className="mt-1 text-sm leading-relaxed">라이브러리 내부 API 구조 개선 · 응답 메시지 예외 처리 강화</p>
              </li>
              <li>
                <span className="font-semibold text-neutral-900 dark:text-white">Arcus Perl Client Library 개발</span>
                <p className="mt-1 text-sm leading-relaxed">Perl 기반 네트워크 라이브러리 설계 및 구현 · CPAN 기반 배포</p>
              </li>
            </ul>
          </div>
        </div>
      </AnimatedReveal>
    </div>
  </section>
);

// [PROJECTS]
const ProjectsSection = ({ onProjectClick }: { onProjectClick: (proj: any) => void }) => (
  <section id="projects" className="py-24 bg-white dark:bg-[#0a0a0c] relative">
    <div className="max-w-5xl mx-auto px-6">
      <AnimatedTitle>PROJECTS</AnimatedTitle>
      <div className="grid md:grid-cols-3 gap-6 auto-rows-fr">
        {[
          {
            title: "대화형 포트폴리오 서버",
            period: "2024.12 ~ 현재 (개인)",
            desc: "RAG 기반 지능형 포트폴리오 서버. 외부 API 장애 시 로컬 LLM으로 전환되는 안정적인 하이브리드 아키텍처 구현.",
            tags: "Java 25 / Spring Boot / Spring AI / Qdrant"
          },
          {
            title: "자율 객체 추적 기기",
            period: "2022.08 ~ 2022.11 (개인)",
            desc: "라즈베리파이와 Yolo/Deepsort를 활용해 특정 객체를 실시간으로 추적하고 따라가는 기기 개발.",
            tags: "Python / C++ / UDP"
          },
          {
            title: "3D 모션 캡처 시스템",
            period: "2018.07 ~ 2018.10 (3인)",
            desc: "카메라 영상을 OpenCV로 분석하여 사람의 움직임을 가상 3D 캐릭터에 실시간 매핑.",
            tags: "C++ / OpenGL / OpenCV"
          }
        ].map((proj, idx) => (
          <div key={idx} className="flex flex-col">
            <AnimatedReveal delay={idx * 150} direction="top" className="flex-1 flex flex-col">
              <div
                onClick={() => onProjectClick(proj)}
                className="flex-1 bg-white dark:bg-[#111111] p-6 rounded-xl border border-[#ff5e00]/10 hover:-translate-y-2 hover:border-[#ff5e00] shadow-[0_0_15px_rgba(255,94,0,0)] hover:shadow-[0_0_15px_rgba(255,94,0,0.5)] transition-all duration-300 shadow-lg flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-[#ff5e00] transition-colors">{proj.title}</h3>
                  <p className="text-sm text-neutral-500 dark:text-[#aaaaaa] mb-4">{proj.period}</p>
                  <p className="text-neutral-600 dark:text-[#cccccc] text-sm mb-4 leading-relaxed">{proj.desc}</p>
                </div>
                <div className="mt-auto pt-4">
                  <span className="inline-block text-xs font-bold tracking-wider text-[#ff5e00] bg-[#ff5e00]/10 px-2 py-1 rounded border border-[#ff5e00]/30 uppercase">
                    {proj.tags}
                  </span>
                </div>
              </div>
            </AnimatedReveal>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- Main ---
function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [selectedProject, setSelectedProject] = useState<any>(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'projects'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-neutral-50 dark:bg-[#050505] relative min-h-screen text-neutral-900 dark:text-white font-sans selection:bg-[#ff5e00] selection:text-neutral-900 dark:text-white">
      <Navbar activeSection={activeSection} theme={theme} toggleTheme={toggleTheme} />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection onProjectClick={setSelectedProject} />
      </main>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <footer className="py-8 text-center text-neutral-400 dark:text-[#555555] text-sm bg-neutral-50 dark:bg-[#050505] relative border-t border-[#ff5e00]/10">
        © 2025 Kim Yeoncheol. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
