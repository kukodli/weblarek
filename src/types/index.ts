import { categoryMap } from '../utils/constants';

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
export type TPayment = 'online' | 'offline';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
    id: string,
    title: string,
    image: string,
    category: string,
    price: number | null,
    description: string,
}

export type TCardCatalogView = Pick<
    IProduct,
    'title' |
    'price' |
    'image' |
    'category'
>

export type TCardModalView = Pick<
    IProduct,
    'title' |
    'price' |
    'image' |
    'category' |
    'description'
>

export type TCardBasketView = Pick<
    IProduct,
    'title' |
    'price'
    > & {index: number}

export interface IOrderForm extends Pick<IBuyer, 'address' | 'payment'>{
    valid: boolean,
    errors: string,
}

export interface IContactsForm extends Pick<IBuyer, 'email' | 'phone'> {
  valid: boolean;
  errors: string;
}
export interface IBuyer {
    payment: TPayment | '',
    address: string,
    email: string,
    phone: string,
}

export interface IValidationResult {
    isValid: boolean;
    error?: string;
}

export interface IGetProducts {
    total: number,
    items: IProduct[],
}

export interface IPostOrderAnswer {
    id: string,
    total: number,
}

export interface IPostOrderBody extends Omit<IBuyer, 'payment'> {
    payment: TPayment;
    total: number;
    items: string[];
}

export interface IGallery {
    catalog: HTMLElement[];
}

export interface IHeader {
    counter: number;
}

export interface IModal {
    content: HTMLElement;
}

export type TCardCatalog = Pick<IProduct, 'image' | 'category'>

export interface IActionsClick {
  onClick: (event: MouseEvent) => void;
}

export interface IActionsDeleteClick {
  onDeleteClick: (event: MouseEvent) => void;
}

export interface IModalActions {
  onClose: () => void;
}

export interface ISuccessActions {
  onClick: () => void;
}

export interface ISuccess {
  total: number;
}

export interface IBasket {
    items: HTMLElement[];
    sum: number;
}

export type CategoryKey = keyof typeof categoryMap;
