# BÁO CÁO KIỂM TOÁN KIẾN TRÚC DỰ ÁN REACTJS (REACTJS STRUCTURE AUDIT)

**Dự án:** Chung Đôi Editor & Web (`chungdoi-editor`)  
**Ngày thực hiện:** 17/10/2026  
**Vai trò:** Senior ReactJS Architect & Frontend Refactoring Engineer  
**Trạng thái:** Hoàn thành kiểm toán (Audit Complete) — Đang chờ phê duyệt trước khi di chuyển mã nguồn.

---

## 1. TỔNG QUAN HIỆN TRẠNG (PROJECT OVERVIEW)

| Hạng mục | Công nghệ & Phiên bản hiện tại | Đánh giá & Ghi chú |
|---|---|---|
| **Framework** | React 18.3.1 (`react`, `react-dom`) | Dùng React 18 createRoot, StrictMode |
| **Language** | TypeScript 5.5.4 | Cấu hình `strict: true`, `noEmit: true`, moduleResolution: `bundler` |
| **Build Tool** | Vite 5.4.21 (`@vitejs/plugin-react`) | Tốc độ build tốt, nhưng chưa cấu hình path alias (`@/*`) |
| **Styling** | Tailwind CSS 3.4.17 + PostCSS + CSS thuần | `styles.css` (146KB), `pages.css` (84KB), `tw.css` (Tailwind utilities) |
| **Routing** | Custom Client-side Router (`src/router.tsx`) | Dùng HTML5 History API (`pushState`, `popstate`) và custom event `app:navigate` |
| **State Management** | LocalStorage + Custom Event Emitters | Quản lý state tập trung qua `src/store.ts` + event `auth_change`, `app:theme`, `start_tutorial_tour` |
| **Testing** | Chưa có test runner (Jest/Vitest/Playwright) | Chỉ có `tsc --noEmit`, `vite build`, `node scripts/check-assets.mjs` |

---

## 2. CÂY THƯ MỤC NGUỒN HIỆN TẠI (EXISTING STRUCTURE)

Hiện tại toàn bộ thư mục `src/` có **34 tệp**, trong đó **25 tệp nằm ngang hàng ngay tại thư mục gốc `src/`**, chỉ có 2 thư mục con (`src/pages/` và `src/generated/`):

