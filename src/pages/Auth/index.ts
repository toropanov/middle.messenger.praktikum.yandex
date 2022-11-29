import Block from '../../utils/Block';
import signInTemplate from './SignIn.hbs';
import signUpTemplate from './SignUp.hbs';

export class Auth extends Block {
  constructor(path) {
    super('div');
  }

  render() {
    return signInTemplate({
      onSubmit: () => 23
    });
  }
}
