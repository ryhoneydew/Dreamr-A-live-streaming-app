import React from 'react'
import {OTSession, OTPublisher, OTStreams, OTSubscriber} from 'opentok-react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {fetchRoomInfo, udpateRoomStreamingStatus} from '../store/singleRoom'
import styled from 'styled-components'

const Button = styled.button`
  color: black;
  border: 2px solid black;
  background-color: white;
  font-size: 1em;
  margin: 0.4rem;
  padding: 0.25em 1em;
  border-radius: 3px;
  z-index: 1;
`
const StreamingWrapper = styled.div`
  padding-left: 2rem;
  padding-top: 1.5rem;
  text-align: center;
`
class StreamingRoom extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      connection: 'Connecting',
      publishVideo: true,
      subscriberVideo: false
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

    this.publisherOptions = {
      insertMode: 'append',
      width: '500px',
      height: '400px'
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

  togglePublisherVideo = () => {
    this.setState({publishVideo: !this.state.publishVideo})
  }

  leftRoom = () => {
    this.setState({publishVideo: false})

    this.props.disableRoom(this.props.singleRoom.room.id)
  }
  toggleSubscriberVideo = () => {
    this.setState({subscriberVideo: !this.state.subscriberVideo})
  }

  render() {
    const room = this.props.singleRoom.room
    const {error, connection, publishVideo, subscriberVideo} = this.state

    const subscriberOptions = {
      insertMode: 'append',
      width: '100px',
      height: '100px',
      subscribeToVideo: this.state.subscriberVideo || false
    }
    return (
      !!room.id && (
        <StreamingWrapper>
          <h3>Steaming Status: {connection}</h3>

          {this.props.user.id === room.publisherId ? (
            <React.Fragment>
              <Button
                id="videoButton"
                type="submit"
                onClick={this.togglePublisherVideo}
              >
                {publishVideo ? 'Disable' : 'Enable'} Video
              </Button>
              <Button
                id="videoButton"
                type="submit"
                onClick={this.toggleSubscriberVideo}
              >
                {subscriberVideo ? `Don't Show` : 'Show'} Subscriber's Video
              </Button>
              <Link to="/home">
                <Button type="submit" onClick={this.leftRoom}>
                  Leave the Room
                </Button>
              </Link>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Button
                id="videoButton"
                type="submit"
                onClick={this.toggleSubscriberVideo}
              >
                {subscriberVideo ? `Don't Show My` : 'Show My Own'} Video
              </Button>
              <Link to="/home">
                <Button type="submit">Leave the Room</Button>
              </Link>
            </React.Fragment>
          )}

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
              properties={{publishVideo, ...this.publisherOptions}}
              onPublish={this.onPublish}
              onError={this.onPublishError}
              eventHandlers={this.publisherEventHandlers}
            />
            <OTStreams>
              <OTSubscriber
                properties={subscriberOptions}
                onSubscribe={this.onSubscribe}
                onError={this.onSubscribeError}
                eventHandlers={this.subscriberEventHandlers}
              />
            </OTStreams>
          </OTSession>
        </StreamingWrapper>
      )
    )
  }
}

const mapState = ({user, singleRoom}) => ({
  user,
  singleRoom
})
const mapProps = dispatch => ({
  fetchTheRoom: roomId => dispatch(fetchRoomInfo(roomId)),
  disableRoom: roomId => dispatch(udpateRoomStreamingStatus(roomId))
})
export default withRouter(connect(mapState, mapProps)(StreamingRoom))
