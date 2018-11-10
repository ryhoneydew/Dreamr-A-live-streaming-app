import axios from 'axios'

const GET_ROOM_INFO = 'GET_ROOM_INFO'
const CREAT_NEW_ROOM = 'CREAT_NEW_ROOM'

const initialState = {room: {}, publisher: {}, subscriber: []}

export const getRoomInfo = payload => ({
  type: GET_ROOM_INFO,
  room: payload.room,
  subscriber: payload.subscriber
})
export const createNewRoom = payload => ({
  type: CREAT_NEW_ROOM,
  room: payload.room,
  publisher: payload.publisher
})

export const fetchRoomInfo = roomId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/rooms/${roomId}`)
    const room = data.roomWithPublisher
    console.log('store room!', room)
    const subscriber = data.subscriber
    dispatch(getRoomInfo({room, subscriber}))
  } catch (err) {
    console.log(err)
  }
}

export const createARoom = () => async dispatch => {
  try {
    console.log('Store called!!!')
    const {data} = await axios.post(`api/rooms/new`)
    const room = data.roomWithPublisher
    const publisher = data.publisher
    dispatch(createNewRoom({room, publisher}))
  } catch (err) {
    console.log(err)
  }
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROOM_INFO:
      return {
        ...state,
        room: action.room,
        subscriber: [...state.subscriber, action.subscriber]
      }
    case CREAT_NEW_ROOM:
      return {...state, room: action.room, publisher: action.publisher}
    default:
      return state
  }
}
export default reducer
