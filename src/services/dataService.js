import config from '../config'
import fs from 'fs'

export const persist = async (data, cb) => {
  await fs.writeFile(config.db.prices, JSON.stringify(data, null, 2), 'utf-8', (err) => {
    if (err) {
      console.log(err)
    } else {
      typeof cb === 'function' && cb()
    }
  })
  return
}

export const load = async (cb) => {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(config.db.prices, 'utf-8', (err, json) => {
      if (err) {
        console.log(err)
        reject(err)
      }
      try {
        resolve(JSON.parse(json))
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  })

  return promise
}
