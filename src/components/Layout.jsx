import { Link, NavLink } from 'react-router-dom'
import { restaurant } from '../data/menu.js'

export default function Layout({ children, mainRef, cartCount, feedback, onDemoMenu, reducedStock, onToggleStock }) {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="container header-inner">
          <Link className="brand" to="/">
            <span className="brand-mark" aria-hidden="true">CB</span>
            Campus<span>Bites</span>
          </Link>
          <nav aria-label="Main navigation">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/menu">Menu</NavLink>
            <NavLink className="cart-link" to="/cart">
              Cart <span className="cart-count">{cartCount}</span>
            </NavLink>
          </nav>
        </div>
      </header>

      <main id="main-content" ref={mainRef} tabIndex={-1}>
        <div className="container cart-feedback" role="status">
          {feedback.message && (
            <p className={feedback.error ? 'form-error' : ''}>{feedback.message}</p>
          )}
        </div>
        {children}
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <strong>CampusBites</strong>
            <p>{restaurant.deliveryArea}</p>
            <p>Fictional restaurant with simulated orders.</p>
          </div>
          <details className="demo-controls">
            <summary>Assignment demo controls</summary>
            <div>
              <button type="button" onClick={() => onDemoMenu('fail')}>Simulate menu failure</button>
              <button type="button" onClick={() => onDemoMenu('empty')}>Show an empty menu</button>
              <button type="button" onClick={() => onDemoMenu('content')}>Show missing photo and long title</button>
              <button type="button" onClick={() => onDemoMenu()}>Restore menu</button>
              <button type="button" onClick={onToggleStock} aria-pressed={reducedStock}>
                Reduce Falafel Wrap stock to 1
              </button>
            </div>
          </details>
        </div>
      </footer>
    </>
  )
}
