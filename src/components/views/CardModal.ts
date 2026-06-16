import { Card } from '../views/Card';
import { ensureElement } from '../../utils/utils';
import { IActionsClick, CategoryKey, TCardModalView } from '../../types/index';
import { categoryMap, CDN_URL } from '../../utils/constants';


export class CardModal extends Card<TCardModalView> {
  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;
  protected descriptionElement: HTMLElement;
  protected buttonBuy: HTMLButtonElement;

  constructor(container: HTMLElement, action?: IActionsClick){
    super(container)

    this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
    this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
    this.descriptionElement = ensureElement<HTMLElement>('.card__text', this.container);
    this.buttonBuy = ensureElement<HTMLButtonElement>('.card__button', this.container);
  
    if (action?.onClick)
    this.buttonBuy.addEventListener('click', action.onClick)
  }

  set image(value: string) {
    this.setImage(this.imageElement, `${CDN_URL}${value}`, this.titleElement.textContent ?? '');
  }

  set category(value: string) {
    this.categoryElement.textContent = value;

    for (const key in categoryMap) {
      this.categoryElement.classList.toggle(
      categoryMap[key as CategoryKey],
      key === value
      );
    }
  }

  set description(value: string) {
    this.descriptionElement.textContent = value;
  }

  set button(value: string) {
    this.buttonBuy.textContent = value;
  }

  set disabled(value: boolean) {
    this.buttonBuy.disabled = value;
    if (value) {
      this.buttonBuy.textContent = 'Недоступно';
    }
  }
}