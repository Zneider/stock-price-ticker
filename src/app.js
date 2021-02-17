const WebSocket = require('ws')
const tickerService = require('./tickerService')
const PubSub = require('pubsub-js')

const getMessageHandler = (ws) => (message) => {
  const sendLastPrices = () => {
    const tickers = tickerService.getLatestTickers()
    ws.send(JSON.stringify(tickers))
  }

  console.log('received %s', message)
  PubSub.subscribe('PRICES_UPDATED', () => sendLastPrices(ws))
  ws.send(JSON.stringify(tickerService.getLatestTickers()))
}

const serve = (server) => {
  const wss = new WebSocket.Server({ server })
  tickerService.init()
  wss.on('connection', (ws) => {
    const messageHandler = getMessageHandler(ws)
    ws.on('message', messageHandler)
    ws.send('Hi there, I am WebSocket server')
  })
}

export default serve
