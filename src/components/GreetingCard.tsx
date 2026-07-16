/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "motion/react";

// =========================================================================
// CẤU HÌNH EMAILJS (EMAILJS CONFIGURATION)
// Hướng dẫn: 
// 1. Đăng ký tài khoản miễn phí tại https://www.emailjs.com/
// 2. Thêm một Email Service (ví dụ Gmail) để nhận Service ID.
// 3. Tạo một Email Template với các biến nhận:
//    - {{from_name}} : Tên người gửi lời chúc
//    - {{message}}   : Điều ước / Lời nhắn
//    - {{sent_time}} : Thời gian gửi thư
// 4. Lấy Public Key từ phần Account -> API Keys.
// 5. Thay thế các chuỗi placeholder dưới đây bằng thông tin thực tế của bạn:
// =========================================================================
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

interface GreetingCardProps {
  onSuccess?: () => void;
}

export default function GreetingCard({ onSuccess }: GreetingCardProps) {
  const [name, setName] = useState("");
  const [wish, setWish] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Custom Toast Validation
    if (!name.trim() && !wish.trim()) {
      showToast("Bạn quên điền cả tên và điều ước rồi nè! 💕");
      return;
    }
    if (!name.trim()) {
      showToast("Bạn quên điền tên mất rồi nè! 🧸");
      return;
    }
    if (!wish.trim()) {
      showToast("Bạn chưa nhập nội dung điều ước kìa! 🎂");
      return;
    }

    setStatus("sending");
    setErrorMessage("");
    setIsDemoMode(false);

    const currentTime = new Date().toLocaleString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
      dateStyle: "full",
      timeStyle: "medium"
    });

    const templateParams = {
      from_name: name.trim(),
      message: wish.trim(),
      sent_time: currentTime,
    };

    // 2. Check if the user hasn't configured EmailJS yet
    if (
      EMAILJS_SERVICE_ID === "YOUR_SERVICE_ID" ||
      EMAILJS_TEMPLATE_ID === "YOUR_TEMPLATE_ID" ||
      EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY"
    ) {
      // Run in demo-simulation mode to ensure seamless local trial!
      setTimeout(() => {
        setStatus("success");
        setIsDemoMode(true);
        onSuccess?.(); // Notify parent!
      }, 1500);
      return;
    }

    // 3. Send email via EmailJS
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      onSuccess?.(); // Notify parent!
    } catch (error: any) {
      console.error("EmailJS Error:", error);
      setStatus("error");
      setErrorMessage(
        "Oops! Gửi email gặp lỗi kỹ thuật. Bạn vẫn có thể thử lại, hoặc liên hệ trực tiếp chủ trang nha!"
      );
    }
  };

  return (
    <div className="w-full max-w-sm px-4">
      {status === "success" ? (
        // SUCCESS SCREEN
        <div className="bg-[#fffdf6] border-4 border-[#3a040e] rounded-[2rem] p-8 shadow-[8px_8px_0px_#3a040e] relative text-center flex flex-col items-center justify-center min-h-[340px] transform transition-all duration-500 scale-100">
          {/* Lace decorative border inside */}
          <div className="absolute inset-2 border-2 border-dashed border-rose-300 rounded-[1.6rem] pointer-events-none" />

          {/* Sparkles */}
          <span className="text-5xl mb-4 animate-bounce">💖</span>

          <h3 className="font-script text-4xl text-[#c9184a] font-bold mb-3">
            Gửi điều ước thành công!
          </h3>
          
          <p className="font-sans text-stone-700 text-sm md:text-base leading-relaxed px-2">
            Điều ước ngọt ngào của <strong className="text-rose-600">{name}</strong> đã được thắp sáng và gửi đi rồi nhé. Mong rằng tuổi mới sẽ mang đến cho bạn thật nhiều hạnh phúc và may mắn! ✨🎂
          </p>

          {isDemoMode && (
            <div className="mt-6 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl p-3 max-w-[260px] leading-relaxed relative z-10">
              <span className="font-bold">💡 Chế độ Demo:</span> Thiệp hoạt động hoàn hảo! Để thực sự nhận thư vào hòm thư cá nhân, hãy mở code và thay thế <code className="bg-amber-100 px-1 rounded">YOUR_SERVICE_ID</code> bằng tài khoản EmailJS của bạn nhé.
            </div>
          )}


        </div>
      ) : (
        // FORM INPUT SCREEN
        <form
          onSubmit={handleSubmit}
          className="bg-[#fffdf6] border-4 border-[#3a040e] rounded-[2rem] p-6 md:p-8 shadow-[8px_8px_0px_#3a040e] relative flex flex-col transform transition-all duration-300"
        >
          {/* Lace decorative border inside */}
          <div className="absolute inset-2 border border-dashed border-rose-200 rounded-[1.6rem] pointer-events-none" />

          {/* Corner Floral/Star Ornaments */}
          <div className="absolute top-4 left-4 text-rose-300 pointer-events-none opacity-55">🌸</div>
          <div className="absolute top-4 right-4 text-rose-300 pointer-events-none opacity-55">🌸</div>
          <div className="absolute bottom-4 left-4 text-rose-300 pointer-events-none opacity-55">🌸</div>
          <div className="absolute bottom-4 right-4 text-rose-300 pointer-events-none opacity-55">🌸</div>



          <h3 className="font-serif font-extrabold text-[#3a040e] text-xl md:text-2xl text-center mb-6 border-b border-rose-100 pb-2 flex items-center justify-center gap-1.5">
            <span>Tấm Thiệp Điều Ước</span>
            <span className="text-base text-rose-500">✨</span>
          </h3>

          {/* Name input */}
          <div className="mb-5 relative">
            <label className="block font-sans font-bold text-xs text-rose-700/80 mb-1.5 ml-1">
              Tên của bạn là gì nè? 🧸
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên dễ thương của bạn..."
              className="w-full font-sans font-semibold text-stone-800 bg-transparent border-b-2 border-stone-300 focus:border-[#c9184a] outline-none py-2 px-1 transition-colors text-sm"
            />
          </div>

          {/* Message input */}
          <div className="mb-6 relative">
            <label className="block font-sans font-bold text-xs text-rose-700/80 mb-1.5 ml-1">
              Viết điều ước / lời chúc tốt đẹp nhất 🎂
            </label>
            <textarea
              rows={4}
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              placeholder="Mong ước của bạn là gì? (Yên tâm nè, điều ước thầm kín này sẽ được gửi bảo mật và không bị lộ đâu nha! 🔒💖)"
              className="w-full font-sans text-stone-800 bg-rose-50/20 border-2 border-stone-200 rounded-2xl focus:border-[#c9184a] focus:bg-white outline-none p-3.5 transition-all text-sm resize-none leading-relaxed"
            />
          </div>

          {/* Error notice */}
          {status === "error" && (
            <div className="mb-4 text-center text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 p-2.5 rounded-xl">
              {errorMessage}
            </div>
          )}

          {/* Send Button */}
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-rose-400 to-rose-500 border-3 border-[#3a040e] text-white font-sans font-extrabold text-sm rounded-full shadow-[4px_4px_0px_#3a040e] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#3a040e] active:translate-y-[4px] active:shadow-none transition-all duration-150 disabled:opacity-75 disabled:cursor-not-allowed shine-effect flex items-center justify-center"
          >
            {status === "sending" ? (
              <span>Đang gửi đi... ✨</span>
            ) : (
              <span className="flex items-center justify-center gap-1.5">
                Thắp Sáng Điều Ước
                <svg viewBox="0 0 24 24" className="w-5 h-5 inline-block align-middle" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="candleFlame" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffe066" />
                      <stop offset="100%" stopColor="#ff9233" />
                    </linearGradient>
                  </defs>
                  {/* Flame */}
                  <path
                    d="M 12,2 C 9,5.5 9,8.5 12,11.5 C 15,8.5 15,5.5 12,2 Z"
                    fill="url(#candleFlame)"
                    stroke="#3a040e"
                    strokeWidth="1.2"
                    className="animate-pulse"
                  />
                  {/* Wick */}
                  <line x1="12" y1="11.5" x2="12" y2="14" stroke="#3a040e" strokeWidth="1.5" strokeLinecap="round" />
                  {/* Candle Body */}
                  <rect x="9.5" y="14" width="5" height="8" rx="1.2" fill="#fffdf9" stroke="#3a040e" strokeWidth="1.5" />
                  {/* Small gold stripe */}
                  <line x1="9.5" y1="17" x2="14.5" y2="17" stroke="#fbbf24" strokeWidth="1.2" />
                </svg>
                ✨
              </span>
            )}
          </button>
        </form>
      )}
      {/* FLOATING CUSTOM TOAST */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -70, x: "-50%", scale: 0.9 }}
            animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
            exit={{ opacity: 0, y: -40, x: "-50%", scale: 0.9 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed top-8 left-1/2 z-50 w-max max-w-[90%] bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 border-2 border-amber-300 px-6 py-3 rounded-full shadow-[0_10px_30px_rgba(225,29,72,0.35)] backdrop-blur-md"
          >
            <div className="flex items-center gap-2 text-white font-sans font-extrabold text-xs md:text-sm tracking-wide text-center">
              <span>⚠️</span>
              <span>{toastMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
