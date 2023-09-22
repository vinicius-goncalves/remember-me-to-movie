import ComponentSettings from './ComponentSettings.js'

const helper = new ComponentSettings(
    {
        componentName: 'custom-input',
        validTypes: ['text', 'email', 'password'],
        errorMessages: {
            UNDEFINED_TYPE: 'You must specify at least the input type.',
            INVALID_TYPE: (type) => `The type "${type}" is not accept.`
        }
    }
)

class CustomInput extends HTMLElement {

    constructor() {
        super()

        const [ type, placeholder, value ] = Array.of(
            [this.getAttribute('data-type'), 'text'],
            [this.getAttribute('placeholder'), ''],
            [this.getAttribute('value'), '']
        ).map(([ el, defaultValue ]) => !el ? defaultValue : el)

        if(!type) {
            throw new Error(helper.errorMessages.UNDEFINED_TYPE)
        }

        if(!helper.validTypes.includes(type)) {
            throw new Error(helper.errorMessages.INVALID_TYPE(type))
        }

        const input = document.createElement('input')

        if(this.getAttribute('data-value')) {
            input.value = this.getAttribute('data-value')
        }

        input.classList.add('custom-field')
        input.setAttribute('style', this.getAttribute('style') || null)
        this.mainElement = input

        Array.of(['placeholder', placeholder], ['value', value]).forEach(([ attr, value ]) => {

            if(!value) {
                return
            }

            input.setAttribute(attr, value)
        })

        this.appendChild(input)
    }

    connectedCallback() {

        const selfEl = this
        const input = selfEl.mainElement

        if(!selfEl.isConnected) {
            return
        }

        input.type = selfEl.getAttribute('data-type')

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

helper.defineComponent(CustomInput, { extends: 'input' })

export default CustomInput