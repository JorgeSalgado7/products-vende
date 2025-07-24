import { PrismaService } from '../../../prisma/prisma.service'
import { Product } from '../../../domain/product.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    const created = await this.prisma.product.create({
      data,
    })
    return new Product(
      created.id,
      created.name,
      created.description,
      created.price,
      created.categoryId,
			created.companyId,
      created.createdAt,
      created.updatedAt,
    )
  }

  async update(id: number, data: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Product | null> {
    const updated = await this.prisma.product.update({
      where: { id },
      data,
    })
    return updated
      ? new Product(
          updated.id,
          updated.name,
          updated.description,
          updated.price,
          updated.categoryId,
					updated.companyId,
          updated.createdAt,
          updated.updatedAt,
        )
      : null
  }

  async delete(id: number): Promise<void> {
    await this.prisma.product.delete({ where: { id } })
  }

  async findById(id: number): Promise<Product | null> {
    const found = await this.prisma.product.findUnique({ where: { id } })
    return found
      ? new Product(
          found.id,
          found.name,
          found.description,
          found.price,
          found.categoryId,
					found.companyId,
          found.createdAt,
          found.updatedAt,
        )
      : null
  }

  async findAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany()
    return products.map(
      (p) =>
        new Product(p.id, p.name, p.description, p.price, p.categoryId, p.companyId, p.createdAt, p.updatedAt),
    )
  }
}
