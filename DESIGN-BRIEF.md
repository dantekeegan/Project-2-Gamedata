# Design Brief - Video Game Collection Manager
## UI/UX Design Handoff Package

---

## � What is Being Created?

The **Video Game Collection Manager** is a modern, full-stack web application designed to help gamers organize, track, and manage their personal video game libraries. Think of it as a digital catalog for your gaming collection—similar to how Goodreads manages books or Letterboxd tracks movies, but specifically tailored for video games.

### The Problem It Solves

Gamers often accumulate large collections of games across multiple platforms (PC, PlayStation, Xbox, Switch, mobile) and struggle to:
- Remember which games they own
- Track which games they've completed vs. games in their backlog
- Recall their ratings and thoughts about games
- Organize their collection in one centralized place
- Share their collection with friends or the gaming community

### The Solution

This application provides a **clean, intuitive interface** where users can:
1. **Add games** to their personal collection with detailed information (title, publisher, developer, genre, platform, rating, price, cover image)
2. **Track progress** by marking games as completed, logging hours played, and rating difficulty/replay value
3. **Organize visually** with a card-based grid layout showing game covers and key details at a glance
4. **Edit and update** game information as they play and discover more
5. **Secure their data** with Auth0 authentication—each user sees only their own collection
6. **Access anywhere** through cloud storage (MongoDB Atlas) with a responsive design that works on desktop, tablet, and mobile

### Key Features

**For Gamers:**
- 🎮 **Personal Library**: Your own curated collection of games
- 📊 **Progress Tracking**: Mark games as completed, track hours played
- ⭐ **Rating System**: Rate games out of 10 with difficulty and replay value scores
- 🖼️ **Visual Organization**: Upload game cover images for easy browsing
- 🔍 **Search & Filter**: Find games quickly in your collection (future feature)
- 📱 **Multi-Platform**: Track games across PC, consoles, and mobile

**For Collectors:**
- 📝 **Detailed Metadata**: Store publisher, developer, release date, genre, platform
- 💰 **Price Tracking**: Record purchase prices to track your gaming investment
- 🎯 **Completion Status**: See your backlog vs. completed games at a glance
- 👥 **Multiplayer Tags**: Mark which games have multiplayer features

**Technical Highlights:**
- 🔐 **Secure Authentication**: Industry-standard Auth0 login with OAuth 2.0
- ☁️ **Cloud Storage**: Data stored in MongoDB Atlas for reliability and scalability
- 🚀 **Fast & Modern**: Built with vanilla JavaScript for speed, deployed on Vercel's edge network
- 📱 **Responsive Design**: Works seamlessly on phones, tablets, and desktops
- 🎨 **Gaming Aesthetic**: Dark theme with vibrant green accents and bold Bungee font

### User Experience Flow

**First-Time User:**
1. Lands on the app → Sees login prompt
2. Logs in with Auth0 (email/password or social login)
3. Sees empty collection with "Add New Game" button
4. Clicks button → Modal form opens
5. Fills in game details (title, description required; other fields optional)
6. Uploads cover image (optional)
7. Clicks "Save" → Game card appears in their collection
8. Repeats to build their library

**Returning User:**
1. Logs in → Sees their game collection in a grid
2. Can browse, edit, or delete existing games
3. Can add new games as they acquire them
4. Can update progress (mark as completed, add hours played, adjust rating)
5. Logs out when done → Data is saved securely in the cloud

### What Makes It Unique

Unlike generic database apps or spreadsheets, this tool is **specifically designed for gamers**:
- **Gaming-first design**: Dark theme, vibrant colors, playful typography
- **Visual focus**: Game cover images front and center
- **Gamer-relevant fields**: Multiplayer support, difficulty rating, replay value
- **Quick input**: Only title and description required—add more details as you play
- **Personal ownership**: Each user's collection is private and secure

### Current Status

