import * as MovieController from '../controller/MovieController.js'

import express from 'express'
const Router = express.Router()

const getByName = (req, res) => MovieController.getByName(req, res)
Router.get('/movies/:movie', getByName)

export default Router