```text
src/
├── App.tsx                    (5.5 KB)  - Editor Page / Controller chính
├── data.ts                    (11.1 KB) - Kiểu dữ liệu, dữ liệu mẫu & Calendar/Date utils
├── Header.tsx                 (13.6 KB) - Editor Header + selector modal + settings dropdown
├── HeroPhoto.tsx              (9.4 KB)  - Phần ảnh đầu thiệp + CropModal
├── LongPhungV2.tsx            (8.2 KB)  - Template cover & header "Long Phụng V2 - Đỏ"
├── main.tsx                   (0.4 KB)  - Điểm khởi chạy ứng dụng (Entry Point)
├── MinimalismDarkRed.tsx      (9.1 KB)  - Template cover "Minimalism - Đỏ Đậm"
├── MusicPicker.tsx            (9.7 KB)  - Modal chọn & nghe thử nhạc nền thiệp
├── pages.css                  (83.9 KB) - CSS cho các trang Home, Pricing, Templates, Account, Guests...
├── Preview.tsx                (69.4 KB) - Engine dựng thiệp cưới hoàn chỉnh & tương tác
├── PublishCheckModal.tsx      (6.7 KB)  - Modal kiểm tra thông tin trước khi xuất bản thiệp
├── Root.tsx                   (4.5 KB)  - Shell điều hướng các route và footer chung
├── router.tsx                 (1.3 KB)  - Custom client-side router (Link, navigate, usePath)
├── Sections.tsx               (87.8 KB) - File khổng lồ (~1890 dòng) chứa 16 form sections & VN_BANKS
├── ShareModal.tsx             (12.9 KB) - Modal chia sẻ thiệp, copy link & QrModal
├── store.ts                   (3.1 KB)  - LocalStorage service (cards, inv, guests)
├── styles.css                 (146 KB)  - CSS chung của editor, modals, và các component
├── TemplateModal.tsx          (4.8 KB)  - Modal chi tiết mẫu thiệp (QR code & nút tạo thiệp)
├── templates.ts               (30.1 KB) - Danh mục 40+ mẫu thiệp cưới và metadata CDN
├── templateThemes.ts          (10.2 KB) - Bảng màu (hex, rgb, cover gradient) của 40+ mẫu thiệp
├── theme.ts                   (1.3 KB)  - Quản lý Dark/Light mode và event `app:theme`
├── TopNav.tsx                 (15.2 KB) - Header điều hướng chung + chứa useAuth() và LoginModal!
├── TutorialTour.tsx           (6.5 KB)  - Hướng dẫn tương tác onboarding trong editor
├── tw.css                     (21 B)    - @tailwind utilities;
├── ui.tsx                     (8.4 KB)  - Base UI components (Icon, Toggle, Section, Input, Modal...)
├── generated/
│   ├── headers.css            (1.1 KB)  - CSS animation cho các header mẫu thiệp sinh tự động
│   └── headers.tsx            (239 KB)  - 40+ component header sinh tự động từ script
└── pages/
    ├── Account.tsx            (5.5 KB)  - Trang thông tin tài khoản người dùng
    ├── Dashboard.tsx          (14.7 KB) - Trang "Thiệp Của Tôi", quản lý danh sách thiệp
    ├── Demo.tsx               (4.8 KB)  - Trang xem demo mẫu thiệp trực tiếp
    ├── Guests.tsx             (14.4 KB)  - Trang quản lý khách mời, danh sách & CSV
    ├── Home.tsx               (44.7 KB) - Trang chủ landing page giới thiệu sản phẩm
    ├── Pricing.tsx            (5.3 KB)  - Trang bảng giá dịch vụ
    └── Templates.tsx          (11.1 KB) - Trang danh mục duyệt mẫu thiệp
```

---

## 3. PHÂN TÍCH VẤN ĐỀ KIẾN TRÚC & PHÂN CÔNG TRÁCH NHIỆM (ARCHITECTURAL ISSUES)

### 3.1. Cấu trúc quá phẳng (Flat Root Directory Anti-pattern)
- `src/` chứa cùng lúc: file chạy app (`main.tsx`, `Root.tsx`), routing (`router.tsx`), UI nguyên tử (`ui.tsx`), tính năng Editor (`App.tsx`, `Header.tsx`, `Sections.tsx`, `HeroPhoto.tsx`), tính năng hiển thị thiệp (`Preview.tsx`, `LongPhungV2.tsx`, `MinimalismDarkRed.tsx`), mã sinh (`generated/`), dữ liệu & types (`data.ts`, `templates.ts`, `templateThemes.ts`), modals dùng chung (`ShareModal.tsx`, `TemplateModal.tsx`), và CSS toàn cục.
- Thiếu phân tách ranh giới rõ ràng (bounded context) giữa các module: **Core Shell**, **Editor Workspace**, **Invitation Presentation Engine**, **Shared Components**, **Storage Services**, và **Pages**.

### 3.2. Sai lệch trách nhiệm (Misplaced Responsibilities & High Coupling)
1. **`TopNav.tsx` kiêm nhiệm quản lý Authentication:**
   - Hook `useAuth()` và hằng số lưu trữ `AUTH_KEY` cùng `LoginModal` được định nghĩa trực tiếp bên trong `TopNav.tsx`.
   - `Dashboard.tsx` và `Guests.tsx` lại phải import `useAuth` và `LoginModal` từ `../TopNav`!
   - *Hậu quả:* Một component thanh điều hướng giao diện (UI navigation) lại trở thành Auth State Provider cho toàn ứng dụng.
