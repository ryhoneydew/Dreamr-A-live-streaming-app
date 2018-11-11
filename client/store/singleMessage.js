import axios from 'axios'
import socket from '../socket'

const WRITE_A_MESSAGE = 'WRITE_A_MESSAGE'
const GET_A_MESSAGE = 'GET_A_MESSAGE'

const initialState = ''

const writeAMessage = content => ({
  type: WRITE_A_MESSAGE,
  content
})

const getAMessage = content => ({
  type: GET_A_MESSAGE,
  content
})

export const postAMessage = (content, roomId) => async dispatch => {
  try {
    const {data} = await axios.post('/api/messages/new', content, roomId)
    const message = data
    dispatch(writeAMessage(message))
    socket.emit('new_message', message)
    dispatch(writeAMessage(''))
  } catch (err) {
    console.log(err)
  }
}

export const fetchAMessageFromServer = messageId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/messages/${messageId}`)
    const msg = data
    dispatch(getAMessage(msg))
  } catch (err) {
    console.log(err)
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case WRITE_A_MESSAGE:
      return action.content
    case GET_A_MESSAGE:
      return action.content
    default:
      return state
  }
}

export default reducer
