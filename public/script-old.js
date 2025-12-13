// Frontend logic for Video Game Collection Manager
const createButton = document.getElementById('createButton')
const formDialog = document.getElementById('formDialog')
const saveButton = document.getElementById('saveButton')
const cancelButton = document.getElementById('cancelButton')
const contentArea = document.getElementById('contentArea')
const form = document.getElementById('myForm')
const imageInput = document.getElementById('image')
const imagePreview = document.getElementById('imagePreview')
const readyStatus = document.getElementById('readyStatus')
const notReadyStatus = document.getElementById('notReadyStatus')

// Dynamic API base: if opened via file:// fallback to localhost:3003
const API_BASE = (location.protocol === 'file:' ? 'http://localhost:3003' : '')

function apiUrl(path) { return `${API_BASE}${path}` }

// Simple toast utility
function showToast(msg, type = 'info') {
  let toast = document.createElement('div')
  toast.className = `toast toast-${type}`
  toast.textContent = msg
  Object.assign(toast.style, {
    position: 'fixed', bottom: '1rem', right: '1rem', background: type==='error' ? '#b30000' : '#333', color: '#fff', padding: '0.6rem 0.9rem', borderRadius: '4px', zIndex: 9999, fontSize: '0.85rem', boxShadow:'0 2px 6px rgba(0,0,0,0.3)'
  })
  document.body.appendChild(toast)
  setTimeout(() => toast.remove(), 3500)
}

// Get form data and process each type of input
// Prepare the data as JSON with a proper set of types
// e.g. Booleans, Numbers, Dates
const getFormData = () => {
    // FormData gives a baseline representation of the form
    // with all fields represented as strings
    const formData = new FormData(myForm)
    const json = Object.fromEntries(formData)

    // Handle checkboxes, dates, and numbers
    myForm.querySelectorAll('input').forEach(el => {
        const value = json[el.name]
        const isEmpty = !value || value.trim() === ''

        // Represent checkboxes as a Boolean value (true/false)
        if (el.type === 'checkbox') {
            json[el.name] = el.checked
        }
        // Represent number and range inputs as actual numbers
        else if (el.type === 'number' || el.type === 'range') {
            json[el.name] = isEmpty ? null : Number(value)
        }
        // Represent all date inputs in ISO-8601 DateTime format
        else if (el.type === 'date') {
            json[el.name] = isEmpty ? null : new Date(value).toISOString()
        }
    })
    return json
}


// Form submission handled by saveButton listener below

// Open dialog when create button clicked
createButton.addEventListener('click', () => {
    myForm.reset()
    document.getElementById('id').value = ''
    imagePreview.style.display = 'none'
    formDialog.showModal()
})

// Close dialog when cancel button clicked
cancelButton.addEventListener('click', () => {
    formDialog.close()
})

