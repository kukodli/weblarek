import { IBuyer, IValidationResult, TPayment } from '../../types';
import { IEvents } from "../base/Events";


export class Buyer {
  constructor(
    protected _payment: TPayment | '' = '',
    protected _address: string = '',
    protected _phone: string = '',
    protected _email: string = '',
    protected events: IEvents,
  ) {}

  getBuyerDetails(): IBuyer {
    return {
      payment: this._payment,
      address: this._address,
      phone: this._phone,
      email: this._email,
    }
  }

  clearBuyerDetails(): void {
    this._address = '';
    this._email = '';
    this._payment = '';
    this._phone = '';
    this.events.emit('buyer:changed');
  }

  savePayment(payment: TPayment): void {
    this._payment = payment;
    this.events.emit('buyer:changed');
  }

  saveAddress(address: string): void {
    this._address = address;
    this.events.emit('buyer:changed');
  }

  savePhone(phone: string): void {
    this._phone = phone;
    this.events.emit('buyer:changed');
  }

  saveEmail(email: string): void {
    this._email = email;
    this.events.emit('buyer:changed');
  }

  validPayment(): IValidationResult {
    if (this._payment === '') {
      return {
        isValid: false,
        error: 'Необходимо выбрать способ оплаты'
      }
    }
    return {
      isValid: true,
    }
  }

  validAddress(): IValidationResult {
    if (this._address.trim() === '') {
      return {
        isValid: false,
        error: 'Необходимо указать адрес'
      }
    }
    return {
      isValid: true,
    }
  }

  validPhone(): IValidationResult {
    if (this._phone.trim() === '') {
      return {
        isValid: false,
        error: 'Необходимо указать номер телефона'
      }
    }
    return {
      isValid: true,
    }
  }

  validEmail(): IValidationResult {
    if (this._email.trim() === '') {
      return {
        isValid: false,
        error: 'Необходимо указать email'
      }
    }
    return {
      isValid: true,
    }
  }
}
