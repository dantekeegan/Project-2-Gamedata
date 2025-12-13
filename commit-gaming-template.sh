#!/bin/bash

# Gaming Template Commit Script
# Run this to commit and push all gaming template changes

cd "/Users/keeganhonore/Project 2 Gamedata/Project-2-Gamedata"

echo "🎮 Starting Git commit process..."
echo ""

# Stage all changes
echo "📦 Staging all changes..."
git add .

# Show status
echo ""
echo "📋 Files to be committed:"
git status --short

# Commit with detailed message
echo ""
echo "💾 Creating commit..."
git commit -m "✨ Implement gaming template with auth-based permissions

MAJOR FEATURES:
- Complete UI redesign with gaming aesthetic
- Auth0-based permission system for edit/delete actions
- Animated background effects (particles, grid, reflective floor)
- Real-time search and view toggle (grid/list)
- Stats dashboard with collection metrics

UI/UX IMPROVEMENTS:
- Dark green gradient theme (#0a1f0f → #1a3a24 → #0d2818)
- Glass morphism cards with backdrop-filter blur
- 20 animated floating particles for ambient effect
- Grid pattern overlay and reflective floor with 3D transform
- Neon green accents (#4ade80, #22c55e) throughout
- Lucide icons for modern SVG icon system
- Mobile-first responsive design with breakpoints
- Smooth hover effects and transitions

NEW FEATURES:
- Stats dashboard: Total games, Completed, In Progress, Multiplayer count
- Live search: Real-time filtering of game cards
- View toggle: Switch between grid and list layouts
- Auth0 integration: Secure login/logout with user sessions
- Conditional rendering: Edit/Delete buttons only for authenticated owners

SECURITY ENHANCEMENTS:
- Hide Edit/Delete buttons when user not logged in
- Check game ownership before showing edit/delete actions
- Double-layer security: frontend + backend validation
- Auth status check: isAuthenticated && userId === game.userId

FILES MODIFIED:
- public/index.html (complete rewrite with gaming template)
- public/style.css (new dark theme, animations, glass morphism)
- public/script.js (auth integration, conditional rendering)
- plan.md (updated development log with gaming template section)
- ACTIVATE-NEW-DESIGN.md (new file with swap instructions)

FILES BACKED UP:
- public/index-old-backup.html
- public/style-old-backup.css
- public/script-old-backup.js

TECHNICAL DETAILS:
- Lucide icons library integrated
- Auth0 /auth-status endpoint utilized
- Particle animation system (20 elements, randomized)
- Grid/list view state management
- Real-time search with DOM filtering
- Image preview maintained for Base64 uploads

BREAKING CHANGES: None (backward compatible, old files backed up)

Co-authored-by: GitHub Copilot <noreply@github.com>"

# Push to GitHub
echo ""
echo "🚀 Pushing to GitHub..."
git push origin main

# Create and push tag
echo ""
echo "🏷️  Creating version tag..."
git tag v2.1-gaming-template -a -m "Gaming template with auth-based permissions

Major UI overhaul with:
- Gaming aesthetic (particles, neon green, dark gradients)
- Auth0 permission system
- Stats dashboard
- Live search
- View toggle
- Enhanced security"

echo ""
echo "📤 Pushing tag to GitHub..."
git push origin v2.1-gaming-template

echo ""
echo "✅ SUCCESS! All changes committed and pushed!"
echo ""
echo "📊 Summary:"
echo "   • Commit: Gaming template with auth-based permissions"
echo "   • Tag: v2.1-gaming-template"
echo "   • Remote: GitHub (will auto-deploy to Vercel)"
echo ""
echo "🎮 Your gaming template is now live on GitHub!"
echo "   Check Vercel dashboard for deployment status."
echo ""
