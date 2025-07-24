import { Injectable } from '@nestjs/common'
import { ProductRepository } from '../../../infrastructure/repositories/prisma/product.repository'
import { Product } from '../../../domain/product.entity'

@Injectable()
export class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: number, data: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Product | null> {
    return await this.productRepository.update(id, data)
  }
}
