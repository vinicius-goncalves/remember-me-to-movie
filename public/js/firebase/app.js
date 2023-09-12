import { buildFirebaseSDKUrl } from '../utils.js'

const API_URL = 'http://localhost:8080/firebase'

async function initializeFirebase(firebaseSettings) {

    const appURL = buildFirebaseSDKUrl('app')
    const authURL = buildFirebaseSDKUrl('auth')
    const firestoreURL = buildFirebaseSDKUrl('firestore')

    const { initializeApp } = await import(appURL)
    const { getAuth } = await import(authURL)
    const { getFirestore } = await import(firestoreURL)

    initializeApp(firebaseSettings)

    const auth = getAuth()
    const db = getFirestore()

    return { db, auth }
}

const res = await fetch(API_URL)
const { data: firebaseSettings } = await res.json()


export default (await initializeFirebase(firebaseSettings))