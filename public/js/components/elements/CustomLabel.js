import ComponentSettings from './ComponentSettings.js'
import CustomInput from './CustomInput.js'

const helper = new ComponentSettings({
    componentName: 'custom-label',
    cssHref: '../../js/components/style/custom-label.css'
})

class CustomLabel extends HTMLElement {
    constructor() {
        super()

        const self = this
        const shadowRoot = self.attachShadow({ mode: 'open' })

        const label = document.createElement('label')
        label.dataset.label = 'wrapper'

        const labelTitle = self.getAttribute('label-title')

        const span = document.createElement('span')
        span.dataset.label = 'title'
        span.textContent = labelTitle

        const inputType = self.getAttribute('input-type')

        const customInput = new CustomInput(inputType, labelTitle.toLowerCase())

        label.append(span, customInput)
        shadowRoot.appendChild(label)

    }

    connectedCallback() {

        const self = this
        const shadowRoot = self.shadowRoot
        helper.defineStyle(shadowRoot)
    }
}

helper.defineComponent(CustomLabel)

export default CustomLabel