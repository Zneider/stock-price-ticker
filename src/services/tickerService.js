import { load } from './dataService'

export const getLatestTickers = async () => {
  return await load()
}
