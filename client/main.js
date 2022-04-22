const memeContainer = document.querySelector('#meme-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4000/api/meme`

const memeCallback = ({ data: meme }) => displayMeme(meme)
const errCallback = err => console.log(err.response.data)

const getAllMeme = () => axios.get(baseURL).then(memeCallback).catch(errCallback)
const createMeme = body => axios.post(baseURL, body).then(memeCallback).catch(errCallback)
const deleteMeme = id => axios.delete(`${baseURL}/${id}`).then(memeCallback).catch(errCallback)
const updateMeme = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(memeCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let title = document.querySelector('#title')
    let rating = document.querySelector('input[name="ratings"]:checked')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        title: title.value,
        rating: rating.value, 
        imageURL: imageURL.value
    }

    createMeme(bodyObj)

    title.value = ''
    rating.checked = false
    imageURL.value = ''
}

function createMemeCard(meme) {
    const memeCard = document.createElement('div')
    memeCard.classList.add('meme-Card')

    memeCard.innerHTML = `<img alt='meme img' src=${meme.imageURL} class="meme-img"/>
    <p class="meme-title">${meme.title}</p>
    <div class="btns-container">
        <button onclick="updateMeme(${meme.id}, 'minus')">-</button>
        <p class="meme-rating">${meme.rating} stars</p>
        <button onclick="updateMeme(${meme.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteMeme(${meme.id})">delete</button>
    `


    memeContainer.appendChild(memeCard)
}

function displayMeme(arr) {
    memeContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createMemeCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllMeme()