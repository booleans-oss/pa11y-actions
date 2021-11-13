import {expect, test, describe} from '@jest/globals'
import pa11y from 'pa11y'
import {wait} from '../src/wait'


describe('pa11y tests', () => {
  test('pa11y on sample web app', async () => {
    const results = await pa11y('https://dev-community.tech');
    expect(results.issues.length).toBeGreaterThan(0)
  })
})

describe('wait function tests', () => {
  test('throws invalid number', async () => {
    const input = parseInt('foo', 10)
    await expect(wait(input)).rejects.toThrow('milliseconds not a number')
  })
  
  test('wait 500 ms', async () => {
    const start = new Date()
    await wait(500)
    const end = new Date()
    var delta = Math.abs(end.getTime() - start.getTime())
    expect(delta).toBeGreaterThan(450)
  })
})