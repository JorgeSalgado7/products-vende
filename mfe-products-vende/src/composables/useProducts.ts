import { ref } from 'vue'
import type { Product } from '@/domain/models/product.model'
import * as service from '@/services/product.service'

export function useProducts() {
  const products = ref<Product[]>([])
  const loading = ref(false)

  async function fetch() {
    loading.value = true
    const res = await service.getProducts()
    if (!res.notification.error) {
      products.value = res.data
    }
    loading.value = false
  }

  return {
    products,
    fetch,
    loading
  }
}
