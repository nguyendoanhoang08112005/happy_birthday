/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";

import { playBlowSound } from "../utils/audioSynth";

interface BirthdayCakeProps {
  onClick: () => void;
  shake?: boolean;
}

export default function BirthdayCake({ onClick, shake = false }: BirthdayCakeProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Generate candle positions
  const candles = [
    { left: "15%", height: "h-10", delay: "0s" },
    { left: "32%", height: "h-11", delay: "0.15s" },
    { left: "50%", height: "h-12", delay: "0.05s" },
    { left: "68%", height: "h-11", delay: "0.2s" },
    { left: "85%", height: "h-10", delay: "0.1s" },
  ];

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        playBlowSound();
        onClick();
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex flex-col items-center cursor-pointer select-none py-2 animate-pulseGlow transition-transform duration-300 ${
        shake ? "animate-shake" : ""
      }`}
      style={{ transform: isHovered ? "scale(1.03)" : "scale(1)" }}
    >
      {/* CANDLES CONTAINER (placed above top tier) */}
      <div className="relative w-32 h-16 -mb-1 z-30">
        {candles.map((candle, idx) => (
          <div
            key={idx}
            className="absolute bottom-0 flex flex-col items-center"
            style={{ left: candle.left }}
          >
            {/* Flame */}
            <div
              className="w-3 h-6 bg-gradient-to-t from-orange-600 via-amber-400 to-yellow-200 rounded-full origin-bottom animate-flicker shadow-[0_0_12px_#fbbf24]"
              style={{ animationDelay: candle.delay }}
            />
            {/* Wick */}
            <div className="w-[2px] h-2 bg-neutral-300" />
            {/* Candle Body with colored stripes */}
            <div className={`w-2.5 ${candle.height} rounded-t-sm bg-gradient-to-b from-rose-200 via-sky-300 to-yellow-200 relative overflow-hidden shadow-inner`}>
              {/* Stripe details */}
              <div className="absolute inset-0 opacity-40 bg-[linear-gradient(45deg,transparent_25%,#fff_25%,#fff_50%,transparent_50%,transparent_75%,#fff_75%)] bg-[length:6px_6px]" />
            </div>
          </div>
        ))}
      </div>

      {/* TIER 3 (TOP TIER) */}
      <div className="relative w-36 h-16 bg-gradient-to-b from-[#fff0f3] via-[#ffccd5] to-[#ffb3c1] rounded-t-2xl shadow-md z-20 overflow-hidden border-b border-[#ffccd5]">
        {/* Frosting Swirls (cream dollops) on top of this tier */}
        <div className="absolute top-0 left-0 right-0 flex justify-between px-1">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="w-5 h-5 bg-white rounded-full -mt-2 shadow-sm border-b border-rose-100"
            />
          ))}
        </div>
        
        {/* Strawberry decorations */}
        <div className="absolute top-2.5 left-0 right-0 flex justify-around px-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-3 h-4 bg-gradient-to-b from-rose-500 to-red-600 rounded-full shadow-sm transform rotate-12 relative">
              {/* Small green stem */}
              <div className="absolute -top-1 left-1 w-1 h-1.5 bg-emerald-500 rounded-full" />
            </div>
          ))}
        </div>

        {/* Cream drippings on the side */}
        <div className="absolute bottom-0 left-0 right-0 flex">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 h-3 bg-[#fff0f3] rounded-b-full shadow-sm"
              style={{ transform: `scaleY(${i % 2 === 0 ? 1 : 1.3})` }}
            />
          ))}
        </div>
      </div>

      {/* TIER 2 (MIDDLE TIER) */}
      <div className="relative w-52 h-20 bg-gradient-to-b from-[#ffb3c1] via-[#ff8fa3] to-[#ff758f] rounded-t-3xl shadow-lg z-10 overflow-hidden border-b border-[#ff8fa3] -mt-1">
        {/* Vertical striping pattern */}
        <div className="absolute inset-0 flex justify-around opacity-25">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-3 h-full bg-white transform skew-x-12" />
          ))}
        </div>

        {/* Frosting dollops at the border */}
        <div className="absolute top-0 left-0 right-0 flex justify-between px-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="w-6 h-4 bg-pink-100 rounded-b-full shadow-sm border-t border-white"
            />
          ))}
        </div>

        {/* Small decorative flowers */}
        <div className="absolute top-6 left-0 right-0 flex justify-around px-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-yellow-300 rounded-full relative">
                {/* Flower petals */}
                <div className="absolute inset-0 rounded-full border-4 border-rose-300 scale-200 opacity-60" />
              </div>
            </div>
          ))}
        </div>

        {/* Side drippings */}
        <div className="absolute bottom-0 left-0 right-0 flex">
          {Array.from({ length: 11 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 h-4 bg-[#ffccd5] rounded-b-full shadow-sm"
              style={{ transform: `scaleY(${i % 3 === 0 ? 1.4 : i % 3 === 1 ? 0.9 : 1.1})` }}
            />
          ))}
        </div>
      </div>

      {/* TIER 1 (BOTTOM TIER) */}
      <div className="relative w-64 h-24 bg-gradient-to-b from-[#ff8fa3] via-[#ff4d6d] to-[#c9184a] rounded-t-[2.5rem] shadow-xl z-0 overflow-hidden border-b border-[#ff4d6d] -mt-1">
        {/* Colorful sprinkle beads */}
        <div className="absolute inset-0">
          {[
            { top: "25%", left: "15%", color: "bg-yellow-300" },
            { top: "35%", left: "45%", color: "bg-sky-300" },
            { top: "20%", left: "75%", color: "bg-emerald-300" },
            { top: "50%", left: "28%", color: "bg-purple-300" },
            { top: "60%", left: "82%", color: "bg-amber-300" },
            { top: "45%", left: "62%", color: "bg-white" },
            { top: "65%", left: "12%", color: "bg-sky-200" },
            { top: "70%", left: "52%", color: "bg-rose-300" },
          ].map((sp, i) => (
            <div
              key={i}
              className={`absolute w-3 h-1.5 rounded-full ${sp.color} opacity-80 transform rotate-45 shadow-sm`}
              style={{ top: sp.top, left: sp.left }}
            />
          ))}
        </div>

        {/* Big cream swirl borders at the connection of Tier 1 & 2 */}
        <div className="absolute top-0 left-0 right-0 flex justify-between px-2">
          {Array.from({ length: 11 }).map((_, i) => (
            <div
              key={i}
              className="w-7 h-5 bg-white rounded-b-full shadow-sm border-t border-rose-200"
            />
          ))}
        </div>

        {/* Elegant ribbon wrapping around the base */}
        <div className="absolute bottom-3 left-0 right-0 h-4 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 shadow-sm opacity-90 flex justify-center items-center">
          <div className="w-full h-[2px] bg-amber-600 opacity-30" />
        </div>
      </div>

      {/* CAKE STAND */}
      <div className="relative -mt-1 w-76 z-10 flex flex-col items-center">
        {/* Plate Rim */}
        <div className="w-76 h-5 bg-gradient-to-r from-neutral-200 via-white to-neutral-300 rounded-full shadow-md border-b border-neutral-300 relative">
          {/* Subtle gold inner rim */}
          <div className="absolute inset-x-2 top-[3px] h-[3px] bg-amber-400 rounded-full opacity-65" />
        </div>
        {/* Stand Leg */}
        <div className="w-20 h-10 bg-gradient-to-b from-neutral-300 via-neutral-100 to-neutral-400 rounded-b-2xl shadow-lg border-x border-neutral-300" />
        {/* Stand Base */}
        <div className="w-40 h-3 bg-gradient-to-r from-neutral-400 via-neutral-200 to-neutral-500 rounded-full -mt-1 shadow-md" />
      </div>

      {/* Pulsing Floor Shadow */}
      <div className="w-68 h-5 bg-black/40 blur-md rounded-full mt-2 opacity-50 animate-pulse" />
    </div>
  );
}
