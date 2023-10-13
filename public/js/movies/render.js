import { default as Movie } from '../components/elements/MovieElement.js'

import createPages from '../features/pagination.js'
import { select } from '../features/utils.js'

const movieSearchResult = select('ul[data-js="movie-search-result"]')
const pagesUl = select('ul[data-js="pagination"]')

function getPoster(imageLocation) {
    return `https://image.tmdb.org/t/p/w500/${imageLocation}`
}

function formatDate(date, options = {}) {

    const language = navigator.language
    const formatter = new Intl.DateTimeFormat(language, options)

    return formatter.format(new Date(date))
}

function renderMovies(movies) {

    movieSearchResult.replaceChildren()

    const renderMovie = movie => {

        const { id, title, poster_path, release_date } = movie

        const movieElement = new Movie({
            id,
            title: title.length > 32 ? title.slice(0, 32).concat('...') : title,
            poster_path: getPoster(poster_path),
            release_date: !release_date
                ? 'Not found'
                : formatDate(release_date, { year: 'numeric' })
        })

        return movieElement
    }

    const moviesRendered = movies.data.map(renderMovie)

    const paginationSettings = {
        itemsPerPage: 25,
        startPage: 1,
        items: moviesRendered
    }

    createPages(paginationSettings, pagesUl, movieSearchResult)

    return moviesRendered
}

export default renderMovies