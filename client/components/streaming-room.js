import React from 'react'
import {OTSession, OTPublisher, OTStreams, OTSubscriber} from 'opentok-react'

// const sessionId =
//   '1_MX40NjIxNzY2Mn5-MTU0MTcyNzQ2MDk2OH5GdEZXVWJnV2RLd2hSTjhEeisyZ2hPWEZ-fg'
// const API_KEY = process.env.API_KEY
// const token =
//   'T1==cGFydG5lcl9pZD00NjIxNzY2MiZzaWc9YmUwNGJhNTMzMzliNDNjOWE4YzJkNmVlM2JmOTYwYWE1NzU4NGM3MjpzZXNzaW9uX2lkPTFfTVg0ME5qSXhOelkyTW41LU1UVTBNVGN5TnpRMk1EazJPSDVHZEVaWFZXSm5WMlJMZDJoU1RqaEVlaXN5WjJoUFdFWi1mZyZjcmVhdGVfdGltZT0xNTQxNzI3NTE0Jm5vbmNlPTAuMjAyOTI4MTU4MTAwNTg5Mjgmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTU0MTczMTExMyZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ=='
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
    const {room, publisher} = this.props
    const {error, connection, publishVideo} = this.state
    return (
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
          token={publisher.token}
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
      </div>
    )
  }
  //   constructor(props) {
  //     super(props)

  //     this.state = {
  //       error: null,
  //       connection: 'Connecting',
  //       publishVideo: true
  //     }
  //     // this.publisherProperties = {
  //     //   audioFallbackEnabled: false,
  //     //   showControls: false
  //     // }
  //     this.sessionEventHandlers = {
  //       sessionConnected: () => {
  //         this.setState({connection: 'Connected'})
  //       },
  //       sessionDisconnected: () => {
  //         this.setState({connection: 'Disconnected'})
  //       },
  //       sessionReconnected: () => {
  //         this.setState({connection: 'Reconnected'})
  //       },
  //       sessionReconnecting: () => {
  //         this.setState({connection: 'Reconnecting'})
  //       }
  //     }

  //     this.publisherEventHandlers = {
  //       accessDenied: () => {
  //         console.log('User denied access to media source')
  //       },
  //       streamCreated: event => {
  //         console.log('Publisher stream created!')
  //       },
  //       streamDestroyed: event => {
  //         console.log('Publisher stream destroyed!')
  //       }
  //     }
  //     // this.subscriberProperties = {
  //     //   preferredFrameRate: 15,
  //     //   showControls: false
  //     // }

  //     this.subscriberEventHandlers = {
  //       videoDisabled: event => {
  //         console.log('Subscriber video disabled!')
  //       },
  //       videoEnabled: event => {
  //         console.log('Subscriber video enabled!')
  //       }
  //     }
  //   }
  //   onSessionError = error => {
  //     this.setState({error})
  //   }

  //   onPublish = () => {
  //     console.log('Publish Success')
  //   }

  //   onPublishError = error => {
  //     this.setState({error})
  //   }

  //   onSubscribe = () => {
  //     console.log('Subscribe Success')
  //   }

  //   onSubscribeError = error => {
  //     this.setState({error})
  //   }

  //   toggleVideo = () => {
  //     this.setState({publishVideo: !this.state.publishVideo})
  //   }

  //   render() {
  //     console.log(this.props)
  //     const {room, publisher} = this.props
  //     return (
  //       room.id && (
  //         <div>
  //           <OTSession
  //             apiKey="46217662"
  //             sessionId={room.sessionId}
  //             token={publisher.token}
  //             onError={this.onSessionError}
  //             eventHandlers={this.sessionEventHandlers}
  //           >
  //             <OTPublisher
  //               properties={this.state.publishVideo}
  //               eventHandlers={this.publisherEventHandlers}
  //               onError={this.onPublishError}
  //             />
  //             <OTStreams>
  //               <OTSubscriber eventHandlers={this.subscriberEventHandlers} />
  //             </OTStreams>
  //           </OTSession>
  //           <button type="submit" onClick={this.toggleVidoe}>
  //             {this.state.publishVideo ? 'Stop' : 'Resume'} Streaming
  //           </button>
  //         </div>
  //       )
  //     )
  //   }
}
export default StreamingRoom
