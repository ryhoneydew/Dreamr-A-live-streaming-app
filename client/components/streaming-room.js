import React from 'react'
import {OTSession, OTPublisher, OTStreams, OTSubscriber} from 'opentok-react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchRoomInfo} from '../store/singleRoom'

class StreamingRoom extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      connection: 'Connecting',
      publishVideo: true
    }

    this.sessionEventHandlers = {
      sessionConnected: () => {
        this.setState({connection: 'Connected'})
      },
      sessionDisconnected: () => {
        this.setState({connection: 'Disconnected'})
      },
      sessionReconnected: () => {
        this.setState({connection: 'Reconnected'})
      },
      sessionReconnecting: () => {
        this.setState({connection: 'Reconnecting'})
      }
    }

    this.publisherEventHandlers = {
      accessDenied: () => {
        console.log('User denied access to media source')
      },
      streamCreated: () => {
        console.log('Publisher stream created')
      },
      streamDestroyed: ({reason}) => {
        console.log(`Publisher stream destroyed because: ${reason}`)
      }
    }

    this.subscriberEventHandlers = {
      videoEnabled: () => {
        console.log('Subscriber video enabled')
      },
      videoDisabled: () => {
        console.log('Subscriber video disabled')
      }
    }
  }
  async componentDidMount() {
    const roomId = this.props.match.params.roomId
    await this.props.fetchTheRoom(roomId)
  }
  onSessionError = error => {
    this.setState({error})
  }

  onPublish = () => {
    console.log('Publish Success')
  }

  onPublishError = error => {
    this.setState({error})
  }

  onSubscribe = () => {
    console.log('Subscribe Success')
  }

  onSubscribeError = error => {
    this.setState({error})
  }

  toggleVideo = () => {
    this.setState({publishVideo: !this.state.publishVideo})
  }

  render() {
    const room = this.props.singleRoom.room

    const {error, connection, publishVideo} = this.state
    return (
      !!room.id && (
        <div>
          <div id="sessionStatus">Session Status: {connection}</div>
          {error ? (
            <div className="error">
              <strong>Error:</strong> {error}
            </div>
          ) : null}
          <OTSession
            apiKey="46217662"
            sessionId={room.sessionId}
            token={room.publisher.token}
            onError={this.onSessionError}
            eventHandlers={this.sessionEventHandlers}
          >
            <OTPublisher
              properties={{publishVideo}}
              onPublish={this.onPublish}
              onError={this.onPublishError}
              eventHandlers={this.publisherEventHandlers}
            />
            <OTStreams>
              <OTSubscriber
                onSubscribe={this.onSubscribe}
                onError={this.onSubscribeError}
                eventHandlers={this.subscriberEventHandlers}
              />
            </OTStreams>
          </OTSession>
          <button id="videoButton" type="submit" onClick={this.toggleVideo}>
            {publishVideo ? 'Disable' : 'Enable'} Video
          </button>
          <h2>New viewer:1</h2>
        </div>
      )
    )
  }
}

const mapState = ({user, singleRoom}) => ({
  user,
  singleRoom
})
const mapProps = dispatch => ({
  fetchTheRoom: roomId => dispatch(fetchRoomInfo(roomId))
})
export default withRouter(connect(mapState, mapProps)(StreamingRoom))
