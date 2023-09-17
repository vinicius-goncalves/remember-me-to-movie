import ComponentSettings from './ComponentSettings.js'

const helperArgs = {
    *[Symbol.iterator]() {
        yield [ this.componentName ]
    },
    componentName: 'custom-button'
}

const helper = new ComponentSettings(...helperArgs)

class CustomButton extends HTMLElement {
    constructor() {
        super()
    }
}