await import('./components/CustomInput.js')

import AuthUser from './firebase/classes/AuthUser.js'
import * as UserExperiences from './user-experiencies.js'
import { select } from './utils.js'

const authUser = new AuthUser()

const movieToSearch = select('[data-js="movie-to-search"]')
const searchMovieBtn = select('[data-btn="search-movie"]')

const pagesUl = select('ul[data-js="pages"]')

;(async () => {

    const user = await authUser.getUser()
    UserExperiences.loadNavbar(user)

})()

const { poster, null_poster_path } = {
    poster: 'https://image.tmdb.org/t/p/w500',
    null_poster_path: 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'
}

const posterPath = (imageLocation) =>
    imageLocation ? poster.concat('/', imageLocation) : null_poster_path

//`<li data-li='${id}'>
//                 <img src='${verifyImagePath}' class='movie-poster'>
//                 <article>
//                     <aside class='movie-details-container'>
//                         <h2 data-movie-name='${title}'>${title}</h2>
//                         <h5 class='release-date'>Data de lançamento: ${formattedReleaseDate}</h5>
//                         <h6 class='movie-id'>${id}</h6>
//                     </aside>
//                     <p class='movie-description'>${overview}</p>
//                     <button class='add-to-library' data-js='${id}'>
//                         <span class='text-add-to-library' data-js='${id}' data-movie='${title}'>Adicionar a biblioteca</span>
//                         <span class='added-into-library' data-js='${id}' data-movie='${title}'>Conteúdo adicionado</span>
//                     </button>
//                 </article>
//             </li>`

function renderMovies(movies) {

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

        const moviesPerPage = 9
        const startPage = 1
        const totalPages = Math.ceil(moviesRendered.length / moviesPerPage)

        return {
            moviesPerPage,
            startPage,
            totalPages
        }

    })()

    UserExperiences.createPagination({ ...paginationSettings, moviesRendered })
}

async function searchMovie() {

    const movie = movieToSearch.value
    const res = await fetch(`http://localhost:8080/movies/${movie}`)
    const movies = await res.json()

    renderMovies(movies)
}

searchMovieBtn.addEventListener('click', searchMovie)
searchMovieBtn.dispatchEvent(new Event('click'))

// import { auth, db, apiKeyMovieDB } from './authAndRequests.js'
// import { userNavbar, extractPropFromCurrentUser, updateUserInformation } from './userExperience.js'

// import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js'

// import { doc, addDoc, setDoc, updateDoc, getDoc, arrayUnion, arrayRemove, deleteDoc, onSnapshot, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js'

// const formSearchContainer = document.querySelector('[data-js="form-search-container]')
// const ulMoviesSearchResult = document.querySelector('#ul-movies-search-result')
// const recentSearchContainer = document.querySelector('#recent-search')

// const userProfileAtNavbar = document.querySelector('#user-image-profile-navbar')
// const loaderImageProfileAtNavbar = document.querySelector('#loader-profile-navbar')

// const navbarMoviesNumberIntoLibrary = document.querySelector('.movies-in-library-number')

// const getNotificationContent = document.querySelector('.notification-wrap')
// const notificationNumber = document.querySelector('.notification-icon-number')
// const checkRead = document.querySelector('.check-read')

// signOutBtn.addEventListener('click', () => authUser.signOutCurrentUser())

// const verifyIfUserExistsInDb = async (user) => {
//     getDoc(doc(db, 'users', user)).then((dataSnapshot) => {
//         if(dataSnapshot.exists()) {
//             return
//         } else {
//             setDoc(doc(db, 'users', user), {
//                 lastChange: serverTimestamp(),
//                 moviesId: [],
//                 recentSearchs: [],
//                 notifications: []
//             })
//         }
//     })
// }

// onAuthStateChanged(auth, async (user) => {
//     if(await user) {
//         userNavbar(user)
//         await verifyIfUserExistsInDb(extractPropFromCurrentUser(auth, 'uid'))
//         updateUserInformation(
//             user,
//             (
//                 userProfileAtNavbar.src = extractPropFromCurrentUser(auth, 'photoURL')
//             ),
//             (
//                null
//             ),
//             (
//                 loaderImageProfileAtNavbar.style.display = 'none'
//             )
//         )

//         onSnapshot(doc(db, 'users', auth.currentUser.uid), async (doc) => {
//            navbarMoviesNumberIntoLibrary.textContent = await doc.data().moviesId.length
//         })

//         const userExist = await getDoc(doc(db, 'users', auth.currentUser.uid))
//         if(userExist.exists()) {
//             getNotificationContent.innerHTML += userExist.data().notifications.map(value =>
//                 `<p>${value}</p><br>`).join('')
//         }

