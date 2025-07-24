import { PrismaService } from '../../../prisma/prisma.service'
import { Category } from '../../../domain/category.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CategoryRepository {
	
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category> {
    const created = await this.prisma.category.create({ data })
    return new Category(
      created.id,
      created.name,
      created.createdAt,
      created.updatedAt,
      created.parentCategoryId,
    )
  }

  async update(id: number, data: Partial<Omit<Category, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Category | null> {
    const updated = await this.prisma.category.update({
      where: { id },
      data,
    })
    return updated
      ? new Category(
          updated.id,
          updated.name,
          updated.createdAt,
          updated.updatedAt,
					updated.parentCategoryId,
        )
      : null
  }

  async delete(id: number): Promise<void> {
    await this.prisma.category.delete({ where: { id } })
  }

  async findById(id: number): Promise<Category | null> {
    const found = await this.prisma.category.findUnique({ where: { id } })
    return found
      ? new Category(
          found.id,
          found.name,
          found.createdAt,
          found.updatedAt,
					found.parentCategoryId,
        )
      : null
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany()
    return categories.map(
      (c) =>
        new Category(c.id, c.name, c.createdAt, c.updatedAt,  c.parentCategoryId),
    )
  }
}
