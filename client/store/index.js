import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import singleRoom from './singleRoom'
import singleMessage from './singleMessage'
import messages from './messages'
import rooms from './rooms'

const reducer = combineReducers({
  user,
  singleRoom,
  singleMessage,
  messages,
  rooms
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
