import React from 'react'
import {OTSession, OTPublisher, OTStreams, OTSubscriber} from 'opentok-react'

const sessionId =
  '1_MX40NjIxNzY2Mn5-MTU0MTcwNzU4NjQxNX4vY1lTK3Y5dnpkU0JZd0p5VHJMQUFhM0d-fg'
const API_KEY = '..46217662'
const token =
  'T1==cGFydG5lcl9pZD00NjIxNzY2MiZzaWc9NjgxMzEwMWNhM2E4NzZlMzgwM2RjNDdlZjZhNWI2ZmI0OTE5NDM0NjpzZXNzaW9uX2lkPTFfTVg0ME5qSXhOelkyTW41LU1UVTBNVGN3TnpVNE5qUXhOWDR2WTFsVEszWTVkbnBrVTBKWmQwcDVWSEpNUVVGaE0wZC1mZyZjcmVhdGVfdGltZT0xNTQxNzA4MDMwJm5vbmNlPTAuNDgyNDA2ODc4OTMzNjc1NzMmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTU0MTcxMTYzMCZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ=='
class Room extends React.Component {
  render() {
    return (
      <OTSession apiKey={API_KEY} sessionId={sessionId} token={token}>
        <OTPublisher />
        <OTStreams>
          <OTSubscriber />
        </OTStreams>
      </OTSession>
    )
  }
}
export default Room
