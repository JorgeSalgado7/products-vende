import { Injectable } from '@nestjs/common'
import { CategoryRepository } from '../../../infrastructure/repositories/prisma/category.repository'
import { Category } from '../../../domain/category.entity'

@Injectable()
export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(data: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category> {
    return await this.categoryRepository.create(data)
  }
}
