export class Product {

  constructor(
    public readonly id: number,
    public name: string,
    public description: string,
    public price: number,
    public categoryId: number,
		public companyId: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
	
}
