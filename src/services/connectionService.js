import { initialize, messageHandler } from './messageService'
export const connectHandler = (ws) => {
  ws.on('message', messageHandler)
  ws.send('Hi there, I am WebSocket server')
}
