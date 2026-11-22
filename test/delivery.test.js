import assert from 'node:assert/strict'
import { test } from 'node:test'
import { calculateDelivery } from '../src/rules/delivery.js'

test('a normal order below Rs 1,500 pays Rs 150 for delivery', () => {
  assert.equal(calculateDelivery(950), 150)
})

test('delivery becomes free at exactly Rs 1,500', () => {
  assert.equal(calculateDelivery(1499), 150)
  assert.equal(calculateDelivery(1500), 0)
  assert.equal(calculateDelivery(1501), 0)
})

test('invalid subtotals cannot produce a delivery price', () => {
  for (const subtotal of [-1, NaN, Infinity, 750.25, '1500']) {
    assert.throws(() => calculateDelivery(subtotal), RangeError)
  }
})
