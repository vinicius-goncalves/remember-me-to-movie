import { getMovieByName } from '../../movies-utils.js'

async function get(name, page = 1) {
    return new Promise(resolve => resolve(getMovieByName(name, page)))
}

export {
    get
}