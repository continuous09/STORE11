/**
 * Admin Dashboard - Modern UI, RTL/LTR, stats, orders table, customers
 */
(function () {
  const ADMIN_SESSION = 'adminSessionToken';
  const LANG_KEY = 'adminLang';

  const i18n = {
    ar: {
      appTitle: 'لوحة التحكم', navDashboard: 'الرئيسية', navProducts: 'المنتجات', navInventory: 'المخزون', navOrders: 'الطلبات', navCustomers: 'العملاء', navContent: 'المحتوى', navDesign: 'التصميم',
      loginTitle: 'لوحة تحكم المتجر', loginSubtitle: 'تسجيل الدخول لإدارة متجرك', password: 'كلمة المرور', passwordPlaceholder: 'أدخل كلمة المرور', loginBtn: 'دخول', loginHint: 'الافتراضي: admin123',
      previewSite: 'معاينة الموقع', logout: 'تسجيل الخروج',
      totalSales: 'إجمالي المبيعات (درهم)', totalOrders: 'إجمالي الطلبات', shippedOrders: 'طلبات مشحونة', confirmedOrders: 'طلبات مؤكدة', pendingOrders: 'طلبات قيد الانتظار',
      ordersSearchPlaceholder: 'بحث برقم الطلب، الاسم، الهاتف...', filterAll: 'كل الحالات', statusPending: 'قيد الانتظار', statusConfirmed: 'مؤكد', statusShipped: 'تم الشحن', statusDelivered: 'تم التوصيل', statusCancelled: 'ملغي',
      exportCsv: 'تصدير CSV', bulkDelete: 'حذف المحدد', orderId: 'رقم الطلب', date: 'التاريخ', customer: 'العميل', phone: 'الهاتف', city: 'المدينة', products: 'المنتجات', total: 'المجموع', status: 'الحالة', actions: 'إجراءات',
      view: 'عرض', edit: 'تعديل', delete: 'حذف', save: 'حفظ', orderDetails: 'تفاصيل الطلب', customerDetails: 'تفاصيل العميل',
      noOrders: 'لا توجد طلبات حتى الآن.', noCustomers: 'لا يوجد عملاء مسجلون بعد.',
      orderHistory: 'سجل الطلبات', contactInfo: 'معلومات الاتصال',
      navSizes: 'المقاسات', sizesTitle: 'إدارة المقاسات', sizesAdd: 'إضافة مقاس', sizesNewPlaceholder: 'مثال: XXL',
      sizesIntro: 'أضف أو عدّل المقاسات المتاحة ثم عيّنها للمنتجات أدناه.',
      sizesGlobalList: 'قائمة المقاسات', sizesAssignProducts: 'تعيين المقاسات للمنتجات', sizesAssignHint: 'اختر المقاسات المتاحة لكل منتج ثم اضغط حفظ.', sizesSaveAssign: 'حفظ تعيين المقاسات',
      sizesEdit: 'تعديل', sizesRemove: 'حذف', sizesNoProducts: 'لا توجد منتجات.',
      mapSectionTitle: 'خريطة Google (صفحة من نحن)', mapSectionHint: 'الصق رابط خرائط Google ثم اضغط "استخراج الموقع" لملء الإحداثيات، أو أدخل خط العرض/الطول والتكبير يدوياً.',
      mapLinkPlaceholder: 'رابط مشاركة خرائط Google (اختياري)', mapParseLink: 'استخراج الموقع', mapLat: 'خط العرض', mapLng: 'خط الطول', mapZoom: 'مستوى التكبير (1–21)', mapDataRequired: 'أدخل خط العرض والطول والتكبير الصحيحين (أو استخرج من الرابط).', invalidMapData: 'إحداثيات أو تكبير غير صالح.',
      navFloatingContact: 'زر الاتصال العائم',
      floatingContactTitle: 'زر الاتصال العائم', floatingContactEnabled: 'تفعيل الزر', floatingContactType: 'نوع الزر',
      floatingContactTypePhone: 'مكالمة هاتفية', floatingContactTypeWhatsApp: 'واتساب', floatingContactTypeTelegram: 'تيليجرام',
      floatingContactPhone: 'رقم الهاتف (مع رمز الدولة)', floatingContactPhonePlaceholder: 'مثال: +212679460301',
      floatingContactPosition: 'موقع الزر', floatingContactPositionRight: 'يمين', floatingContactPositionLeft: 'يسار',
      floatingContactMessage: 'الرسالة الافتراضية (واتساب/تيليجرام)',
      navSync: 'مزامنة GitHub',
      syncTitle: 'مزامنة مع GitHub Pages',
      syncHint: 'احفظ التغييرات على الخادم حتى تظهر على جميع الأجهزة (كمبيوتر وجوال). أدخل رمز GitHub (Personal Access Token) مع صلاحية repo.',
      syncToken: 'رمز GitHub (Token)',
      syncTokenPlaceholder: 'ghp_xxxx...',
      syncOwner: 'مالك المستودع (Owner)',
      syncOwnerPlaceholder: 'username',
      syncRepo: 'اسم المستودع (Repo)',
      syncRepoPlaceholder: 'tist',
      syncBranch: 'الفرع',
      syncBranchPlaceholder: 'main',
      syncSaveConfig: 'حفظ الإعدادات',
      syncNow: 'مزامنة الآن',
      syncSuccess: 'تم الحفظ والمزامنة مع GitHub — التحديثات تظهر على جميع الأجهزة',
      syncFail: 'فشلت المزامنة مع GitHub',
      syncNotConfigured: 'تم الحفظ محلياً. إعداد مزامنة GitHub لظهور التحديثات على جميع الأجهزة.',
      syncOrdersApiUrl: 'رابط واجهة الطلبات (Orders API)',
      syncOrdersApiPlaceholder: 'https://your-app.vercel.app/api/orders'
    },
    en: {
      appTitle: 'Dashboard', navDashboard: 'Home', navProducts: 'Products', navInventory: 'Inventory', navOrders: 'Orders', navCustomers: 'Customers', navContent: 'Content', navDesign: 'Design',
      loginTitle: 'Store Admin', loginSubtitle: 'Sign in to manage your store', password: 'Password', passwordPlaceholder: 'Enter password', loginBtn: 'Sign In', loginHint: 'Default: admin123',
      previewSite: 'Preview Site', logout: 'Log Out',
      totalSales: 'Total Sales (MAD)', totalOrders: 'Total Orders', shippedOrders: 'Shipped', confirmedOrders: 'Confirmed', pendingOrders: 'Pending',
      ordersSearchPlaceholder: 'Search by order ID, name, phone...', filterAll: 'All statuses', statusPending: 'Pending', statusConfirmed: 'Confirmed', statusShipped: 'Shipped', statusDelivered: 'Delivered', statusCancelled: 'Cancelled',
      exportCsv: 'Export CSV', bulkDelete: 'Delete selected', orderId: 'Order ID', date: 'Date', customer: 'Customer', phone: 'Phone', city: 'City', products: 'Products', total: 'Total', status: 'Status', actions: 'Actions',
      view: 'View', edit: 'Edit', delete: 'Delete', save: 'Save', orderDetails: 'Order Details', customerDetails: 'Customer Details',
      noOrders: 'No orders yet.', noCustomers: 'No customers yet.',
      orderHistory: 'Order History', contactInfo: 'Contact Info',
      navSizes: 'Sizes', sizesTitle: 'Size Management', sizesAdd: 'Add size', sizesNewPlaceholder: 'e.g. XXL',
      sizesIntro: 'Add or edit available sizes, then assign them to products below.',
      sizesGlobalList: 'Size list', sizesAssignProducts: 'Assign sizes to products', sizesAssignHint: 'Select which sizes are available for each product, then click Save.',
      sizesSaveAssign: 'Save size assignment', sizesEdit: 'Edit', sizesRemove: 'Remove', sizesNoProducts: 'No products.',
      mapSectionTitle: 'Google Maps (About page)', mapSectionHint: 'Paste a Google Maps share link and click "Parse link" to fill coordinates, or enter latitude, longitude and zoom manually.',
      mapLinkPlaceholder: 'Google Maps share link (optional)', mapParseLink: 'Parse link', mapLat: 'Latitude', mapLng: 'Longitude', mapZoom: 'Zoom level (1–21)', mapDataRequired: 'Enter valid latitude, longitude and zoom (or parse from link).', invalidMapData: 'Invalid coordinates or zoom.',
      navFloatingContact: 'Floating Contact Button',
      floatingContactTitle: 'Floating Contact Button', floatingContactEnabled: 'Enable button', floatingContactType: 'Button type',
      floatingContactTypePhone: 'Phone call', floatingContactTypeWhatsApp: 'WhatsApp', floatingContactTypeTelegram: 'Telegram',
      floatingContactPhone: 'Phone number (with country code)', floatingContactPhonePlaceholder: 'e.g. +212679460301',
      floatingContactPosition: 'Button position', floatingContactPositionRight: 'Right', floatingContactPositionLeft: 'Left',
      floatingContactMessage: 'Default message (WhatsApp/Telegram)',
      navSync: 'GitHub Sync',
      syncTitle: 'Sync to GitHub Pages',
      syncHint: 'Save changes to the live server so they appear on all devices (desktop and mobile). Enter a GitHub Personal Access Token with repo scope.',
      syncToken: 'GitHub Token',
      syncTokenPlaceholder: 'ghp_xxxx...',
      syncOwner: 'Repo owner',
      syncOwnerPlaceholder: 'username',
      syncRepo: 'Repo name',
      syncRepoPlaceholder: 'tist',
      syncBranch: 'Branch',
      syncBranchPlaceholder: 'main',
      syncSaveConfig: 'Save settings',
      syncNow: 'Sync now',
      syncSuccess: 'Saved and synced to GitHub — updates visible on all devices',
      syncFail: 'GitHub sync failed',
      syncNotConfigured: 'Saved locally. Set up GitHub Sync to see updates on all devices.',
      syncOrdersApiUrl: 'Orders API URL',
      syncOrdersApiPlaceholder: 'https://your-app.vercel.app/api/orders'
    }
  };

  const GITHUB_SYNC_KEY = 'adminGitHubSync';
  function getGitHubSyncConfig() {
    try {
      const raw = localStorage.getItem(GITHUB_SYNC_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
  }
  function setGitHubSyncConfig(config) {
    try {
      localStorage.setItem(GITHUB_SYNC_KEY, JSON.stringify(config));
      return true;
    } catch (e) { return false; }
  }

  /** Notify other open tabs (same device) to refresh store data so new products appear immediately. */
  function notifyOtherTabsSyncDone() {
    try {
      if (typeof window !== 'undefined' && window.BroadcastChannel) {
        new window.BroadcastChannel('store-sync').postMessage('sync');
      }
    } catch (e) { /* ignore */ }
  }

  /** Push current store data to GitHub repo file data/store-data.json. Returns a promise that resolves to true on success. */
  function syncToGitHub() {
    const config = getGitHubSyncConfig();
    const token = (config.token || '').trim();
    const owner = (config.owner || '').trim();
    const repo = (config.repo || '').trim();
    const branch = (config.branch || 'main').trim() || 'main';
    if (!token || !owner || !repo) return Promise.resolve(false);
    if (typeof Store === 'undefined' || !Store.getPayloadForSync) return Promise.resolve(false);
    const payload = Store.getPayloadForSync();
    const body = JSON.stringify(payload, null, 2);
    const path = 'data/store-data.json';
    const url = 'https://api.github.com/repos/' + encodeURIComponent(owner) + '/' + encodeURIComponent(repo) + '/contents/' + path;
    const headers = {
      'Accept': 'application/vnd.github+json',
      'Authorization': 'Bearer ' + token
    };
    return fetch(url, { method: 'GET', headers: headers })
      .then(function (r) { return r.json(); })
      .then(function (existing) {
        const sha = existing && existing.sha ? existing.sha : null;
        return fetch(url, {
          method: 'PUT',
          headers: Object.assign({ 'Content-Type': 'application/json' }, headers),
          body: JSON.stringify({
            message: 'Update store data from admin',
            content: btoa(unescape(encodeURIComponent(body))),
            sha: sha,
            branch: branch
          })
        });
      })
      .then(function (r) {
        if (!r.ok) return r.json().then(function (err) { throw new Error(err.message || 'GitHub API error'); });
        return true;
      });
  }

  function getLang() {
    return localStorage.getItem(LANG_KEY) || 'ar';
  }
  function setLang(lang) {
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.remove('dir-rtl', 'dir-ltr');
    document.body.classList.add(lang === 'ar' ? 'dir-rtl' : 'dir-ltr');
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (i18n[lang] && i18n[lang][key]) el.textContent = i18n[lang][key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (i18n[lang] && i18n[lang][key]) el.placeholder = i18n[lang][key];
    });
  }
  function t(key) {
    const lang = getLang();
    return (i18n[lang] && i18n[lang][key]) ? i18n[lang][key] : key;
  }

  /**
   * Parse a Google Maps URL and return { lat, lng, zoom } or null.
   * Handles: place/@lat,lng,zoomz | ?q=lat,lng | embed pb=!3dlat!4dlng
   */
  function parseGoogleMapsUrl(url) {
    if (!url || typeof url !== 'string') return null;
    const s = url.trim();
    if (!s) return null;
    let lat = null, lng = null, zoom = null;

    // Place or maps view: /@lat,lng,zoomz or /@lat,lng,zoomm
    const atMatch = s.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*),(\d+)[zm]/i);
    if (atMatch) {
      lat = parseFloat(atMatch[1]);
      lng = parseFloat(atMatch[2]);
      zoom = parseInt(atMatch[3], 10);
    }
    if (lat == null && s.indexOf('?') !== -1) {
      // Query: ?q=lat,lng or &q=lat,lng (coordinates only)
      const qMatch = s.match(/[?&]q=(-?\d+\.?\d*),(-?\d+\.?\d*)(?:[^&\d]|$)/);
      if (qMatch) {
        lat = parseFloat(qMatch[1]);
        lng = parseFloat(qMatch[2]);
        zoom = zoom != null ? zoom : 17;
      }
    }
    if (lat == null && (s.indexOf('embed') !== -1 || s.indexOf('pb=') !== -1)) {
      // Embed pb=: !3dLAT!4dLNG and optionally !2dZOOM
      const embedMatch = s.match(/!3d(-?\d+\.?\d*)!4d(-?\d+\.?\d*)/);
      if (embedMatch) {
        lat = parseFloat(embedMatch[1]);
        lng = parseFloat(embedMatch[2]);
        if (zoom == null) {
          const zMatch = s.match(/!2d(\d+)/);
          zoom = zMatch ? parseInt(zMatch[1], 10) : 17;
        }
      }
    }

    if (lat == null || lng == null || isNaN(lat) || isNaN(lng)) return null;
    if (zoom == null || isNaN(zoom)) zoom = 17;
    zoom = Math.min(21, Math.max(1, zoom));
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;
    return { lat, lng, zoom };
  }

  function validateMapFields(latVal, lngVal, zoomVal) {
    const lat = parseFloat(latVal);
    const lng = parseFloat(lngVal);
    const zoom = parseInt(zoomVal, 10);
    if (isNaN(lat) || isNaN(lng) || isNaN(zoom)) return false;
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return false;
    if (zoom < 1 || zoom > 21) return false;
    return true;
  }

  const sections = {
    dashboard: document.getElementById('section-dashboard'),
    products: document.getElementById('section-products'),
    inventory: document.getElementById('section-inventory'),
    sizes: document.getElementById('section-sizes'),
    orders: document.getElementById('section-orders'),
    customers: document.getElementById('section-customers'),
    content: document.getElementById('section-content'),
    'floating-contact': document.getElementById('section-floating-contact'),
    design: document.getElementById('section-design'),
    sync: document.getElementById('section-sync')
  };

  const loginScreen = document.getElementById('login-screen');
  const dashboard = document.getElementById('dashboard');
  const productModal = document.getElementById('product-modal');
  const orderModal = document.getElementById('order-modal');
  const customerModal = document.getElementById('customer-modal');
  const toastEl = document.getElementById('toast');

  let actionInProgress = false;
  function setActionInProgress(value) {
    actionInProgress = !!value;
    document.body.classList.toggle('admin-busy', actionInProgress);
  }

  function isLoggedIn() {
    return sessionStorage.getItem(ADMIN_SESSION) === 'true';
  }

  function setLoggedIn(value) {
    if (value) sessionStorage.setItem(ADMIN_SESSION, 'true');
    else sessionStorage.removeItem(ADMIN_SESSION);
  }

  function showScreen(screen) {
    loginScreen.classList.toggle('hidden', screen !== 'login');
    dashboard.classList.toggle('hidden', screen !== 'dashboard');
  }

  function showSection(sectionId) {
    Object.keys(sections).forEach(id => {
      const panel = sections[id];
      const btn = document.querySelector(`.nav-item[data-section="${id}"]`);
      if (panel) panel.classList.toggle('active', id === sectionId);
      if (btn) btn.classList.toggle('active', id === sectionId);
    });
    if (sectionId === 'dashboard') { renderDashboard(); loadOrders(); }
    if (sectionId === 'products') renderProductsList();
    if (sectionId === 'inventory') renderInventory();
    if (sectionId === 'sizes') renderSizes();
    if (sectionId === 'orders') {
      if (typeof Store !== 'undefined' && Store.refreshFromRemote) {
        Store.refreshFromRemote().then(function () { loadOrders(); }).catch(function () { loadOrders(); });
      } else {
        renderOrdersTable();
        loadOrders();
      }
    }
    if (sectionId === 'customers') renderCustomersList();
    if (sectionId === 'content') renderContentTabs();
    if (sectionId === 'floating-contact') renderFloatingContact();
    if (sectionId === 'design') renderDesign();
    if (sectionId === 'sync') renderSyncSection();
  }

  function showToast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.remove('hidden');
    setTimeout(() => toastEl.classList.add('hidden'), 3000);
  }

  function showModal(modal, show) {
    modal.classList.toggle('hidden', !show);
  }

  // —— Login ——
  document.getElementById('login-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    if (actionInProgress) return;
    const password = document.getElementById('admin-password')?.value || '';
    const admin = typeof Store !== 'undefined' && Store.getAdmin ? Store.getAdmin() : null;
    const expected = admin && admin.passwordHash ? atob(admin.passwordHash) : 'admin123';
    if (password === expected) {
      setLoggedIn(true);
      showScreen('dashboard');
      showSection('dashboard');
    } else {
      showToast(getLang() === 'ar' ? 'كلمة المرور غير صحيحة' : 'Incorrect password');
    }
  });

  document.getElementById('logout-btn')?.addEventListener('click', function () {
    setLoggedIn(false);
    showScreen('login');
    const pw = document.getElementById('admin-password');
    if (pw) pw.value = '';
  });

  if (!isLoggedIn()) {
    showScreen('login');
  } else {
    showScreen('dashboard');
    setLang(getLang());
    showSection('dashboard');
  }

  setLang(getLang());

  document.getElementById('lang-toggle')?.addEventListener('click', function () {
    const next = getLang() === 'ar' ? 'en' : 'ar';
    setLang(next);
    this.textContent = next === 'ar' ? 'EN ع' : 'ع EN';
    showToast(next === 'ar' ? 'تم التبديل إلى العربية' : 'Switched to English');
  });
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) langToggle.textContent = getLang() === 'ar' ? 'EN ع' : 'ع EN';

  // —— Nav ——
  document.querySelectorAll('.nav-item[data-section]').forEach(btn => {
    btn.addEventListener('click', function () {
      const section = this.getAttribute('data-section');
      if (section && !actionInProgress) showSection(section);
    });
  });

  // —— Dashboard Home ——
  function getStats() {
    const orders = getOrdersList ? getOrdersList() : (typeof Store !== 'undefined' ? Store.getOrders() : []);
    let totalSales = 0;
    let shipped = 0, confirmed = 0, pending = 0;
    orders.forEach(o => {
      if (o.status !== 'cancelled') totalSales += Number(o.total) || 0;
      if (o.status === 'shipped' || o.status === 'delivered') shipped++;
      else if (o.status === 'processing') confirmed++;
      else if (o.status === 'pending') pending++;
    });
    return {
      totalSales,
      totalOrders: orders.length,
      shipped,
      confirmed,
      pending
    };
  }

  function renderDashboard() {
    const stats = getStats();
    const cards = document.getElementById('stats-cards');
    const cardsData = [
      { icon: '💰', value: stats.totalSales.toLocaleString(), labelKey: 'totalSales' },
      { icon: '📦', value: stats.totalOrders, labelKey: 'totalOrders' },
      { icon: '🚚', value: stats.shipped, labelKey: 'shippedOrders' },
      { icon: '✅', value: stats.confirmed, labelKey: 'confirmedOrders' },
      { icon: '⏳', value: stats.pending, labelKey: 'pendingOrders' }
    ];
    cards.innerHTML = cardsData.map(c => `
      <div class="stat-card">
        <div class="stat-card-icon">${c.icon}</div>
        <p class="stat-card-value">${c.value}</p>
        <p class="stat-card-label">${t(c.labelKey)}</p>
      </div>
    `).join('');
  }

  // —— Products ——
  function renderProductsList() {
    const list = document.getElementById('products-list');
    const products = Store.getProducts();
    list.innerHTML = products.map(p => {
      const priceDisplay = p.discountPrice ? `${p.discountPrice} <small>بدلاً من ${p.regularPrice}</small>` : `${p.regularPrice}`;
      const img = (p.images && p.images[0]) || '';
      return `
        <div class="product-card" data-id="${p.id}">
          <img class="product-card-image" src="${img || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23222228" width="200" height="200"/%3E%3Ctext fill="%23666" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3Eلا صورة%3C/text%3E%3C/svg%3E'}" alt="" />
          <div class="product-card-body">
            <h3>${escapeHtml(p.name)}</h3>
            <p class="price-line">${priceDisplay} درهم</p>
            <span class="badge ${p.visible ? '' : 'hidden-badge'}">${p.visible ? 'ظاهر' : 'مخفي'}</span>
            <div class="product-card-actions">
              <button type="button" class="btn btn-primary" data-edit="${p.id}">تعديل</button>
              <button type="button" class="btn btn-ghost" data-delete="${p.id}">حذف</button>
            </div>
          </div>
        </div>`;
    }).join('');

    list.querySelectorAll('[data-edit]').forEach(btn => {
      btn.addEventListener('click', () => openProductForm(btn.getAttribute('data-edit')));
    });
    list.querySelectorAll('[data-delete]').forEach(btn => {
      btn.addEventListener('click', () => deleteProduct(btn.getAttribute('data-delete')));
    });
  }

  const productsListEl = document.getElementById('products-list');
  if (productsListEl) {
    productsListEl.addEventListener('click', function (e) {
      const editBtn = e.target.closest('[data-edit]');
      const deleteBtn = e.target.closest('[data-delete]');
      if (editBtn) {
        e.preventDefault();
        openProductForm(editBtn.getAttribute('data-edit'));
      } else if (deleteBtn) {
        e.preventDefault();
        deleteProduct(deleteBtn.getAttribute('data-delete'));
      }
    });
  }

  function openProductForm(id) {
    if (typeof Store === 'undefined' || !Store.getProducts) {
      showToast(getLang() === 'ar' ? 'خطأ: Store غير متوفر' : 'Error: Store not available');
      return;
    }
    const form = document.getElementById('product-form');
    const title = document.getElementById('product-modal-title');
    const idEl = document.getElementById('product-id');
    if (idEl) idEl.value = id || '';
    if (title) title.textContent = id ? (getLang() === 'ar' ? 'تعديل المنتج' : 'Edit product') : (getLang() === 'ar' ? 'إضافة منتج' : 'Add product');

    populateProductCategorySelect();
    if (id) {
      const p = Store.getProductById(id);
      if (!p) return;
      document.getElementById('product-name').value = p.name;
      document.getElementById('product-regular-price').value = p.regularPrice ?? '';
      document.getElementById('product-discount-price').value = p.discountPrice ?? '';
      updateProductDiscountPercentDisplay();
      const catEl = document.getElementById('product-category');
      if (catEl) catEl.value = p.category || '';
      document.getElementById('product-description').value = p.description || '';
      document.getElementById('product-visible').checked = p.visible !== false;
      renderProductImages(p.images || []);
      renderProductColors(p.colors || [{ name: 'أسود', hex: '#000000' }]);
      renderProductInventory(p);
    } else {
      form.reset();
      document.getElementById('product-visible').checked = true;
      updateProductDiscountPercentDisplay();
      renderProductImages([]);
      renderProductColors([{ name: 'أسود', hex: '#000000' }]);
      renderProductInventory(null);
    }
    showModal(productModal, true);
  }

  function updateProductDiscountPercentDisplay() {
    const oldP = parseInt(document.getElementById('product-regular-price')?.value, 10) || 0;
    const newP = document.getElementById('product-discount-price')?.value?.trim();
    const newVal = newP ? parseInt(newP, 10) : null;
    const percentEl = document.getElementById('product-discount-percent');
    if (!percentEl) return;
    if (oldP > 0 && newVal != null && newVal < oldP) {
      const pct = Math.max(1, Math.min(100, Math.round((1 - newVal / oldP) * 100)));
      percentEl.value = pct;
    } else if (!newVal) {
      percentEl.value = '';
    }
  }

  function applyProductDiscountPercentToNewPrice() {
    const oldP = parseInt(document.getElementById('product-regular-price')?.value, 10) || 0;
    const pct = parseInt(document.getElementById('product-discount-percent')?.value, 10);
    const discountPriceEl = document.getElementById('product-discount-price');
    if (!discountPriceEl || oldP <= 0) return;
    if (pct >= 1 && pct <= 100) {
      const newPrice = Math.round(oldP * (1 - pct / 100));
      discountPriceEl.value = Math.max(0, newPrice);
    }
  }

  function populateProductCategorySelect() {
    const design = Store.getDesign();
    const categories = (design && design.productCategories) ? design.productCategories : ['All', 'T-Shirts', 'Hoodies', 'Accessories'];
    const sel = document.getElementById('product-category');
    if (!sel) return;
    const current = sel.value;
    sel.innerHTML = '<option value="">—</option>' + categories.filter(c => c !== 'All').map(c => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('');
    if (current) sel.value = current;
  }

  document.getElementById('product-regular-price')?.addEventListener('input', updateProductDiscountPercentDisplay);
  document.getElementById('product-discount-price')?.addEventListener('input', updateProductDiscountPercentDisplay);
  document.getElementById('product-discount-percent')?.addEventListener('input', applyProductDiscountPercentToNewPrice);

  function renderProductImages(urls) {
    const container = document.getElementById('product-images');
    container.innerHTML = '';
    (urls || []).forEach((url, i) => {
      const div = document.createElement('div');
      div.className = 'image-item';
      div.draggable = true;
      div.dataset.index = i;
      div.innerHTML = `<img src="${url}" alt="" onerror="this.parentElement.innerHTML='<span style=\'padding:8px;color:#666\'>خطأ</span>'" /><button type="button" class="remove-img" aria-label="حذف">×</button>`;
      div.querySelector('.remove-img').addEventListener('click', () => {
        const list = getCurrentImageUrls();
        list.splice(i, 1);
        renderProductImages(list);
      });
      div.addEventListener('dragstart', (e) => { e.dataTransfer.setData('index', i); div.classList.add('dragging'); });
      div.addEventListener('dragend', () => div.classList.remove('dragging'));
      div.addEventListener('dragover', (e) => { e.preventDefault(); });
      div.addEventListener('drop', (e) => {
        e.preventDefault();
        const from = parseInt(e.dataTransfer.getData('index'), 10);
        const list = getCurrentImageUrls();
        const to = parseInt(div.dataset.index, 10);
        if (from === to) return;
        const item = list[from];
        list.splice(from, 1);
        list.splice(to, 0, item);
        renderProductImages(list);
      });
      container.appendChild(div);
    });
  }

  function getCurrentImageUrls() {
    return Array.from(document.querySelectorAll('#product-images .image-item img')).map(img => img.src);
  }

  document.getElementById('btn-add-image-url')?.addEventListener('click', function () {
    const url = prompt(getLang() === 'ar' ? 'أدخل رابط الصورة:' : 'Enter image URL:');
    if (url) {
      const list = getCurrentImageUrls();
      list.push(url.trim());
      renderProductImages(list);
    }
  });

  document.getElementById('btn-upload-image')?.addEventListener('click', function () {
    document.getElementById('product-image-input')?.click();
  });

  document.getElementById('product-image-input')?.addEventListener('change', function () {
    const files = this.files;
    if (!files.length) return;
    const list = getCurrentImageUrls();
    Array.from(files).forEach(file => {
      const r = new FileReader();
      r.onload = () => { list.push(r.result); renderProductImages(list); };
      r.readAsDataURL(file);
    });
    this.value = '';
  });

  function renderProductColors(colors) {
    const container = document.getElementById('product-colors');
    container.innerHTML = (colors || []).map((c, i) => `
      <div class="color-item" data-index="${i}">
        <span class="color-swatch" style="background:${c.hex || '#000'}"></span>
        <input type="text" value="${escapeHtml(c.name)}" placeholder="اسم اللون" />
        <input type="color" value="${c.hex || '#000000'}" style="width:32px;height:28px;padding:0;border:0;cursor:pointer" />
        <button type="button" class="remove-color">حذف</button>
      </div>
    `).join('');
    container.querySelectorAll('.color-item').forEach((row, i) => {
      row.querySelector('.remove-color').addEventListener('click', () => {
        const rows = container.querySelectorAll('.color-item');
        if (rows.length <= 1) return;
        row.remove();
      });
      const nameInput = row.querySelector('input[type="text"]');
      const colorInput = row.querySelector('input[type="color"]');
      colorInput.addEventListener('input', () => {});
      colorInput.addEventListener('change', () => { row.querySelector('.color-swatch').style.background = colorInput.value; });
    });
  }

  document.getElementById('btn-add-color').addEventListener('click', function () {
    const container = document.getElementById('product-colors');
    const div = document.createElement('div');
    div.className = 'color-item';
    div.innerHTML = `<span class="color-swatch" style="background:#666"></span><input type="text" placeholder="اسم اللون" /><input type="color" value="#666666" style="width:32px;height:28px;padding:0;border:0;cursor:pointer" /><button type="button" class="remove-color">حذف</button>`;
    div.querySelector('.remove-color').addEventListener('click', () => div.remove());
    div.querySelector('input[type="color"]').addEventListener('change', function () {
      div.querySelector('.color-swatch').style.background = this.value;
    });
    container.appendChild(div);
  });

  function getProductColorsFromForm() {
    return Array.from(document.querySelectorAll('#product-colors .color-item')).map(row => ({
      name: row.querySelector('input[type="text"]').value.trim() || 'لون',
      hex: row.querySelector('input[type="color"]').value
    }));
  }

  function renderProductInventory(product) {
    const container = document.getElementById('product-inventory');
    if (!container) return;
    const colors = (product && product.colors && product.colors.length)
      ? product.colors
      : getProductColorsFromForm().length
        ? getProductColorsFromForm()
        : [{ name: 'أسود', hex: '#000000' }];
    const defaultSizes = (typeof Store !== 'undefined' && Store.getSizes) ? Store.getSizes() : ['S', 'M', 'L', 'XL'];
    const sizes = (product && product.sizes && product.sizes.length) ? product.sizes : (getSizesFromInventoryForm().length ? getSizesFromInventoryForm() : defaultSizes);
    const inventory = (product && product.inventory) ? product.inventory : {};
    container.innerHTML = '';
    colors.forEach(c => {
      const colorName = typeof c === 'object' ? (c.name || '') : String(c || '');
      sizes.forEach(sz => {
        const key = colorName + '|' + sz;
        const val = inventory[key] != null ? inventory[key] : 0;
        const row = document.createElement('div');
        row.className = 'inventory-row';
        row.setAttribute('data-key', key);
        row.innerHTML = `
          <span class="inventory-label">${escapeHtml(colorName || '—')} / ${escapeHtml(sz)}</span>
          <input type="number" min="0" data-key="${escapeHtml(key)}" value="${val}" placeholder="0" />
        `;
        container.appendChild(row);
      });
    });
  }

  function getSizesFromInventoryForm() {
    const keys = Array.from(document.querySelectorAll('#product-inventory input[data-key]')).map(inp => inp.getAttribute('data-key')).filter(Boolean);
    return [...new Set(keys.map(k => k.split('|')[1]))];
  }

  document.getElementById('product-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    if (actionInProgress) return;

    // Client-side validation
    const name = (document.getElementById('product-name')?.value || '').trim();
    const regularPrice = parseInt(document.getElementById('product-regular-price')?.value, 10);
    const images = getCurrentImageUrls();

    if (!name) {
      showToast(getLang() === 'ar' ? 'اسم المنتج مطلوب' : 'Product name is required');
      return;
    }
    if (isNaN(regularPrice) || regularPrice < 0) {
      showToast(getLang() === 'ar' ? 'السعر يجب أن يكون رقماً موجباً' : 'Price must be a positive number');
      return;
    }
    if (!images || images.length === 0) {
      showToast(getLang() === 'ar' ? 'أضف صورة واحدة على الأقل' : 'Add at least one image');
      return;
    }

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.textContent : '';
    setActionInProgress(true);
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = getLang() === 'ar' ? 'جاري الحفظ...' : 'Saving...';
    }
    try {
      const id = (document.getElementById('product-id')?.value || '').trim();
      const regularPriceVal = parseInt(document.getElementById('product-regular-price')?.value, 10) || 0;
      const discountPriceRaw = (document.getElementById('product-discount-price')?.value || '').trim();
      const discountPrice = discountPriceRaw ? parseInt(discountPriceRaw, 10) : null;
      const categoryRaw = document.getElementById('product-category')?.value?.trim();
      const category = categoryRaw || undefined;
      const description = (document.getElementById('product-description')?.value || '').trim();
      const visible = document.getElementById('product-visible') ? document.getElementById('product-visible').checked : true;
      const images = getCurrentImageUrls();
      const colors = getProductColorsFromForm();
      const inventory = {};
      document.querySelectorAll('#product-inventory input[data-key]').forEach(input => {
        const key = input.getAttribute('data-key');
        if (key) inventory[key] = parseInt(input.value, 10) || 0;
      });
      const sizes = [...new Set(Object.keys(inventory).map(k => k.split('|')[1]))];

      const products = Store.getProducts();
      const existing = id ? products.find(p => p.id === id) : null;
      const newId = id || 'p-' + Date.now();
      const payload = {
        id: newId,
        name,
        nameAr: existing && existing.nameAr ? existing.nameAr : name,
        regularPrice: regularPriceVal,
        discountPrice,
        category,
        description,
        descriptionAr: existing && existing.descriptionAr ? existing.descriptionAr : description,
        images,
        colors,
        sizes,
        inventory,
        visible,
        meta: existing && existing.meta ? existing.meta : []
      };
      if (existing) {
        const idx = products.findIndex(p => p.id === id);
        products[idx] = payload;
      } else {
        products.push(payload);
      }
      Store.setProducts(products);
      showModal(productModal, false);
      showToast(getLang() === 'ar' ? 'تم حفظ المنتج' : 'Product saved');
      renderProductsList();
      if (sections.inventory) renderInventory();
      syncToGitHub().then(ok => { if (ok) { notifyOtherTabsSyncDone(); showToast(t('syncSuccess')); } else showToast(t('syncNotConfigured')); }).catch(() => showToast(t('syncFail')));
    } catch (err) {
      console.error('[admin] Save product failed', err);
      showToast(getLang() === 'ar' ? 'فشل حفظ المنتج' : 'Failed to save product');
    } finally {
      setActionInProgress(false);
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    }
  });

  function deleteProduct(id) {
    if (actionInProgress) return;
    const msg = getLang() === 'ar' ? 'هل تريد حذف هذا المنتج؟' : 'Delete this product?';
    if (!confirm(msg)) return;
    setActionInProgress(true);
    try {
      const products = Store.getProducts().filter(p => p.id !== id);
      Store.setProducts(products);
      showToast(getLang() === 'ar' ? 'تم حذف المنتج' : 'Product deleted');
      renderProductsList();
      if (sections.inventory) renderInventory();
      syncToGitHub().then(ok => { if (ok) { notifyOtherTabsSyncDone(); showToast(t('syncSuccess')); } else showToast(t('syncNotConfigured')); }).catch(() => showToast(t('syncFail')));
    } catch (err) {
      console.error('[admin] Delete product failed', err);
      showToast(getLang() === 'ar' ? 'فشل حذف المنتج' : 'Failed to delete product');
    } finally {
      setActionInProgress(false);
    }
  }

  document.getElementById('btn-add-product')?.addEventListener('click', function () {
    if (actionInProgress) return;
    openProductForm(null);
  });

  productModal?.querySelector('.modal-backdrop')?.addEventListener('click', () => { if (!actionInProgress) showModal(productModal, false); });
  productModal?.querySelector('.modal-close')?.addEventListener('click', () => { if (!actionInProgress) showModal(productModal, false); });
  productModal?.querySelector('.modal-cancel')?.addEventListener('click', () => { if (!actionInProgress) showModal(productModal, false); });

  // Re-build inventory when colors change (simplified: user can add sizes in UI later; we use S,M,L,XL by default in new products)
  document.getElementById('product-colors')?.addEventListener('change', function () {
    const product = null;
    const colors = getProductColorsFromForm();
    if (colors.length) renderProductInventory({ colors, sizes: (typeof Store !== 'undefined' && Store.getSizes) ? Store.getSizes() : ['S', 'M', 'L', 'XL'], inventory: {} });
  });

  // —— Inventory ——
  function renderInventory() {
    const alertsEl = document.getElementById('inventory-alerts');
    const tableWrap = document.getElementById('inventory-table-wrap');
    const products = Store.getProducts();
    const threshold = Store.getLowStockThreshold();
    const alerts = [];
    products.forEach(p => {
      if (!p.inventory) return;
      Object.entries(p.inventory).forEach(([key, qty]) => {
        if (qty === 0) alerts.push({ type: 'danger', product: p.name, key, qty });
        else if (qty <= threshold) alerts.push({ type: 'warning', product: p.name, key, qty });
      });
    });
    alertsEl.innerHTML = alerts.slice(0, 20).map(a => `
      <div class="alert alert-${a.type === 'danger' ? 'danger' : 'warning'}">
        <span>${a.type === 'danger' ? 'نفاد' : 'كمية قليلة'}</span>
        <span>${escapeHtml(a.product)} — ${a.key.replace('|', ' / ')}: ${a.qty}</span>
      </div>
    `).join('') || '<p>لا توجد تنبيهات مخزون.</p>';

    let tableHtml = '<table><thead><tr><th>المنتج</th><th>اللون / المقاس</th><th>الكمية</th><th>الحالة</th></tr></thead><tbody>';
    products.forEach(p => {
      if (!p.inventory) return;
      Object.entries(p.inventory).forEach(([key, qty]) => {
        const cls = qty === 0 ? 'out-of-stock' : qty <= threshold ? 'low-stock' : '';
        const status = qty === 0 ? 'نفاد' : qty <= threshold ? 'كمية قليلة' : 'متوفر';
        tableHtml += `<tr><td>${escapeHtml(p.name)}</td><td>${key.replace('|', ' / ')}</td><td class="${cls}">${qty}</td><td>${status}</td></tr>`;
      });
    });
    tableHtml += '</tbody></table>';
    tableWrap.innerHTML = tableHtml;
  }

  // —— Sizes ——
  function getSizesList() {
    return (typeof Store !== 'undefined' && Store.getSizes) ? Store.getSizes() : ['S', 'M', 'L', 'XL'];
  }

  function setSizesList(arr) {
    if (typeof Store !== 'undefined' && Store.setSizes) Store.setSizes(arr);
  }

  function renderSizes() {
    const listEl = document.getElementById('sizes-list');
    const gridEl = document.getElementById('sizes-products-grid');
    if (!listEl) return;

    const sizes = getSizesList();
    listEl.innerHTML = sizes.map((sz, index) => `
      <li class="size-list-item" data-size="${escapeHtml(sz)}" data-index="${index}">
        <span class="size-list-label">${escapeHtml(sz)}</span>
        <div class="size-list-actions">
          <button type="button" class="btn btn-secondary btn-small btn-size-edit" data-size="${escapeHtml(sz)}">${t('sizesEdit')}</button>
          <button type="button" class="btn btn-ghost btn-small btn-size-remove" data-size="${escapeHtml(sz)}">${t('sizesRemove')}</button>
        </div>
      </li>
    `).join('') || '<li class="sizes-empty">' + (getLang() === 'ar' ? 'لا مقاسات. أضف مقاساً أعلاه.' : 'No sizes. Add one above.') + '</li>';

    listEl.querySelectorAll('.btn-size-edit').forEach(btn => {
      btn.addEventListener('click', function () {
        const oldName = this.getAttribute('data-size');
        const newName = prompt(getLang() === 'ar' ? 'الاسم الجديد للمقاس:' : 'New size name:', oldName);
        if (newName != null && newName.trim() !== '' && newName.trim() !== oldName) {
          renameSize(oldName, newName.trim());
        }
      });
    });
    listEl.querySelectorAll('.btn-size-remove').forEach(btn => {
      btn.addEventListener('click', function () {
        const sz = this.getAttribute('data-size');
        if (confirm((getLang() === 'ar' ? 'حذف المقاس "' : 'Remove size "') + sz + '"?')) removeSize(sz);
      });
    });

    if (gridEl) {
      const products = (typeof Store !== 'undefined' && Store.getProducts) ? Store.getProducts() : [];
      if (products.length === 0) {
        gridEl.innerHTML = '<p class="sizes-no-products">' + t('sizesNoProducts') + '</p>';
      } else {
        gridEl.innerHTML = products.map(p => {
          const productSizes = Array.isArray(p.sizes) ? p.sizes : [];
          const checkboxes = sizes.map(sz => `
            <label class="size-check-label">
              <input type="checkbox" class="product-size-cb" data-product-id="${escapeHtml(p.id)}" value="${escapeHtml(sz)}" ${productSizes.includes(sz) ? 'checked' : ''} />
              <span>${escapeHtml(sz)}</span>
            </label>
          `).join('');
          return `
            <div class="sizes-product-card" data-product-id="${escapeHtml(p.id)}">
              <h4>${escapeHtml(p.name)}</h4>
              <div class="sizes-product-checks">${checkboxes}</div>
            </div>
          `;
        }).join('');
      }
    }
  }

  function addSize(name) {
    const trimmed = (name || '').trim();
    if (!trimmed) return false;
    const sizes = getSizesList();
    if (sizes.includes(trimmed)) {
      showToast(getLang() === 'ar' ? 'المقاس موجود مسبقاً' : 'Size already exists');
      return false;
    }
    sizes.push(trimmed);
    setSizesList(sizes);
    renderSizes();
    showToast(getLang() === 'ar' ? 'تمت إضافة المقاس' : 'Size added');
    return true;
  }

  function renameSize(oldName, newName) {
    const sizes = getSizesList();
    const idx = sizes.indexOf(oldName);
    if (idx === -1) return false;
    if (sizes.includes(newName)) {
      showToast(getLang() === 'ar' ? 'اسم المقاس مستخدم مسبقاً' : 'Size name already in use');
      return false;
    }
    sizes[idx] = newName;
    setSizesList(sizes);
    const products = Store.getProducts();
    let changed = false;
    products.forEach(p => {
      if (Array.isArray(p.sizes) && p.sizes.includes(oldName)) {
        p.sizes = p.sizes.map(s => s === oldName ? newName : s);
        changed = true;
      }
      if (p.inventory && typeof p.inventory === 'object') {
        Object.keys(p.inventory).forEach(key => {
          const [colorPart, sizePart] = key.split('|');
          if (sizePart === oldName) {
            const newKey = colorPart + '|' + newName;
            p.inventory[newKey] = p.inventory[key];
            delete p.inventory[key];
            changed = true;
          }
        });
      }
    });
    if (changed) Store.setProducts(products);
    renderSizes();
    if (sections.products) renderProductsList();
    if (sections.inventory) renderInventory();
    showToast(getLang() === 'ar' ? 'تم تعديل المقاس' : 'Size updated');
    return true;
  }

  function removeSize(name) {
    const sizes = getSizesList().filter(s => s !== name);
    setSizesList(sizes);
    const products = Store.getProducts();
    products.forEach(p => {
      if (Array.isArray(p.sizes)) p.sizes = p.sizes.filter(s => s !== name);
      if (p.inventory && typeof p.inventory === 'object') {
        Object.keys(p.inventory).forEach(key => {
          if (key.endsWith('|' + name)) delete p.inventory[key];
        });
      }
    });
    Store.setProducts(products);
    renderSizes();
    if (sections.products) renderProductsList();
    if (sections.inventory) renderInventory();
    showToast(getLang() === 'ar' ? 'تم حذف المقاس' : 'Size removed');
  }

  document.getElementById('btn-add-size')?.addEventListener('click', function () {
    if (actionInProgress) return;
    const input = document.getElementById('sizes-new-input');
    const name = input ? input.value : '';
    if (addSize(name) && input) input.value = '';
  });

  document.getElementById('sizes-new-input')?.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (addSize(this.value) && this) this.value = '';
    }
  });

  document.getElementById('btn-save-product-sizes')?.addEventListener('click', function () {
    if (actionInProgress) return;
    const sizes = getSizesList();
    const products = Store.getProducts();
    const gridEl = document.getElementById('sizes-products-grid');
    if (!gridEl) return;
    setActionInProgress(true);
    try {
      gridEl.querySelectorAll('.sizes-product-card').forEach(card => {
        const productId = card.getAttribute('data-product-id');
        const product = products.find(p => p.id === productId);
        if (!product) return;
        const selected = Array.from(card.querySelectorAll('.product-size-cb:checked')).map(cb => cb.value);
        product.sizes = selected.length ? selected : [];
        if (product.colors && product.inventory) {
          const newInv = {};
          product.colors.forEach(c => {
            const colorName = typeof c === 'object' ? c.name : c;
            product.sizes.forEach(sz => {
              const key = colorName + '|' + sz;
              newInv[key] = product.inventory[key] != null ? product.inventory[key] : 0;
            });
          });
          product.inventory = newInv;
        }
      });
      Store.setProducts(products);
      showToast(getLang() === 'ar' ? 'تم حفظ المقاسات للمنتجات' : 'Product sizes saved');
      renderSizes();
      if (sections.products) renderProductsList();
      if (sections.inventory) renderInventory();
      syncToGitHub().then(ok => { if (ok) { notifyOtherTabsSyncDone(); showToast(t('syncSuccess')); } else showToast(t('syncNotConfigured')); }).catch(() => showToast(t('syncFail')));
    } catch (err) {
      console.error('[admin] Save product sizes failed', err);
      showToast(getLang() === 'ar' ? 'فشل الحفظ' : 'Save failed');
    } finally {
      setActionInProgress(false);
    }
  });

  // —— Orders (localStorage only - GitHub Pages compatible) ——
  function getOrdersList() {
    try {
      return typeof Store !== 'undefined' ? Store.getOrders() : [];
    } catch (e) {
      console.error('[admin] Error loading orders from localStorage', e);
      return [];
    }
  }

  function loadOrders() {
    try {
      renderOrdersTable();
      renderDashboard();
      renderCustomersList();
    } catch (e) {
      console.error('[admin] Error rendering orders', e);
      showToast(getLang() === 'ar' ? 'خطأ في تحميل الطلبات' : 'Error loading orders');
    }
  }

  function getOrderById(id) {
    return getOrdersList().find(o => o.id === id);
  }

  function getFilteredOrders() {
    const orders = getOrdersList();
    const search = (document.getElementById('orders-search') || {}).value || '';
    const statusFilter = (document.getElementById('orders-status-filter') || {}).value || '';
    let list = orders;
    if (statusFilter) list = list.filter(o => o.status === statusFilter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(o =>
        (o.id && o.id.toLowerCase().includes(q)) ||
        (o.fullName && o.fullName.toLowerCase().includes(q)) ||
        (o.phone && o.phone.replace(/\s/g, '').includes(q.replace(/\s/g, '')))
      );
    }
    return list;
  }

  function renderOrdersTable() {
    const wrap = document.getElementById('orders-table-wrap');
    const orders = getFilteredOrders();
    const statusLabels = { pending: t('statusPending'), processing: t('statusConfirmed'), shipped: t('statusShipped'), delivered: t('statusDelivered'), cancelled: t('statusCancelled') };
    if (orders.length === 0) {
      wrap.innerHTML = '<p class="empty-state">' + t('noOrders') + '</p>';
      return;
    }
    const productsText = (items) => (items || []).map(i => `${i.name} (${i.size}/${i.color}) ×${i.quantity}`).join('; ') || '—';
    wrap.innerHTML = `
      <table class="orders-table">
        <thead>
          <tr>
            <th><input type="checkbox" id="orders-select-all" aria-label="Select all" /></th>
            <th>${t('orderId')}</th>
            <th>${t('date')}</th>
            <th>${t('customer')}</th>
            <th>${t('phone')}</th>
            <th>${t('city')}</th>
            <th>${t('products')}</th>
            <th>${t('total')}</th>
            <th>${t('status')}</th>
            <th>${t('actions')}</th>
          </tr>
        </thead>
        <tbody>
          ${orders.map(o => `
            <tr data-id="${o.id}">
              <td><input type="checkbox" class="order-row-cb" value="${o.id}" /></td>
              <td>${escapeHtml(o.id)}</td>
              <td>${new Date(o.date).toLocaleDateString(getLang() === 'ar' ? 'ar-MA' : 'en-GB')}</td>
              <td>${escapeHtml(o.fullName || '—')}</td>
              <td>${escapeHtml(o.phone || '—')}</td>
              <td>${escapeHtml(o.city || '—')}</td>
              <td class="order-products">${escapeHtml(productsText(o.items))}</td>
              <td>${o.total || 0} MAD</td>
              <td><span class="status-badge status-${o.status || 'pending'}">${statusLabels[o.status] || o.status}</span></td>
              <td class="order-actions">
                <button type="button" class="btn btn-secondary btn-small" data-view="${o.id}">${t('view')}</button>
                <button type="button" class="btn btn-ghost btn-small" data-delete-one="${o.id}">${t('delete')}</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    wrap.querySelector('#orders-select-all')?.addEventListener('change', function () {
      wrap.querySelectorAll('.order-row-cb').forEach(cb => { cb.checked = this.checked; });
    });
    wrap.querySelectorAll('[data-view]').forEach(btn => {
      btn.addEventListener('click', () => openOrderDetail(btn.getAttribute('data-view')));
    });
    wrap.querySelectorAll('[data-delete-one]').forEach(btn => {
      btn.addEventListener('click', () => deleteOrderById(btn.getAttribute('data-delete-one')));
    });
  }

  document.getElementById('orders-search')?.addEventListener('input', () => renderOrdersTable());
  document.getElementById('orders-status-filter')?.addEventListener('change', () => renderOrdersTable());

  document.getElementById('btn-export-orders')?.addEventListener('click', function () {
    const orders = getFilteredOrders();
    if (orders.length === 0) { showToast(t('noOrders')); return; }
    const headers = ['Order ID', 'Date', 'Customer', 'Phone', 'City', 'Total', 'Status', 'Items'];
    const rows = orders.map(o => [
      o.id,
      new Date(o.date).toISOString(),
      o.fullName || '',
      o.phone || '',
      o.city || '',
      o.total || 0,
      o.status || 'pending',
      (o.items || []).map(i => `${i.name} ${i.size}/${i.color} x${i.quantity}`).join('; ')
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(','))].join('\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'orders-' + new Date().toISOString().slice(0, 10) + '.csv';
    a.click();
    URL.revokeObjectURL(a.href);
    showToast('تم تصدير الطلبات');
  });

  document.getElementById('btn-bulk-delete-orders')?.addEventListener('click', function () {
    const checked = document.querySelectorAll('.order-row-cb:checked');
    if (checked.length === 0) { showToast(getLang() === 'ar' ? 'حدد طلبات للحذف' : 'Select orders to delete'); return; }
    if (!confirm((getLang() === 'ar' ? 'حذف ' : 'Delete ') + checked.length + (getLang() === 'ar' ? ' طلب؟' : ' orders?'))) return;
    try {
      const ids = Array.from(checked).map(cb => cb.value);
      const orders = getOrdersList().filter(o => !ids.includes(o.id));
      if (typeof Store !== 'undefined') Store.setOrders(orders);
      showToast(getLang() === 'ar' ? 'تم الحذف' : 'Deleted');
      renderOrdersTable();
      renderDashboard();
      syncToGitHub().then(ok => { if (ok) { notifyOtherTabsSyncDone(); showToast(t('syncSuccess')); } else showToast(t('syncNotConfigured')); }).catch(() => showToast(t('syncFail')));
    } catch (e) {
      console.error('[admin] Bulk delete failed', e);
      showToast(getLang() === 'ar' ? 'فشل الحذف' : 'Delete failed');
    }
  });

  function deleteOrderById(id) {
    if (!id) return;
    if (!confirm(t('delete') + '?')) return;
    try {
      const orders = getOrdersList().filter(o => o.id !== id);
      if (typeof Store !== 'undefined') Store.setOrders(orders);
      showModal(orderModal, false);
      showToast(getLang() === 'ar' ? 'تم حذف الطلب' : 'Order deleted');
      renderOrdersTable();
      renderDashboard();
      syncToGitHub().then(ok => { if (ok) { notifyOtherTabsSyncDone(); showToast(t('syncSuccess')); } else showToast(t('syncNotConfigured')); }).catch(() => showToast(t('syncFail')));
    } catch (e) {
      console.error('[admin] Delete order failed', e);
      showToast(getLang() === 'ar' ? 'فشل الحذف' : 'Delete failed');
    }
  }

  let currentOrderIdInModal = null;
  function openOrderDetail(id) {
    const order = getOrderById(id);
    if (!order) return;
    currentOrderIdInModal = id;
    const body = document.getElementById('order-detail-body');
    const statusLabels = { pending: t('statusPending'), processing: t('statusConfirmed'), shipped: t('statusShipped'), delivered: t('statusDelivered'), cancelled: t('statusCancelled') };
    body.innerHTML = `
      <div class="order-detail-section">
        <h4>${t('contactInfo')}</h4>
        <p><strong>${t('customer')}:</strong> ${escapeHtml(order.fullName || '—')}</p>
        <p><strong>${t('phone')}:</strong> ${escapeHtml(order.phone || '—')}</p>
        <p><strong>${t('city')}:</strong> ${escapeHtml(order.city || '—')}</p>
        ${order.notes ? '<p><strong>Notes:</strong> ' + escapeHtml(order.notes) + '</p>' : ''}
      </div>
      <div class="order-detail-section">
        <h4>${t('products')}</h4>
        <ul class="order-detail-items">
          ${(order.items || []).map(i => `<li>${escapeHtml(i.name)} — ${i.size} / ${i.color} × ${i.quantity} = ${(i.price * i.quantity)} MAD</li>`).join('')}
        </ul>
      </div>
      <div class="order-detail-section">
        <h4>${t('total')}</h4>
        <p><strong>${order.total} MAD</strong></p>
        <p>${new Date(order.date).toLocaleString(getLang() === 'ar' ? 'ar-MA' : 'en-GB')}</p>
      </div>
    `;
    const statusSelect = document.getElementById('order-detail-status');
    statusSelect.innerHTML = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(s =>
      `<option value="${s}" ${order.status === s ? 'selected' : ''}>${statusLabels[s]}</option>`
    ).join('');
    showModal(orderModal, true);
  }

  document.getElementById('order-detail-save')?.addEventListener('click', function () {
    if (!currentOrderIdInModal) return;
    const statusSelect = document.getElementById('order-detail-status');
    const newStatus = statusSelect ? statusSelect.value : null;
    if (!newStatus) return;
    try {
      const orders = getOrdersList();
      const order = orders.find(o => o.id === currentOrderIdInModal);
      if (order) {
        order.status = newStatus;
        if (typeof Store !== 'undefined') Store.setOrders(orders);
      }
      showToast(t('save') + ' ✓');
      showModal(orderModal, false);
      renderOrdersTable();
      renderDashboard();
      syncToGitHub().then(ok => { if (ok) { notifyOtherTabsSyncDone(); showToast(t('syncSuccess')); } else showToast(t('syncNotConfigured')); }).catch(() => showToast(t('syncFail')));
    } catch (e) {
      console.error('[admin] Update order failed', e);
      showToast(getLang() === 'ar' ? 'فشل الحفظ' : 'Save failed');
    }
  });
  document.getElementById('order-detail-delete')?.addEventListener('click', function () {
    if (currentOrderIdInModal) deleteOrderById(currentOrderIdInModal);
  });

  orderModal.querySelector('.modal-backdrop')?.addEventListener('click', () => showModal(orderModal, false));
  orderModal.querySelector('.modal-close')?.addEventListener('click', () => showModal(orderModal, false));

  // —— Customers ——
  function getCustomersFromOrders() {
    const orders = getOrdersList();
    const byKey = {};
    orders.forEach(o => {
      const key = (o.phone || '').trim() || (o.fullName || '').trim() || 'unknown';
      if (!byKey[key]) byKey[key] = { fullName: o.fullName, phone: o.phone, city: o.city, orders: [] };
      byKey[key].orders.push(o);
    });
    return Object.values(byKey).sort((a, b) => b.orders.length - a.orders.length);
  }

  function renderCustomersList() {
    const list = document.getElementById('customers-list');
    const customers = getCustomersFromOrders();
    if (customers.length === 0) {
      list.innerHTML = '<p class="empty-state">' + t('noCustomers') + '</p>';
      return;
    }
    list.innerHTML = customers.map((c, i) => `
      <div class="customer-card" data-customer-index="${i}">
        <h3>${escapeHtml(c.fullName || c.phone || '—')}</h3>
        <p>${t('phone')}: ${escapeHtml(c.phone || '—')}</p>
        <p>${t('city')}: ${escapeHtml(c.city || '—')}</p>
        <p class="order-count">${c.orders.length} ${getLang() === 'ar' ? 'طلب' : 'orders'}</p>
      </div>
    `).join('');
    list.querySelectorAll('.customer-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.getAttribute('data-customer-index'), 10);
        const list = getCustomersFromOrders();
        if (list[idx]) openCustomerDetail(list[idx]);
      });
    });
  }

  function openCustomerDetail(customer) {
    const body = document.getElementById('customer-detail-body');
    body.innerHTML = `
      <div class="order-detail-section">
        <h4>${t('contactInfo')}</h4>
        <p><strong>${t('customer')}:</strong> ${escapeHtml(customer.fullName || '—')}</p>
        <p><strong>${t('phone')}:</strong> ${escapeHtml(customer.phone || '—')}</p>
        <p><strong>${t('city')}:</strong> ${escapeHtml(customer.city || '—')}</p>
      </div>
      <div class="order-detail-section">
        <h4>${t('orderHistory')}</h4>
        <ul class="order-detail-items">
          ${(customer.orders || []).map(o => `
            <li>
              <strong>${o.id}</strong> — ${new Date(o.date).toLocaleDateString(getLang() === 'ar' ? 'ar-MA' : 'en-GB')} — ${o.total} MAD
              <br><small>${(o.items || []).map(i => i.name + ' ×' + i.quantity).join(', ')}</small>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
    showModal(customerModal, true);
  }

  customerModal.querySelector('.modal-backdrop')?.addEventListener('click', () => showModal(customerModal, false));
  customerModal.querySelector('.modal-close')?.addEventListener('click', () => showModal(customerModal, false));

  // —— Floating Contact ——
  function renderFloatingContact() {
    const fc = typeof Store !== 'undefined' && Store.getFloatingContact ? Store.getFloatingContact() : {};
    const container = document.getElementById('floating-contact-fields');
    if (!container) return;
    container.innerHTML = `
      <div class="form-group form-group-full">
        <label class="checkbox-label">
          <input type="checkbox" id="fc-enabled" ${fc.enabled !== false ? 'checked' : ''} />
          <span>${t('floatingContactEnabled')}</span>
        </label>
      </div>
      <div class="form-group">
        <label for="fc-phone">${t('floatingContactPhone')}</label>
        <input type="tel" id="fc-phone" value="${escapeHtml(fc.phoneNumber || '+212679460301')}" placeholder="${t('floatingContactPhonePlaceholder')}" />
      </div>
      <div class="form-group">
        <label for="fc-type">${t('floatingContactType')}</label>
        <select id="fc-type">
          <option value="phone" ${fc.buttonType === 'phone' ? 'selected' : ''}>${t('floatingContactTypePhone')}</option>
          <option value="whatsapp" ${(fc.buttonType || 'whatsapp') === 'whatsapp' ? 'selected' : ''}>${t('floatingContactTypeWhatsApp')}</option>
          <option value="telegram" ${fc.buttonType === 'telegram' ? 'selected' : ''}>${t('floatingContactTypeTelegram')}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="fc-position">${t('floatingContactPosition')}</label>
        <select id="fc-position">
          <option value="right" ${(fc.position || 'right') === 'right' ? 'selected' : ''}>${t('floatingContactPositionRight')}</option>
          <option value="left" ${fc.position === 'left' ? 'selected' : ''}>${t('floatingContactPositionLeft')}</option>
        </select>
      </div>
      <div class="form-group form-group-full">
        <label for="fc-message">${t('floatingContactMessage')}</label>
        <input type="text" id="fc-message" value="${escapeHtml(fc.defaultMessage || "Hi Black T-Shirt, I'd like to order a T-shirt.")}" placeholder="Default pre-filled message for chat" />
      </div>
    `;
  }

  document.getElementById('btn-save-floating-contact')?.addEventListener('click', function () {
    if (actionInProgress) return;
    setActionInProgress(true);
    try {
      const fc = typeof Store !== 'undefined' && Store.getFloatingContact ? Store.getFloatingContact() : {};
      fc.enabled = document.getElementById('fc-enabled')?.checked !== false;
      fc.phoneNumber = (document.getElementById('fc-phone')?.value || '').trim().replace(/\s/g, '') || '+212679460301';
      fc.buttonType = document.getElementById('fc-type')?.value || 'whatsapp';
      fc.position = document.getElementById('fc-position')?.value || 'right';
      fc.defaultMessage = (document.getElementById('fc-message')?.value || '').trim() || "Hi Black T-Shirt, I'd like to order a T-shirt.";
      if (typeof Store !== 'undefined' && Store.setFloatingContact) Store.setFloatingContact(fc);
      showToast(getLang() === 'ar' ? 'تم حفظ إعدادات زر الاتصال — التحديث يظهر فوراً على الموقع' : 'Floating contact settings saved — refresh the site to see changes');
      syncToGitHub().then(ok => { if (ok) { notifyOtherTabsSyncDone(); showToast(t('syncSuccess')); } else showToast(t('syncNotConfigured')); }).catch(() => showToast(t('syncFail')));
    } catch (err) {
      console.error('[admin] Save floating contact failed', err);
      showToast(getLang() === 'ar' ? 'فشل الحفظ' : 'Save failed');
    } finally {
      setActionInProgress(false);
    }
  });

  // —— Content ——
  function renderContentTabs() {
    const content = Store.getContent();
    // Home
    const home = content.home || {};
    document.getElementById('content-home-fields').innerHTML = [
      { key: 'heroEyebrow', label: 'نص أعلى البانر' },
      { key: 'heroTitle', label: 'عنوان البانر' },
      { key: 'heroSubtitle', label: 'نص تحت العنوان' },
      { key: 'heroCtaPrice', label: 'سعر زر الطلب' },
      { key: 'feature1Title', label: 'عنوان الميزة 1' },
      { key: 'feature1Text', label: 'نص الميزة 1' },
      { key: 'feature2Title', label: 'عنوان الميزة 2' },
      { key: 'feature2Text', label: 'نص الميزة 2' },
      { key: 'feature3Title', label: 'عنوان الميزة 3' },
      { key: 'feature3Text', label: 'نص الميزة 3' },
      { key: 'stripTitle', label: 'عنوان الشريط' },
      { key: 'stripText', label: 'نص الشريط' }
    ].map(f => `<div class="form-group"><label>${f.label}</label><input type="text" data-key="home.${f.key}" value="${escapeHtml(home[f.key] || '')}" /></div>`).join('');

    // About
    const about = content.about || {};
    const aboutMapHtml = [
      { key: 'eyebrow', label: 'نص أعلى الصفحة' },
      { key: 'title', label: 'العنوان' },
      { key: 'subtitle', label: 'النص الفرعي' },
      { key: 'storyTitle', label: 'عنوان القصة' },
      { key: 'storyP1', label: 'فقرة القصة 1' },
      { key: 'storyP2', label: 'فقرة القصة 2' },
      { key: 'valuesTitle', label: 'عنوان القيم' },
      { key: 'location', label: 'الموقع / العنوان الفعلي' },
      { key: 'businessType', label: 'نوع النشاط' },
      { key: 'priceInfo', label: 'معلومات السعر' },
      { key: 'deliveryInfo', label: 'معلومات التوصيل' }
    ].map(f => `<div class="form-group"><label>${f.label}</label><input type="text" data-key="about.${f.key}" value="${escapeHtml(about[f.key] || '')}" /></div>`).join('');

    const mapZoom = Math.min(21, Math.max(1, parseInt(about.mapZoom, 10) || 14));
    const mapSectionHtml = `
      <div class="form-group form-group-full">
        <h3 class="form-subsection-title">${t('mapSectionTitle')}</h3>
        <p class="form-hint">${t('mapSectionHint')}</p>
      </div>
      <div class="form-group form-group-full">
        <label for="about-map-link">${t('mapLinkPlaceholder')}</label>
        <div class="map-link-row">
          <input type="url" id="about-map-link" placeholder="https://www.google.com/maps/place/.../@30.92,-6.89,17z" />
          <button type="button" class="btn btn-secondary" id="about-map-parse">${t('mapParseLink')}</button>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="about-map-lat">${t('mapLat')}</label>
          <input type="number" id="about-map-lat" data-key="about.mapLat" step="any" value="${escapeHtml(String(about.mapLat != null ? about.mapLat : 30.9198))}" placeholder="30.9198" />
        </div>
        <div class="form-group">
          <label for="about-map-lng">${t('mapLng')}</label>
          <input type="number" id="about-map-lng" data-key="about.mapLng" step="any" value="${escapeHtml(String(about.mapLng != null ? about.mapLng : -6.8926))}" placeholder="-6.8926" />
        </div>
      </div>
      <div class="form-group">
        <label for="about-map-zoom">${t('mapZoom')}</label>
        <input type="number" id="about-map-zoom" data-key="about.mapZoom" min="1" max="21" value="${mapZoom}" />
      </div>
    `;
    document.getElementById('content-about-fields').innerHTML = aboutMapHtml + mapSectionHtml;

    function applyParsedMapLink() {
      const linkInput = document.getElementById('about-map-link');
      const url = linkInput?.value?.trim() || '';
      const parsed = parseGoogleMapsUrl(url);
      if (parsed) {
        const latEl = document.getElementById('about-map-lat');
        const lngEl = document.getElementById('about-map-lng');
        const zoomEl = document.getElementById('about-map-zoom');
        if (latEl) latEl.value = String(parsed.lat);
        if (lngEl) lngEl.value = String(parsed.lng);
        if (zoomEl) zoomEl.value = String(parsed.zoom);
        return true;
      }
      return false;
    }
    document.getElementById('about-map-parse')?.addEventListener('click', function () {
      if (applyParsedMapLink()) showToast(getLang() === 'ar' ? 'تم استخراج الموقع' : 'Location parsed');
      else showToast(getLang() === 'ar' ? 'تعذر استخراج الموقع من الرابط. أدخل الإحداثيات يدوياً.' : 'Could not parse link. Enter coordinates manually.');
    });
    document.getElementById('about-map-link')?.addEventListener('blur', function () {
      if (this.value.trim()) applyParsedMapLink();
    });

    // Contact
    const contact = content.contact || {};
    document.getElementById('content-contact-fields').innerHTML = [
      { key: 'eyebrow', label: 'نص أعلى الصفحة' },
      { key: 'title', label: 'العنوان' },
      { key: 'subtitle', label: 'النص الفرعي' },
      { key: 'talkTitle', label: 'عنوان "تواصل معنا"' },
      { key: 'talkText', label: 'نص التواصل' },
      { key: 'phone', label: 'الهاتف' },
      { key: 'email', label: 'البريد' },
      { key: 'location', label: 'الموقع' },
      { key: 'businessType', label: 'نوع النشاط' },
      { key: 'priceInfo', label: 'معلومات السعر' }
    ].map(f => `<div class="form-group"><label>${f.label}</label><input type="text" data-key="contact.${f.key}" value="${escapeHtml(contact[f.key] || '')}" /></div>`).join('');

    // Banners
    const banners = content.banners || [];
    document.getElementById('banners-list').innerHTML = banners.map((b, i) => `
      <div class="banner-item" data-index="${i}">
        <img src="${b.url || b}" alt="" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%2270%22%3E%3Crect fill=%22%23222%22 width=%22120%22 height=%2270%22/%3E%3C/svg%3E'" />
        <input type="text" value="${typeof b === 'string' ? b : (b.url || '')}" placeholder="رابط الصورة" data-index="${i}" />
        <button type="button" class="remove-banner" data-index="${i}">حذف</button>
      </div>
    `).join('');
    document.getElementById('banners-list').querySelectorAll('.remove-banner').forEach(btn => {
      btn.addEventListener('click', function () {
        const content = Store.getContent();
        content.banners = content.banners || [];
        content.banners.splice(parseInt(this.getAttribute('data-index'), 10), 1);
        Store.setContent(content);
        renderContentTabs();
      });
    });
    document.getElementById('banners-list').querySelectorAll('input[data-index]').forEach(input => {
      input.addEventListener('change', function () {
        const content = Store.getContent();
        content.banners = content.banners || [];
        const i = parseInt(this.getAttribute('data-index'), 10);
        if (typeof content.banners[i] === 'object') content.banners[i].url = this.value;
        else content.banners[i] = this.value;
        Store.setContent(content);
      });
    });
  }

  document.getElementById('btn-add-banner')?.addEventListener('click', function () {
    const content = Store.getContent();
    content.banners = content.banners || [];
    content.banners.push('');
    Store.setContent(content);
    renderContentTabs();
  });

  document.getElementById('btn-save-content')?.addEventListener('click', function () {
    const latEl = document.getElementById('about-map-lat');
    const lngEl = document.getElementById('about-map-lng');
    const zoomEl = document.getElementById('about-map-zoom');
    if (latEl && lngEl && zoomEl && !validateMapFields(latEl.value, lngEl.value, zoomEl.value)) {
      showToast(t('invalidMapData') + ' ' + t('mapDataRequired'));
      return;
    }
    const content = Store.getContent();
    document.querySelectorAll('#content-home-fields input[data-key], #content-about-fields input[data-key], #content-contact-fields input[data-key]').forEach(input => {
      const key = input.getAttribute('data-key');
      const [page, field] = key.split('.');
      if (!content[page]) content[page] = {};
      content[page][field] = input.value;
    });
    Store.setContent(content);
    showToast(getLang() === 'ar' ? 'تم حفظ المحتوى — التحديث يظهر فوراً على الموقع' : 'Content saved — updates appear on the site');
    syncToGitHub().then(ok => { if (ok) { notifyOtherTabsSyncDone(); showToast(t('syncSuccess')); } else showToast(t('syncNotConfigured')); }).catch(() => showToast(t('syncFail')));
  });

  // Content tabs
  document.querySelectorAll('.tab[data-tab]').forEach(tab => {
    tab.addEventListener('click', function () {
      const tabId = this.getAttribute('data-tab');
      document.querySelectorAll('.tab[data-tab]').forEach(t => t.classList.toggle('active', t === this));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === tabId));
    });
  });

  // —— Design ——
  function renderDesign() {
    const design = Store.getDesign();
    document.getElementById('design-fields').innerHTML = `
      <div class="form-group">
        <label>لون التمييز (الأزرار والعناوين)</label>
        <input type="color" id="design-accent" value="${design.accentColor || '#f5c96a'}" style="width:80px;height:44px;padding:4px;border-radius:10px;border:1px solid rgba(255,255,255,0.2);cursor:pointer" />
      </div>
      <div class="form-group">
        <label>نص الشعار</label>
        <input type="text" id="design-logo" value="${escapeHtml(design.logoText || 'Black T-Shirt')}" />
      </div>
      <div class="form-group">
        <label>اللغة الافتراضية للموقع</label>
        <select id="design-default-lang">
          <option value="en" ${(design.defaultLang || 'en') === 'en' ? 'selected' : ''}>English</option>
          <option value="ar" ${(design.defaultLang || '') === 'ar' ? 'selected' : ''}>العربية</option>
        </select>
      </div>
    `;
    const pc = design.productCard || {};
    const pcEl = document.getElementById('design-product-card-fields');
    if (pcEl) {
      pcEl.innerHTML = `
        <div class="form-group"><label>خلفية شارة التخفيض</label><input type="color" id="design-pc-discountBadgeBg" value="${pc.discountBadgeBg || '#e53935'}" style="width:64px;height:36px;padding:2px;border-radius:8px;cursor:pointer" /></div>
        <div class="form-group"><label>لون نص شارة التخفيض</label><input type="color" id="design-pc-discountBadgeColor" value="${pc.discountBadgeColor || '#ffffff'}" style="width:64px;height:36px;padding:2px;border-radius:8px;cursor:pointer" /></div>
        <div class="form-group"><label>لون السعر الجديد</label><input type="color" id="design-pc-priceNewColor" value="${pc.priceNewColor || '#f5c96a'}" style="width:64px;height:36px;padding:2px;border-radius:8px;cursor:pointer" /></div>
        <div class="form-group"><label>لون السعر القديم</label><input type="color" id="design-pc-priceOldColor" value="${pc.priceOldColor || '#888888'}" style="width:64px;height:36px;padding:2px;border-radius:8px;cursor:pointer" /></div>
        <div class="form-group"><label>خلفية البطاقة</label><input type="text" id="design-pc-cardBg" value="${escapeHtml(pc.cardBg || 'rgba(10, 10, 10, 0.96)')}" placeholder="مثلاً rgba(10,10,10,0.96)" /></div>
        <div class="form-group"><label>حد البطاقة</label><input type="text" id="design-pc-cardBorder" value="${escapeHtml(pc.cardBorder || 'rgba(255,255,255,0.06)')}" placeholder="مثلاً rgba(255,255,255,0.06)" /></div>
        <div class="form-group"><label>خط البطاقة</label><input type="text" id="design-pc-fontFamily" value="${escapeHtml(pc.fontFamily || 'Poppins, system-ui, sans-serif')}" placeholder="Poppins, sans-serif" /></div>
        <div class="form-group"><label>عدد الأعمدة (شاشة كبيرة)</label><input type="number" id="design-pc-gridColumnsDesktop" min="2" max="6" value="${pc.gridColumnsDesktop != null ? pc.gridColumnsDesktop : 4}" /></div>
        <div class="form-group"><label>عدد الأعمدة (جوال)</label><input type="number" id="design-pc-gridColumnsMobile" min="1" max="4" value="${pc.gridColumnsMobile != null ? pc.gridColumnsMobile : 2}" /></div>
      `;
    }
    const categories = design.productCategories || ['All', 'T-Shirts', 'Hoodies', 'Accessories'];
    const catListEl = document.getElementById('design-categories-list');
    if (catListEl) {
      catListEl.innerHTML = categories.map((c, i) => `
        <div class="category-chip" data-index="${i}">
          <span>${escapeHtml(c)}</span>
          ${c === 'All' ? '' : '<button type="button" class="btn-remove-category" data-index="' + i + '" aria-label="حذف">×</button>'}
        </div>
      `).join('');
      catListEl.querySelectorAll('.btn-remove-category').forEach(btn => {
        btn.addEventListener('click', function () {
          const idx = parseInt(this.getAttribute('data-index'), 10);
          const cat = (Store.getDesign().productCategories || []).slice();
          if (cat[idx] === 'All') return;
          cat.splice(idx, 1);
          const d = Store.getDesign();
          d.productCategories = cat;
          Store.setDesign(d);
          renderDesign();
        });
      });
    }
    const orderEl = document.getElementById('design-product-order');
    if (orderEl) {
      const order = design.productOrder || [];
      const products = Store.getProducts();
      const orderIds = order.length ? order : products.map(p => p.id);
      orderEl.innerHTML = orderIds.map(pid => {
        const p = products.find(pr => pr.id === pid);
        return p ? `<li class="product-order-item" draggable="true" data-id="${escapeHtml(pid)}">${escapeHtml(p.name)}</li>` : '';
      }).filter(Boolean).join('');
      orderEl.querySelectorAll('.product-order-item').forEach(li => {
        li.addEventListener('dragstart', e => { e.dataTransfer.setData('text/plain', li.getAttribute('data-id')); li.classList.add('dragging'); });
        li.addEventListener('dragend', () => li.classList.remove('dragging'));
        li.addEventListener('dragover', e => { e.preventDefault(); const drag = orderEl.querySelector('.dragging'); if (drag && drag !== li) li.parentNode.insertBefore(drag, li); });
      });
    }
    const toggles = document.getElementById('section-toggles-list');
    const sections = design.sections || { hero: true, features: true, strip: true, testimonials: true, infoStrip: true };
    const labels = { hero: 'قسم البانر الرئيسي', features: 'قسم المميزات', strip: 'الشريط الإعلاني', testimonials: 'آراء العملاء', infoStrip: 'شريط المعلومات' };
    toggles.innerHTML = Object.keys(labels).map(key => `
      <label class="checkbox-label">
        <input type="checkbox" data-section="${key}" ${sections[key] !== false ? 'checked' : ''} />
        <span>${labels[key]}</span>
      </label>
    `).join('');
  }

  document.getElementById('btn-add-category')?.addEventListener('click', function () {
    const input = document.getElementById('design-category-new');
    const name = (input?.value || '').trim();
    if (!name) return;
    const d = Store.getDesign();
    d.productCategories = d.productCategories || ['All'];
    if (d.productCategories.includes(name)) { showToast(getLang() === 'ar' ? 'الفئة موجودة' : 'Category exists'); return; }
    d.productCategories.push(name);
    Store.setDesign(d);
    if (input) input.value = '';
    renderDesign();
  });

  document.getElementById('btn-save-design')?.addEventListener('click', function () {
    const design = Store.getDesign();
    design.accentColor = document.getElementById('design-accent').value;
    design.logoText = document.getElementById('design-logo').value.trim() || 'Black T-Shirt';
    const langEl = document.getElementById('design-default-lang');
    design.defaultLang = langEl ? langEl.value : 'en';
    design.sections = design.sections || {};
    document.querySelectorAll('#section-toggles-list input[data-section]').forEach(cb => {
      design.sections[cb.getAttribute('data-section')] = cb.checked;
    });
    design.productCard = design.productCard || {};
    const pc = design.productCard;
    const pcBg = document.getElementById('design-pc-discountBadgeBg');
    if (pcBg) pc.discountBadgeBg = pcBg.value;
    const pcColor = document.getElementById('design-pc-discountBadgeColor');
    if (pcColor) pc.discountBadgeColor = pcColor.value;
    const pcNew = document.getElementById('design-pc-priceNewColor');
    if (pcNew) pc.priceNewColor = pcNew.value;
    const pcOld = document.getElementById('design-pc-priceOldColor');
    if (pcOld) pc.priceOldColor = pcOld.value;
    const pcCardBg = document.getElementById('design-pc-cardBg');
    if (pcCardBg) pc.cardBg = pcCardBg.value.trim() || 'rgba(10, 10, 10, 0.96)';
    const pcCardBorder = document.getElementById('design-pc-cardBorder');
    if (pcCardBorder) pc.cardBorder = pcCardBorder.value.trim() || 'rgba(255, 255, 255, 0.06)';
    const pcFont = document.getElementById('design-pc-fontFamily');
    if (pcFont) pc.fontFamily = pcFont.value.trim() || 'Poppins, system-ui, sans-serif';
    const pcColsD = document.getElementById('design-pc-gridColumnsDesktop');
    if (pcColsD) pc.gridColumnsDesktop = Math.min(6, Math.max(2, parseInt(pcColsD.value, 10) || 4));
    const pcColsM = document.getElementById('design-pc-gridColumnsMobile');
    if (pcColsM) pc.gridColumnsMobile = Math.min(4, Math.max(1, parseInt(pcColsM.value, 10) || 2));
    const orderList = document.getElementById('design-product-order');
    if (orderList) {
      design.productOrder = Array.from(orderList.querySelectorAll('.product-order-item')).map(li => li.getAttribute('data-id')).filter(Boolean);
    }
    Store.setDesign(design);
    showToast(getLang() === 'ar' ? 'تم حفظ التصميم — التحديث يظهر فوراً على الموقع' : 'Design saved');
    syncToGitHub().then(ok => { if (ok) { notifyOtherTabsSyncDone(); showToast(t('syncSuccess')); } else showToast(t('syncNotConfigured')); }).catch(() => showToast(t('syncFail')));
  });

  // —— GitHub Sync ——
  function renderSyncSection() {
    const config = getGitHubSyncConfig();
    const ordersApiUrl = (typeof Store !== 'undefined' && Store.getOrdersApiUrl) ? Store.getOrdersApiUrl() : '';
    const container = document.getElementById('sync-fields');
    if (!container) return;
    container.innerHTML = `
      <div class="form-group">
        <label for="sync-token" data-i18n="syncToken">رمز GitHub (Token)</label>
        <input type="password" id="sync-token" value="${escapeHtml(config.token || '')}" placeholder="${t('syncTokenPlaceholder')}" autocomplete="off" />
      </div>
      <div class="form-group">
        <label for="sync-owner" data-i18n="syncOwner">مالك المستودع</label>
        <input type="text" id="sync-owner" value="${escapeHtml(config.owner || '')}" placeholder="${t('syncOwnerPlaceholder')}" />
      </div>
      <div class="form-group">
        <label for="sync-repo" data-i18n="syncRepo">اسم المستودع</label>
        <input type="text" id="sync-repo" value="${escapeHtml(config.repo || '')}" placeholder="${t('syncRepoPlaceholder')}" />
      </div>
      <div class="form-group">
        <label for="sync-branch" data-i18n="syncBranch">الفرع</label>
        <input type="text" id="sync-branch" value="${escapeHtml(config.branch || 'main')}" placeholder="${t('syncBranchPlaceholder')}" />
      </div>
      <div class="form-group">
        <label for="sync-orders-api-url" data-i18n="syncOrdersApiUrl">Orders API URL</label>
        <input type="url" id="sync-orders-api-url" value="${escapeHtml(ordersApiUrl || '')}" placeholder="${t('syncOrdersApiPlaceholder')}" />
        <p class="form-hint">${getLang() === 'ar' ? 'اختياري: لظهور الطلبات من أي جهة أو متصفح، انشر واجهة الطلبات (مثلاً Vercel) ثم الصق الرابط هنا.' : 'Optional: For orders to appear from any device/browser, deploy the Orders API (e.g. Vercel) and paste its URL here.'}</p>
      </div>
      <div class="form-group">
        <button type="button" class="btn btn-primary" id="btn-save-sync-config" data-i18n="syncSaveConfig">حفظ الإعدادات</button>
      </div>
    `;
    document.getElementById('btn-save-sync-config')?.addEventListener('click', function () {
      const token = (document.getElementById('sync-token')?.value || '').trim();
      const owner = (document.getElementById('sync-owner')?.value || '').trim();
      const repo = (document.getElementById('sync-repo')?.value || '').trim();
      const branch = (document.getElementById('sync-branch')?.value || 'main').trim() || 'main';
      setGitHubSyncConfig({ token, owner, repo, branch });
      const ordersApiVal = (document.getElementById('sync-orders-api-url')?.value || '').trim();
      if (typeof Store !== 'undefined' && Store.setOrdersApiUrl) Store.setOrdersApiUrl(ordersApiVal);
      showToast(getLang() === 'ar' ? 'تم حفظ إعدادات المزامنة' : 'Sync settings saved');
    });
  }

  document.getElementById('btn-sync-now')?.addEventListener('click', function () {
    if (actionInProgress) return;
    setActionInProgress(true);
    syncToGitHub()
      .then(ok => {
        if (ok) { notifyOtherTabsSyncDone(); showToast(t('syncSuccess')); }
        else showToast(t('syncNotConfigured'));
      })
      .catch(() => showToast(t('syncFail')))
      .finally(() => setActionInProgress(false));
  });

  function escapeHtml(str) {
    if (str == null) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
})();
