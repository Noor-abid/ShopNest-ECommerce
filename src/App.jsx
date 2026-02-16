
// ============================================================
// COMPLETE E-COMMERCE FRONTEND - React + Tailwind CSS
// All pages, components, hooks, context in one file
// ============================================================

import { useState, useEffect, useContext, createContext, useCallback, useRef } from "react";

// ============================================================
// 1. DUMMY DATA - 15 Products
// ============================================================
const PRODUCTS = [
  { id: 1, name: "Air Max Velocity", price: 129.99, originalPrice: 179.99, category: "Sneakers", brand: "Nike", rating: 4.8, reviews: 2341, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop", badge: "Bestseller", description: "Lightweight, breathable running shoes designed for maximum comfort. Features Air cushioning for all-day support and a durable rubber outsole for excellent traction.", colors: ["#000000","#FFFFFF","#FF3B30"], sizes: [7,8,9,10,11,12], stock: 23 },
  { id: 2, name: "Urban Leather Jacket", price: 249.99, originalPrice: 349.99, category: "Jackets", brand: "Zara", rating: 4.6, reviews: 876, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop", badge: "New", description: "Premium full-grain leather jacket with asymmetric zipper and quilted lining. A timeless piece that only gets better with age.", colors: ["#1a1a1a","#8B4513","#2F4F4F"], sizes: ["XS","S","M","L","XL"], stock: 8 },
  { id: 3, name: "Wireless Pro Headphones", price: 89.99, originalPrice: 149.99, category: "Electronics", brand: "Sony", rating: 4.9, reviews: 5621, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop", badge: "Hot Deal", description: "Studio-quality sound with 30-hour battery life and active noise cancellation. Foldable design for easy portability.", colors: ["#1C1C1E","#E5E5EA","#FF9F0A"], sizes: ["One Size"], stock: 45 },
  { id: 4, name: "Minimalist Watch", price: 199.99, originalPrice: null, category: "Accessories", brand: "Daniel W.", rating: 4.7, reviews: 1203, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop", badge: null, description: "Swiss-made quartz movement in a slim 40mm case. Sapphire crystal glass and genuine leather strap.", colors: ["#C0C0C0","#FFD700","#1a1a1a"], sizes: ["One Size"], stock: 12 },
  { id: 5, name: "Yoga & Sport Leggings", price: 59.99, originalPrice: 89.99, category: "Activewear", brand: "Lululemon", rating: 4.8, reviews: 3890, image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=400&fit=crop", badge: "Popular", description: "Four-way stretch fabric that moves with you. High-waisted design with side pockets and moisture-wicking technology.", colors: ["#000000","#4B0082","#006400"], sizes: ["XS","S","M","L","XL","XXL"], stock: 67 },
  { id: 6, name: "Ceramic Coffee Mug Set", price: 34.99, originalPrice: 49.99, category: "Home", brand: "Anthropologie", rating: 4.5, reviews: 445, image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop", badge: null, description: "Set of 4 hand-thrown ceramic mugs in earthy tones. Microwave and dishwasher safe. 12oz capacity each.", colors: ["#D2691E","#808080","#2F4F4F"], sizes: ["Set of 4"], stock: 30 },
  { id: 7, name: "MacBook Pro Sleeve", price: 44.99, originalPrice: null, category: "Electronics", brand: "Nomad", rating: 4.4, reviews: 678, image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=400&fit=crop", badge: null, description: "Slim-fit neoprene sleeve with water-resistant exterior. Fits 13\" and 15\" MacBook Pro models with extra accessory pocket.", colors: ["#1a1a1a","#8B7355","#708090"], sizes: ['13"','15"','16"'], stock: 19 },
  { id: 8, name: "Linen Shirt Classic", price: 74.99, originalPrice: 99.99, category: "Shirts", brand: "H&M", rating: 4.3, reviews: 923, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop", badge: "Sale", description: "Premium European linen in a relaxed fit. Breathable and lightweight for warm weather. Features wooden buttons.", colors: ["#F5F5DC","#87CEEB","#FFA07A"], sizes: ["XS","S","M","L","XL","XXL"], stock: 42 },
  { id: 9, name: "Scented Candle Trio", price: 29.99, originalPrice: 39.99, category: "Home", brand: "Yankee", rating: 4.6, reviews: 2104, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop", badge: null, description: "Three premium soy-blend candles with 40-hour burn time each. Scents: Cedar & Sage, Vanilla Latte, Ocean Mist.", colors: ["#FFFFF0"], sizes: ["3-Pack"], stock: 55 },
  { id: 10, name: "Trail Running Shoes", price: 149.99, originalPrice: 199.99, category: "Sneakers", brand: "Salomon", rating: 4.9, reviews: 1567, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop", badge: "Top Rated", description: "Aggressive grip outsole for technical terrain. Protective toe cap and waterproof GORE-TEX lining.", colors: ["#FF6347","#1C1C1E","#2E8B57"], sizes: [7,8,9,10,11,12,13], stock: 16 },
  { id: 11, name: "Structured Tote Bag", price: 119.99, originalPrice: 159.99, category: "Accessories", brand: "Coach", rating: 4.7, reviews: 789, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop", badge: null, description: "Full-grain pebbled leather tote with interior zip pocket. Fits 13\" laptop. Adjustable shoulder strap included.", colors: ["#1a1a1a","#8B4513","#C0C0C0"], sizes: ["One Size"], stock: 11 },
  { id: 12, name: "Plant-Based Protein", price: 54.99, originalPrice: 69.99, category: "Health", brand: "Vega", rating: 4.5, reviews: 3342, image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=400&fit=crop", badge: "New Formula", description: "25g protein per serving, made from pea and brown rice. No artificial sweeteners. 30 servings per bag.", colors: ["#6B8E23"], sizes: ["2lb","5lb"], stock: 88 },
  { id: 13, name: "Boho Throw Blanket", price: 49.99, originalPrice: 64.99, category: "Home", brand: "Anthropologie", rating: 4.6, reviews: 556, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop", badge: null, description: "Soft 100% cotton woven blanket with fringe edges. 50\"x60\". Machine washable, pre-washed for extra softness.", colors: ["#F5DEB3","#B0C4DE","#DDA0DD"], sizes: ["50x60\""], stock: 34 },
  { id: 14, name: "Smart Water Bottle", price: 39.99, originalPrice: null, category: "Health", brand: "HydroFlask", rating: 4.8, reviews: 4102, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop", badge: "Eco", description: "32oz insulated stainless steel bottle. Keeps drinks cold 24hrs, hot 12hrs. BPA-free with flex cap.", colors: ["#00CED1","#FF69B4","#1C1C1E","#228B22"], sizes: ["24oz","32oz","40oz"], stock: 73 },
  { id: 15, name: "Vintage Denim Jacket", price: 89.99, originalPrice: 129.99, category: "Jackets", brand: "Levi's", rating: 4.7, reviews: 2204, image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=400&fit=crop", badge: "Vintage", description: "Classic 90s-inspired denim trucker jacket. 100% cotton, stone-washed for that authentic worn-in look.", colors: ["#4169E1","#1a1a1a","#B0C4DE"], sizes: ["XS","S","M","L","XL","XXL"], stock: 27 }
];

const CATEGORIES = ["All", "Sneakers", "Jackets", "Electronics", "Accessories", "Activewear", "Home", "Shirts", "Health"];

// ============================================================
// 2. CONTEXT API - Cart + Theme + Auth
// ============================================================
const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem("shopCart") || "[]"); } catch { return []; }
  });
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("shopUser") || "null"); } catch { return null; }
  });
  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem("wishlist") || "[]"); } catch { return []; }
  });

  useEffect(() => { localStorage.setItem("shopCart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("darkMode", darkMode); }, [darkMode]);
  useEffect(() => { localStorage.setItem("wishlist", JSON.stringify(wishlist)); }, [wishlist]);

  const addToCart = useCallback((product, qty = 1, size = null) => {
    setCart(prev => {
      const key = `${product.id}-${size}`;
      const existing = prev.find(i => i.key === key);
      if (existing) return prev.map(i => i.key === key ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...product, qty, size, key }];
    });
  }, []);

  const removeFromCart = useCallback((key) => setCart(prev => prev.filter(i => i.key !== key)), []);
  const updateQty = useCallback((key, qty) => {
    if (qty < 1) return removeFromCart(key);
    setCart(prev => prev.map(i => i.key === key ? { ...i, qty } : i));
  }, [removeFromCart]);

  const toggleWishlist = useCallback((id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  }, []);

  const login = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem("shopUser", JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("shopUser");
  }, []);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <AppContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, cartCount, cartTotal, darkMode, setDarkMode, user, login, logout, wishlist, toggleWishlist }}>
      {children}
    </AppContext.Provider>
  );
};