The application is a **fully functional MVP** with:
- ✅ Complete CRUD operations (Create, Read, Update, Delete)
- ✅ Auth0 authentication integration
- ✅ User-specific collections (each user sees only their games)
- ✅ Image upload with Base64 encoding
- ✅ Responsive grid layout
- ✅ Form validation
- ✅ Toast notifications for user feedback
- ✅ MongoDB Atlas cloud storage

**What's Next:**
This design brief aims to enhance the **visual design and user experience** while maintaining the solid technical foundation already in place. The goal is to create a polished, professional interface that gamers will love to use daily.

---

## �📋 Project Overview

**Project Name**: Video Game Collection Manager  
**Type**: Full-stack web application  
**Purpose**: Personal video game collection management with user authentication  
**Target Users**: Gamers who want to track, organize, and manage their game libraries  
**Current Status**: Functional MVP with authentication, ready for UI redesign  
**Target Audience**: 
- Casual gamers with 10-50 games across multiple platforms
- Hardcore collectors with 100+ games who need organization
- Game reviewers/critics who want to track and rate games
- Streamers/YouTubers managing their content library  

---

## 🎯 Design Goals

### Primary Objectives
1. **Modern Gaming Aesthetic** - Bold, energetic design that appeals to gamers
2. **Intuitive UX** - Easy-to-use interface for managing collections
3. **Responsive Design** - Seamless experience across desktop, tablet, and mobile
4. **Visual Hierarchy** - Clear organization of game information and actions
5. **Accessibility** - WCAG 2.1 AA compliant

### Success Metrics
- Users can add a game in < 60 seconds
- 90%+ task completion rate for CRUD operations
- Mobile-first responsive design
- Load time < 3 seconds

---

## 🎨 Current Design System

### Color Palette

**Primary Colors**
```
Background Gradient: 
  - Start: #a2a2a0 (Gray)
  - Middle: #8a8a88 (Medium Gray)
  - End: #72726f (Dark Gray)
  - Angle: 135deg

Card Background: #64647a (Purple-Gray)
Primary Accent: #0adb1f (Bright Green) - Used for headings, highlights
Secondary Accent: #4CAF50 (Material Green) - Used for buttons
Text Colors:
  - Primary: #ffffff (White)
  - Publisher/Developer: rgba(28, 242, 9, 0.7) (Translucent Green)
  - Error: #d32f2f (Red)
```

**Button Colors**
```
Primary (Save): #4CAF50 → Hover: #45a049
Secondary (Cancel): #8a8a8a → Hover: #656565
Delete: #f44336 → Hover: #da190b
```

### Typography

**Font Family**: "Bungee", sans-serif  
**Fallback**: sans-serif  
**Source**: Google Fonts

**Type Scale**
```
H1: Bright green (#0adb1f)
H2-H6: Bright green (#0adb1f)
Body: White (#ffffff)
Small/Meta: rgba(255,255,255,0.7)
```

### Spacing Scale

```
xs: 4px   (0.25rem)
sm: 8px   (0.5rem)
md: 16px  (1rem)
lg: 24px  (1.5rem)
xl: 32px  (2rem)
2xl: 48px (3rem)
```

### Border Radius

```
Small: 4px (inputs, tags)
Medium: 8px (buttons)
Large: 12px (cards, modals)
XLarge: 16px (containers)
```

### Shadows

```css
Card Default: 0 2px 4px rgba(0,0,0,0.2)
Card Hover: 0 6px 12px rgba(0,0,0,0.3)
Modal: 0 10px 30px rgba(0,0,0,0.5)
Button: 0 4px 6px rgba(0,0,0,0.2)
```

### Transitions

```css
Default: all 0.3s ease
Hover: transform 0.2s ease
Modal: opacity 0.3s ease
```

---

## 🧩 Component Inventory

### 1. Navigation Components

**Header**
- Logo/Title: "Video Game Collection Manager"
- Subtitle: "CRUD: a full data lifecycle"
- Auth Buttons: Login/Logout
- User Info Display: "Welcome, [Name]"

