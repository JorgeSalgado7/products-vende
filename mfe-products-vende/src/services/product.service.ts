import * as api from '@/infrastructure/api/product.api'
import type { Product } from '@/domain/models/product.model'
import type { ProductInput } from '@/domain/dto/product.dto'
import type { ApiResponse } from '@/domain/dto/ApiResponse'

export async function getProducts(): Promise<ApiResponse<Product[]>> {
  return await api.fetchProducts()
}

export async function createProduct(input: ProductInput): Promise<ApiResponse<Product>> {
  return await api.createProduct(input)
}

export async function updateProduct(id: number, input: ProductInput): Promise<ApiResponse<Product>> {
  return await api.updateProduct(id, input)
}

export async function deleteProduct(id: number): Promise<ApiResponse<null>> {
  return await api.deleteProduct(id)
}
