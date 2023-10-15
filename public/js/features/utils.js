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

function selectAll(selector) {
    const elsFound = document.querySelectorAll(selector)
    return [...elsFound]
}

function createIcon(name) {
    const icon = document.createElement('span')
    icon.classList.add('material-symbols-outlined')
    icon.textContent = name
    return icon
}

function clearChildren(...elements) {

    if(elements.length === 1) {
        elements.at(0).replaceChildren()
        return
    }

    elements.forEach(el => el?.replaceChildren())
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

async function fetchTemplate(endpoint) {

    return new Promise(resolve => {

        const xhr = new XMLHttpRequest()

        xhr.addEventListener('load', (event) => {
            const res = event.target.response
            const template = res.querySelector('template')
            resolve(template)
        })

        xhr.responseType = 'document'
        xhr.open('GET', endpoint)
        xhr.send()
    })
}

function isValidElement(element) {

    const args0 = arguments[0]

    if(!(element instanceof Element)) {
        throw new TypeError(`The element argument must be a instance of Element. Received ${args0} instead.`)
    }

    return true
}

export {
    buildFirebaseSDKUrl,
    detailFirebaseAuthError,
    select,
    selectAll,
    createIcon,
    clearChildren,
    fetchAndLoadCSS,
    fetchTemplate,
    isValidElement
}