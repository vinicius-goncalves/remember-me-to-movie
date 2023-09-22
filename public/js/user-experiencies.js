// const { default: { auth } } = await import('./firebase/main.js');

// import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js"
import {
    select,
    clearChildren,
    createIcon
} from './utils.js'

const navbarWrapper = select('[data-js="navbar"]')

const movieSearchResult = select('[data-js="movie-search-result"]')
const paginationWrapper = select('ul[data-js="pagination"]')
// const menu = document.querySelector('.menu')
// const overlay = document.querySelector('.logged-in-overlay-wrap')
// const menuHamburger = document.querySelector('[data-js="menu-hamburguer"]')

function loadNavbar(user) {

    const navbarChildren = [...navbarWrapper.children]

    const hideOrShowEl = el => user && el.dataset.js.includes('logged-in')
        ? { show: true, el }
        : { show: false, el }

    const hideOrShowElSideEffect = elOption => {
        const { show, el } = elOption
        el.style.display = show ? 'block' : 'none'
    }

    navbarChildren
        .map(hideOrShowEl)
        .forEach(hideOrShowElSideEffect)
}

async function createPagination(paginationSettings) {

    clearChildren(movieSearchResult, paginationWrapper)

    paginationWrapper.parentElement.removeAttribute('style')

    let { startPage, totalPages } = paginationSettings
    const { moviesPerPage, moviesRendered } = paginationSettings

    let start = 1
    let end = totalPages < 5 ?  totalPages : 5

    const groupPages = (end - start) + 1
    const halfGroupPages = Math.ceil(groupPages / 2)

    if(startPage < halfGroupPages) {
        start = 1
        end = end
    } else if(startPage >= halfGroupPages && startPage <= totalPages - halfGroupPages) {
        start = startPage - 2
        end = startPage + 2
    } else {
        start = totalPages - halfGroupPages - 1
        end = totalPages
    }

    const createButton = (type) => {

        const iconMap = new Map([
            ['next', 'chevron_right'],
            ['prev', 'chevron_left']
        ])

        const positionMap = new Map([
            ['next', 'beforeend'],
            ['prev', 'afterbegin']
        ])

        const [ iconType, positionType ] = [iconMap, positionMap]
            .map(mapObj => mapObj.get(type))

        const icon = createIcon(iconType)
        icon.classList.add('page-control', type)

        paginationWrapper.insertAdjacentElement(positionType, icon)

        return icon
    }

    const createPage = (startPage = 1, activePage = false) => {

        const li = document.createElement('li')
        const classToAdd = activePage ? 'page-active' : 'page'

        li.textContent = startPage
        li.classList.add(classToAdd)
        paginationWrapper.appendChild(li)

        return li
    }

    const renderPages = async () => {

        for(let i = start; i <= end; i++) {

            if(i <= 0) {
                continue
            }

            const page = createPage(i, i == startPage)

            page.onclick = () => createPagination({
                ...paginationSettings,
                startPage: i
            })
        }
    }

    ;(() => {

        if(startPage > 1) {
            createButton('prev').onclick = () => createPagination({
                ...paginationSettings,
                startPage: --startPage
            })
        }

        if(startPage > halfGroupPages) {

            const page = createPage(1)
            page.classList.add('first-page')
            page.onclick = () => createPagination({
                ...paginationSettings,
                startPage: 1
            })

            const separator = document.createElement('span')
            separator.textContent = '...'
            separator.style.color = 'white'

            const firstPage = document.querySelector('.first-page')
            firstPage.parentElement.insertBefore(separator, firstPage.nextElementSibling)
        }

        renderPages()

        if(startPage < totalPages) {

            if(startPage <= totalPages - halfGroupPages) {
                const page = createPage(totalPages)
                page.classList.add('last-page')
            }

            createButton('next').onclick = () => createPagination({
                ...paginationSettings,
                startPage: ++startPage
            })
        }


        if(startPage < totalPages - halfGroupPages) {

            const separator = document.createElement('span')
            separator.textContent = '...'
            separator.style.color = 'white'

            const lastPage = document.querySelector('.last-page')
            lastPage.parentElement.insertBefore(separator, lastPage)
        }
    })()

    ;(() => {

        const startIndex = (startPage - 1) * moviesPerPage
        const endIndex = startPage * moviesPerPage

        movieSearchResult.append(...moviesRendered.slice(startIndex, endIndex))

        // document.documentElement.scrollTo({
        //     top: (movieSearchResult.offsetTop - 25) - navbarWrapper.clientHeight,
        //     behavior: 'smooth'
        // })

    })()

}

// export const signOutUser =
//     navbarWrapper.addEventListener('click', (event) => {
//         if(event.target.dataset.loggout) {
//             signOut(auth).then(() => console.log('Deslogado'))
//         }
//     })

// export const updateUserInformation = (condition, resolved, rejected, end) => {

//     const promise = new Promise((resolve, reject) => {
//         if(condition) {
//             resolve(resolved)
//         }else {
//             reject(rejected)
//         }
//     })
//     promise.catch((error) => console.log(error)).finally(() => end)
// }

// export const extractPropFromCurrentUser = (user, prop) => ({
//     ...user.currentUser,
// })[prop]

// onAuthStateChanged(auth, (user) => {
//     if(user) {

//         const menuChildren = [...menuHamburger?.children]
//         menuChildren.forEach(item => {
//             if(item.dataset.js === "logged-in") {
//                 item.style.display = 'block'
//                 return
//             }
//             item.style.display = 'none'
//         })

//         menu.addEventListener('click', () => {
//             console.log('Hello World')
//             overlay.style.display = 'block'
//         })
//     }
// })

export {
    loadNavbar,
    navbarWrapper,
    createPagination
}