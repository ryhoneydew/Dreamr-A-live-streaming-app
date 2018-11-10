import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMessagesFromServer} from '../../store/messages'
import NewMessage from './new-message'

const getUserName = email => {
  const idx = email.indexOf('@')
  return email.slice(0, idx)
}

const theRoomId = 1
class MessagesList extends Component {
  async componentDidMount() {
    await this.props.fetchMessages(theRoomId)
  }

  render() {
    const messages = this.props.messages
    console.log(messages)
    return (
      <div>
        <h1>See What did people say:</h1>
        {messages.length ? (
          <div>
            <ul>
              {messages.map(message => {
                console.log(message)
                return (
                  <li key={message.id}>
                    {message.content}
                    <span>{getUserName(message.user.email)}</span>
                  </li>
                )
              })}
            </ul>
            <NewMessage roomId={theRoomId} />
          </div>
        ) : (
          <h4>Be the first one to leave comments here!</h4>
        )}
      </div>
    )
  }
}

const mapState = ({messages}) => ({messages})
const mapDispatch = dispatch => ({
  fetchMessages: roomId => dispatch(fetchMessagesFromServer(roomId))
})
export default connect(mapState, mapDispatch)(MessagesList)
