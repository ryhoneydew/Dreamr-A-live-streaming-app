import io from 'socket.io-client'
import store from './store'
import {receiveNewMessage} from './store/messages'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})
socket.on('new_message', message => {
  console.log('front-end', message)
  store.dispatch(receiveNewMessage(message))
})
export default socket
