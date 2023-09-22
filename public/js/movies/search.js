await import('../components/navbar/CustomNavbar.js')
await import('../components/navbar/NavbarOption.js')
await import('../components/CustomInput.js')

import MovieDB from '../firebase/classes/MovieDB.js'

import { select } from '../utils.js'
import renderMovies from './render.js'

const movieToSearch = select('[data-js="movie-to-search"]')

function addSaveMovieEvent(renderedMovie) {

    renderedMovie.addEventListener('click', event => {
        const target = event.target
        const movieWrapper = target.closest('[data-movie|="wrapper"]')
        const movieId = movieWrapper.dataset.movie.split('-').at(1)

        MovieDB.add(movieId).then(res => {
            console.log(res)
        })
    })
}

async function searchMovie() {

    const movie = movieToSearch.dataset.value
    const res = await fetch(`http://localhost:8080/movies/${movie}`)
    const movies = await res.json()

    const renderedMovies = renderMovies(movies)
    Array.of(...renderedMovies).forEach(addSaveMovieEvent)
    // Array.of(...renderedMovies).forEach(movie => {
    //     const movieId = movie.dataset.movie.split('-').at(1)
    //     MovieDB.get(movieId).then(res => {
    //         if(!res) {
    //             return
    //         }

    //         movie.classList.add('added-movie')
    //     })
    // })
}

let timeout = null
const waitToSearchMs = 1200

movieToSearch.addEventListener('keyup', () => {
    clearTimeout(timeout)
    timeout = setTimeout(searchMovie, waitToSearchMs)
})

movieToSearch.addEventListener('keydown', () => clearTimeout(timeout))