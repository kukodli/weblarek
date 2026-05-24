import { IProduct } from '../../types';

export class ProductCatalog {
  constructor(
    protected _products: IProduct[] = [],
    protected _selectedProduct: IProduct | null = null
  ) {}

  setProducts(products: IProduct[]): void {
    this._products = products;
  }

  getProducts(): IProduct[] {
    return this._products;
  }

  getProductByID(id: string): IProduct | undefined {
    return this._products.find((element) => element.id === id);
  } 

  setSelectedProduct(product: IProduct): void {
    this._selectedProduct = product;
  }
  
  getSelectedProduct(): IProduct | null{
    return this._selectedProduct;
  }
}