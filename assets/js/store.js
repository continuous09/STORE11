/**
 * Store Data Layer - Single source of truth for products, orders, content, design.
 * Used by both the storefront and admin dashboard. Changes here reflect live on the site.
 */
(function () {
  const KEYS = {
    PRODUCTS: 'storeProducts',
    ORDERS: 'storeOrders',
    CONTENT: 'storeContent',
    DESIGN: 'storeDesign',
    ADMIN: 'storeAdmin',
    SIZES: 'storeSizes',
    FLOATING_CONTACT: 'storeFloatingContact',
    ORDERS_API_URL: 'storeOrdersApiUrl'
  };

  const DEFAULT_SIZES = ['S', 'M', 'L', 'XL'];

  const DEFAULT_PRODUCTS = [
    {
      id: 'classic-fit',
      name: 'Black Tee / Classic Fit',
      nameAr: 'تيشيرت أسود / كلاسيك',
      regularPrice: 200,
      discountPrice: 116,
      description: 'The original Black T-Shirt. Everyday fit with a clean neckline and soft-touch cotton.',
      descriptionAr: 'التيشيرت الأسود الأصلي. قصة يومية ورقبة نظيفة وقماش ناعم.',
      images: ['https://images.pexels.com/photos/7671167/pexels-photo-7671167.jpeg?auto=compress&cs=tinysrgb&w=800'],
      colors: [{ name: 'Deep Black', hex: '#000000' }],
      sizes: ['S', 'M', 'L', 'XL'],
      inventory: { 'Deep Black|S': 10, 'Deep Black|M': 15, 'Deep Black|L': 12, 'Deep Black|XL': 8 },
      visible: true,
      meta: ['100% cotton']
    },
    {
      id: 'oversized',
      name: 'Black Tee / Oversized',
      nameAr: 'تيشيرت أسود / أوفرسايز',
      regularPrice: 200,
      discountPrice: null,
      description: 'A relaxed, street-ready cut with dropped shoulders. Perfect for a bolder look.',
      descriptionAr: 'قصة مريحة مع أكتاف منخفضة. مثالي للمظهر الجريء.',
      images: ['https://images.pexels.com/photos/7671168/pexels-photo-7671168.jpeg?auto=compress&cs=tinysrgb&w=800'],
      colors: [{ name: 'Deep Black', hex: '#000000' }],
      sizes: ['S', 'M', 'L', 'XL'],
      inventory: { 'Deep Black|S': 5, 'Deep Black|M': 8, 'Deep Black|L': 6, 'Deep Black|XL': 4 },
      visible: true,
      meta: ['Soft, mid-weight cotton · Unisex fit']
    },
    {
      id: 'slim-fit',
      name: 'Black Tee / Slim',
      nameAr: 'تيشيرت أسود / سليم',
      regularPrice: 200,
      discountPrice: null,
      description: 'A sharper, slimmer silhouette that sits close to the body for a more tailored look.',
      descriptionAr: 'قصة أنحف تلتصق بالجسم لمظهر أكثر أناقة.',
      images: ['https://images.pexels.com/photos/7671165/pexels-photo-7671165.jpeg?auto=compress&cs=tinysrgb&w=800'],
      colors: [{ name: 'Deep Black', hex: '#000000' }],
      sizes: ['S', 'M', 'L'],
      inventory: { 'Deep Black|S': 7, 'Deep Black|M': 9, 'Deep Black|L': 5 },
      visible: true,
      meta: ['Soft, breathable fabric · Curved hem']
    }
  ];

  const DEFAULT_CONTENT = {
    home: {
      heroEyebrow: 'Ouarzazate . Morocco',
      heroTitle: 'Pure Black. Pure Street.',
      heroSubtitle: 'Black T-Shirt is a modern Moroccan streetwear brand built around one iconic piece: the perfect black tee. Minimal, premium and designed to live on the streets of Morocco.',
      heroCtaPrice: '200 MAD',
      heroMeta1: 'Nationwide delivery across Morocco',
      heroMeta2: '100% cotton · Everyday essential',
      feature1Title: 'Designed for the streets',
      feature1Text: 'Inspired by the energy of Moroccan youth, our tees are made to move with you — from Ouarzazate to Casablanca.',
      feature2Title: 'Premium build, minimal look',
      feature2Text: 'Clean lines, no noise. Just a sharp black tee that upgrades any outfit, any day.',
      feature3Title: 'Nationwide delivery',
      feature3Text: 'Order from anywhere in Morocco. We ship straight to your door, fast and reliably.',
      stripPill: 'Drop 001',
      stripTitle: 'The only tee you need.',
      stripText: 'One color. One cut. Endless outfits. Wear it with jeans, cargos, or layered under a jacket — Black T-Shirt just works.',
      stripPrice: '200 MAD',
      testimonial1: { text: '"The fit is perfect and the black doesn\'t fade after washing. It became my go-to T-shirt."', name: 'Yassine', location: 'Marrakech' },
      testimonial2: { text: '"Simple, clean and feels premium. I wear it to class and at night with friends."', name: 'Imane', location: 'Casablanca' },
      testimonial3: { text: '"Delivery to Rabat was fast and the packaging was on point. I ordered a second one immediately."', name: 'Omar', location: 'Rabat' }
    },
    banners: [
      { url: 'https://images.pexels.com/photos/7671166/pexels-photo-7671166.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Hero banner' }
    ],
    about: {
      eyebrow: 'About',
      title: 'Built in Ouarzazate. Worn everywhere.',
      subtitle: 'Black T-Shirt is a Moroccan streetwear brand focused on one essential piece: the perfect black tee.',
      storyTitle: 'Our story',
      storyP1: 'Black T-Shirt was born in Ouarzazate, Morocco — a city known for its film sets, light and energy. We wanted to create something just as iconic: a simple, powerful black T-shirt that fits perfectly into modern Moroccan life.',
      storyP2: 'Instead of chasing every trend, we focus on one product and make it right. Clean lines, premium fabric and a fit that works on the streets, in class, at work or on a night out.',
      valuesTitle: 'What we stand for',
      values: [
        { title: 'Minimalism', text: 'One essential piece that works with everything you own.' },
        { title: 'Quality', text: 'Comfortable fabric, sharp color and a fit tested on real people.' },
        { title: 'Accessibility', text: 'Premium feel without the heavy price tag. Every tee is 200 MAD.' },
        { title: 'Moroccan street culture', text: 'Designed with the rhythm of our streets, campuses and cafés in mind.' }
      ],
      location: 'Ouarzazate, Morocco',
      businessType: 'Clothing brand focused on premium black T-shirts.',
      priceInfo: 'Flat price of 200 MAD per item.',
      deliveryInfo: 'Nationwide delivery across Morocco.',
      mapLat: 30.9198,
      mapLng: -6.8926,
      mapZoom: 14
    },
    contact: {
      eyebrow: 'Contact',
      title: "Let's make your next favorite tee.",
      subtitle: 'Reach out to order, ask about sizing, or talk collaborations.',
      talkTitle: 'Talk to us directly',
      talkText: 'For the fastest response, send us a WhatsApp message with your name, size, city and how many T-shirts you want.',
      phone: '+212 679 460 301',
      email: 'black12tshirt@gmail.com',
      location: 'Ouarzazate, Morocco',
      businessType: 'Clothing / T-shirts',
      priceInfo: '200 MAD per item · Nationwide delivery',
      whatsappMessage: 'Hi Black T-Shirt, I want to order a T-shirt.'
    }
  };

  const DEFAULT_DESIGN = {
    accentColor: '#f5c96a',
    logoText: 'Black T-Shirt',
    defaultLang: 'en',
    sections: {
      hero: true,
      features: true,
      strip: true,
      testimonials: true,
      infoStrip: true
    },
    productCard: {
      discountBadgeBg: '#e53935',
      discountBadgeColor: '#ffffff',
      priceNewColor: '#f5c96a',
      priceOldColor: '#888888',
      cardBg: 'rgba(10, 10, 10, 0.96)',
      cardBorder: 'rgba(255, 255, 255, 0.06)',
      fontFamily: 'Poppins, system-ui, sans-serif',
      gridColumnsDesktop: 4,
      gridColumnsMobile: 2
    },
    productCategories: ['All', 'T-Shirts', 'Hoodies', 'Accessories'],
    productOrder: [] // product ids in display order; empty = use default order
  };

  const DEFAULT_FLOATING_CONTACT = {
    enabled: true,
    buttonType: 'whatsapp', // 'phone' | 'whatsapp' | 'telegram'
    phoneNumber: '+212679460301',
    position: 'right', // 'right' | 'left'
    defaultMessage: "Hi Black T-Shirt, I'd like to order a T-shirt."
  };

  function get(key, defaultValue) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : (defaultValue !== undefined ? defaultValue : null);
    } catch (e) {
      return defaultValue !== undefined ? defaultValue : null;
    }
  }

  function set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  }

  function ensureDefaults() {
    if (!localStorage.getItem(KEYS.PRODUCTS)) set(KEYS.PRODUCTS, DEFAULT_PRODUCTS);
    if (!localStorage.getItem(KEYS.ORDERS)) set(KEYS.ORDERS, []);
    if (!localStorage.getItem(KEYS.CONTENT)) set(KEYS.CONTENT, DEFAULT_CONTENT);
    if (!localStorage.getItem(KEYS.DESIGN)) set(KEYS.DESIGN, DEFAULT_DESIGN);
    if (!localStorage.getItem(KEYS.ADMIN)) {
      set(KEYS.ADMIN, {
        passwordHash: btoa('admin123'),
        whatsapp: '212679460301'
      });
    }
    if (!localStorage.getItem(KEYS.SIZES)) set(KEYS.SIZES, DEFAULT_SIZES);
    if (!localStorage.getItem(KEYS.FLOATING_CONTACT)) set(KEYS.FLOATING_CONTACT, DEFAULT_FLOATING_CONTACT);
  }

  /** Base path for GitHub Pages (e.g. /tist/ or /). Used to fetch data/store-data.json. */
  function getStoreDataUrl(cacheBust) {
    const pathParts = (typeof location !== 'undefined' && location.pathname) ? location.pathname.replace(/\/$/, '').split('/').filter(Boolean) : [];
    const first = pathParts[0];
    // Use root when first segment looks like a file (e.g. order.html, index.html) so mobile/root deployments get /data/store-data.json
    const looksLikeFile = first && (first.indexOf('.') !== -1);
    const useRoot = !first || first === 'admin' || first === 'assets' || first === 'data' || looksLikeFile;
    const basePath = useRoot ? '/' : '/' + first + '/';
    const base = (typeof location !== 'undefined' ? location.origin : '') + basePath + 'data/store-data.json';
    if (cacheBust) return base + '?t=' + (typeof Date.now === 'function' ? Date.now() : 0);
    return base;
  }

  /** Merge remote orders with local by id: remote wins; local-only orders are kept so we don't lose just-placed orders. */
  function mergeOrders(remoteOrders, localOrders) {
    if (!Array.isArray(remoteOrders)) return Array.isArray(localOrders) ? localOrders : [];
    if (!Array.isArray(localOrders)) return remoteOrders;
    const byId = {};
    remoteOrders.forEach(function (o) { if (o && o.id) byId[o.id] = o; });
    localOrders.forEach(function (o) {
      if (o && o.id && !byId[o.id]) byId[o.id] = o;
    });
    return Object.values(byId).sort(function (a, b) {
      var da = (a.date && new Date(a.date).getTime()) || 0;
      var db = (b.date && new Date(b.date).getTime()) || 0;
      return db - da;
    });
  }

  /** Apply remote store data (from GitHub Pages JSON) into localStorage. Does not overwrite ADMIN. Orders are merged so we don't wipe local orders with remote []. */
  function applyRemoteData(data) {
    if (!data || typeof data !== 'object') return;
    if (Array.isArray(data.products)) set(KEYS.PRODUCTS, data.products);
    if (Array.isArray(data.orders) || data.hasOwnProperty('orders')) {
      var remote = Array.isArray(data.orders) ? data.orders : [];
      var local = get(KEYS.ORDERS, []);
      set(KEYS.ORDERS, mergeOrders(remote, local));
    }
    if (data.content && typeof data.content === 'object') set(KEYS.CONTENT, data.content);
    if (data.design && typeof data.design === 'object') set(KEYS.DESIGN, data.design);
    if (Array.isArray(data.sizes)) set(KEYS.SIZES, data.sizes);
    if (data.floatingContact && typeof data.floatingContact === 'object') set(KEYS.FLOATING_CONTACT, data.floatingContact);
    if (typeof data.ordersApiUrl === 'string' && data.ordersApiUrl.trim() !== '') set(KEYS.ORDERS_API_URL, data.ordersApiUrl.trim());
  }

  ensureDefaults();

  /** Fetch remote store data, apply to localStorage, and dispatch store-synced. Used for initial load and periodic sync so all devices see new products. */
  function refreshFromRemote() {
    const url = getStoreDataUrl(true);
    return fetch(url, { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        if (data) applyRemoteData(data);
        if (typeof window !== 'undefined' && window.dispatchEvent) {
          window.dispatchEvent(new CustomEvent('store-synced', { detail: data }));
        }
        return data;
      })
      .catch(function () { return null; });
  }

  /** Promise that resolves when remote store data has been attempted (success or fail). Use so all devices see the same data. */
  const readyPromise = refreshFromRemote();

  /** Interval in ms for periodic sync so open tabs and other devices see new products without refresh. */
  const SYNC_INTERVAL_MS = 45000;
  if (typeof window !== 'undefined' && window.setInterval) {
    window.setInterval(refreshFromRemote, SYNC_INTERVAL_MS);
  }

  /** When admin syncs to GitHub, other open tabs get this and refresh immediately. */
  try {
    if (typeof window !== 'undefined' && window.BroadcastChannel) {
      var syncChannel = new window.BroadcastChannel('store-sync');
      syncChannel.onmessage = function () { refreshFromRemote(); };
    }
  } catch (e) { /* ignore */ }

  window.Store = {
    ready: readyPromise,
    refreshFromRemote: refreshFromRemote,
    getStoreDataUrl: getStoreDataUrl,
    applyRemoteData: applyRemoteData,
    /** Returns payload to sync to GitHub (products, orders, content, design, sizes, floatingContact, ordersApiUrl). Does not include admin. */
    getPayloadForSync: function () {
      return {
        products: get(KEYS.PRODUCTS, []),
        orders: get(KEYS.ORDERS, []),
        content: get(KEYS.CONTENT, DEFAULT_CONTENT),
        design: get(KEYS.DESIGN, DEFAULT_DESIGN),
        sizes: get(KEYS.SIZES, DEFAULT_SIZES),
        floatingContact: get(KEYS.FLOATING_CONTACT, DEFAULT_FLOATING_CONTACT),
        ordersApiUrl: (get(KEYS.ORDERS_API_URL, '') || '').trim() || undefined
      };
    },
    getOrdersApiUrl: function () {
      var url = (get(KEYS.ORDERS_API_URL, '') || '').trim();
      return url || null;
    },
    setOrdersApiUrl: function (url) {
      set(KEYS.ORDERS_API_URL, (url && url.trim()) ? url.trim() : '');
    },
    KEYS,
    getProducts: () => get(KEYS.PRODUCTS, []),
    setProducts: (arr) => set(KEYS.PRODUCTS, arr),
    getOrders: () => get(KEYS.ORDERS, []),
    setOrders: (arr) => set(KEYS.ORDERS, arr),
    addOrder: (order) => {
      const orders = get(KEYS.ORDERS, []);
      order.id = 'ord-' + Date.now();
      order.status = 'pending';
      orders.unshift(order);
      set(KEYS.ORDERS, orders);
      return order.id;
    },
    getContent: () => get(KEYS.CONTENT, DEFAULT_CONTENT),
    setContent: (data) => set(KEYS.CONTENT, data),
    getDesign: () => get(KEYS.DESIGN, DEFAULT_DESIGN),
    setDesign: (data) => set(KEYS.DESIGN, data),
    getAdmin: () => get(KEYS.ADMIN, null),
    setAdmin: (data) => set(KEYS.ADMIN, data),
    getFloatingContact: () => get(KEYS.FLOATING_CONTACT, DEFAULT_FLOATING_CONTACT),
    setFloatingContact: (data) => set(KEYS.FLOATING_CONTACT, data),
    getSizes: () => get(KEYS.SIZES, DEFAULT_SIZES),
    setSizes: (arr) => set(KEYS.SIZES, Array.isArray(arr) ? arr : DEFAULT_SIZES),
    getVisibleProducts: (category) => {
      const products = Store.getProducts().filter(p => p.visible);
      const design = get(KEYS.DESIGN, DEFAULT_DESIGN);
      const order = (design && design.productOrder && design.productOrder.length) ? design.productOrder : null;
      let list = order
        ? order.map(id => products.find(p => p.id === id)).filter(Boolean)
        : products.slice();
      const rest = products.filter(p => !list.includes(p));
      list = list.concat(rest);
      if (category && category !== 'All') {
        list = list.filter(p => (p.category || '') === category);
      }
      return list;
    },
    getProductById: (id) => Store.getProducts().find(p => p.id === id),
    getOrderById: (id) => Store.getOrders().find(o => o.id === id),
    getTotalStock: (product) => {
      if (!product || !product.inventory) return 0;
      return Object.values(product.inventory).reduce((a, b) => a + b, 0);
    },
    getLowStockThreshold: () => 5
  };
})();
