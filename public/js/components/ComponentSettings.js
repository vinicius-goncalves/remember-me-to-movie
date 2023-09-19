import * as Utils from '../utils.js'

class ComponentSettings {

    constructor({ componentName, validTypes, cssHref, errorMessages, id }) {
        this.componentName = componentName
        this.validTypes = validTypes
        this.cssRef = cssHref
        this.errorMessages = errorMessages
    }

    defineComponent(component) {

        if(!this.componentName) {
            throw new Error('The component name must not be empty.')
        }

        const messages = {
            success: `Element "${this.componentName}" was defined.`,
            error: `It wasn't possible to save ${this.componentName} `
        }

        try {

            const defineOptions = [this.componentName, component]
            customElements.define(...defineOptions)

        } catch (err) {
            console.log(messages.error.concat('due to "', err.message, '".'))
        } finally {
            customElements.whenDefined(this.componentName)
                .then(() => console.log(messages.success))
                .catch(err => console.log(err))
        }

        return this
    }
}

export default ComponentSettings