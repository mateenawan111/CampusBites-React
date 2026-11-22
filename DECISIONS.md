# Frontend decisions

Each decision corresponds to an observed problem on [Broadway Pizza Pakistan](https://www.broadwaypizza.com.pk/). See the [reference research](docs/REFERENCE_RESEARCH.md) for the original captures and exact tasks.

## 1. Put the menu action before delivery details

| Field | Decision |
| --- | --- |
| Problem | A delivery or pickup dialogue obscures the menu on the first visit. |
| Decision | Make **Explore the menu** the home page’s primary action and stack the hero text and photo at mobile widths. Show the H-11 delivery area alongside the action and collect the full address at checkout. |
| Alternative | Show a dismissible fulfilment dialogue before the first menu visit. |
| Reason | A student who is still choosing a meal can check the food and prices first. The delivery area remains available before the cart. |
| Tradeoff | The app learns the exact order address later. CampusBites has one fictional delivery area and uses the same menu for everyone. |
| Code location | `src/pages/HomePage.jsx` (`HomePage`); `src/pages/CheckoutPage.jsx` (`CheckoutPage`); `src/styles/base.css` (hero grid and mobile breakpoint). |
| Evidence | At 390px, open the homepage and choose **Explore the menu**. [Mobile homepage](docs/evidence/campusbites/home-mobile.jpg) · [Desktop homepage](docs/evidence/campusbites/home-desktop.jpg). |

## 2. Filter vegetarian dishes and label the results

| Field | Decision |
| --- | --- |
| Problem | The reference search options omit dietary suitability and its result rows omit dietary labels. |
| Decision | Put a **Vegetarian only** checkbox with the menu filters. Display a “Vegetarian” label on relevant cards and details. Offer a separate vegetarian-only order preference in checkout and name the dishes that conflict. |
| Alternative | Let customers infer suitability from ingredients on each detail page. |
| Reason | A customer can see suitable dishes in the list and still read ingredients before buying. Checkout checks the entire order, including meals selected before the preference was chosen. |
| Tradeoff | The menu filter narrows the view and the checkout preference validates the order. Both labels identify the scope, and customers may set them independently. |
| Code location | `src/pages/MenuPage.jsx` (`MenuPage`); `src/components/FoodCard.jsx` (`FoodCard`); `src/pages/CheckoutPage.jsx` (`CheckoutPage`). |
| Evidence | At 390px, select **Vegetarian only** and the Pizza category. Veggie Pizza remains with a text dietary label. [Filtered mobile menu](docs/evidence/campusbites/vegetarian-mobile.jpg). |

## 3. Make search use dish text and retain the current filters

| Field | Decision |
| --- | --- |
| Problem | Searching for pasta in the reference returns sandwiches and calzones from a shared category without a description that explains the match. |
| Decision | Match each search term against dish names, descriptions, and ingredients. Use a separate category control and keep filters and sorting in the URL. Returning from a detail page restores the same results. |
| Alternative | Include category labels in the free-text search and keep filter settings in component state. |
| Reason | Searching `pasta` brings up two actual pasta meals, each with a description. URL parameters also preserve the customer’s place when comparing meals. |
| Tradeoff | Searches for a category title match only when that wording appears in dish text. Customers can select categories directly for that use case. |
| Code location | `src/pages/MenuPage.jsx` (`MenuPage`, `changeFilter`); `src/pages/FoodDetailsPage.jsx` (`FoodDetailsPage`); `src/components/FoodCard.jsx` (detail links that carry query parameters). |
| Evidence | Search for `pasta`, open a result, and return to the menu. The query and result list remain. [Pasta search](docs/evidence/campusbites/pasta-search.jpg) · [Meal details](docs/evidence/campusbites/food-details.jpg). |
