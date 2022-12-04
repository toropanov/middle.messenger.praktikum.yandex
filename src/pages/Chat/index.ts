import Block from '../../utils/Block';
import template from './Chat.hbs';

import Button from '../../components/Button';
import Form from '../../components/Form';

import { user, chains, messages } from '../../data';
import { CHAT_NEW_MESSAGE_FIELDS } from '../../consts';

export class Chat extends Block {
  constructor(props: Record<string, any> = {}) {
    super('div', props);

    this.props.chatID = 1; // Initial chat

    this.addEventOnHashChange();
    this.handleEditChat = this.handleEditChat.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
  }

  addEventOnHashChange() {
    window.onhashchange = (ev) => this.setProps({
      chatID: Number(location.hash.match(/\d+/)[0]),
    });  
  }

  handleSendMessage(ev) {
    ev.preventDefault();

    const { message, attachment } = ev.target;

    console.log({ message: message.value, attachment: attachment.value });
  }

  handleAttachment(ev) {
    ev.preventDefault();
  }

  handleEditChat(ev) {
    ev.preventDefault();
    alert('Feature will come in a moment of development this part')
  }

  render() {
    const { chatID } = this.props;
    const selectedMessages = messages[chatID];

    return this.renderTemplate(template, {
      chatID,
      chains,
      messages: selectedMessages,
      companion: user,
      newMessageForm: new Form({
        buttonLabel: '>',
        events: {
          submit: (ev) => this.handleSendMessage(ev),
        },
        fields: CHAT_NEW_MESSAGE_FIELDS,
      }),
      chatEditButton: new Button({
        label: '⚙️',
        events: {
          click: (ev) => this.handleEditChat(ev),
        },
      }),
    });
  }
}
