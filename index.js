// Express is a framework for building APIs and web apps
// See also: https://expressjs.com/
import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'
import pkg from 'express-openid-connect'
const { auth, requiresAuth } = pkg

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()
// Initialize Express app
const app = express()
const port = process.env.PORT || 3003

// Add CSP headers for Auth0 compatibility - TEMPORARILY DISABLED
// app.use((req, res, next) => {
//   res.setHeader(
//     'Content-Security-Policy',
//     "default-src 'self'; " +
//     "script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http:; " +
//     "style-src 'self' 'unsafe-inline' https: http:; " +
//     "font-src 'self' https: http: data:; " +
//     "img-src 'self' data: https: http:; " +
//     "connect-src 'self' https: http:"
//   )
//   next()
// })

// Auth0 Configuration (optional - only if all env vars are set)
if (process.env.AUTH0_SECRET && process.env.AUTH0_CLIENT_ID && process.env.AUTH0_ISSUER_BASE_URL) {
  const authConfig = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.BASE_URL || 'http://localhost:3003',
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
  }
  // Auth router attaches /login, /logout, and /callback routes
  app.use(auth(authConfig))
  console.log('[Auth0] Enabled')
} else {
  console.log('[Auth0] Disabled - missing environment variables')
}

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
// Enable express to parse JSON data (with larger limit for base64 images)
app.use(express.json({ limit: '10mb' }))

// Serve static files from public directory with absolute path
app.use(express.static(path.join(__dirname, 'public')))

// Define index.html as the root explicitly
app.get('/', (req, res) => { 
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Status endpoint for frontend
app.get('/status', (req, res) => {
  res.json({ ok: true, mongo: mongoReady })
})

// Auth status endpoint
app.get('/auth-status', (req, res) => {
  res.json({
    isAuthenticated: req.oidc?.isAuthenticated() || false,
    user: req.oidc?.user || null
  })
})

// Protected profile route - requires authentication (only if Auth0 is enabled)
if (process.env.AUTH0_SECRET && process.env.AUTH0_CLIENT_ID && process.env.AUTH0_ISSUER_BASE_URL) {
  app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user, null, 2))
  })
}

// Test route for Vercel debugging
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!', timestamp: new Date().toISOString() })
})

// Our API is defined in a separate module to keep things tidy.
// Let's import our API endpoints and activate them.
import apiRoutes from './routes/api.js'
app.use('/', apiRoutes)

// Start server only in development
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Express is live at http://localhost:${port}`)
  })
}

// Export for Vercel
export default app
