import { Controller, Post, Body, Get, Param, Put, Delete, ParseIntPipe } from '@nestjs/common'
import { ProductService } from 'src/modules/products/products.service'
import { CreateProductDto } from 'src/modules/products/dto/create-product.dto'
import { UpdateProductDto } from 'src/modules/products/dto/update-product.dto'

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto)
  }

  @Get()
  findAll() {
    return this.productService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id)
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto) {
    return this.productService.update(id, dto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id)
  }
}
