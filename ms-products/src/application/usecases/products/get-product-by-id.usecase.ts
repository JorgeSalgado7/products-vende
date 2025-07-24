import { Injectable } from '@nestjs/common'
import { ProductRepository } from '../../../infrastructure/repositories/prisma/product.repository'
import { Product } from '../../../domain/product.entity'

@Injectable()
export class GetProductByIdUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: number): Promise<Product | null> {
    return await this.productRepository.findById(id)
  }
}
