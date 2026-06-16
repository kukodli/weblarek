import { IBasket } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

export class BasketView extends Component<IBasket> {
  protected ulElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;
  protected basketPrice: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents){
    super(container);

    this.ulElement = ensureElement<HTMLElement>('.basket__list', this.container);
    this.buttonElement = ensureElement<HTMLButtonElement>('.basket__button', this.container);
    this.basketPrice = ensureElement<HTMLElement>('.basket__price', this.container);

    this.buttonElement.addEventListener('click', () => {
      this.events.emit('basket:submit');
    });
  }

  set items(value: HTMLElement[]) {
    this.ulElement.replaceChildren(...value);
  }

  set sum(value: number) {
    this.basketPrice.textContent = `${value} синапсов`;
  }

  set disabled(value: boolean) {
    this.buttonElement.disabled = value;
  }
}