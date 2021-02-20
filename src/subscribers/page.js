import { subscribe } from 'pubsub-js'
import events from './events'
import { getPrevPage, getNextPage } from '../services/stockInfoService'

export const initSubscribe = () => {
  subscribe(events.page.prev, getPrevPage)
  subscribe(events.page.next, getNextPage)
}
