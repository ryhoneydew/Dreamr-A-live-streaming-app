import React, {Component} from 'react'
import StreamingRoom from './streaming-room'
import styled from 'styled-components'
import MessagesList from './messages/messages-list'

const LeftSplitWrapper = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  width: 50%;
  position: fixed;
  padding-top: 1.5rem, 1rem;
  left: 0;
`

const RightSplitWrapper = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  width: 50%;
  position: fixed;
  overflow-x: hidden;
  padding: 1.5rem, 1rem;
  right: 0;
`
class NewRoom extends Component {
  state = {}
  render() {
    return (
      <div>
        <LeftSplitWrapper>
          <StreamingRoom />
        </LeftSplitWrapper>
        <RightSplitWrapper>
          <MessagesList />
        </RightSplitWrapper>
      </div>
    )
  }
}

export default NewRoom