// Save item (Create or Update)
const saveItem = async (data) => {
    console.log('Saving:', data)

    // Determine if this is an update or create
    const endpoint = data.id ? `/data/${data.id}` : '/data'
    const method = data.id ? "PUT" : "POST"

    const options = {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    try {
        const response = await fetch(endpoint, options)

        if (!response.ok) {
            try {
                const errorData = await response.json()
                console.error('Error:', errorData)
                alert(errorData.error || response.statusText)
            }
            catch (err) {
                console.error(response.statusText)
                alert('Failed to save: ' + response.statusText)
            }
            return
        }

        const result = await response.json()
        console.log('Saved:', result)


        // Refresh the data list
        getData()
    }
    catch (err) {
        console.error('Save error:', err)
        alert('An error occurred while saving')
    }
}


// Edit item - populate form with existing data
const editItem = (data) => {
    console.log('Editing:', data)

    // Populate the form with data to be edited
    Object.keys(data).forEach(field => {
        const element = myForm.elements[field]
        if (element) {
            if (element.type === 'checkbox') {
                element.checked = data[field]
            } else if (element.type === 'date') {
                // Extract yyyy-mm-dd from ISO date string (avoids timezone issues)
                element.value = data[field] ? data[field].substring(0, 10) : ''
            } else {
                element.value = data[field]
            }
        }
    })

    // Show the dialog
    formDialog.showModal()
}

const calendarWidget = (date) => {
    if (!date) return ''
    const month = new Date(date).toLocaleString("en-CA", { month: 'short', timeZone: "UTC" })
    const day = new Date(date).toLocaleString("en-CA", { day: '2-digit', timeZone: "UTC" })
    const year = new Date(date).toLocaleString("en-CA", { year: 'numeric', timeZone: "UTC" })
    return ` <div class="calendar">
                <div class="born"><img src="./assets/ribbon.svg" /></div>
                <div class="month">${month}</div>
                <div class="day">${day}</div> 
                <div class="year">${year}</div>
            </div>`

}

// Render a single item
const renderItem = (item) => {
    const div = document.createElement('div')
    div.classList.add('item-card')
    div.setAttribute('data-id', item.id)

    const template = /*html*/`  
    <div class="item-heading>
        <h3> ${item.title} </h3>
        <div class="microchip-info>
            ${item.rating ? `⭐ ${item.rating}/10` : '<i>Not rated</i>'} 
        </div>  
    </div>
    <div class="item-info> 
        <div class="item-icon" style="
            background: linear-gradient(135deg, 
            ${item.primaryColor || '#5f5854'} 0%, 
            ${item.primaryColor || '#5f5854'} 40%, 
            ${item.secondaryColor || '#c4c8cf'} 60%, 
            ${item.secondaryColor || '#c4c8cf'} 100%); 
        ">
        </div> 
        <div class="stats>
            <div class="stat>
                <span>Difficulty</span>
                <meter max="10" min="0" value="${item.difficulty || 0}"></meter> 
            </div>
            <div class="stat>
                <span>Replay Value</span>
                <meter max="10" min="0" value="${item.replayValue || 0}"></meter> 
            </div>
        </div> 
            
         ${calendarWidget(item.releaseDate)}
    </div>
        
    <div class="item-info>  
        <section class="breed" style="${item.genre ? '' : 'display:none;'}">  
            <img src="./assets/ribbon.svg" />  ${item.genre}
        </section>
        <section class="food" style="${item.platform ? '' : 'display:none;'}">
             <img src="./assets/chip.svg" /> <span>${item.platform}</span>
        </section> 
        <section class="adoption">
            <img src="./assets/${item.completed ? 'adopted' : 'paw'}.svg" />
            ${item.completed ? 'Completed' : 'In Progress'}
        </section> 
    </div>

    <div class="item-info" style="${item.publisher || item.developer || item.price || item.hoursPlayed ? '' : 'display:none;'}">
        ${item.publisher ? `<section class="breed"><strong>Publisher:</strong> ${item.publisher}</section>` : ''}
        ${item.developer ? `<section class="breed"><strong>Developer:</strong> ${item.developer}</section>` : ''}
        ${item.price ? `<section class="breed"><strong>Price:</strong> $${item.price}</section>` : ''}
        ${item.hoursPlayed ? `<section class="breed"><strong>Hours Played:</strong> ${item.hoursPlayed}</section>` : ''}
        ${item.multiplayer ? `<section class="adoption"><img src="./assets/paw.svg" />Multiplayer</section>` : ''}
    </div>

    <section class="description" style="${item.description ? '' : 'display:none;'}">  
        <p>${item.description}</p>
    </section>

        
           
        <div class="item-actions>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `
    div.innerHTML = DOMPurify.sanitize(template);

    // Add event listeners to buttons
    div.querySelector('.edit-btn').addEventListener('click', () => editItem(item))
    div.querySelector('.delete-btn').addEventListener('click', () => deleteItem(item.id))

    return div
}

// fetch items from API endpoint and populate the content div
const getData = async () => {
    try {
        const response = await fetch('/data')

        if (response.ok) {
            readyStatus.style.display = 'block'
            notReadyStatus.style.display = 'none'

            const data = await response.json()
            console.log('Fetched data:', data)

            if (data.length == 0) {
                contentArea.innerHTML = '<p><i>No data found in the database.</i></p>'
                return
            }
            else {
                contentArea.innerHTML = ''
                data.forEach(item => {
                    const itemDiv = renderItem(item)
                    contentArea.appendChild(itemDiv)
                })
            }
        }
        else {
            // If the request failed, show the "not ready" status
            // to inform users that there may be a database connection issue
            notReadyStatus.style.display = 'block'
            readyStatus.style.display = 'none'
            createButton.style.display = 'none'
            contentArea.style.display = 'none'
        }
    } catch (error) {
        console.error('Error fetching data:', error)
        notReadyStatus.style.display = 'block'
    }
}

// Form reset handled

// Image preview for file input
imageInput?.addEventListener('change', () => {
    const file = imageInput.files?.[0]
    if (!file) {
        imagePreview.style.display = 'none'
        imagePreview.src = ''
        return
    }
    const url = URL.createObjectURL(file)
    imagePreview.src = url
    imagePreview.style.display = 'block'
})

// Validate helpers
function validateForm() {
    if (!myForm.reportValidity()) return false
    if (myForm.description.value.trim().length < 20) {
        alert('Description must be at least 20 characters.')
        return false
    }
    return true
}

// Build data object from form inputs
function buildData(imageData) {
  return {
    title: form.title.value.trim(),
    releaseDate: form.releaseDate.value ? new Date(form.releaseDate.value).toISOString() : null,
    image: imageData || null,
    genre: form.genre.value || null,
    platform: form.platform.value || null,
    publisher: form.publisher.value.trim() || null,
    developer: form.developer.value.trim() || null,
    rating: form.rating.value ? Number(form.rating.value) : null,
    price: form.price.value ? Number(form.price.value) : null,
    hoursPlayed: form.hoursPlayed.value ? Number(form.hoursPlayed.value) : null,
    description: form.description.value.trim(),
    difficulty: form.difficulty.value ? Number(form.difficulty.value) : null,
    replayValue: form.replayValue.value ? Number(form.replayValue.value) : null,
    multiplayer: form.multiplayer.checked,
    completed: form.completed.checked
  }
}

// Replace previous postOrPut with enhanced logging
async function postOrPut(data, id) {
  const method = id ? 'PUT' : 'POST'
  const url = id ? apiUrl(`/data/${id}`) : apiUrl('/data')
  console.log('[SAVE] method:', method, 'url:', url, 'payload:', data)
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).catch(err => { throw new Error('Network error: ' + err.message) })
  console.log('[SAVE] response status:', res.status)
  if (!res.ok) {
    const txt = await res.text()
    console.error('[SAVE] error body:', txt)
    throw new Error(`Server ${res.status}: ${txt}`)
  }
  return res.json()
}

