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
        return elFound.matches(selector) ? elFound : -1
    }
}

function createIcon(name) {
    const icon = document.createElement('span')
    icon.classList.add('material-symbols-outlined')
    icon.textContent = name
    return icon
}

function clearChildren(...elements) {

    if(elements.length === 1) {
        const el = elements.at(0)
        el.replaceChildren()
        return
    }
}

async function fetchAndLoadCSS(endpoint, component) {

    const headers = { headers: { 'content-type': 'text/css' }}
    const res = await fetch(endpoint, headers)
    const data = await res.text()

    if(component instanceof HTMLElement) {

        const componentShadowRoot = component.shadowRoot
        const styleRef = componentShadowRoot.querySelector('style')

        const text = document.createTextNode(data)
        styleRef.appendChild(text)
    }
}

export {
    buildFirebaseSDKUrl,
    detailFirebaseAuthError,
    select,
    createIcon,
    clearChildren,
    fetchAndLoadCSS
}