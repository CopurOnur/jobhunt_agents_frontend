# Push Frontend to GitHub

## Step-by-Step Guide

### 1. Create GitHub Repository

1. Go to https://github.com/new
2. Fill in:
   - **Repository name:** `job-application-flow-frontend` (or your choice)
   - **Description:** `Next.js frontend for AI-powered job application automation`
   - **Visibility:** Public or Private
   - **✅ Skip:** Don't initialize with README (we already have one)
3. Click **"Create repository"**

### 2. Configure Git (One-Time Setup)

```bash
# Set your name and email
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 3. Connect to GitHub

Copy the commands from GitHub's "push an existing repository" section, or use:

```bash
# Add GitHub as remote
git remote add origin https://github.com/YOUR_USERNAME/job-application-flow-frontend.git

# Verify remote
git remote -v
# Should show:
# origin  https://github.com/YOUR_USERNAME/job-application-flow-frontend.git (fetch)
# origin  https://github.com/YOUR_USERNAME/job-application-flow-frontend.git (push)
```

Replace `YOUR_USERNAME` with your GitHub username!

### 4. Push to GitHub

```bash
# Push main branch
git push -u origin main
```

**If prompted for credentials:**
- **Username:** Your GitHub username
- **Password:** Use a Personal Access Token (not your GitHub password!)

#### How to Create GitHub Personal Access Token:

1. Go to https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Configure:
   - **Note:** `job-app-frontend`
   - **Expiration:** 90 days (or your choice)
   - **Scopes:** Check `repo` (full control of private repositories)
4. Click **"Generate token"**
5. **Copy the token** (you won't see it again!)
6. Use this token as your password when pushing

### 5. Verify on GitHub

1. Go to https://github.com/YOUR_USERNAME/job-application-flow-frontend
2. You should see all your files!
3. Verify `.env.local` is NOT visible (it's ignored)
4. README should be displayed on the main page

---

## Quick Command Summary

```bash
# 1. Configure git (once)
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# 2. Add remote
git remote add origin https://github.com/YOUR_USERNAME/job-application-flow-frontend.git

# 3. Push
git push -u origin main
```

---

## Future Updates

After making changes:

```bash
# 1. Check what changed
git status

# 2. Add changes
git add .

# 3. Commit
git commit -m "Description of changes"

# 4. Push to GitHub
git push
```

---

## Important: What's Ignored

These files are **NOT** pushed to GitHub (in `.gitignore`):

✅ **Ignored (safe):**
- `.env.local` - Your secrets and tokens
- `node_modules/` - npm packages (huge!)
- `.next/` - Build output
- `next-env.d.ts` - Generated file

✅ **Committed (public):**
- `.env.example` - Template (no secrets)
- Source code (`src/`)
- Configuration files
- Documentation (`*.md`)

---

## Security Check

Before pushing, verify no secrets are committed:

```bash
# Check if .env.local is ignored
git status --ignored | grep ".env.local"
# Should show: .env.local (ignored)

# Check what will be pushed
git log --stat
# Should NOT show .env.local

# Search for any tokens in committed files
git grep -i "hf_" -- ':!.env*'
# Should return nothing
```

---

## Troubleshooting

### Issue: "Permission denied"

**Solution:** Use Personal Access Token instead of password

1. Generate token: https://github.com/settings/tokens
2. Use token as password when pushing

### Issue: "Repository not found"

**Solution:** Check remote URL

```bash
git remote -v
# Should match your GitHub repo URL
# If wrong: git remote set-url origin https://github.com/YOUR_USERNAME/repo.git
```

### Issue: "failed to push some refs"

**Solution:** Pull first if repo has changes

```bash
git pull origin main --rebase
git push
```

### Issue: ".env.local appeared in git"

**⚠️ URGENT:** Remove it immediately!

```bash
# Remove from staging
git reset HEAD .env.local

# If already committed
git rm --cached .env.local
git commit -m "Remove .env.local from git"

# Regenerate any exposed tokens!
```

---

## Clone on Another Machine

To work on another computer:

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/job-application-flow-frontend.git
cd job-application-flow-frontend

# Install dependencies
npm install

# Create .env.local (copy from .env.example)
cp .env.example .env.local

# Edit .env.local with your settings
# Then start dev server
npm run dev
```

---

## Making Repository Private

If you want to make it private later:

1. Go to repo Settings
2. Scroll to "Danger Zone"
3. Click "Change repository visibility"
4. Select "Private"

---

**Your frontend is now on GitHub!** 🎉

Visit: `https://github.com/YOUR_USERNAME/job-application-flow-frontend`
