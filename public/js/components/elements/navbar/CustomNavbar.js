import ComponentSettings from '../ComponentSettings.js'

const helper = new ComponentSettings({
    componentName: 'custom-navbar',
    cssHref: '../../js/components/style/navbar/custom-navbar.css',
})

class CustomNavbar extends HTMLElement {
    constructor() {
        super()

        const self = this

        const shadowRoot = this.attachShadow({ mode: 'open' })

        const navbar = document.createElement('nav')
        self.navbar = navbar

        navbar.setAttribute('data-component-name', 'custom-navbar')

        const link = document.createElement('link')
        link.setAttribute('rel', 'stylesheet')
        link.setAttribute('href', helper.cssRef)

        // const styleRef = document.createElement('style')
        // self.styleRef = styleRef

        shadowRoot.append(link, navbar)
    }

    async connectedCallback() {

        const self = this

        const ignoreSelfNavbar = el => el !== self.navbar
        const navChildren = [...self.children].filter(ignoreSelfNavbar)

        self.navbar.append(...navChildren)
    }
}

helper.defineComponent(CustomNavbar)