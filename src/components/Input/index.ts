import Block from "../../core/Block";
import template from './Input.hbs';
import { IInput } from "../../types";

export class Input extends Block {
  constructor(props: IInput) {
    super('div', props);
  }

  render() {
    return this.renderTemplate(template, this.props);
  }
}
