export const freeDeliveryMinimum = 1500
export const standardDeliveryFee = 150

export function calculateDelivery(subtotal) {
  if (!Number.isSafeInteger(subtotal) || subtotal < 0) {
    throw new RangeError('Subtotal must be a nonnegative whole number of rupees.')
  }

  return subtotal === 0 || subtotal >= freeDeliveryMinimum ? 0 : standardDeliveryFee
}
