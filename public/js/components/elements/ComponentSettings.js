class ComponentSettings {

    constructor({ componentName, validTypes, cssHref, errorMessages, templateHref }) {

        this.componentName = componentName
        this.validTypes = validTypes
        this.cssRef = cssHref
        this.errorMessages = errorMessages
        this.templateHref = templateHref
    }

    defineStyle(shadowRoot) {
        const styleLink = document.createElement('link')
        styleLink.rel = 'stylesheet'
        styleLink.href = this.cssRef
        styleLink.type = 'text/css'
        if(shadowRoot instanceof ShadowRoot) {
            shadowRoot.prepend(styleLink)
        }
    }

    defineComponent(component, settings = {}) {

        if(!this.componentName) {
            throw new Error('The component name must not be empty.')
        }

        const messages = {
            success: `Element "${this.componentName}" was defined.`,
            error: `It wasn't possible to save ${this.componentName} `
        }

        try {

            const defineOptions = [this.componentName, component, settings]
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