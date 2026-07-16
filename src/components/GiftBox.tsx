/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import confetti from "canvas-confetti";

interface GiftBoxProps {
  onOpenComplete: () => void;
}

export default function GiftBox({ onOpenComplete }: GiftBoxProps) {
  const [clickCount, setClickCount] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const handleBoxClick = () => {
    if (isAnimating) return;

    if (clickCount === 0) {
      // First click: Jiggle animation
      setIsAnimating(true);
      setClickCount(1);
      setTimeout(() => {
        setIsAnimating(false);
      }, 600);
    } else if (clickCount === 1) {
      // Second click: Open!
      setIsAnimating(true);
      setClickCount(2);
      
      // Burst confetti
      triggerConfettiShow();

      // Transition to screen 3 after 2.2 seconds of confetti & opening animations
      setTimeout(() => {
        onOpenComplete();
      }, 2200);
    }
  };

  const triggerConfettiShow = () => {
    // 1. Center blast
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.65 },
      colors: ["#fbbf24", "#f43f5e", "#ec4899", "#3b82f6", "#10b981", "#ffffff"]
    });

    // 2. Left corner blast
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 60,
        origin: { x: 0.1, y: 0.8 },
        colors: ["#fbbf24", "#ff758f", "#ffffff"]
      });
    }, 250);

    // 3. Right corner blast
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 60,
        origin: { x: 0.9, y: 0.8 },
        colors: ["#fbbf24", "#ff758f", "#ffffff"]
      });
    }, 450);

    // 4. Final rain
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 100,
        origin: { y: 0.4 },
        colors: ["#fbbf24", "#ffffff"]
      });
    }, 800);
  };

  // Comic Bubble Text based on state
  const getBubbleText = () => {
    if (clickCount === 0) return "Nhấn 1-2 lần để mở hộp quà nào! 🎁";
    if (clickCount === 1) return "Sắp mở được rồi! Nhấn thêm 1 lần nữa nha! ✨💖";
    return "Oa! Quà đang mở ra kìa... 🎉✨";
  };

  return (
    <div className="relative flex flex-col items-center select-none w-full max-w-sm px-4">
      {/* COMIC SPEECH BUBBLE */}
      <div className="relative mb-12 animate-float z-30">
        <div className="bg-[#fffdf9] border-4 border-[#3a040e] px-6 py-4 rounded-3xl shadow-[5px_5px_0px_#3a040e] max-w-xs text-center">
          <p className="font-sans font-extrabold text-stone-800 text-sm md:text-base leading-relaxed">
            {getBubbleText()}
          </p>
        </div>
        {/* Triangle Tail */}
        <div className="absolute left-1/2 -bottom-4 -translate-x-1/2 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[16px] border-t-[#fffdf9] filter drop-shadow-[0_4px_0px_#3a040e]" />
        <div className="absolute left-1/2 -bottom-[20px] -translate-x-1/2 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[18px] border-t-[#3a040e] -z-10" />
      </div>

      {/* GIFT BOX WRAPPER */}
      <div
        onClick={handleBoxClick}
        className={`relative w-48 h-48 cursor-pointer group transition-all duration-300 ${
          clickCount < 2 ? "hover:scale-105" : ""
        } ${
          isAnimating && clickCount === 1 ? "animate-shake" : ""
        }`}
      >
        {/* SHADOW */}
        <div className="absolute -bottom-4 left-4 right-4 h-5 bg-black/40 blur-md rounded-full -z-10 group-hover:scale-x-95 transition-transform" />

        {/* LID (NẮP HỘP) */}
        <div
          className={`absolute left-[-8px] w-[208px] h-12 bg-gradient-to-r from-rose-500 to-[#e11d48] rounded-t-xl border-3 border-[#3a040e] shadow-md z-20 transition-all duration-700 ease-out`}
          style={{
            transform:
              clickCount === 2
                ? "translateY(-120px) rotate(-15deg) scale(0.9)"
                : "translateY(0) rotate(0deg)",
            opacity: clickCount === 2 ? 0 : 1,
          }}
        >
          {/* Lid vertical ribbon */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-10 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 border-x-3 border-[#3a040e]" />
          {/* Lid horizontal ribbon */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-4 bg-gradient-to-b from-amber-400 via-amber-300 to-amber-500 border-y-3 border-[#3a040e]" />

          {/* GOLD BOW (NƠ VÀNG) on top of the lid */}
          <div className="absolute -top-[52px] left-1/2 -translate-x-1/2 w-24 h-16 pointer-events-none">
            <svg viewBox="0 0 100 60" className="w-full h-full filter drop-shadow-[0_2px_0px_#3a040e]">
              {/* Left loop */}
              <path
                d="M 50 40 C 15 40, 5 10, 25 10 C 45 10, 48 32, 50 40"
                fill="#fbbf24"
                stroke="#3a040e"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              <path
                d="M 50 40 C 15 40, 5 10, 25 10 C 45 10, 48 32, 50 40"
                fill="#fcd34d"
                className="opacity-90"
              />
              
              {/* Right loop */}
              <path
                d="M 50 40 C 85 40, 95 10, 75 10 C 55 10, 52 32, 50 40"
                fill="#fbbf24"
                stroke="#3a040e"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              <path
                d="M 50 40 C 85 40, 95 10, 75 10 C 55 10, 52 32, 50 40"
                fill="#fcd34d"
                className="opacity-90"
              />
              
              {/* Left tail ribbon */}
              <path
                d="M 45 40 C 30 52, 18 58, 12 52 C 8 46, 25 43, 45 40"
                fill="#f59e0b"
                stroke="#3a040e"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              {/* Right tail ribbon */}
              <path
                d="M 55 40 C 70 52, 82 58, 88 52 C 92 46, 75 43, 55 40"
                fill="#f59e0b"
                stroke="#3a040e"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              
              {/* Center knot */}
              <circle
                cx="50"
                cy="40"
                r="8.5"
                fill="#fbbf24"
                stroke="#3a040e"
                strokeWidth="3.5"
              />
              <circle cx="48" cy="38" r="3" fill="#fff" className="opacity-60" />
            </svg>
          </div>
        </div>

        {/* BASE BOX (THÂN HỘP) */}
        <div
          className={`absolute top-10 w-48 h-38 bg-gradient-to-b from-rose-600 to-[#be123c] rounded-b-xl border-3 border-[#3a040e] shadow-inner overflow-hidden z-10 transition-all duration-500`}
          style={{
            transform: clickCount === 2 ? "scaleY(0.9) translateY(10px)" : "scaleY(1)",
          }}
        >
          {/* Vertical ribbon on base */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-10 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 border-x-3 border-[#3a040e]" />
          {/* Horizontal ribbon on base */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-4 bg-gradient-to-b from-amber-400 via-amber-300 to-amber-500 border-y-3 border-[#3a040e]" />
          
          {/* Sparkly shine inside if hovered */}
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
        </div>

        {/* SPARKLES EMITTING ON OPEN */}
        {clickCount === 2 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
            <span className="text-4xl animate-ping absolute duration-1000">💖</span>
            <span className="text-3xl animate-ping absolute delay-300 duration-1000">✨</span>
            <span className="text-2xl animate-ping absolute delay-700 duration-1000">🌟</span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: rotate(0deg) scale(1); }
          15% { transform: rotate(-8deg) scale(1.05); }
          30% { transform: rotate(6deg) scale(1.05); }
          45% { transform: rotate(-5deg) scale(1.02); }
          60% { transform: rotate(4deg) scale(1.02); }
          75% { transform: rotate(-2deg) scale(1.01); }
          90% { transform: rotate(1deg) scale(1.01); }
        }
        .animate-shake {
          animation: shake 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
}
