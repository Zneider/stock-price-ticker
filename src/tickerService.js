const config = require('../config')
const fetch = require('node-fetch')
const { URLSearchParams } = require('url')
const PubSub = require('pubsub-js')

let tickers, t

const getLatestTickers = () => {
  return tickers || {}
}

const getParams = (settings = {}) => {
  const defaultSettings = {
    sort: 'ticker',
    type: 'cs',
    locale: 'US',
    perpage: 10,
    page: 1,
    apiKey: config.apiKey,
  }

  const newSettings = { ...defaultSettings, ...settings }

  const params = new URLSearchParams()

  Object.keys(newSettings).forEach((key, idx) => {
    params.append(key, newSettings[key])
  })

  return params
}

const getTickers = async (options = {}) => {
  console.log('get tickers')
  const params = getParams(options.settings)

  try {
    const res = await fetch(`${config.endpoint}?${params.toString()}`)
    const json = await res.json()
    console.log(json)
    return json
  } catch (e) {
    console.log(e)
  }
}

const getUpdatedPrice = (currentPrice) => {
  const isNegativeChange = Math.floor(Math.random() * 2)
  const change = Math.ceil(Math.random() * 100)

  const newPrice = (isNegativeChange ? -1 : 1) * change + currentPrice

  return newPrice
}

const updatePrices = () => {
  const updatedTickers = [...tickers].map((ticker) => {
    ticker.price = getUpdatedPrice(ticker.price)
    ticker.updated = Date.now()
    return ticker
  })

  tickers = updatedTickers
  PubSub.publish('PRICES_UPDATED')
  console.log('updated: %o', tickers)
}

const getMockedPrice = () => (Math.random() * 100000).toFixed(2)

const processTickers = (data) => {
  const tickers = (data?.tickers ?? []).map((ticker) => {
    ticker.price = Number(getMockedPrice())
    ticker.updated = Date.now()
    console.log('ticker: %o', ticker)
    return ticker
  })
  return tickers
}

const init = () => {
  console.log('initializing ticker service')
  getTickers().then((data) => {
    try {
      tickers = processTickers(data)
      console.log(tickers)
      //   updatePrices()
      t = setInterval(updatePrices, 60 * 100)
    } catch (e) {
      console.log(e)
    }
  })
}

const destroy = () => {
  t && clearInterval(t)
  tickers = null
}

module.exports = {
  init,
  getLatestTickers,
  destroy,
}
