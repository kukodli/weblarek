import { Card } from '../views/Card';
import { ensureElement } from '../../utils/utils';
import { ICardActionsDeleteClick, ICardActionsClick } from '../../types/index'

export class CardModal extends Card {
  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;
  protected descriptionElement: HTMLElement;
  protected buttonBuy: HTMLButtonElement;

  constructor(container: HTMLElement, action?: ICardActionsClick & ICardActionsDeleteClick){
    super(container)

    this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
    this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
    this.descriptionElement = ensureElement<HTMLElement>('.card__text', this.container);
    this.buttonBuy = ensureElement<HTMLButtonElement>('.card__button', this.container);
  
    if (action?.onClick)
    this.buttonBuy.addEventListener('click', action.onClick)
  }

  set image(value: string) {
    this.setImage(this.imageElement, value, this.title)
  }

  set category(value: string) {
    this.categoryElement.textContent = value;
  }

  set description(value: string) {
    this.descriptionElement.textContent = value;
  }
}