import { auth } from './authAndRequests.js'
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js"

export const navbarContainer = document.querySelector('[data-js="nav-bar"]')
const menu = document.querySelector('.menu')
const overlay = document.querySelector('.logged-in-overlay-wrap')
const menuHamburger = document.querySelector('[data-js="menu-hamburguer"]')

export const userNavbar = (user) => {
    const itemsNavbar = [...navbarContainer.children]

    itemsNavbar.forEach(item => {

        const userLoggedIn = item.dataset.js.includes(user ? 'logged-in' : 'logged-out')
        if(userLoggedIn) {
            item.style.display = 'block'
            return
        }
        item.style.display = 'none'
    })
}

export const signOutUser = 
    navbarContainer.addEventListener('click', (event) => {
        if(event.target.dataset.loggout) {
            signOut(auth).then(() => console.log('Deslogado'))
        }
    })

export const getCurrentUser = (userFromAuth) => {
    return userFromAuth.currentUser
}

export const updateUserInformation = (condition, resolved, rejected, end) => {

    const promise = new Promise((resolve, reject) => {
        if(condition) {
            resolve(resolved)
        }else {
            reject(rejected)
        }
    })
    promise.catch((error) => console.log(error)).finally(() => end)
}

export const extractPropFromCurrentUser = (user, prop) => ({
    ...user.currentUser,
})[prop]

onAuthStateChanged(auth, (user) => {
    if(user) {

        const menuChildren = [...menuHamburger.children]
        menuChildren.forEach(item => {
            if(item.dataset.js === "logged-in") {
                item.style.display = 'block'
                return
            }
            item.style.display = 'none'
        })

        menu.addEventListener('click', () => {
            console.log('Hello World')
            overlay.style.display = 'block'
        })
    }
})
