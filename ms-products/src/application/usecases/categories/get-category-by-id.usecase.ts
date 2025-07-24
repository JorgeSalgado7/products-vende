import { Injectable } from '@nestjs/common'
import { CategoryRepository } from '../../../infrastructure/repositories/prisma/category.repository'
import { Category } from '../../../domain/category.entity'

@Injectable()
export class GetCategoryByIdUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: number): Promise<Category | null> {
    return await this.categoryRepository.findById(id)
  }
}
