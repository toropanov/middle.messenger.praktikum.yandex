import Block from '../../core/Block';
import authTemplate from './Auth.hbs';

import { Button } from '../../components/Button';
import { Form } from '../../components/Form';

import { PAGE_PATHS, USER_FIELDS, SIGN_IN_FIELDS } from '../../consts';
import { Popup } from '../../components/Popup';

import { connectStore } from '../../core/decorators/connectStore';
import {
  signin,
  signup
} from '../../services/auth';

class Auth extends Block {
  constructor(props) {
    super('div', props);

    console.log('AUTH PROPS', props);

    this.handleForm = this.handleForm.bind(this);
    this.resolveModeData = this.resolveModeData.bind(this);
    this.toggleMode = this.toggleMode.bind(this);
  }

  handleForm(ev: Event) {
    ev.preventDefault();
    console.log(ev.target.login);

    const {
      login,
      password,
    } = ev.target as HTMLFormElement;

    // const {
    //   first_name,
    //   second_name,
    //   login,
    //   email,
    //   password,
    //   phone
    // } = ev.target as HTMLFormElement;

    const { dispatch, user } = this.props;
    console.log('AUTH PAGE', this.props);
    // ALREADY VALIDATED
    // if (isMember) {
    //   location.hash = PAGE_PATHS.CHAT;
    // } else {
    //   location.hash = PAGE_PATHS.SIGN_IN;
    // }

    dispatch(signin, {
      login: login.value,
      password: password.value
    });

    // console.log({
    //   first_name: first_name.value,
    //   second_name: second_name.value,
    //   login: login.value,
    //   email: email.value,
    //   password: password.value,
    //   phone: phone.value
    // })

    // dispatch(signup, {
    //   first_name: first_name.value,
    //   second_name: second_name.value,
    //   login: login.value,
    //   email: email.value,
    //   password: password.value,
    //   phone: phone.value
    // });
  }

  resolveModeData(isMember: boolean) {
    return true ? {
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
    location.hash = !isMember ? PAGE_PATHS.SIGN_IN : PAGE_PATHS.SIGN_UP;
  }

  render() {
    const { isMember } = this.props;
    const {
      label,
      buttonLabel,
      changeModeButtonLabel,
      fields
    } = this.resolveModeData(isMember as boolean);

    return this.renderTemplate(authTemplate, {
      label,
      inputs: new Form({
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
    state,
  };
}


export default connectStore(Auth, mapStateToProps);
