import { getMockedPrice } from '../utils/mockUtils'
import { run as runPriceJob } from '../jobs/priceJob'
import { persist } from '../services/dataService'
import { getStockInfo } from '../api/stockInfoApi'

export default async (options = {}) => {
  try {
    const json = await getStockInfo(options)

    const data = {
      ...json,
      tickers: json.tickers.map((ticker) => {
        ticker.price = getMockedPrice()
        ticker.updated = Date.now()
        return ticker
      }),
    }
    return await persist(data, runPriceJob)
  } catch (e) {
    console.log(e)
    return Promise.reject(e)
  }
}
