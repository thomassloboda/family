import express from 'express'
import { handleAuthRoutes } from './routers/auth.router.ts'
import bodyParser from 'body-parser'

const HOST = process.env.HTTP_HOST || 'localhost'
const PORT = parseInt(process.env.HTTP_PORT || '3000')
const PROTOCOL = process.env.HTTP_PROTOCOL || 'http'

const server = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

handleAuthRoutes(server)

server.get('/', (req, res) => {
    res.send('Hello World')
})

server.listen(PORT, HOST, () => {
    console.log(`Server running at ${PROTOCOL}://${HOST}:${PORT}`)
})
