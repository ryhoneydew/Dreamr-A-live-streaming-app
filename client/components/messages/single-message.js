import React from 'react'
import styled from 'styled-components'
const getUserName = email => {
  const idx = email.indexOf('@')
  return email.slice(0, idx)
}

const OtherMessage = styled.li`
  /* border-top-left-radius: 0px;
  box-shadow: -1px 2px 0px #d4d4d4; */
`
const Msg = styled.div`
  border: 1px solid #dedede;
  background-color: #f1f1f1;
  border-radius: 10px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  min-width: 30vw;
  border-radius: 2px;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.07);
`
const SingleMessage = props => {
  const message = props.message
  return (
    <OtherMessage>
      <Msg>
        <p>
          {getUserName(message.user.email)}: {message.content}
        </p>
      </Msg>
    </OtherMessage>
  )
}

export default SingleMessage
