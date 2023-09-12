async function getByName(req, res) {

    try {

        const movie = req.params.movie
        const data = await MovieModels.get(movie)

        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200).json(data)
        res.end()

    } catch(err) {
        console.log(err)
    }
}

export { getByName }