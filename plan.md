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
2. Update Prisma schema.prisma
3. Update routes/api.js model name
4. Update public/index.html form fields
5. Update public/script.js rendering template
6. Update page titles and headings
7. Test all CRUD operations

## Notes
- Maintain the existing card-based layout
- Keep color customization for visual appeal
- Ensure form validation works with new fields
- Test date handling for release dates
- Verify number inputs accept appropriate ranges
