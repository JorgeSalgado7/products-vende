import { Injectable } from '@nestjs/common'
import { ProductRepository } from '../../../infrastructure/repositories/prisma/product.repository'
import { Product } from '../../../domain/product.entity'

@Injectable()
export class GetAllProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<Product[]> {
    return await this.productRepository.findAll()
  }
}
