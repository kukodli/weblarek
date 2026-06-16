import { IProduct } from '../../types';
import { IEvents } from "../base/Events";

export class Basket {
  constructor(
    protected _products: IProduct[] = [],
    protected events: IEvents,
    
  ) {}

  getSelectedProduct(): IProduct[] {
    return [...this._products];
  }

  addProductInBasket(product: IProduct): void {
    this._products.push(product);
    this.events.emit('basket:changed');
  }

  deleteProductFromBasket(product: IProduct): void {
    const index = this._products.findIndex(item => item.id === product.id);
    if (index !== -1) {
      this._products.splice(index, 1);
    }
    this.events.emit('basket:changed');
  }

  clearBasket(): void {
    this._products = [];
    this.events.emit('basket:changed');
  }

  getPriceSelectedProduct(): number {
    return this._products.reduce(
      (sum, el) => (el.price === null ? sum : sum + el.price), 
      0
    );
  }

  getSumProduct(): number {
    return this._products.length;
  }

  haveProductById(id: string): boolean {
    return this._products.some(el => el.id === id);
  }
}