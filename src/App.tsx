/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ActiveScreen } from "./types";
import BackgroundParticles from "./components/BackgroundParticles";
import BirthdayCake from "./components/BirthdayCake";
import GiftBox from "./components/GiftBox";
import MascotBear from "./components/MascotBear";
import SpeechBubble from "./components/SpeechBubble";
import GreetingCard from "./components/GreetingCard";

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>(ActiveScreen.CAKE);
  const [isWishSent, setIsWishSent] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isMutedRef = useRef(isMuted);

  // Sync the ref with state to prevent React state closure bugs
  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    let audio: HTMLAudioElement | null = null;

    const handleVisibilityChange = () => {
      if (!audio) return;
      if (document.hidden) {
        audio.pause();
      } else {
        // Only resume if the user hasn't muted it
        if (!isMutedRef.current) {
          audio.play().catch((err) => {
            console.log("Audio play failed on visibility resume:", err);
          });
        }
      }
    };

    if (activeScreen === ActiveScreen.CARD) {
      // Play the user's .m4a audio file
      audio = new Audio("/HappyBirthday.m4a");
      audio.loop = true;
      audio.volume = 0.45; // Soft romance background volume
      
      // Ensure the initial muted state is synchronized
      audio.muted = isMutedRef.current;

      audio.play().catch((err) => {
        console.log("Audio autoplay was blocked or failed:", err);
      });
      
      audioRef.current = audio;
      document.addEventListener("visibilitychange", handleVisibilityChange);
    }

    return () => {
      if (audio) {
        audio.pause();
      }
      audioRef.current = null;
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [activeScreen]);

  const toggleMute = () => {
    if (audioRef.current) {
      const nextMute = !isMuted;
      audioRef.current.muted = nextMute;
      setIsMuted(nextMute);

      // Fix: If unmuting and the audio is currently paused (due to tab switching), resume playing!
      if (!nextMute && audioRef.current.paused) {
        audioRef.current.play().catch((err) => {
          console.log("Audio play failed on toggle:", err);
        });
      }
    }
  };

  return (
    <div className="w-full min-h-dvh flex justify-center items-center bg-[#35020c] text-white relative overflow-hidden font-sans">
      {/* ROYAL BURGUNDY GRADIENT BACKDROP */}
      <div className="absolute inset-0 bg-radial from-[#5c0a1e] via-[#2f010a] to-[#120003] z-0" />

      {/* FLOATING MAGIC PARTICLES */}
      <BackgroundParticles />

      {/* AMBIENT BACKGROUND GLOWS & STAR DECORATIONS */}
      <div className="absolute top-1/4 left-1/10 w-1.5 h-1.5 bg-yellow-200 rounded-full animate-sparkle" style={{ animationDelay: "0.2s" }} />
      <div className="absolute top-1/3 right-1/8 w-2 h-2 bg-amber-300 rounded-full animate-sparkle" style={{ animationDelay: "0.9s" }} />
      <div className="absolute bottom-1/4 left-1/8 w-2 h-2 bg-yellow-100 rounded-full animate-sparkle" style={{ animationDelay: "1.5s" }} />
      <div className="absolute bottom-1/3 right-1/10 w-1 h-1 bg-amber-200 rounded-full animate-sparkle" style={{ animationDelay: "0.5s" }} />

      {/* MOBILE CONTAINER (Max width 480px, responsive & centered) */}
      <main className="w-full max-w-[480px] h-dvh max-h-dvh flex flex-col justify-between items-center py-4 px-6 z-10 relative overflow-hidden">
        {/* FLOATING MUSIC CONTROLLER */}
        {activeScreen === ActiveScreen.CARD && (
          <button
            onClick={toggleMute}
            className="absolute top-4 right-4 z-40 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-base shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 select-none cursor-pointer"
            title={isMuted ? "Bật nhạc" : "Tắt nhạc"}
          >
            <span className={isMuted ? "" : "animate-spin-slow"}>
              {isMuted ? "🔇" : "🎵"}
            </span>
          </button>
        )}
        
        {/* HEADER BRANDING */}
        <header className="w-full text-center select-none pt-4">
          <p className="font-sans font-bold text-xs tracking-[0.3em] text-rose-300/60 uppercase">
            Special Celebration
          </p>
        </header>

        {/* SCREEN ROUTER WITH SMOOTH TRANSITIONS */}
        <div className="w-full flex flex-col items-center justify-center flex-grow my-2">
          <AnimatePresence mode="wait">
            
            {/* SCREEN 1: THE CAKE */}
            {activeScreen === ActiveScreen.CAKE && (
              <motion.div
                key="screen-cake"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full flex flex-col items-center justify-center"
              >
                <h1 className="font-script text-white text-5xl md:text-6xl text-center select-none tracking-wide drop-shadow-[0_2px_15px_rgba(251,113,133,0.55)] leading-tight mb-1">
                  Happy Birthday!
                </h1>
                
                <p className="font-serif italic text-amber-200/80 text-xs md:text-sm text-center mb-4 tracking-wide">
                  Chúc Mừng Sinh Nhật
                </p>

                {/* THE MASSIVE CSS CAKE */}
                <BirthdayCake onClick={() => setActiveScreen(ActiveScreen.GIFT)} />

                {/* VISUAL GUIDE INSTRUCTION */}
                <p className="mt-4 font-sans font-extrabold text-xs md:text-sm text-center text-rose-200/90 tracking-wide animate-pulse bg-rose-950/40 px-5 py-2 rounded-full border border-rose-800/30">
                  👆 Chạm vào chiếc bánh để nhận điều bất ngờ!
                </p>
              </motion.div>
            )}

            {/* SCREEN 2: THE GIFT BOX */}
            {activeScreen === ActiveScreen.GIFT && (
              <motion.div
                key="screen-gift"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full flex flex-col items-center justify-center"
              >
                <GiftBox onOpenComplete={() => setActiveScreen(ActiveScreen.CARD)} />
              </motion.div>
            )}

            {/* SCREEN 3: WISH CARD FORM */}
            {activeScreen === ActiveScreen.CARD && (
              <motion.div
                key="screen-card"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full flex flex-col items-center"
              >
                {/* MASCOT CHATTING ZONE */}
                <div className="w-full flex items-end justify-center gap-2 pl-4 mb-4 select-none">
                  {/* Bear Mascot */}
                  <div className="transform -rotate-6">
                    <MascotBear />
                  </div>
                  {/* Floating Speech Bubble */}
                  <div className="transform rotate-3 mb-2">
                    <SpeechBubble text={isWishSent ? "Yay! Điều ước đã bay vào vũ trụ rồi! 🚀✨" : "Chúc mừng! Bạn có một điều ước... 🎉✨"} />
                  </div>
                </div>

                {/* FILLABLE WISH CARD */}
                <GreetingCard onSuccess={() => setIsWishSent(true)} />
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* FOOTER */}
        <footer className="w-full text-center select-none pb-2" />

      </main>
    </div>
  );
}
