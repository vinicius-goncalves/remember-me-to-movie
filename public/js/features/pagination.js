import { clearChildren, createIcon } from './utils.js'

function calculePages(currPage, totalPages, start = 1, end = 5) {

    const pagesGroup = (end - start) + 1
    const halfPagesGroup = Math.ceil(pagesGroup / 2)

    if(currPage >= halfPagesGroup && currPage < totalPages - halfPagesGroup) {

        return {
            start: Math.max(1, currPage - 2),
            end: Math.max(1, currPage + 2)
        }

    } else if(currPage >= totalPages - halfPagesGroup) {
        return {
            start: Math.max(1, totalPages - halfPagesGroup - 1),
            end: Math.max(1, totalPages)
        }
    }

    return { start, end }
}

const createButton = (type, paginationWrapper) => {

    const iconMap = new Map([
        ['next', 'chevron_right'],
        ['prev', 'chevron_left']
    ])

    const positionMap = new Map([
        ['next', 'beforeend'],
        ['prev', 'afterbegin']
    ])

    const [ iconType, positionType ] = [iconMap, positionMap]
        .map(mapObj => mapObj.get(type))

    const icon = createIcon(iconType)
    icon.classList.add('page-control', type)

    paginationWrapper.insertAdjacentElement(positionType, icon)

    return icon
}

const createPage = (pageNumber = 1, activePage = false, paginationWrapper) => {

    const pageLi = document.createElement('li')
    const classToAdd = activePage ? 'page-active' : 'page'

    pageLi.appendChild(document.createTextNode(pageNumber))
    pageLi.classList.add(classToAdd)
    paginationWrapper.appendChild(pageLi)

    return pageLi
}

/**
 * Use this method to create a pagination.
 * @method
 * @param { Object } settings - An object having the pagination settings
 * @param { Element } paginationWrapper - The DOM element to append the PAGES.
 * @param { Element } itemsWrapper - The DOM element to append the ITEMS.
 * @example
 * createPagination({ itemsPerPage: 3, startPage: 1, items: [item1, item2, itemN] })
 * createPagination({ ... }, pagesWrapper, myItemsWrapper)
 */
function createPagination(settings, paginationWrapper, itemsWrapper) {

    clearChildren(itemsWrapper, paginationWrapper)

    const { itemsPerPage, startPage, items } = settings

    const totalPages = Math.ceil(items.length / itemsPerPage)

    const { start, end } = calculePages(startPage, totalPages)

    const renderPages = () => {

        for(let i = start; i <= end; i++) {

            const page = createPage(i, i == startPage, paginationWrapper)

            page.onclick = () => createPagination({
                ...settings,
                startPage: i
            }, paginationWrapper, itemsWrapper)
        }
    }

    ;(() => {

        if(settings.items.length <= settings.itemsPerPage) {
            return
        }

        if(startPage > 1) {

            const prevBtn = createButton('prev', paginationWrapper)

            prevBtn.addEventListener('click', () => {
                createPagination({
                    ...settings,
                    startPage: startPage - 1
                }, paginationWrapper, itemsWrapper)
            })
        }

        renderPages()

        if(startPage < totalPages) {

            const nextBtn = createButton('next', paginationWrapper)

            nextBtn.addEventListener('click', () => {
                createPagination({
                    ...settings,
                    startPage: startPage + 1
                }, paginationWrapper, itemsWrapper)
            })
        }

    })()

    ;(() => {

        const startIndex = (startPage - 1) * itemsPerPage
        const endIndex = startPage * itemsPerPage

        itemsWrapper.append(...items.slice(startIndex, endIndex))

    })()
}

export default createPagination