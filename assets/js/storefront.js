/**
 * Storefront - Reads from Store; applies design, content, language-aware products and size chart.
 */
(function () {
  if (typeof Store === 'undefined') return;

  function getLang() {
    return (typeof getSiteLang === 'function' && getSiteLang()) || 'en';
  }

  function applyDesign() {
    var design = Store.getDesign();
    if (!design) return;
    var root = document.documentElement;
    if (design.accentColor) {
      root.style.setProperty('--accent', design.accentColor);
      root.style.setProperty('--accent-soft', design.accentColor + '26');
    }
    if (design.sections) {
      Object.keys(design.sections).forEach(function (key) {
        var el = document.querySelector('[data-section="' + key + '"]');
        if (el) el.style.display = design.sections[key] === false ? 'none' : '';
      });
    }
    if (design.logoText) {
      var logoText = document.querySelector('.logo-text');
      if (logoText) logoText.textContent = design.logoText;
    }
    var pc = design.productCard;
    if (pc) {
      if (pc.discountBadgeBg) root.style.setProperty('--product-discount-badge-bg', pc.discountBadgeBg);
      if (pc.discountBadgeColor) root.style.setProperty('--product-discount-badge-color', pc.discountBadgeColor);
      if (pc.priceNewColor) root.style.setProperty('--product-price-new-color', pc.priceNewColor);
      if (pc.priceOldColor) root.style.setProperty('--product-price-old-color', pc.priceOldColor);
      if (pc.cardBg) root.style.setProperty('--product-card-bg', pc.cardBg);
      if (pc.cardBorder) root.style.setProperty('--product-card-border', pc.cardBorder);
      if (pc.fontFamily) root.style.setProperty('--product-card-font', pc.fontFamily);
      if (pc.gridColumnsDesktop != null) root.style.setProperty('--product-grid-cols-desktop', String(pc.gridColumnsDesktop));
      if (pc.gridColumnsMobile != null) root.style.setProperty('--product-grid-cols-mobile', String(pc.gridColumnsMobile));
    }
  }

  function applyContent() {
    var content = Store.getContent();
    if (!content) return;
    var lang = getLang();
    document.querySelectorAll('[data-content]').forEach(function (el) {
      var path = el.getAttribute('data-content');
      var parts = path.split('.');
      var val = content;
      for (var i = 0; i < parts.length && val; i++) val = val[parts[i]];
      if (val == null || typeof val !== 'string') return;
      el.textContent = val;
      if (el.tagName === 'A' && path === 'contact.phone') el.setAttribute('href', 'tel:' + val.replace(/\s/g, ''));
      if (el.tagName === 'A' && path === 'contact.email') el.setAttribute('href', 'mailto:' + val);
    });
  }

  function discountPercent(regular, discount) {
    if (regular <= 0 || discount >= regular) return 0;
    var pct = Math.round((1 - discount / regular) * 100);
    return Math.max(1, Math.min(100, pct));
  }

  function renderProducts() {
    var grid = document.getElementById('products-grid');
    if (!grid) return;
    var products = Store.getVisibleProducts();
    if (!products.length) return;
    var lang = getLang();
    var isAr = lang === 'ar';
    var isHome = grid.classList.contains('products-grid--home');

    if (isHome) {
      // Homepage: each card links directly to that product's detail page (products.html#id).
      // Do not use /products, /shop, or /store — only product-specific URLs.
      grid.innerHTML = products.map(function (p) {
        var price = p.discountPrice != null ? p.discountPrice : p.regularPrice;
        var hasDiscount = p.discountPrice != null && p.discountPrice < p.regularPrice;
        var pct = hasDiscount ? discountPercent(p.regularPrice, p.discountPrice) : 0;
        var discountBadgeHtml = pct > 0 ? '<span class="product-discount-badge">-' + pct + '%</span>' : '';
        var img = (p.images && p.images[0]) || '';
        var name = (isAr && p.nameAr) ? p.nameAr : (p.name || '');
        var priceDisplay = hasDiscount
          ? '<span class="price">' + p.discountPrice + ' MAD</span><span class="price-old">' + p.regularPrice + ' MAD</span>'
          : '<span class="price">' + price + ' MAD</span>';
        var lblBuy = (typeof t === 'function' && t('buyNow')) ? t('buyNow') : 'Buy Now';
        var productDetailUrl = './products.html#' + encodeURIComponent(p.id);
        return (
          '<a href="' + productDetailUrl + '" class="product-card product-card--compact" data-product-id="' + p.id + '" data-product-detail-link="true">' +
            '<div class="product-card__image">' +
              discountBadgeHtml +
              '<img src="' + (img || '') + '" alt="' + (name ? (name + ' — Black T-Shirt, premium black tee Morocco').replace(/"/g, '&quot;') : 'Black T-Shirt product').replace(/"/g, '&quot;') + '" loading="lazy" decoding="async" />' +
            '</div>' +
            '<div class="product-card__content">' +
              '<h2 class="product-card__title">' + (name || '').replace(/</g, '&lt;') + '</h2>' +
              '<div class="product-card__price">' + priceDisplay + '</div>' +
              '<span class="btn btn-primary product-card__cta" role="link" aria-label="' + (lblBuy + ' — ' + (name || p.id)).replace(/"/g, '&quot;') + '">' + lblBuy + '</span>' +
            '</div>' +
          '</a>'
        );
      }).join('');
      return;
    }

    grid.innerHTML = products.map(function (p) {
      var price = p.discountPrice != null ? p.discountPrice : p.regularPrice;
      var hasDiscount = p.discountPrice != null && p.discountPrice < p.regularPrice;
      var pct = hasDiscount ? discountPercent(p.regularPrice, p.discountPrice) : 0;
      var discountBadgeHtml = pct > 0 ? '<span class="product-discount-badge">-' + pct + '%</span>' : '';
      var img = (p.images && p.images[0]) || '';
      var sizeName = 'size-' + p.id;
      var colorName = 'color-' + p.id;
      var sizesHtml = (p.sizes || ['S', 'M', 'L', 'XL']).map(function (s) {
        return '<label class="selector-option"><input type="radio" name="' + sizeName + '" value="' + s + '" required><span>' + s + '</span></label>';
      }).join('');
      var colorsHtml = (p.colors || [{ name: 'Deep Black', hex: '#000' }]).map(function (c) {
        return '<label class="selector-option color-option"><input type="radio" name="' + colorName + '" value="' + c.name + '" required><span class="color-swatch" style="background:' + (c.hex || '#000') + '"></span><span>' + c.name + '</span></label>';
      }).join('');
      var priceDisplay = hasDiscount
        ? '<div class="product-price-block"><span class="price">' + p.discountPrice + ' MAD</span><span class="price-old">' + p.regularPrice + ' MAD</span></div>'
        : '<div class="product-price-block"><span class="price">' + price + ' MAD</span></div>';
      var name = (isAr && p.nameAr) ? p.nameAr : (p.name || '');
      var desc = (isAr && p.descriptionAr) ? p.descriptionAr : (p.description || '');
      var lblSize = (typeof t === 'function' && t('size')) ? t('size') : 'Size';
      var lblColor = (typeof t === 'function' && t('color')) ? t('color') : 'Color';
      var lblQty = (typeof t === 'function' && t('quantity')) ? t('quantity') : 'Quantity';
      var lblAdd = (typeof t === 'function' && t('addToCart')) ? t('addToCart') : 'Add to Order';
      var lblBuy = (typeof t === 'function' && t('buyNow')) ? t('buyNow') : 'Buy Now';
      var safeName = (name || '').replace(/</g, '&lt;').replace(/'/g, "\\'");
      var safeDesc = (desc || '').replace(/</g, '&lt;');
      return (
        '<article class="product-card" data-product-id="' + p.id + '">' +
          '<div class="product-image">' +
            discountBadgeHtml +
            '<img src="' + (img || '') + '" alt="' + (name ? (name + ' — Black T-Shirt, premium black tee Morocco').replace(/"/g, '&quot;') : 'Black T-Shirt product').replace(/"/g, '&quot;') + '" loading="lazy" decoding="async" />' +
          '</div>' +
          '<div class="product-body">' +
            '<h2>' + (name || '').replace(/</g, '&lt;') + '</h2>' +
            '<p>' + safeDesc + '</p>' +
            (p.meta && p.meta.length ? '<ul class="product-meta"><li>' + p.meta.join('</li><li>') + '</li></ul>' : '') +
            '<div class="product-selector size-selector"><label>' + lblSize + ':</label><div class="selector-options">' + sizesHtml + '</div></div>' +
            '<div class="product-selector color-selector"><label>' + lblColor + ':</label><div class="selector-options">' + colorsHtml + '</div></div>' +
            '<div class="product-selector quantity-input"><label>' + lblQty + ':</label><div class="quantity-controls">' +
              '<button type="button" onclick="changeQuantity(\'' + p.id + '\', -1)">−</button>' +
              '<input type="number" value="1" min="1" max="10" readonly>' +
              '<button type="button" onclick="changeQuantity(\'' + p.id + '\', 1)">+</button>' +
            '</div></div>' +
            '<div class="product-footer">' + priceDisplay +
              '<div class="product-buttons">' +
                '<button type="button" class="btn btn-secondary btn-add-order" onclick="addToCart(\'' + p.id + '\', \'' + safeName + '\', ' + price + ', \'' + (img || '').replace(/'/g, "\\'") + '\')">' + lblAdd + '</button>' +
                '<button type="button" class="btn btn-primary btn-buy-now" onclick="buyNow(\'' + p.id + '\', \'' + safeName + '\', ' + price + ', \'' + (img || '').replace(/'/g, "\\'") + '\')">' + lblBuy + '</button>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</article>'
      );
    }).join('');
  }

  function scrollToProductFromHash() {
    var grid = document.getElementById('products-grid');
    if (!grid || grid.classList.contains('products-grid--home')) return;
    var hash = typeof location !== 'undefined' && location.hash ? location.hash.slice(1) : '';
    if (!hash) return;
    var productId;
    try {
      productId = decodeURIComponent(hash);
    } catch (e) {
      return;
    }
    var cards = grid.querySelectorAll('[data-product-id]');
    var card = null;
    for (var i = 0; i < cards.length; i++) {
      if (cards[i].getAttribute('data-product-id') === productId) {
        card = cards[i];
        break;
      }
    }
    if (card) {
      requestAnimationFrame(function () {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.setAttribute('tabindex', '-1');
        card.focus({ preventScroll: true });
      });
    }
  }

  function init() {
    applyDesign();
    applyContent();
    if (document.getElementById('products-grid')) {
      renderProducts();
      scrollToProductFromHash();
    }
  }

  function runWhenReady() {
    if (Store.ready && typeof Store.ready.then === 'function') {
      Store.ready.then(function () {
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', init);
        } else {
          init();
        }
      });
    } else {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
      } else {
        init();
      }
    }
  }
  runWhenReady();

  /** When store data is synced (e.g. new product from admin), re-apply design, content and products so all devices see updates without refresh. */
  window.addEventListener('store-synced', function () {
    init();
  });

  window.addEventListener('hashchange', scrollToProductFromHash);
  window.addEventListener('languageChange', function () {
    applyContent();
    if (document.getElementById('products-grid')) {
      renderProducts();
      scrollToProductFromHash();
    }
  });
})();
