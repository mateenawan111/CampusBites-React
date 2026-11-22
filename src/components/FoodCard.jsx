import { Link } from 'react-router-dom'
import { formatPrice } from '../utils/formatPrice.js'
import FoodPhoto from './FoodPhoto.jsx'

export default function FoodCard({ item, menuSearch = '', onAdd }) {
  const href = `/menu/${item.id}${menuSearch}`
  const soldOut = item.stock === 0

  return (
    <article className="food-card">
      <Link className="food-card-image" to={href} tabIndex={-1} aria-hidden="true">
        <FoodPhoto src={item.image} alt="" />
      </Link>
      <div className="food-card-content">
        <div className="food-tags">
          <span>{item.category}</span>
          {item.vegetarian && <span className="vegetarian-tag">Vegetarian</span>}
        </div>
        <h3><Link to={href}>{item.name}</Link></h3>
        <p>{item.description || 'Description coming soon.'}</p>
        <div className="food-card-bottom">
          <div>
            <strong>{formatPrice(item.price)}</strong>
            <span className={`availability ${soldOut ? 'sold-out' : ''}`}>
              {soldOut ? 'Sold out' : `${item.stock} in stock`}
            </span>
          </div>
          {onAdd && (
            <button
              className="button card-add"
              type="button"
              disabled={soldOut}
              aria-label={`Add ${item.name} to cart`}
              onClick={() => onAdd(item.id)}
            >
              Add
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
