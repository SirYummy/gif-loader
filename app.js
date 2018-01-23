const API_KEY = 'CZoppU1XxfCevaD9Ilrr9kQb0vXWC1su'
const BASE_URL = `http://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=`

const gifForm = document.querySelector('#gif-form')
const gifGrid = document.querySelector('#gif-grid')
const input = gifForm.querySelector('#gif-search-input')
input.focus()

gifForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const gifInput = gifForm.querySelector('#gif-search-input')
    const searchText = gifInput.value
    
    removeChildren(gifGrid)

    fetchGifs(searchText)
    .then(populateGrid)
})

const fetchGifs = (searchTerm) => {
    return fetch(`${BASE_URL}${searchTerm}`)
    .then(res => res.json())
    .then(data => data.data.filter((item, index) => {
       return index < 5 ? item : ''
    }))
}

const populateGrid = (data) => {
    if(data.length) {
        data.map((gif, gifIndex) => {
            appendGif(gif, gifIndex)
        })
    } else {
        noResults()
    }
}

const noResults = () => {
    gifGrid.innerText = '0 results found'
}

const appendGif = (gif, gifIndex) => {
    const gifContainer = document.createElement('figure')
    const gifImage = document.createElement('img')
    const gifCaption = document.createElement('figcaption')

    gifContainer.appendChild(gifImage)
    gifContainer.appendChild(gifCaption)
    gifImage.setAttribute('src', gif.images.fixed_height.url)
    gifCaption.innerText = gif.title
    gifGrid.appendChild(gifContainer)
}

const removeChildren = (parent) => {
    while(parent.hasChildNodes()) {
        parent.removeChild(parent.lastChild)
    }
}