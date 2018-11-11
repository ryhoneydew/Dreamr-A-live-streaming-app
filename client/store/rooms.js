import axios from 'axios'

const GET_ALL_ROOMS = 'GET_ALL_ROOMS'
const UPDATE_ROOMS = 'UPDATE_ROOMS'

const getAllRooms = rooms => ({
  type: GET_ALL_ROOMS,
  rooms
})

export const updateRooms = room => ({
  type: UPDATE_ROOMS,
  room
})

export const fetchRoomsFromServer = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/rooms')
    const rooms = data
    dispatch(getAllRooms(rooms))
  } catch (err) {
    console.log(err)
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_ROOMS:
      return action.rooms
    case UPDATE_ROOMS:
      return [...state, action.room]
    default:
      return state
  }
}

export default reducer
