import FirebaseService from '../main.js'
import { buildFirebaseSDKUrl } from '../../utils.js'
import UserDB from './UserDB.js'

const FIRESTORE_URL = buildFirebaseSDKUrl('firestore')

const {
    setDoc,
    addDoc,
    getDoc,
    doc,
    collection,
    serverTimestamp
} = await import(FIRESTORE_URL)

class MovieDB {

    static #db = FirebaseService.db

    static async exists(movieId) {
        try {

            const userId = await UserDB.getId()

            const docRef = doc(this.#db, userId, 'movies', movieId)
            const docSnapshot = await getDoc(docRef)

            return docSnapshot.exists()

        } catch(err) {
            console.log(err)
        }
    }

    static async get(movieId) {
        try {

            const userId = await UserDB.getId()
            const docRef = doc(this.#db, userId, 'movies', movieId)

            const docSnapshot = await getDoc(docRef)
            return docSnapshot.data()

        } catch(err) {
            console.log(err)
        }
    }

    static async add(movieId) {
        try {

            const exists = await this.exists(movieId)

            if(exists) {
                return await this.get(movieId)
            }

            const userId = await UserDB.getId()

            const docRef = doc(MovieDB.#db, userId, 'movies', movieId)
            setDoc(docRef, {
                movie_id: movieId,
                added_time: serverTimestamp()
            })

        } catch(err) {
            console.log(err)
        }
    }
}

export default MovieDB