**Primary Actions**
- "Add New Game" button (with + icon)
- Visible only when logged in

### 2. Authentication Components

**Login State (Not Authenticated)**
- Prominent login button/link
- Hide "Add New Game" button
- Show public game collection (optional)

**Logged In State**
- User name display
- Logout link
- Show "Add New Game" button
- Show user's personal collection

### 3. Game Card Component

**Card Structure**
```
┌─────────────────────────────┐
│ [Cover Image]  Game Title   │
│ 60x60px       Publisher     │
│               Developer     │
├─────────────────────────────┤
│ Description (3 lines max)   │
├─────────────────────────────┤
│ 📱 Platform  🎮 Genre       │
│ ⭐ Rating    💰 Price       │
│ ⏱️ Hours     ✅ Status       │
│ 👥 Multiplayer (if true)   │
├─────────────────────────────┤
│ [Edit Button] [Delete Btn]  │
└─────────────────────────────┘
```

**Card States**
- Default
- Hover (lift effect, stronger shadow)
- Loading (skeleton loader)
- Empty state

**Card Specs**
- Min Width: 280px
- Background: #64647a
- Border Radius: 12px
- Padding: 16px
- Gap: 12px
- Hover: translateY(-2px)

### 4. Form/Modal Components

**Add/Edit Game Modal**

**Modal Structure**
```
┌────────────────────────────────┐
│  🎮 Add a Video Game      [X]  │
│  Add a game to collection      │
├────────────────────────────────┤
│                                │
│  [Form Fields - Scrollable]    │
│                                │
│  • Title *                     │
│  • Release Date                │
│  • Cover Image Upload          │
│  • Genre (dropdown)            │
│  • Platform (dropdown)         │
│  • Publisher                   │
│  • Developer                   │
│  • Rating (0-10)               │
│  • Price (USD)                 │
│  • Hours Played                │
│  • Description * (textarea)    │
│  • Difficulty (slider)         │
│  • Replay Value (slider)       │
│  • ☑ Multiplayer               │
│  • ☑ Completed                 │
│                                │
├────────────────────────────────┤
│      [Cancel]    [Save]        │
└────────────────────────────────┘
```

**Form Input Types**
- Text: title, publisher, developer
- Date: releaseDate
- File: image upload with preview
- Select: genre, platform (15+ options each)
- Number: rating (0-10), price (USD), hoursPlayed
- Textarea: description (min 20 chars)
- Range: difficulty (0-10), replayValue (0-10)
- Checkbox: multiplayer, completed

**Validation States**
- Default
- Focus (green border)
- Valid
- Invalid (red border + message)
- Required field indicator (*)

### 5. Layout Components

**Main Grid**
- CSS Grid with auto-fill
- Min card width: 280px
- Max width: 1200px (centered)
- Gap: 20px
- Responsive: 1-4 columns based on viewport

**Status Indicators**
- MongoDB Ready: "✅ MongoDB is Ready"
- MongoDB Error: "❌ MongoDB not connected"
- Auth Status: "Upload Your Favourite Games here for others to see, enjoy!!!!"

### 6. Feedback Components

**Toast Notifications**
- Position: Fixed, bottom-right
- Types: Success (green), Error (red), Info (gray)
- Duration: 3.5 seconds
- Animation: Slide in from right

**Empty States**
- "No games yet."
- Login prompt for guests
- Illustration or icon (optional)

**Loading States**
- Spinner or skeleton loaders
- "Saving..." on buttons

---

## 📱 Responsive Breakpoints

```css
Mobile: 320px - 768px
  - Single column grid
  - Full-width modal
  - Stacked form fields

Tablet: 769px - 1024px
  - 2-3 column grid
  - Modal: 90% width
  - Side-by-side form fields

Desktop: 1025px+
  - 3-4 column grid
  - Modal: max 800px centered
  - Optimized form layout
```

---

## 🎬 User Flows

### Flow 1: New User Registration & First Game

