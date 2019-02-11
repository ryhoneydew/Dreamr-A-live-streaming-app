'use strict'
/* global describe beforeEach it */

const seed = require('./seed')

describe('seed script', () => {
  test('', async () => {
    await expect(seed).not.toThrow()
  })
})
