# Frontend Setup - Private HuggingFace Space Access

## Quick Setup

### 1. Get Your HuggingFace Token

1. Go to https://huggingface.co/settings/tokens
2. Click **"New token"**
3. Configure:
   - **Name:** `job-app-frontend-access`
   - **Type:** **Read** (sufficient for API access)
4. Click **"Generate token"**
5. **Copy the token** (starts with `hf_...`)

### 2. Update Frontend .env.local

Edit `frontend/.env.local`:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://YOUR_USERNAME-job-application-flow.hf.space

# HuggingFace Token (for private Space access)
NEXT_PUBLIC_HF_TOKEN=hf_your_actual_token_here
```

Replace:
- `YOUR_USERNAME` - Your HuggingFace username
- `hf_your_actual_token_here` - The token you copied

### 3. Restart Frontend

```bash
# Stop the current dev server (Ctrl+C)

# Start it again
npm run dev
```

### 4. Test It!

Open http://localhost:3000 and click "Search Jobs" - it should work! 🎉

---

## How It Works

### Updated Code (Already Done ✅)

**frontend/src/lib/api.ts** now includes:

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7860';
const HF_TOKEN = process.env.NEXT_PUBLIC_HF_TOKEN;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    // Add HuggingFace token if available
    ...(HF_TOKEN && { 'Authorization': `Bearer ${HF_TOKEN}` }),
  },
});
```

**What this does:**
- ✅ Reads `NEXT_PUBLIC_HF_TOKEN` from environment
- ✅ Adds `Authorization: Bearer hf_...` header to all requests
- ✅ Only adds header if token is present (optional for public Spaces)

---

## Configuration Options

### Option 1: Private Space with Token (Most Secure)

**Use when:** Your Space is private

**frontend/.env.local:**
```bash
NEXT_PUBLIC_API_URL=https://YOUR_USERNAME-job-application-flow.hf.space
NEXT_PUBLIC_HF_TOKEN=hf_your_token_here
```

### Option 2: Private Space with CORS (Simpler)

**Use when:** Your Space is private but you only access from localhost

**frontend/.env.local:**
```bash
NEXT_PUBLIC_API_URL=https://YOUR_USERNAME-job-application-flow.hf.space
# Leave token empty - CORS allows localhost
NEXT_PUBLIC_HF_TOKEN=
```

**Why it works:** The backend CORS allows `localhost:3000` even for private Spaces!

### Option 3: Public Space (No Token Needed)

**Use when:** Your Space is public

**frontend/.env.local:**
```bash
NEXT_PUBLIC_API_URL=https://YOUR_USERNAME-job-application-flow.hf.space
# No token needed
NEXT_PUBLIC_HF_TOKEN=
```

### Option 4: Local Development (Default)

**Use when:** Backend is running locally

**frontend/.env.local:**
```bash
NEXT_PUBLIC_API_URL=http://localhost:7860
# No token needed for local
NEXT_PUBLIC_HF_TOKEN=
```

---

## Testing

### 1. Test API Connection

Open browser console (F12) and run:

```javascript
// Test without clicking anything
fetch(process.env.NEXT_PUBLIC_API_URL + '/health', {
  headers: {
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_HF_TOKEN || ''}`
  }
})
  .then(r => r.json())
  .then(console.log)

