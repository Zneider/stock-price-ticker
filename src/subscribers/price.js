import { subscribe } from 'pubsub-js'
import events from './events'
import { sendPriceMessage } from '../services/messageService'

export const initSubscribe = (ws) => {
  try {
    const handler = sendPriceMessage(ws)

    subscribe(events.price.updated, handler)
  } catch (err) {
    console.log(err)
  }
}
