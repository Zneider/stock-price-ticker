import { getStockInfo } from '../api/stockInfoApi'
import { getMockedPrice } from '../utils/mockUtils'
import { load, persist } from './dataService'

export const getNextPage = async () => {
  try {
    const { page } = await load()
    const stockInfo = await getStockInfo({ settings: { page: page + 1 } })

    const data = {
      ...stockInfo,
      tickers: stockInfo.tickers.map((ticker) => {
        ticker.price = getMockedPrice()
        ticker.updated = Date.now()
        return ticker
      }),
    }
    return await persist(data)
  } catch (err) {
    console.log(err)
    Promise.reject(err)
  }
}

export const getPrevPage = async () => {
  try {
    const { page } = await load()
    const prevPage = page - 1 > 0 ? page - 1 : 1
    const stockInfo = await getStockInfo({ settings: { page: prevPage } })

    const data = {
      ...stockInfo,
      tickers: stockInfo.tickers.map((ticker) => {
        ticker.price = getMockedPrice()
        ticker.updated = Date.now()
        return ticker
      }),
    }
    return await persist(data)
  } catch (err) {
    console.log(err)
    Promise.reject(err)
  }
}
