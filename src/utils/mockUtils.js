const isNegative = () => Boolean(Math.floor(Math.random() * 2))
const noChange = () => Math.ceil(Math.random() * 100) < 97

const getMockChange = () => {
  const val = (Math.random() * 100).toFixed(2)
  return Number(val)
}

export const getMockedPrice = () => {
  const val = (Math.random() * 100000).toFixed(2)
  return Number(val)
}
export const updateMockedPrice = (currentPrice) => {
  if (noChange()) return currentPrice
  const isNegativeChange = isNegative()
  const change = getMockChange()
  const newPrice = currentPrice + (isNegativeChange ? -1 : 1) * change
  return Number(newPrice.toFixed(2))
}
