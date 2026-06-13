import { IBasket, IActionsClick } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';

export class BasketView extends Component<IBasket> {
  protected ulElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;
  protected basketPrice: HTMLElement;

  constructor(container: HTMLElement, action?: IActionsClick){
    super(container);

    this.ulElement = ensureElement<HTMLElement>('.basket__list', this.container);
    this.buttonElement = ensureElement<HTMLButtonElement>('.basket__button', this.container);
    this.basketPrice = ensureElement<HTMLElement>('.basket__price', this.container);

    if (action?.onClick){
    this.buttonElement.addEventListener('click', action.onClick)};
  }

  set items(value: HTMLElement[]) {
    this.ulElement.replaceChildren(...value);
  }

  set sum(value: number) {
    this.basketPrice.textContent = `${value} синапсов`;
  }
}