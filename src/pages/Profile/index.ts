import Block from '../../core/Block';
import ProfileTemplate from './Profile.hbs';

import { Form } from '../../components/Form';

import { USER_FIELDS } from '../../consts';
import { user } from '../../data';

export class Profile extends Block {
  constructor(props: { isEditable: boolean }) {
    super('div', props);

    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(ev: Event) {
    ev.preventDefault();
    
    const {
      email,
      login,
      first_name,
      second_name,
      phone,
      password,
      password_confirm,
    } = ev.target as HTMLFormElement;

    console.log({
      DATA: ev.target,
      email: email.value,
      login: login.value,
      first_name: first_name.value,
      second_name: second_name.value,
      phone: phone.value,
      password: password.value,
      password_confirm: password_confirm.value,
    });
  }

  render() {
    const { isEditable } = this.props;
    const readOnly = !isEditable;
    const fields = readOnly ? USER_FIELDS.map(field => ({ ...field, readOnly })) : USER_FIELDS;

    return this.renderTemplate(ProfileTemplate, {
      readOnly,
      user,
      inputs: new Form({
        buttonLabel: 'Сохранить',
        events: {
          submit: (ev: Event) => this.handleSave(ev),
        },
        fields,
        readOnly,
      }),
    });
  }
}
