import { IProduct } from '../../types';

export class Basket {
  constructor(
    protected _products: IProduct[] = [],
  ) {}

  getSelectedProduct(): IProduct[] {
    return [...this._products];
  }

  addProductInBasket(product: IProduct): void {
    this._products.push(product);
  }

  deleteProductFromBasket(product: IProduct): void {
    const index = this._products.findIndex(item => item.id === product.id);
    if (index !== -1) {
      this._products.splice(index, 1);
    }
  }

  clearBasket(): void {
    this._products = [];
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
    const result = this._products.find(el => el.id === id);
    if (result) {
      return true;
    } else {
      return false;
    }
  }
}