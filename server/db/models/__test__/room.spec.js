const db = require('../../index')
const Room = db.model('room')

describe('Room model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
})
