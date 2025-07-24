import { IsString, IsNotEmpty, IsNumber, IsPositive, IsInt } from 'class-validator'

export class CreateProductDto {
	
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsNumber()
  @IsPositive()
  price: number

  @IsInt()
  categoryId: number

	@IsNumber()
  companyId: number;

}
