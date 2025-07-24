import { api } from './axios'
import type { Category } from '@/domain/models/category.model.js'
import type { CategoryInput } from '@/domain/dto/categoy.dto'
import type { ApiResponse } from '@/domain/dto/ApiResponse'

export async function fetchCategories(): Promise<ApiResponse<Category[]>> {
  const res = await api.get('/categories')
  return res.data
}

export async function fetchCategory(id: number): Promise<ApiResponse<Category>> {
  const res = await api.get(`/categories/${id}`)
  return res.data
}

export async function createCategory(data: CategoryInput): Promise<ApiResponse<Category>> {
  console.log(data)
	const res = await api.post('/categories', data)
  return res.data
}

export async function updateCategory(id: number, data: CategoryInput): Promise<ApiResponse<Category>> {
  const res = await api.put(`/categories/${id}`, data)
  return res.data
}

export async function deleteCategory(id: number): Promise<ApiResponse<null>> {
  const res = await api.delete(`/categories/${id}`)
  return res.data
}
