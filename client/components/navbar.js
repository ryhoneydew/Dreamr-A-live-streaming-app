import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="ui large top fixed hidden menu">
    <div className="ui container">
      <h1 className="ui center aligned huge header">Dreamr</h1>
    </div>
    <div>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link className="active item" to="/home">
            Home
          </Link>
          <Link className="item" to="/account">
            Account
          </Link>
          <a className="item" href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link className="item" to="/login">
            Login
          </Link>
          <Link className="item" to="/signup">
            Sign Up
          </Link>
        </div>
      )}
    </div>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
