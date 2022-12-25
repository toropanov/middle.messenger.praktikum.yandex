import Block from '../../core/Block';
import ProfileTemplate from './Profile.hbs';
import Router from '../../core/Router';

import { Form } from '../../components/Form';
import { Button } from '../../components/Button';

import { USER_FIELDS } from '../../consts';
import { Routes } from '../../types';
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
    this.setProps({ isEditable: false });
  }

  togglEditMode(ev) {
    ev.preventDefault();
    this.setProps({ isEditable: true });
  }

  handleSignOut(ev) {
    ev.preventDefault();
    Router.go(Routes.SIGN_IN);
  }

  handleBack(ev) {
    ev.preventDefault();
    const { isEditable } = this.props;

    if (isEditable) {
      this.setProps({ isEditable: false });
    } else {
      Router.go(Routes.CHAT);
    }
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
      profileEditButton: new Button({
        label: 'Изменить данные',
        events: {
          click: (ev: Event) => this.togglEditMode(ev),
        },
      }),
      backButton: new Button({
        label: '<',
        events: {
          click: (ev: Event) => this.handleBack(ev),
        },
      }),
      signOutButton: new Button({
        label: 'Выйти из аккаунта',
        events: {
          click: (ev: Event) => this.handleSignOut(ev),
        },
      })
    });
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    user: state.user,
    isEditable: false
  };
}


export default connectStore(Profile, mapStateToProps);
