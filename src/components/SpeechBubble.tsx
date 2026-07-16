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
      {/* Triangle pointer tail pointing down-left toward the mascot bear */}
      <div className="absolute left-8 -bottom-3.5 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-[#fffdf9] filter drop-shadow-[0_3px_0px_#3a040e]" />
      <div className="absolute left-[30px] -bottom-[17px] w-0 h-0 border-l-[11px] border-l-transparent border-r-[11px] border-r-transparent border-t-[14px] border-t-[#3a040e] -z-10" />
    </div>
  );
}
