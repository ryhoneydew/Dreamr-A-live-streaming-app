import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import UserProfile from './user-profile'
import styled from 'styled-components'
import RoomsList from './rooms-list'

/**
 * COMPONENT
 */

const Welcome = styled.h3`
  text-align: center;
`

export const UserHome = props => {
  const {email} = props

  return (
    <React.Fragment>
      <Welcome>Welcome, {email}</Welcome>
      <hr />
      <UserProfile />
      <RoomsList />
    </React.Fragment>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
