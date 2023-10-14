await import('../components/elements/CustomInput.js')
await import('../components/elements/CustomLabel.js')

import AuthUser from '../firebase/classes/AuthUser.js'
import { select, selectAll } from '../features/utils.js'

const loginBtn = select('[data-btn="login"]')
const loginFields = selectAll('custom-label[data-js="login-field"]')

async function startLogin() {

    const inputs = loginFields.map(field => {
        const input = field.shadowRoot.querySelector('custom-input')
        return input
    })

    const fieldsToObject = field => {
        const key = field.dataset.id
        const value = field.dataset.value
        return ({ key, value })
    }

    const unifyFields = (acc, { key, value }) => ({ ...acc, [key]: value })

    const { email, password } = inputs
        .map(fieldsToObject)
        .reduce(unifyFields, {})

    try {

        await AuthUser.invokeUserLogInProcess(email, password)

        const libraryPath = '/public/html/features/library.html'
        window.location.assign(libraryPath)

    } catch(err) {
        console.log(err)
    }
}

loginBtn.addEventListener('click', startLogin)

function preventAllForms() {
    const forms = Array.of(...document.forms)
    forms.forEach(form => form.onsubmit = (event) => event.preventDefault())
}

async function redirectLoggedUser() {

    const user = await AuthUser.getUser()

    if(user) {
        const libraryPath = '/public/html/pages/library.html'
        window.location.assign(libraryPath)
    }
}

preventAllForms()
// redirectLoggedUser()