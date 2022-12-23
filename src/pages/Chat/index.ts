import Block from '../../core/Block';
import template from './Chat.hbs';

import { Button } from '../../components/Button';
import { Form } from '../../components/Form';

import { user, chains, messages } from '../../data';
import { CHAT_NEW_MESSAGE_FIELDS } from '../../consts';

import { connectStore } from '../../core/decorators/connectStore';
import { getChains, sendMessage } from '../../services/chat';

class Chat extends Block {
  constructor(props) {
    super('div', props);

    this.addEventOnHashChange();
    this.handleEditChat = this.handleEditChat.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
  }

  componentDidMount(): void {
    console.log('DID MOUNT');
    const { dispatch } = this.props;
    dispatch({ activeChain: 4 });
    dispatch(getChains);
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
    const { state, dispatch } = this.props;
    ev.preventDefault();

    const { message, attachment } = ev.target as HTMLFormElement;

    console.log({ state, message: message.value, attachment: attachment.value });
    dispatch(sendMessage, { title: message.value });
  }

  handleAttachment(ev: Event) {
    ev.preventDefault();
  }

  handleEditChat(ev: Event) {
    ev.preventDefault();
    alert('Feature will come in a moment of development this part');
  }

  render() {
    const { activeChainID, chains } = this.props;
    // @ts-ignore TODO: Change switching chains in 3rd sprint
    const selectedMessages = messages[activeChainID];

    console.log('CHAT PROPS', this.props)

    return this.renderTemplate(template, {
      chatID: activeChainID,
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

function mapStateToProps(state) {
  return {
    state,
    activeChain: state.activeChain,
    activeChainID: state.activeChainID,
    chains: state.chains
  };
}


export default connectStore(Chat, mapStateToProps);
