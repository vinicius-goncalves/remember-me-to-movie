// const { default: { auth } } = await import('./firebase/main.js');

// import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js"
import { createIcon, select } from './utils.js'


const navbarWrapper = select('[data-js="navbar"]')
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

async function createPagination({ currPage, totalPages, moviesPerPage }) {

    const args = [...arguments].at(0)

    paginationWrapper.replaceChildren()

    let start = 1
    let end = 5

    console.log(arguments)

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
        icon.classList.add('page-control')

        paginationWrapper.insertAdjacentElement(positionType, icon)

        return icon
    }

    const createPage = (currPage = 1, activePage = false) => {

        const li = document.createElement('li')
        const classToAdd = activePage ? 'page-active' : 'page'

        li.textContent = currPage
        li.classList.add(classToAdd)
        paginationWrapper.appendChild(li)

        return li
    }

    const renderPages = async () => {

        for(let i = start; i <= end; i++) {

            if(i <= 0) {
                continue
            }

            createPage(i, i == currPage)
        }
    }

    if(currPage > 1) {
        createButton('prev').onclick = () => createPagination({
            ...args,
            currPage: --currPage
        })
    }

    renderPages()

    if(currPage <= totalPages) {
        createButton('next').onclick = () => createPagination({
            ...args,
            currPage: ++currPage
        })
    }
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