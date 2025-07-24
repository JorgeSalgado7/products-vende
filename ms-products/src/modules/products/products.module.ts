import { Module } from '@nestjs/common'
import { ProductService } from 'src/modules/products/products.service'
import { ProductController } from 'src/modules/products/products.controller'
import { CreateProductUseCase } from 'src/application/usecases/products/create-product.usecase'
import { GetAllProductsUseCase } from 'src/application/usecases/products/get-all-products.usecase'
import { GetProductByIdUseCase } from 'src/application/usecases/products/get-product-by-id.usecase'
import { UpdateProductUseCase } from 'src/application/usecases/products/update-product.usecase'
import { DeleteProductUseCase } from 'src/application/usecases/products/delete-product.usecase'
import { ProductRepository } from 'src/infrastructure/repositories/prisma/product.repository'
import { PrismaService } from 'src/prisma/prisma.service'

@Module({
  controllers: [ProductController],
  providers: [
		PrismaService,
    ProductService,
    ProductRepository,
    CreateProductUseCase,
    GetAllProductsUseCase,
    GetProductByIdUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
  ],
})
export class ProductModule {}
