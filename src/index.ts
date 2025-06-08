import { reactive, toRefs } from 'vue'

const stores = new Map<string, any>()

export function defineStore<ReturnT extends object>(
  id: string,
  setup: () => ReturnT
): () => ReturnT & ReturnType<typeof toRefs<ReturnT>> {
  return () => {
    if (stores.has(id)) {
      return stores.get(id)
    }

    const store = setup()
    const reactiveStore = reactive(store)
    const refs = toRefs(reactiveStore)
    const storeWithRefs = {
      ...reactiveStore,
      ...refs,
    }

    stores.set(id, storeWithRefs)
    return storeWithRefs
  }
}
