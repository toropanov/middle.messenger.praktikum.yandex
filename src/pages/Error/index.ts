import Block from '../../utils/Block';
import template from './Error.hbs';

export class Error extends Block {
  constructor(props: Record<string, unknown> = {}) {
    super('div', props);
  }

  render() {
    return this.renderTemplate(template, {});
  }
}
