/**
 * Norn - Sistema de store global simples para Vue
 */
import { reactive, toRefs } from 'vue'

// Armazenamento global de stores
const stores = new Map<string, any>()

/**
 * Define uma store global usando Composition API
 * @param id - Identificador único da store
 * @param setup - Função de setup que retorna o estado e métodos
 * @returns Função que retorna a store com refs automáticos
 */
export function defineStore<T extends Record<string, any>>(
  id: string,
  setup: () => T
): () => ReturnType<typeof toRefs<T>> & T {
  return () => {
    // Retorna store existente se já foi criada
    if (stores.has(id)) {
      return stores.get(id)
    }

    // Cria nova store executando o setup
    const store = setup()
    
    // Torna o store reativo usando a reatividade do Vue
    const reactiveStore = reactive(store)
    
    // Combina refs automáticos + store original
    const storeWithRefs = {
      ...toRefs(reactiveStore), // Para desestruturação reativa
      ...reactiveStore          // Para acesso direto
    }
    
    // Armazena globalmente
    stores.set(id, storeWithRefs)
    
    return storeWithRefs
  }
}

/**
 * Função para acessar uma store existente (opcional)
 * @param id - ID da store
 * @returns Store ou undefined se não existir
 */
export function getStore<T = any>(id: string): T | undefined {
  return stores.get(id)
}

/**
 * Remove uma store do cache (útil para testes)
 * @param id - ID da store
 */
export function clearStore(id: string): void {
  stores.delete(id)
}

/**
 * Remove todas as stores (útil para testes)
 */
export function clearAllStores(): void {
  stores.clear()
}