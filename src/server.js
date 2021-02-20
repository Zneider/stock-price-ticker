import express from 'express'
import config from './config'

const startServer = async () => {
  const app = express()

  const server = await require('./loaders').default({ expressApp: app })
  server
    .listen(config.port, () => {
      console.log(`Server started on port ${server.address().port} :)`)
    })
    .on('error', (err) => {
      console.error(err)
      process.exit(1)
    })
}

startServer()
