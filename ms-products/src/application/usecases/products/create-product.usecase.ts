import { Injectable } from '@nestjs/common'
import { ProductRepository } from '../../../infrastructure/repositories/prisma/product.repository'
import { Product } from '../../../domain/product.entity'

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    return await this.productRepository.create(data)
  }
}
