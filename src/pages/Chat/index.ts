import Block from '../../utils/Block';
import template from './Chat.hbs';

import { chains, messages } from '../../data';

export class Chat extends Block {
  constructor(props: Record<string, any> = {}) {
    super('div', props);

    this.props.chatID = 0; // Initial chat

    this.addEventOnHashChange();
  }

  addEventOnHashChange() {
    window.onhashchange = (ev) => this.setProps({
      chatID: Number(location.hash.match(/\d+/)[0]),
    });  
  }

  render() {
    const { chatID } = this.props;
    const selectedMessages = messages[chatID];
    
    return this.renderTemplate(template, {
      chatID,
      chains,
      messages: selectedMessages,
    });
  }
}