```
1. User lands on homepage
   → Sees: Login prompt, empty/public game collection
   
2. User clicks "Login"
   → Redirects to Auth0 login page
   
3. User logs in with credentials
   → Redirects back to app
   → Shows: Welcome message, "Add New Game" button
   
4. User clicks "Add New Game"
   → Modal opens with empty form
   
5. User fills form (title*, description*, optional fields)
   → Sees: Live validation, image preview
   
6. User clicks "Save"
   → Modal closes
   → Toast: "Game created"
   → New card appears in grid
```

### Flow 2: Edit Existing Game

```
1. User views game collection
   → Sees: Grid of game cards
   
2. User clicks "Edit" on a card
   → Modal opens with pre-filled data
   → Image preview shown if exists
   
3. User modifies fields
   → Real-time validation
   
4. User clicks "Save"
   → Modal closes
   → Toast: "Game updated"
   → Card updates in grid
```

### Flow 3: Delete Game

```
1. User clicks "Delete" on card
   → Browser confirm dialog: "Delete this game?"
   
2. User confirms
   → Card removes from grid
   → Toast: "Game deleted"
   
3. (Alternative) User cancels
   → No action taken
```

### Flow 4: Logout

```
1. User clicks "Logout" link
   → Redirects to /logout
   → Auth0 handles logout
   
2. Redirects back to app
   → Shows: Login prompt
   → Hides: "Add New Game" button
   → Shows: Empty state or public games
```

---

## 🖼️ Screen Inventory

### Required Screens/States

1. **Homepage - Not Logged In**
   - Header with login button
   - Empty state or public games
   - About section
   - Footer

2. **Homepage - Logged In (Empty Collection)**
   - Header with user name + logout
   - "Add New Game" button
   - Empty state message
   - About section
   - Footer

3. **Homepage - Logged In (With Games)**
   - Header with user name + logout
   - "Add New Game" button
   - Grid of game cards (1-20+ games)
   - About section
   - Footer

4. **Add Game Modal**
   - Modal overlay
   - Form with all fields
   - Save/Cancel buttons

5. **Edit Game Modal**
   - Modal overlay
   - Form with pre-filled data
   - Image preview
   - Save/Cancel buttons

6. **Mobile Views** (320px-768px)
   - All above screens optimized for mobile
   - Stacked layout
   - Touch-friendly buttons (min 44x44px)

---

## 🎨 Design Principles

### 1. Gaming-First Aesthetic
- Bold, vibrant colors (neon green accent)
- Modern, playful font (Bungee)
- Dark theme for reduced eye strain
- High-contrast for readability

### 2. Content Hierarchy
- Primary: Game title, cover image
- Secondary: Publisher, developer, rating
- Tertiary: Meta info (hours, difficulty)
- Actions: Edit/Delete clearly separated

### 3. Progressive Disclosure
- Show essential info on card
- Full details in modal/expanded view
- Advanced filters collapsed by default

### 4. Feedback & Affordances
- Hover states on all interactive elements
- Loading indicators during async operations
- Success/error feedback via toasts
- Clear button labels (no icon-only)

### 5. Accessibility
- Color contrast ratio ≥ 4.5:1
- Keyboard navigation support
- Focus indicators
- Screen reader labels
- Touch targets ≥ 44x44px

---

## 🛠️ Technical Constraints

### Current Tech Stack
- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: Pure CSS3 (no preprocessors)
- **Backend**: Express.js + Prisma + MongoDB
- **Auth**: Auth0 (OAuth 2.0)
- **Deployment**: Vercel (serverless)

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Performance Requirements
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Lighthouse Score ≥ 90

---

## 📊 Data Structure

### Game Object Schema

