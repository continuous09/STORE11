/**
 * Site language: Arabic (RTL) / English (LTR).
 * Toggle in header updates content and product labels.
 */
(function () {
  var LANG_KEY = 'blackTShirtLang';

  var translations = {
    en: {
      home: 'Home',
      products: 'Products',
      about: 'About',
      shipping: 'Shipping',
      contact: 'Contact',
      orderNow: 'Order Now',
      viewProducts: 'View Products',
      cart: 'Cart',
      addToCart: 'Add to Order',
      buyNow: 'Buy Now',
      checkout: 'Checkout',
      yourOrder: 'Your Order',
      emptyCart: 'Your cart is empty',
      browseProducts: 'Browse Products',
      total: 'Total',
      proceedToCheckout: 'Proceed to Checkout',
      size: 'Size',
      color: 'Color',
      quantity: 'Quantity',
    fullName: 'Full Name',
    phone: 'Phone Number',
    city: 'City / Delivery Location',
    notes: 'Additional Notes (Optional)',
    fullNamePlaceholder: 'Enter your full name',
    notesPlaceholder: 'Any special delivery instructions or notes...',
      confirmOrder: 'Confirm Order',
      submitting: 'Submitting...',
      orderSuccess: 'Order submitted successfully! We will contact you soon.',
      orderError: 'There was an error submitting your order. Please try again or contact us directly.',
      sizeGuide: 'Size guide',
      measurements: 'Measurements'
    },
    ar: {
      home: 'الرئيسية',
      products: 'المنتجات',
      about: 'من نحن',
      shipping: 'الشحن',
      contact: 'اتصل بنا',
      orderNow: 'اطلب الآن',
      viewProducts: 'عرض المنتجات',
      cart: 'السلة',
      addToCart: 'أضف للطلب',
      buyNow: 'اشتري الآن',
      checkout: 'الدفع',
      yourOrder: 'طلبك',
      emptyCart: 'سلة التسوق فارغة',
      browseProducts: 'تصفح المنتجات',
      total: 'المجموع',
      proceedToCheckout: 'المتابعة للدفع',
      size: 'المقاس',
      color: 'اللون',
      quantity: 'الكمية',
    fullName: 'الاسم الكامل',
    phone: 'رقم الهاتف',
    city: 'المدينة / موقع التوصيل',
    notes: 'ملاحظات إضافية (اختياري)',
    fullNamePlaceholder: 'أدخل اسمك الكامل',
    notesPlaceholder: 'تعليمات توصيل أو ملاحظات...',
      confirmOrder: 'تأكيد الطلب',
      submitting: 'جاري الإرسال...',
      orderSuccess: 'تم إرسال الطلب بنجاح! سنتواصل معك قريباً.',
      orderError: 'حدث خطأ في إرسال الطلب. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.',
      sizeGuide: 'دليل المقاسات',
      measurements: 'القياسات'
    }
  };

  var currentLang = localStorage.getItem(LANG_KEY);
  if (!currentLang && typeof Store !== 'undefined' && Store.getDesign) {
    var design = Store.getDesign();
    currentLang = (design && design.defaultLang) ? design.defaultLang : 'en';
  }
  if (!currentLang) currentLang = 'en';

  function setLanguage(lang) {
    if (lang !== 'en' && lang !== 'ar') lang = 'en';
    currentLang = lang;
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (e) {}
    document.documentElement.lang = lang === 'ar' ? 'ar' : 'en';
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    document.querySelectorAll('[data-translate]').forEach(function (el) {
      var key = el.getAttribute('data-translate');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    document.querySelectorAll('[data-translate-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-translate-placeholder');
      if (translations[lang] && translations[lang][key]) {
        el.placeholder = translations[lang][key];
      }
    });

    try {
      window.dispatchEvent(new CustomEvent('languageChange', { detail: { lang: lang } }));
    } catch (e) {}
    if (typeof renderCart === 'function') renderCart();
  }

  function t(key) {
    return (translations[currentLang] && translations[currentLang][key]) || (translations.en[key]) || key;
  }

  function getSiteLang() {
    return currentLang;
  }

  window.setLanguage = setLanguage;
  window.getSiteLang = getSiteLang;
  window.t = t;
  window.translations = translations;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setLanguage(currentLang);
    });
  } else {
    setLanguage(currentLang);
  }
})();
