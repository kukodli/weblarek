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
        this.events.emit('order:payment-change', { payment: btn.name });
      })
    })
  }

  set address(value: string) {
    this.addressInput.value = value;
  }

  set payment(value: string) {
    const selected = value === 'online'
      ? 'card'
      : value === 'offline'
        ? 'cash'
        : value;

    this.buttons.forEach((btn) => {
      if (btn.name === selected) {
        btn.classList.add('button_alt-active');
      } else {
        btn.classList.remove('button_alt-active');
      }
    });
  }
}