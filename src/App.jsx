import { useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import MenuStatus from './components/MenuStatus.jsx'
import CartPage from './pages/CartPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import ConfirmationPage from './pages/ConfirmationPage.jsx'
import FoodDetailsPage from './pages/FoodDetailsPage.jsx'
import HomePage from './pages/HomePage.jsx'
import MenuPage from './pages/MenuPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { getCartRows, getOrderTotals, getStockProblem, readCart, saveCart, updateCartQuantity } from './rules/cart.js'
import { emptyDetails, validateCheckout } from './rules/checkout.js'
import { loadMenu } from './services/loadMenu.js'

export default function App() {
  const { pathname } = useLocation()
  const main = useRef(null)
  const previousPath = useRef(pathname)
  const [menu, setMenu] = useState({ status: 'loading', items: [] })
  const [request, setRequest] = useState({ mode: 'normal' })
  const [selection, setSelection] = useState(() => ({ cart: readCart(), message: '', error: false }))
  const [details, setDetails] = useState(emptyDetails)
  const [order, setOrder] = useState(null)
  const [stockUsed, setStockUsed] = useState({})
  const [reducedStock, setReducedStock] = useState(false)

  useEffect(() => {
    if (previousPath.current === pathname) return

    previousPath.current = pathname
    window.scrollTo(0, 0)
    main.current?.focus({ preventScroll: true })
  }, [pathname])

  useEffect(() => {
    const controller = new AbortController()

    loadMenu(request.mode, controller.signal)
      .then((items) => setMenu({ status: 'ready', items }))
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setMenu({ status: 'error', items: [] })
        }
      })

    return () => controller.abort()
  }, [request])

  useEffect(() => {
    saveCart(selection.cart)
  }, [selection.cart])

  const items = menu.items.map((item) => {
    const stock = reducedStock && item.id === 'falafel-wrap' ? 1 : item.stock
    return { ...item, stock: Math.max(0, stock - (stockUsed[item.id] ?? 0)) }
  })
  const rows = getCartRows(selection.cart, items)
  const totals = getOrderTotals(rows)

  function requestMenu(mode = 'normal') {
    setMenu({ status: 'loading', items: [] })
    setRequest({ mode })
  }

  function changeQuantity(id, change) {
    const item = items.find((meal) => meal.id === id)
    setSelection((previous) => updateCartQuantity(previous.cart, id, change, item))
  }

  function removeMeal(id) {
    const item = items.find((meal) => meal.id === id)
    setSelection((previous) => {
      const quantity = previous.cart.find((line) => line.id === id)?.quantity ?? 0
      return updateCartQuantity(previous.cart, id, -quantity, item)
    })
  }

  function updateDetails(name, value) {
    setDetails((previous) => ({ ...previous, [name]: value }))
  }

  function placeOrder() {
    if (menu.status !== 'ready' || !rows.length || rows.some(getStockProblem)) return false
    if (details.vegetarianOnly && rows.some((row) => !row.item.vegetarian)) return false
    if (Object.keys(validateCheckout(details)).length) return false

    setOrder({
      reference: `CB-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
      items: rows.map(({ id, item, quantity }) => ({ id, name: item.name, price: item.price, quantity })),
      totals,
    })
    setStockUsed((previous) => {
      const next = { ...previous }
      for (const row of rows) {
        next[row.id] = (next[row.id] ?? 0) + row.quantity
      }
      return next
    })
    setSelection({ cart: [], message: '', error: false })
    setDetails(emptyDetails)
    return true
  }

  const addMeal = (id) => changeQuantity(id, 1)
  const statusProps = {
    status: menu.status,
    onRetry: () => requestMenu(),
  }

  return (
    <Layout
      mainRef={main}
      cartCount={totals.count}
      feedback={selection}
      onDemoMenu={requestMenu}
      reducedStock={reducedStock}
      onToggleStock={() => setReducedStock((previous) => !previous)}
    >
      <Routes>
        <Route path="/" element={<HomePage items={items} onAdd={addMeal} {...statusProps} />} />
        <Route
          path="/menu"
          element={
            <MenuStatus {...statusProps}>
              <MenuPage items={items} onReload={statusProps.onRetry} onAdd={addMeal} />
            </MenuStatus>
          }
        />
        <Route
          path="/menu/:id"
          element={
            <MenuStatus {...statusProps}>
              <FoodDetailsPage items={items} onAdd={addMeal} />
            </MenuStatus>
          }
        />
        <Route
          path="/cart"
          element={
            <MenuStatus {...statusProps}>
              <CartPage rows={rows} totals={totals} onChangeQuantity={changeQuantity} onRemove={removeMeal} />
            </MenuStatus>
          }
        />
        <Route
          path="/checkout"
          element={
            <MenuStatus {...statusProps}>
              <CheckoutPage
                rows={rows}
                totals={totals}
                details={details}
                onChangeDetails={updateDetails}
                onPlaceOrder={placeOrder}
              />
            </MenuStatus>
          }
        />
        <Route path="/confirmation" element={<ConfirmationPage order={order} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}
