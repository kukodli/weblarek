import { ISuccess, ISuccessActions } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';

export class Success extends Component<ISuccess> {
  protected descriptionElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

  constructor(container: HTMLElement, action?: ISuccessActions){
    super(container);

    this.buttonElement = ensureElement<HTMLButtonElement>('.order-success__close', this.container);
    this.descriptionElement = ensureElement<HTMLElement>('.order-success__description', this.container);

    this.buttonElement.addEventListener('click', () => {
      action?.onClick();
    })
  }

  set content(value: number){
    this.descriptionElement.textContent = `Списано ${value} синапсов`;
  }
}