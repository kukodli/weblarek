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