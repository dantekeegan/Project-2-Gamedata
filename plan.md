# Plan to Migrate from Cats to Video Games

## Objective
The goal is to modify the existing HTML form and rendering logic to reflect the structure of video games instead of cats. This involves updating the form fields, rendering templates, and ensuring the application logic aligns with the new schema for video games.

## Video Game Model Structure

The new `videogames` model will include the following fields:

```prisma
model videogames {
  id              String    @id @default(auto()) @map("_id") @db.ObjectId
  title           String?   // Game title
  releaseDate     DateTime? @db.Date // Release date
  genre           String?   // Action, RPG, Strategy, etc.
  platform        String?   // PC, PlayStation, Xbox, Nintendo Switch, etc.
  publisher       String?   // Game publisher
  developer       String?   // Game developer
  rating          Float?    // Rating out of 10
  price           Float?    // Price in dollars
  description     String?   // Game description/summary
  multiplayer     Boolean?  // Has multiplayer mode
  completed       Boolean?  // User completed the game
  hoursPlayed     Int?      // Hours played
  difficulty      Int?      // Difficulty level (1-10)
  replayValue     Int?      // Replay value (1-10)
  primaryColor    String?   // Primary theme color
  secondaryColor  String?   // Secondary theme color
}
```

## Migration Steps

### 1. Update Prisma Schema
- Replace the `cats` model with the `videogames` model
- Update field names and types to match video game attributes
- Keep color fields for visual design consistency

### 2. Update API Routes (routes/api.js)
- Change model constant from `'cats'` to `'videogames'`
- Update search field from `name` to `title`

### 3. Update HTML Form (public/index.html)
- Replace form fields:
  - `name` → `title` (text input)
  - `birthDate` → `releaseDate` (date input)
  - `breed` → `genre` (select dropdown)
  - Add `platform` (select dropdown)
  - Add `publisher` (text input)
  - Add `developer` (text input)
  - `playfulness` → `difficulty` (range slider)
  - `appetite` → `replayValue` (range slider)
  - Add `rating` (number input 0-10)
  - Add `price` (number input with decimals)
  - Add `hoursPlayed` (number input)
  - `food` → Remove (not applicable)
  - `isAdopted` → `completed` (checkbox)
  - `microchip` → Remove (not applicable)
  - Add `multiplayer` (checkbox)
  - Keep `primaryColor` and `secondaryColor` for styling
  - Keep `description` for game summary

### 4. Update JavaScript Rendering (public/script.js)
- Modify `renderItem()` function:
  - Display `title` instead of `name`
  - Show `releaseDate` with calendar widget
  - Display `genre`, `platform`, `publisher`
  - Show `rating`, `price`, `hoursPlayed`
  - Display `difficulty` and `replayValue` meters
  - Show completion status and multiplayer badge
  - Update icons and styling to match video game theme

### 5. Update Page Content (public/index.html)
- Change page title to "Managing Video Game Data"
- Update headings and descriptions
- Replace cat emojis with game controller emoji 🎮
- Update intro text to reflect video game context

### 6. Update CSS (if needed)
- Keep existing card layout
- Adjust icons and styling for video game theme
- Ensure calendar widget works with release dates

## Implementation Order

1. ✅ Update plan.md with detailed strategy (this file)
2. ✅ Update Prisma schema.prisma (added `image` field, removed `primaryColor`/`secondaryColor` from plan but kept in schema)
3. ✅ Update routes/api.js model name (changed to 'videogames')
4. ✅ Update public/index.html form fields (all video game fields added)
5. ✅ Update public/script.js rendering template (dual rendering: old renderItem + new renderGames)
6. ✅ Update page titles and headings (changed to Video Game Collection Manager)
7. ✅ Test all CRUD operations (working)

## Notes
- Maintain the existing card-based layout
- Keep color customization for visual appeal
- Ensure form validation works with new fields
- Test date handling for release dates
- Verify number inputs accept appropriate ranges

## Current State (Checkpoint - Jan 2025)

### Completed Changes
- ✅ Prisma schema updated with videogames model including `image` field
- ✅ MongoDB connection via mongoose in server.js with fallback to DATABASE_URL
- ✅ Express body limit increased to 10mb for Base64 images
- ✅ Form fields updated: image upload, all game attributes (genre, platform, publisher, developer, rating, price, hoursPlayed, difficulty, replayValue, multiplayer, completed)
- ✅ Image upload with Base64 encoding and preview
- ✅ Date handling fixed: converts to ISO-8601 DateTime for Prisma
- ✅ Dual rendering system: renderItem (old detailed cards) + renderGames (new simplified cards)
- ✅ CRUD operations working: Create, Read, Update, Delete
- ✅ Toast notifications for user feedback
- ✅ Status endpoint for MongoDB connection check
- ✅ Remove duplicate functions (deleteItem, saveButton listener)