2. **`HeroPhoto.tsx` kiêm nhiệm xuất bản modal cắt ảnh (`CropModal`):**
   - `CropModal` là một modal đa dụng (crop ảnh theo tỷ lệ aspect ratio, zoom, pan).
   - `Sections.tsx` import `CropModal` từ `./HeroPhoto` để crop ảnh trong Album và con dấu phong bì.
   - *Hậu quả:* Phụ thuộc chéo kỳ lạ giữa các phần form editor và component ảnh đầu trang.
3. **`data.ts` là một "túi chứa hỗn tạp" (Junk Drawer / Grab-bag):**
   - Chứa định nghĩa kiểu dữ liệu TypeScript (`Inv`, `GiftMethod`, `Ceremony`, `TimelineEvent`, `Wish`).
   - Chứa dữ liệu khởi tạo mặc định (`defaultInv`, `blankInv`).
   - Chứa các hàm tiện ích tên hiển thị (`groomShown`, `brideShown`).
   - Chứa cả các hàm tiện ích ngày tháng và xử lý lịch iCalendar: `WEEKDAYS_FULL`, `WEEKDAYS_SHORT`, `parseDate`, `monthGrid`, `formatTime`, `buildIcs`!
   - *Hậu quả:* Bất kỳ file nào chỉ cần định dạng ngày hoặc tạo file .ics cũng phải import từ `data.ts`.
4. **`App.tsx` đặt tên gây nhầm lẫn:**
   - Trong hệ sinh thái React, `App.tsx` thường là component gốc (Root/App Shell).
   - Tuy nhiên, trong dự án này, `Root.tsx` mới là component gốc điều hướng, còn `App.tsx` thực chất là trang **Editor Workspace** (`/edit/:cardId`).
5. **`Sections.tsx` là Monolithic Component (87KB, 1889 dòng code):**
   - Chứa 16 section forms độc lập (`Basic`, `Family`, `Announce`, `Ceremony`, `Album`, `Banquet`, `Rsvp`, `Dress`, `Schedule`, `Guestbook`, `GiftBox`, `Thanks`, `Music`, `Envelope`, `Share`) và mảng dữ liệu `VN_BANKS` (40+ ngân hàng).
   - Mặc dù đang hoạt động ổn định và có tính liên kết cao với `d` và `set`, việc nằm trơ trọi ở thư mục gốc khiến việc bảo trì khó khăn.

---

## 4. RỦI RO KIẾN TRÚC & PHỤ THUỘC BÊN NGOÀI (ARCHITECTURAL RISKS)

1. **Rủi ro cấu hình Tailwind CSS (`tailwind.config.js`):**
   - Trong `tailwind.config.js` hiện tại:
     ```js
     content: ["./src/Preview.tsx", "./src/LongPhungV2.tsx", "./src/MinimalismDarkRed.tsx", "./src/generated/*.tsx"]
     ```
   - **CẢNH BÁO NGUY HIỂM CAO:** Nếu các file này được chuyển vào thư mục con (ví dụ: `src/features/invitation/...`) mà không cập nhật `tailwind.config.js`, Tailwind sẽ không quét các file này và toàn bộ giao diện Preview sẽ bị vỡ style!
2. **Rủi ro đường dẫn sinh mã tự động (`scripts/gen_headers.py`):**
   - Trong `scripts/gen_headers.py` có đường dẫn tuyệt đối:
     ```python
     OUT = r"D:\MY PRO\applications\MainCoupleStory\web\src\generated"
     ```
   - Nếu di chuyển `src/generated/` mà không cập nhật script này, script sẽ ghi đè vào vị trí cũ hoặc báo lỗi.
3. **Rủi ro kiểm tra ảnh nội bộ (`scripts/check-assets.mjs`):**
   - Script này duyệt đệ quy `src/` và kiểm tra đường dẫn ảnh `/images/...`.
   - Việc di chuyển file sẽ an toàn với script này do thuật toán đệ quy `walk(dir)`, nhưng mọi đường dẫn chuỗi tĩnh (`/images/...`) trong mã phải được giữ nguyên vẹn 100%.
