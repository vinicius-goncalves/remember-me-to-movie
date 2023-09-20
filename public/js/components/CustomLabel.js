import ComponentSettings from './ComponentSettings.js'
import CustomInput from './CustomInput.js'

const helper = new ComponentSettings({
    componentName: 'custom-label'
})

class CustomLabel extends HTMLElement {
    constructor() {
        super()

        const label = document.createElement('label')
        const span = document.createElement('span')
        const customInput = new CustomInput()

        customInput.dataset.type = 'email'
        // customInput.dataset.js = this.getAttribute('data-js')
        // customInput.dataset.type = this.getAttribute('label-title').toLowerCase()

        label.setAttribute('data-label', 'wrapper')
        span.setAttribute('data-label', 'title')

        const labelTitleAttr = this.getAttribute('label-title')
        const text = document.createTextNode(labelTitleAttr)
        span.appendChild(text)

        label.append(span, customInput)

        this.appendChild(label)

    }
}

helper.defineComponent(CustomLabel, { extends: 'label' })

export default CustomLabel