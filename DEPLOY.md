# Deploy to Cloudflare Pages

## Automatic Deployment (Recommended)

1. Push this repository to GitHub
2. Go to [Cloudflare Dashboard > Pages](https://dash.cloudflare.com/pages)
3. Click "Create a project" → "Connect to Git"
4. Select your GitHub repository
5. Configure build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `_site`
   - **Node.js version:** `20`
   - **Environment variables:** (optional)
     - `NODE_ENV=production`
6. Click "Save and Deploy"

## Manual Deployment (via Wrangler)

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build the site
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy _site --project-name=kamaan
```

## Custom Domain

After deployment, add your custom domain:
1. In Cloudflare Pages dashboard, go to your project
2. Click "Custom domains" → "Add domain"
3. Enter `kamaan.ir` and follow the DNS configuration instructions

## Headers & Redirects

The `_headers` and `_redirects` files in `public/` are automatically deployed by Cloudflare Pages.
They configure:
- Security headers (XSS protection, frame options, etc.)
- Long-term caching for static assets (CSS, images)
- Short-term caching for HTML pages
- Admin panel redirect

## Environment Variables

For production, you may want to set these in Cloudflare Pages dashboard:
- `NODE_ENV=production` (enables HTML minification)
- Any API keys or secrets (not needed for this static site)

## Build Cache

Cloudflare Pages caches `node_modules` automatically. Build time is typically 15-30 seconds.