// Adjust loadGames to use apiUrl
async function loadGames() {
  try {
    const res = await fetch(apiUrl('/data'))
    console.log('[LOAD] /data status:', res.status)
    if (!res.ok) throw new Error('Failed to fetch list')
    const items = await res.json()
    console.log('[LOAD] items count:', items.length)
    renderGames(items)
  } catch (e) {
    console.error(e)
    contentArea.innerHTML = '<p class="error">Failed to load games.</p>'
    showToast('Failed to load games', 'error')
  }
}

// Enhance save handler with user feedback
saveButton.addEventListener('click', async () => {
  try {
    if (!validateForm()) return
    saveButton.disabled = true
    showToast('Saving...', 'info')
    const id = document.getElementById('id').value
    const file = imageInput.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = async () => {
        try {
          const data = buildData(reader.result)
          await postOrPut(data, id)
          formDialog.close()
          await loadGames()
          showToast(id ? 'Game updated' : 'Game created', 'info')
        } catch (err) {
          console.error(err)
          alert(err.message)
          showToast('Save failed', 'error')
        } finally {
          saveButton.disabled = false
        }
      }
      reader.readAsDataURL(file)
    } else {
      const data = buildData(null)
      await postOrPut(data, id)
      formDialog.close()
      await loadGames()
      showToast(id ? 'Game updated' : 'Game created', 'info')
      saveButton.disabled = false
    }
  } catch (e) {
    console.error(e)
    alert('Could not save: ' + e.message)
    showToast('Save failed', 'error')
    saveButton.disabled = false
  }
})

// Update status endpoint call
async function updateStatus() {
  try {
    const res = await fetch(apiUrl('/status'))
    console.log('[STATUS] status code:', res.status)
    if (!res.ok) throw new Error('Status fetch failed')
    const json = await res.json()
    const ok = json.mongo === true || json.ok === true || json.ready === true
    readyStatus.style.display = ok ? 'block' : 'none'
    notReadyStatus.style.display = ok ? 'none' : 'block'
  } catch (e) {
    console.error('[STATUS] error:', e.message)
    readyStatus.style.display = 'none'
    notReadyStatus.style.display = 'block'
  }
}

// Check authentication status and update UI
async function checkAuth() {
  try {
    const res = await fetch(apiUrl('/auth-status'))
    if (!res.ok) return { isAuthenticated: false, user: null }
    const data = await res.json()
    updateAuthUI(data)
    return data
  } catch (e) {
    console.error('[AUTH] Check failed:', e)
    return { isAuthenticated: false, user: null }
  }
}

function updateAuthUI(authData) {
  const userInfo = document.getElementById('userInfo')
  const createButton = document.getElementById('createButton')
  
  if (authData.isAuthenticated && authData.user) {
    const userName = authData.user.name || authData.user.email || 'User'
    userInfo.innerHTML = `
      Welcome, ${sanitize(userName)}! 
      <a href="/logout" style="color: #ff6b6b; margin-left: 1rem;">Logout</a>
    `
    createButton.style.display = 'block'
  } else {
    userInfo.innerHTML = `
      <a href="/login" style="color: #4CAF50; font-size: 1.1rem;">Login to manage games</a>
    `
    createButton.style.display = 'none'
  }
}

// Store current auth state
let currentUser = null

// Initial kick
async function init() {
  const authData = await checkAuth()
  currentUser = authData.user
  updateStatus()
  loadGames()
}

init()

// Periodically refresh status & list (optional)
setInterval(updateStatus, 15000)

