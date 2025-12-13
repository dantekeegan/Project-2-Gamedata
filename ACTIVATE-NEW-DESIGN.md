# 🎮 Gaming Template - File Swap Instructions

## Quick Commands to Activate New Design

Run these commands in your terminal:

```bash
# Navigate to public directory
cd "/Users/keeganhonore/Project 2 Gamedata/Project-2-Gamedata/public"

# Backup your current files
mv index.html index-old-backup.html
mv style.css style-old-backup.css
mv script.js script-old-backup.js

# Activate new gaming template files
mv index-new.html index.html
mv style-new.css style.css
mv script-new.js script.js

# Go back to project root
cd ..

# Start the server
npm start
```

Then open: `http://localhost:3003`

---

## ✅ What This Does

**Backs up your old files as:**
- `index-old-backup.html`
- `style-old-backup.css`
- `script-old-backup.js`

**Activates new gaming template as:**
- `index.html`
- `style.css`
- `script.js`

---

## 🔄 To Rollback (If Needed)

If you want to go back to the old design:

```bash
cd "/Users/keeganhonore/Project 2 Gamedata/Project-2-Gamedata/public"

# Remove new files
rm index.html style.css script.js

# Restore old files
mv index-old-backup.html index.html
mv style-old-backup.css style.css
mv script-old-backup.js script.js
```

---

## 🎉 After Testing Successfully

Once you've tested and you're happy with the new design:

```bash
# Commit to git
git add .
git commit -m "✨ Activate gaming template - new UI with particles, stats, search"
git tag v2.1-gaming-template

# Remove old backup files (optional)
rm public/index-old-backup.html
rm public/style-old-backup.css
rm public/script-old-backup.js

# Push to GitHub
git push origin main
git push origin --tags
```

---

## 📋 Copy/Paste Commands

**Full activation in one go:**

```bash
cd "/Users/keeganhonore/Project 2 Gamedata/Project-2-Gamedata/public" && \
mv index.html index-old-backup.html && \
mv style.css style-old-backup.css && \
mv script.js script-old-backup.js && \
mv index-new.html index.html && \
mv style-new.css style.css && \
mv script-new.js script.js && \
cd .. && \
npm start
```

**Just copy that entire block and paste into your terminal!** 🚀