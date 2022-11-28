import Block from '../../utils/Block';

import EditPasswordTemplate from './EditPassword.hbs';
import EditProfileTemplate from './EditProfile.hbs';
import ProfileTemplate from './Profile.hbs';
import SignInTemplate from './SignIn.hbs';
import SignOutTemplate from './SignOut.hbs';

export class Profile extends Block {
  constructor(path) {
    super('div');
  }

  render() {
    console.log('Template', template());
    return template({});
  }
}
