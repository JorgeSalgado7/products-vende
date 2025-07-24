import { Injectable } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { CreateCategoryUseCase } from '../../application/usecases/categories/create-category.usecase'
import { GetAllCategoriesUseCase } from '../../application/usecases/categories/get-all-categories.usecase'
import { GetCategoryByIdUseCase } from '../../application/usecases/categories/get-category-by-id.usecase'
import { UpdateCategoryUseCase } from '../../application/usecases/categories/update-category.usecase'
import { DeleteCategoryUseCase } from '../../application/usecases/categories/delete-category.usecase'
import { notificationResponse } from '../../common/utils/notificationResponse'
import { getErrorMessage } from '../../common/utils/error-handler'

@Injectable()
export class CategoryService {
  constructor(
    private readonly createUseCase: CreateCategoryUseCase,
    private readonly getAllUseCase: GetAllCategoriesUseCase,
    private readonly getByIdUseCase: GetCategoryByIdUseCase,
    private readonly updateUseCase: UpdateCategoryUseCase,
    private readonly deleteUseCase: DeleteCategoryUseCase,
  ) {}

  async create(dto: CreateCategoryDto) {
    try {
      const category = await this.createUseCase.execute(dto)
      return notificationResponse(category, false, null, 201)
    } catch (error: unknown) {
      return notificationResponse(null, true, getErrorMessage(error), 500)
    }
  }

  async findAll() {
    try {
      const categories = await this.getAllUseCase.execute()
      return notificationResponse(categories, false, null, 200)
    } catch (error: unknown) {
      return notificationResponse(null, true, getErrorMessage(error), 500)
    }
  }

  async findOne(id: number) {
    try {
      const category = await this.getByIdUseCase.execute(id)
      if (!category) {
        return notificationResponse(null, true, 'Category not found', 404)
      }
      return notificationResponse(category, false, null, 200)
    } catch (error: unknown) {
      return notificationResponse(null, true, getErrorMessage(error), 500)
    }
  }

  async update(id: number, dto: UpdateCategoryDto) {
    try {
      const updatedCategory = await this.updateUseCase.execute(id, dto)
      return notificationResponse(updatedCategory, false, null, 200)
    } catch (error: unknown) {
      return notificationResponse(null, true, getErrorMessage(error), 500)
    }
  }

  async remove(id: number) {
    try {
      await this.deleteUseCase.execute(id)
      return notificationResponse(null, false, 'Category deleted', 200)
    } catch (error: unknown) {
      return notificationResponse(null, true, getErrorMessage(error), 500)
    }
  }
}
