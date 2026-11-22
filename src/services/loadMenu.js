import { menuItems } from '../data/menu.js'

export function loadMenu(mode, signal) {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException('Menu request cancelled.', 'AbortError'))
      return
    }

    const timer = setTimeout(() => {
      signal.removeEventListener('abort', cancel)

      if (mode === 'fail') {
        reject(new Error('Menu temporarily unavailable.'))
        return
      }

      if (mode === 'content') {
        const items = menuItems.map((item) => (
          item.id === 'vegetable-biryani'
            ? {
                ...item,
                name: 'Vegetable Biryani with Garden Peas, Roasted Potatoes, Carrots, Mint and Crispy Fried Onions',
                image: '',
              }
            : item
        ))
        resolve(items)
        return
      }

      resolve(mode === 'empty' ? [] : menuItems)
    }, 420)

    function cancel() {
      clearTimeout(timer)
      reject(new DOMException('Menu request cancelled.', 'AbortError'))
    }

    signal.addEventListener('abort', cancel, { once: true })
  })
}
