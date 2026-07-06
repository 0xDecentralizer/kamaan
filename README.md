# سایت کمان — موسیقی سنتی ایران

سایت استاتیک برای کانال تلگرام «کیهان کلهر | کمانچه» با پنل مدیریت CMS.

## فناوری‌ها

- **Eleventy (11ty)** — موتور سایت استاتیک
- **Decap CMS** — پنل مدیریت محتوا (جایگزین Netlify CMS)
- **Cloudflare Pages** — میزبانی
- **Netlify Identity** — احراز هویت برای CMS

## ساختار پروژه

```
kamaan/
├── admin/              # پنل مدیریت Decap CMS
├── src/
│   ├── _data/          # داده‌های سایت (تنظیمات، موسیقی)
│   ├── _includes/      # قالب‌ها
│   ├── articles/       # مقالات (Markdown)
│   ├── about/          # صفحه درباره
│   ├── contact/        # صفحه تماس
│   └── styles/         # فایل‌های CSS
├── public/             # فایل‌های استاتیک (تصاویر)
└── .eleventy.js        # تنظیمات Eleventy
```

## راه‌اندازی سریع

### ۱. نصب وابستگی‌ها
```bash
npm install
```

### ۲. اجرای محلی
```bash
npm run dev
```
سایت روی `http://localhost:8080` اجرا می‌شود.

### ۳. ساخت خروجی
```bash
npm run build`
```
فایل‌های ساخته شده در پوشه `_site/` قرار می‌گیرند.

## استقرار روی Cloudflare Pages

### مرحله ۱: آپلود به GitHub
```bash
git init
git add .
git commit -m "اولین نسخه سایت کمان"
git remote add origin https://github.com/your-username/kamaan.git
git push -u origin main
```

### مرحله ۲: اتصال به Cloudflare Pages
1. وارد [Cloudflare Dashboard](https://dash.cloudflare.com) شوید
2. از منوی سمت چپ **Workers & Pages** را انتخاب کنید
3. روی **Create application** کلیک کنید
4. تب **Pages** را انتخاب و **Connect to Git** را بزنید
5. ریپازیتوری GitHub خود را انتخاب کنید
6. تنظیمات build را وارد کنید:
   - **Build command:** `npm run build`
   - **Build output directory:** `_site`
   - **Node.js version:** `18` (یا بالاتر)
7. **Save and Deploy** را بزنید

### مرحله ۳: تنظیم دامنه اختصاصی
1. در صفحه پروژه Cloudflare Pages، تب **Custom domains** را انتخاب کنید
2. دامنه خود را اضافه کنید
3. DNS رکوردها را طبق راهنمای Cloudflare تنظیم کنید

## فعال‌سازی پنل مدیریت (CMS)

### مرحله ۱: فعال‌سازی Netlify Identity
1. در [Netlify Dashboard](https://app.netlify.com)، سایت خود را پیدا کنید
2. **Site settings** → **Identity** → **Enable Identity**
3. **Registration** را روی **Invite only** تنظیم کنید
4. **Git Gateway** را فعال کنید:
   - **Identity** → **Git Gateway** → **Enable Git Gateway**
   - با اکانت GitHub خود وارد شوید

### مرحله ۲: اتصال CMS به Cloudflare Pages
فایل `admin/config.yml` را ویرایش کنید:

```yaml
backend:
  name: git-gateway
  branch: main
```

### مرحله ۳: دسترسی به پنل مدیریت
- آدرس پنل مدیریت: `https://your-domain.com/admin/`
- با اکانت Netlify خود وارد شوید

## اضافه کردن محتوا

### مقاله جدید
1. فایل Markdown جدید در `src/articles/` ایجاد کنید
2. فرانت‌متر زیر را اضافه کنید:
```yaml
---
title: "عنوان مقاله"
excerpt: "توضیحات کوتاه"
category: "دسته‌بندی"
date: 2024-01-01
published: true
---
```
3. محتوای مقاله را بنویسید
4. تغییرات را commit و push کنید

### موسیقی جدید
فایل `src/_data/music.json` را ویرایش کنید یا از پنل CMS استفاده کنید.

## نکات فنی

- سایت کاملاً **RTL** (راست به چپ) است
- تمام متن‌ها **فارسی** هستند
- فرم تماس از **Netlify Forms** استفاده می‌کند
- CMS با **Git Gateway** کار می‌کند (نیاز به Netlify Identity)
- برای استفاده از CMS بدون Netlify، می‌توانید از **GitHub OAuth** استفاده کنید

## لینک‌ها مفید

- [Eleventy Documentation](https://www.11ty.dev/docs/)
- [Decap CMS Documentation](https://decapcms.org/docs/)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
