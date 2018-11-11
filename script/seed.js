'use strict'

const db = require('../server/db')
const {User, Room, Message} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  const users = await Promise.all([
    User.create({
      userName: 'mdevenny0',
      email: 'rui@email.com',
      password: '123',
      icon: 'http://dummyimage.com/100x100.jpg/cc0000/ffffff'
    }),
    User.create({
      userName: 'dbettridge1',
      email: 'hello@email.com',
      password: '123',
      icon: 'http://dummyimage.com/100x100.png/dddddd/000000'
    }),
    User.create({
      userName: 'dblunkett2',
      email: 'hlegrand2@telegraph.co.uk',
      password: '2haZlB3kk3Hx',
      icon: 'http://dummyimage.com/100x100.png/cc0000/ffffff'
    }),
    User.create({
      userName: 'bfulton3',
      email: 'wskellon3@globo.com',
      password: 'N1JTGEU1',
      icon: 'http://dummyimage.com/100x100.bmp/dddddd/000000'
    }),
    User.create({
      userName: 'rdemer4',
      email: 'cgunter4@jiathis.com',
      password: 'aJol3V',
      icon: 'http://dummyimage.com/100x100.bmp/cc0000/ffffff'
    }),
    User.create({
      userName: 'sscedall5',
      email: 'ishovelton5@freewebs.com',
      password: 'DcLLH7zZ',
      icon: 'http://dummyimage.com/100x100.jpg/dddddd/000000'
    }),
    User.create({
      userName: 'morudden6',
      email: 'cskevington6@ow.ly',
      password: 'p25HV8YRn',
      icon: 'http://dummyimage.com/100x100.bmp/cc0000/ffffff'
    }),
    User.create({
      userName: 'etowersey7',
      email: 'brymmer7@dyndns.org',
      password: '4boUnCGYtIE',
      icon: 'http://dummyimage.com/100x100.bmp/5fa2dd/ffffff'
    }),
    User.create({
      userName: 'akineton8',
      email: 'kgoldberg8@alibaba.com',
      password: 'Tqmg1iDrh0n',
      icon: 'http://dummyimage.com/100x100.png/ff4444/ffffff'
    }),
    User.create({
      userName: 'rrugieri9',
      email: 'ypearton9@list-manage.com',
      password: '2Lx0XDqXs0',
      icon: 'http://dummyimage.com/100x100.bmp/cc0000/ffffff'
    })
  ])

  const roomData = [
    {
      roomName: `Rio453`,
      roomImg:
        'http://animalsadda.com/wp-content/uploads/2015/03/Grumpy-Cat-5.jpg',
      publisherId: '3'
    },
    {
      roomName: `Jojo123`,
      roomImg:
        'http://media.boingboing.net/wp-content/uploads/2017/03/surprised-cat-04.jpg',
      publisherId: '4'
    }
  ]
  const id = () => Math.round(Math.random() * (users.length - 1)) + 1

  const messagesData = [
    {userId: id(), content: 'I like your vidoes!', roomId: 1},
    {userId: id(), content: 'I like your smile!', roomId: 1},
    {userId: id(), content: 'More videos please!', roomId: 1},
    {userId: id(), content: 'I like streaming!', roomId: 2},
    {userId: id(), content: 'You should learn JavaScript!', roomId: 2},
    {userId: id(), content: 'JavaScript is pretty great!', roomId: 2},
    {userId: id(), content: 'Dogs are great!', roomId: 1},
    {userId: id(), content: 'Cats are also great!', roomId: 2},
    {userId: id(), content: 'Great video!', roomId: 2},
    {userId: id(), content: 'I want to get nice camera!', roomId: 1},
    {userId: id(), content: 'I want to get nice microphone!', roomId: 1}
  ]
  await Room.bulkCreate(roomData)
  await Message.bulkCreate(messagesData)

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${roomData.length} rooms`)
  console.log(`seeded ${messagesData.length} messages`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
