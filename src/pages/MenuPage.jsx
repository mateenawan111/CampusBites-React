import { useSearchParams } from 'react-router-dom'
import FoodCard from '../components/FoodCard.jsx'

const sortOptions = {
  featured: 'Featured',
  low: 'Price: low to high',
  high: 'Price: high to low',
  name: 'Name: A to Z',
}

export default function MenuPage({ items, onReload, onAdd }) {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const categories = [...new Set(items.map((item) => item.category))]
  const requestedCategory = params.get('category')
  const category = categories.includes(requestedCategory) ? requestedCategory : ''
  const requestedSort = params.get('sort')
  const sort = Object.hasOwn(sortOptions, requestedSort) ? requestedSort : 'featured'
  const vegetarianOnly = params.get('vegetarian') === '1'
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean)

  const results = items.filter((item) => {
    const text = [item.name, item.description, ...item.ingredients].join(' ').toLowerCase()
    return (
      (!category || item.category === category) &&
      (!vegetarianOnly || item.vegetarian) &&
      words.every((word) => text.includes(word))
    )
  })

  if (sort === 'low') results.sort((first, second) => first.price - second.price)
  if (sort === 'high') results.sort((first, second) => second.price - first.price)
  if (sort === 'name') results.sort((first, second) => first.name.localeCompare(second.name))

  function changeFilter(name, value, replace = false) {
    const next = new URLSearchParams(params)
    if (value) next.set(name, value)
    else next.delete(name)
    setParams(next, { replace })
  }

  const menuSearch = params.size ? `?${params}` : ''

  return (
    <section className="container page-section">
      <header className="page-heading">
        <h1>Our menu</h1>
        <p>Browse campus favourites, from biryani to burgers.</p>
      </header>

      {items.length ? (
        <>
          <div className="menu-filters" role="group" aria-label="Menu filters">
            <label>
              Search dishes or ingredients
              <input
                type="search"
                value={query}
                placeholder="Try pasta or chicken"
                onChange={(event) => changeFilter('q', event.target.value, true)}
              />
            </label>
            <label>
              Category
              <select value={category} onChange={(event) => changeFilter('category', event.target.value)}>
                <option value="">All categories</option>
                {categories.map((categoryName) => (
                  <option key={categoryName} value={categoryName}>{categoryName}</option>
                ))}
              </select>
            </label>
            <label>
              Sort by
              <select
                value={sort}
                onChange={(event) => changeFilter('sort', event.target.value === 'featured' ? '' : event.target.value)}
              >
                {Object.entries(sortOptions).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={vegetarianOnly}
                onChange={(event) => changeFilter('vegetarian', event.target.checked ? '1' : '')}
              />
              Vegetarian only
            </label>
          </div>

          <div className="section-heading results-heading">
            <h2>Meals</h2>
            <p role="status">{results.length} {results.length === 1 ? 'meal' : 'meals'} found</p>
          </div>
          {results.length ? (
            <div className="food-grid menu-grid">
              {results.map((item) => (
                <FoodCard key={item.id} item={item} menuSearch={menuSearch} onAdd={onAdd} />
              ))}
            </div>
          ) : (
            <div className="notice">
              <h3>No meals match</h3>
              <p>Try a different search or clear your filters to see the full menu.</p>
              <button className="button" type="button" onClick={() => setParams({})}>Clear filters</button>
            </div>
          )}
        </>
      ) : (
        <div className="notice">
          <h2>The menu is empty</h2>
          <p>No meals are listed right now. Reload the menu to check again.</p>
          <button className="button" type="button" onClick={onReload}>Reload menu</button>
        </div>
      )}
    </section>
  )
}
