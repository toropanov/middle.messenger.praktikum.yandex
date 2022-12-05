import Block from "../../utils/Block";
import template from './Button.hbs';

export class Button extends Block {
  constructor(props: Record<string, unknown> = {}) {
    super('div', props);
  }

  render() {
    return this.renderTemplate(template, this.props);
  }
}
