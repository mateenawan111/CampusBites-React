import { Link, useLocation, useParams } from 'react-router-dom'
import FoodPhoto from '../components/FoodPhoto.jsx'
import { formatPrice } from '../utils/formatPrice.js'

export default function FoodDetailsPage({ items, onAdd }) {
  const { id } = useParams()
  const { search } = useLocation()
  const menuUrl = `/menu${search}`
  const item = items.find((meal) => meal.id === id)

  if (!item) {
    return (
      <section className="container page-section">
        <h1>Meal unavailable</h1>
        <p>We couldn’t find that meal. Browse the menu for what’s available today.</p>
        <Link className="button" to={menuUrl}>Browse the menu</Link>
      </section>
    )
  }

  const soldOut = item.stock === 0

  return (
    <section className="container page-section">
      <Link className="text-link back-link" to={menuUrl}>Back to menu</Link>
      <div className="detail-layout">
        <FoodPhoto className="detail-photo" src={item.image} alt={item.name} loading="eager" />
        <div>
          <p className="food-tags">
            <span>{item.category}</span>
            {item.vegetarian && <span className="vegetarian-tag">Vegetarian</span>}
          </p>
          <h1>{item.name}</h1>
          <p>{item.description || 'Description coming soon.'}</p>
          <p className="detail-price">{formatPrice(item.price)}</p>
          <p className={`availability ${soldOut ? 'sold-out' : ''}`}>
            {soldOut ? 'Sold out' : `${item.stock} in stock`}
          </p>
          <h2>Ingredients</h2>
          <p>{item.ingredients.length ? item.ingredients.join(', ') : 'Ingredients are unavailable.'}</p>
          {onAdd && (
            <button className="button" type="button" disabled={soldOut} onClick={() => onAdd(item.id)}>
              {soldOut ? 'Sold out' : 'Add to cart'}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
