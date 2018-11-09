const router = require('express').Router()
const {Room} = require('../db/models')
const OpenTok = require('opentok')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const rooms = await Room.findAll()
    res.json(rooms)
  } catch (err) {
    next(err)
  }
})

router.get('/:roomId', async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.roomId)
    res.json(room)
  } catch (err) {
    next(err)
  }
})

router.post('/new', (req, res, next) => {
  let opentok = new OpenTok(process.env.API_KEY, process.env.API_SECRET)
  opentok.createSession({mediaMode: 'routed'}, async (err, session) => {
    if (err) {
      console.log(err)
      res.status(500).send({error: 'createSession error: ', err})
      return
    }
    let sessionId = session.sessionId
    req.body.sessionId = sessionId
    try {
      const newRoom = await Room.create(req.body)
      let token = opentok.generateToken(newRoom.sessionId)
      res.send({token, newRoom})
    } catch (err) {
      next(err)
    }
  })
})
