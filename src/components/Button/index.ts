import Block from "../../core/Block";
import template from './Button.hbs';
import { IButton } from "../../types";

export class Button extends Block {
  constructor(props: IButton) {
    super('div', props);
  }

  render() {
    return this.renderTemplate(template, this.props);
  }
}
