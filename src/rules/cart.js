import { calculateDelivery } from './delivery.js'

const cartKey = 'campusbites-cart-v1'

export function readCart() {
  try {
    const stored = JSON.parse(localStorage.getItem(cartKey) ?? '[]')
    if (!Array.isArray(stored)) return []

    const seen = new Set()
    return stored.filter((line) => {
      if (
        !line ||
        typeof line.id !== 'string' ||
        seen.has(line.id) ||
        !Number.isInteger(line.quantity) ||
        line.quantity < 1 ||
        line.quantity > 1000
      ) {
        return false
      }

      seen.add(line.id)
      return true
    })
  } catch {
    return []
  }
}

export function saveCart(cart) {
  try {
    localStorage.setItem(cartKey, JSON.stringify(cart))
  } catch {
    // Keep the cart usable in memory when the browser blocks storage.
  }
}

export function getCartRows(cart, items) {
  return cart.map((line) => ({
    ...line,
    item: items.find((item) => item.id === line.id),
  }))
}

export function getStockProblem(row) {
  if (!row.item) return 'This saved meal is no longer on the menu.'
  if (row.item.stock === 0) return `${row.item.name} is sold out.`
  if (row.quantity > row.item.stock) return `Only ${row.item.stock} available for ${row.item.name}.`
  return ''
}

export function getOrderTotals(rows) {
  const count = rows.reduce((sum, row) => sum + row.quantity, 0)
  const subtotal = rows.reduce((sum, row) => sum + (row.item?.price ?? 0) * row.quantity, 0)
  const delivery = calculateDelivery(subtotal)

  return { count, subtotal, delivery, total: subtotal + delivery }
}

export function updateCartQuantity(cart, id, change, item) {
  const previousQuantity = cart.find((line) => line.id === id)?.quantity ?? 0
  const quantity = previousQuantity + change

  if (change > 0) {
    const problem = getStockProblem({ item, quantity })
    if (problem) return { cart, message: problem, error: true }
  }

  const nextCart = quantity <= 0
    ? cart.filter((line) => line.id !== id)
    : previousQuantity
      ? cart.map((line) => line.id === id ? { ...line, quantity } : line)
      : [...cart, { id, quantity }]

  const name = item?.name ?? 'Saved meal'
  const message = quantity <= 0 ? `${name} removed.` : `${name} · ${quantity} in your cart.`
  return { cart: nextCart, message, error: false }
}
