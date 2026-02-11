# SEO Setup Guide — Black T-Shirt

This guide covers the SEO optimizations implemented and the steps you need to complete for Google indexing, Search Console, and Analytics.

---

## 1. What's Already Implemented

### Technical SEO
- **Canonical URLs** on all public pages (prevents duplicate content)
- **robots.txt** — Allows crawling; disallows `/order.html`, `/admin/`, `/hero-map.html`
- **sitemap.xml** — Lists all indexable pages at `https://www.blacktshirt.ma/sitemap.xml`
- **Security headers** — X-Content-Type-Options, X-Frame-Options, Referrer-Policy
- **Scripts with `defer`** — Improves page load speed (Core Web Vitals)
- **Font preload** on homepage — Faster text rendering

### On-Page SEO
- **Meta titles & descriptions** — Unique, keyword-focused per page
- **Open Graph (og:)** — For Facebook, LinkedIn, WhatsApp sharing
- **Twitter Card** — For Twitter sharing
- **Schema.org structured data:**
  - LocalBusiness (organization, NAP, geo)
  - WebSite
  - BreadcrumbList (all pages)
  - Product, AggregateRating (homepage)
  - CollectionPage + ItemList (products)
  - ContactPage, AboutPage, WebPage
  - FAQPage (homepage, shipping)

### Content & UX
- **FAQ section** on shipping page with FAQ schema (rich results eligible)
- **Internal linking** — Products link in footer on all pages
- **Responsive, mobile-first** design

### Local SEO
- **LocalBusiness schema** with full NAP (Name, Address, Phone)
- **GeoCoordinates** (Ouarzazate: 30.9198, -6.8926)
- **Consistent NAP** across all pages

---

## 2. Steps You Must Complete

### A. Enable HTTPS
Your site must run over **HTTPS** for security and SEO. If not already:
- Use a hosting provider with free SSL (e.g. Let's Encrypt)
- Or use Cloudflare for free SSL + CDN

### B. Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://www.blacktshirt.ma`
3. Verify ownership (choose one):
   - **HTML tag:** Add to `<head>` of `index.html`:
     ```html
     <meta name="google-site-verification" content="YOUR_CODE_HERE" />
     ```
   - **DNS TXT record** (recommended for root domain)
4. After verification:
   - Submit sitemap: `https://www.blacktshirt.ma/sitemap.xml`
   - Use **URL Inspection** to request indexing for key pages

### C. Google Analytics 4 (GA4)
1. Create a GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get your Measurement ID (e.g. `G-XXXXXXXXXX`)
3. Add this before `</head>` on all public pages (index, products, about, shipping, contact):

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Replace `G-XXXXXXXXXX` with your actual ID.

### D. Google Business Profile (Local SEO)
1. Go to [Google Business Profile](https://business.google.com)
2. Create or claim your business:
   - **Name:** Black T-Shirt
   - **Address:** Ouarzazate, Morocco (or exact address if you have a physical location)
   - **Phone:** +212 679 460 301
   - **Website:** https://www.blacktshirt.ma
   - **Category:** Clothing Store or T-Shirt Shop
3. Verify your business (postcard, phone, or email)
4. Keep NAP consistent everywhere

---

## 3. Ongoing Monitoring

| Tool | What to Monitor |
|------|-----------------|
| **Search Console** | Index coverage, Core Web Vitals, mobile usability, sitemap status |
| **GA4** | Organic traffic, top pages, conversions |
| **PageSpeed Insights** | LCP, FID, CLS scores for desktop & mobile |

### Recommended Checks (monthly)
- Submit new/updated URLs for indexing in Search Console
- Fix any crawl errors or warnings
- Review search performance (queries, clicks, impressions)
- Update `lastmod` in sitemap.xml when you change content

---

## 4. Sitemap Maintenance

When you add or change pages, update `sitemap.xml`:
- Add new `<url>` blocks
- Set `<lastmod>` to today's date (YYYY-MM-DD)
- Set `<priority>` (1.0 = highest, 0.5 = low)
- Set `<changefreq>` (weekly, monthly, etc.)

---

## 5. Schema Testing

Validate your structured data:
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

---

## 6. Quick Checklist

- [ ] HTTPS enabled
- [ ] Search Console verified, sitemap submitted
- [ ] GA4 installed (optional but recommended)
- [ ] Google Business Profile set up (for local SEO)
- [ ] NAP consistent across site + GBP
- [ ] Test rich results (FAQ, products, local business)
