import { menuItems, restaurant } from './data/menu.js'

export default function App() {
  return (
    <main className="opening">
      <p className="opening-area">{restaurant.deliveryArea}</p>
      <h1>{restaurant.name}</h1>
      <p>{restaurant.description}</p>

      <section aria-labelledby="menu-preview">
        <h2 id="menu-preview">Menu preview</h2>
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <span>{item.name}</span>
              <span>Rs {item.price.toLocaleString('en-PK')}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
