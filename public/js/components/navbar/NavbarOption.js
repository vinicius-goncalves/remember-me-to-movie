import ComponentSettings from '../ComponentSettings.js'

import * as Utils from '../../utils.js'

const helper = new ComponentSettings({
    componentName: 'navbar-option',
    cssHref: '../../style/components/navbar/navbar-option.css'
})

const parser = new DOMParser()

class NavbarOption extends HTMLElement {
    constructor() {
        super()

        const self = this

        const ifAttr = self.getAttribute('if')
        const toAttr = self.getAttribute('to')

        if(!ifAttr || !toAttr) {
            throw new Error('The ' + helper.componentName + ' must have an "if" and a "to" attribute.')
        }

        const shadowRoot = self.attachShadow({ mode: 'open' })

        const a = document.createElement('a')
        self.a = a

        a.setAttribute('data-component-name', 'navbar-option')
        a.setAttribute('data-if', ifAttr)
        a.setAttribute('href', toAttr)

        a.append(...self.childNodes)

        const styleRef = document.createElement('style')
        self.styleRef = styleRef

        shadowRoot.append(styleRef, a)
    }

    async connectedCallback() {
        const self = this
        await Utils.fetchAndLoadCSS(helper.cssRef, self)
    }
}

helper.defineComponent(NavbarOption)