import http from 'http'
import websocketLoader from './websocket'
import dataloader from './dataloader'
import { initSubscribe as initSubscribePrice } from '../subscribers/price'
import { initSubscribe as initSubscribePage } from '../subscribers/page'

export default async ({ expressApp }) => {
  await dataloader()
  const server = http.createServer(expressApp)

  await websocketLoader({
    server,
    cb: (ws) => {
      initSubscribePrice(ws)
      initSubscribePage()
    },
  })
  return server
}
