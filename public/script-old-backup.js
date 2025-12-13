// ========================================
// GAMING TEMPLATE + AUTH0 INTEGRATION
// Video Game Collection Manager
// ========================================

// ========================================
// CONFIGURATION
// ========================================
const apiUrl = (path) => path

// ========================================
// INITIALIZE ON DOM LOAD
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  lucide.createIcons()
  
  // Initialize template features
  initializeParticles()
  initializeModal()
  initializeSearch()
  initializeViewToggle()
  initializeSliders()
  initializeImagePreview()
  
  // Initialize app
  checkMongoStatus()
  checkAuthStatus()
  loadGames()
})

// ========================================
// AMBIENT PARTICLES
// ========================================
function initializeParticles() {
  const container = document.getElementById('particles')
  const particleCount = 20

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div')
    particle.className = 'particle'
    
    particle.style.left = `${Math.random() * 100}%`
    particle.style.top = `${Math.random() * 100}%`
    
    const duration = 10 + Math.random() * 20
    const delay = Math.random() * 5
    particle.style.animationDuration = `${duration}s`
    particle.style.animationDelay = `${delay}s`
    
    container.appendChild(particle)
  }
}

// ========================================
// MODAL FUNCTIONALITY
// ========================================
function initializeModal() {
  const modal = document.getElementById('gameFormDialog')
  const addBtn = document.getElementById('addBtn')
  const closeModal = document.getElementById('closeModal')
  const cancelBtn = document.getElementById('cancelBtn')
  const saveBtn = document.getElementById('saveBtn')

  // Open modal
  addBtn.addEventListener('click', () => {
    clearForm()
    document.getElementById('modalTitle').textContent = '🎮 Add a Video Game'
    modal.showModal()
    lucide.createIcons()
  })

  // Close modal function
  const closeModalFn = () => {
    modal.close()
    clearForm()
  }

  // Close modal events
  closeModal.addEventListener('click', closeModalFn)
  cancelBtn.addEventListener('click', closeModalFn)
  
  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModalFn()
    }
  })

  // Save button
  saveBtn.addEventListener('click', handleSave)

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.open) {
      closeModalFn()
    }
  })
}

// ========================================
// SEARCH FUNCTIONALITY
// ========================================
function initializeSearch() {
  const searchInput = document.getElementById('searchInput')
  
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase()
    const cards = document.querySelectorAll('.gaming-card')
    
    cards.forEach(card => {
      const title = card.querySelector('.card-title')?.textContent.toLowerCase() || ''
      const description = card.querySelector('.card-description')?.textContent.toLowerCase() || ''
      
      if (title.includes(query) || description.includes(query)) {
        card.style.display = ''
      } else {
        card.style.display = 'none'
      }
    })
  })
}

// ========================================
// VIEW TOGGLE (GRID/LIST)
// ========================================
function initializeViewToggle() {
  const viewButtons = document.querySelectorAll('.view-btn')
  const cardsGrid = document.getElementById('cardsGrid')
  
  viewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view
      
      viewButtons.forEach(b => b.classList.remove('active'))
      btn.classList.add('active')
      
      if (view === 'list') {
        cardsGrid.style.gridTemplateColumns = '1fr'
      } else {
        cardsGrid.style.gridTemplateColumns = ''
      }
    })
  })
}

// ========================================
// SLIDER VALUE DISPLAY
// ========================================
function initializeSliders() {
  const difficulty = document.getElementById('difficulty')
  const replayValue = document.getElementById('replayValue')
  const difficultyValue = document.getElementById('difficultyValue')
  const replayValueValue = document.getElementById('replayValueValue')

  difficulty.addEventListener('input', (e) => {
    difficultyValue.textContent = e.target.value
  })

  replayValue.addEventListener('input', (e) => {
    replayValueValue.textContent = e.target.value
  })
}

// ========================================
// IMAGE PREVIEW
// ========================================
function initializeImagePreview() {
  const imageInput = document.getElementById('imageInput')
  const imagePreview = document.getElementById('imagePreview')

  imageInput.addEventListener('change', () => {
    const file = imageInput.files?.[0]
    if (!file) {
      imagePreview.style.display = 'none'
      return
    }
    
    const reader = new FileReader()
    reader.onload = () => {
      imagePreview.src = reader.result
      imagePreview.style.display = 'block'
    }
    reader.readAsDataURL(file)
  })
}

