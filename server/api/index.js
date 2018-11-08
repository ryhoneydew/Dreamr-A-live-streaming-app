const router = require('express').Router()
const OpenTok = require('opentok')
module.exports = router

router.use('/users', require('./users'))
router.use('/rooms', require('./rooms'))

router.use('/new', async (req, res, next) => {
  let roomName = "Rui's Room"
  let opentok = new OpenTok(process.env.API_KEY, process.env.API_SECRET)
  opentok.createSession({mediaMode: 'routed'}, function(err, session) {
    if (err) {
      console.log(err)
      res.status(500).send({error: 'createSession error: ', err})
      return
    }
    console.log(session)
    let sessionId = session.sessionId
    // req.body.sessionId = sessionId;

    console.log(sessionId)
    res.send('hi')
  })
})
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
