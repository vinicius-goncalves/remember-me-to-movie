import ComponentSettings from '../ComponentSettings.js'

import * as Utils from '../../utils.js'

const helper = new ComponentSettings({
    componentName: 'custom-navbar',
    cssHref: '../../style/components/navbar/custom-navbar.css',
})

class CustomNavbar extends HTMLElement {
    constructor() {
        super()

        const self = this

        const shadowRoot = this.attachShadow({ mode: 'open' })

        const navbar = document.createElement('nav')
        self.navbar = navbar

        navbar.setAttribute('data-component-name', 'custom-navbar')

        const styleRef = document.createElement('style')
        self.styleRef = styleRef

        shadowRoot.append(styleRef, navbar)
    }

    async connectedCallback() {

        const self = this
        await Utils.fetchAndLoadCSS(helper.cssRef, self)

        const ignoreSelfNavbar = el => el !== self.navbar
        const navChildren = [...self.children].filter(ignoreSelfNavbar)

        self.navbar.append(...navChildren)
    }
}

helper
    .defineComponent(CustomNavbar)