// ========================================
// MONGO STATUS CHECK
// ========================================
async function checkMongoStatus() {
  const statusEl = document.getElementById('mongoStatus')
  try {
    const res = await fetch(apiUrl('/status'))
    const data = await res.json()
    
    if (data.ok && data.mongo) {
      statusEl.textContent = 'ONLINE'
      statusEl.style.color = '#4ade80'
    } else {
      statusEl.textContent = 'OFFLINE'
      statusEl.style.color = '#f87171'
    }
  } catch (err) {
    statusEl.textContent = 'ERROR'
    statusEl.style.color = '#f87171'
  }
}

// ========================================
// AUTH STATUS CHECK
// ========================================
async function checkAuthStatus() {
  try {
    const res = await fetch(apiUrl('/auth-status'))
    const data = await res.json()
    
    updateAuthUI(data)
  } catch (err) {
    console.error('Auth check failed:', err)
    updateAuthUI({ isAuthenticated: false })
  }
}

function updateAuthUI(authData) {
  const authButtons = document.getElementById('authButtons')
  const addBtn = document.getElementById('addBtn')
  const pageTitle = document.getElementById('pageTitle')
  const pageSubtitle = document.getElementById('pageSubtitle')

  if (authData.isAuthenticated) {
    // User is logged in
    const userName = authData.user?.name || 'User'
    
    authButtons.innerHTML = `
      <span class="user-name">Welcome, ${sanitize(userName)}</span>
      <a href="/logout" class="auth-link">Logout</a>
    `
    
    addBtn.style.display = 'inline-flex'
    pageTitle.textContent = `Welcome back, ${userName}!`
    pageSubtitle.textContent = 'Your personal game collection'
  } else {
    // User is not logged in
    authButtons.innerHTML = `
      <a href="/login" class="btn btn-primary">
        <i data-lucide="log-in"></i>
        <span>Login</span>
      </a>
    `
    
    addBtn.style.display = 'none'
    pageTitle.textContent = 'Welcome to Video Game Collection'
    pageSubtitle.textContent = 'Login to manage your games'
  }
  
  lucide.createIcons()
}

