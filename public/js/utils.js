const FIREBASE_JS_URL = 'https://www.gstatic.com/firebasejs'

function buildFirebaseSDKUrl(service = 'app', version = '10.3.1') {

    const availableServices = ['app', 'storage', 'firestore', 'auth']

    if(!availableServices.includes(service)) {
        throw new Error(`The service ${service} is not an available service for Firebase.`)
    }

    return `${FIREBASE_JS_URL}/${version}/firebase-${service}.js`
}

export {
    buildFirebaseSDKUrl
}