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
        elements.at(0).replaceChildren()
        return
    }

    elements.forEach(el => el.replaceChildren())
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

function loadNavbar(user) {

    const navbarChildren = [...navbarWrapper.children]

    const hideOrShowEl = el => user && el.dataset.js.includes('logged-in')
        ? { show: true, el }
        : { show: false, el }

    const hideOrShowElSideEffect = elOption => {
        const { show, el } = elOption
        el.style.setProperty('display', show ? 'block' : 'none')
    }

    navbarChildren
        .map(hideOrShowEl)
        .forEach(hideOrShowElSideEffect)
}

export {
    buildFirebaseSDKUrl,
    detailFirebaseAuthError,
    select,
    createIcon,
    clearChildren,
    fetchAndLoadCSS,
    fetchTemplate,
    loadNavbar
}