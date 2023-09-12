import * as MovieController from '../controller/MovieController.js'

import express from 'express'
const Router = express.Router()

Router.get('/movies/:movie', (req, res) => MovieController.getByName(req, res))

export default Router