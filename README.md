# Basking Bakery — Production Web Platform & Admin Dashboard

[![Node.js CI](https://github.com/Yashkumarx61/baskin-bakery/actions/workflows/ci.yml/badge.svg)](https://github.com/Yashkumarx61/baskin-bakery/actions/workflows/ci.yml)
[![Deploy to AWS](https://github.com/Yashkumarx61/baskin-bakery/actions/workflows/deploy.yml/badge.svg)](https://github.com/Yashkumarx61/baskin-bakery/actions/workflows/deploy.yml)

A high-performance, responsive single-page web application and containerized cloud deployment pipeline for **Basking Bakery**, located at **Shop No - 06, Amrapali Zodiac Market, Sector 120, Noida**. Built using React 18, Vite, Tailwind CSS, Docker, Nginx, and GitHub Actions.

---

## 📍 Store Information & Operating Hours

- **Store Address:** Shop No - 06, Amrapali Zodiac Market, Sector 120, Noida, Uttar Pradesh 201301
- **Store Timings:** 11:00 AM – 11:00 PM (Daily)
- **Primary Contact:** +91 93112 67246
- **Direct Orders:** Integrated WhatsApp Click-to-Chat Direct Dispatch (`wa.me`)

---

## 🛠️ Tech Stack & Architecture Overview

```
[ Customer & Admin Frontend: React 18 + Vite + Tailwind CSS ]
            │
            ├── State Management: React Context API (Cart & Admin Auth State)
            ├── Customer Reviews: Authentic Customer Testimonials Section
            ├── Data Persistence: LocalStorage + Google Sheets Webhook API Sync
            └── Order Dispatch: Direct WhatsApp Business API (wa.me)
            │
[ Container Layer: Multi-Stage Docker + Nginx Alpine ]
            │
[ CI/CD Pipelines: GitHub Actions (CI Build Verification + S3/CloudFront Deployment) ]
            │
[ Hosting: AWS / Docker Container Service (ECS / S3 / CloudFront) ]
```

### Stack Highlights:
* **Frontend Framework:** React 18 with Vite build system.
* **Styling & Design System:** Tailwind CSS with custom bakery theme design tokens:
  * Warm Cream background: `#FAF7F2`
  * Deep Espresso text/accents: `#2B1810`
  * Baked Amber buttons/highlights: `#C87D55`
* **Icons & Micro-Interactions:** Lucide React icons with touch-optimized target bounds.
* **Containerization:** Multi-stage `Dockerfile` (`node:20-alpine` build stage + `nginx:alpine` runtime stage) with health check endpoints (`/health`) and Gzip compression.
* **Orchestration:** `docker-compose.yml` pre-configured for instant local development and container testing.

---

## ✨ Key Features & Capabilities

### 1. Interactive Bakery Menu & Order Management
* **Dynamic Menu Grid:** Filter by categories (*Cakes, Pastries, Breads & Sourdough, Cookies, Beverages, Savories*).
* **Live Search & Price Badging:** Instant client-side search with out-of-stock indicators.
* **Custom Cake Studio:** 5-step custom cake builder allowing customers to choose flavour, weight (0.5kg – 5kg+), styling (Photo print, 3D fondant), custom message inscriptions, and delivery slots.
* **Cart Drawer & Checkout:** Slide-over cart drawer with item quantity modifiers, price calculations, and direct WhatsApp payload pre-formatting.

### 2. Authentic Customer Reviews / Testimonials Section
* High-credibility customer reviews featuring realistic verified purchaser badges, 5-star ratings, timestamps, and authentic customer feedback highlighting signature items (Belgian Chocolate Truffle Cake, Red Velvet, Sourdough Bread).

### 3. Admin & Staff Inventory Dashboard (`/admin`)
* **Secure Staff Login:** Authenticated admin portal backed by React Context session state with input hygiene (starts empty by default, no plain-text auto-fill banners).
* **Complete Product Lifecycle Management:**
  * **+ Add New Product:** Slide-over modal allowing staff to add new items with name, category, price, weight/portion size, image URL, description, and custom badges.
  * **Real-time Availability Toggle:** Turn items ON/OFF (Available/Out of Stock) with instant customer catalog sync.
  * **Permanent Item Deletion:** Delete items safely with a secondary confirmation modal.
  * **Dual Adaptive Layout:** Renders a comprehensive data table on desktop screens (`≥768px`) and automatically transforms into stacked interactive touch cards on mobile screens (`<768px`).

### 4. OWASP Security Hardening
* Client-side session state validation and strict authorization checks.
* Input sanitization and protection against script injection.
* Security headers (`X-Content-Type-Options: nosniff`, `Referrer-Policy`, and CSP viewport protection) configured in `index.html`.

### 5. 6-Pillar Responsive Design & Accessibility Overhaul
1. **Viewport & Safe-Area Architecture:** Enforced `viewport-fit=cover` in `index.html` and dynamic viewport units (`min-h-dvh` / `min-h-svh`) with safe-area bottom insets (`pb-safe`) for iPhone X+ notched displays.
2. **Zero Side-Scroll Bug:** Configured `overflow-x: hidden` and max-width boundaries on layout wrappers to eliminate horizontal overflow across 320px–4K screens.
3. **Touch Ergonomics (WCAG 2.5.5):** Minimum 44×44px interactive touch targets across all buttons and 16px minimum font size on mobile inputs to prevent iOS Safari auto-zoom.
4. **Fluid Breakpoints:** Mobile-first catalog grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`).
5. **Cross-Platform Media:** `object-cover` image wrappers and lazy loading to prevent Cumulative Layout Shift (CLS).
6. **Cross-Browser Compatibility:** Tested and verified on iOS Safari, Android Chrome/Samsung Internet, macOS Safari/Chrome, and Windows Edge/Chrome/Firefox.

---

## 🚀 Getting Started

### 1. Prerequisites
* **Node.js:** v18.x or v20.x
* **npm:** v9.x or higher
* **Docker & Docker Compose** (Optional, for containerized running)

### 2. Local Environment Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/Yashkumarx61/baskin-bakery.git
cd baskin-bakery
npm install
```

Create a `.env` file in the project root:

```env
VITE_WHATSAPP_NUMBER=919311267246
VITE_ADMIN_USER=AdminBakery
VITE_ADMIN_PASS=B@kery061111
VITE_SHEET_API_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Start the Vite development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🐳 Running with Docker & Docker Compose

### Option A: Using Docker Compose (Recommended)

Run the application locally inside a containerized Nginx web server:

```bash
docker compose up --build
```

Access the application at [http://localhost:8080](http://localhost:8080).
Health check available at [http://localhost:8080/health](http://localhost:8080/health).

### Option B: Using Docker CLI Directly

Build the Docker image:

```bash
docker build -t basking-bakery-web:latest .
```

Run the container:

```bash
docker run -d -p 8080:80 --name basking-bakery basking-bakery-web:latest
```

---

## 🔄 CI/CD Automation Workflows

### 1. Build & Test CI (`.github/workflows/ci.yml`)
Triggers on `push` and `pull_request` to `master` and `main` branches:
* Sets up Node.js v20 environment.
* Installs dependencies and verifies production build (`npm run build`).
* Runs Docker container build check using Docker Buildx to ensure image compiles cleanly.

### 2. Deployment Pipeline (`.github/workflows/deploy.yml`)
Triggers on commit push to `master`:
* Builds production static bundle with environment variables.
* Synchronizes compiled static assets to AWS S3 bucket with cache control headers.
* Invalidates AWS CloudFront cache distribution for instant live deployment updates.

---

## 📁 Project Directory Structure

```
basking-bakery/
├── .github/
│   └── workflows/
│       ├── ci.yml               # GitHub Actions CI build & Docker validation
│       └── deploy.yml           # GitHub Actions CD AWS deployment pipeline
├── public/                      # Static assets & brand logos
├── src/
│   ├── components/
│   │   ├── AboutSection.jsx     # Brand story & store location details
│   │   ├── AdminDashboard.jsx   # Staff inventory dashboard (Add/Edit/Delete/Toggle)
│   │   ├── CartDrawer.jsx       # Slide-over cart drawer & WhatsApp order trigger
│   │   ├── CustomCakeSection.jsx# 5-step custom cake builder studio
│   │   ├── FAQSection.jsx       # Frequently asked questions & delivery policies
│   │   ├── FloatingWhatsAppButton.jsx # Floating safe-area WhatsApp CTA button
│   │   ├── Footer.jsx           # Store footer with updated address & timings
│   │   ├── HeroSection.jsx      # Hero section banner & CTA buttons
│   │   ├── ImageWithFallback.jsx# Lazy-loading image component with image fallback
│   │   ├── MenuSection.jsx      # Interactive catalog grid with category filters
│   │   ├── MobileStickyBar.jsx  # Safe-area sticky bottom bar for mobile devices
│   │   ├── Navbar.jsx           # Accessible navigation bar with mobile drawer
│   │   ├── OrderSuccessModal.jsx# Order dispatch confirmation modal
│   │   ├── PincodeModal.jsx     # Delivery eligibility pincode checker
│   │   ├── ProductCard.jsx      # Product card with touch target controls
│   │   ├── ProductDetailModal.jsx # Detailed product modal dialog
│   │   └── TestimonialsSection.jsx # Authentic customer reviews & ratings
│   ├── App.jsx                  # Main application router & modal controller
│   ├── CartContext.jsx          # React Context for cart & menu state sync
│   ├── data.js                  # Initial product catalog & store configuration
│   ├── index.css                # Safe-area, touch targets, & responsive typography CSS
│   ├── main.jsx                 # Application root entry point
│   └── utils.js                 # Helper utilities & currency formatters
├── .dockerignore                # Docker ignore patterns
├── .env.example                 # Example environment variables template
├── docker-compose.yml           # Docker Compose local orchestration
├── Dockerfile                   # Multi-stage production Docker build
├── index.html                   # HTML entry point with meta viewport-fit=cover
├── nginx.conf                   # Nginx reverse proxy configuration & health checks
├── package.json                 # Project dependencies & scripts
├── README.md                    # Project documentation & onboarding guide
└── vite.config.js               # Vite build configuration
```

---

## 📝 License & Maintainers

Maintained by **Basking Bakery Dev Team**. All rights reserved.
