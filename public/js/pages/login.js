await import('../components/CustomInput.js')
await import('../components/CustomLabel.js')

import AuthUser from '../firebase/classes/AuthUser.js'
import { select } from '../utils.js'

const forms = Array.of(...document.forms)
forms.forEach(form => form.onsubmit = (event) => event.preventDefault())

const loginBtn = select('[data-btn="login"]')
const loginFields = select('custom-input[data-js="login-field"]')

const authUser = new AuthUser()

;(async () => {

    const user = await authUser.getUser()

    if(user) {
        const libraryPath = '/public/html/user/library.html'
        window.location.assign(libraryPath)
    }

})()

async function startLogin() {

    const fieldsToObject = field => {
        const key = field.dataset.type
        const value = field.dataset.value
        return ({ key, value })
    }

    const unifyFields = (acc, { key, value }) => ({ ...acc, [key]: value })

    const { email, password } = [...loginFields]
        .map(fieldsToObject)
        .reduce(unifyFields, {})

    try {

        await authUser.invokeUserLogInProcess(email, password)

        const libraryPath = '/public/html/user/library.html'
        window.location.assign(libraryPath)

    } catch(err) {
        console.log(err)
    }

}

loginBtn.addEventListener('click', startLogin)

// import { auth, provider } from './authAndRequests.js'
// import { userNavbar } from '../userExperience.js'
// import {
//     signOut,
//     onAuthStateChanged,
//     signInWithEmailAndPassword,
//     signInWithRedirect } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js"

// const loginContainer = document.querySelector('[data-js="login-container"]')
// const navbarContainer = document.querySelector('[data-js="nav-bar"]')
// const loginWithGoogleButton = document.querySelector('#login-with-google')

// loginContainer.addEventListener('submit', (event) => {
//     event.preventDefault()
//     const email = event.target.email.value
//     const password = event.target.password.value

//     signInWithEmailAndPassword(auth, email, password).then(() => {
//         window.location = './pages/profile.html'
//     })
// })

// navbarContainer.addEventListener('click', (event) => {
//     if(event.target.dataset.logout) {
//         signOut(auth)
//     }
// })

// loginWithGoogleButton.addEventListener('click', () => {
//     signInWithRedirect(auth, provider)
// })

// onAuthStateChanged(auth, (user) => {
//     if(user) {
//         userNavbar(user)
//     } else {
//         userNavbar(user)
//     }
// })

