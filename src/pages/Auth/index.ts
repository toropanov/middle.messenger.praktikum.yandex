import Block from '../../core/Block';
import authTemplate from './Auth.hbs';

import { Button } from '../../components/Button';
import { Form } from '../../components/Form';

import { USER_FIELDS, SIGN_IN_FIELDS } from '../../consts';
import { Popup } from '../../components/Popup';

import { connectStore } from '../../core/decorators/connectStore';
import {
  signin,
  signup,
  getUser
} from '../../services/auth';
import { IAuth } from '../../types';

class Auth extends Block {
  constructor(props: IAuth) {
    super('div', props);

    this.handleForm = this.handleForm.bind(this);
    this.resolveModeData = this.resolveModeData.bind(this);
    this.toggleMode = this.toggleMode.bind(this);
    this.loadData = this.loadData.bind(this);

    this.loadData();
  }

  loadData() {
    const { dispatch } = this.props;
    dispatch(getUser, true);
  }

  handleForm(ev: Event) {
    ev.preventDefault();

    const { dispatch, isMember } = this.props;

    const {
      first_name,
      second_name,
      login,
      email,
      password,
      phone
    } = ev.target as HTMLFormElement;

    const resolvedData = isMember ? {
      action: signin,
      fields: {
        login: login.value,
        password: password.value
      }
    } : {
      action: signup,
      fields: {
        first_name: first_name.value,
        second_name: second_name.value,
        login: login.value,
        email: email.value,
        password: password.value,
        phone: phone.value
      }
    }

    dispatch(resolvedData.action, resolvedData.fields);
  }

  resolveModeData(isMember: boolean) {
    return isMember ? {
      label: 'Авторизация',
      buttonLabel: 'Вход',
      changeModeButtonLabel: 'Нет аккаунта?',
      fields: SIGN_IN_FIELDS
    } : {
      label: 'Регистрация',
      buttonLabel: 'Регистрация',
      changeModeButtonLabel: 'Уже зарегистриованы?',
      fields: USER_FIELDS
    };
  }

  toggleMode() {
    const { isMember } = this.props;
    this.setProps({ isMember: !isMember })
  }

  render() {
    const { error, isMember } = this.props;
    const {
      label,
      buttonLabel,
      changeModeButtonLabel,
      fields
    } = this.resolveModeData(isMember as boolean);

    return this.renderTemplate(authTemplate, {
      error,
      label,
      inputs: new Form({
        id: 'auth',
        buttonLabel,
        events: {
          submit: (ev: Event) => this.handleForm(ev),
        },
        fields,
      }),
      changeModeButton: new Button({
        label: changeModeButtonLabel,
        class: 'auth__link',
        events: {
          click: () => this.toggleMode(),
        }
      }),
      editPopup: new Popup({
        title: 'Добавить пользователя',
        content: 'Добавленеи',
      })
    });
  }
}

function mapStateToProps(state) {
  return {
    isMember: state.isMember | true,
    error: state.error,
  };
}


export default connectStore(Auth, mapStateToProps);