// ========================================
// LOAD GAMES
// ========================================
async function loadGames() {
  const cardsGrid = document.getElementById('cardsGrid')
  const statsGrid = document.getElementById('statsGrid')
  
  try {
    const res = await fetch(apiUrl('/data'))
    const games = await res.json()
    
    if (!Array.isArray(games) || games.length === 0) {
      cardsGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <h3>No games in your collection yet</h3>
          <p>Click "Add New Game" to start building your library!</p>
        </div>
      `
      statsGrid.style.display = 'none'
      return
    }
    
    renderGames(games)
    updateStats(games)
    statsGrid.style.display = 'grid'
    
  } catch (err) {
    console.error('Failed to load games:', err)
    showToast('Failed to load games', 'error')
    cardsGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <h3>Error loading games</h3>
        <p>${err.message}</p>
      </div>
    `
  }
}

// ========================================
// RENDER GAMES
// ========================================
function renderGames(games) {
  const cardsGrid = document.getElementById('cardsGrid')
  
  cardsGrid.innerHTML = games.map(game => {
    const imgHtml = game.image 
      ? `<img src="${sanitize(game.image)}" alt="${sanitize(game.title)}" />`
      : `<div class="card-image-placeholder">🎮</div>`
    
    const badge = game.completed 
      ? `<span class="card-badge badge-green">Completed</span>`
      : `<span class="card-badge badge-yellow">In Progress</span>`
    
    return `
      <div class="gaming-card" data-id="${sanitize(game.id)}">
        <div class="card-image">
          ${imgHtml}
          ${badge}
        </div>
        <div class="card-content">
          <div class="card-header">
            <h3 class="card-title">${sanitize(game.title)}</h3>
          </div>
          <p class="card-description">${sanitize(game.description || 'No description')}</p>
          
          <div class="card-meta">
            ${game.platform ? `<span>📱 ${sanitize(game.platform)}</span>` : ''}
            ${game.genre ? `<span>🎮 ${sanitize(game.genre)}</span>` : ''}
            ${game.rating ? `<span>⭐ ${game.rating}/10</span>` : ''}
            ${game.price ? `<span>💰 $${game.price}</span>` : ''}
            ${game.hoursPlayed ? `<span>⏱️ ${game.hoursPlayed}h</span>` : ''}
            ${game.multiplayer ? `<span>👥 Multiplayer</span>` : ''}
          </div>
          
          ${game.publisher || game.developer ? `
            <div class="card-footer">
              <div class="card-status">
                <div class="status-dot-small"></div>
                <span class="status-label">${sanitize(game.publisher || game.developer || 'Unknown')}</span>
              </div>
            </div>
          ` : ''}
          
          <div class="card-actions">
            <button class="edit" data-id="${sanitize(game.id)}">
              <i data-lucide="edit-2"></i> Edit
            </button>
            <button class="delete" data-id="${sanitize(game.id)}">
              <i data-lucide="trash-2"></i> Delete
            </button>
          </div>
        </div>
      </div>
    `
  }).join('')
  
  lucide.createIcons()
  attachCardListeners()
}

// ========================================
// UPDATE STATS
// ========================================
function updateStats(games) {
  const total = games.length
  const completed = games.filter(g => g.completed).length
  const inProgress = total - completed
  const multiplayer = games.filter(g => g.multiplayer).length
  
  document.getElementById('statTotal').textContent = total
  document.getElementById('statCompleted').textContent = completed
  document.getElementById('statInProgress').textContent = inProgress
  document.getElementById('statMultiplayer').textContent = multiplayer
}

// ========================================
// ATTACH CARD LISTENERS
// ========================================
function attachCardListeners() {
  // Edit buttons
  document.querySelectorAll('.edit').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation()
      const id = btn.dataset.id
      await handleEdit(id)
    })
  })
  
  // Delete buttons
  document.querySelectorAll('.delete').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation()
      const id = btn.dataset.id
      await handleDelete(id)
    })
  })
}

// ========================================
// HANDLE EDIT
// ========================================
async function handleEdit(id) {
  try {
    const res = await fetch(apiUrl(`/data/${id}`))
    const game = await res.json()
    
    // Populate form
    document.getElementById('id').value = game.id
    document.getElementById('title').value = game.title || ''
    document.getElementById('description').value = game.description || ''
    document.getElementById('genre').value = game.genre || ''
    document.getElementById('platform').value = game.platform || ''
    document.getElementById('publisher').value = game.publisher || ''
    document.getElementById('developer').value = game.developer || ''
    document.getElementById('rating').value = game.rating || ''
    document.getElementById('price').value = game.price || ''
    document.getElementById('hoursPlayed').value = game.hoursPlayed || ''
    document.getElementById('difficulty').value = game.difficulty || 5
    document.getElementById('replayValue').value = game.replayValue || 5
    document.getElementById('multiplayer').checked = game.multiplayer || false
    document.getElementById('completed').checked = game.completed || false
    
    // Update slider displays
    document.getElementById('difficultyValue').textContent = game.difficulty || 5
    document.getElementById('replayValueValue').textContent = game.replayValue || 5
    
    // Show image preview if exists
    const imagePreview = document.getElementById('imagePreview')
    if (game.image) {
      imagePreview.src = game.image
      imagePreview.style.display = 'block'
    }
    
    // Release date
    if (game.releaseDate) {
      const date = new Date(game.releaseDate)
      document.getElementById('releaseDate').value = date.toISOString().split('T')[0]
    }
    
    // Update modal title
    document.getElementById('modalTitle').textContent = '🎮 Edit Video Game'
    
    // Open modal
    document.getElementById('gameFormDialog').showModal()
    lucide.createIcons()
    
  } catch (err) {
    console.error('Failed to load game:', err)
    showToast('Failed to load game', 'error')
  }
}

// ========================================
// HANDLE DELETE
// ========================================
async function handleDelete(id) {
  if (!confirm('Are you sure you want to delete this game?')) {
    return
  }
  
  try {
    const res = await fetch(apiUrl(`/data/${id}`), {
      method: 'DELETE'
    })
    
    if (!res.ok) {
      throw new Error('Failed to delete game')
    }
    
    showToast('Game deleted successfully', 'success')
    await loadGames()
    
  } catch (err) {
    console.error('Failed to delete game:', err)
    showToast('Failed to delete game', 'error')
  }
}

