await import('../components/elements/navbar/CustomNavbar.js')
await import('../components/elements/navbar/NavbarOption.js')

import UserDB from '../firebase/classes/UserDB.js'
import renderMovies from '../movies/render.js'

import { select } from '../features/utils.js'
import createPagination from '../features/pagination.js'

const moviesAddedUl = select('ul[data-js="movies-added"]')
const paginationUl = select('ul[data-js="pagination"]')

const paginationSettings = (items) => ({
    itemsPerPage: 25,
    startPage: 1,
    items
})

async function loadMovies() {

    const moviesIds = await UserDB.getDocsFromCollection('movies')

    const getMovie = async ({ movie_id }) => {
        const fetchRes = await fetch(`http://localhost:8080/movie/${movie_id}`)
        return fetchRes.json()
    }

    const movies = moviesIds
        .map(getMovie)
        .map(async (movie) => (await movie).data)

    const moviesData = await Promise.all(movies)
    const moviesRendered = renderMovies(moviesData, moviesAddedUl)

    const pagesSettings = paginationSettings(moviesRendered)
    createPagination(pagesSettings, paginationUl, moviesAddedUl)
}

loadMovies()
// import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js"
// import { doc, getDoc, deleteDoc, updateDoc, arrayRemove } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js"

// const urlToRequest = (movieId) => {
//    return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKeyMovieDB}`
// }

// const posterPath = (imageLocation) => {
//     return `https://image.tmdb.org/t/p/w500/${imageLocation}`
// }

// const authUser = new AuthUser()

// const ulMovieLibrary = document.querySelector('#ul-movies-library')
// const lastDateMovieAdded = document.querySelector('.last-date-movie-added')

// const userProfileAtNavbar = document.querySelector('#user-image-profile-navbar')
// const loaderImageProfileAtNavbar = document.querySelector('#loader-profile-navbar')

        // userNavbar(user)

    //     await getDoc(doc(db, "users", auth.currentUser.uid)).then((fromDatabase) => {

    //         const { lastChange } = fromDatabase.data()
    //         const correctLastMovieAddedDate = lastChange.toDate().toLocaleDateString('pt-BR', {
    //             second: 'numeric',
    //             minute: 'numeric',
    //             hour: 'numeric',
    //             day: 'numeric',
    //             month: 'long',
    //             year: '2-digit',
    //         })

    //         lastDateMovieAdded.textContent = `${correctLastMovieAddedDate}`

    //         const moviesId = fromDatabase.data().moviesId
    //         moviesId.map((id) => { 
    //             fetch(urlToRequest(id)).then((moviesReceivedFromMovieDb) => { 
    //                 return moviesReceivedFromMovieDb.json()
    //             }).then((movie) => {
    //                 ulMovieLibrary.innerHTML += 
    //                 `<li data-li="${movie.id}">
    //                         <div class="movie-informations">
    //                             <img src="${posterPath(movie.poster_path)}" class="movie-poster">
    //                             <i class="fas fa-trash" data-remove="${movie.id}"></i>
    //                         </div>
    //                     </li>`
    //                 })
    //             })
    //         })

    //             if(user) {
    //                 resolve(userProfileAtNavbar.src = auth.currentUser.photoURL)
    //             }else {
    //                 reject(new Error('An error occurred'))
    //             }
    //         })

    //         promise.finally(() => {
    //             loaderImageProfileAtNavbar.style.display = 'none'
    //         })
    // } else {
    //     // userNavbar(user)
    // }

// ulMovieLibrary.addEventListener('click', event => {
//     const clickedDataRemove = event.target.dataset.remove
//     if(clickedDataRemove) {
//         document.querySelector(`[data-li="${clickedDataRemove}"]`).remove()
//         updateDoc(doc(db, "users", auth.currentUser.uid), {
//             moviesId: arrayRemove(clickedDataRemove)
//         }).then(() => console.log('Removido'))
//     }
// })