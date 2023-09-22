import * as MovieModels from './MovieModel.js'

async function getByName(req, res) {

    try {

        const movie = req.params.movie

        const {
            page,
            total_pages,
            ...data
        } = await MovieModels.get(movie)

        if(Number.parseInt(total_pages) <= 1) {
            res.status(200).json({
                result_length: data.length,
                data: data.results
            }).end()
            return
        }

        let currPage = 0
        const movies = []

        while(currPage++ < total_pages) {
            const { results } = await MovieModels.get(movie, currPage)
            movies.push(...results)
        }

        res.status(200).json({
            result_length: movies.length,
            data: movies
        }).end()

    } catch(err) {
        console.log(err)
    }
}

export {
    getByName
}