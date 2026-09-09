# Basking Bakery - Direct-to-Consumer Web Application

Production-ready, responsive single-page web application for Basking Bakery, located at Amrapali Zodiac, Sector 120, Noida. Built with React, Vite, Tailwind CSS, and Lucide React icons.

## Overview

Basking Bakery offers fresh cakes, pastries, daily savouries, and custom event cakes for residents of Sector 120, Amrapali Zodiac, Supertech Capetown, Sector 119, and Sector 122 in Noida.

This web platform provides a zero-aggregator-commission direct ordering system powered by automated WhatsApp message routing.

## Store Information

- Store Name: Basking Bakery
- Address: Shop No. 12, Amrapali Zodiac Market, Sector 120, Noida, UP - 201301
- Operating Hours: 8:00 AM to 10:00 PM (Everyday)
- Contact / WhatsApp Number: +91 93112 67246
- Primary Service Area: Sector 120, Sector 119, Sector 122, Amrapali Zodiac, Supertech Capetown

## Key Features

1. Direct WhatsApp Ordering Engine
   - Calculates item totals, add-ons, slot fees, and promo discounts.
   - Formats complete order details into a single structured WhatsApp payload.
   - Direct link integration for mobile app and web browser compatibility.

2. Custom Cake Configurator
   - Interactive selection for cake weight (0.5 kg to 3 kg), flavour, egg/eggless preferences.
   - Custom message on cake and reference photo upload options.

3. Interactive Menu & Filtering
   - Category filtering across Cakes, Pastries, Savouries, Desserts, and Breads.
   - Detailed product view modals with ingredients, allergens, and shelf-life metadata.

4. Serviceability & Delivery Slot Manager
   - Instant pincode validation for local society areas.
   - Standard, Express, and Midnight delivery slot selection with dynamic fee calculation.

5. Direct Social & Review Connections
   - Clickable Google Rating card linking directly to Google Business Profile customer reviews.
   - Direct Instagram and WhatsApp action buttons in the top announcement bar, hero section, and footer.

## Tech Stack

- Frontend Framework: React 18 (with Vite build tooling)
- Styling: Tailwind CSS & Vanilla CSS Design Tokens
- Icons: Lucide React
- State Management: React Context API (CartContext)

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm (v9 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Yashkumarx61/baskin-bakery.git
   ```

2. Navigate into the project directory:
   ```bash
   cd baskin-bakery
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
baskin-bakery/
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
├── index.html
├── package.json
├── README.md
├── tailwind.config.js
└── vite.config.js
```

## License

MIT License. Developed for Basking Bakery, Noida.
