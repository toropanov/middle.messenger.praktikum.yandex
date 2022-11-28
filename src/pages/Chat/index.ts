import Block from '../../utils/Block';
import template from './Chat.hbs';

import { chains, messages } from '../../data';

export class Chat extends Block {
  constructor() {
    super('div');
  }

  render() {
    console.log('Template', template());
    return template({
      chains,
      messages
    });
  }
}
