await import('../components/elements/navbar/CustomNavbar.js')
await import('../components/elements/navbar/NavbarOption.js')
await import('../components/elements/CustomInput.js')

import { select } from '../features/utils.js'
import renderMovies from './render.js'
// import { loadMoviesSaveOption } from './events.js'

const movieToSearch = select('[data-js="movie-to-search"]')

async function searchMovie() {

    const movie = movieToSearch.dataset.value
    const res = await fetch(`http://localhost:8080/movies/${movie}`)
    const movies = await res.json()

    renderMovies(movies)
}

let timeout = null
const waitToSearchMs = 500

movieToSearch.addEventListener('keyup', () => {
    clearTimeout(timeout)
    timeout = setTimeout(searchMovie, waitToSearchMs)
})

movieToSearch.addEventListener('keydown', () => clearTimeout(timeout))
// movieToSearch.dispatchEvent(new Event('keyup'))