import * as api from '@/infrastructure/api/category.api'
import type { Category } from '@/domain/models/category.model.js'
import type { CategoryInput } from '@/domain/dto/categoy.dto'
import type { ApiResponse } from '@/domain/dto/ApiResponse'

export async function getCategories(): Promise<ApiResponse<Category[]>> {
  return await api.fetchCategories()
}

export async function createCategory(input: CategoryInput): Promise<ApiResponse<Category>> {
  return await api.createCategory(input)
}

export async function updateCategory(id: number, input: CategoryInput): Promise<ApiResponse<Category>> {
  return await api.updateCategory(id, input)
}

export async function deleteCategory(id: number): Promise<ApiResponse<null>> {
  return await api.deleteCategory(id)
}
