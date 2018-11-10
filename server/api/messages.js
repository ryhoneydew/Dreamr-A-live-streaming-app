const router = require('express').Router()
const {Message, User} = require('../db/models')
module.exports = router

router.get('/rooms/:roomId', async (req, res, next) => {
  try {
    const messages = await Message.findAll({
      where: {roomId: req.params.roomId},
      include: [
        {
          model: User
        }
      ]
    })
    if (!messages.length) {
      res.status(404).send('Message not found')
    }
    res.json(messages)
  } catch (err) {
    next(err)
  }
})

router.post('/new', async (req, res, next) => {
  try {
    req.body.userId = req.user.id
    const newMsg = await Message.create(req.body)
    const msgWithUser = await Message.findOne({
      where: {id: newMsg.id},
      include: [
        {
          model: User
        }
      ]
    })
    res.json(msgWithUser)
  } catch (err) {
    next(err)
  }
})
