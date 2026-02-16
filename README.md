# 🛍️ ShopNest - E-Commerce Frontend

A responsive, full-featured E-Commerce frontend built with **React.js** and **Tailwind CSS**.

---

## 🚀 Project Setup Instructions

### Prerequisites
- Node.js v18+ installed
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Noor-abid/ShopNest-ECommerce

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Vite + React Setup (Recommended)

```bash
npm create vite@latest shopnest -- --template react
cd shopnest
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

## ✅ Features Implemented

### Pages (5 Pages)
| Page | Route | Description |
|------|-------|-------------|
| 🏠 Home | `#/` | Hero slider, featured products, categories, trending |
| 📦 Products | `#/products` | All products with filtering, sorting, search |
| 🔍 Product Detail | `#/product/:id` | Full product info, tabs, reviews, related |
| 🛒 Cart | `#/cart` | Cart items, quantity control, order summary |
| 🔐 Login/Signup | `#/login` | Form validation, social login buttons |

### Components (18+ Components)
- ✅ **Navbar** - Sticky, mobile responsive with search, dark mode, user menu
- ✅ **Footer** - Multi-column layout with links and trust badges
- ✅ **Hero Section** - Auto-rotating slider with 3 slides
- ✅ **Product Card** - Image, badge, wishlist, quick view, add to cart
- ✅ **Product Grid** - Responsive 1–4 column grid
- ✅ **Category Filter** - Active state pill buttons
- ✅ **Search Bar** - Live search with clear button
- ✅ **Cart Item** - Quantity controls, remove, price calculation
- ✅ **Cart Summary** - Subtotal, shipping, tax, total with promo logic
- ✅ **Button Component** - 5 variants (primary, secondary, outline, danger, ghost), 3 sizes
- ✅ **Input Field** - With icon, label, error state
- ✅ **Modal / Popup** - Image zoom, backdrop blur
- ✅ **Rating Component** - Star display with review count
- ✅ **Loader / Spinner** - 3 sizes, used during fake loading states
- ✅ **Breadcrumb** - Navigable breadcrumb trail
- ✅ **Toast Notification** - Auto-dismiss, 3 types
- ✅ **Badge** - Color-coded labels (New, Sale, Hot, etc.)

### Functional Features
- ✅ **React Router** - Hash-based SPA routing (no library needed)
- ✅ **15 Products** - Dummy JSON data with full details
- ✅ **Add to Cart** - With size/qty selection
- ✅ **Remove from Cart** - Per-item removal
- ✅ **Update Quantity** - Increment/decrement per cart item
- ✅ **Search Products** - By name and brand
- ✅ **Filter by Category** - Live filter with "All" option
- ✅ **Responsive Design** - Mobile, tablet, desktop
- ✅ **Wishlist** - Toggle heart on product cards

### Bonus Features
- ✅ **Dark Mode** - Toggle in navbar, persisted to localStorage
- ✅ **Product Sorting** - Price low/high, top rated, biggest discount
- ✅ **Context API** - Global state for cart, user, wishlist, theme
- ✅ **Local Storage** - Cart, wishlist, and dark mode preference persisted
- ✅ **Animations** - Hover effects, slide transitions, spinner, toast bounce
- ✅ **Price Range Filter** - Slider-based price filter
- ✅ **Form Validation** - Auth form with error messages

---

## 📁 Folder Structure

```
shopnest/
├── public/
│   └── favicon.ico
├── src/
│   ├── App.jsx              # All components in one file (monorepo style)
│   ├── main.jsx             # React entry point
│   └── index.css            # Tailwind directives
├── index.html
├── tailwind.config.js
├── vite.config.js
├── package.json
└── README.md
```

### Recommended Modular Structure (for real projects)
```
src/
├── components/
│   ├── ui/          # Button, Input, Badge, Spinner, Modal, Toast, Breadcrumb
│   ├── layout/      # Navbar, Footer
│   ├── product/     # ProductCard, ProductGrid, StarRating
│   └── cart/        # CartItem, CartSummary
├── pages/
│   ├── HomePage.jsx
│   ├── ProductsPage.jsx
│   ├── ProductDetailPage.jsx
│   ├── CartPage.jsx
│   └── AuthPage.jsx
├── context/
│   └── AppContext.jsx
├── data/
│   └── products.js
├── hooks/
│   └── useRouter.js
└── App.jsx
```

---

## 🛠️ Technical Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI library with Hooks |
| Tailwind CSS | Utility-first styling |
| Context API | Global state management |
| localStorage | Client-side persistence |
| Hash Router | SPA navigation |

### React Hooks Used
- `useState` — local state in every component
- `useEffect` — loading simulations, side effects, event listeners
- `useContext` — consuming AppContext throughout the app
- `useCallback` — memoized cart functions
- `useRef` — DOM references

---

## 📱 Responsive Breakpoints (Tailwind)
- `sm` — 640px+ (phones landscape)
- `md` — 768px+ (tablets)
- `lg` — 1024px+ (laptops)
- `xl` — 1280px+ (desktops)

---

## 📸 Pages Overview

- **Home** — Hero slider + stats + featured products + categories + trending + newsletter CTA
- **Products** — Full catalog with search, category filter, sort, price range slider
- **Product Detail** — Images, color/size pickers, qty selector, tabs (description/reviews/shipping), related products
- **Cart** — Item list, quantity controls, order summary with shipping logic
- **Auth** — Toggle login/signup, social buttons, field validation

---

## 📸 Screenshots

### Home Page
![Home Page](public/screenshots/home.png)

### Products Page
![Products Page](public/screenshots/products.png)

### Product Detail Page
![Product Detail](public/screenshots/product-detail.png)

### Cart Page
![Cart Page](public/screenshots/cart.png)

### Login Page
![Login Page](public/screenshots/login.png)
Built using React + Tailwind CSS
