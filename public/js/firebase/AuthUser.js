import FirebaseService from './app.js'
import { buildFirebaseSDKUrl } from '../utils.js'

const AUTH_URL = buildFirebaseSDKUrl('auth')

const {
    signInWithEmailAndPassword: emailSignIn,
    createUserWithEmailAndPassword: createUser,
    onAuthStateChanged: authStatus,
    signOut } = await import(AUTH_URL)

class AuthUser {

    #auth = FirebaseService.auth

    constructor() {}

    async getUser() {

        return new Promise(resolve => {
            authStatus(this.#auth, (user) => {
                resolve(user)
            })
        })
    }

    async invokeUserLogIn(email, pass) {
        try {
            const userCredentials = await emailSignIn(this.#auth, email, pass)
            console.log(userCredentials)
            setTimeout(() => {
                signOut(this.#auth).then(res => {
                    console.log(res, 'Signout')
                })
            }, 1500)
        } catch(err) {
            
            if(err.code === 'auth/user-not-found') {

                const userCredentials = await createUser(this.#auth, email, pass)

                window.alert('User created!')

                setTimeout(() => {
                    signOut(this.#auth).then(res => {
                        console.log(res, 'Signout')
                    })
                }, 1500)

                
                console.log(userCredentials)
                return
            }
            // window.alert('Try again...')
        }
    }
}

export default AuthUser