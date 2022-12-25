import Block from '../../core/Block';
import ProfileTemplate from './Profile.hbs';

import { Form } from '../../components/Form';

import { USER_FIELDS } from '../../consts';
import { getUser } from '../../services/auth';
import { connectStore } from '../../core/decorators/connectStore';

class Profile extends Block {
  constructor(props: { isEditable: boolean }) {
    super('div', props);

    this.handleSave = this.handleSave.bind(this);
    this.loadData();
  }

  loadData(): void {
    const { user, dispatch } = this.props;
    dispatch(getUser);
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
    const { user, isEditable } = this.props;
    console.log(user);
    const readOnly = !isEditable;
    const fields = USER_FIELDS.map(field => ({
      ...field,
      readOnly,
      value: user && user[field.name]
    }));

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

function mapStateToProps(state) {
  console.log(state);
  return {
    user: state.user
  };
}


export default connectStore(Profile, mapStateToProps);
