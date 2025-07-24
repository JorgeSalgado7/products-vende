import { Injectable } from '@nestjs/common'
import { CategoryRepository } from '../../../infrastructure/repositories/prisma/category.repository'
import { Category } from '../../../domain/category.entity'

@Injectable()
export class GetAllCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(): Promise<Category[]> {
    return await this.categoryRepository.findAll()
  }
}