```javascript
{
  id: "ObjectId",              // Auto-generated
  userId: "auth0|...",         // Owner's Auth0 ID
  title: "String",             // Required
  releaseDate: "DateTime",     // Optional
  image: "Base64String",       // Optional (cover image)
  genre: "String",             // Optional (dropdown)
  platform: "String",          // Optional (dropdown)
  publisher: "String",         // Optional
  developer: "String",         // Optional
  rating: "Float",             // 0-10 (optional)
  price: "Float",              // USD (optional)
  description: "String",       // Required (min 20 chars)
  multiplayer: "Boolean",      // Optional
  completed: "Boolean",        // Optional
  hoursPlayed: "Int",          // Optional
  difficulty: "Int",           // 0-10 (optional)
  replayValue: "Int"           // 0-10 (optional)
}
```

### Genre Options
Action, Adventure, RPG, Strategy, Simulation, Sports, Racing, Fighting, Platformer, Puzzle, Shooter, Horror, Survival, MMORPG, Other

### Platform Options
PC, PlayStation 5, PlayStation 4, Xbox Series X/S, Xbox One, Nintendo Switch, Mobile, Multi-Platform, Other

---

## 🎯 Design Deliverables

### Phase 1: Core Screens (Priority)
- [ ] Homepage - Not Logged In
- [ ] Homepage - Logged In (with games)
- [ ] Game Card Component (default, hover, states)
- [ ] Add/Edit Game Modal
- [ ] Mobile responsive layouts

### Phase 2: States & Interactions
- [ ] Empty states
- [ ] Loading states
- [ ] Error states
- [ ] Toast notifications
- [ ] Form validation states

### Phase 3: Advanced Features (Optional)
- [ ] Search/Filter UI
- [ ] Sorting options
- [ ] Pagination controls
- [ ] User profile page
- [ ] Game detail expanded view

---

## � Technical Implementation Details

### Database Schema (MongoDB via Prisma)

**Collection Name**: `videogames`

```prisma
model videogames {
  id              String    @id @default(auto()) @map("_id") @db.ObjectId
  userId          String?   // Auth0 user ID (owner)
  title           String?   // Game title - REQUIRED
  releaseDate     DateTime? @db.Date
  image           String?   // Base64 encoded image or URL
  genre           String?   // Selected from dropdown
  platform        String?   // Selected from dropdown
  publisher       String?   // Text input
  developer       String?   // Text input
  rating          Float?    // 0-10 with 0.1 step
  price           Float?    // USD with 0.01 step
  description     String?   // REQUIRED (min 20 chars)
  multiplayer     Boolean?  // Checkbox
  completed       Boolean?  // Checkbox
  hoursPlayed     Int?      // Whole number
  difficulty      Int?      // 0-10 slider
  replayValue     Int?      // 0-10 slider
  primaryColor    String?   // Hex color (future use)
  secondaryColor  String?   // Hex color (future use)
}
```

**Required Fields**: 
- `title` (String)
- `description` (String, min 20 characters)

**Optional Fields**: All others

**Auto-Generated**:
- `id` (MongoDB ObjectId)
- `userId` (added automatically from Auth0 session)

---

### API Endpoints

**Base URL**: 
- Local: `http://localhost:3003`
- Production: `https://your-app.vercel.app`

#### Authentication Endpoints

```
GET /login
  - Redirects to Auth0 login page
  - No auth required
  - Returns: Redirect to Auth0

GET /logout
  - Logs out user via Auth0
  - No auth required
  - Returns: Redirect to homepage

GET /callback
  - Auth0 callback handler
  - Handled by express-openid-connect
  - Returns: Redirect to homepage

GET /profile
  - Protected route (requires authentication)
  - Returns: User profile JSON
  - Auth: Required

GET /auth-status
  - Check current auth status
  - Returns: { isAuthenticated: boolean, user: object }
  - Auth: Optional
```

#### Game Management Endpoints

