import Block from '../../core/Block';
import template from './Error.hbs';

export class Error extends Block {
  constructor(props: { error?: string } = {}) {
    super('div', props);
  }

  render() {
    return this.renderTemplate(template, {});
  }
}
