import { Test, TestingModule } from '@nestjs/testing'
import { ProductService } from './products.service'
import { CreateProductUseCase } from '../../application/usecases/products/create-product.usecase'
import { GetAllProductsUseCase } from '../../application/usecases/products/get-all-products.usecase'
import { GetProductByIdUseCase } from '../../application/usecases/products/get-product-by-id.usecase'
import { UpdateProductUseCase } from '../../application/usecases/products/update-product.usecase'
import { DeleteProductUseCase } from '../../application/usecases/products/delete-product.usecase'
import { notificationResponse } from '../../common/utils/notificationResponse'

describe('ProductService', () => {
  let service: ProductService

  const mockCreateUseCase = { execute: jest.fn() }
  const mockGetAllUseCase = { execute: jest.fn() }
  const mockGetByIdUseCase = { execute: jest.fn() }
  const mockUpdateUseCase = { execute: jest.fn() }
  const mockDeleteUseCase = { execute: jest.fn() }

  beforeEach(async () => {
    jest.clearAllMocks()
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: CreateProductUseCase, useValue: mockCreateUseCase },
        { provide: GetAllProductsUseCase, useValue: mockGetAllUseCase },
        { provide: GetProductByIdUseCase, useValue: mockGetByIdUseCase },
        { provide: UpdateProductUseCase, useValue: mockUpdateUseCase },
        { provide: DeleteProductUseCase, useValue: mockDeleteUseCase },
      ],
    }).compile()

    service = module.get<ProductService>(ProductService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should return success notification on create', async () => {
      const dto = { name: 'Test Product', description: 'desc', categoryId: 1, price: 100, companyId: 1 }

      const created = { id: 1, ...dto }
      mockCreateUseCase.execute.mockResolvedValue(created)

      const result = await service.create(dto)

      expect(mockCreateUseCase.execute).toHaveBeenCalledWith(dto)
      expect(result).toEqual(notificationResponse(created, false, null, 201))
    })

    it('should return error notification on create failure', async () => {
      const error = new Error('Create failed')
      mockCreateUseCase.execute.mockRejectedValue(error)

      const result = await service.create({} as any)

      expect(result.notification.error).toBe(true)
      expect(result.notification.message).toBe('Create failed')
      expect(result.notification.status).toBe(500)
    })
  })

  describe('findAll', () => {
    it('should return success notification on findAll', async () => {
      const products = [{ id: 1, name: 'Prod1' }]
      mockGetAllUseCase.execute.mockResolvedValue(products)

      const result = await service.findAll()

      expect(mockGetAllUseCase.execute).toHaveBeenCalled()
      expect(result).toEqual(notificationResponse(products, false, null, 200))
    })

    it('should return error notification on findAll failure', async () => {
      const error = new Error('FindAll failed')
      mockGetAllUseCase.execute.mockRejectedValue(error)

      const result = await service.findAll()

      expect(result.notification.error).toBe(true)
      expect(result.notification.message).toBe('FindAll failed')
      expect(result.notification.status).toBe(500)
    })
  })

  describe('findOne', () => {
    it('should return success notification when product found', async () => {
      const product = { id: 1, name: 'Prod1' }
      mockGetByIdUseCase.execute.mockResolvedValue(product)

      const result = await service.findOne(1)

      expect(mockGetByIdUseCase.execute).toHaveBeenCalledWith(1)
      expect(result).toEqual(notificationResponse(product, false, null, 200))
    })

    it('should return 404 notification when product not found', async () => {
      mockGetByIdUseCase.execute.mockResolvedValue(null)

      const result = await service.findOne(1)

      expect(result.notification.error).toBe(true)
      expect(result.notification.message).toBe('Product not found')
      expect(result.notification.status).toBe(404)
    })

    it('should return error notification on findOne failure', async () => {
      const error = new Error('FindOne failed')
      mockGetByIdUseCase.execute.mockRejectedValue(error)

      const result = await service.findOne(1)

      expect(result.notification.error).toBe(true)
      expect(result.notification.message).toBe('FindOne failed')
      expect(result.notification.status).toBe(500)
    })
  })

  describe('update', () => {
    it('should return success notification on update', async () => {
      const dto = { name: 'Updated Prod' }
      const updated = { id: 1, ...dto }
      mockUpdateUseCase.execute.mockResolvedValue(updated)

      const result = await service.update(1, dto)

      expect(mockUpdateUseCase.execute).toHaveBeenCalledWith(1, dto)
      expect(result).toEqual(notificationResponse(updated, false, null, 200))
    })

    it('should return error notification on update failure', async () => {
      const error = new Error('Update failed')
      mockUpdateUseCase.execute.mockRejectedValue(error)

      const result = await service.update(1, {} as any)

      expect(result.notification.error).toBe(true)
      expect(result.notification.message).toBe('Update failed')
      expect(result.notification.status).toBe(500)
    })
  })

  describe('remove', () => {
    it('should return success notification on remove', async () => {
      mockDeleteUseCase.execute.mockResolvedValue(undefined)

      const result = await service.remove(1)

      expect(mockDeleteUseCase.execute).toHaveBeenCalledWith(1)
      expect(result).toEqual(notificationResponse(null, false, 'Product deleted', 200))
    })

    it('should return error notification on remove failure', async () => {
      const error = new Error('Delete failed')
      mockDeleteUseCase.execute.mockRejectedValue(error)

      const result = await service.remove(1)

      expect(result.notification.error).toBe(true)
      expect(result.notification.message).toBe('Delete failed')
      expect(result.notification.status).toBe(500)
    })
  })
})
