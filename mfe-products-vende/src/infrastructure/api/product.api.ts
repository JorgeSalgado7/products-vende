import { api } from './axios'
import type { Product } from '@/domain/models/product.model'
import type { ProductInput } from '@/domain/dto/product.dto'
import type { ApiResponse } from '@/domain/dto/ApiResponse'

export async function fetchProducts(): Promise<ApiResponse<Product[]>> {
  const res = await api.get('/products')
  return res.data
}

export async function fetchProduct(id: number): Promise<ApiResponse<Product>> {
  const res = await api.get(`/products/${id}`)
  return res.data
}

export async function createProduct(data: ProductInput): Promise<ApiResponse<Product>> {
  const res = await api.post('/products', data)
  return res.data
}

export async function updateProduct(id: number, data: ProductInput): Promise<ApiResponse<Product>> {
  const res = await api.put(`/products/${id}`, data)
  return res.data
}

export async function deleteProduct(id: number): Promise<ApiResponse<null>> {
  const res = await api.delete(`/products/${id}`)
  return res.data
}
