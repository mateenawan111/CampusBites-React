import { freeDeliveryMinimum, standardDeliveryFee } from '../rules/delivery.js'
import { formatPrice } from '../utils/formatPrice.js'

export default function OrderSummary({ totals, children, showDeliveryHint = true }) {
  const remaining = freeDeliveryMinimum - totals.subtotal

  return (
    <section className="order-summary" aria-label="Order summary">
      <h2>Order summary</h2>
      <dl>
        <div><dt>Items</dt><dd>{totals.count}</dd></div>
        <div><dt>Subtotal</dt><dd>{formatPrice(totals.subtotal)}</dd></div>
        <div><dt>Delivery</dt><dd>{totals.delivery ? formatPrice(totals.delivery) : 'Free'}</dd></div>
        <div className="summary-total"><dt>Total</dt><dd>{formatPrice(totals.total)}</dd></div>
      </dl>
      {showDeliveryHint && (
        <p className="delivery-hint">
          {remaining > 0
            ? `Add ${formatPrice(remaining)} for free delivery. The standard fee is ${formatPrice(standardDeliveryFee)}.`
            : `Free delivery applies from ${formatPrice(freeDeliveryMinimum)}.`}
        </p>
      )}
      {children}
    </section>
  )
}
