import express from 'express'

const HOST = process.env.HTTP_HOST || 'localhost'
const PORT = parseInt(process.env.HTTP_PORT || '3000')
const PROTOCOL = process.env.HTTP_PROTOCOL || 'http'

const server = express()

server.get('/', (req, res) => {
    res.send('Hello World')
})

server.listen(PORT, HOST, () => {
    console.log(`Server running at ${PROTOCOL}://${HOST}:${PORT}`)
})
