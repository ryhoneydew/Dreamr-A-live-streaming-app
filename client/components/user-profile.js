import React, {Component} from 'react'
import {connect} from 'react-redux'
import StreamingRoom from './streaming-room'
import {createARoom} from '../store/singleRoom'

class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startStreaming: false
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.props.createRoom()
    this.setState({startStreaming: true})
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <button type="submit" onClick={() => this.handleClick()}>
          Start Streaming
        </button>
        {this.state.startStreaming &&
          this.props.singleRoom.room.id && (
            <StreamingRoom
              room={this.props.singleRoom.room}
              publisher={this.props.singleRoom.publisher}
            />
          )}
      </div>
    )
  }
}

const mapState = ({user, singleRoom}) => {
  console.log(singleRoom)
  return {
    user,
    singleRoom
  }
}
const mapDispatch = dispatch => ({
  createRoom: () => dispatch(createARoom())
})
export default connect(mapState, mapDispatch)(UserProfile)
