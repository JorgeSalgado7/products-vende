import { Injectable } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { CreateProductUseCase } from '../../application/usecases/products/create-product.usecase'
import { GetAllProductsUseCase } from '../../application/usecases/products/get-all-products.usecase'
import { GetProductByIdUseCase } from '../../application/usecases/products/get-product-by-id.usecase'
import { UpdateProductUseCase } from '../../application/usecases/products/update-product.usecase'
import { DeleteProductUseCase } from '../../application/usecases/products/delete-product.usecase'
import { notificationResponse } from '../../common/utils/notificationResponse'
import { getErrorMessage } from '../../common/utils/error-handler'

@Injectable()
export class ProductService {
  constructor(
    private readonly createUseCase: CreateProductUseCase,
    private readonly getAllUseCase: GetAllProductsUseCase,
    private readonly getByIdUseCase: GetProductByIdUseCase,
    private readonly updateUseCase: UpdateProductUseCase,
    private readonly deleteUseCase: DeleteProductUseCase,
  ) {}

  async create(dto: CreateProductDto) {
    try {
      const product = await this.createUseCase.execute(dto)
      return notificationResponse(product, false, null, 201)
    } catch (error: unknown) {
      return notificationResponse(null, true, getErrorMessage(error), 500)
    }
  }

  async findAll() {
    try {
      const products = await this.getAllUseCase.execute()
      return notificationResponse(products, false, null, 200)
    } catch (error: unknown) {
      return notificationResponse(null, true, getErrorMessage(error), 500)
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.getByIdUseCase.execute(id)
      if (!product) {
        return notificationResponse(null, true, 'Product not found', 404)
      }
      return notificationResponse(product, false, null, 200)
    } catch (error: unknown) {
      return notificationResponse(null, true, getErrorMessage(error), 500)
    }
  }

  async update(id: number, dto: UpdateProductDto) {
    try {
      const updatedProduct = await this.updateUseCase.execute(id, dto)
      return notificationResponse(updatedProduct, false, null, 200)
    } catch (error: unknown) {
      return notificationResponse(null, true, getErrorMessage(error), 500)
    }
  }

  async remove(id: number) {
    try {
      await this.deleteUseCase.execute(id)
      return notificationResponse(null, false, 'Product deleted', 200)
    } catch (error: unknown) {
      return notificationResponse(null, true, getErrorMessage(error), 500)
    }
  }
}
