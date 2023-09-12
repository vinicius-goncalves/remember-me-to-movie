import ComponentSettings from './ComponentSettings.js'

const helper = new ComponentSettings(
    'custom-input',
    ['text', 'email', 'password'],
    {
        UNDEFINED_TYPE: 'You must specify at least the input type.',
        INVALID_TYPE: (type) => `The type "${type}" is not accept.`
    }
)

class CustomInput extends HTMLElement {

    constructor({ type, placeholder, value }) {
        super()

        if(!type) {
            throw new Error(helper.errorMessages.UNDEFINED_TYPE)
        }

        if(!helper.validTypes.includes(type)) {
            throw new Error(helper.errorMessages.INVALID_TYPE(type))
        }

        const input = document.createElement('input')
        input.setAttribute('type', type)
        input.classList.add('custom-field')

        Array.of(['placeholder', placeholder], ['value', value]).forEach(([ attr, value ]) => {

            if(typeof value === 'undefined') {
                return
            }

            input.setAttribute(attr, value)
        })

        this.appendChild(input)
    }

    connectedCallback() {

        const selfEl = this

        if(!selfEl.isConnected) {
            return
        }

        selfEl.addEventListener('input', (event) => {

            const value = String(event.target.value)

            if(value.length === 0) {
                selfEl.removeAttribute('data-value')
                return
            }

            selfEl.setAttribute('data-value', value)
        })
    }
}

helper.defineElement(CustomInput)

export default CustomInput