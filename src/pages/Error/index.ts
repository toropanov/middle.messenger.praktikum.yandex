import Block from '../../utils/Block';
import template from './Error.hbs';

export class Error extends Block {
  constructor(error) {
    super('div');
  }

  render() {
    console.log('Template', template());
    return template({});
  }
}
