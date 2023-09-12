import { getMovieByName } from '../../movies-utils.js'

async function get(name) {
    return new Promise(resolve => resolve(getMovieByName(name)))
}

export { get }