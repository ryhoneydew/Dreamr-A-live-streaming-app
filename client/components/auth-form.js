import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  margin: 5% auto;
  width: 40vw;
  height: 40vh;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
`

const LeftSide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  box-sizing: border-box;
  background-color: #f4d03f;
  padding: 2rem;
  width: 50%;
  height: 100%;
`

const Button = styled.button`
  color: black;
  border: 2px solid black;
  background-color: white;
  font-size: 1em;
  margin-left: 2.1rem;
  margin-top: 0.5rem;
  padding: 0.25em 1em;
  border-radius: 3px;
  z-index: 1;
  text-align: center;
`

const Or = styled.div`
  position: absolute;
  left: 66%;
  margin-left: -100px;
  width: 40px;
  height: 40px;
  background: #ddd;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  line-height: 40px;
  text-align: center;
  z-index: 10;
`

const RightSide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 50%;
  left: 20%;
`
/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <React.Fragment>
      <FormContainer>
        <LeftSide>
          <form onSubmit={handleSubmit} name={name}>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />

            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />

            <Button type="submit">{displayName}</Button>

            {error && error.response && <div> {error.response.data} </div>}
          </form>
        </LeftSide>
        <Or>OR</Or>
        <RightSide>
          <Link to="/auth/google">
            <Button>{displayName} with Google</Button>
          </Link>
        </RightSide>
      </FormContainer>
    </React.Fragment>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
