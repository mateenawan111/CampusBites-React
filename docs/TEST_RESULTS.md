# Test results

Verified locally on 22 November 2026 using the Vite production preview and Chrome 157.0.8103.80. Desktop viewport was 1280 × 900 and touch viewport was 390 × 844. The final browser run passed all 12 checks. A separate keyboard-only run completed the order journey from home to confirmation. The captured browser console showed zero errors or React warnings in either run. Earlier runs exposed a race between successive URL filters and a missing favicon request. Both passed in the final run.

## Reference-site improvements

| User actions | Expected | Observed |
| --- | --- | --- |
| Open the homepage and select **Explore the menu**. | Browse without a fulfilment or location prompt. | The link worked on both viewports. The delivery area was visible on the [desktop homepage](evidence/campusbites/home-desktop.jpg) and [mobile homepage](evidence/campusbites/home-mobile.jpg). |
| Enable **Vegetarian only** and select Pizza. | Show eligible pizzas with a text label. | The [390px menu](evidence/campusbites/vegetarian-mobile.jpg) showed Veggie Pizza. Checkout accepted it with the dietary preference selected. |
| Search for `pasta`, sort by price, open an item and return. | Search only relevant dish text. Preserve the query, sorting, and active filters when returning. | The [two pasta dishes](evidence/campusbites/pasta-search.jpg) matched. Price sort, browser Back/Forward, and **Back to menu** preserved the chosen options. |

## Main journey and recovery

| Check | Expected and observed |
| --- | --- |
| All routes and navigation | Home, menu, detail, cart, checkout, and confirmation loaded. Nested detail navigation and refresh worked on the local production preview. Bad IDs and unknown URLs gave a way back. Direct confirmation without an order showed guidance. |
| Cart selection and persistence | The cart accepted add, remove, increase and decrease actions. Two saved Falafel Wraps survived refresh. A third was blocked while stock was two. |
| Changed and missing stock | Reducing Falafel Wrap stock to one blocked checkout while two were selected. **Use available quantity** resolved it. A retired item restored from storage gave a removal action. Invalid saved JSON produced an empty cart. [Stock recovery](evidence/campusbites/cart-stock-recovery.jpg) |
| Delivery totals | A cart with a Zinger Burger showed Rs 150 for delivery. Adding Veggie Pizza reached Rs 1,500 and changed delivery to free. [Exact boundary](evidence/campusbites/cart-free-delivery.jpg) |
| Form and eligibility | An invalid phone and blank address showed field-level messages, focused the phone, and retained the valid name. Enabling the preference with a Zinger Burger blocked completion. Returning from the cart preserved the address and dietary choice. [Validation](evidence/campusbites/checkout-validation.jpg) |
| Completion | A valid simulated order showed a reference, ordered items, and total. The cart cleared and stayed empty after refresh. The full mobile journey also completed. [Confirmation](evidence/campusbites/confirmation.jpg) |
| Loading, empty and no-match states | Loading appeared before the simulated failure. **Retry** restored all 12 dishes. Empty data offered **Reload menu**, while a search with no matches offered **Clear filters**. [Retry](evidence/campusbites/menu-retry.jpg) |
| Missing and lengthy content | The mobile content demo displayed a fallback for a missing photo. The long Vegetable Biryani title wrapped, the Add button stayed usable, and there was no page-wide overflow. [Content fallback](evidence/campusbites/missing-content-mobile.jpg) |
| Responsive and keyboard access | Main screens showed no page-wide horizontal overflow at the tested widths. The first Tab focused the skip link and Enter moved focus to main content. A separate 1280px run used only Tab, typing, Space and Enter to browse, search, open a meal, add it, review the cart, fill checkout, and reach confirmation. Focus stayed visible at every tested control. |

## Automated rule test and build

- `npm test` with `node --test` passed 3 tests. The shipping fee is Rs 150 for a typical subtotal below the threshold. Rs 1,499, Rs 1,500, and Rs 1,501 verify the exact transition. Invalid totals throw `RangeError`.
- `npm run build` succeeded and produced the application and local assets in `dist/`.

## Public deployment

The [Vercel production site](https://campus-bites-react.vercel.app/) opened without signing in. A direct visit to `/menu/chicken-biryani` and a refresh both loaded the meal. The live simulated order reached confirmation, cleared the cart, and produced no browser errors or warnings. The HTML, JavaScript, CSS, favicon, and food images matched the local production build byte for byte.
