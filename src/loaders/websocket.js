import WebSocket from 'ws'
import { connectHandler } from '../services/connectionService'

const initialize = (server, cb) => {
  const wss = new WebSocket.Server({ server })
  wss.on('connection', (ws) => {
    connectHandler(ws)
    cb(ws)
  })
}

export default async ({ server, cb }) => {
  initialize(server, cb)
}