// ========================================
// HANDLE SAVE
// ========================================
async function handleSave() {
  const form = document.getElementById('gameForm')
  
  // Validate form
  if (!form.reportValidity()) {
    return
  }
  
  // Custom validation: description min length
  const description = document.getElementById('description').value.trim()
  if (description.length < 20) {
    showToast('Description must be at least 20 characters', 'error')
    return
  }
  
  const saveBtn = document.getElementById('saveBtn')
  saveBtn.disabled = true
  showToast('Saving...', 'info')
  
  try {
    const id = document.getElementById('id').value
    const imageInput = document.getElementById('imageInput')
    const file = imageInput.files?.[0]
    
    let imageData = null
    
    // Handle image upload
    if (file) {
      imageData = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
    } else if (id) {
      // Keep existing image for edit
      const imagePreview = document.getElementById('imagePreview')
      if (imagePreview.src && imagePreview.style.display !== 'none') {
        imageData = imagePreview.src
      }
    }
    
    // Build data
    const data = buildGameData(imageData)
    
    // Save
    await saveGame(data, id)
    
    // Close modal and reload
    document.getElementById('gameFormDialog').close()
    clearForm()
    await loadGames()
    showToast(id ? 'Game updated successfully' : 'Game created successfully', 'success')
    
  } catch (err) {
    console.error('Failed to save game:', err)
    showToast('Failed to save game', 'error')
  } finally {
    saveBtn.disabled = false
  }
}

// ========================================
// BUILD GAME DATA
// ========================================
function buildGameData(imageData) {
  const form = document.getElementById('gameForm')
  
  return {
    title: document.getElementById('title').value.trim(),
    description: document.getElementById('description').value.trim(),
    image: imageData || null,
    genre: document.getElementById('genre').value || null,
    platform: document.getElementById('platform').value || null,
    publisher: document.getElementById('publisher').value.trim() || null,
    developer: document.getElementById('developer').value.trim() || null,
    rating: document.getElementById('rating').value ? 
      parseFloat(document.getElementById('rating').value) : null,
    price: document.getElementById('price').value ? 
      parseFloat(document.getElementById('price').value) : null,
    hoursPlayed: document.getElementById('hoursPlayed').value ? 
      parseInt(document.getElementById('hoursPlayed').value) : null,
    difficulty: document.getElementById('difficulty').value ? 
      parseInt(document.getElementById('difficulty').value) : null,
    replayValue: document.getElementById('replayValue').value ? 
      parseInt(document.getElementById('replayValue').value) : null,
    multiplayer: document.getElementById('multiplayer').checked,
    completed: document.getElementById('completed').checked,
    releaseDate: document.getElementById('releaseDate').value ? 
      new Date(document.getElementById('releaseDate').value).toISOString() : null
  }
}

// ========================================
// SAVE GAME
// ========================================
async function saveGame(data, id) {
  const method = id ? 'PUT' : 'POST'
  const url = id ? apiUrl(`/data/${id}`) : apiUrl('/data')
  
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Server error: ${text}`)
  }
  
  return res.json()
}

// ========================================
// CLEAR FORM
// ========================================
function clearForm() {
  const form = document.getElementById('gameForm')
  form.reset()
  
  document.getElementById('id').value = ''
  document.getElementById('imagePreview').style.display = 'none'
  document.getElementById('imagePreview').src = ''
  document.getElementById('difficultyValue').textContent = '5'
  document.getElementById('replayValueValue').textContent = '5'
}

// ========================================
// TOAST NOTIFICATIONS
// ========================================
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer')
  const toast = document.createElement('div')
  toast.className = 'toast'
  toast.textContent = message
  
  // Add to container
  container.appendChild(toast)
  
  // Remove after 3.5 seconds
  setTimeout(() => {
    toast.style.opacity = '0'
    setTimeout(() => toast.remove(), 300)
  }, 3500)
}

// ========================================
// SANITIZE HTML
// ========================================
function sanitize(str) {
  if (!str) return ''
  const div = document.createElement('div')
  div.textContent = str
  return div.innerHTML
}