import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OrderSummary from '../components/OrderSummary.jsx'
import { getStockProblem } from '../rules/cart.js'
import { validateCheckout } from '../rules/checkout.js'

export default function CheckoutPage({ rows, totals, details, onChangeDetails, onPlaceOrder }) {
  const navigate = useNavigate()
  const form = useRef(null)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const errors = submitted ? validateCheckout(details) : {}
  const stockProblem = rows.some(getStockProblem)
  const conflictingItems = details.vegetarianOnly
    ? rows.filter((row) => row.item?.vegetarian === false).map((row) => row.item.name)
    : []

  function handleSubmit(event) {
    event.preventDefault()
    const invalidField = Object.keys(validateCheckout(details))[0]
    setSubmitted(true)

    if (invalidField) {
      form.current.elements.namedItem(invalidField)?.focus()
      return
    }

    if (stockProblem || conflictingItems.length) {
      setSubmitError('Fix the cart conflict before placing your order.')
      return
    }

    if (onPlaceOrder()) navigate('/confirmation', { replace: true })
    else setSubmitError('The order could not be placed. Review the cart and try again.')
  }

  function updateField(event) {
    const { name, type, value, checked } = event.target
    setSubmitError('')
    onChangeDetails(name, type === 'checkbox' ? checked : value)
  }

  function fieldProps(name) {
    return {
      id: name,
      name,
      value: details[name],
      onChange: updateField,
      'aria-invalid': Boolean(errors[name]),
      'aria-describedby': errors[name] ? `${name}-error` : undefined,
    }
  }

  function fieldError(name) {
    return errors[name] && <p className="form-error" id={`${name}-error`}>{errors[name]}</p>
  }

  return (
    <section className="container page-section">
      <header className="page-heading">
        <h1>Checkout</h1>
        <p>Delivery in H-11 and nearby hostels, Islamabad. This is a simulated order.</p>
      </header>

      {rows.length === 0 ? (
        <div className="notice">
          <h2>Your cart is empty</h2>
          <p>Add a meal before entering delivery details.</p>
          <Link className="button" to="/menu">Browse the menu</Link>
        </div>
      ) : (
        <div className="order-layout">
          <form className="checkout-form" ref={form} onSubmit={handleSubmit} noValidate>
            <h2>Delivery details</h2>
            <div>
              <label htmlFor="name">Full name</label>
              <input {...fieldProps('name')} autoComplete="name" required />
              {fieldError('name')}
            </div>
            <div>
              <label htmlFor="phone">Pakistani mobile number</label>
              <input {...fieldProps('phone')} type="tel" autoComplete="tel" placeholder="0300 1234567" required />
              {fieldError('phone')}
            </div>
            <div>
              <label htmlFor="address">Delivery address</label>
              <textarea
                {...fieldProps('address')}
                autoComplete="street-address"
                placeholder="Building or hostel, room or flat, sector"
                rows={3}
                required
              />
              {fieldError('address')}
            </div>
            <div>
              <label htmlFor="notes">Delivery notes <span>(optional)</span></label>
              <textarea {...fieldProps('notes')} rows={2} />
              {fieldError('notes')}
            </div>
            <label className="checkbox-label">
              <input name="vegetarianOnly" type="checkbox" checked={details.vegetarianOnly} onChange={updateField} />
              Vegetarian-only order
            </label>
            {conflictingItems.length > 0 && (
              <p className="form-error" role="alert">
                Remove {conflictingItems.join(', ')} on the <Link to="/cart">cart page</Link> or clear
                the vegetarian-only preference.
              </p>
            )}
            {stockProblem && (
              <p className="form-error" role="alert">
                Stock has changed. <Link to="/cart">Review your cart</Link> to adjust affected meals.
              </p>
            )}
            {submitError && <p className="form-error" role="alert">{submitError}</p>}
            <button className="button" type="submit">Place simulated order</button>
          </form>

          <OrderSummary totals={totals}>
            <Link className="text-link" to="/cart">Edit cart</Link>
          </OrderSummary>
        </div>
      )}
    </section>
  )
}
