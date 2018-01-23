(() => {

    const API_KEY = 'CZoppU1XxfCevaD9Ilrr9kQb0vXWC1su'
    const BASE_URL = `http://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=`

    const gifForm = document.querySelector('#gif-form')
    const gifGrid = document.querySelector('#gif-grid')
    const gifInput = gifForm.querySelector('#gif-search-input')
    const gifLimiter = gifForm.querySelector('#gif-search-limit')

    let fetchLimit = gifLimiter.value
    let searchText = gifInput.value

    gifInput.focus()

    gifForm.addEventListener('submit', (e) => {
        e.preventDefault()
    
        fetchLimit = gifLimiter.value
        searchText = gifInput.value

        removeChildren(gifGrid)

        fetchGifs(searchText)
        .then(populateGrid)
    })

    const fetchGifs = (searchTerm) => {
        return fetch(`${BASE_URL}${searchTerm}`)
        .then(res => res.json())
        .then(data => data.data.filter((item, index) => {
        return index < fetchLimit ? item : ''
        }))
    }

    const populateGrid = (data) => {
        if(data.length) {
            data.map((gif, gifIndex) => {
                let gifInstance = appendGif(gif, gifIndex)
                renderGif(gifInstance, gifIndex)
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

        return gifContainer
        
    }

    const renderGif = (gifInstance, gifIndex) => {
        const gifAnimation = 'fadeInUp'

        if(!gifIndex) {
            animate(gifInstance, gifAnimation)
        } else {
            setTimeout(() => {
                animate(gifInstance, gifAnimation)
            }, 500 * gifIndex)
        }
    }

    const animate = (animateMe, transitionType) => {
        animateMe.style.display = 'block'
        animateMe.setAttribute('class', `animated ${transitionType}`)
    }

    const removeChildren = (parent) => {
        while(parent.hasChildNodes()) {
            parent.removeChild(parent.lastChild)
        }
    }

})()