import Block from '../../core/Block';
import ProfileTemplate from './Profile.hbs';
import Router from '../../core/Router';

import { Form } from '../../components/Form';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import { USER_FIELDS } from '../../consts';
import { Routes } from '../../types';
import { getUser } from '../../services/auth';
import { changeProfile, changePassword, changeAvatar } from '../../services/profile';
import { signOut } from '../../services/auth';
import { connectStore } from '../../core/decorators/connectStore';

class Profile extends Block {
  constructor(props: { isEditable: boolean }) {
    super('div', props);

    this.handleSave = this.handleSave.bind(this);
    this.loadData();
  }

  loadData(): void {
    const { dispatch } = this.props;
    dispatch(getUser);
  }

  handleSave(ev: FormDataEvent) {
    ev.preventDefault();

    const { dispatch } = this.props;
    const formData = ev.formData;
  
    if (!!formData.get('oldPassword') && !!formData.get('newPassword')) {
      const passwordData = new FormData();
      passwordData.append('oldPassword', formData.get('oldPassword'))
      passwordData.append('newPassword', formData.get('newPassword'))
      dispatch(changePassword, passwordData);
    }  else {
      dispatch(changeProfile, formData);
    }

    this.setProps({ isEditable: false });
  }

  togglEditMode(ev: Event) {
    ev.preventDefault();
    this.setProps({ isEditable: true });
  }

  handleSignOut(ev: Event) {
    ev.preventDefault();
    const { dispatch } = this.props;
    dispatch(signOut);
  }

  handleAvatarChange(ev: Event) {
    ev.preventDefault();
    const { dispatch } = this.props;
    const input = document.getElementById("avatar") as HTMLFormElement;
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
        id: 'profile__form',
        buttonLabel: 'Сохранить',
        events: {
          formdata: (ev: Event) => this.handleSave(ev),
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
        className: 'profile__avatar_attacher',
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
