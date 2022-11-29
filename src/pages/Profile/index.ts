import Block from '../../utils/Block';

import EditPasswordTemplate from './EditPassword.hbs';
import EditProfileTemplate from './EditProfile.hbs';
import ProfileTemplate from './Profile.hbs';

export class Profile extends Block {
  constructor(path) {
    super('div');

    this.handleSave = this.handleSave.bind(this);
  }

  handleSave() {

  }

  render() {
    console.log('Template', template());
    return template({});
  }
}
