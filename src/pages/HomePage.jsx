import { Link } from 'react-router-dom'
import FoodCard from '../components/FoodCard.jsx'
import FoodPhoto from '../components/FoodPhoto.jsx'
import MenuStatus from '../components/MenuStatus.jsx'
import { restaurant } from '../data/menu.js'

const featuredIds = ['zinger-burger', 'chicken-biryani', 'chicken-pizza']

export default function HomePage({ items, status, onRetry, onAdd }) {
  const featured = featuredIds
    .map((id) => items.find((item) => item.id === id))
    .filter(Boolean)

  return (
    <>
      <section className="container hero">
        <div className="hero-copy">
          <p className="eyebrow">{restaurant.deliveryArea}</p>
          <h1>Good food.<br />Close to campus.</h1>
          <p>{restaurant.description}</p>
          <Link className="button" to="/menu">Explore the menu</Link>
        </div>
        <FoodPhoto
          className="hero-photo"
          src="/images/hero.webp"
          alt="A stacked burger served on a wooden board"
          loading="eager"
        />
      </section>

      <section className="container section-block" aria-labelledby="house-favourites">
        <div className="section-heading">
          <h2 id="house-favourites">House favourites</h2>
          <Link className="text-link" to="/menu">See the full menu</Link>
        </div>
        <MenuStatus status={status} onRetry={onRetry}>
          {featured.length ? (
            <div className="food-grid">
              {featured.map((item) => (
                <FoodCard key={item.id} item={item} onAdd={onAdd} />
              ))}
            </div>
          ) : (
            <p>There are no featured meals available right now.</p>
          )}
        </MenuStatus>
      </section>

      <section className="container section-block" aria-labelledby="how-to-order">
        <h2 id="how-to-order">How to order</h2>
        <ol className="order-steps">
          <li><strong>Pick your meal</strong><p>Search the menu and check the ingredients.</p></li>
          <li><strong>Review your cart</strong><p>Adjust quantities and check the delivery fee.</p></li>
          <li><strong>Confirm delivery</strong><p>Add your details and get a simulated order reference.</p></li>
        </ol>
      </section>
    </>
  )
}
