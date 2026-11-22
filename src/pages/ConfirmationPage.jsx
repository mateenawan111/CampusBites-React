import { Link } from 'react-router-dom'
import OrderSummary from '../components/OrderSummary.jsx'
import { formatPrice } from '../utils/formatPrice.js'

export default function ConfirmationPage({ order }) {
  return (
    <section className="container page-section">
      {!order ? (
        <>
          <h1>No order to show</h1>
          <p>Complete checkout to get a simulated order reference.</p>
          <Link className="button" to="/menu">Browse the menu</Link>
        </>
      ) : (
        <>
          <header className="page-heading">
            <h1>Order confirmed</h1>
            <p>This demonstration order is complete. Reference <strong>{order.reference}</strong>.</p>
          </header>
          <div className="order-layout">
            <section className="notice">
              <h2>Ordered meals</h2>
              <ul className="confirmation-items">
                {order.items.map((item) => (
                  <li key={item.id}>
                    <span>{item.quantity} × {item.name}</span>
                    <strong>{formatPrice(item.price * item.quantity)}</strong>
                  </li>
                ))}
              </ul>
            </section>

            <OrderSummary totals={order.totals} showDeliveryHint={false}>
              <Link className="button" to="/menu">Back to menu</Link>
            </OrderSummary>
          </div>
        </>
      )}
    </section>
  )
}
