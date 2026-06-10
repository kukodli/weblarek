import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IAbstractCard} from '../../types/index'

export abstract class Card extends Component<IAbstractCard> {

  protected titleElement: HTMLElement;
  protected priceElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);
    this.titleElement = ensureElement<HTMLElement>('.card__title', this.container);
    this.priceElement = ensureElement<HTMLElement>('.card__price', this.container);
  }

  set title(value: string) {
    this.titleElement.textContent = value;
  }

  set price(value: number) {
    this.priceElement.textContent = String(value);
  }
}