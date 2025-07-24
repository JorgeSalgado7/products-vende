import { Injectable } from '@nestjs/common'
import { CategoryRepository } from '../../../infrastructure/repositories/prisma/category.repository'
import { Category } from '../../../domain/category.entity'

@Injectable()
export class UpdateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: number, data: Partial<Omit<Category, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Category | null> {
    return await this.categoryRepository.update(id, data)
  }
}
