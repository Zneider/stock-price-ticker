import { publish } from 'pubsub-js'
import { getLatestTickers } from './tickerService'

export const messageHandler = async (message) => {
  if (message) {
    switch (message) {
      case 'NEXT_PAGE':
      case 'PREV_PAGE': {
        publish(message)
        return
      }
      default: {
        console.log('Unknown message: ', message)
      }
    }
  }
}

export const sendPriceMessage = (ws) => {
  return async () => {
    if (ws) {
      try {
        const data = await getLatestTickers()
        ws.send(JSON.stringify(data))
      } catch (err) {
        console.log(err)
        Promise.reject(err)
      }
    } else {
      throw new Error('Websocket must be initialized')
    }
  }
}
