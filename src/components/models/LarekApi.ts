import {
  IApi,
  IGetProducts,
  IPostOrderAnswer,
  IPostOrderBody,
} from '../../types';

export class LarekApi {
  constructor(protected _api: IApi) {}

  getListProducts(): Promise<IGetProducts> {
    return this._api.get<IGetProducts>('/product/');
  }

  postOrder(order: IPostOrderBody): Promise<IPostOrderAnswer> {
    return this._api.post<IPostOrderAnswer>('/order', order);
  }
}
