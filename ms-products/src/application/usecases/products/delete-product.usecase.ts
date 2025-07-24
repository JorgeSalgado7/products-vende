import { Injectable } from '@nestjs/common'
import { ProductRepository } from '../../../infrastructure/repositories/prisma/product.repository'

@Injectable()
export class DeleteProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: number): Promise<void> {
    await this.productRepository.delete(id)
  }
}