4. **Không có Path Alias (`@/`):**
   - Toàn bộ 34 file hiện đang dùng relative import (`./`, `../`). Khi di chuyển tệp theo độ sâu thư mục khác nhau, các import tương đối sẽ bị vỡ nếu không được tính toán chính xác.
5. **Monolithic Bundle Size (Cảnh báo Build):**
   - Bundle production sinh ra một file JS duy nhất nặng 682KB (`dist/assets/index-*.js`) do không dùng code-splitting/lazy loading cho các trang (`Home`, `Templates`, `Dashboard`, `Editor`, `Preview`).

---

## 5. THIẾT KẾ KIẾN TRÚC MỤC TIÊU (TARGET ARCHITECTURE)

Dựa trên quy mô và đặc thù của dự án (Vite + React 18 SPA, Single-page Canvas Editor + Invitation Renderer + Multi-page Marketing), cấu trúc đề xuất như sau:

```text
src/
├── app/                           # App Shell, Routing & Configuration
│   ├── Root.tsx                   # Site shell điều hướng & layout chung
│   ├── router.tsx                 # Router core (navigate, usePath, Link)
│   └── theme.ts                   # Quản lý giao diện Sáng / Tối
├── components/                    # Thành phần giao diện dùng chung đa module
│   ├── common/                    # Các modal & widget dùng chung
│   │   ├── CropModal.tsx          # Tách từ HeroPhoto (dùng chung cho Editor, Album, v.v.)
│   │   └── ShareModal.tsx         # Modal chia sẻ & QR code (dùng cho Editor và Dashboard)
│   ├── layout/                    # Layout dùng chung cho các trang
│   │   ├── TopNav.tsx             # Navbar chính
│   │   └── Logo.tsx               # Brand logo component
│   └── ui/                        # Thư viện UI primitives
│       └── ui.tsx                 # Base components (Icon, Button, Input, Modal, Section...)
├── features/                      # Các module nghiệp vụ độc lập (Feature-based)
│   ├── auth/                      # Quản lý Đăng nhập & Xác thực (tách từ TopNav)
│   │   ├── hooks/
│   │   │   └── useAuth.ts         # Quản lý auth state, token/flag
│   │   └── components/
│   │       └── LoginModal.tsx     # Modal đăng nhập OTP / Google / Apple
│   ├── editor/                    # Nghiệp vụ biên tập thiệp cưới
│   │   ├── EditorPage.tsx         # Component trang soạn thảo (trước là App.tsx)
│   │   ├── components/
│   │   │   ├── Header.tsx         # Header của editor
│   │   │   ├── HeroPhoto.tsx      # Section ảnh đầu trang
│   │   │   ├── MusicPicker.tsx    # Modal chọn nhạc nền
│   │   │   ├── PublishCheckModal.tsx # Modal kiểm tra trước xuất bản
│   │   │   ├── Sections.tsx       # 16 Section forms soạn thảo
│   │   │   └── TutorialTour.tsx   # Tour hướng dẫn người dùng
│   │   └── constants/
│   │       └── banks.ts           # Danh mục 40+ ngân hàng Việt Nam (tách từ Sections)
│   ├── invitation/                # Engine hiển thị thiệp cưới thực tế (Preview & Demo)
│   │   ├── components/
│   │   │   ├── Preview.tsx        # Renderer thiệp cưới chính
│   │   │   ├── LongPhungV2.tsx    # Cover/Header riêng mẫu Long Phụng V2
│   │   │   ├── MinimalismDarkRed.tsx # Cover riêng mẫu Minimalism Đỏ Đậm
│   │   │   └── generated/         # Headers sinh tự động
│   │   │       ├── headers.tsx
│   │   │       └── headers.css
│   │   └── config/
│   │       └── templateThemes.ts  # Bảng mã màu từng mẫu thiệp
│   └── templates/                 # Quản lý danh mục mẫu thiệp
│       ├── data/
│       │   └── templates.ts       # Danh sách 40+ mẫu thiệp, CDN & helper
│       └── components/
│           └── TemplateModal.tsx  # Modal xem chi tiết mẫu (dùng ở trang Templates)
├── pages/                         # Các trang định tuyến (Route Pages)
│   ├── Account.tsx
│   ├── Dashboard.tsx
│   ├── Demo.tsx
│   ├── Guests.tsx
│   ├── Home.tsx
│   ├── Pricing.tsx
│   └── Templates.tsx
├── services/                      # Tầng truy xuất dữ liệu & persistence
│   └── storage/
│       └── store.ts               # LocalStorage CRUD cho cards, invitations, guests
├── types/                         # Định nghĩa kiểu dữ liệu dùng chung (TypeScript Types)
│   ├── invitation.ts              # Kiểu Inv, GiftMethod, Ceremony, TimelineEvent, Wish
│   ├── card.ts                    # Kiểu Card
│   └── guest.ts                   # Kiểu Guest
├── utils/                         # Hàm tiện ích thuần túy (Pure Utilities)
│   ├── date.ts                    # parseDate, monthGrid, formatTime, buildIcs
│   └── format.ts                  # groomShown, brideShown
├── styles/                        # Toàn bộ CSS stylesheets
│   ├── styles.css
│   ├── pages.css
│   └── tw.css
└── main.tsx                       # App entry point
```

