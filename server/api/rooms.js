const router = require('express').Router()
const {Room, User} = require('../db/models')
const OpenTok = require('opentok')
const opentok = new OpenTok(process.env.API_KEY, process.env.API_SECRET)
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
    const subscriber = await User.findById(req.user.id)
    console.log('Heyyy subscriber', subscriber)
    let sessionId = room.sessionId
    let token = opentok.generateToken(sessionId)
    await subscriber.update({subscriberId: req.user.id, token})
    console.log('Update subscriber', subscriber)
    const roomWithPublisher = await Room.findOne({
      where: {
        id: req.params.roomId
      },
      include: [{all: true}]
    })
    console.log('Heyyy roomWithP', roomWithPublisher)
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
      res.send({newRoom, publisher})
    } catch (err) {
      next(err)
    }
  })
})
