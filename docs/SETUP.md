# Quick Setup Guide

## Getting Started and Preparing for Deployment

1. Open any modern web browser.
2. Open the **`index.html`** file to view the website locally. The website is ready to use immediately; **no build process is required.**
3. Upload all project files to your web hosting service to publish the website online.

## 🚀 Getting Started

### Static site (GitHub Pages compatible)

This is a **fully static** website. No Node.js, PHP, or database required.

- **Products** are stored in the browser's `localStorage` and managed via the admin dashboard.
- **Orders** are saved to `localStorage` when customers submit the checkout form.
- Open `admin/index.html` (or `yoursite.com/admin/` when deployed) to manage products and view orders.

**Note:** Without the Orders API (see below), orders are stored per-browser. To have **orders appear in the Admin Dashboard from any device or browser**, set up the Orders API.

### Step 1: Orders API (recommended for cross-device orders)

So that every customer order appears in the Admin Dashboard regardless of device or browser:

1. **Deploy the Orders API** (included in this repo under `api/orders.js`) to **Vercel**:
   - Connect this repository to Vercel.
   - In the Vercel project **Settings → Environment Variables**, add:
     - `GITHUB_TOKEN` — a GitHub Personal Access Token with `repo` scope (so the API can update `data/store-data.json`).
     - `GITHUB_OWNER` — your GitHub username or org.
     - `GITHUB_REPO` — the repo name (e.g. `tist`).
     - `GITHUB_BRANCH` — optional; default is `main`.
   - Redeploy so the function uses these variables.

2. **Configure the storefront and admin**:
   - Open **Admin Dashboard → مزامنة GitHub (GitHub Sync)**.
   - In **Orders API URL**, paste your API URL, e.g. `https://your-project.vercel.app/api/orders`.
   - Click **حفظ الإعدادات (Save settings)**.
   - Click **مزامنة الآن (Sync now)** so `data/store-data.json` (including `ordersApiUrl`) is pushed to GitHub. After that, the live site will send new orders to your API.

3. **Flow**: When a customer submits an order on the website, the frontend sends a **POST** request to the Orders API. The API appends the order to `data/store-data.json` in your repo. The Admin Dashboard (and any device) loads that file on refresh or when opening the Orders section, so **new orders appear in the Admin Dashboard** from any device.

**Mobile orders:** If orders from phones don’t reach the API (e.g. store-data loads slowly), set a fallback in `order.html`: in the `<head>`, edit the meta tag `<meta name="orders-api-url" content="" />` and set `content` to your API URL (e.g. `https://your-project.vercel.app/api/orders`). Then mobile submissions use this URL even when the store sync hasn’t finished.

**CORS:** The Orders API allows requests from any origin so the storefront (e.g. GitHub Pages) can POST from the browser. No extra CORS configuration is needed on the frontend.

**Authentication:** The API uses your GitHub token only on the server (env vars). Customers do not need to log in; only the POST request from your site is accepted.

### Step 2: Test the Website

1. Open `index.html` in your browser
2. Click on a product
3. Select size, color, and quantity
4. Click "Add to Order"
5. Click the cart icon (🛒) in the header
6. Click "Proceed to Checkout"
7. Fill in the order form
8. Submit the order

### Step 3: Deploy

Upload all files to your web hosting:
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect GitHub repo
- **GitHub Pages**: Push to repository
- **Any hosting**: Upload via FTP

## 📧 Testing Order Submission

1. Add products to cart and go to checkout
2. Fill in name, phone, and city
3. Submit the order:
   - **If Orders API URL is set:** The order is sent to the API and appended to `data/store-data.json`; it will appear in the Admin Dashboard on all devices after the next sync/refresh.
   - **If not set:** The order is saved to `localStorage` and is visible in the admin only in the same browser.
4. Open the admin dashboard → الطلبات (Orders). If using the API, open the Orders section or wait for the next sync to see new orders.

## 👤 Admin Dashboard (لوحة التحكم)

Manage products, orders, content, and design **without editing code**:

1. Open **`admin/index.html`** in your browser (or go to `yoursite.com/admin/` when deployed).
2. Log in with default password: **`admin123`**
3. Use the Arabic interface to:
   - **المنتجات** — Add, edit, delete products; set names, prices, descriptions, multiple images (drag to reorder), colors, sizes, and quantity per size/color; show or hide products.
   - **المخزون** — View stock levels and low-stock / out-of-stock alerts.
   - **الطلبات** — View orders, change status (Pending → Processing → Shipped → Delivered → Cancelled), view customer and item details.
   - **المحتوى** — Edit Home, About Us, and Contact page text and homepage banners.
   - **التصميم** — Change store accent color and show/hide website sections.

**Security:** To change the default password, open the browser console on the admin page, run `btoa('YourNewPassword')`, then in `assets/js/store.js` find where `passwordHash` is set and replace the value with the result (or edit the admin login check in `admin/admin.js` to use a different storage key).

All changes save to the browser's local storage and **apply immediately** on the live site when customers visit.

## 🔧 Customization

### Change Product Price
- Use the **Admin Dashboard** (المنتجات) to set regular and discount prices, or edit in store data.

### Add More Products
- Use the **Admin Dashboard** → المنتجات → إضافة منتج (Add product). No code editing needed.

### Change Colors
- Use **Admin Dashboard** → التصميم to set the accent color, or edit `:root { --accent: ... }` in `assets/css/styles.css`.

## 🌐 Language Support

The website supports English and Arabic:
- Arabic uses RTL (right-to-left) layout
- Language preference is saved in browser
- To add more languages, edit `assets/js/lang.js`

## 📱 Mobile Optimization

The website is fully responsive:
- Touch-optimized buttons
- Mobile-friendly forms
- Responsive cart modal
- Works on all screen sizes

## ❓ Troubleshooting

**Orders not appearing in admin?**
- **Using Orders API:** Ensure the Orders API URL is set in Admin → GitHub Sync, and that the API is deployed (e.g. Vercel) with `GITHUB_TOKEN`, `GITHUB_OWNER`, and `GITHUB_REPO` set. After a customer submits an order, open the Orders section in the admin (it triggers a refresh) or wait for the automatic sync. Check the browser **Network** tab: the POST to the Orders API should return 200.
- **Without API:** Orders are stored in `localStorage` per browser — open admin in the same browser and same device.
- Check the browser **Console** and **Network** tab for failed requests or CORS errors.

**Cart not working?**
- Clear browser cache
- Check that `cart.js` is loaded
- Verify localStorage is enabled

**Styling issues?**
- Make sure `styles.css` and `cart.css` are loaded
- Check browser console for CSS errors

## 📞 Support

Need help? Contact:
- Email: black12tshirt@gmail.com
- Phone: +212 679 460 301
