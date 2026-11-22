const numberFormatter = new Intl.NumberFormat('en-PK')

export function formatPrice(amount) {
  return `Rs ${numberFormatter.format(amount)}`
}
