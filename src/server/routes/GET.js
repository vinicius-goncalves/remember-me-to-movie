import * as MovieController from '../controller/MovieController.js'

import express from 'express'
const Router = express.Router()

const getByName = (req, res) => MovieController.getByName(req, res)
const getById = (req, res) => MovieController.getById(req, res)

Router.get('/movies/:movie', getByName)
Router.get('/movie/:id', getById)

export default Router