import { Module } from '@nestjs/common'
import { CategoryService } from './categories.service'
import { CategoryController } from './categories.controller'
import { CreateCategoryUseCase } from 'src/application/usecases/categories/create-category.usecase'
import { GetAllCategoriesUseCase } from 'src/application/usecases/categories/get-all-categories.usecase'
import { GetCategoryByIdUseCase } from 'src/application/usecases/categories/get-category-by-id.usecase'
import { UpdateCategoryUseCase } from 'src/application/usecases/categories/update-category.usecase'
import { DeleteCategoryUseCase } from 'src/application/usecases/categories/delete-category.usecase'
import { CategoryRepository } from 'src/infrastructure/repositories/prisma/category.repository'
import { PrismaService } from 'src/prisma/prisma.service'

@Module({
  controllers: [CategoryController],
  providers: [
		PrismaService,
    CategoryService,
    CategoryRepository,
    CreateCategoryUseCase,
    GetAllCategoriesUseCase,
    GetCategoryByIdUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
  ],
})
export class CategoryModule {}
