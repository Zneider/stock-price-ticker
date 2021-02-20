import { updatePrices } from '../services/priceService'

let t

export const run = () => {
  t = setInterval(() => {
    updatePrices()
  }, 100)
}

export const stop = () => {
  t && clearInterval(t)
}
