import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createARoom} from '../store/singleRoom'
import {Link} from 'react-router-dom'
//import StreamingRoom from './streaming-room'

class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startStreaming: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  async handleClick() {
    await this.props.createRoom()
    console.log('!!! async', this.props)
    this.setState({startStreaming: true})
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <h1>hiiiiii</h1>
        <button type="submit" onClick={() => this.handleClick()}>
          Start Streaming
        </button>
        {this.props.singleRoom.room.id && this.state.startStreaming ? (
          <Link to={`/room/${this.props.singleRoom.room.id}`}>
            <button type="submit">Your room is ready!</button>
          </Link>
        ) : null}
      </div>
    )
  }
}

const mapState = ({user, singleRoom}) => ({
  user,
  singleRoom
})

const mapDispatch = dispatch => ({
  createRoom: () => dispatch(createARoom())
})
export default connect(mapState, mapDispatch)(UserProfile)

// {this.state.startStreaming &&
// this.props.singleRoom.room.id && (
//     <StreamingRoom
//       room={this.props.singleRoom.room}
//       publisher={this.props.singleRoom.publisher}
//     />
//   )}
//<Link to={`/room/${this.props.singleRoom.room.id}`} />
