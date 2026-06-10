import { Card } from '../views/Card'
import { ensureElement } from "../../utils/utils";
import { ICardActionsClick } from '../../types/index'

export class CardCatalog extends Card {
  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;

  constructor(container: HTMLElement,  actions?: ICardActionsClick){
    super(container);

    this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
    this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
    if (actions?.onClick) {
      this.container.addEventListener('click', actions.onClick);
    }
  }

  set image(value: string) {
    this.setImage(this.imageElement, value, this.title)
  }

  set category(value: string) {
    this.categoryElement.textContent = value;
  }
}