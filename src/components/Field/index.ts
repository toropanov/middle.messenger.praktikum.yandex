import Block from "../../core/Block";
import template from './Field.hbs';
import { IInput } from "../../types";

export class Field extends Block {
  constructor(props: IInput) {
    super('input', props);

  }

  render() {
    return this.renderTemplate(template, this.props);
  }
}