```
GET /data
  - Get all games for current user
  - Auth: Optional (shows only user's games if authenticated)
  - Returns: Array of game objects
  - Example Response:
    [
      {
        "id": "507f1f77bcf86cd799439011",
        "userId": "auth0|abc123",
        "title": "The Legend of Zelda",
        "publisher": "Nintendo",
        "rating": 9.5,
        ...
      }
    ]

GET /data/:id
  - Get single game by ID
  - Auth: Optional
  - Params: id (MongoDB ObjectId)
  - Returns: Single game object
  - Error: 404 if not found

POST /data
  - Create new game
  - Auth: Optional (userId added if authenticated)
  - Body: Game object (JSON)
  - Required: title, description
  - Returns: Created game object with id
  - Example Request:
    {
      "title": "Elden Ring",
      "description": "An action RPG developed by FromSoftware...",
      "genre": "RPG",
      "platform": "Multi-Platform",
      "rating": 9.2,
      "image": "data:image/png;base64,..."
    }

PUT /data/:id
  - Update existing game
  - Auth: Required (only owner can update)
  - Params: id (MongoDB ObjectId)
  - Body: Updated fields (JSON)
  - Returns: Updated game object
  - Error: 403 if not owner

DELETE /data/:id
  - Delete game
  - Auth: Required (only owner can delete)
  - Params: id (MongoDB ObjectId)
  - Returns: Deleted game object
  - Error: 403 if not owner

GET /search?terms=zelda
  - Search games by title
  - Auth: Optional
  - Query: terms (string)
  - Returns: Array of matching games (max 10)

GET /status
  - Check server & MongoDB status
  - Auth: Not required
  - Returns: { ok: true, mongo: boolean }
```

**Error Responses**:
```json
{
  "error": "Error message",
  "details": "Detailed error information"
}
```

**Status Codes**:
- 200: Success
- 201: Created
- 400: Bad Request (validation error)
- 403: Forbidden (not authorized)
- 404: Not Found
- 500: Server Error

---

### Upload Logic

#### Image Upload Flow

**Method**: Base64 Encoding (client-side)

**Process**:
1. User selects image file via file input
2. JavaScript FileReader converts to Base64
3. Preview shown in modal before save
4. Base64 string stored in MongoDB
5. Image displayed on cards using data URI

**Implementation**:
```javascript
// Client-side (script.js)
imageInput.addEventListener('change', () => {
  const file = imageInput.files?.[0]
  if (!file) return
  
  const reader = new FileReader()
  reader.onload = () => {
    // reader.result contains Base64 string
    imagePreview.src = reader.result
    imagePreview.style.display = 'block'
  }
  reader.readAsDataURL(file)
})
```

**File Constraints**:
- Max Size: 10MB (server limit)
- Accepted Types: `image/*` (jpg, png, gif, webp)
- Recommended: 400x400px or smaller for performance

**Storage**:
- Format: `data:image/png;base64,iVBORw0KGgoAAAANS...`
- Location: MongoDB `image` field (String)
- Alternative: Could use Cloudinary/S3 (future enhancement)

---

### Authentication Requirements

**Provider**: Auth0 (OAuth 2.0)

**Configuration**:
```env
AUTH0_SECRET=<long-random-string>
AUTH0_CLIENT_ID=L047OKYeLYM3gWUyG2TSVXD2nAiRwujH
AUTH0_ISSUER_BASE_URL=https://dev-q01vo3p7kit7cbpp.us.auth0.com
BASE_URL=http://localhost:3003
```

**User Object** (from Auth0):
```javascript
{
  sub: "auth0|6925d603b2bc8e6bf795d234", // Unique user ID
  name: "John Doe",
  email: "john@example.com",
  email_verified: true,
  picture: "https://..."
}
```

**Authentication Flow**:
1. User clicks "Login"
2. Redirects to Auth0 login page
3. User enters credentials or social login
4. Auth0 validates & creates session
5. Redirects to `/callback`
6. express-openid-connect creates session cookie
7. User redirected to homepage (logged in)

**Session Management**:
- Session stored in encrypted cookie
- Expires based on Auth0 settings
- Logout clears cookie & Auth0 session

**Permissions**:

