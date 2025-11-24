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
