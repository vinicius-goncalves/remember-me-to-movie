import FirebaseService from '../main.js'
import { buildFirebaseSDKUrl, detailFirebaseAuthError } from '../../utils.js'

import UserDB from './UserDB.js'

const AUTH_URL = buildFirebaseSDKUrl('auth')

const {
    signInWithEmailAndPassword: emailSignIn,
    createUserWithEmailAndPassword: createUser,
    onAuthStateChanged: authStatus,
    signOut } = await import(AUTH_URL)

class AuthUser {

    static #auth = FirebaseService.auth

    constructor() {}

    static getUser() {

        return new Promise(resolve => {
            authStatus(this.#auth, (user) => {

                if(!user) {
                    UserDB.register()
                }

                resolve(user)
            })
        })
    }

    static async invokeUserSignInProcess(email, pass) {
        try {
            const userCredentials = createUser(this.#auth, email, pass)
            return { created: true, user: userCredentials }
        } catch({ [code]: errCode }) {
            const errorDetailed = detailFirebaseAuthError(errCode)
            console.log(errorDetailed)

            return { created: false }
        }
    }

    static async invokeUserLogInProcess(email, pass) {
        try {
            const userCredentials = await emailSignIn(this.#auth, email, pass)
            return { logged: true, user: userCredentials }
        } catch({ code }) {

            if(code === 'auth/user-not-found') {
                const res = await this.invokeUserSignInProcess(email, pass)
                return res
            }

            const errorDetailed = detailFirebaseAuthError(code)
            console.log(errorDetailed)

            return { logged: false }
        }
    }

    async signOutCurrentUser() {

        try {
            await signOut()
            return { signOut: true }
        } catch(err) {

            const errorDetailed = detailFirebaseAuthError(errCode)
            console.log(errorDetailed)

            return { signOut: false }
        }
    }
}

export default AuthUser