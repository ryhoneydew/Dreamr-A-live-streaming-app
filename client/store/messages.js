import axios from 'axios'

const GET_MESSSAGES = 'GET_MESSAGES'
const RECEIVE_NEW_MESSAGE = 'RECEIVE_NEW_MESSAGE'

const initialState = []

const getMessagesForTheRoom = messages => ({
  type: GET_MESSSAGES,
  messages
})

export const receiveNewMessage = message => {
  console.log('action calleddd', message)
  return {
    type: RECEIVE_NEW_MESSAGE,
    message
  }
}

export const fetchMessagesFromServer = roomId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/messages/rooms/${roomId}`)
    console.log(data)
    const messages = data
    dispatch(getMessagesForTheRoom(messages))
  } catch (err) {
    console.log(err)
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSSAGES:
      return action.messages
    case RECEIVE_NEW_MESSAGE:
      console.log('store called', action.message)
      return [...state, action.message]
    default:
      return state
  }
}

export default reducer
