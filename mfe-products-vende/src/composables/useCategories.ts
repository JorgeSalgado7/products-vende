import { ref } from 'vue'
import type { Category } from '@/domain/models/category.model.js'
import * as service from '@/services/category.service'

export function useCategories() {
  const categories = ref<Category[]>([])
  const loading = ref(false)

  async function fetch() {
    loading.value = true
    const res = await service.getCategories()
    if (!res.notification.error) {
      categories.value = res.data
    }
    loading.value = false
  }

  return {
    categories,
    fetch,
    loading
  }
}
