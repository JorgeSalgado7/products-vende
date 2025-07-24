import { Module } from '@nestjs/common'
import { CategoryModule } from './modules/categories/categories.module'
import { ProductModule } from './modules/products/products.module'

@Module({
  imports: [CategoryModule, ProductModule],
})
export class AppModule {}
