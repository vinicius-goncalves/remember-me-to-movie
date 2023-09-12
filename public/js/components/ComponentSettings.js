class ComponentSettings {
    constructor(componentName, validTypes, errorMessages) {
        this.componentName = componentName
        this.validTypes = validTypes
        this.errorMessages = errorMessages
    }

    defineElement(component) {
        if(!this.componentName) {
            throw new Error('The component name must not be empty.')
        }

        const defineOptions = [this.componentName, component]

        const messages = {
            success: `Element "${this.componentName}" was defined.`,
            error: `It wasn't possible to save ${this.componentName}.`
        }

        try {
            customElements.define(...defineOptions)
        } catch (err) {
            console.log(err)
        } finally {

            customElements.whenDefined(this.componentName)
                .then(() => console.log(messages.success))
                .catch(() => console.log(messages.error))

        }
    }
}

export default ComponentSettings