// /* global describe beforeEach it */

const db = require('../../index')
const User = db.model('user')

const codyData = {
  email: 'cody@puppybook.com',
  password: 'bones'
}
let cody

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      beforeEach(async () => {
        cody = await User.create(codyData)
      })

      test('Should return true if the password is correct', () => {
        expect(cody.correctPassword('bones')).toBe(true)
      })

      test('Should return false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).toBe(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')

  describe('classMethods', () => {
    describe('encryptPassword', () => {
      beforeEach(async () => {
        cody = await User.create(codyData)
      })

      test('Should not return the true password', () => {
        expect(cody.password).not.toBe('bones')
      })
    })
  })
}) // end describe('User model')
