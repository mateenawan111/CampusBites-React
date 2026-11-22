import { Link, NavLink } from 'react-router-dom'
import { restaurant } from '../data/menu.js'

export default function Layout({ children, mainRef, onDemoMenu }) {
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
          </nav>
        </div>
      </header>

      <main id="main-content" ref={mainRef} tabIndex={-1}>
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
              <button type="button" onClick={() => onDemoMenu()}>Restore menu</button>
            </div>
          </details>
        </div>
      </footer>
    </>
  )
}
