import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMessagesFromServer} from '../../store/messages'
import NewMessage from './new-message'
import styled from 'styled-components'
import SingleMessage from './single-message'

const Header = styled.div`
  color: #4f4114;
  display: flex;
  align-items: center;
  padding-left: 2rem;
  background-color: rgb(245, 188, 87);
  height: 8vh;
  border-top-left-radius: 10px;
`
class MessagesList extends Component {
  async componentDidMount() {
    const theRoomId = this.props.roomId
    await this.props.fetchMessages(theRoomId)
  }

  render() {
    const messages = this.props.messages
    const roomId = this.props.roomId
    return (
      <div className="chat-box">
        <Header>
          <h3>Chat Box</h3>
        </Header>
        {messages.length ? (
          <React.Fragment>
            <ol>
              {messages.map(message => (
                <SingleMessage key={message.id} message={message} />
              ))}
            </ol>
            <NewMessage roomId={roomId} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h4>Be the first one to leave comments here!</h4>
            <NewMessage roomId={roomId} />
          </React.Fragment>
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
