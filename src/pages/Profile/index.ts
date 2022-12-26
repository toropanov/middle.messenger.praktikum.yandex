import Block from '../../core/Block';
import ProfileTemplate from './Profile.hbs';
import Router from '../../core/Router';

import { Form } from '../../components/Form';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import { USER_FIELDS } from '../../consts';
import { Routes } from '../../types';
import { getUser } from '../../services/auth';
import { changeProfile, changeAvatar } from '../../services/profile';
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

    const { dispatch } = this.props;
    
    const {
      email,
      login,
      display_name,
      first_name,
      second_name,
      phone,
      password,
      password_confirm,
    } = ev.target as HTMLFormElement;

    dispatch(changeProfile, {
      email: email.value,
      login: login.value,
      display_name: display_name.value,
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

  handleAvatarChange(ev) {
    ev.preventDefault();
    const { dispatch } = this.props;
    const input = document.getElementById("avatar");
    dispatch(changeAvatar, input!.files[0]);
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
      avatarUploader: new Input({
        name: 'avatar',
        type: 'file',
        events: {
          change: (ev: Event) => this.handleAvatarChange(ev),
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
