import Block from "../../core/Block";
// @ts-ignore
import template from './Button.hbs';
import { IButton } from "../../types";

console.log('BUTTON TEMPLATE', template)

export class Button extends Block {
  constructor(props: IButton) {
    super('div', props);
  }

  render() {
    return this.renderTemplate(template, this.props);
  }
}
