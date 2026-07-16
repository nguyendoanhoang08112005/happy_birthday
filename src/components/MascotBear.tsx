/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";

export default function MascotBear() {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    // Blinking eye timer
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
      }, 180);
    }, 4000);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div className="relative w-40 h-40 flex items-center justify-center select-none animate-float">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
      >
        {/* Definition of gradients for rich 3D shading */}
        <defs>
          <linearGradient id="bearBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4a373" />
            <stop offset="100%" stopColor="#a98467" />
          </linearGradient>
          <linearGradient id="innerEar" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffccd5" />
            <stop offset="100%" stopColor="#ffb3c1" />
          </linearGradient>
          <linearGradient id="heartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff4d6d" />
            <stop offset="100%" stopColor="#c9184a" />
          </linearGradient>
        </defs>

        {/* LEFT EAR */}
        <circle cx="55" cy="55" r="28" fill="url(#bearBody)" stroke="#432818" strokeWidth="3" />
        <circle cx="55" cy="55" r="16" fill="url(#innerEar)" />

        {/* RIGHT EAR */}
        <circle cx="145" cy="55" r="28" fill="url(#bearBody)" stroke="#432818" strokeWidth="3" />
        <circle cx="145" cy="55" r="16" fill="url(#innerEar)" />

        {/* HEAD */}
        <circle cx="100" cy="105" r="68" fill="url(#bearBody)" stroke="#432818" strokeWidth="3" />

        {/* EYE SCLERA BACKING FOR SHAPE */}
        {/* LEFT EYE */}
        {isBlinking ? (
          // Blinking curve
          <path
            d="M 64 100 Q 76 108 88 100"
            fill="none"
            stroke="#432818"
            strokeWidth="5"
            strokeLinecap="round"
          />
        ) : (
          // Normal round cute eyes
          <>
            <circle cx="76" cy="98" r="8.5" fill="#1c0a00" />
            {/* Catchlight */}
            <circle cx="73" cy="95" r="2.5" fill="#ffffff" />
            <circle cx="78" cy="100" r="1" fill="#ffffff" />
          </>
        )}

        {/* RIGHT EYE */}
        {isBlinking ? (
          // Blinking curve
          <path
            d="M 112 100 Q 124 108 136 100"
            fill="none"
            stroke="#432818"
            strokeWidth="5"
            strokeLinecap="round"
          />
        ) : (
          // Normal round cute eyes
          <>
            <circle cx="124" cy="98" r="8.5" fill="#1c0a00" />
            {/* Catchlight */}
            <circle cx="121" cy="95" r="2.5" fill="#ffffff" />
            <circle cx="126" cy="100" r="1" fill="#ffffff" />
          </>
        )}

        {/* SNOUT / MOUTH AREA */}
        <ellipse cx="100" cy="118" rx="22" ry="16" fill="#f5ebe0" />
        
        {/* Cute Heart Nose */}
        <path
          d="M 100 115 C 97 109, 91 109, 91 113 C 91 117, 100 123, 100 123 C 100 123, 109 117, 109 113 C 109 109, 103 109, 100 115 Z"
          fill="#432818"
        />

        {/* Cute Smiling Mouth lines */}
        <path
          d="M 94 122 Q 100 128 100 122 Q 100 128 106 122"
          fill="none"
          stroke="#432818"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* ROSY BLUSH CHEEKS */}
        <ellipse cx="56" cy="112" rx="11" ry="7" fill="#ff758f" className="opacity-45" />
        <ellipse cx="144" cy="112" rx="11" ry="7" fill="#ff758f" className="opacity-45" />

        {/* CUTE LITTLE PAWS peeking up, holding heart */}
        <g className="animate-pulse origin-center">
          {/* Paw left */}
          <circle cx="75" cy="154" r="13" fill="url(#bearBody)" stroke="#432818" strokeWidth="3" />
          {/* Paw right */}
          <circle cx="125" cy="154" r="13" fill="url(#bearBody)" stroke="#432818" strokeWidth="3" />
          
          {/* HEART (Pulsing Mascot Heart) */}
          <path
            d="M 100 142 C 85 125, 70 140, 100 166 C 130 140, 115 125, 100 142 Z"
            fill="url(#heartGradient)"
            stroke="#3a040e"
            strokeWidth="3"
            className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
          />
          {/* Heart Catchlight sparkle */}
          <path d="M 106 138 A 6 6 0 0 0 114 142" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" className="opacity-60" />
        </g>
      </svg>
    </div>
  );
}