---

## 6. QUY TẮC PHÂN LOẠI FILE (DECISION RULES FOR FILE PLACEMENT)

1. **`app/`**: Chỉ chứa các tệp thiết lập khung sườn cấp cao nhất của ứng dụng: router cốt lõi, shell điều phối trang chung (`Root`), cấu hình theme toàn cục.
2. **`components/ui/`**: Chứa các component giao diện cơ bản nhất, không chứa bất kỳ logic nghiệp vụ thiệp cưới hay trạng thái người dùng (stateless / controlled primitives).
3. **`components/layout/`**: Chứa các thành phần khung nhìn xuất hiện xuyên suốt các trang (`TopNav`, `Footer`, `Logo`).
4. **`components/common/`**: Chứa các modal hoặc widget tái sử dụng ở 2 feature trở lên (ví dụ: `CropModal` dùng trong cả `HeroPhoto` và `Sections`; `ShareModal` dùng trong cả `Editor` và `Dashboard`).
5. **`features/<name>/`**: Chứa toàn bộ các thành phần (components, hooks, data, config) chỉ phục vụ riêng cho nghiệp vụ đó.
   - Nếu một component chỉ dùng trong Editor (như `MusicPicker`, `PublishCheckModal`, `TutorialTour`), bắt buộc đặt trong `features/editor/`.
   - Nếu chỉ dùng để render thiệp cưới (như `Preview`, `LongPhungV2`, `generated/`), đặt trong `features/invitation/`.
   - Logic đăng nhập `useAuth` và `LoginModal` thuộc `features/auth/`.
6. **`pages/`**: Chỉ chứa các file đại diện cho các route trang (`/`, `/dashboard`, `/guests`, `/vi/mau-thiep`, `/vi/bang-gia`, `/account`, v.v.).
7. **`services/`**: Chứa các lớp giao tiếp lưu trữ ngoài (LocalStorage, Cookie, hoặc API clients sau này).
8. **`types/`**: Chứa định nghĩa kiểu `type` và `interface` thuần túy, không chứa code thực thi lúc runtime.
9. **`utils/`**: Chứa các helper functions thuần túy (pure functions), không phụ thuộc vào React hooks hay JSX.
10. **`styles/`**: Tập trung toàn bộ stylesheets toàn cục của ứng dụng.
