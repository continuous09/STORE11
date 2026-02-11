// Handle mobile nav toggle — hamburger menu with scroll lock and overlay close
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const body = document.body;

  function closeNav() {
    if (navLinks && navLinks.classList.contains("is-open")) {
      navLinks.classList.remove("is-open");
      if (navToggle) {
        navToggle.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
      body.classList.remove("nav-open");
    }
  }

  function openNav() {
    navLinks.classList.add("is-open");
    navToggle.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    body.classList.add("nav-open");
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
      body.classList.toggle("nav-open", isOpen);
    });

    // Close nav on link click (mobile)
    navLinks.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        closeNav();
      }
    });

    // Close on click outside (overlay)
    document.addEventListener("click", (event) => {
      if (!navLinks.classList.contains("is-open")) return;
      const target = event.target;
      if (target && !navLinks.contains(target) && !navToggle.contains(target)) {
        closeNav();
      }
    });

    // Close on Escape
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeNav();
    });
  }

  // Set current year in footer
  const yearEls = document.querySelectorAll("#year");
  const currentYear = new Date().getFullYear();
  yearEls.forEach((el) => {
    el.textContent = String(currentYear);
  });

  // Language switcher (Arabic / English)
  const langSwitcher = document.getElementById("lang-switcher");
  const langSwitcherText = document.getElementById("lang-switcher-text");
  if (langSwitcher && typeof getSiteLang === "function") {
    function updateSwitcherLabel() {
      if (langSwitcherText) {
        langSwitcherText.textContent = getSiteLang() === "ar" ? "EN" : "العربية";
      }
    }
    updateSwitcherLabel();
    langSwitcher.addEventListener("click", () => {
      setLanguage(getSiteLang() === "ar" ? "en" : "ar");
      updateSwitcherLabel();
    });
    window.addEventListener("languageChange", updateSwitcherLabel);
  }
});

// Global helper to open WhatsApp with optional product name
function openWhatsAppOrder(variation) {
  var fc = typeof Store !== "undefined" && Store.getFloatingContact ? Store.getFloatingContact() : {};
  var baseMsg = fc.defaultMessage || "Hi Black T-Shirt, I'd like to order a T-shirt.";
  var msg = variation ? String(baseMsg).replace(/\.$/, "") + " (" + variation + ")." : baseMsg;
  var phone = (fc.phoneNumber || "").replace(/\D/g, "") || "212679460301";
  window.open("https://wa.me/" + phone + "?text=" + encodeURIComponent(msg), "_blank", "noopener,noreferrer");
}

// Buy Now function - opens WhatsApp with detailed product information
function buyNowWhatsApp(productName, sizes, color, price) {
  var fc = typeof Store !== "undefined" && Store.getFloatingContact ? Store.getFloatingContact() : {};
  var phone = (fc.phoneNumber || "").replace(/\D/g, "") || "212679460301";
  var message = "Hello, I want to buy this T-shirt.\nProduct: " + productName + "\nSize: " + sizes + "\nColor: " + color + "\nPrice: " + price;
  window.open("https://wa.me/" + phone + "?text=" + encodeURIComponent(message), "_blank", "noopener,noreferrer");
}
