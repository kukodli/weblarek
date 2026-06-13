import { Card } from '../views/Card'
import { ensureElement } from '../../utils/utils';
import { IActionsClick } from '../../types/index'

export class CardCatalog extends Card {
  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;

  constructor(container: HTMLElement, actions?: IActionsClick){
    super(container);

    this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
    this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
    if (actions?.onClick) {
      this.container.addEventListener('click', actions.onClick);
    }
  }

  set image(value: string) {
    this.setImage(this.imageElement, value, this.titleElement.textContent)
  }

  set category(value: string) {
    this.categoryElement.textContent = value;
  }
}