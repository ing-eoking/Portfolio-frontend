import { useEffect, useRef } from 'react';

const Robot = ({ isSearching }) => {
    const leftPupilRef = useRef(null);
    const rightPupilRef = useRef(null);
    const leftHandRef = useRef(null);
    const rightHandRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (event) => {
            if (isSearching) return;

            const { clientX, clientY } = event;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            const moveX = (clientX - centerX) / window.innerWidth * 5;
            const moveY = (clientY - centerY) / window.innerHeight * 5;

            if (leftPupilRef.current) leftPupilRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
            if (rightPupilRef.current) rightPupilRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isSearching]);

    return (
        <div className="w-80 h-80 md:w-[450px] md:h-[450px] relative flex items-center justify-center">
            <style>{`
                @keyframes typeLeft {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-7px); }
                }
                @keyframes typeRight {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-7px); }
                }
                .typing-left { animation: typeLeft 0.15s infinite; }
                .typing-right { animation: typeRight 0.15s infinite 0.07s; }
            
                .robot-hand {
                  fill: #c7d8db;
                  stroke: #000000;
                  stroke-width: 1.7px;
                }
                
                @keyframes floatBubble {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-10px); }
                }
                .bubble-float { animation: floatBubble 2s ease-in-out infinite; }
            `}</style>

            <div className={`absolute top-[0%] left-1/2 -translate-x-1/2 z-50 transition-all duration-300 origin-bottom ${isSearching ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`}>
                <div className={isSearching ? 'bubble-float' : ''}>
                    <div className="relative bg-[#38BDF8] text-[#020617] px-4 py-2 rounded-xl font-bold text-sm shadow-[0_0_20px_rgba(56,189,248,0.5)] whitespace-nowrap">
                        DATA_#$#_FETCH
                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#38BDF8] rotate-45"></div>
                    </div>
                </div>
            </div>

            <img
                src="/robot.png"
                alt="Robot Body"
                className="absolute inset-0 w-full h-full object-contain z-0 transform scale-110"
            />

            <div className="absolute bottom-[27%] left-1/2 -translate-x-1/2 w-[39%] z-25">
                <img
                    src="/laptop-top.png"
                    alt="Laptop Top"
                    className="w-full h-auto drop-shadow-xl"
                />
            </div>

            <svg
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 w-full h-full z-20 pointer-events-none"
            >

                <g>
                    <circle ref={leftPupilRef} cx="87" cy="77" r="4" className={`transition-colors duration-300 ${isSearching ? 'fill-yellow-400' : 'fill-[#38BDF8]'}`} />
                    <circle ref={rightPupilRef} cx="112" cy="77" r="4" className={`transition-colors duration-300 ${isSearching ? 'fill-yellow-400' : 'fill-[#38BDF8]'}`} />
                </g>

                <g>
                    <circle
                        ref={leftHandRef}
                        cx="79"
                        cy="113"
                        r="7"
                        className={`robot-hand ${isSearching ? 'typing-left' : ''}`}
                    />
                    <circle
                        ref={rightHandRef}
                        cx="120"
                        cy="113"
                        r="7"
                        className={`robot-hand ${isSearching ? 'typing-right' : ''}`}
                    />
                </g>
            </svg>

            <div className="absolute bottom-[21%] left-1/2 -translate-x-1/2 w-[38%] z-15">
                <img
                    src="/laptop-bottom.png"
                    alt="Laptop Bottom"
                    className="w-full h-auto drop-shadow-2xl"
                />
            </div>
        </div>
    );
};

export default Robot;
