import { default as Movie } from '../components/elements/MovieElement.js'
import { clearChildren, isValidElement } from '../features/utils.js'

function getPoster(imageLocation) {
    return `https://image.tmdb.org/t/p/w500/${imageLocation}`
}

function truncateTitle(title) {

    const maxLength = 32

    return title.length > maxLength
        ? title.slice(0, maxLength).concat('...')
        : title
}

function formatDate(date, options = {}) {

    const language = navigator.language
    const formatter = new Intl.DateTimeFormat(language, options)

    return formatter.format(new Date(date))
}

function getReleaseDateInfo(releaseDate) {
    return !releaseDate
        ? 'Not Found'
        : formatDate(releaseDate, { year: 'numeric' })
}

function createMovie({ id, title, poster_path, release_date }) {

    return new Movie({
        id,
        title: truncateTitle(title),
        poster_path: getPoster(poster_path),
        release_date: getReleaseDateInfo(release_date)
    })
}

function renderMovies(movies, appendWhere) {

    const args0 = arguments[0]

    if(!(movies instanceof Array)) {
        throw new TypeError(`The movies argument must be a instance of Array. Received ${args0} instead.`)
    }

    if(isValidElement(appendWhere)) {
        clearChildren(appendWhere)
    }

    const moviesRendered = movies.map(createMovie)

    return moviesRendered
}

export default renderMovies