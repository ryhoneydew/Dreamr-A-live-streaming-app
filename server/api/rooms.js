const router = require('express').Router()
const {Room, User} = require('../db/models')
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
  console.log('--------', req.body)
  opentok.createSession({mediaMode: 'routed'}, async (err, session) => {
    if (err) {
      console.log(err)
      res.status(500).send({error: 'createSession error: ', err})
      return
    }

    const publisher = await User.findById(req.user.id)
    console.log('Heyyyy Publisher', session.id)
    let sessionId = session.sessionId
    req.body.roomName = 'abc'
    req.body.sessionId = sessionId
    try {
      const newRoom = await Room.create(req.body)
      const tokenOptions = {}
      tokenOptions.role = 'publisher'
      tokenOptions.data = `username=${publisher.name}`
      let token = opentok.generateToken(sessionId, tokenOptions)
      console.log('Heyyyy token!', token)
      console.log('Heyyyy user!', req.user.id)
      await publisher.update({token: token, publisherId: req.user.id})
      console.log('Heyyyyyyy publisher!!!!!!', publisher)
      res.send({newRoom, publisher})
    } catch (err) {
      next(err)
    }
  })
})
