import { Injectable } from '@nestjs/common'
import { CategoryRepository } from '../../../infrastructure/repositories/prisma/category.repository'

@Injectable()
export class DeleteCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: number): Promise<void> {
    await this.categoryRepository.delete(id)
  }
}
