/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { SparkleParticle } from "../types";

export default function BackgroundParticles() {
  const [particles, setParticles] = useState<SparkleParticle[]>([]);

  useEffect(() => {
    const newParticles: SparkleParticle[] = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage of screen width
      y: Math.random() * 100 + 100, // start below or near bottom of screen
      size: Math.random() * 4 + 2, // size in px
      duration: Math.random() * 10 + 8, // duration in seconds
      delay: Math.random() * -15 // negative delay to start immediately at different phases
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-amber-300 opacity-60 blur-[1px]"
          style={{
            left: `${p.x}%`,
            bottom: `-20px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `floatUp ${p.duration}s infinite linear`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-110vh) translateX(calc(sin(var(--x, 0)) * 30px)) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
