import FirebaseService from '../main.js'
import { buildFirebaseSDKUrl } from '../../utils.js'
import UserDB from './UserDB.js'

const FIRESTORE_URL = buildFirebaseSDKUrl('firestore')

const {
    setDoc,
    addDoc,
    doc,
    collection
} = await import(FIRESTORE_URL)

class MovieDB {

    static #db = FirebaseService.db

    static async add(movieId) {
        try {

            const userId = await UserDB.getId()

            const docRef = doc(MovieDB.#db, userId, 'movies', movieId)
            setDoc(docRef, { movie_id: movieId } )

        } catch(err) {
            console.log(err)
        }
    }
}

export default MovieDB