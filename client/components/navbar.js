import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import styled from 'styled-components'

const Title = styled.div`
  font-size: 4rem;
  font-family: 'Exo', sans-serif;
  text-align: center;
  color: #4f4114;
  font-weight: bold;
  width: 100%;
  float: left;
  padding: 1rem 0;
`

const Wrapper = styled.div`
  display: flex;
  background-color: #f4d03f;
  justify-content: center;
  align-items: center;
  height: 13vh;
`
const NavWrapper = styled.div`
  float: right;
  padding: 1rem;
  width: 80%;
`

const Navbar = ({handleClick, isLoggedIn}) => (
  <Wrapper>
    <Title>Dreamr</Title>
    <NavWrapper>
      <Link className="item" to="/home">
        Home
      </Link>
      <Link className="item" to="/account">
        Account
      </Link>

      {isLoggedIn ? (
        <a className="item" href="#" onClick={handleClick}>
          Logout
        </a>
      ) : (
        <React.Fragment>
          <Link className="item" to="/login">
            Login
          </Link>
          <Link className="item" to="/signup">
            Sign Up
          </Link>
        </React.Fragment>
      )}
    </NavWrapper>
  </Wrapper>
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
