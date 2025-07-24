import { PartialType } from '@nestjs/mapped-types'
import { CreateProductDto } from './create-product.dto'
import { IsString, IsNumber, IsOptional } from 'class-validator'

export class UpdateProductDto extends PartialType(CreateProductDto) {

	@IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsOptional()
  companyId?: number;

}
