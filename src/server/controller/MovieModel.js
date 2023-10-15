import { getMovieByName, getMovieById } from '../../movies-utils.js'

function get(name, page = 1) {
    return new Promise(resolve => resolve(getMovieByName(name, page)))
}

function getById(id) {
    return new Promise(resolve => resolve(getMovieById(id)))
}

export {
    get,
    getById
}