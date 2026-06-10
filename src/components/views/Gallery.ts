import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IGallery } from '../../types/index'

export class Gallery extends Component<IGallery> {
protected catalogElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.catalogElement = ensureElement<HTMLElement>('.gallery', this.container);
  }

  set catalog(items: HTMLElement[]) {
    this.catalogElement.innerHTML = '';
    items.forEach(el => 
      this.catalogElement.appendChild(el)
    );
  }
}
