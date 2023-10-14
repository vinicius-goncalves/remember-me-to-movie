import ComponentSettings from './ComponentSettings.js'

const helper = new ComponentSettings({
    componentName: 'custom-input',
    cssHref: '../../js/components/style/custom-input.css'
})

class CustomInput extends HTMLElement {
    constructor(type, id) {
        super()

        const self = this
        const shadowRoot = self.attachShadow({ mode: 'open' })

        const inputType = self.getAttribute('type') || type
        const input = document.createElement('input')
        input.type = inputType

        self.input = input
        self.dataset.id = id

        shadowRoot.appendChild(input)
    }

    connectedCallback() {

        const self = this
        const shadowRoot = self.shadowRoot

        const captureValue = (event) => {
            const value = event.target.value
            self.dataset.value = value
        }

        self.input.addEventListener('input', captureValue)

        helper.defineStyle(shadowRoot)
    }
}

helper.defineComponent(CustomInput)

export default CustomInput