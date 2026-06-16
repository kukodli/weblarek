import { IOrderForm } from '../../types';
import { ensureAllElements, ensureElement } from '../../utils/utils';
import { IEvents } from '../base/Events';
import { Form } from './Forms';

export class OrderForm extends Form<IOrderForm > {
  protected buttons: HTMLButtonElement[];
  protected addressInput: HTMLInputElement;

  constructor(container: HTMLFormElement, events: IEvents){
    super(container, events);

    this.addressInput = ensureElement<HTMLInputElement>('[name = address]', this.container);
    this.buttons = ensureAllElements<HTMLButtonElement>('.button_alt', this.container);
    this.buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.payment = btn.name;
        this.events.emit('order:payment-change', { payment: btn.name });
      })
    })
  }

  set address(value: string) {
    this.addressInput.value = value;
  }

  set payment(value: string) {
    this.buttons.forEach((btn) => {
      if (btn.name === value) {
        btn.classList.add('button_alt-active');
      } else {
        btn.classList.remove('button_alt-active');
      }
    });
  }
}