// Should return: {status: "healthy", ...}
```

### 2. Test Job Search

1. Open http://localhost:3000
2. Open browser DevTools → Network tab
3. Click "Search Jobs" button
4. Check the request:
   - **URL:** Should be your HF Space URL
   - **Headers:** Should include `Authorization: Bearer hf_...`
   - **Response:** Should be 200 OK

### 3. Expected Results

✅ **Success:**
- No CORS errors
- Job search completes
- Jobs appear with match scores

❌ **Failure indicators:**
- CORS error → Check backend CORS config
- 401 Unauthorized → Token is invalid or expired
- 403 Forbidden → Token doesn't have access to Space
- Network error → Space URL is wrong

---

## Troubleshooting

### Issue: "CORS policy blocked"

**Even with token, CORS can fail!**

**Solution 1:** Verify backend CORS includes `localhost:3000`

Check your backend `app.py`:
```python
ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Must be here!
    "http://localhost:3001",
]
```

**Solution 2:** Add your frontend domain to CORS manually

In backend `app.py`:
```python
# Add your specific domain
ALLOWED_ORIGINS.append("http://localhost:3000")
```

### Issue: "401 Unauthorized"

**Cause:** Token is invalid or expired

**Solutions:**
1. Generate a new token from https://huggingface.co/settings/tokens
2. Make sure you copied the entire token (starts with `hf_`)
3. Verify token type is **Read** or **Write**
4. Check token isn't expired (set expiration when creating)

### Issue: "403 Forbidden"

**Cause:** Token doesn't have access to your Space

**Solutions:**
1. Verify the Space is in YOUR account
2. Token must be from the same HF account as Space
3. Try regenerating token with **Write** access (more permissions)

### Issue: Token works in browser but not in app

**Cause:** Environment variable not loaded

**Solutions:**
1. Restart dev server after changing `.env.local`
2. Verify file is named `.env.local` (not `.env.dev`)
3. Check no typos: `NEXT_PUBLIC_HF_TOKEN` (case-sensitive)
4. Use `console.log(process.env.NEXT_PUBLIC_HF_TOKEN)` to debug

### Issue: Works locally but not in production

**Cause:** Production environment doesn't have token

**Solutions:**
1. Add `NEXT_PUBLIC_HF_TOKEN` to Vercel/Netlify environment variables
2. Add `NEXT_PUBLIC_API_URL` to production env vars
3. Redeploy after adding env vars

---

## Security Best Practices

### ✅ DO:
- Store token in `.env.local` (ignored by git)
- Use **Read** access tokens (minimum required)
- Regenerate tokens periodically
- Set token expiration dates

### ❌ DON'T:
- Commit `.env.local` to git
- Share your token publicly
- Use **Write** tokens unless needed
- Hardcode tokens in code

### Token Safety Check:

```bash
# Make sure .env.local is in .gitignore
grep -q ".env.local" .gitignore && echo "✅ Safe" || echo "❌ Add to .gitignore!"

# Make sure .env.local is NOT staged
git status | grep -q ".env.local" && echo "❌ DANGER: Remove from git!" || echo "✅ Not in git"
```

---

## Production Deployment

### Vercel

1. Go to your Vercel project
2. Settings → Environment Variables
3. Add:
   ```
   NEXT_PUBLIC_API_URL = https://YOUR_USERNAME-job-application-flow.hf.space
   NEXT_PUBLIC_HF_TOKEN = hf_your_token_here
   ```
4. Redeploy

### Netlify

1. Go to your Netlify site
2. Site settings → Environment variables
3. Add the same variables as above
4. Redeploy

---

## Alternative: Public Space (No Token Needed)

If you don't need privacy:

1. **Make Space Public:**
   - Go to Space Settings
   - Change visibility to **Public**

2. **Remove Token from Frontend:**
   ```bash
   # frontend/.env.local
   NEXT_PUBLIC_API_URL=https://YOUR_USERNAME-job-application-flow.hf.space
   # No token needed!
   ```

3. **Done!** No authentication required.

---

## Summary

### With Token (Private Space):
```bash
# frontend/.env.local
NEXT_PUBLIC_API_URL=https://YOUR_USERNAME-job-application-flow.hf.space
NEXT_PUBLIC_HF_TOKEN=hf_your_token_here
```

### Without Token (Public Space or localhost):
```bash
# frontend/.env.local
NEXT_PUBLIC_API_URL=https://YOUR_USERNAME-job-application-flow.hf.space
# CORS allows localhost even for private Spaces!
```

### Already Configured:
- ✅ `api.ts` - Automatically adds token to headers
- ✅ `.env.local` - Template ready for your token
- ✅ All API calls - Token included automatically

**Just add your token and it works!** 🚀
