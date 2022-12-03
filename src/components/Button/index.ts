import Block from "../../utils/Block";
import { IButton } from "../../types";
import template from './Button.hbs';

export default class Button extends Block {
  constructor(props: IButton) {
    super('div', props);
  }

  render() {
    return this.renderTemplate(template, this.props);
  }
}
