# Prompt cho AI Agent: Xây dựng Website Thiệp Sinh Nhật Tương Tác

## Mục tiêu
Xây dựng một website đơn giản, chạy được trên điện thoại (mobile-first, responsive), gồm 3 màn hình chuyển cảnh tuần tự theo hành động click của người dùng, phong cách lãng mạn/ấm áp để chúc mừng sinh nhật.

## Công nghệ đề xuất
- HTML + CSS + JavaScript thuần (1 file duy nhất hoặc index.html + style.css + script.js), không cần framework nặng.
- Dùng CSS animation/transition cho hiệu ứng chuyển cảnh, không cần thư viện ngoài trừ khi cần confetti (có thể dùng canvas-confetti qua CDN).
- Để lưu lại điều ước & gửi qua email: dùng **EmailJS** (https://www.emailjs.com/) — cho phép gửi email trực tiếp từ JavaScript phía client mà không cần backend/server riêng. Agent cần:
  - Tạo form gửi qua EmailJS SDK (nhúng qua CDN).
  - Để trống các placeholder: `YOUR_SERVICE_ID`, `YOUR_TEMPLATE_ID`, `YOUR_PUBLIC_KEY` kèm chú thích rõ ràng để tôi tự điền sau khi đăng ký tài khoản EmailJS.
  - Template email cần gồm: tên người gửi, lời điều ước/nội dung thiệp, thời gian gửi.

## Cấu trúc 3 màn hình (single-page, chuyển cảnh bằng JS, không load lại trang)

### Màn hình 1 — Trang mở đầu
- Nền màu đỏ đô/burgundy (mã màu gần `#5c0a1e` hoặc tương tự ảnh mẫu), có thể thêm gradient nhẹ hoặc hiệu ứng ánh sáng tỏa ra từ giữa để tăng chiều sâu.
- Chữ "Happy Birthday!" font script/chữ viết tay, màu trắng/kem, căn giữa phía trên, có hiệu ứng ánh sáng nhẹ (text-shadow/glow) cho nổi bật.
- Bánh kem sinh nhật phải **to, đẹp, hoành tráng, chi tiết** — đây là điểm nhấn chính của màn hình. Yêu cầu agent **tự vẽ/tạo bánh kem hoàn toàn bằng CSS (nhiều lớp div bo tròn, gradient, shadow để tạo hiệu ứng kem 3 tầng) hoặc bằng SVG/Canvas vẽ trực tiếp trong code** — KHÔNG dùng ảnh placeholder, KHÔNG cần tôi thay ảnh sau. Bánh kem nên có:
  - Nhiều tầng kem trắng/kem với texture lượn sóng (dùng border-radius bất đối xứng hoặc nhiều lớp xếp chồng).
  - Trang trí thêm hoa kem nhỏ, hạt sprinkle màu sắc, hoặc dải ruy băng quanh đế bánh.
  - 5-7 cây nến với ngọn lửa có animation lung linh (flicker animation bằng CSS keyframes, đổi opacity/scale nhẹ liên tục).
  - Bóng đổ (shadow) bên dưới bánh để tạo chiều sâu, và có thể thêm hiệu ứng ánh sáng vàng ấm tỏa ra từ nến.
- Dòng chữ nhỏ phía dưới: "Click chiếc bánh để nhận điều bất ngờ!"
- Toàn bộ bánh kem có hiệu ứng nhấp nháy/tỏa sáng nhẹ (subtle glow/pulse animation) để gợi ý người dùng click vào.
- Khi click vào bánh → chuyển sang Màn hình 2 bằng hiệu ứng fade/slide mượt (khoảng 0.5-0.8s).

### Màn hình 2 — Hộp quà
- Cùng tông nền đỏ đô.
- Chính giữa màn hình là MỘT hộp quà duy nhất, **to, đẹp, chi tiết**, tự vẽ bằng CSS (nhiều div/gradient tạo khối hộp 3D) hoặc SVG — có ruy băng nơ to bản, màu sắc nổi bật (vàng gold hoặc hồng) tương phản với nền đỏ đô. Hộp quà nên có:
  - Hiệu ứng đổ bóng để trông có chiều sâu 3D.
  - Ruy băng chữ thập quanh hộp, nơ ở giữa nắp hộp.
  - Có thể thêm vài ánh sáng lấp lánh (sparkle) nhỏ xung quanh hộp để thu hút mắt.
- Thay vì để dòng chữ hướng dẫn trơn, hãy đặt trong một **bong bóng chat kiểu truyện tranh (comic speech bubble)** — hình bầu dục/bo tròn có đuôi nhọn chỉ xuống hộp quà, nền trắng/kem, viền đậm, chữ màu đen hoặc nâu đậm dễ đọc. Nội dung trong bong bóng: "Nhấn 1-2 lần để mở hộp quà nào! 🎁" (agent có thể tinh chỉnh câu chữ cho tự nhiên). Bong bóng nên có animation nhẹ nhàng bồng bềnh lên xuống (float animation) để trông sống động như đang "nói chuyện".
- Hiệu ứng khi click vào hộp quà:
  - Hộp quà có animation nắp mở ra hoặc hộp "nảy" lên nhẹ (scale + rotate nhỏ) trong khoảng 0.4s.
  - Sau đó kích hoạt hiệu ứng pháo giấy (confetti) bung ra khắp màn hình trong 1-2 giây (dùng thư viện canvas-confetti qua CDN: `https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js`).
  - Sau hiệu ứng, tự động chuyển sang Màn hình 3.

### Màn hình 3 — Lời chúc + Tấm thiệp điền thông tin
- Phía trên: thay vì dùng emoji/icon chúc mừng đơn thuần, hãy dùng một **hình con vật dễ thương** (ví dụ chú gấu bông, mèo, hoặc thỏ) làm nhân vật dẫn chuyện — agent tự vẽ bằng CSS/SVG theo phong cách cute, tròn trịa, màu pastel ấm áp (nâu be cho gấu, hồng cho má, mắt to tròn đen láy...), kích thước vừa phải, đặt lệch một chút để tạo cảm giác gần gũi.
- Bên cạnh/phía trên con vật là một **bong bóng chat kiểu truyện tranh** (cùng phong cách với bong bóng ở Màn hình 2, nền trắng/kem, viền đậm, đuôi bong bóng chỉ về phía con vật), bên trong chứa dòng chữ: "Chúc mừng! Bạn có một điều ước... 🎉✨" — có thể thêm hiệu ứng xuất hiện chữ kiểu gõ máy (typing effect) hoặc fade-in cho sinh động.
- Bên dưới là tấm thiệp dạng khung viền **xinh xắn, cute**, không đơn điệu:
  - Viền thiệp bo góc mềm mại, có họa tiết trang trí nhỏ ở góc (hoa, trái tim, ngôi sao — vẽ bằng CSS/SVG), nền thiệp màu kem/trắng ngà tương phản ấm với nền đỏ đô.
  - Có thể thêm chút hiệu ứng như dấu tem/con dấu sáp ở góc thiệp cho sang trọng, hoặc đường viền dạng ren (lace border) nhẹ nhàng.
  - Ô nhập **Tên của bạn** (input text, bắt buộc) — style input dạng underline mảnh, font chữ tay nhẹ nhàng, có label nhỏ dễ thương phía trên (VD: "Tên của bạn là gì nè?").
  - Ô nhập **Điều ước / Lời nhắn của bạn** (textarea, bắt buộc) — tương tự phong cách trên.
  - Nút bấm "Gửi điều ước" — bo tròn, màu gradient ấm (vàng gold/hồng), có hiệu ứng hover/press nảy nhẹ (scale) cho cảm giác cute và mềm mại.
- Khi bấm gửi:
  - Validate không được để trống 2 trường.
  - Gửi dữ liệu qua EmailJS đến email của chủ trang.
  - Hiện trạng thái loading ngắn trên nút (ví dụ đổi text thành "Đang gửi...").
  - Sau khi gửi thành công: ẩn form, hiện lời cảm ơn kiểu "Cảm ơn bạn đã gửi lời chúc/điều ước! 💕" kèm hiệu ứng nhẹ (fade in, có thể thêm icon trái tim).
  - Nếu gửi lỗi: hiện thông báo lỗi thân thiện, cho phép thử lại.

## Yêu cầu về giao diện chung
- Toàn bộ trang tối ưu cho màn hình điện thoại dọc (portrait), max-width khoảng 480px, căn giữa trên màn hình lớn hơn.
- Font chữ: tiêu đề dùng font script/cursive lãng mạn (ví dụ Google Fonts "Playfair Display" hoặc "Dancing Script" cho phần "Happy Birthday!"), phần nội dung/form dùng font sans-serif dễ đọc (ví dụ "Poppins" hoặc "Nunito").
- Bảng màu chủ đạo: đỏ đô/burgundy làm nền, chữ trắng/kem, điểm nhấn vàng gold hoặc hồng pastel cho các chi tiết trang trí (ruy băng, trái tim, ánh sáng nến).
- Toàn bộ chuyển cảnh giữa 3 màn hình mượt mà, không giật, không cần nút "back" (luồng đi thẳng 1 chiều).
- Thêm hiệu ứng nền tinh tế (ví dụ vài ánh sáng lấp lánh/particle nhẹ bay lên) để tăng cảm giác ấm cúng, nhưng không làm rối giao diện hay nặng trang.

## Việc cần agent làm cụ thể
1. Tạo file `index.html` chứa đầy đủ HTML, CSS (inline `<style>` hoặc file riêng), JS (inline `<script>` hoặc file riêng).
2. Viết rõ comment trong code ở các chỗ cần tôi tự thay: ảnh bánh kem, ảnh hộp quà, EmailJS Service ID/Template ID/Public Key, email nhận.
3. Đảm bảo code chạy được ngay khi mở file HTML trên trình duyệt điện thoại (test thử luồng: mở trang → click bánh → click hộp quà → confetti → hiện thiệp → điền form → gửi → hiện cảm ơn).
4. Không dùng framework phức tạp (không React/Vue) — chỉ HTML/CSS/JS thuần để dễ deploy lên bất kỳ hosting tĩnh nào (Netlify, GitHub Pages, Canva site, v.v.)