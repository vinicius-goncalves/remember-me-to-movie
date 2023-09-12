const https = require('https')
const MOVIEDB_URL = 'https://api.themoviedb.org'

async function fetchTo(url) {
    const res = await fetch(url)
    const data = await res.json()
    return data
}

function getDefaultURLRequest() {

    const url = new URL('/3/search/movie', MOVIEDB_URL)
    const searchParams = url.searchParams

    searchParams.set('api_key', process.env.MOVIE_API_KEY)

    return url
}

function getMovieSearchURL() {

    const url = getDefaultURLRequest()
    const searchParams = url.searchParams

    searchParams.set('language', 'en-US')
    searchParams.set('page', 1)
    searchParams.set('include_adult', false)

    return url
}

async function getMovieByName(name) {

    const url = getMovieSearchURL()
    const searchParams = url.searchParams

    searchParams.set('query', name)

    const data = await fetchTo(url)

    return data
}

module.exports = {
    getMovieByName
}