import express from 'express'
import http from 'http'
import serve from './app'

const app = express()

const server = http.createServer(app)

serve(server)

server.listen(process.env.PORT || 8999, () => {
  console.log(`Server started on port ${server.address().port} :)`)
})
