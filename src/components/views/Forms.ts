import { IEvents } from "../base/Events";
import { ensureAllElements, ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';

export abstract class Form<T> extends Component<T> {
  protected inputs: HTMLInputElement[];
  protected textError: HTMLElement;
  protected submitButton: HTMLButtonElement;

  constructor(container: HTMLFormElement, protected events: IEvents){
    super(container);

    this.inputs = ensureAllElements<HTMLInputElement>('.form__input', this.container);
    this.textError = ensureElement<HTMLElement>('.form__errors', this.container);
    this.submitButton = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);

    this.container.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.events.emit(`${container.getAttribute('name')}:submit`);
    });

    this.inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this.events.emit(`${this.container.getAttribute('name')}:change`, {
          field: input.name,
          value: input.value,
        });
      });
    });
  }

  set valid(value: boolean) {
    this.submitButton.disabled = !value;
  }

  set errors(value: string) {
    this.textError.textContent = value;
  }
}