# Team Onboarding & Project Specification: Basking Bakery Web Platform

Production-ready, responsive single-page web application and containerized cloud deployment pipeline for Basking Bakery, located at Amrapali Zodiac Market, Sector 120, Noida.

## 1. Project Mission & Core Problem Solved

Basking Bakery is an artisan bakery located in Amrapali Zodiac Market, Sector 120, Noida. The business aims to eliminate high food aggregator commissions (Zomato/Swiggy charging 20% to 30%) by driving direct customer orders through their dedicated web platform.

To prevent user drop-off, the website operates with zero cold-start delays (avoiding hobby server sleep states). The web app delivers sub-second page loads 24/7.

## 2. Technology Stack & System Architecture

```
[ Frontend: React 18 + Vite + Tailwind CSS ]
            │
            ├── Data CMS: Google Sheets via Apps Script Webhook (Live Menu & Order Logs)
            ├── Order Dispatch: Direct WhatsApp Business Click-to-Chat API (wa.me)
            │
[ Container: Multi-stage Docker + Nginx Alpine ]
            │
[ CI/CD: GitHub Actions (Triggered on git push main / master) ]
            │
[ Cloud: AWS ap-south-1 (Route 53 ---> ALB ---> ECS Fargate Tasks) ]
```

### A. Frontend Layer
- Framework: React 18 with Vite build tooling.
- Styling: Tailwind CSS & Vanilla CSS design system using warm cream (`#FAF7F2`), dark espresso (`#2B1810`), and baked amber accents (`#C87D55`).
- Icons: Lucide React for cart, clock, review badges, and status indicators.

### B. Backend & CMS Layer (Google Sheets)
- Google Sheets API / Google Apps Script: Acts as the live database and content management system.
- Store management: Item availability, cake descriptions, and pricing are updated directly in a Google Sheet.
- Dynamic Retrieval: The React frontend queries the Google Apps Script webhook URL via GET requests to retrieve live menu items with zero build rebuilds required.
- Order Logging: Custom cake quote requests append a new row into an `Orders_Log` sheet via an asynchronous POST request.

### C. Containerization
- Docker Multi-stage Build:
  - Stage 1 (`node:20-alpine`): Compiles JSX, TypeScript, and Tailwind CSS into minified HTML/JS/CSS assets (`/dist`).
  - Stage 2 (`nginx:alpine`): High-performance static web server serving production assets with gzip compression, client-side route fallbacks (`try_files $uri /index.html`), and asset caching headers.

### D. Cloud Infrastructure (AWS Region: ap-south-1 Mumbai)
- AWS ECS + AWS Fargate: Runs Docker containers 24/7 without managing EC2 virtual machines, ensuring zero sleep or spin-down delays.
- Amazon ECR (Elastic Container Registry): Private Docker container registry storing compiled images.
- AWS Application Load Balancer (ALB): Routes web traffic, performs automated health checks (`/health`), and terminates SSL/TLS certificates.
- AWS Certificate Manager (ACM): Auto-renewing SSL certificate providing HTTPS encryption.
- Amazon Route 53: Links custom domain (`baskingbakery.com`) directly to the Load Balancer using an Alias A record.

### E. CI/CD Workflow (GitHub Actions)
- Local Development: Developers work locally on `localhost:5173`.
- Automated Deployment: Pushing to `master` or `main` triggers GitHub Actions to:
  1. Validate code build with Node 18 and 20 matrices.
  2. Authenticate to AWS via OpenID Connect (OIDC).
  3. Build the production Docker image with build arguments.
  4. Push the image to Amazon ECR.
  5. Trigger an ECS Fargate rolling deployment to gracefully swap container tasks with zero downtime.

## 3. Order & Customer Journey Flow

1. Browsing: Customer opens the site. The catalog loads instantly from edge cache, with real-time pricing synced from the Google Sheet.
2. Custom Cake Studio:
   - Step 1: Flavour Selection (Belgian Dark Truffle, Red Velvet, etc.)
   - Step 2: Weight Selection (0.5 kg to 5.0+ kg)
   - Step 3: Cake Style (Regular, Edible Photo Print, or 3D Fondant)
   - Step 4: Cake Inscription & Delivery Slot (Morning, Evening, Midnight Surprise)
   - Step 5: Live visual preview updates instantly on screen.
3. Checkout / Dispatch:
   - Clicking "Request Custom Quote" logs the payload into the Google Sheet and launches WhatsApp with all details pre-formatted into the chat.
   - The bakery owner accepts payment via UPI and confirms delivery slot directly in the chat.

## 4. Environment Variables & GitHub Secrets

### Local Environment (`.env`)
```env
VITE_WHATSAPP_NUMBER=919311267246
VITE_SHEET_API_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

### GitHub Repository Secrets (for CI/CD)
- `AWS_ROLE_ARN`: IAM role ARN with permissions to push to ECR and deploy to ECS.
- `AWS_ACCOUNT_ID`: 12-digit AWS account number.
- `ECR_REPOSITORY`: Name of the ECR repository (`basking-bakery-web`).
- `ECS_CLUSTER`: Name of the ECS Fargate cluster (`basking-bakery-cluster`).
- `ECS_SERVICE`: Name of the active ECS service (`basking-bakery-service`).
- `VITE_WHATSAPP_NUMBER`: Active business phone number (`919311267246`).
- `VITE_SHEET_API_URL`: Google Apps Script deployment URL.

## 5. Local Setup & Docker Commands

### Run Locally with Node.js
```bash
npm install
npm run dev
```

### Build Docker Container Locally
```bash
docker build -t basking-bakery-web:latest .
docker run -p 8080:80 basking-bakery-web:latest
```
Access at `http://localhost:8080`.

## 6. Project Structure

```
basking-bakery/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── public/
├── src/
│   ├── components/
│   │   ├── AboutSection.jsx
│   │   ├── CartDrawer.jsx
│   │   ├── CustomCakeSection.jsx
│   │   ├── FAQSection.jsx
│   │   ├── HeroSection.jsx
│   │   ├── MenuSection.jsx
│   │   ├── MobileStickyBar.jsx
│   │   ├── Navbar.jsx
│   │   ├── OrderSuccessModal.jsx
│   │   ├── PincodeModal.jsx
│   │   └── ProductDetailModal.jsx
│   ├── App.jsx
│   ├── CartContext.jsx
│   ├── data.js
│   ├── index.css
│   ├── main.jsx
│   └── utils.js
├── .dockerignore
├── .env.example
├── Dockerfile
├── nginx.conf
├── package.json
├── README.md
├── task-definition.json
└── vite.config.js
```

## 7. Timeline & Deployment Milestones

- Target Delivery Date: October 1, 2026.
- Milestone 1: Dynamic Google Sheet catalog sync & working WhatsApp integration.
- Milestone 2: Dockerfile containerization and local container verification.
- Milestone 3: AWS ECS/ALB setup and GitHub Actions deployment pipeline verification.
- Milestone 4: Custom domain mapping on Route 53 and final client sign-off.