| Action | Not Logged In | Logged In (Owner) | Logged In (Not Owner) |
|--------|---------------|-------------------|----------------------|
| View all games | ✅ (public) | ✅ (own games) | ✅ (own games) |
| View single game | ✅ | ✅ | ✅ |
| Create game | ❌ | ✅ | ✅ |
| Edit game | ❌ | ✅ (own) | ❌ |
| Delete game | ❌ | ✅ (own) | ❌ |

**Frontend Auth Check**:
```javascript
// Check if user is authenticated
const authData = await fetch('/auth-status').then(r => r.json())

if (authData.isAuthenticated) {
  // Show "Add New Game" button
  // Show user name & logout
  // Enable edit/delete on own games
} else {
  // Show "Login" button
  // Hide "Add New Game"
  // Hide edit/delete buttons
}
```

---

### Existing Code Snippets

#### Form Data Builder (script.js)

```javascript
function buildData(imageData) {
  return {
    title: form.title.value.trim(),
    releaseDate: form.releaseDate.value ? 
      new Date(form.releaseDate.value).toISOString() : null,
    image: imageData || null,
    genre: form.genre.value || null,
    platform: form.platform.value || null,
    publisher: form.publisher.value.trim() || null,
    developer: form.developer.value.trim() || null,
    rating: form.rating.value ? Number(form.rating.value) : null,
    price: form.price.value ? Number(form.price.value) : null,
    hoursPlayed: form.hoursPlayed.value ? 
      Number(form.hoursPlayed.value) : null,
    description: form.description.value.trim(),
    difficulty: form.difficulty.value ? 
      Number(form.difficulty.value) : null,
    replayValue: form.replayValue.value ? 
      Number(form.replayValue.value) : null,
    multiplayer: form.multiplayer.checked,
    completed: form.completed.checked
  }
}
```

#### Form Validation (script.js)

```javascript
function validateForm() {
  // Use native HTML5 validation
  if (!myForm.reportValidity()) return false
  
  // Custom validation: description min length
  if (myForm.description.value.trim().length < 20) {
    alert('Description must be at least 20 characters.')
    return false
  }
  
  return true
}
```

#### Save Handler (script.js)

```javascript
saveButton.addEventListener('click', async () => {
  if (!validateForm()) return
  
  saveButton.disabled = true
  showToast('Saving...', 'info')
  
  const id = document.getElementById('id').value
  const file = imageInput.files?.[0]
  
  if (file) {
    const reader = new FileReader()
    reader.onload = async () => {
      const data = buildData(reader.result) // Base64 image
      await postOrPut(data, id)
      formDialog.close()
      await loadGames()
      showToast(id ? 'Game updated' : 'Game created', 'info')
      saveButton.disabled = false
    }
    reader.readAsDataURL(file)
  } else {
    const data = buildData(null) // No image
    await postOrPut(data, id)
    formDialog.close()
    await loadGames()
    showToast(id ? 'Game updated' : 'Game created', 'info')
    saveButton.disabled = false
  }
})
```

#### API Call Utility (script.js)

```javascript
async function postOrPut(data, id) {
  const method = id ? 'PUT' : 'POST'
  const url = id ? apiUrl(`/data/${id}`) : apiUrl('/data')
  
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`Server ${res.status}: ${txt}`)
  }
  
  return res.json()
}
```

#### Card Renderer (script.js)

