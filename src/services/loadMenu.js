import { menuItems } from '../data/menu.js'

export function loadMenu(mode, signal) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      signal.removeEventListener('abort', cancel)

      if (mode === 'fail') {
        reject(new Error('Menu temporarily unavailable.'))
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
