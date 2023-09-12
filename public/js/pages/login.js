import { buildFirebaseSDKUrl } from '../utils.js'
const { onAuthStateChanged } = await import(buildFirebaseSDKUrl('auth'))

await import('../components/CustomInput.js')
await import('../components/CustomLabel.js')
import FirebaseService from '../firebase/app.js'

import AuthUser from '../firebase/AuthUser.js'

const forms = Array.of(...document.forms)
forms.forEach(form => form.onsubmit = (event) => event.preventDefault())

const loginBtn = document.querySelector('[data-btn="login"]')
const loginFields = document.querySelectorAll('custom-input[data-js="login-field"]')

const authUser = new AuthUser()

authUser.startAuthObserver(user => console.log(user, 'a'))

loginBtn.addEventListener('click', () => {
    const fields = [...loginFields].map(field => ({ [field.dataset.type]: field.dataset.value }))

    const { email, password } = Object.assign({}, ...fields)

    console.log('e: %s p: %s',email, password)

    authUser.invokeUserLogIn(email, password).then(res => {
        console.log(res)
    })

})

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

