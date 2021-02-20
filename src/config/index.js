import path from 'path'

export default {
  port: parseInt(process.env.PORT || 8999, 10),
  endpoints: {
    polygonTicker: 'https://api.polygon.io/v2/reference/tickers',
  },
  db: {
    prices: path.resolve('src/db/prices.json'),
  },

  apiKey: 'u0yPlnDkJrNsTcFCTJ51SpFPdlDvqlbq',
}
