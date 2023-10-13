import MovieDB from '../firebase/classes/MovieDB.js'

function updateFavoriteIcon(favoriteButton, added) {
    favoriteButton.querySelector('span').textContent = added
        ? 'star'
        : 'favorite'
}

async function addSaveMovieEvent(renderedMovie) {

    if(!(renderedMovie instanceof Element)) {
        return
    }

    const {
        favoriteButton,
        movieId
    } = renderedMovie

    const movieExistsOnDB = await MovieDB.exists(movieId)

    if(movieExistsOnDB) {
        updateFavoriteIcon(favoriteButton, true)
    }

    favoriteButton.addEventListener('click', async () => {
        const res = await MovieDB.add(movieId)
        updateFavoriteIcon(favoriteButton, res.added)
    })
}

function loadMoviesSaveOption(renderedMovies) {

    if(!Array.isArray([...renderedMovies])) {
        return
    }

    renderedMovies.forEach(addSaveMovieEvent)
}

export {
    loadMoviesSaveOption
}