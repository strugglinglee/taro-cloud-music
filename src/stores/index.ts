import { App } from 'vue'
import { createPinia } from 'pinia'
export { useSystem } from './system'
export const store = createPinia()

export function setupStore(app: App) {
  app.use(store)
}
