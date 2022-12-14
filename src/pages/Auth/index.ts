import Block from '../../utils/Block';
import authTemplate from './Auth.hbs';

import { Button } from '../../components/Button';
import { Form } from '../../components/Form';

import { PAGE_PATHS, USER_FIELDS, SIGN_IN_FIELDS } from '../../consts';
import { Popup } from '../../components/Popup';

export class Auth extends Block {
  public isSignIn: boolean;

  constructor(props: { isMember: boolean }) {
    super('div', props);

    this.handleForm = this.handleForm.bind(this);
    this.resolveModeData = this.resolveModeData.bind(this);
    this.toggleMode = this.toggleMode.bind(this);
  }

  handleForm(ev: Event) {
    ev.preventDefault();

    const { isMember } = this.props;
    // ALREADY VALIDATED
    if (isMember) {
      location.hash = PAGE_PATHS.CHAT;
    } else {
      location.hash = PAGE_PATHS.SIGN_IN;
    }
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
