import Block from '../../utils/Block';
import template from './sign_in.hbs';

export class Profile extends Block {
  constructor() {
    super('div');
  }

  render() {
    console.log('Template', template());
    return template({});
  }
}
