import React, {Component} from 'react'
import {connect} from 'react-redux'
import {postAMessage} from '../../store/singleMessage'

class NewMessage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messageEntry: ''
    }
  }
  handleChange = evt => {
    this.setState({...this.state, messageEntry: evt.target.value})
  }

  handleSubmit = evt => {
    evt.preventDefault()
    console.log('~~~~~~~', this.state.messageEntry)
    this.props.writeMessage({
      content: this.state.messageEntry,
      roomId: this.props.roomId
    })
  }
  render() {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            value={this.props.messageEntry}
            placeholder="Say something nice..."
            onChange={this.handleChange}
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">
              Send
            </button>
          </span>
        </div>
      </form>
    )
  }
}

const mapState = ({message}) => ({message})
const mapDispatch = dispatch => ({
  writeMessage: (msg, roomId) => dispatch(postAMessage(msg, roomId))
})

export default connect(mapState, mapDispatch)(NewMessage)
