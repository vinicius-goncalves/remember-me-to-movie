await import('../components/elements/navbar/CustomNavbar.js')
await import('../components/elements/navbar/NavbarOption.js')
await import('../components/elements/CustomInput.js')

import createPagination from '../features/pagination.js'
import { select } from '../features/utils.js'
import renderMovies from './render.js'

const movieToSearch = select('[data-button="movie-to-search"]')

const moviesResultSearchUl = select('ul[data-js="movies-result-search"]')
const pagesUl = select('ul[data-js="pagination"]')

const paginationSettings = (items) => ({
    itemsPerPage: 25,
    startPage: 1,
    items
})

async function searchMovie() {

    const movie = movieToSearch.dataset.value
    const res = await fetch(`http://localhost:8080/movies/${movie}`)
    const { ['data']: movies } = await res.json()

    const moviesRendered = renderMovies(movies, moviesResultSearchUl)

    const pagesSettings = paginationSettings(moviesRendered)
    createPagination(pagesSettings, pagesUl, moviesResultSearchUl)
}

let timeout = null
const waitToSearchMs = 500

movieToSearch.addEventListener('keyup', () => {
    clearTimeout(timeout)
    timeout = setTimeout(searchMovie, waitToSearchMs)
})

movieToSearch.addEventListener('keydown', () => clearTimeout(timeout))
// movieToSearch.dispatchEvent(new Event('keyup'))