# 🔥 Norn Vue

Sistema de store global simples e leve para Vue 3.

## ✨ Características

- **Super leve** (~1KB gzipped)
- **Desestruturação automática** com reatividade
- **Stores globais** como Pinia
- **Composition API** pura
- **TypeScript** nativo

## 📦 Instalação

```bash
npm install norn-vue
```

## 🚀 Uso Básico

```typescript
import { defineStore } from 'norn-vue'
import { ref, computed } from 'vue'

// Defina sua store
const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const increment = () => count.value++
  const doubleCount = computed(() => count.value * 2)
  
  return {
    count,
    doubleCount,
    increment
  }
})

// Use em qualquer componente
export default {
  setup() {
    // ✅ Desestruturação mantém reatividade!
    const { count, doubleCount, increment } = useCounterStore()
    
    return {
      count,
      doubleCount,
      increment
    }
  }
}
```

## 📖 Exemplo Completo

```typescript
const useTodosStore = defineStore('todos', () => {
  const todos = ref([])
  
  const addTodo = (text: string) => {
    todos.value.push({
      id: Date.now(),
      text,
      done: false
    })
  }
  
  const completedCount = computed(() => 
    todos.value.filter(t => t.done).length
  )
  
  return {
    todos,
    completedCount,
    addTodo
  }
})
```

## 🛠️ API

### `defineStore(id, setup)`

- **id**: Identificador único da store
- **setup**: Função que retorna estado e métodos

### Funções Utilitárias

```typescript
import { getStore, clearStore, clearAllStores } from 'norn-vue'

// Acessar store existente
const store = getStore('counter')

// Limpar store (útil para testes)
clearStore('counter')
clearAllStores()
```

## 📄 Licença

MIT