### File Structure
```
Project-2-Gamedata/
├── .env (DATABASE_URL for MongoDB Atlas)
├── package.json (express, mongoose, dotenv, @prisma/client, prisma)
├── server.js (Express + Mongoose + /status endpoint)
├── prisma/
│   └── schema.prisma (videogames model with image field)
├── routes/
│   └── api.js (CRUD endpoints for videogames)
└── public/
    ├── index.html (form with image upload)
    ├── script.js (dual rendering, image handling)
    ├── style.css
    └── assets/ (SVG icons - cat-themed, can be renamed later)
```

### Bug Fixes & Solutions

#### Edit Button Issue (Resolved - Jan 2025)
**Problem**: Edit button returned 404 error when clicked
- Error: `Fetch item failed: 404 Not Found - Cannot GET /data/:id`
- Root cause: Missing GET `/data/:id` endpoint in `routes/api.js`
- The API only had GET `/data` (list all) but not GET `/data/:id` (single item)

**Solution**: Added GET `/data/:id` endpoint to `routes/api.js`
```javascript
router.get('/data/:id', async (req, res) => {
  try {
    const item = await prisma[model].findUnique({
      where: { id: req.params.id }
    })
    if (!item) {
      return res.status(404).json({ error: 'Item not found' })
    }
    res.json(item)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch item' })
  }
})
```

**Files Modified**:
- `routes/api.js` - Added GET `/data/:id` endpoint
- `public/script.js` - Enhanced error logging in `startEdit()` function

**Debug Steps Taken**:
1. Added console logging to track button clicks and ID values
2. Checked API routes file - discovered missing endpoint
3. Added proper error handling with detailed messages
4. Tested locally before deployment

### Known Issues / Tech Debt
- Two rendering functions coexist: `renderItem()` (detailed) and `renderGames()` (simple cards)
- Currently using `renderGames()` for display, `renderItem()` unused but kept
- Image stored as Base64 (can be large, consider external storage like Cloudinary/S3)
- `primaryColor`/`secondaryColor` still in schema but not used in new form
- Asset SVGs still cat-themed (can rename: cat→game, adopted→completed, etc.)

### How to Run
```bash
cd "/Users/keeganhonore/Project 2 Gamedata/Project-2-Gamedata"
npm install
npx prisma generate
npm run start
```
Visit: http://localhost:3003

### Dependencies
```json
{
  "express": "^5.1.0",
  "mongoose": "^8.0.0",
  "dotenv": "^16.0.0",
  "@prisma/client": "^6.18.0",
  "prisma": "^6.18.0" (dev)
}
```

### Environment Variables (.env)
```
DATABASE_URL="mongodb+srv://user:pass@cluster.mongodb.net/Project-2"
PORT=3003
```

### Next Steps (Optional)
- Remove unused `renderItem()` or consolidate rendering
- Switch to cloud image storage (reduce DB size)
- Remove `primaryColor`/`secondaryColor` from schema if not needed
- Rename asset SVGs to video game theme
- Add search functionality to frontend
- Add pagination for large collections
- Implement sorting/filtering UI

## Citations & Acknowledgments

