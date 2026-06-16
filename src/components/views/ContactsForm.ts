import { IContactsForm } from '../../types';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/Events';
import { Form } from './Forms';

export class ContactsForm extends Form<IContactsForm> {
  protected phoneInput: HTMLInputElement;
  protected emailInput: HTMLInputElement;

  constructor(container: HTMLFormElement, events: IEvents){
    super(container, events);

    this.phoneInput = ensureElement<HTMLInputElement>('[name=phone]', this.container);
    this.emailInput = ensureElement<HTMLInputElement>('[name=email]', this.container);
  }

  set email(value: string) {
    this.emailInput.value = value;
  }

  set phone(value: string) {
    this.phoneInput.value = value;
  }
}