```javascript
function renderGames(items) {
  if (!Array.isArray(items) || items.length === 0) {
    contentArea.innerHTML = '<p>No games yet.</p>'
    return
  }
  
  contentArea.innerHTML = items.map(item => {
    const imgTag = item.image ? 
      `<img class="game-cover" src="${sanitize(item.image)}" 
            alt="${sanitize(item.title)}" />` : ''
    
    return `
      <article class="game-card" data-id="${sanitize(item.id)}">
        <header>
          ${imgTag}
          <div>
            <h3>${sanitize(item.title)}</h3>
            ${item.publisher ? 
              `<small>Publisher: ${sanitize(item.publisher)}</small>` 
              : ''}
          </div>
        </header>
        <p>${sanitize(item.description || '')}</p>
        <div class="game-meta">
          ${item.platform ? `<span>📱 ${sanitize(item.platform)}</span>` : ''}
          ${item.genre ? `<span>🎮 ${sanitize(item.genre)}</span>` : ''}
          ${item.rating ? `<span>⭐ ${item.rating}/10</span>` : ''}
          ${item.price ? `<span>💰 $${item.price}</span>` : ''}
          ${item.completed ? `<span>✅ Completed</span>` : 
            `<span>🎯 In Progress</span>`}
        </div>
        <div class="actions">
          <button class="edit" data-id="${sanitize(item.id)}">Edit</button>
          <button class="delete" data-id="${sanitize(item.id)}">Delete</button>
        </div>
      </article>
    `
  }).join('')
  
  attachRowListeners()
}
```

#### Server-side Protection (routes/api.js)

```javascript
// Create - adds userId automatically
router.post('/data', async (req, res) => {
  const { id, ...createData } = req.body
  
  // Add user ID if authenticated
  if (req.oidc?.isAuthenticated()) {
    createData.userId = req.oidc.user.sub
  }
  
  const created = await prisma.videogames.create({
    data: createData
  })
  res.status(201).send(created)
})

// Update - only owner can edit
router.put('/data/:id', async (req, res) => {
  // Check ownership
  if (req.oidc?.isAuthenticated()) {
    const existing = await prisma.videogames.findUnique({
      where: { id: req.params.id }
    })
    if (existing && existing.userId !== req.oidc.user.sub) {
      return res.status(403).send({ 
        error: 'Not authorized to update this record' 
      })
    }
  }
  
  const { id, userId, ...updateData } = req.body
  const updated = await prisma.videogames.update({
    where: { id: req.params.id },
    data: updateData
  })
  res.send(updated)
})
```

---

## �📦 File Exports

### What to Provide Back

1. **Figma File** (.fig)
   - Organized pages/frames
   - Component library
   - Design tokens/variables

2. **Design System Document**
   - Color codes
   - Typography specs
   - Spacing system
   - Component documentation

3. **Assets** (exported)
   - Icons (SVG)
   - Images (PNG, JPG)
   - Logos
   - Illustrations

4. **Prototypes**
   - Interactive flows
   - Animation specs
   - Microinteractions

5. **Developer Handoff**
   - Zeplin/Figma Inspect link
   - CSS snippets
   - Animation timing
   - Responsive breakpoints

---

## 🔗 Reference Links

- **GitHub Repository**: https://github.com/dantekeegan/Project-2-Gamedata
- **Live Demo**: [Vercel URL when deployed]
- **Auth0 Docs**: https://auth0.com/docs
- **Bungee Font**: https://fonts.google.com/specimen/Bungee

---

## 📞 Contact & Collaboration

**Developer**: Keegan Honore  
**Original Template**: Harold Sikkema (Sheridan College)  
**AI Assistance**: GitHub Copilot  

**Communication**:
- Design questions: [Your contact]
- Technical feasibility: [Your contact]
- Review cycles: Weekly check-ins

---

## ✅ Acceptance Criteria

### Must Have
- ✅ Mobile-first responsive design
- ✅ Dark theme with green accents
- ✅ All CRUD operations visualized
- ✅ Clear auth states (logged in/out)
- ✅ Accessible (WCAG AA)

### Should Have
- ✅ Smooth animations/transitions
- ✅ Loading & empty states
- ✅ Form validation feedback
- ✅ Toast notifications

### Nice to Have
- Search/filter UI
- Sorting controls
- Advanced game details view
- User profile customization

---

## 📅 Timeline Estimate

- **Week 1**: Core screens & component library
- **Week 2**: Responsive layouts & interactions
- **Week 3**: Refinement & developer handoff
- **Week 4**: Feedback & iterations

---

**Last Updated**: January 2025  
**Version**: 1.0  
**Status**: Ready for Design Phase