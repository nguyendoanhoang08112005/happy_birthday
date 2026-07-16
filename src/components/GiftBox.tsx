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
      colors: ["#fbc6d0", "#f43f5e", "#ec4899", "#fbbf24", "#ffffff"]
    });

    // 2. Left corner blast
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 60,
        origin: { x: 0.1, y: 0.8 },
        colors: ["#fbc6d0", "#ff758f", "#ffffff"]
      });
    }, 250);

    // 3. Right corner blast
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 60,
        origin: { x: 0.9, y: 0.8 },
        colors: ["#fbc6d0", "#ff758f", "#ffffff"]
      });
    }, 450);

    // 4. Final rain
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 100,
        origin: { y: 0.4 },
        colors: ["#fbc6d0", "#ffffff"]
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
    <div className="relative flex flex-col items-center select-none w-full max-w-sm px-2">
      {/* COMIC SPEECH BUBBLE */}
      <div className="relative mb-4 animate-float z-30">
        <div className="bg-[#fffdf9] border-4 border-[#3a040e] px-6 py-3.5 rounded-3xl shadow-[5px_5px_0px_#3a040e] max-w-xs text-center">
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
        className={`relative w-full max-w-[360px] h-[360px] flex items-center justify-center cursor-pointer group transition-all duration-300 ${
          clickCount < 2 ? "hover:scale-105" : ""
        } ${
          isAnimating && clickCount === 1 ? "animate-shake" : ""
        }`}
      >
        {/* AMBIENT BACKGROUND GLOW (SPOTLIGHT EFFECT) */}
        <div className="absolute w-[440px] h-[440px] bg-radial from-amber-200/25 via-pink-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-20 animate-float-glow" />

        {/* 3D ISOMETRIC SVG GIFT BOX */}
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full"
        >
          <defs>
            {/* Ambient Blur filters */}
            <filter id="glowBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="15" />
            </filter>
            
            <filter id="shadowBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" />
            </filter>

            {/* Box Body Gradients - Warm Blush Pink (Isometric shading stops) */}
            <linearGradient id="pinkBoxTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff0f2" />
              <stop offset="60%" stopColor="#fad2d8" />
              <stop offset="100%" stopColor="#e8a9b0" />
            </linearGradient>

            <linearGradient id="pinkBoxLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f4ccd2" />
              <stop offset="100%" stopColor="#d98a95" />
            </linearGradient>

            <linearGradient id="pinkBoxRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#cf7884" />
              <stop offset="60%" stopColor="#b65a67" />
              <stop offset="100%" stopColor="#993b47" />
            </linearGradient>

            {/* High-Gloss Satin Ribbon Gradients (Pink satin with multi-stop sheen) */}
            <linearGradient id="ribbonSatin" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9a2f42" />
              <stop offset="25%" stopColor="#d95d73" />
              <stop offset="45%" stopColor="#fbc2cc" />
              <stop offset="55%" stopColor="#ffffff" /> {/* Specular highlight */}
              <stop offset="65%" stopColor="#fbc2cc" />
              <stop offset="85%" stopColor="#d95d73" />
              <stop offset="100%" stopColor="#9a2f42" />
            </linearGradient>

            <linearGradient id="ribbonSatinDark" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6d1524" />
              <stop offset="25%" stopColor="#a33d50" />
              <stop offset="50%" stopColor="#c55369" />
              <stop offset="75%" stopColor="#a33d50" />
              <stop offset="100%" stopColor="#6d1524" />
            </linearGradient>

            {/* Premium Metallic Gold for Trim Edges (Multi-stop reflect) */}
            <linearGradient id="goldTrim" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8a6c2e" />
              <stop offset="20%" stopColor="#c9a24b" />
              <stop offset="40%" stopColor="#f4d78a" />
              <stop offset="65%" stopColor="#fff0cc" />
              <stop offset="85%" stopColor="#c9a24b" />
              <stop offset="100%" stopColor="#8a6c2e" />
            </linearGradient>

            {/* Highlight strip for corner reflection */}
            <linearGradient id="whiteHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Bow Shadow Filter */}
            <filter id="bowShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#2f010a" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* ==================== AMBIENT BOKEH BACKGROUND ==================== */}
          <g id="background-bokeh">
            {/* Blurry background flowers silhouette */}
            <path
              d="M 20 300 C 30 280, 50 280, 60 300 C 70 320, 40 340, 20 350 C 0 340, -30 320, -20 300 C -10 280, 10 280, 20 300 Z"
              fill="#7a1224"
              opacity="0.08"
              filter="url(#glowBlur)"
              transform="translate(10, 20) scale(1.5)"
            />
            <path
              d="M 380 270 C 390 250, 410 250, 420 270 C 430 290, 400 310, 380 320 C 360 310, 330 290, 340 270 C 350 250, 370 250, 380 270 Z"
              fill="#7a1224"
              opacity="0.08"
              filter="url(#glowBlur)"
              transform="translate(-30, 40) scale(1.3)"
            />
            {/* Depth of Field particles */}
            {/* Foreground large blurry particles */}
            <circle cx="50" cy="80" r="10" fill="#fff" opacity="0.08" filter="url(#glowBlur)" />
            <circle cx="350" cy="240" r="12" fill="#ffe6cc" opacity="0.1" filter="url(#glowBlur)" />
            {/* Background small sharp particles */}
            <circle cx="100" cy="60" r="2" fill="#fff" opacity="0.5" />
            <circle cx="290" cy="50" r="1.5" fill="#ffd1b3" opacity="0.6" />
            <circle cx="60" cy="210" r="2.5" fill="#ffe6cc" opacity="0.4" />
            <circle cx="320" cy="110" r="2" fill="#fff" opacity="0.5" />
          </g>

          {/* ==================== BASE OF THE BOX ==================== */}
          <g
            id="box-base"
            style={{
              transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              transform: clickCount === 2 ? "translateY(15px) scaleY(0.95)" : "none",
              transformOrigin: "200px 347px",
            }}
          >
            {/* Double-layer Floor Shadow beneath base */}
            <ellipse cx="200" cy="354" rx="105" ry="15" fill="#1b0005" opacity="0.45" filter="url(#shadowBlur)" />
            <ellipse cx="200" cy="350" rx="95" ry="11" fill="#1b0005" opacity="0.35" />

            {/* Base Left Face */}
            <polygon points="70,162 200,207 200,347 70,302" fill="url(#pinkBoxLeft)" />
            
            {/* Base Right Face */}
            <polygon points="200,207 330,162 330,302 200,347" fill="url(#pinkBoxRight)" />

            {/* Base Vertical Ribbon Left Face (with gold outlines) */}
            <polygon points="120,182 150,193 150,333 120,322" fill="url(#ribbonSatin)" stroke="url(#goldTrim)" strokeWidth="1" />

            {/* Base Vertical Ribbon Right Face (with gold outlines) */}
            <polygon points="250,193 280,182 280,322 250,333" fill="url(#ribbonSatinDark)" stroke="url(#goldTrim)" strokeWidth="1" />

            {/* Corner Highlight strip */}
            <polygon points="197,208 203,210 203,346 197,344" fill="url(#whiteHighlight)" />

            {/* Base Gold Trims (Gold lines on every edge - thicker) */}
            {/* Left Vertical Edge */}
            <line x1="70" y1="162" x2="70" y2="302" stroke="url(#goldTrim)" strokeWidth="1.8" />
            {/* Middle Vertical Edge */}
            <line x1="200" y1="207" x2="200" y2="347" stroke="url(#goldTrim)" strokeWidth="2.2" />
            {/* Right Vertical Edge */}
            <line x1="330" y1="162" x2="330" y2="302" stroke="url(#goldTrim)" strokeWidth="1.8" />
            {/* Bottom Edge Gold Trim */}
            <polyline points="70,302 200,347 330,302" fill="none" stroke="url(#goldTrim)" strokeWidth="2.2" />
          </g>

          {/* ==================== LID OF THE BOX ==================== */}
          <g
            id="box-lid"
            style={{
              transition: "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              transform:
                clickCount === 2
                  ? "translateY(-160px) rotate(-16deg) scale(0.85)"
                  : "none",
              opacity: clickCount === 2 ? 0 : 1,
              transformOrigin: "200px 150px",
            }}
          >
            {/* Lid Left Lip */}
            <polygon points="70,135 200,180 200,210 70,165" fill="url(#pinkBoxLeft)" />
            
            {/* Lid Right Lip */}
            <polygon points="200,180 330,135 330,165 200,210" fill="url(#pinkBoxRight)" />

            {/* Lid Top Face */}
            <polygon points="70,135 200,90 330,135 200,180" fill="url(#pinkBoxTop)" stroke="url(#goldTrim)" strokeWidth="1.8" />

            {/* Lid Ribbon strap crossing A (Left to Right) */}
            <polygon points="120,119 150,112 280,152 250,159" fill="url(#ribbonSatin)" stroke="url(#goldTrim)" strokeWidth="1" />
            
            {/* Lid Ribbon strap crossing B (Right to Left) */}
            <polygon points="250,119 280,112 150,152 120,159" fill="url(#ribbonSatin)" stroke="url(#goldTrim)" strokeWidth="1" />

            {/* Lid Lip Ribbons */}
            <polygon points="120,154 160,165 160,195 130,184" fill="url(#ribbonSatin)" stroke="url(#goldTrim)" strokeWidth="1" />
            <polygon points="240,175 270,164 270,189 240,200" fill="url(#ribbonSatinDark)" stroke="url(#goldTrim)" strokeWidth="1" />

            {/* Lid Gold Trims */}
            {/* Bottom Lip Edge */}
            <polyline points="70,165 200,210 330,165" fill="none" stroke="url(#goldTrim)" strokeWidth="2.2" />
            {/* Top Lip Edge */}
            <polyline points="70,135 200,180 330,135" fill="none" stroke="url(#goldTrim)" strokeWidth="1.8" />

            {/* THE GIFT TAG (White-pink, cursive gold text - LARGER) */}
            <g transform="translate(210, 160) rotate(22)">
              {/* Tag thread */}
              <path d="M 15 -2 Q 5 -15 -8 -8" fill="none" stroke="url(#goldTrim)" strokeWidth="1.2" />
              
              {/* Tag Body */}
              <path
                d="M 0 0 L 15 -10 L 27 -10 L 42 0 L 42 62 L 0 62 Z"
                fill="none"
                stroke="url(#goldTrim)"
                strokeWidth="1.6"
                filter="url(#bowShadow)"
              />
              <path
                d="M 0 0 L 15 -10 L 27 -10 L 42 0 L 42 62 L 0 62 Z"
                fill="url(#pinkBoxTop)"
                opacity="0.98"
              />
              {/* Tag inner gold border line */}
              <path
                d="M 2 3 L 15 -7 L 25 -7 L 40 3 L 40 60 L 2 60 Z"
                fill="none"
                stroke="url(#goldTrim)"
                strokeWidth="0.8"
                opacity="0.85"
              />
              {/* Tag gold ring hole */}
              <circle cx="21" cy="-3" r="2.5" fill="#35020c" stroke="url(#goldTrim)" strokeWidth="1" />
              
              {/* Tag text: "Especially with love" */}
              <text x="21" y="16" fontFamily="sans-serif" fontWeight="bold" fontSize="4.2" fill="url(#goldTrim)" textAnchor="middle" letterSpacing="1">FOR YOU</text>
              <text x="21" y="29" fontFamily="Dancing Script, cursive" fontStyle="italic" fontSize="9" fill="url(#goldTrim)" textAnchor="middle">Especially</text>
              <text x="21" y="40" fontFamily="sans-serif" fontWeight="semibold" fontSize="4" fill="url(#goldTrim)" textAnchor="middle" opacity="0.9">for you</text>
              <text x="21" y="48" fontFamily="sans-serif" fontSize="3.5" fill="url(#goldTrim)" textAnchor="middle" opacity="0.8">with love</text>
            </g>

            {/* VOLUMINOUS 3D PINK SATIN BOW WITH GOLD EDGES (4 loops, 2 long draping tails) */}
            <g filter="url(#bowShadow)">
              {/* Loop 3 (Back Left, Smaller) */}
              <path
                d="M 200 145 C 160 130 125 115 145 110 C 165 105 185 130 200 145"
                fill="url(#ribbonSatin)"
                stroke="url(#goldTrim)"
                strokeWidth="1.2"
              />
              {/* Loop 4 (Back Right, Smaller) */}
              <path
                d="M 200 145 C 240 130 275 115 255 110 C 235 105 215 130 200 145"
                fill="url(#ribbonSatin)"
                stroke="url(#goldTrim)"
                strokeWidth="1.2"
              />

              {/* Left Tail (Long draping down Base and over floor) */}
              <path
                d="M 195,150 C 170,165 140,195 132,230 C 122,270 100,320 60,335 C 55,337 60,345 70,342 C 105,330 132,280 142,235 C 150,195 170,172 195,155 Z"
                fill="url(#ribbonSatin)"
                stroke="url(#goldTrim)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M 188 155 C 168 171 146 195 137,225 C 145,200 168,178 188,155"
                fill="url(#ribbonSatinDark)"
                opacity="0.35"
              />

              {/* Right Tail (Long draping down Base and over floor) */}
              <path
                d="M 205,150 C 230,165 260,195 268,230 C 278,270 300,320 340,335 C 345,337 340,345 330,342 C 295,330 268,280 258,235 C 250,195 230,172 205,155 Z"
                fill="url(#ribbonSatin)"
                stroke="url(#goldTrim)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M 212 155 C 232 171 254 195 263,225 C 255 200 232 178 212 155"
                fill="url(#ribbonSatinDark)"
                opacity="0.35"
              />

              {/* Loop 1 (Front Left, Large) */}
              <path
                d="M 200 145 C 140 145 95 95 125 90 C 155 85 185 125 200 145"
                fill="url(#ribbonSatin)"
                stroke="url(#goldTrim)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Inner fold detail */}
              <path
                d="M 200 145 C 180 138, 140 110, 152 102 C 160 95, 180 110, 192 135 Z"
                fill="url(#ribbonSatinDark)"
                opacity="0.75"
              />
              <path
                d="M 185 128 C 180 122, 160 112, 155 112 C 160 110, 180 115, 185 128 Z"
                fill="#fff"
                opacity="0.25"
              />

              {/* Loop 2 (Front Right, Large) */}
              <path
                d="M 200 145 C 260 145 305 95 275 90 C 245 85 215 125 200 145"
                fill="url(#ribbonSatin)"
                stroke="url(#goldTrim)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Inner fold detail */}
              <path
                d="M 200 145 C 220 138, 255 110, 248 102 C 240 95, 220 110, 208 135 Z"
                fill="url(#ribbonSatinDark)"
                opacity="0.75"
              />
              <path
                d="M 215 128 C 220 122, 240 112, 245 112 C 240 110, 220 115, 215 128 Z"
                fill="#fff"
                opacity="0.25"
              />

              {/* Center Knot */}
              <rect
                x="186"
                y="134"
                width="28"
                height="24"
                rx="7"
                fill="url(#ribbonSatin)"
                stroke="url(#goldTrim)"
                strokeWidth="1.8"
              />
              <circle cx="193" cy="142" r="3.5" fill="#fff" opacity="0.4" />
            </g>

            {/* GOLD GLINT TWINKLES (Blinking white stars on corners) */}
            <path
              d="M 0,-7 L 2,-2 L 7,0 L 2,2 L 0,7 L -2,2 L -7,0 L -2,-2 Z"
              fill="#ffffff"
              className="animate-glint"
              style={{ animationDelay: "0.5s" }}
              transform="translate(200, 210)"
            />
            <path
              d="M 0,-7 L 2,-2 L 7,0 L 2,2 L 0,7 L -2,2 L -7,0 L -2,-2 Z"
              fill="#ffffff"
              className="animate-glint"
              style={{ animationDelay: "2s" }}
              transform="translate(70, 135)"
            />
          </g>

          {/* ==================== SCATTERED ROSE PETALS ==================== */}
          <g id="rose-petals" opacity="0.9">
            {/* Petal 1 (Bottom Left) */}
            <path
              d="M 45 325 C 50 320, 58 320, 61 327 C 64 334, 56 339, 51 337 C 46 335, 40 330, 45 325 Z"
              fill="url(#pinkBoxLeft)"
              stroke="#993b47"
              strokeWidth="0.5"
            />
            {/* Petal 2 (Bottom Left, Smaller) */}
            <path
              d="M 62 338 C 65 335, 70 335, 72 339 C 74 343, 69 346, 66 345 C 63 344, 59 341, 62 338 Z"
              fill="url(#pinkBoxLeft)"
              stroke="#993b47"
              strokeWidth="0.4"
            />
            {/* Petal 3 (Bottom Right) */}
            <path
              d="M 335 315 C 340 310, 348 310, 351 317 C 354 324, 346 329, 341 327 C 336 325, 330 320, 335 315 Z"
              fill="url(#pinkBoxLeft)"
              stroke="#993b47"
              strokeWidth="0.5"
              transform="rotate(15 340 320)"
            />
          </g>

        </svg>

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

        @keyframes float-glow {
          0%, 100% { transform: scale(1); opacity: 0.18; }
          50% { transform: scale(1.15); opacity: 0.32; }
        }
        .animate-float-glow {
          animation: float-glow 3.5s infinite ease-in-out;
        }

        @keyframes glint {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 1; }
        }
        .animate-glint {
          animation: glint 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
