# Assignment requirements

The reference is the CampusBites Assignment 02 brief for CS4032. The project uses React, JavaScript, JSX, Vite, React Router, authored CSS, and local mock data.

| ID | Expected behaviour | Implementation |
| --- | --- | --- |
| FR01 | Meaningful routes with working links and browser history | `src/main.jsx` wraps `App` in `BrowserRouter`. `src/App.jsx` defines routes and `Layout.jsx` provides site navigation. |
| FR02 | Parameterized route with useful invalid-ID handling | `FoodDetailsPage.jsx` reads the `id` URL parameter and links back when a meal is missing. |
| FR03 | At least 10 records with stable IDs | `src/data/menu.js` defines 12 meals and a fictional restaurant profile. |
| FR04 | Search relevant text and update results | `MenuPage.jsx` searches dish names, descriptions, and ingredients. |
| FR05 | Filter and sort alongside search | `MenuPage.jsx` combines category, vegetarian preference, and price/name ordering with search. |
| FR06 | Details for a selection decision | `FoodDetailsPage.jsx` shows ingredient list, stock, price, photo, and description. |
| FR07 | Add, remove and change quantities | `App.jsx`, `FoodCard.jsx`, `FoodDetailsPage.jsx`, and `CartPage.jsx` use shared cart actions. |
| FR08 | Selection state stays consistent across routes | `App.jsx` owns cart, draft, and session inventory. `getCartRows` joins selections to the current menu. |
| FR09 | At least three controlled form fields in the main flow | `CheckoutPage.jsx` binds name, mobile number, address, notes, and vegetarian preference to shared draft state. |
| FR10 | Specific validation with valid input preserved | `validateCheckout` checks name, phone, address, and notes. `CheckoutPage.jsx` shows field messages and focuses the first invalid field. |
| FR11 | Calculated summary | `getOrderTotals` derives quantity, subtotal, delivery, and total. `OrderSummary.jsx` shows the breakdown. |
| FR12 | Enforce three operating rules | `src/rules/cart.js`, `delivery.js`, `CheckoutPage.jsx`, and `App.jsx` enforce stock, dietary eligibility, and pricing. |
| FR13 | Restore a useful selection from local storage | `readCart` validates saved lines. The `App` storage effect uses `saveCart` after changes. |
| FR14 | Async mock data with failure and retry | `loadMenu` returns a Promise. The `App` effect aborts superseded requests. `MenuStatus.jsx` displays loading and retry. |
| FR15 | Distinguish empty dataset from filtered results | `MenuPage.jsx` shows a reload action for an empty dataset and a clear-filters action for no matches. |
| FR16 | Clear completion | `placeOrder` saves an item and total snapshot and clears the cart. `ConfirmationPage.jsx` shows the order reference. |
| FR17 | 390px, 1280px, and keyboard support | `base.css` and `order.css` handle layout changes. `Layout.jsx` provides a skip link and `App.jsx` manages route focus. |
| FR18 | Address three observed reference issues | `HomePage.jsx`, `MenuPage.jsx`, and `FoodCard.jsx` implement the actions in [DECISIONS.md](../DECISIONS.md). |
| FR19 | Public site serves assets and supports nested routes | `vercel.json` sets the Vite SPA rewrite. The [live site](https://campus-bites-react.vercel.app/) passed public asset and nested refresh checks. |

## Other assessed deliverables

| Requirement | Evidence |
| --- | --- |
| Three independently evidenced reference issues | [Reference research](REFERENCE_RESEARCH.md) and three original browser captures |
| Three frontend decisions, including state and mobile layout | [Frontend decisions](../DECISIONS.md) |
| One rule tested with Node’s test runner | `test/delivery.test.js` and `npm test` |
| Edge-case and responsive verification | [Test results](TEST_RESULTS.md) |
| Public GitHub milestones and deployment | [Public commit history](https://github.com/mateenawan111/CampusBites-React/commits/main/) and [Vercel production site](https://campus-bites-react.vercel.app/). Deployed application files matched the local production build. |
| Independent viva | The README concept map links the main React and JavaScript concepts to their code. |
