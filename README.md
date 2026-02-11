# Black T-Shirt E-Commerce Website

A modern, fully responsive e-commerce website for Black T-Shirt, a Moroccan streetwear brand based in Ouarzazate.

## Features

✅ **Shopping Cart System**
- Add products with size, color, and quantity selection
- Persistent cart using localStorage
- Real-time cart updates and notifications

✅ **Product Selection**
- Interactive size selector (S, M, L, XL)
- Color selection with visual swatches
- Quantity controls (+ / - buttons)
- Product-specific options

✅ **Order Form**
- Customer information form (Name, Phone, City, Notes)
- Form validation
- Order summary display
- Secure order submission

✅ **Responsive Design**
- Mobile-first approach
- Fully responsive on all devices
- Touch-optimized buttons

✅ **Arabic Language Support**
- RTL (Right-to-Left) layout support
- Language switcher
- Bilingual interface

## Getting Started and Preparing for Deployment

1. **Open any modern web browser.**

2. **Open the `index.html` file** to view the website locally. The website is ready to use immediately; **no build process is required.**

3. **Upload all project files** to your web hosting service to publish the website online.

## Setup Instructions

### 1. Admin Dashboard

- Open `admin/index.html` (or `yoursite.com/admin/` when deployed)
- Default password: **admin123**
- Manage products, view orders, edit content and design
- **Sync to all devices:** Go to **GitHub Sync** in the admin sidebar. Enter your GitHub Personal Access Token (with `repo` scope), repo owner, and repo name. After that, every save (products, content, design, orders, etc.) is pushed to `data/store-data.json` in your repo. The storefront fetches this file on load and **every 45 seconds**, so new products appear on all devices and in other open tabs without a manual refresh. Other tabs on the same device also refresh immediately when you sync from the admin. Without GitHub Sync, data is stored only in the browser (per device).

### 2. Deploy to GitHub Pages

This is a **fully static** site (HTML, CSS, vanilla JS). No Node.js, PHP, or database required.

1. Push the project to a GitHub repository
2. Go to **Settings → Pages**
3. Under "Source", choose your branch and `/ (root)` folder
4. Save — the site will be live at `https://username.github.io/repo-name/`

Also works with Netlify, Vercel, or any static hosting.

## File Structure

```
├── index.html          # Home page
├── products.html       # Products listing page
├── order.html          # Checkout/Order form page
├── about.html          # About page
├── shipping.html       # Shipping information
├── contact.html        # Contact page
├── hero-map.html       # Standalone hero map demo (noindex)
├── favicon.svg         # Site favicon
├── site.webmanifest    # PWA manifest
├── sitemap.xml         # SEO sitemap
├── robots.txt          # Crawler directives
├── .nojekyll           # Ensures GitHub Pages serves all files
├── assets/
│   ├── css/
│   │   ├── styles.css  # Main styles
│   │   ├── hero-map.css
│   │   └── cart.css    # Cart & product selector styles
│   ├── js/
│   │   ├── main.js     # Main JavaScript
│   │   ├── store.js    # Store data layer
│   │   ├── storefront.js
│   │   ├── cart.js     # Shopping cart system
│   │   ├── order.js    # Order form handling
│   │   ├── lang.js     # Language support
│   │   └── floating-contact.js
│   └── images/
├── admin/              # Admin dashboard
│   ├── index.html
│   ├── admin.css
│   └── admin.js
├── docs/               # Documentation
│   ├── SEO-GUIDE.md    # SEO setup instructions
│   └── SETUP.md        # Quick setup guide
└── README.md           # This file
```

## Customization

### Change Product Price
Use the **Admin Dashboard** (admin/index.html) → Products to edit prices, or edit default products in `assets/js/store.js`.

### Add More Products
Use the **Admin Dashboard** → Products → Add Product. No code editing needed.

### Change Colors
Edit CSS variables in `assets/css/styles.css`:
```css
:root {
  --accent: #f5c96a;  /* Gold accent color */
  --bg-main: #050505; /* Background color */
}
```

### Add More Languages
1. Add translations to `assets/js/lang.js`
2. Add language switcher button to header
3. Update `setLanguage()` function

## SEO & Search Visibility

See **`docs/SEO-GUIDE.md`** for detailed SEO setup (Search Console, GA4, Business Profile).

The site is optimized for Google search with:

- **Unique title and meta description** on every page
- **Canonical URLs** and **Open Graph** tags (homepage)
- **JSON-LD structured data** (Organization, WebSite, Product, AggregateRating)
- **XML sitemap** (`/sitemap.xml`) and **robots.txt** (`/robots.txt`)
- **Alt text** on all images; **heading hierarchy** (H1 → H2 → H3)
- **Noindex** on checkout (`order.html`) and admin; sitemap lists only indexable pages

**Before going live:**

1. **Set your real domain**  
   Replace `https://www.blacktshirt.ma` in:
   - All HTML `<link rel="canonical">` and `<meta property="og:url">`
   - All JSON-LD `@id` and `url` fields in `<script type="application/ld+json">`
   - `sitemap.xml` (each `<loc>`)
   - `robots.txt` (`Sitemap:` line)

2. **Submit the sitemap**  
   In [Google Search Console](https://search.google.com/search-console), add your property and submit `https://yourdomain.com/sitemap.xml`.

3. **Use HTTPS**  
   Serve the site over HTTPS (required for many modern features and recommended by Google). Most hosts (Netlify, Vercel, etc.) provide it by default.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Support

For questions or issues:
- Email: black12tshirt@gmail.com
- Phone: +212 679 460 301

## License

© 2025 Black T-Shirt. All rights reserved.
