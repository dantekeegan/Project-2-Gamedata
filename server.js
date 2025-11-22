// Express is a framework for building APIs and web apps
// See also: https://expressjs.com/
import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()
// Initialize Express app
const app = express()

// MongoDB connect (supports MONGODB_URI or DATABASE_URL)
const MONGODB_URI = process.env.MONGODB_URI || process.env.DATABASE_URL
let mongoReady = false
if (!MONGODB_URI) {
  console.warn('[Mongo] Missing MONGODB_URI or DATABASE_URL in .env')
} else {
  console.log('[Mongo] Connecting to:', MONGODB_URI.replace(/:\\?[^@]+@/, ':***@'))
  mongoose.connect(MONGODB_URI).then(() => {
    mongoReady = true
    console.log('[Mongo] Connected')
  }).catch(err => {
    mongoReady = false
    console.error('[Mongo] Connection error:', err.message)
  })
}

// Serve static files from /public folder (useful when running Node locally, optional on Vercel).
app.use(express.static('public'))
// Define index.html as the root explicitly (useful on Vercel, optional when running Node locally).
app.get('/', (req, res) => { res.redirect('/index.html') })

// Enable express to parse JSON data (with larger limit for base64 images)
app.use(express.json({ limit: '10mb' }))

// Status endpoint for frontend
app.get('/status', (req, res) => {
  res.json({ ok: true, mongo: mongoReady })
})

// Our API is defined in a separate module to keep things tidy.
// Let's import our API endpoints and activate them.
import apiRoutes from './routes/api.js'
app.use('/', apiRoutes)

const port = process.env.PORT || 3003
app.listen(port, () => {
  console.log(`Express is live at http://localhost:${port}`)
})
