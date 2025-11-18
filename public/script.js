let readyStatus = document.querySelector('#readyStatus')
let notReadyStatus = document.querySelector('#notReadyStatus')
let myForm = document.querySelector('#myForm')
let contentArea = document.querySelector('#contentArea')
let formDialog = document.querySelector('#formDialog')
let createButton = document.querySelector('#createButton')
let saveButton = document.querySelector('#saveButton')
let cancelButton = document.querySelector('#cancelButton')
let formHeading = document.querySelector('.modal-header h2')

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


// listen for form submissions  
myForm.addEventListener('submit', async event => {
    // prevent the page from reloading when the form is submitted.
    event.preventDefault()
    const data = getFormData()
    await saveItem(data)
    myForm.reset()
    formDialog.close()
})

// Open dialog when create button clicked
createButton.addEventListener('click', () => {
    myForm.reset()
    formDialog.showModal()
})

// Close dialog when cancel button clicked
cancelButton.addEventListener('click', () => {
    formDialog.close()
})

// Save button submits the form
saveButton.addEventListener('click', () => {
    myForm.requestSubmit()
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

    // Update the heading to indicate edit mode
    formHeading.textContent = '🎮 Edit Game'

    // Show the dialog
    formDialog.showModal()
}

// Delete item
const deleteItem = async (id) => {
    if (!confirm('Are you sure you want to delete this game?')) {
        return
    }

    const endpoint = `/data/${id}`
    const options = { method: "DELETE" }

    try {
        const response = await fetch(endpoint, options)

        if (response.ok) {
            const result = await response.json()
            console.log('Deleted:', result)
            // Refresh the data list
            getData()
        }
        else {
            const errorData = await response.json()
            alert(errorData.error || 'Failed to delete item')
        }
    } catch (error) {
        console.error('Delete error:', error)
        alert('An error occurred while deleting')
    }
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
    <div class="item-heading">
        <h3> ${item.title} </h3>
        <div class="microchip-info">
            ${item.rating ? `⭐ ${item.rating}/10` : '<i>Not rated</i>'} 
        </div>  
    </div>
    <div class="item-info"> 
        <div class="item-icon" style="
            background: linear-gradient(135deg, 
            ${item.primaryColor || '#5f5854'} 0%, 
            ${item.primaryColor || '#5f5854'} 40%, 
            ${item.secondaryColor || '#c4c8cf'} 60%, 
            ${item.secondaryColor || '#c4c8cf'} 100%); 
        ">
        </div> 
        <div class="stats">
            <div class="stat">
                <span>Difficulty</span>
                <meter max="10" min="0" value="${item.difficulty || 0}"></meter> 
            </div>
            <div class="stat">
                <span>Replay Value</span>
                <meter max="10" min="0" value="${item.replayValue || 0}"></meter> 
            </div>
        </div> 
            
         ${calendarWidget(item.releaseDate)}
    </div>
        
    <div class="item-info">  
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

        
           
        <div class="item-actions">
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

// Revert to the default form title on reset
myForm.addEventListener('reset', () => {
    formHeading.textContent = '🎮 Add a Video Game'
})

// Load initial data
getData()
