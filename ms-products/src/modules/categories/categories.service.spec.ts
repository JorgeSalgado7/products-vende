import { Test, TestingModule } from '@nestjs/testing'
import { CategoryService } from './categories.service'
import { CreateCategoryUseCase } from '../../application/usecases/categories/create-category.usecase'
import { GetAllCategoriesUseCase } from '../../application/usecases/categories/get-all-categories.usecase'
import { GetCategoryByIdUseCase } from '../../application/usecases/categories/get-category-by-id.usecase'
import { UpdateCategoryUseCase } from '../../application/usecases/categories/update-category.usecase'
import { DeleteCategoryUseCase } from '../../application/usecases/categories/delete-category.usecase'

describe('CategoryService', () => {
  let service: CategoryService

  const mockCreateUseCase = { execute: jest.fn() }
  const mockGetAllUseCase = { execute: jest.fn() }
  const mockGetByIdUseCase = { execute: jest.fn() }
  const mockUpdateUseCase = { execute: jest.fn() }
  const mockDeleteUseCase = { execute: jest.fn() }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        { provide: CreateCategoryUseCase, useValue: mockCreateUseCase },
        { provide: GetAllCategoriesUseCase, useValue: mockGetAllUseCase },
        { provide: GetCategoryByIdUseCase, useValue: mockGetByIdUseCase },
        { provide: UpdateCategoryUseCase, useValue: mockUpdateUseCase },
        { provide: DeleteCategoryUseCase, useValue: mockDeleteUseCase },
      ],
    }).compile()

    service = module.get<CategoryService>(CategoryService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should return created category with notification on success', async () => {
    const dto = { name: 'Test Category', parentCategoryId: null }
    mockCreateUseCase.execute.mockResolvedValue(dto)
    
    const result = await service.create(dto)
    
    expect(mockCreateUseCase.execute).toHaveBeenCalledWith(dto)
    expect(result.data).toEqual(dto)
    expect(result.notification.error).toBe(false)
    expect(result.notification.status).toBe(201)
    expect(result.notification.message).toBeNull()
  })

  it('should return categories with notification on success', async () => {
    const categories = [{ name: 'Cat1' }]
    mockGetAllUseCase.execute.mockResolvedValue(categories)

    const result = await service.findAll()

    expect(mockGetAllUseCase.execute).toHaveBeenCalled()
    expect(result.data).toEqual(categories)
    expect(result.notification.error).toBe(false)
    expect(result.notification.status).toBe(200)
    expect(result.notification.message).toBeNull()
  })

  it('should return category by id with notification on success', async () => {
    const category = { id: 1, name: 'Cat1' }
    mockGetByIdUseCase.execute.mockResolvedValue(category)

    const result = await service.findOne(1)

    expect(mockGetByIdUseCase.execute).toHaveBeenCalledWith(1)
    expect(result.data).toEqual(category)
    expect(result.notification.error).toBe(false)
    expect(result.notification.status).toBe(200)
    expect(result.notification.message).toBeNull()
  })

  it('should return 404 notification if category not found', async () => {
    mockGetByIdUseCase.execute.mockResolvedValue(null)

    const result = await service.findOne(999)

    expect(mockGetByIdUseCase.execute).toHaveBeenCalledWith(999)
    expect(result.data).toBeNull()
    expect(result.notification.error).toBe(true)
    expect(result.notification.status).toBe(404)
    expect(result.notification.message).toBe('Category not found')
  })

  it('should return updated category with notification on success', async () => {
    const dto = { name: 'Updated Cat' }
    mockUpdateUseCase.execute.mockResolvedValue(dto)

    const result = await service.update(1, dto)

    expect(mockUpdateUseCase.execute).toHaveBeenCalledWith(1, dto)
    expect(result.data).toEqual(dto)
    expect(result.notification.error).toBe(false)
    expect(result.notification.status).toBe(200)
    expect(result.notification.message).toBeNull()
  })

  it('should return notification after successful delete', async () => {
    mockDeleteUseCase.execute.mockResolvedValue(undefined)

    const result = await service.remove(1)

    expect(mockDeleteUseCase.execute).toHaveBeenCalledWith(1)
    expect(result.data).toBeNull()
    expect(result.notification.error).toBe(false)
    expect(result.notification.status).toBe(200)
    expect(result.notification.message).toBe('Category deleted')
  })

  // Optional: tests for error handling (simulate throwing)
  it('should return error notification on create failure', async () => {
    mockCreateUseCase.execute.mockRejectedValue(new Error('Create error'))

    const result = await service.create({ name: 'fail' })

    expect(result.data).toBeNull()
    expect(result.notification.error).toBe(true)
    expect(result.notification.status).toBe(500)
    expect(result.notification.message).toBe('Create error')
  })

  it('should return error notification on findAll failure', async () => {
    mockGetAllUseCase.execute.mockRejectedValue(new Error('FindAll error'))

    const result = await service.findAll()

    expect(result.data).toBeNull()
    expect(result.notification.error).toBe(true)
    expect(result.notification.status).toBe(500)
    expect(result.notification.message).toBe('FindAll error')
  })

  it('should return error notification on findOne failure', async () => {
    mockGetByIdUseCase.execute.mockRejectedValue(new Error('FindOne error'))

    const result = await service.findOne(1)

    expect(result.data).toBeNull()
    expect(result.notification.error).toBe(true)
    expect(result.notification.status).toBe(500)
    expect(result.notification.message).toBe('FindOne error')
  })

  it('should return error notification on update failure', async () => {
    mockUpdateUseCase.execute.mockRejectedValue(new Error('Update error'))

    const result = await service.update(1, { name: 'fail' })

    expect(result.data).toBeNull()
    expect(result.notification.error).toBe(true)
    expect(result.notification.status).toBe(500)
    expect(result.notification.message).toBe('Update error')
  })

  it('should return error notification on remove failure', async () => {
    mockDeleteUseCase.execute.mockRejectedValue(new Error('Delete error'))

    const result = await service.remove(1)

    expect(result.data).toBeNull()
    expect(result.notification.error).toBe(true)
    expect(result.notification.status).toBe(500)
    expect(result.notification.message).toBe('Delete error')
  })
})
