import FirebaseService from '../main.js'
import { buildFirebaseSDKUrl } from '../../utils.js'
import AuthUser from './AuthUser.js'

const FIRESTORE_URL = buildFirebaseSDKUrl('firestore')

const {
    getDoc,
    getDocs,
    addDoc,
    setDoc,
    doc,
    collection
} = await import(FIRESTORE_URL)


class UserDB {
    
    static #db = FirebaseService.db
    static #authUser = new AuthUser()
    
    static async register() {
        try {
            
            const { uid } = await this.#authUser.getUser()

            const userDataRef = doc(this.#db, uid, 'user-data')

            const docData = {
                added_movies: 0,
                favorite_library_style: 'grid'
            }

            await setDoc(userDataRef, docData, { merge: true })

        } catch(err) {
            console.log(err)
        }
    }

    static async exists() {

        try {

            const { uid } = await this.#authUser.getUser()

            const collRef = collection(this.#db, uid)
            const collFound = await getDocs(collRef)

            return collFound.size > 0

        } catch(err) {
            console.log(err)
        }
    }

    static async getDocSnapshot() {

        try {

            const exists = await UserDB.exists()

            if(!exists) {
                await UserDB.register()
            }

            const { uid } = await this.#authUser.getUser()

            const docRef = doc(this.#db, uid, 'user-data')
            const docFound = await getDoc(docRef)

            return docFound

        } catch(err) {
            console.log(err)
        }
    }

    static async getData() {

        try {

            const docSnapshot = await UserDB.getDocSnapshot()
            return docSnapshot.data()

        } catch(err) {
            console.log(err)
        }
    }

    static async getId() {
        const res = await this.getDocSnapshot()
        console.log(res)
        return res.ref.path
    }
}

export default UserDB