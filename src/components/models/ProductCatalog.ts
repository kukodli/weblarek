import { IProduct } from '../../types';
import { IEvents } from "../base/Events";


export class ProductCatalog {
  constructor(
    protected _products: IProduct[] = [],
    protected _selectedProduct: IProduct | null = null,
    protected events: IEvents,
  ) {}

  setProducts(products: IProduct[]): void {
    this._products = products;
    this.events.emit('catalog:changed');
  }

  getProducts(): IProduct[] {
    return this._products;
  }

  getProductByID(id: string): IProduct | undefined {
    return this._products.find((element) => element.id === id);
  } 

  setSelectedProduct(product: IProduct): void {
    this._selectedProduct = product;
    this.events.emit('catalog:changed');
  }
  
  getSelectedProduct(): IProduct | null{
    return this._selectedProduct;
  }
}