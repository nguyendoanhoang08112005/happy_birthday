/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function MascotBear() {
  return (
    <div className="relative w-44 h-44 flex items-center justify-center select-none animate-sway">
      {/* The transparent background processed PNG bear */}
      <img 
        src="/mascot_bear.png" 
        className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)]" 
        alt="Mascot Bear" 
      />

      {/* Yellow Motion Sparkles next to the waving hand */}
      <div className="absolute right-[-8px] top-[40px] w-8 h-8 pointer-events-none animate-sparkle-lines">
        <svg viewBox="0 0 30 30" className="w-full h-full">
          <path d="M 5,20 L 15,12" stroke="#ffb020" strokeWidth="3" strokeLinecap="round" />
          <path d="M 8,26 L 20,24" stroke="#ffb020" strokeWidth="3" strokeLinecap="round" />
          <path d="M 2,12 L 8,3" stroke="#ffb020" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      <style>{`
        @keyframes sway {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-8px) rotate(3deg); }
        }
        .animate-sway {
          animation: sway 2.5s infinite ease-in-out;
        }

        @keyframes sparkle-lines {
          0%, 100% { opacity: 0.4; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        .animate-sparkle-lines {
          animation: sparkle-lines 0.8s infinite ease-in-out;
          transform-origin: center;
        }
      `}</style>
    </div>
  );
}
