import Block from '../../utils/Block';
import template from './Chat.hbs';

export class Chat extends Block {
  constructor() {
    super('div');
  }

  render() {
    console.log('Template', template());
    return template({});
  }
}
