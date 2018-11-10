import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import React, {Component} from 'react'
import {Menu} from 'semantic-ui-react'

export default class MenuExampleBasic extends Component {
  state = {}

  handleItemClick = (e, {name}) => this.setState({activeItem: name})

  render() {
    const {activeItem} = this.state

    return (
      <Menu>
        <Link to="/">
          <Menu.Item
            name="Home"
            active={activeItem === 'Home'}
            onClick={this.handleItemClick}
          >
            Home
          </Menu.Item>
        </Link>
        <Link to="/login">
          <Menu.Item
            name="login"
            active={activeItem === 'login'}
            onClick={this.handleItemClick}
          >
            Reviews
          </Menu.Item>
        </Link>
        <Link to="/signup">
          <Menu.Item
            name="signup"
            active={activeItem === 'signup'}
            onClick={this.handleItemClick}
          >
            Signup
          </Menu.Item>
        </Link>
      </Menu>
    )
  }
}
// const Navbar = ({handleClick, isLoggedIn}) => (
//   <div>
//     <div className="ui text menu">
//       <h1 className="ui center aligned huge header">Dreamr</h1>
//     </div>
//     <div>
//       {isLoggedIn ? (
//         <div>
//           {/* The navbar will show these links after you log in */}
//           <Link className="active item" to="/home">
//             Home
//           </Link>
//           <Link className="item" to="/account">
//             Account
//           </Link>
//           <a className="item" href="#" onClick={handleClick}>
//             Logout
//           </a>
//         </div>
//       ) : (
//         <div>
//           {/* The navbar will show these links before you log in */}
//           <Link className="item" to="/login">
//             Login
//           </Link>
//           <Link className="item" to="/signup">
//             Sign Up
//           </Link>
//         </div>
//       )}
//     </div>
//     <hr />
//   </div>
// )

// /**
//  * CONTAINER
//  */
// const mapState = state => {
//   return {
//     isLoggedIn: !!state.user.id
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleClick() {
//       dispatch(logout())
//     }
//   }
// }

// export default connect(mapState, mapDispatch)(Navbar)

// /**
//  * PROP TYPES
//  */
// Navbar.propTypes = {
//   handleClick: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }
