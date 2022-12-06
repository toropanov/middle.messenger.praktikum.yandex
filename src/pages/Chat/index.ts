import Block from '../../utils/Block';
import template from './Chat.hbs';

import { Button } from '../../components/Button';
import { Form } from '../../components/Form';

import { user, chains, messages } from '../../data';
import { CHAT_NEW_MESSAGE_FIELDS } from '../../consts';

export class Chat extends Block {
  constructor(props: { chatID: number }) {
    super('div', props);

    this.addEventOnHashChange();
    this.handleEditChat = this.handleEditChat.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
  }

  addEventOnHashChange() {
    onhashchange = () => {
      const hash = location.hash.match(/\d+/);
      if (hash !== null) {
        this.setProps({
          chatID: Number(hash[0]),
        });
      }
    }
  }

  handleSendMessage(ev: Event) {
    ev.preventDefault();

    const { message, attachment } = ev.target as HTMLFormElement;

    console.log({ message: message.value, attachment: attachment.value });
  }

  handleAttachment(ev: Event) {
    ev.preventDefault();
  }

  handleEditChat(ev: Event) {
    ev.preventDefault();
    alert('Feature will come in a moment of development this part');
  }

  render() {
    const { chatID } = this.props;
    // @ts-ignore TODO: Change switching chains in 3rd sprint
    const selectedMessages = messages[chatID];

    return this.renderTemplate(template, {
      chatID,
      chains,
      messages: selectedMessages,
      companion: user,
      newMessageForm: new Form({
        buttonLabel: '>',
        events: {
          submit: (ev: Event) => this.handleSendMessage(ev),
        },
        fields: CHAT_NEW_MESSAGE_FIELDS,
      }),
      chatEditButton: new Button({
        label: '⚙️',
        events: {
          click: (ev: Event) => this.handleEditChat(ev),
        },
      }),
    });
  }
}
