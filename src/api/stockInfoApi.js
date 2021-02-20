import config from '../config'
import fetch from 'node-fetch'

const defaultSettings = {
  sort: 'ticker',
  type: 'cs',
  locale: 'US',
  perpage: 10,
  page: 1,
  apiKey: config.apiKey,
}

const getParams = (settings = {}) => {
  const newSettings = { ...defaultSettings, ...settings }

  const params = new URLSearchParams()

  Object.keys(newSettings).forEach((key, idx) => {
    params.append(key, newSettings[key])
  })

  return params
}

export const getStockInfo = async (options = {}) => {
  const params = getParams(options.settings)

  try {
    const res = await fetch(`${config.endpoints.polygonTicker}?${params.toString()}`)
    return await res.json()
  } catch (e) {
    console.log(e)
  }
}
