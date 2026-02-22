import { useState, useEffect } from 'react';
import Robot from './Robot';

const Navbar = ({ activeSection }) => {
  const navLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'projects', label: 'PROJECTS' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#020617]/90 backdrop-blur-md border-b border-[#38BDF8]/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div
              onClick={() => scrollToSection('home')}
              className="text-xl font-bold text-[#38BDF8] cursor-pointer tracking-wider hover:text-white transition-colors"
          >
            KYC.DEV
          </div>

          <ul className="hidden md:flex gap-8">
            {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                      onClick={() => scrollToSection(link.id)}
                      className={`text-sm font-bold tracking-wider transition-all duration-300 ${
                          activeSection === link.id
                              ? 'text-[#38BDF8] border-b-2 border-[#38BDF8] pb-1'
                              : 'text-[#64748b] hover:text-white'
                      }`}
                  >
                    {link.label}
                  </button>
                </li>
            ))}
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

  const askAI = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    try {
      const url = import.meta.env.VITE_SERVER_URL;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question, sessionId: sessionId })
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

  return (
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden bg-[#020617]">

        <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-[#38BDF8]/5 rounded-full blur-[120px] -z-10"></div>
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-8 md:gap-16 z-10">
          <div className="w-full md:w-5/12 flex justify-center md:justify-end order-1 md:order-1 relative">
            <div className="relative hover:scale-105 transition-transform duration-500">
              <Robot isSearching={loading} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#38BDF8]/10 rounded-full blur-[80px] -z-10 animate-pulse"></div>
            </div>
          </div>

          <div className="w-full md:w-7/12 order-2 md:order-2 text-center md:text-left">

            <div className="mb-8">
              <h2 className="text-[#38BDF8] font-mono tracking-widest text-sm mb-2 font-bold">SYSTEM & BACKEND ENGINEER</h2>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight">
                I'M <span className="text-[#38BDF8]">YEONCHEOL</span>
              </h1>
              <p className="text-[#94a3b8] text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
                반갑습니다. 로봇이 제 모든 포트폴리오를 학습했습니다.<br/>
                <span className="text-white font-bold">"기술 스택이 뭐야?"</span> 처럼 궁금한 것을 바로 물어보세요.
              </p>
            </div>

            <div className="w-full max-w-lg mx-auto md:mx-0">
              <form onSubmit={askAI} className="relative group mb-6">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#38BDF8] to-blue-900 rounded-xl blur opacity-20 group-focus-within:opacity-80 transition duration-500"></div>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="질문을 입력하세요 (예: 진행한 프로젝트 알려줘)"
                    className="relative w-full bg-[#0F172A] border border-[#1E293B] text-white pl-6 pr-14 py-4 rounded-xl shadow-2xl outline-none focus:border-[#38BDF8] placeholder:text-[#475569] transition-all"
                />
                <button type="submit" disabled={loading} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-[#64748b] hover:text-[#38BDF8] transition-colors">
                  {loading ? <div className="animate-spin w-5 h-5 border-2 border-[#38BDF8] border-t-transparent rounded-full"></div> :
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>}
                </button>
              </form>

              <div className={`transition-all duration-500 ease-out origin-top ${answer ? 'scale-100 opacity-100' : 'scale-95 opacity-0 h-0 overflow-hidden'}`}>
                <div className="bg-[#0F172A] border border-[#38BDF8]/20 p-5 rounded-xl shadow-xl text-left relative">
                  <div className="absolute top-0 left-6 -translate-y-1/2 w-3 h-3 bg-[#0F172A] rotate-45 border-l border-t border-[#38BDF8]/20"></div>
                  <div className="flex gap-4">
                    <div className="shrink-0 min-w-[32px] h-8 rounded bg-[#38BDF8] flex items-center justify-center text-[#020617] text-xs font-bold shadow-lg">AI</div>
                    <div className="text-[#e2e8f0] text-sm leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto pr-2
                        [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#334155] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-[#38BDF8]">
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

// [ABOUT]
const AboutSection = () => (
    <section id="about" className="py-24 bg-[#0B1121]">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-4">
          <span className="w-12 h-1 bg-[#38BDF8]"></span> ABOUT ME
        </h2>
        <div className="grid md:grid-cols-2 gap-12 text-[#cbd5e1]">
          <div className="space-y-6">
            <div className="bg-[#0F172A] p-6 rounded-xl border border-[#38BDF8]/10 hover:border-[#38BDF8]/30 transition-colors">
              <h3 className="text-[#38BDF8] font-bold mb-2">🎓 EDUCATION</h3>
              <p className="text-xl font-bold text-white">숭실대학교 졸업</p>
              <p>AI 융합학부 (공학사)</p>
              <p className="text-sm text-[#94a3b8] mt-2">학점: 3.98 / 4.5 (전공 4.03)</p>
            </div>
            <div className="bg-[#0F172A] p-6 rounded-xl border border-[#38BDF8]/10 hover:border-[#38BDF8]/30 transition-colors">
              <h3 className="text-[#38BDF8] font-bold mb-2">🏆 AWARDS</h3>
              <p className="font-bold text-white">스마트경진대회 최우수상 (2018)</p>
              <p className="text-sm text-[#94a3b8]">라즈베리파이를 활용한 3D 모션 캡처</p>
            </div>
          </div>
          <div className="leading-loose text-lg">
            <p className="mb-4">
              안녕하세요, <strong className="text-white">백엔드 및 시스템 엔지니어 김연철</strong>입니다.
            </p>
            <p className="mb-4">
              C/C++ 기반의 로우 레벨 시스템부터 Python, Java를 활용한 웹 서비스까지
              폭넓은 기술 스택을 보유하고 있습니다.
            </p>
            <p>
              
            </p>
          </div>
        </div>
      </div>
    </section>
);

// [SKILLS]
const SkillsSection = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const GIST_URL = import.meta.env.VITE_GIST_URL;

  useEffect(() => {
    const fetchGistData = async () => {
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

          const formattedSkills = favorites.map((item) => ({
            name: item.name,                
            pct: Math.round(item.value * 100),
            color: item.color               
          }))
              .filter(skill => skill.pct > 0);

          setSkills(formattedSkills);
        } else {
          console.warn("plugins.languages.favorites could not be found");
        }
      } catch (error) {
        console.error("Failed to load data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGistData();
  }, [GIST_URL]);

  return (
      <section id="skills" className="py-24 bg-[#020617]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-4">
            <span className="w-12 h-1 bg-[#38BDF8]"></span> SKILLS
          </h2>

          {loading ? (
              <div className="text-center py-10 text-[#64748b] animate-pulse">GitHub 데이터 동기화 중...</div>
          ) : (
              <div className="space-y-8">
                {skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2 text-[#cbd5e1] font-mono text-sm">
                        <span>{skill.name}</span>
                        <span>{skill.pct}%</span>
                      </div>
                      <div className="w-full bg-[#0F172A] rounded-full h-2.5 overflow-hidden border border-[#1E293B]">
                        <div
                            className="h-full shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all duration-1000 ease-out"
                            style={{
                              width: `${skill.pct}%`,
                              backgroundColor: skill.color || '#38BDF8',
                              boxShadow: `0 0 10px ${skill.color || '#38BDF8'}40`
                            }}
                        ></div>
                      </div>
                    </div>
                ))}
              </div>
          )}
        </div>
      </section>
  );
};

// [EXPERIENCE]
const ExperienceSection = () => (
    <section id="experience" className="py-24 bg-[#0B1121]">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-4">
          <span className="w-12 h-1 bg-[#38BDF8]"></span> EXPERIENCE
        </h2>
        <div className="relative border-l-2 border-[#1E293B] ml-4 space-y-12">
          <div className="pl-8 relative">
            <div className="absolute -left-[9px] top-0 w-4 h-4 bg-[#38BDF8] rounded-full border-4 border-[#0B1121] shadow-[0_0_10px_#38BDF8]"></div>
            <h3 className="text-2xl font-bold text-white">잼투인 주식회사 (JaM2in)</h3>
            <p className="text-[#38BDF8] font-mono mb-4">2023.07 ~ 현재 | 서버 개발팀 (사원)</p>
            <ul className="list-disc list-outside text-[#cbd5e1] space-y-2 ml-4">
              <li><strong>Arcus (DB 캐시) 개발:</strong> </li>
              <li><strong>Arcus C Client 개발:</strong> </li>
              <li><strong>Arcus Perl Client 개발:</strong> </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
);

// [PROJECTS]
const ProjectsSection = () => (
    <section id="projects" className="py-24 bg-[#020617]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-4">
          <span className="w-12 h-1 bg-[#38BDF8]"></span> PROJECTS
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
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
              <div key={idx} className="bg-[#0F172A] p-6 rounded-xl border border-[#38BDF8]/10 hover:-translate-y-2 hover:border-[#38BDF8] transition-all duration-300 shadow-lg">
                <h3 className="text-xl font-bold text-white mb-2">{proj.title}</h3>
                <p className="text-sm text-[#94a3b8] mb-4">{proj.period}</p>
                <p className="text-[#cbd5e1] text-sm mb-4">{proj.desc}</p>
                <span className="text-xs font-mono text-[#38BDF8] bg-[#38BDF8]/10 px-2 py-1 rounded border border-[#38BDF8]/30">
              {proj.tags}
            </span>
              </div>
          ))}
        </div>
      </div>
    </section>
);

// --- Main ---
function App() {
  const [activeSection, setActiveSection] = useState('home');

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
      <div className="bg-[#020617] min-h-screen text-white font-sans selection:bg-[#38BDF8] selection:text-white">
        <Navbar activeSection={activeSection} />

        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
        </main>

        <footer className="py-8 text-center text-[#475569] text-sm bg-[#020617] border-t border-[#38BDF8]/10">
          © 2025 Kim Yeoncheol. All rights reserved.
        </footer>
      </div>
  );
}

export default App;
