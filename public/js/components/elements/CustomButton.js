import ComponentSettings from './ComponentSettings.js'

const helper = new ComponentSettings({
    componentName: 'custom-button'
})

class CustomButton extends HTMLElement {
    constructor() {
        super()
    }
}