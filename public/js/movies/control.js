await import('../components/navbar/CustomNavbar.js')
await import('../components/navbar/NavbarOption.js')
await import('../components/CustomInput.js')

import MovieDB from '../firebase/classes/MovieDB.js'

import { select } from '../utils.js'
import renderMovies from './render.js'

const movieToSearch = select('[data-js="movie-to-search"]')
const searchMovieBtn = select('[data-btn="search-movie"]')

function addSaveMovieEvent(renderedMovie) {

    renderedMovie.addEventListener('click', event => {
        const target = event.target
        const movieWrapper = target.closest('[data-movie|="wrapper"]')
        const movieId = movieWrapper.dataset.movie.split('-').at(1)
        
        MovieDB.add(movieId).then(() => {
            console.log('Nice')
        })
    })
}

async function searchMovie() {

    const movie = movieToSearch.value
    const res = await fetch(`http://localhost:8080/movies/${movie}`)
    const movies = await res.json()

    const renderedMovies = renderMovies(movies)
    Array.of(...renderedMovies).forEach(addSaveMovieEvent)
}

searchMovieBtn.addEventListener('click', searchMovie)
searchMovieBtn.dispatchEvent(new Event('click'))