const useApp = () => useContext(AppContext);

// ============================================================
// 3. ROUTER (Hash-based SPA routing)
// ============================================================
const useRouter = () => {
  const [route, setRoute] = useState(() => window.location.hash || "#/");
  useEffect(() => {
    const handler = () => setRoute(window.location.hash || "#/");
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  const navigate = (path) => { window.location.hash = path; };
  return { route, navigate };
};

// ============================================================
// 4. UTILITY COMPONENTS
// ============================================================

// Star Rating
const StarRating = ({ rating, reviews, small }) => {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.floor(rating);
    const partial = !filled && i < rating;
    return { filled, partial };
  });
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {stars.map((s, i) => (
          <span key={i} className={small ? "text-sm" : "text-base"}>
            {s.filled ? "★" : s.partial ? "⯨" : "☆"}
          </span>
        ))}
      </div>
      <span className={`font-semibold text-amber-500 ${small ? "text-xs" : "text-sm"}`}>{rating}</span>
      {reviews && <span className={`text-gray-400 ${small ? "text-xs" : "text-sm"}`}>({reviews.toLocaleString()})</span>}
    </div>
  );
};

// Button Component
const Btn = ({ children, variant = "primary", size = "md", onClick, disabled, className = "", type = "button" }) => {
  const base = "font-semibold rounded-xl transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-pointer select-none";
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-5 py-2.5 text-sm", lg: "px-7 py-3.5 text-base" };
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 active:scale-95",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100",
    outline: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    ghost: "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300",
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${sizes[size]} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}>
      {children}
    </button>
  );
};

// Input Field Component
const InputField = ({ label, type = "text", placeholder, value, onChange, icon, error, required }) => {
  const { darkMode } = useApp();
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>}
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>}
        <input
          type={type} placeholder={placeholder} value={value} onChange={onChange} required={required}
          className={`w-full ${icon ? "pl-10" : "pl-4"} pr-4 py-2.5 rounded-xl border transition-all outline-none text-sm
            ${error ? "border-red-400 focus:ring-2 focus:ring-red-200" : "border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"}
            bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400`}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

// Loader Spinner
const Spinner = ({ size = "md" }) => {
  const sizes = { sm: "w-5 h-5", md: "w-8 h-8", lg: "w-12 h-12" };
  return (
    <div className={`${sizes[size]} border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin`} />
  );
};

