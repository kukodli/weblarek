import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IModal, IModalActions } from '../../types/index'

export class Modal extends Component<IModal>{
  protected modalClose: HTMLButtonElement;
  protected modalContent: HTMLElement;

  constructor(container: HTMLElement, actions?: IModalActions){
    super(container);

    this.modalClose = ensureElement<HTMLButtonElement>('.modal__close', this.container);
    this.modalContent = ensureElement<HTMLElement>('.modal__content', this.container);

    this.modalClose.addEventListener('click', () => {
      this.close();
      actions?.onClose();
    });

    this.container.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        this.close();
        actions?.onClose();
      }
    })
  }

  protected handleEsc = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  open() {
    this.container.classList.add('modal_active');
    document.addEventListener('keydown', this.handleEsc);
  }

  close() {
    this.container.classList.remove('modal_active');
    document.removeEventListener('keydown', this.handleEsc);
  }

  set content(value: HTMLElement) {
    this.modalContent.replaceChildren(value);
  }
}