### Original Template
- **Creator**: Harold Sikkema
- **Source**: Systems Design, Interaction Design Program, Sheridan College
- **Original Repository**: [Managing Data - CRUD Template](https://github.com/ixd-system-design)
- **License**: Educational use

### Modified By
- **Developer**: Keegan Honore
- **Date**: January 2025
- **Modifications**: Migrated from cat adoption tracker to video game collection manager

### AI Assistance
- **Tool**: GitHub Copilot
- **Date**: January 2025
- **Assistance Provided**: 
  - Code refactoring and debugging
  - Prisma schema migration
  - Frontend rendering logic updates
  - CSS styling enhancements (Bungee font, gradient backgrounds, dark theme cards)
  - Form validation and error handling
  - API endpoint optimization
  - Vercel deployment configuration

### Technologies Used
- **Frontend**: HTML5, CSS3, JavaScript (ES6+), DOMPurify
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas, Mongoose, Prisma ORM
- **Deployment**: Vercel
- **Fonts**: Google Fonts (Bungee)
- **Version Control**: Git, GitHub

### References
1. Express.js Documentation. (n.d.). Retrieved from https://expressjs.com/
2. Prisma Documentation. (n.d.). Retrieved from https://www.prisma.io/docs/
3. MongoDB Atlas Documentation. (n.d.). Retrieved from https://www.mongodb.com/docs/atlas/
4. MDN Web Docs - CRUD Operations. (n.d.). Retrieved from https://developer.mozilla.org/en-US/docs/Glossary/CRUD
5. Vercel Documentation. (n.d.). Retrieved from https://vercel.com/docs

### License
This project is for educational purposes. Original template by Harold Sikkema. Modifications and extensions by Keegan Honore with AI assistance from GitHub Copilot.

---

## Development Log - User Prompts & Changes

This section documents all user-requested customizations and changes made during development.

### Design & Styling Changes
1. **Game card styling** - Updated to match dark theme (#64647a background)
   - Changed from white cards to dark purple-gray
   - Added grid layout with rounded 12px borders
   - Implemented hover effects (translateY, box-shadow)

2. **Add New Game button** - Created custom SVG icon
   - Added plus (+) icon using inline SVG data URI
   - Green background (#4CAF50) with hover effects
   - Positioned icon to left of text

3. **Form styling** - Matched to game card design
   - Dark modal background (#64647a)
   - Semi-transparent input backgrounds
   - Green focus borders (#4CAF50)
   - Dark fieldsets with rgba(0,0,0,0.15)

4. **Choose Image button** - Styled like Add New Game button
   - Green background with hover effect
   - Removed default file selector button
   - Added smooth transitions

5. **Font change** - Switched to Bungee font
   - Replaced Jost with Bungee from Google Fonts
   - Applied to entire body
   - Bold, playful gaming aesthetic

6. **Header colors** - Bright green (#0adb1f)
   - All h1-h6 headings
   - Matches gaming theme

7. **Background gradient** - Linear gradient
   - Changed from solid gray to diagonal gradient
   - Colors: #a2a2a0 → #8a8a88 → #72726f
   - 135deg angle

8. **Publisher/Developer text colors**
   - Publisher: Bright green (rgba(28, 242, 9, 0.7))
   - Developer: Initially green, then reverted to green
   - Small tags with game details

### Content Changes
9. **About section rewrite** - Better description
   - Changed from technical CRUD explanation
   - User-friendly feature list with emojis
   - "How It Works" section
   - "Getting Started" guide
   - Focused on video game collection use case

### Functional Fixes
10. **Edit button not working** - Fixed 404 error
    - **Problem**: GET `/data/:id` endpoint missing
    - **Solution**: Added endpoint to `routes/api.js`
    - **Debugging**: Added console logging throughout
    - **Files modified**: `routes/api.js`, `public/script.js`

### Background Attempts
11. **Background image** - Attempted, then reverted
    - User requested gaming-themed background image
    - Temporarily added, then chose to keep gradient instead
    - Gradient provided better readability

### Deployment
12. **Vercel deployment** - Published to production
    - Created `vercel.json` configuration
    - Set up environment variables (DATABASE_URL)
    - Deployed via GitHub integration
    - Troubleshot MongoDB connection issues

13. **Git workflow** - Push to GitHub
    - Resolved divergent branches
    - Used merge strategy
    - Committed all changes
    - Auto-deployed to Vercel

### Documentation
14. **System design diagram** - Created SYSTEM-DESIGN.md
    - Mermaid architecture diagram
    - 3-tier architecture visualization
    - Technology stack breakdown

15. **Citations** - Added acknowledgments
    - Original creator (Harold Sikkema)
    - AI assistance (GitHub Copilot)
    - Technologies used
    - References list

16. **Development log** - This section
    - Comprehensive prompt history
    - Chronological change log
    - Solution documentation

### Testing & Iteration
17. **Local testing** - Run server locally
    - `npm run start` on localhost:3003
    - Browser console debugging
    - Network tab inspection

18. **File saving** - Explained auto-save behavior
    - All changes saved automatically
    - Optional backup methods (zip, git)

### Color Customizations
- Card background: #64647a
- Header text: #0adb1f
- Publisher text: rgba(28, 242, 9, 0.7)
- Button green: #4CAF50
- Background gradient: #a2a2a0 → #72726f

### Key Learning Points
- Edit functionality requires both frontend button AND backend endpoint
- Vercel deployment needs environment variables configured separately
- Base64 images increase database size but simplify storage
- Console logging essential for debugging API issues
- Git merge strategy preserves all history

---

## Summary of Changes from Original Template

**Original**: Cat adoption tracker with simple form
**Modified**: Professional video game collection manager with:
- Dark gaming theme
- Custom Bungee font
- Image upload with preview
- Comprehensive game metadata
- Full CRUD with edit functionality
- Toast notifications
- Status monitoring
- Vercel deployment ready
- Gradient background
- Professional About section
