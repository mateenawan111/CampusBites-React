import { useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import MenuStatus from './components/MenuStatus.jsx'
import FoodDetailsPage from './pages/FoodDetailsPage.jsx'
import HomePage from './pages/HomePage.jsx'
import MenuPage from './pages/MenuPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { loadMenu } from './services/loadMenu.js'

export default function App() {
  const { pathname } = useLocation()
  const main = useRef(null)
  const [menu, setMenu] = useState({ status: 'loading', items: [] })
  const [request, setRequest] = useState({ mode: 'normal' })

  useEffect(() => {
    window.scrollTo(0, 0)
    main.current?.focus()
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

  function requestMenu(mode = 'normal') {
    setMenu({ status: 'loading', items: [] })
    setRequest({ mode })
  }

  const statusProps = {
    status: menu.status,
    onRetry: () => requestMenu(),
  }

  return (
    <Layout mainRef={main} onDemoMenu={requestMenu}>
      <Routes>
        <Route path="/" element={<HomePage items={menu.items} {...statusProps} />} />
        <Route
          path="/menu"
          element={
            <MenuStatus {...statusProps}>
              <MenuPage items={menu.items} onReload={statusProps.onRetry} />
            </MenuStatus>
          }
        />
        <Route
          path="/menu/:id"
          element={
            <MenuStatus {...statusProps}>
              <FoodDetailsPage items={menu.items} />
            </MenuStatus>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}
