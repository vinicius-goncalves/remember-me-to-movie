import ComponentSettings from './ComponentSettings.js'
import CustomInput from './CustomInput.js'

const helperArgs = {
    *[Symbol.iterator]() {
        yield [this.componentName]
    },
    componentName: 'custom-label'
}

const helper = new ComponentSettings(...helperArgs)

class CustomLabel extends HTMLElement {
    constructor() {
        super()

        const label = document.createElement('label')
        const span = document.createElement('span')
        const customInput = new CustomInput({ type: this.getAttribute('input-type') })

        customInput.dataset.js = this.getAttribute('data-js')
        customInput.dataset.type = this.getAttribute('label-title').toLowerCase()

        label.setAttribute('data-label', 'wrapper')
        span.setAttribute('data-label', 'title')

        const labelTitleAttr = this.getAttribute('label-title')
        const text = document.createTextNode(labelTitleAttr)
        span.appendChild(text)

        label.append(span, customInput)

        this.appendChild(label)

    }
}

helper.defineElement(CustomLabel)

export default CustomLabel