// Badge
const Badge = ({ text, color = "indigo" }) => {
  const colors = {
    indigo: "bg-indigo-100 text-indigo-700", red: "bg-red-100 text-red-700",
    green: "bg-green-100 text-green-700", amber: "bg-amber-100 text-amber-700",
    purple: "bg-purple-100 text-purple-700",
  };
  return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${colors[color] || colors.indigo}`}>{text}</span>;
};

// Breadcrumb
const Breadcrumb = ({ items }) => {
  const { navigate } = useRouter();
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span className="text-gray-300">/</span>}
          {item.href
            ? <button onClick={() => navigate(item.href)} className="hover:text-indigo-600 transition-colors">{item.label}</button>
            : <span className="text-gray-800 dark:text-gray-200 font-medium">{item.label}</span>
          }
        </span>
      ))}
    </nav>
  );
};

// Toast Notification
const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  const styles = { success: "bg-green-500", error: "bg-red-500", info: "bg-indigo-500" };
  return (
    <div className={`fixed bottom-6 right-6 z-50 ${styles[type]} text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce`}>
      <span>{type === "success" ? "✓" : type === "error" ? "✗" : "ℹ"}</span>
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">✕</button>
    </div>
  );
};

// Modal
const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-md p-6 animate-fade-in" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 transition-colors">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Search Bar
const SearchBar = ({ value, onChange, placeholder = "Search products...", className = "" }) => (
  <div className={`relative ${className}`}>
    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
    <input
      type="text" value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition-all text-sm"
    />
    {value && (
      <button onClick={() => onChange("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">✕</button>
    )}
  </div>
);

// ============================================================
// 5. PRODUCT CARD COMPONENT
// ============================================================
const ProductCard = ({ product, onAddToCart, navigate }) => {
  const { wishlist, toggleWishlist } = useApp();
  const isWishlisted = wishlist.includes(product.id);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null;

  const badgeColor = {
    "Bestseller": "amber", "New": "green", "Hot Deal": "red", "Popular": "purple",
    "Sale": "red", "Top Rated": "indigo", "Eco": "green", "Vintage": "amber", "New Formula": "green"
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-700 aspect-square">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {/* Overlay buttons */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button onClick={() => navigate(`#/product/${product.id}`)}
            className="bg-white text-gray-800 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-600 hover:text-white transition-colors shadow-lg">
            Quick View
          </button>
        </div>
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.badge && <Badge text={product.badge} color={badgeColor[product.badge] || "indigo"} />}
          {discount && <Badge text={`-${discount}%`} color="red" />}
        </div>
        {/* Wishlist */}
        <button onClick={() => toggleWishlist(product.id)}
          className={`absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full shadow-md transition-all ${isWishlisted ? "bg-red-500 text-white" : "bg-white text-gray-400 hover:text-red-500"}`}>
          {isWishlisted ? "♥" : "♡"}
        </button>
        {/* Stock warning */}
        {product.stock < 15 && (
          <div className="absolute bottom-2 left-2 right-2 bg-amber-500 text-white text-xs text-center py-1 px-2 rounded-lg font-medium">
            Only {product.stock} left!
          </div>
        )}
      </div>
      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs text-indigo-500 font-semibold uppercase tracking-wide">{product.brand}</p>
            <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-tight mt-0.5 group-hover:text-indigo-600 transition-colors cursor-pointer"
              onClick={() => navigate(`#/product/${product.id}`)}>
              {product.name}
            </h3>
          </div>
        </div>
        <StarRating rating={product.rating} reviews={product.reviews} small />
        <div className="flex items-center gap-2 mt-auto">
          <span className="text-lg font-black text-gray-900 dark:text-white">${product.price}</span>
          {product.originalPrice && <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>}
        </div>
        <Btn onClick={() => onAddToCart(product)} size="sm" className="w-full mt-1">
          🛒 Add to Cart
        </Btn>
      </div>
    </div>
  );
};

// ============================================================
// 6. PRODUCT GRID
// ============================================================
const ProductGrid = ({ products, onAddToCart, navigate, loading }) => {
  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Spinner size="lg" />
    </div>
  );
  if (products.length === 0) return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <span className="text-6xl">🔍</span>
      <p className="text-gray-500 text-lg font-medium">No products found</p>
      <p className="text-gray-400 text-sm">Try different keywords or filters</p>
    </div>
  );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(p => <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} navigate={navigate} />)}
    </div>
  );
};

