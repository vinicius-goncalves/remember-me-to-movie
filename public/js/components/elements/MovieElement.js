import ComponentSettings from './ComponentSettings.js'

import * as Utils from '../../features/utils.js'

const helper = new ComponentSettings({
    componentName: 'movie-element',
    cssHref: '../../js/components/style/movie-element.css',
    templateHref: '../../js/components/templates/movies/movie-element.html'
})

const movieElementTemplate = await Utils.fetchTemplate(helper.templateHref)

const { wrappersSelector, lisSelector, detailsSelector } = {

    wrappersSelector: [
        'li[data-movie="wrapper"]',
        'section[data-movie="details"]'
    ],

    lisSelector: [
        'button[data-movie="favorite-button"]',
        'img[data-movie="poster"]'
    ],

    detailsSelector: [
        'span[data-movie="release-date"]',
        'span[data-movie="name"]'
    ]
}

class MovieElement extends HTMLElement {
    constructor({ id, ['title']: name, poster_path, release_date }) {
        super()

        const self = this
        const template = movieElementTemplate.cloneNode(true)

        const shadowRoot = self.attachShadow({ mode: 'open' })

        const templateContent = template.content
        const templateCloned = templateContent.cloneNode(true)

        const styleLink = document.createElement('link')
        styleLink.setAttribute('rel', 'stylesheet')
        styleLink.setAttribute('href', helper.cssRef)

        const [ liWrapper, details ] = wrappersSelector
            .map(selector => templateCloned.querySelector(selector))

        const [ favoriteBtn, posterImg ] = lisSelector
            .map(selector => liWrapper.querySelector(selector))

        const [ movieReleaseDate, movieName ] = detailsSelector
            .map(selector => details.querySelector(selector))

        self.dataset.movieId = id
        favoriteBtn.dataset.movieId = favoriteBtn

        posterImg.src = poster_path

        const movieNameText = new Text(name)
        const releaseDate = new Text(release_date)

        movieName.appendChild(movieNameText)
        movieReleaseDate.appendChild(releaseDate)

        shadowRoot.append(styleLink, templateCloned)
    }
}

helper.defineComponent(MovieElement)

export default MovieElement