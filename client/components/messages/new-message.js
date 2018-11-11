import React, {Component} from 'react'
import {connect} from 'react-redux'
import {postAMessage} from '../../store/singleMessage'
import styled from 'styled-components'
const Button = styled.button`
  color: #4f4114;
  border: 2px solid rgb(245, 188, 87);
  background: rgb(245, 188, 87);
  font-size: 1em;
  width: 10%;
  height: 8vh;
  padding: 0.25em 1em;
`

const FormArea = styled.form`
  position: fixed;
  bottom: 0px;
  width: 80%;
  height: 8vh;
`

const Input = styled.input`
  height: 100%;
  width: 40%;
  border-color: rgb(245, 188, 87);
  outline: none;
  padding-left: 1rem;
  padding-right: 1rem;
  color: #666;
  font-weight: 400;
`
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
    this.props.writeMessage({
      content: this.state.messageEntry,
      roomId: this.props.roomId
    })
  }
  render() {
    return (
      <FormArea onSubmit={this.handleSubmit}>
        <Input
          type="text"
          name="content"
          value={this.props.messageEntry}
          placeholder="Say something nice..."
          onChange={this.handleChange}
        />

        <Button type="submit">Send</Button>
      </FormArea>
    )
  }
}

const mapState = ({message}) => ({message})
const mapDispatch = dispatch => ({
  writeMessage: (msg, roomId) => dispatch(postAMessage(msg, roomId))
})

export default connect(mapState, mapDispatch)(NewMessage)
