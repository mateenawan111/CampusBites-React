# CampusBites

**Web Programming CS4032 · Assignment 02 · Muhammad Mateen · Section A**

CampusBites is a fictional restaurant serving burgers, pizza, biryani, pasta, wraps, sides, and dessert to students, hostel residents, and neighbours in Islamabad’s H-11 area. Customers can browse the menu, compare meals, and place a simulated delivery order in Pakistani rupees.

## Run locally

Use Node.js 22.12 or newer and npm. On Windows PowerShell, use `npm.cmd` if your shell blocks `npm.ps1`.

```sh
npm ci
npm run dev
npm run build
npm run preview
npm test
```

Open the URL printed by Vite. [GitHub repository](https://github.com/mateenawan111/CampusBites-React). The public deployment URL is pending.

## Routes

| Route | What you can do |
| --- | --- |
| `/` | See the delivery area, featured meals, and ordering steps. |
| `/menu` | Search dishes and ingredients, combine filters, and sort by price or name. |
| `/menu/:id` | Read ingredients, stock, and price, and add an available meal. |
| `/cart` | Change quantities, remove meals, fix stock conflicts, and review totals. |
| `/checkout` | Enter delivery details and choose whether the order must be vegetarian. |
| `/confirmation` | See a simulated order reference, meals, and total after checkout. |
| Other URLs | Return to the menu from the 404 page. |

## Operating rules

| Rule | Where it appears | Boundary and response |
| --- | --- | --- |
| Stock is the maximum quantity a customer can order per meal. | Menu and details show stock. Cart and checkout explain conflicts. | With two Falafel Wraps available, two are accepted and a third is rejected. A saved quantity above current stock must be reduced or removed before checkout. |
| A vegetarian-only order may contain only meals marked vegetarian. | Menu and details show vegetarian status. Checkout shows the preference and names conflicting dishes. | One nonvegetarian dish blocks completion while the preference is selected. Remove it or clear the preference. |
| Delivery costs Rs 150 below Rs 1,500 and is free from Rs 1,500. | The home page announces the threshold. Cart and checkout show subtotal, delivery and final total. | Rs 1,499 incurs Rs 150, and Rs 1,500 qualifies for free delivery. An empty cart has no order total. |

## Demo controls

On the menu page, open **Assignment demo controls** in the footer.

- **Simulate menu failure** shows loading and then an error. Select **Retry** to restore the menu.
- **Show an empty menu** loads an empty dataset. Select **Reload menu** to restore the listings.
- **Show missing photo and long title** replaces the Vegetable Biryani image with a text fallback and uses a lengthy dish name. **Restore menu** returns to the normal dataset.
- Add two Falafel Wraps, open the cart, and turn on **Reduce Falafel Wrap stock to 1**. The cart blocks checkout until you use the available quantity or remove the meal. Toggle the same control to restore its default capacity for the session.
- Search for `xyznomatch` to see **No meals match**, then select **Clear filters**.
- Submit checkout with a blank or invalid name, mobile number, or address to see field errors. With a Zinger Burger in the cart, enable **Vegetarian-only order** to see the conflict.

The cart is saved in this browser. Checkout details and the confirmation exist for the current page session. Inventory changes are simulated and reset on a browser refresh. The project has no backend, delivery dispatch, or payment processing.

## Concept map

| Concept | File | Component or function |
| --- | --- | --- |
| Routing and page navigation | `src/App.jsx` | `App` with `Routes`, `Route`, and a route focus effect |
| Props, keyed lists, and callback props | `src/pages/MenuPage.jsx`, `src/components/FoodCard.jsx` | `MenuPage`, `FoodCard` |
| Shared state and functional updates | `src/App.jsx`, `src/rules/cart.js` | `changeQuantity`, `updateCartQuantity` |
| Controlled fields and validation | `src/pages/CheckoutPage.jsx`, `src/rules/checkout.js` | `CheckoutPage`, `validateCheckout` |
| Async loading and effect cleanup | `src/App.jsx`, `src/services/loadMenu.js` | Menu request effect, `loadMenu` |
| Browser storage | `src/rules/cart.js` | `readCart`, `saveCart` |
| Derived totals and Node tests | `src/rules/cart.js`, `src/rules/delivery.js`, `test/delivery.test.js` | `getOrderTotals`, `calculateDelivery` |

[Requirements](docs/REQUIREMENTS.md) · [Reference research](docs/REFERENCE_RESEARCH.md) · [Frontend decisions](DECISIONS.md) · [Image credits](docs/IMAGE_CREDITS.md) · [Test results](docs/TEST_RESULTS.md)
