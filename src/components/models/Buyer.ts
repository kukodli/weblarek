import { IBuyer, IValidationResult, TPayment } from '../../types';

export class Buyer {
  constructor(
    protected _payment: TPayment = '',
    protected _address: string = '',
    protected _phone: string = '',
    protected _email: string = '',
  ) { }

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
  }

  savePayment(payment: TPayment): void {
    this._payment = payment;
  }

  saveAddress(address: string): void {
    this._address = address;
  }

  savePhone(phone: string): void {
    this._phone = phone;
  }

  saveEmail(email: string): void {
    this._email = email;
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
    const regex = /^\+?[1-9][0-9]{7,14}$/;
    if (this._phone.trim() === '') {
      return {
        isValid: false,
        error: 'Необходимо указать номер телефона'
      }
    } else if (!(regex.test(this._phone.trim()))) {
      return {
        isValid: false,
        error: 'Номер телефона указан некорректно'
      }
    }
    return {
      isValid: true,
    }
  }

  validEmail(): IValidationResult {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (this._email.trim() === '') {
      return {
        isValid: false,
        error: 'Необходимо указать email'
      }
    } else if (!(regex.test(this._email.trim()))) {
      return {
        isValid: false,
        error: 'Необходимо указать корректный email'
      }
    }
    return {
      isValid: true,
    }
  }
}
