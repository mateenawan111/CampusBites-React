import { Link } from 'react-router-dom'
import FoodPhoto from '../components/FoodPhoto.jsx'
import OrderSummary from '../components/OrderSummary.jsx'
import { getStockProblem } from '../rules/cart.js'
import { formatPrice } from '../utils/formatPrice.js'

export default function CartPage({ rows, totals, onChangeQuantity, onRemove }) {
  const hasStockProblem = rows.some(getStockProblem)

  return (
    <section className="container page-section">
      <header className="page-heading">
        <h1>Your cart</h1>
        <p>Review your meals and delivery total.</p>
      </header>

      {rows.length === 0 ? (
        <div className="notice">
          <h2>Your cart is empty</h2>
          <p>Find something you like on the menu and add it to your cart.</p>
          <Link className="button" to="/menu">Browse the menu</Link>
        </div>
      ) : (
        <div className="order-layout">
          <div>
            {hasStockProblem && (
              <p className="form-error notice" role="alert">
                Stock has changed. Adjust or remove the affected meals to continue.
              </p>
            )}

            <ul className="cart-list">
              {rows.map((row) => {
                const { id, item, quantity } = row
                const name = item?.name ?? 'Unavailable saved meal'
                const problem = getStockProblem(row)

                return (
                  <li className="cart-row" key={id}>
                    <FoodPhoto className="cart-photo" src={item?.image} alt="" />
                    <div className="cart-item-info">
                      <h2>{item ? <Link to={`/menu/${id}`}>{name}</Link> : name}</h2>
                      {item && <p>{formatPrice(item.price)} each</p>}
                      {problem && <p className="form-error">{problem}</p>}
                      <div className="quantity-row">
                        <button
                          type="button"
                          aria-label={`Decrease ${name}`}
                          disabled={quantity === 1}
                          onClick={() => onChangeQuantity(id, -1)}
                        >
                          −
                        </button>
                        <output aria-label={`Quantity of ${name}`}>{quantity}</output>
                        <button
                          type="button"
                          aria-label={`Increase ${name}`}
                          disabled={!item || item.stock === 0}
                          onClick={() => onChangeQuantity(id, 1)}
                        >
                          +
                        </button>
                        <button className="remove-button" type="button" onClick={() => onRemove(id)}>
                          Remove<span className="screen-reader-only"> {name}</span>
                        </button>
                        {item && item.stock > 0 && quantity > item.stock && (
                          <button type="button" onClick={() => onChangeQuantity(id, item.stock - quantity)}>
                            Use available quantity
                          </button>
                        )}
                      </div>
                    </div>
                    {item && <strong className="cart-line-total">{formatPrice(item.price * quantity)}</strong>}
                  </li>
                )
              })}
            </ul>
          </div>

          <OrderSummary totals={totals}>
            {hasStockProblem ? (
              <p className="form-error">Fix the stock conflicts to continue to checkout.</p>
            ) : (
              <Link className="button" to="/checkout">Continue to checkout</Link>
            )}
            <Link className="text-link" to="/menu">Keep browsing</Link>
          </OrderSummary>
        </div>
      )}
    </section>
  )
}
