import { select } from './utils.js'

const navbarWrapper = select('[data-component-name="custom-navbar"]')

function loadNavbar(user) {

    const navbarChildren = [...navbarWrapper.children]

    const hideOrShowEl = el => user && el.dataset.js.includes('logged-in')
        ? { show: true, el }
        : { show: false, el }

    const hideOrShowElSideEffect = elOption => {
        const { show, el } = elOption
        el.style.setProperty('display', show ? 'block' : 'none')
    }

    navbarChildren
        .map(hideOrShowEl)
        .forEach(hideOrShowElSideEffect)
}

export default loadNavbar