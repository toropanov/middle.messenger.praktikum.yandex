import Block from "../../utils/Block";
import template from './Field.hbs';

export class Field extends Block {
  constructor(props: Record<string, unknown> = {}) {
    super('input', props);

  }

  render() {
    return this.renderTemplate(template, this.props);
  }
}
