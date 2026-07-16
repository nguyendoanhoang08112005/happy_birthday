/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface SpeechBubbleProps {
  text: string;
}

export default function SpeechBubble({ text }: SpeechBubbleProps) {
  return (
    <div className="relative animate-float z-30 mb-4 max-w-[260px]">
      <div className="bg-[#fffdf9] border-3 border-[#3a040e] px-5 py-3 rounded-2xl shadow-[4px_4px_0px_#3a040e] text-center">
        <p className="font-sans font-extrabold text-stone-800 text-xs md:text-sm leading-relaxed">
          {text}
        </p>
      </div>
      {/* Triangle pointer tail pointing left toward the mascot bear */}
      <div className="absolute -left-[11px] top-[60%] -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[12px] border-r-[#fffdf9]" />
      <div className="absolute -left-[14px] top-[60%] -translate-y-1/2 w-0 h-0 border-t-[9px] border-t-transparent border-b-[9px] border-b-transparent border-r-[15px] border-r-[#3a040e] -z-10" />
    </div>
  );
}
