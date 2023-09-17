const FIREBASE_JS_URL = 'https://www.gstatic.com/firebasejs'

function buildFirebaseSDKUrl(service = 'app', version = '10.3.1') {

    const availableServices = ['app', 'storage', 'firestore', 'auth']

    if(!availableServices.includes(service)) {
        throw new Error(`The service ${service} is not an available service for Firebase.`)
    }

    return `${FIREBASE_JS_URL}/${version}/firebase-${service}.js`
}

function detailFirebaseAuthError(errorCode) {

    const [ _, error ] = errorCode.split('/')

    const errorsMessages = {
        'email-already-in-use': 'This email already exists. Try another one.'
    }[error] || 'Unknown error.'

    return errorsMessages
}

function select(selector) {
    const elFound = document.querySelector(selector)
    if(elFound instanceof Element) {
        return elFound.matches(selector) ? elFound : undefined
    }
}

function createIcon(name) {
    const icon = document.createElement('span')
    icon.classList.add('material-symbols-outlined')
    icon.textContent = name
    return icon
}

export {
    buildFirebaseSDKUrl,
    detailFirebaseAuthError,
    select,
    createIcon
}