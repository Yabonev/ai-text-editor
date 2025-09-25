# Railway Deployment Setup Plan

## AI Text Editor - Monorepo Deployment (Option A)

### Overview

Deploy a Turborepo monorepo with two services:

- **API Service**: Hono TypeScript backend (`apps/api`)
- **Web Service**: React + Vite + Tailwind frontend (`apps/web`)

---

## Phase 1: Prerequisites & Initial Setup

### Step 1.1: Install Railway CLI

**👤 USER ACTION REQUIRED:**

```bash
# Install Railway CLI
curl -fsSL https://railway.com/install.sh | sh
```

### Step 1.2: Login to Railway

**👤 USER ACTION REQUIRED:**

```bash
railway login
```

### Step 1.3: Link to Existing Project

**🤖 AI WILL DO:**

```bash
# Create new Railway project from CLI
railway init ai-text-editor

# Link to the project
railway link
```

---

## Phase 2: Service Configuration

### Step 2.1: Create API Service

**🤖 AI WILL DO:**

```bash
# Create API service
railway add --service api --repo https://github.com/Yabonev/ai-text-editor.git

# Configure API service settings via CLI
railway service api
```

**🤖 AI WILL CONFIGURE:**

- Root Directory: `apps/api`
- Build Command: `bun install && bun run build`
- Start Command: `bun run start`
- Watch Paths: `apps/api/**`, `packages/shared/**`
- Environment Variables: `PORT`, `NODE_ENV`

### Step 2.2: Create Web Service

**🤖 AI WILL DO:**

```bash
# Create Web service
railway add --service web --repo https://github.com/Yabonev/ai-text-editor.git

# Configure Web service settings
railway service web
```

**🤖 AI WILL CONFIGURE:**

- Root Directory: `apps/web`
- Build Command: `bun install && bun run build`
- Start Command: `bunx serve dist -p $PORT`
- Watch Paths: `apps/web/**`, `packages/shared/**`
- Environment Variables: `PORT`, `VITE_API_URL`

---

## Phase 3: Production Build Setup

### Step 3.1: Update API for Production

**🤖 AI WILL DO:**

- Add production start script to `apps/api/package.json`
- Configure CORS for production domains
- Add health check endpoint
- Set up proper error handling

### Step 3.2: Update Web for Production

**🤖 AI WILL DO:**

- Add static file server dependency (`serve` or similar)
- Update Vite config for production builds
- Configure environment variables for API URL
- Add production build scripts

### Step 3.3: Update Shared Package

**🤖 AI WILL DO:**

- Ensure shared types are properly exported
- Add to both service dependencies

---

## Phase 4: Environment Variables

### Step 4.1: API Environment Variables

**🤖 AI WILL SET VIA CLI:**

```bash
railway variables --service api --set "NODE_ENV=production"
railway variables --service api --set "PORT=$PORT" # Railway auto-provides
```

### Step 4.2: Web Environment Variables

**🤖 AI WILL SET VIA CLI:**

```bash
railway variables --service web --set "NODE_ENV=production"
railway variables --service web --set "PORT=$PORT" # Railway auto-provides
# API URL will be set after API deployment
```

---

## Phase 5: Initial Deployment

### Step 5.1: Deploy API Service

**🤖 AI WILL DO:**

```bash
# Deploy API service
cd apps/api
railway up --service api
```

### Step 5.2: Get API Domain & Configure Web

**🤖 AI WILL DO:**

```bash
# Generate domain for API
railway domain --service api

# Set API URL in Web service
railway variables --service web --set "VITE_API_URL=https://[api-domain].railway.app"
```

### Step 5.3: Deploy Web Service

**🤖 AI WILL DO:**

```bash
# Deploy Web service
cd apps/web
railway up --service web

# Generate domain for Web
railway domain --service web
```

---

## Phase 6: Verification & Testing

### Step 6.1: Health Checks

**🤖 AI WILL VERIFY:**

- API health endpoint: `GET /api/health`
- API endpoints: `GET /api/hello`, `GET /api/users`
- Web application loads correctly
- Frontend can communicate with backend

### Step 6.2: Auto-Deploy Setup

**🤖 AI WILL VERIFY:**

- GitHub webhook is configured
- Watch paths are working correctly
- Cross-service deploys don't trigger unnecessarily

---

## Phase 7: Post-Deployment Configuration

### Step 7.1: Custom Domains (Optional)

**👤 USER ACTION (if desired):**

```bash
# Add custom domains
railway domain --service api api.yourdomain.com
railway domain --service web yourdomain.com
```

### Step 7.2: Environment Management

**🤖 AI WILL DOCUMENT:**

- How to add new environment variables
- How to manage staging vs production
- How to access logs and metrics

---

## Expected Results

After completion, you'll have:

✅ **API Service**:

- URL: `https://[api-service].railway.app`
- Endpoints: `/api/health`, `/api/hello`, `/api/users`
- Auto-deploys on `apps/api/**` changes

✅ **Web Service**:

- URL: `https://[web-service].railway.app`
- React app with Tailwind styling
- Connected to API service
- Auto-deploys on `apps/web/**` changes

✅ **Automated Deployments**:

- Push to GitHub → Auto-deploy affected services
- Isolated builds per service
- Shared package updates trigger both services

---

## Troubleshooting Commands

**🤖 AI WILL PROVIDE:**

```bash
# Check deployment status
railway status

# View logs
railway logs --service api
railway logs --service web

# Check variables
railway variables --service api
railway variables --service web

# Redeploy if needed
railway redeploy --service api
railway redeploy --service web
```

---

## Cost Estimation

**Free Tier Limits:**

- 2 services (within limit)
- 500 hours/month execution time
- $5 credit included
- Automatic sleep after inactivity

**Estimated Monthly Cost:**

- Development: $0 (within free tier)
- Light Production: $0-5
- Heavy Production: $10-30

---

## Next Steps After Deployment

1. **Monitor Usage**: Check Railway dashboard for metrics
2. **Set Up Alerts**: Configure usage limit notifications
3. **Scale**: Add databases, cron jobs, or additional services as needed
4. **Optimize**: Review build times and deployment efficiency

---

**Ready to deploy? 🚀**

Just say "start deployment" and I'll begin executing the AI tasks in sequence!