// ...existing code...

function sanitize(html) {
  return DOMPurify.sanitize(html)
}

function renderGames(items) {
  if (!Array.isArray(items) || items.length === 0) {
    contentArea.innerHTML = '<p>No games yet.</p>'
    return
  }
  contentArea.innerHTML = items.map(item => {
    const imgTag = item.image ? `<img class="game-cover" src="${sanitize(item.image)}" alt="${sanitize(item.title)}" />` : ''
    return `
      <article class="game-card" data-id="${sanitize(item.id || item._id)}">
        <header>
          ${imgTag}
          <div>
            <h3>${sanitize(item.title)}</h3>
            ${item.publisher ? `<small>Publisher: ${sanitize(item.publisher)}</small>` : ''}
          </div>
        </header>
        <p>${sanitize(item.description || '')}</p>
        <div class="game-meta">
          ${item.platform ? `<span>📱 ${sanitize(item.platform)}</span>` : ''}
          ${item.genre ? `<span>🎮 ${sanitize(item.genre)}</span>` : ''}
          ${item.rating ? `<span>⭐ ${item.rating}/10</span>` : ''}
          ${item.price ? `<span>💰 $${item.price}</span>` : ''}
          ${item.hoursPlayed ? `<span>⏱️ ${item.hoursPlayed}h</span>` : ''}
          ${item.completed ? `<span>✅ Completed</span>` : `<span>🎯 In Progress</span>`}
          ${item.multiplayer ? `<span>👥 Multiplayer</span>` : ''}
        </div>
        ${item.developer ? `<p style="font-size:0.8rem;color:#888;margin-top:0.5rem;">Developer: ${sanitize(item.developer)}</p>` : ''}
        <div class="actions">
          <button class="edit" data-id="${sanitize(item.id || item._id)}">Edit</button>
          <button class="delete" data-id="${sanitize(item.id || item._id)}">Delete</button>
        </div>
      </article>
    `
  }).join('')
  attachRowListeners()
}

function attachRowListeners() {
  console.log('[DEBUG] Attaching listeners to buttons')
  contentArea.querySelectorAll('button.edit').forEach(btn => {
    console.log('[DEBUG] Edit button found with id:', btn.dataset.id)
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      console.log('[DEBUG] Edit clicked for:', btn.dataset.id)
      startEdit(btn.dataset.id)
    })
  })
  contentArea.querySelectorAll('button.delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      console.log('[DEBUG] Delete clicked for:', btn.dataset.id)
      deleteItem(btn.dataset.id)
    })
  })
}

async function startEdit(id) {
  try {
    console.log('[EDIT] Fetching item with ID:', id)
    const url = apiUrl(`/data/${id}`)
    console.log('[EDIT] Full URL:', url)
    
    const res = await fetch(url)
    console.log('[EDIT] Response status:', res.status)
    
    if (!res.ok) {
      const errorText = await res.text()
      console.error('[EDIT] Error response:', errorText)
      throw new Error(`Fetch item failed: ${res.status} ${res.statusText} - ${errorText}`)
    }
    
    const item = await res.json()
    console.log('[EDIT] Fetched item:', item)
    
    // Store ID for update
    document.getElementById('id').value = item.id || item._id
    
    // Populate form fields
    form.title.value = item.title || ''
    form.releaseDate.value = item.releaseDate ? item.releaseDate.substring(0,10) : ''
    form.genre.value = item.genre || ''
    form.platform.value = item.platform || ''
    form.publisher.value = item.publisher || ''
    form.developer.value = item.developer || ''
    form.rating.value = item.rating ?? ''
    form.price.value = item.price ?? ''
    form.hoursPlayed.value = item.hoursPlayed ?? ''
    form.description.value = item.description || ''
    form.difficulty.value = item.difficulty ?? 0
    form.replayValue.value = item.replayValue ?? 0
    form.multiplayer.checked = !!item.multiplayer
    form.completed.checked = !!item.completed
    
    // Handle image preview
    if (item.image) {
      imagePreview.src = item.image
      imagePreview.style.display = 'block'
    } else {
      imagePreview.style.display = 'none'
    }
    
    formDialog.showModal()
  } catch (e) {
    console.error('[EDIT] Full error:', e)
    alert(`Could not load item for edit:\n${e.message}`)
    showToast('Edit failed', 'error')
  }
}

async function deleteItem(id) {
  if (!confirm('Delete this game?')) return
  try {
    const res = await fetch(apiUrl(`/data/${id}`), { method: 'DELETE' })
    if (!res.ok) throw new Error('Delete failed')
    await loadGames()
    showToast('Game deleted', 'info')
  } catch (e) {
    console.error(e)
    alert('Could not delete.')
    showToast('Delete failed', 'error')
  }
}
