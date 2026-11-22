import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="container page-section">
      <h1>Page not found</h1>
      <p>That page may have moved. You can get back to ordering from the menu.</p>
      <Link className="button" to="/menu">Browse the menu</Link>
    </section>
  )
}