//         notificationNumber.textContent = userExist.data().notifications.length

//     }else {
//         userNavbar(user)
//         window.location = '../login.html'
//     }
// })

// const urlToRequest = (termToSearch) =>
//     'https://api.themoviedb.org/3/search/movie?api_key='
//     +apiKeyMovieDB+'&language=pt-BR&query='
//     +termToSearch+'&page=1&include_adult=false'

// /* Code refactoring [done] */
// const fetchResult = async (searchedTerm) => {

//     ulMoviesSearchResult.innerHTML = ''

//     const requestToMovieAPI = await fetch(urlToRequest(searchedTerm))

//     const responseFromMovieAPI = await requestToMovieAPI.json()
//     const resultsMoviesByResponse = await responseFromMovieAPI.results

//     const reduceToLi = resultsMoviesByResponse.reduce((accumulator, movieInformation) => {
//         const { id, title, overview, release_date } = movieInformation

//         const formattedReleaseDate = new Date(release_date).toLocaleDateString('pt-BR', {
//             day: '2-digit',
//             month: 'long',
//             year: 'numeric'
//         })

//         const verifyImagePath =
//             posterPath(movieInformation.poster_path) === posterPath('null')
//             ? 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'
//             : posterPath(movieInformation.poster_path)

//         accumulator +=
//             `<li data-li='${id}'>
//                 <img src='${verifyImagePath}' class='movie-poster'>
//                 <article>
//                     <aside class='movie-details-container'>
//                         <h2 data-movie-name='${title}'>${title}</h2>
//                         <h5 class='release-date'>Data de lançamento: ${formattedReleaseDate}</h5>
//                         <h6 class='movie-id'>${id}</h6>
//                     </aside>
//                     <p class='movie-description'>${overview}</p>
//                     <button class='add-to-library' data-js='${id}'>
//                         <span class='text-add-to-library' data-js='${id}' data-movie='${title}'>Adicionar a biblioteca</span>
//                         <span class='added-into-library' data-js='${id}' data-movie='${title}'>Conteúdo adicionado</span>
//                     </button>
//                 </article>
//             </li>`
//         return accumulator
//     }, '')

//     ulMoviesSearchResult.innerHTML += reduceToLi
// }

// formSearchContainer.addEventListener('input', (event) => {
//     const termSearched = event.target.value.trim()

//     if(termSearched === '') {
//         ulMoviesSearchResult.innerHTML = ''
//         return
//     }

//     fetchResult(termSearched)
// })

// formSearchContainer.addEventListener('submit', (event) => {
//     event.preventDefault()

//     const termSearchContainer = event.target['search-movie-term']
//     const termToSearch = termSearchContainer.value.trim()

//     if(termToSearch === '') {
//         return
//     }

//     fetchResult(termToSearch)

//     updateDoc(doc(db, 'users', extractPropFromCurrentUser(auth, 'uid')), {
//         recentSearchs: arrayUnion(termToSearch)
//     })

//     getDoc(doc(db, 'users', extractPropFromCurrentUser(auth, 'uid'))).then((recentSearchs) => {
//         recentSearchContainer.innerHTML = ''
//         const recentSearchsFromDatabase = recentSearchs.data().recentSearchs
//         recentSearchsFromDatabase.map((value) => {
//             const newElementOption = document.createElement('option')
//             newElementOption.value = value
//             recentSearchContainer.appendChild(newElementOption)
//         })
//     })

//     termSearchContainer.focus()
//     termSearchContainer.value = ''

// })

// const notificationWrap = document.querySelector('.notification-wrap')

// ulMoviesSearchResult.addEventListener('click', async (event) => {

//     const movieIdFromDataJs = event.target.dataset.js
//     const movie = event.target.dataset.movie

//     const message = 'O filme ' + movie + ' foi adicionado a sua biblioteca!'


//     if(movieIdFromDataJs) {
//         updateDoc(doc(db, 'users', extractPropFromCurrentUser(auth, 'uid')), {
//             lastChange: serverTimestamp(),
//             moviesId: arrayUnion(movieIdFromDataJs)
//         }).then(() => {
//             const newElement = document.createElement('p')
//             newElement.innerHTML = message
//             notificationWrap.appendChild(newElement)
//             notificationWrap.append(document.createElement('br'))

//             updateDoc(doc(db, 'users', auth.currentUser.uid), {
//                 notifications: arrayUnion(message)
//                 })
//             // console.log('O filme ' + movieIdFromDataJs + ' foi adicionado ao banco de dados do usuário: ' + extractPropFromCurrentUser(auth, 'uid'))
//         })
//     }
// })