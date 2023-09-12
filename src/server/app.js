import fs from 'node:fs'

import FIREBASE_SETTINGS from '../../settings.js'
import GET from './routes/GET.js'

import express from 'express'
const app = express()

const PORT = process.env.PORT ?? 8080

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', req.headers.origin)
    next()
})

app.get('/api', (req, res) => {

    const o = { ok: true, msg: 'The server API is active and working fine.' }

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(200).json(o).end()
})

app.get('/firebase', async (req, res, next) => {

    const o = { ok: true, data: FIREBASE_SETTINGS }
    res.status(200).json(o).end()
})

app.use(GET)

app.listen(PORT, () => console.log('Server started on PORT %d.', PORT))

export default app