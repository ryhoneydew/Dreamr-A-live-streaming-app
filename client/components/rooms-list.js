import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {fetchRoomsFromServer} from '../store/rooms'
import {Link} from 'react-router-dom'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
const Welcome = styled.h3`
  text-align: center;
`
const Section = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 25vw;
  height: auto;
  background-color: #f9f9de;
  padding: 0.01em 16px;
  margin: 1.5rem;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
`
class RoomsList extends Component {
  async componentDidMount() {
    await this.props.fetchRooms()
  }
  render() {
    return (
      <React.Fragment>
        <Welcome> What is happening</Welcome>
        <hr />
        <Wrapper>
          {this.props.rooms.length &&
            this.props.rooms.map(room => (
              <Link key={room.id} to={`/room/${room.id}`}>
                <Section>
                  <h6>
                    Room: {room.id} By:{room.publisher.email}
                  </h6>

                  <img className="section-img" src={room.roomImg} />
                </Section>
              </Link>
            ))}
        </Wrapper>
      </React.Fragment>
    )
  }
}

const mapState = ({rooms}) => ({rooms})
const mapDispatch = dispatch => ({
  fetchRooms: () => dispatch(fetchRoomsFromServer())
})
export default connect(mapState, mapDispatch)(RoomsList)
