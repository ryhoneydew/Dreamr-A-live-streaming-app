const router = require('express').Router()
const {Room, User} = require('../db/models')
const OpenTok = require('opentok')
const opentok = new OpenTok(process.env.API_KEY, process.env.API_SECRET)
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const rooms = await Room.findAll({include: [{all: true}]})
    res.json(rooms)
  } catch (err) {
    next(err)
  }
})

router.get('/:roomId', async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.roomId)
    let sessionId = room.sessionId
    let subscriber
    if (room.publisherId !== req.user.id) {
      const publisher = await User.findById(room.publisherId)
      subscriber = await User.findById(req.user.id)
      const tokenOptions = {}
      tokenOptions.role = 'subscriber'
      tokenOptions.data = 'username=bob'
      let token = opentok.generateToken(sessionId, tokenOptions)
      await publisher.update({subscriberId: req.user.id})
      await subscriber.update({token})
    } 
    const roomWithPublisher = await Room.findOne({
      where: {
        id: req.params.roomId
      },
      include: [{all: true}]
    })

    res.json({roomWithPublisher, subscriber})
  } catch (err) {
    next(err)
  }
})

router.post('/new', (req, res, next) => {
  opentok.createSession({mediaMode: 'routed'}, async (err, session) => {
    if (err) {
      console.log(err)
      res.status(500).send({error: 'createSession error: ', err})
      return
    }

    const publisher = await User.findById(req.user.id)
    let sessionId = session.sessionId
    req.body.roomName = 'abc'
    req.body.sessionId = sessionId
    req.body.publisherId = req.user.id
    try {
      const newRoom = await Room.create(req.body)
      const tokenOptions = {}
      tokenOptions.role = 'publisher'
      tokenOptions.data = `username=${publisher.name}`
      let token = opentok.generateToken(sessionId, tokenOptions)
      await publisher.update({token: token})
      const roomWithPublisher = await Room.findOne({
        where: {
          id: newRoom.id
        },
        include: [{all: true}]
      })
      res.send({roomWithPublisher, publisher})
    } catch (err) {
      next(err)
    }
  })
})