// ============================================================
// 7. CATEGORY FILTER
// ============================================================
const CategoryFilter = ({ selected, onSelect }) => (
  <div className="flex flex-wrap gap-2">
    {CATEGORIES.map(cat => (
      <button key={cat} onClick={() => onSelect(cat)}
        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${selected === cat
          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
          : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:border-indigo-300 hover:text-indigo-600"}`}>
        {cat}
      </button>
    ))}
  </div>
);

// ============================================================
// 8. CART ITEM COMPONENT
// ============================================================
const CartItem = ({ item, onRemove, onUpdateQty }) => (
  <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl flex-shrink-0" />
    <div className="flex-1 min-w-0">
      <p className="text-xs text-indigo-500 font-semibold">{item.brand}</p>
      <h4 className="font-bold text-gray-900 dark:text-white text-sm truncate">{item.name}</h4>
      {item.size && <p className="text-xs text-gray-500 mt-0.5">Size: {item.size}</p>}
      <p className="text-indigo-600 font-black mt-1">${(item.price * item.qty).toFixed(2)}</p>
    </div>
    <div className="flex flex-col items-end gap-3 flex-shrink-0">
      <button onClick={() => onRemove(item.key)} className="text-gray-400 hover:text-red-500 transition-colors text-sm">✕</button>
      <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-xl px-2 py-1">
        <button onClick={() => onUpdateQty(item.key, item.qty - 1)} className="w-6 h-6 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 font-bold transition-colors">−</button>
        <span className="w-6 text-center text-sm font-bold text-gray-800 dark:text-gray-100">{item.qty}</span>
        <button onClick={() => onUpdateQty(item.key, item.qty + 1)} className="w-6 h-6 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 font-bold transition-colors">+</button>
      </div>
    </div>
  </div>
);

// ============================================================
// 9. CART SUMMARY
// ============================================================
const CartSummary = ({ cartTotal, onCheckout }) => {
  const shipping = cartTotal > 75 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6 space-y-4">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Order Summary</h3>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-semibold text-gray-800 dark:text-gray-200">${cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Shipping</span>
          <span className={shipping === 0 ? "text-green-600 font-semibold" : "font-semibold text-gray-800 dark:text-gray-200"}>
            {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        {shipping === 0 && <p className="text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-lg">🎉 You qualify for free shipping!</p>}
        {shipping > 0 && <p className="text-xs text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5 rounded-lg">Add ${(75 - cartTotal).toFixed(2)} more for free shipping</p>}
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Tax (8%)</span>
          <span className="font-semibold text-gray-800 dark:text-gray-200">${tax.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
          <div className="flex justify-between">
            <span className="font-bold text-gray-900 dark:text-white text-lg">Total</span>
            <span className="font-black text-indigo-600 text-xl">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <Btn onClick={onCheckout} size="lg" className="w-full">
        Proceed to Checkout →
      </Btn>
      <div className="flex items-center justify-center gap-4 pt-2">
        {["💳", "🔒", "↩️"].map((icon, i) => (
          <div key={i} className="flex items-center gap-1 text-xs text-gray-400">
            <span>{icon}</span>
            <span>{["Secure Pay", "SSL", "30d Return"][i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// 10. NAVBAR COMPONENT
// ============================================================
const Navbar = ({ navigate, currentRoute }) => {
  const { cartCount, darkMode, setDarkMode, user, logout } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");

  const links = [
    { label: "Home", href: "#/" },
    { label: "Products", href: "#/products" },
    { label: "Deals", href: "#/products?sort=discount" },
  ];

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQ.trim()) {
      navigate(`#/products`);
      setSearchOpen(false);
    }
  };

  return (
    <nav className={`sticky top-0 z-40 ${darkMode ? "bg-gray-900 border-gray-700" : "bg-white/95 border-gray-100"} backdrop-blur-md border-b shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <button onClick={() => navigate("#/")} className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-200">S</div>
            <span className="font-black text-xl text-gray-900 dark:text-white hidden sm:block">ShopNest</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <button key={l.href} onClick={() => navigate(l.href)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${currentRoute.startsWith(l.href.split("?")[0]) && l.href !== "#/"
                  ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600"
                  : currentRoute === "#/" && l.href === "#/"
                    ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600"
                    : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 hover:bg-gray-50 dark:hover:bg-gray-700"}`}>
                {l.label}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            {searchOpen ? (
              <div className="relative">
                <input autoFocus type="text" value={searchQ} onChange={e => setSearchQ(e.target.value)} onKeyDown={handleSearch}
                  placeholder="Search..." className="w-48 sm:w-64 pl-4 pr-8 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-indigo-200" />
                <button onClick={() => setSearchOpen(false)} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">✕</button>
              </div>
            ) : (
              <button onClick={() => setSearchOpen(true)} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300 transition-colors text-lg">🔍</button>
            )}

            {/* Dark Mode */}
            <button onClick={() => setDarkMode(d => !d)} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300 transition-colors text-lg">
              {darkMode ? "☀️" : "🌙"}
            </button>

            {/* Cart */}
            <button onClick={() => navigate("#/cart")} className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300 transition-colors text-lg">
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 text-white text-xs font-bold rounded-full flex items-center justify-center">{cartCount}</span>
              )}
            </button>

            {/* User */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="w-7 h-7 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">{user.name[0]}</div>
                  <span className="hidden md:block text-sm font-semibold text-gray-800 dark:text-gray-100">{user.name.split(" ")[0]}</span>
                </button>
                <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-xl p-2 min-w-36 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl">Profile</button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl">Orders</button>
                  <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl">Logout</button>
                </div>
              </div>
            ) : (
              <Btn onClick={() => navigate("#/login")} size="sm">Login</Btn>
            )}

            {/* Mobile Menu */}
            <button onClick={() => setMenuOpen(m => !m)} className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300 transition-colors">
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-1">
            {links.map(l => (
              <button key={l.href} onClick={() => { navigate(l.href); setMenuOpen(false); }}
                className="text-left px-4 py-3 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-indigo-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                {l.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

// ============================================================
// 11. FOOTER COMPONENT
// ============================================================
const Footer = ({ navigate }) => (
  <footer className="bg-gray-900 text-white mt-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-black text-lg">S</div>
            <span className="font-black text-xl">ShopNest</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">Premium e-commerce experience. Quality products, fast delivery, and exceptional service.</p>
          <div className="flex gap-3 mt-5">
            {["📘","🐦","📸","▶️"].map((icon, i) => (
              <button key={i} className="w-9 h-9 bg-gray-800 hover:bg-indigo-600 rounded-xl flex items-center justify-center transition-colors">{icon}</button>
            ))}
          </div>
        </div>
        {[
          { title: "Shop", links: ["All Products", "New Arrivals", "Best Sellers", "Sale"] },
          { title: "Support", links: ["Help Center", "Track Order", "Returns", "Contact Us"] },
          { title: "Company", links: ["About Us", "Careers", "Press", "Partners"] },
        ].map(col => (
          <div key={col.title}>
            <h4 className="font-bold text-white mb-4">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map(l => (
                <li key={l}><button onClick={() => navigate("#/products")} className="text-gray-400 hover:text-white text-sm transition-colors">{l}</button></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-500 text-sm">© 2025 ShopNest. All rights reserved.</p>
        <div className="flex items-center gap-4 text-2xl">
          {["💳","🔐","🚚","↩️"].map((icon, i) => (
            <div key={i} className="flex items-center gap-1 text-xs text-gray-400">
              <span>{icon}</span>
              <span className="hidden sm:inline">{["Secure Pay","SSL Secure","Free Shipping","Easy Returns"][i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

// ============================================================
// 12. HERO SECTION
// ============================================================
const HeroSection = ({ navigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { tag: "Summer Collection 2025", title: "Find Your\nPerfect Style", sub: "Discover thousands of premium products with up to 50% off. Free shipping on orders over $75.", cta: "Shop Now", bg: "from-indigo-900 via-purple-900 to-slate-900", accent: "indigo", emoji: "👟" },
    { tag: "New Electronics", title: "Tech That\nChanges Life", sub: "Latest gadgets, headphones, and accessories. Best prices, guaranteed.", cta: "Explore Tech", bg: "from-slate-900 via-gray-900 to-zinc-900", accent: "cyan", emoji: "🎧" },
    { tag: "Home & Living", title: "Elevate Your\nLiving Space", sub: "Curated home decor, cozy essentials, and unique pieces for every room.", cta: "Discover Home", bg: "from-amber-900 via-orange-900 to-red-900", accent: "amber", emoji: "🕯️" },
  ];
  const slide = slides[currentSlide];

  useEffect(() => {
    const t = setInterval(() => setCurrentSlide(s => (s + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className={`relative bg-gradient-to-br ${slide.bg} rounded-3xl overflow-hidden min-h-[520px] flex items-center transition-all duration-700`}>
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl" />

      <div className="relative z-10 px-8 md:px-16 py-16 w-full">
        <div className="max-w-2xl">
          <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full mb-6 border border-white/20">
            🏷️ {slide.tag}
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight whitespace-pre-line mb-6">
            {slide.title}
          </h1>
          <p className="text-white/70 text-lg mb-8 max-w-lg leading-relaxed">{slide.sub}</p>
          <div className="flex flex-wrap gap-4">
            <Btn onClick={() => navigate("#/products")} size="lg" className="bg-white text-gray-900 hover:bg-gray-50 shadow-2xl !shadow-white/20">
              {slide.cta} →
            </Btn>
            <Btn onClick={() => navigate("#/products")} variant="outline" size="lg" className="!border-white/40 !text-white hover:!bg-white/10">
              Browse All
            </Btn>
          </div>
          <div className="flex gap-8 mt-12">
            {[["15K+","Products"],["98%","Satisfaction"],["Free","Shipping $75+"]].map(([num, label]) => (
              <div key={label}>
                <p className="text-2xl font-black text-white">{num}</p>
                <p className="text-white/50 text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Big emoji decoration */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-9xl opacity-20 hidden lg:block select-none">
          {slide.emoji}
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrentSlide(i)}
            className={`transition-all duration-300 rounded-full ${i === currentSlide ? "w-8 h-2 bg-white" : "w-2 h-2 bg-white/40"}`} />
        ))}
      </div>
    </div>
  );
};

// ============================================================
// 13. HOME PAGE
// ============================================================
const HomePage = ({ navigate, onAddToCart }) => {
  const { darkMode } = useApp();
  const [loading, setLoading] = useState(true);
  const featured = PRODUCTS.filter(p => p.badge).slice(0, 8);
  const trending = PRODUCTS.filter(p => p.rating >= 4.7).slice(0, 4);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const stats = [
    { icon: "🚚", label: "Free Shipping", desc: "On orders over $75" },
    { icon: "↩️", label: "Easy Returns", desc: "30-day return policy" },
    { icon: "🔒", label: "Secure Checkout", desc: "SSL encrypted payment" },
    { icon: "🎧", label: "24/7 Support", desc: "Always here to help" },
  ];

  return (
    <div className="space-y-16">
      <HeroSection navigate={navigate} />

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="flex items-center gap-3 p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <span className="text-3xl">{s.icon}</span>
            <div>
              <p className="font-bold text-gray-900 dark:text-white text-sm">{s.label}</p>
              <p className="text-gray-500 text-xs">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Products */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wide mb-1">Curated For You</p>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white">Featured Products</h2>
          </div>
          <Btn onClick={() => navigate("#/products")} variant="outline">View All →</Btn>
        </div>
        {loading ? (
          <div className="flex justify-center py-12"><Spinner size="lg" /></div>
        ) : (
          <ProductGrid products={featured} onAddToCart={onAddToCart} navigate={navigate} />
        )}
      </div>

      {/* Categories Grid */}
      <div>
        <div className="text-center mb-8">
          <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wide mb-1">Shop By</p>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white">Categories</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Sneakers", emoji: "👟", count: 45, color: "bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40" },
            { name: "Electronics", emoji: "🎧", count: 89, color: "bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/40" },
            { name: "Jackets", emoji: "🧥", count: 32, color: "bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/40" },
            { name: "Home", emoji: "🏡", count: 67, color: "bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40" },
          ].map(cat => (
            <button key={cat.name} onClick={() => navigate("#/products")}
              className={`${cat.color} p-6 rounded-2xl text-center transition-all duration-200 hover:scale-105 border border-transparent hover:border-gray-200 dark:hover:border-gray-600`}>
              <span className="text-5xl block mb-3">{cat.emoji}</span>
              <p className="font-bold text-gray-900 dark:text-white">{cat.name}</p>
              <p className="text-xs text-gray-500 mt-1">{cat.count}+ items</p>
            </button>
          ))}
        </div>
      </div>

      {/* Trending */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white">🔥 Trending Now</h2>
          <Btn onClick={() => navigate("#/products")} variant="outline">See More →</Btn>
        </div>
        <ProductGrid products={trending} onAddToCart={onAddToCart} navigate={navigate} />
      </div>

      {/* Newsletter Banner */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Get 20% Off Your First Order</h2>
        <p className="text-indigo-200 mb-8">Subscribe to our newsletter for exclusive deals, new arrivals, and style inspiration.</p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input type="email" placeholder="Enter your email"
            className="flex-1 px-5 py-3 rounded-xl border-2 border-transparent focus:border-white outline-none bg-white/20 text-white placeholder-indigo-200 backdrop-blur-sm" />
          <Btn className="!bg-white !text-indigo-600 hover:!bg-indigo-50 !shadow-none flex-shrink-0">Subscribe</Btn>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// 14. PRODUCTS PAGE
// ============================================================
const ProductsPage = ({ navigate, onAddToCart }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const filtered = PRODUCTS
    .filter(p => (category === "All" || p.category === category))
    .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()))
    .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "discount") {
        const discA = a.originalPrice ? (1 - a.price / a.originalPrice) : 0;
        const discB = b.originalPrice ? (1 - b.price / b.originalPrice) : 0;
        return discB - discA;
      }
      return 0;
    });

  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "#/" }, { label: "Products" }]} />

      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">All Products</h1>
          <p className="text-gray-500 text-sm mt-1">{filtered.length} products found</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <SearchBar value={search} onChange={setSearch} className="flex-1 md:w-72" />
          <button onClick={() => setShowFilters(f => !f)}
            className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm font-semibold hover:border-indigo-300 transition-colors flex items-center gap-2">
            ⚙️ Filters
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 mb-6 space-y-5">
          <div>
            <p className="font-bold text-gray-800 dark:text-gray-200 mb-3">Category</p>
            <CategoryFilter selected={category} onSelect={setCategory} />
          </div>
          <div>
            <p className="font-bold text-gray-800 dark:text-gray-200 mb-3">Sort By</p>
            <div className="flex flex-wrap gap-2">
              {[["default","Default"],["price-asc","Price: Low to High"],["price-desc","Price: High to Low"],["rating","Top Rated"],["discount","Biggest Discount"]].map(([val, label]) => (
                <button key={val} onClick={() => setSort(val)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${sort === val ? "bg-indigo-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="font-bold text-gray-800 dark:text-gray-200 mb-3">Price Range: $0 – ${priceRange[1]}</p>
            <input type="range" min={0} max={300} step={10} value={priceRange[1]}
              onChange={e => setPriceRange([0, Number(e.target.value)])}
              className="w-full accent-indigo-600" />
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>$0</span><span>$300</span></div>
          </div>
        </div>
      )}

      {/* Category Quick Filter (always visible) */}
      <div className="mb-6">
        <CategoryFilter selected={category} onSelect={setCategory} />
      </div>

      <ProductGrid products={filtered} onAddToCart={onAddToCart} navigate={navigate} loading={loading} />
    </div>
  );
};

// ============================================================
// 15. PRODUCT DETAIL PAGE
// ============================================================
const ProductDetailPage = ({ productId, navigate, onAddToCart }) => {
  const product = PRODUCTS.find(p => p.id === Number(productId));
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [imageZoom, setImageZoom] = useState(false);
  const { wishlist, toggleWishlist } = useApp();

  if (!product) return (
    <div className="text-center py-24">
      <span className="text-6xl">😕</span>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">Product not found</h2>
      <Btn onClick={() => navigate("#/products")} className="mt-6">← Back to Products</Btn>
    </div>
  );

  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null;
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "#/" }, { label: "Products", href: "#/products" }, { label: product.name }]} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Image */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-50 dark:bg-gray-800 rounded-3xl overflow-hidden cursor-zoom-in group" onClick={() => setImageZoom(true)}>
            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl text-sm font-semibold text-gray-700">🔍 Click to zoom</div>
            </div>
            {product.badge && <div className="absolute top-4 left-4"><Badge text={product.badge} color="indigo" /></div>}
          </div>
          {/* Thumbnail row (simulated) */}
          <div className="flex gap-3">
            {[1,2,3,4].map(i => (
              <div key={i} className={`w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-700 cursor-pointer border-2 transition-all ${i === 1 ? "border-indigo-500" : "border-transparent hover:border-gray-300"}`}>
                <img src={product.image} alt="" className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-indigo-500 font-semibold text-sm uppercase tracking-wide">{product.brand}</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-500 text-sm">{product.category}</span>
            </div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white leading-tight">{product.name}</h1>
          </div>

          <StarRating rating={product.rating} reviews={product.reviews} />

          <div className="flex items-center gap-4">
            <span className="text-4xl font-black text-gray-900 dark:text-white">${product.price}</span>
            {product.originalPrice && <>
              <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
              <Badge text={`Save ${discount}%`} color="red" />
            </>}
          </div>

          {/* Colors */}
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Color</p>
            <div className="flex gap-3">
              {product.colors.map((c, i) => (
                <button key={i} style={{ backgroundColor: c }} className={`w-9 h-9 rounded-full border-4 transition-all hover:scale-110 ${i === 0 ? "border-indigo-500 ring-2 ring-indigo-300" : "border-white dark:border-gray-700"}`} />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-gray-800 dark:text-gray-200">Size</p>
              <button className="text-indigo-600 text-sm hover:underline">Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(size => (
                <button key={size} onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-xl border-2 text-sm font-semibold transition-all ${selectedSize === size ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600" : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-gray-400"}`}>
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Qty & Add to Cart */}
          <div className="flex gap-4">
            <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-3">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 font-bold text-lg transition-colors">−</button>
              <span className="w-8 text-center font-bold text-gray-900 dark:text-white">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 font-bold text-lg transition-colors">+</button>
            </div>
            <Btn onClick={() => onAddToCart(product, qty, selectedSize)} size="lg" className="flex-1">
              🛒 Add to Cart
            </Btn>
            <button onClick={() => toggleWishlist(product.id)}
              className={`w-14 flex items-center justify-center rounded-xl border-2 transition-all text-xl ${wishlist.includes(product.id) ? "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-500" : "border-gray-200 dark:border-gray-600 text-gray-400 hover:border-red-300 hover:text-red-500"}`}>
              {wishlist.includes(product.id) ? "♥" : "♡"}
            </button>
          </div>

          {/* Stock */}
          <div className={`flex items-center gap-2 text-sm font-medium ${product.stock < 15 ? "text-amber-600" : "text-green-600"}`}>
            <span>{product.stock < 15 ? "⚠️" : "✓"}</span>
            <span>{product.stock < 15 ? `Only ${product.stock} left in stock!` : "In stock & ready to ship"}</span>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
            {[["🚚","Free Shipping","On orders $75+"],["🔄","Free Returns","30-day returns"],["🔒","Secure","SSL checkout"]].map(([icon,label,sub]) => (
              <div key={label} className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <span className="text-2xl">{icon}</span>
                <p className="text-xs font-bold text-gray-800 dark:text-gray-200 mt-1">{label}</p>
                <p className="text-xs text-gray-500">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-12">
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          {["description","reviews","shipping"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-semibold capitalize transition-colors border-b-2 -mb-px ${activeTab === tab ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>
              {tab === "reviews" ? `Reviews (${product.reviews.toLocaleString()})` : tab}
            </button>
          ))}
        </div>
        <div className="prose dark:prose-invert max-w-none">
          {activeTab === "description" && (
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed">
              <p className="text-lg">{product.description}</p>
              <ul className="mt-4 space-y-2">
                {["Premium quality materials","Ergonomic design for all-day comfort","Durable construction for long-lasting use","Available in multiple colorways","Comes with original packaging and accessories"].map((f, i) => (
                  <li key={i} className="flex items-center gap-2"><span className="text-green-500">✓</span> {f}</li>
                ))}
              </ul>
            </div>
          )}
          {activeTab === "reviews" && (
            <div className="space-y-4">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-6xl font-black text-gray-900 dark:text-white">{product.rating}</p>
                  <StarRating rating={product.rating} />
                  <p className="text-gray-500 text-sm mt-1">{product.reviews.toLocaleString()} reviews</p>
                </div>
                <div className="flex-1 space-y-2">
                  {[5,4,3,2,1].map(star => {
                    const pct = star === 5 ? 68 : star === 4 ? 20 : star === 3 ? 8 : star === 2 ? 3 : 1;
                    return (
                      <div key={star} className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 w-4">{star}★</span>
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-amber-400 h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs text-gray-500 w-8">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              {[{ name: "Sarah M.", rating: 5, text: "Absolutely love this product! Exceeded my expectations. Would definitely buy again.", date: "2 days ago" },
                { name: "Jake T.", rating: 4, text: "Great quality for the price. Shipping was fast. Minor sizing issue but overall satisfied.", date: "1 week ago" },
                { name: "Emma R.", rating: 5, text: "Perfect! Exactly as described. The build quality is outstanding.", date: "2 weeks ago" }].map(r => (
                <div key={r.name} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">{r.name[0]}</div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">{r.name}</p>
                        <StarRating rating={r.rating} small />
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{r.date}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{r.text}</p>
                </div>
              ))}
            </div>
          )}
          {activeTab === "shipping" && (
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              {[["🚚 Standard Shipping","3-5 business days • Free on orders $75+"],["⚡ Express Shipping","1-2 business days • $14.99"],["🌍 International","7-14 business days • From $24.99"],["↩️ Returns","Free returns within 30 days"]].map(([title,desc]) => (
                <div key={title} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                  <div>
                    <p className="font-bold text-gray-800 dark:text-gray-200">{title}</p>
                    <p className="text-sm mt-1">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">You May Also Like</h2>
          <ProductGrid products={related} onAddToCart={onAddToCart} navigate={navigate} />
        </div>
      )}

      {/* Image Zoom Modal */}
      <Modal isOpen={imageZoom} onClose={() => setImageZoom(false)} title={product.name}>
        <img src={product.image} alt={product.name} className="w-full rounded-2xl" />
      </Modal>
    </div>
  );
};

// ============================================================
// 16. CART PAGE
// ============================================================
const CartPage = ({ navigate }) => {
  const { cart, removeFromCart, updateQty, cartTotal } = useApp();
  const [checkoutDone, setCheckoutDone] = useState(false);

  if (checkoutDone) return (
    <div className="text-center py-24 space-y-4">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto text-5xl">✓</div>
      <h2 className="text-3xl font-black text-gray-900 dark:text-white">Order Placed! 🎉</h2>
      <p className="text-gray-500">Thank you for shopping with ShopNest. You'll receive a confirmation email shortly.</p>
      <div className="flex justify-center gap-4 mt-6">
        <Btn onClick={() => navigate("#/")}>Back to Home</Btn>
        <Btn onClick={() => navigate("#/products")} variant="outline">Continue Shopping</Btn>
      </div>
    </div>
  );

  if (cart.length === 0) return (
    <div className="text-center py-24 space-y-4">
      <span className="text-8xl">🛒</span>
      <h2 className="text-3xl font-black text-gray-900 dark:text-white">Your cart is empty</h2>
      <p className="text-gray-500">Looks like you haven't added anything yet.</p>
      <Btn onClick={() => navigate("#/products")} size="lg" className="mt-4">Start Shopping →</Btn>
    </div>
  );

  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "#/" }, { label: "Cart" }]} />
      <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-8">Shopping Cart ({cart.reduce((s,i) => s + i.qty, 0)} items)</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <CartItem key={item.key} item={item} onRemove={removeFromCart} onUpdateQty={updateQty} />
          ))}
          <div className="flex justify-between items-center pt-4">
            <Btn onClick={() => navigate("#/products")} variant="ghost">← Continue Shopping</Btn>
          </div>
        </div>
        <div>
          <CartSummary cartTotal={cartTotal} onCheckout={() => setCheckoutDone(true)} />
        </div>
      </div>
    </div>
  );
};

// ============================================================
// 17. LOGIN / SIGNUP PAGE
// ============================================================
const AuthPage = ({ navigate }) => {
  const { login } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!isLogin && !form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email address";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Min 6 characters";
    if (!isLogin && form.password !== form.confirm) e.confirm = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      login({ name: form.name || form.email.split("@")[0], email: form.email });
      navigate("#/");
      setLoading(false);
    }, 1200);
  };

  const set = (key, val) => { setForm(f => ({ ...f, [key]: val })); setErrors(e => ({ ...e, [key]: "" })); };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-black text-3xl mx-auto shadow-lg shadow-indigo-200 mb-4">S</div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">{isLogin ? "Welcome back!" : "Create account"}</h1>
            <p className="text-gray-500 text-sm mt-1">{isLogin ? "Sign in to your account" : "Join ShopNest today"}</p>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[["Google","🔵"],["Apple","⚫"]].map(([provider, icon]) => (
              <button key={provider} onClick={handleSubmit}
                className="flex items-center justify-center gap-2 p-3 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-semibold text-gray-700 dark:text-gray-200">
                <span>{icon}</span> Continue with {provider}
              </button>
            ))}
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-gray-600" /></div>
            <div className="relative text-center"><span className="bg-white dark:bg-gray-800 px-3 text-xs text-gray-400">or continue with email</span></div>
          </div>

          <div className="space-y-4">
            {!isLogin && <InputField label="Full Name" placeholder="John Doe" value={form.name} onChange={e => set("name", e.target.value)} error={errors.name} required icon="👤" />}
            <InputField label="Email Address" type="email" placeholder="you@example.com" value={form.email} onChange={e => set("email", e.target.value)} error={errors.email} required icon="✉️" />
            <InputField label="Password" type="password" placeholder="••••••••" value={form.password} onChange={e => set("password", e.target.value)} error={errors.password} required icon="🔒" />
            {!isLogin && <InputField label="Confirm Password" type="password" placeholder="••••••••" value={form.confirm} onChange={e => set("confirm", e.target.value)} error={errors.confirm} required icon="🔒" />}
          </div>

          {isLogin && (
            <div className="flex justify-end mt-2">
              <button className="text-sm text-indigo-600 hover:underline">Forgot password?</button>
            </div>
          )}

          <Btn onClick={handleSubmit} disabled={loading} size="lg" className="w-full mt-6">
            {loading ? <Spinner size="sm" /> : isLogin ? "Sign In" : "Create Account"}
          </Btn>

          <p className="text-center text-sm text-gray-500 mt-6">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => { setIsLogin(l => !l); setErrors({}); }} className="text-indigo-600 font-semibold hover:underline">
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// 18. MAIN APP
// ============================================================
const AppInner = () => {
  const { route, navigate } = useRouter();
  const { cart, addToCart, darkMode } = useApp();
  const [toast, setToast] = useState(null);

  const handleAddToCart = (product, qty = 1, size = null) => {
    addToCart(product, qty, size);
    setToast({ message: `${product.name} added to cart!`, type: "success" });
  };

  // Parse route
  const productMatch = route.match(/#\/product\/(\d+)/);
  const productId = productMatch ? productMatch[1] : null;

  const renderPage = () => {
    if (productId) return <ProductDetailPage productId={productId} navigate={navigate} onAddToCart={handleAddToCart} />;
    if (route === "#/products" || route.startsWith("#/products")) return <ProductsPage navigate={navigate} onAddToCart={handleAddToCart} />;
    if (route === "#/cart") return <CartPage navigate={navigate} />;
    if (route === "#/login") return <AuthPage navigate={navigate} />;
    return <HomePage navigate={navigate} onAddToCart={handleAddToCart} />;
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Navbar navigate={navigate} currentRoute={route} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderPage()}
        </main>
        <Footer navigate={navigate} />
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    </div>
  );
};

// ============================================================
// 19. ROOT EXPORT
// ============================================================
export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}
