import React from 'react'
import {OTSession, OTPublisher, OTStreams, OTSubscriber} from 'opentok-react'

const sessionId =
  '1_MX40NjIxNzY2Mn5-MTU0MTcyNzQ2MDk2OH5GdEZXVWJnV2RLd2hSTjhEeisyZ2hPWEZ-fg'
const API_KEY = process.env.API_KEY
const token =
  'T1==cGFydG5lcl9pZD00NjIxNzY2MiZzaWc9YmUwNGJhNTMzMzliNDNjOWE4YzJkNmVlM2JmOTYwYWE1NzU4NGM3MjpzZXNzaW9uX2lkPTFfTVg0ME5qSXhOelkyTW41LU1UVTBNVGN5TnpRMk1EazJPSDVHZEVaWFZXSm5WMlJMZDJoU1RqaEVlaXN5WjJoUFdFWi1mZyZjcmVhdGVfdGltZT0xNTQxNzI3NTE0Jm5vbmNlPTAuMjAyOTI4MTU4MTAwNTg5Mjgmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTU0MTczMTExMyZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ=='
class Room extends React.Component {
  constructor(props) {
    super(props)
    // this.publisherProperties = {
    //   audioFallbackEnabled: false,
    //   showControls: false
    // }

    this.publisherEventHandlers = {
      streamCreated: event => {
        console.log('Publisher stream created!')
      },
      streamDestroyed: event => {
        console.log('Publisher stream destroyed!')
      }
    }
    // this.subscriberProperties = {
    //   preferredFrameRate: 15,
    //   showControls: false
    // }

    this.subscriberEventHandlers = {
      videoDisabled: event => {
        console.log('Subscriber video disabled!')
      },
      videoEnabled: event => {
        console.log('Subscriber video enabled!')
      }
    }
  }

  render() {
    return (
      <OTSession apiKey="46217662" sessionId={sessionId} token={token}>
        <OTPublisher eventHandlers={this.publisherEventHandlers} />
        <OTStreams>
          <OTSubscriber eventHandlers={this.subscriberEventHandlers} />
        </OTStreams>
      </OTSession>
    )
  }
}
export default Room

// return (
//     <OTSession apiKey={API_KEY} sessionId={sessionId} token={token}>
//       <OTPublisher />
//       <OTStreams>
//         <OTSubscriber />
//       </OTStreams>
//     </OTSession>
//   )
// }
