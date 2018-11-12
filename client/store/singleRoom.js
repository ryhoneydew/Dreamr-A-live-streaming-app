import axios from 'axios'
import {updateRooms} from './rooms'

const GET_ROOM_INFO = 'GET_ROOM_INFO'
const CREAT_NEW_ROOM = 'CREAT_NEW_ROOM'
const UPDATE_ROOM_INFO = 'UPDATE_ROOM_INFO'

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

const updateRoom = room => ({
  type: UPDATE_ROOM_INFO,
  room
})

export const fetchRoomInfo = roomId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/rooms/${roomId}`)
    const room = data.roomWithPublisher
    const subscriber = data.subscriber
    console.log('heyyyyy!', subscriber)
    dispatch(getRoomInfo({room, subscriber}))
  } catch (err) {
    console.log(err)
  }
}

export const createARoom = () => async dispatch => {
  try {
    const {data} = await axios.post(`/api/rooms/new`)
    const room = data.roomWithPublisher
    const publisher = data.publisher
    dispatch(updateRooms(room))
    dispatch(createNewRoom({room, publisher}))
  } catch (err) {
    console.log(err)
  }
}

export const udpateRoomStreamingStatus = roomId => async dispatch => {
  try {
    const {data} = await axios.put(`/api/rooms/${roomId}`, {isStreaming: false})
    console.log('update room in store', data.room)
    const room = data.room
    dispatch(updateRoom(room))
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

    case UPDATE_ROOM_INFO:
      return {...state, room: action.room}
    default:
      return state
  }
}
export default reducer
