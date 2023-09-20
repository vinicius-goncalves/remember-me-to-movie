import AuthUser from '../firebase/classes/AuthUser.js'
import * as UserExperiences from '../user-experiencies.js'
import { select } from '../utils.js'

const authUser = new AuthUser()


const movieSearchResult = select('[data-js="movie-search-result"]')

;(async () => {

    const user = await authUser.getUser()
    // UserExperiences.loadNavbar(user)

})()

const { poster, null_poster_path } = {
    poster: 'https://image.tmdb.org/t/p/w500',
    null_poster_path: 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'
}

const posterPath = (imageLocation) =>
    imageLocation ? poster.concat('/', imageLocation) : null_poster_path

function renderMovies(movies) {

    movieSearchResult.replaceChildren()

    const renderMovie = movie => {

        const { id,
            title,
            overview,
            release_date,
            poster_path
        } = movie

        const li = document.createElement('li')
        li.dataset.movie = `wrapper-${id}`

        const img = document.createElement('img')
        img.dataset.movie = 'poster'
        img.src = posterPath(poster_path)

        li.append(img)

        return li
    }

    const moviesRendered = movies.data.map(renderMovie)

    
    const paginationSettings = (() => {

        const moviesPerPage = 40
        const startPage = 1
        const totalPages = Math.ceil(moviesRendered.length / moviesPerPage)

        return {
            moviesPerPage,
            startPage,
            totalPages
        }

    })()

    if(paginationSettings.moviesPerPage > moviesRendered.length) {
        movieSearchResult.append(...moviesRendered)
        return moviesRendered
    }
    
    UserExperiences.createPagination({ ...paginationSettings, moviesRendered })
    return moviesRendered
}

export default renderMovies