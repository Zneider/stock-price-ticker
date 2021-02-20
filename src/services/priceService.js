import fs from 'fs'
import config from '../config'
import { updateMockedPrice } from '../utils/mockUtils'
import { load, persist } from './dataService'
import PubSub from 'pubsub-js'
import events from '../subscribers/events'

export const updatePrices = async () => {
  try {
    const data = await load()
    const { tickers = [] } = data
    const updatedTickers = [...tickers].map((ticker) => {
      const newPrice = updateMockedPrice(ticker.price)
      if (newPrice !== ticker.price) {
        ticker.price = newPrice
        ticker.updated = Date.now()
      }
      return ticker
    })

    updatedTickers
    await persist({ ...data, tickers: updatedTickers })
    PubSub.publish(events.price.updated)
  } catch (err) {
    console.log(err)
  }
}
