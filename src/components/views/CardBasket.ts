import { Card } from '../views/Card';
import { ensureElement } from '../../utils/utils';
import { IActionsDeleteClick } from '../../types/index'

export class CardBasket extends Card {
  protected buttonDelete: HTMLButtonElement;
  protected indexElement: HTMLElement;

  constructor(container: HTMLElement, actions?: IActionsDeleteClick){
    super(container);

    this.buttonDelete = ensureElement<HTMLButtonElement>('.card__button', this.container);
    this.indexElement = ensureElement<HTMLElement>('.basket__item-index', this.container);

    if (actions?.onDeleteClick) {
      this.buttonDelete.addEventListener('click', actions.onDeleteClick);
    }
  }

  set index(value: number) {
    this.indexElement.textContent = String(value);
  }
}