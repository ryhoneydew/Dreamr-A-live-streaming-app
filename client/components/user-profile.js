import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createARoom} from '../store/singleRoom'
import {Link} from 'react-router-dom'
import styled, {ThemeProvider} from 'styled-components'

const Button = styled.button`
  color: ${props => props.theme.fg};
  border: 2px solid ${props => props.theme.fg};
  background: ${props => props.theme.bg};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
`

// Define our `fg` and `bg` on the theme
const theme = {
  fg: 'black',
  bg: 'white'
}

// This theme swaps `fg` and `bg`
const invertTheme = ({fg, bg}) => ({
  fg: bg,
  bg: fg
})
const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
`

class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startStreaming: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  async handleClick() {
    await this.props.createRoom()
    this.setState({startStreaming: true})
  }
  render() {
    console.log(this.props)
    return (
      <ThemeProvider theme={theme}>
        <ButtonGroup>
          <Button type="submit" onClick={() => this.handleClick()}>
            Start Streaming
          </Button>
          {this.props.singleRoom.room.id && this.state.startStreaming ? (
            <Link to={`/room/${this.props.singleRoom.room.id}`}>
              <ThemeProvider theme={invertTheme}>
                <Button type="submit" theme={invertTheme}>
                  Your room is ready!
                </Button>
              </ThemeProvider>
            </Link>
          ) : null}
        </ButtonGroup>
      </ThemeProvider>
    )
  }
}

const mapState = ({user, singleRoom}) => ({
  user,
  singleRoom
})

const mapDispatch = dispatch => ({
  createRoom: () => dispatch(createARoom())
})
export default connect(mapState, mapDispatch)(UserProfile)

// {this.state.startStreaming &&
// this.props.singleRoom.room.id && (
//     <StreamingRoom
//       room={this.props.singleRoom.room}
//       publisher={this.props.singleRoom.publisher}
//     />
//   )}
//<Link to={`/room/${this.props.singleRoom.room.id}`} />
