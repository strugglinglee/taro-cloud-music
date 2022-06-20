import { App } from 'vue'
import { createPinia } from 'pinia'
export { useSystem } from './system'
import { useUserInfo } from './user'
export const store = createPinia()

export function setupStore(app: App) {
  app.use(store)
}
