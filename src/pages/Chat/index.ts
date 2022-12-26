import Block from '../../core/Block';
import template from './Chat.hbs';
import Router from '../../core/Router';

import { Button } from '../../components/Button';
import { Form } from '../../components/Form';

import { Routes } from '../../types';
import { CHAT_NEW_MESSAGE_FIELDS } from '../../consts';

import { connectStore } from '../../core/decorators/connectStore';
import { getUser } from '../../services/auth';
import { getChains, createChat, sendMessage, selectChain } from '../../services/chat';

class Chat extends Block {
  constructor(props) {
    super('div', props);

    this.addEventOnHashChange();
    this.handleCreateChat = this.handleCreateChat.bind(this);
    this.handleEditChat = this.handleEditChat.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);

    this.loadData();
  }

  loadData(): void {
    const { user, dispatch } = this.props;
    if (!user) {
      dispatch(getUser)
    }
    dispatch(getChains);
  }

  addEventOnHashChange() {
    const { dispatch } = this.props;
    onhashchange = () => {
      const hash = location.hash.match(/\d+/);
      if (hash !== null) {
        const chainID = Number(hash[0])
        dispatch(selectChain, chainID)
      }
    }
  }

  handleSendMessage(ev: Event) {
    const { state, dispatch } = this.props;
    ev.preventDefault();

    const { message, attachment } = ev.target as HTMLFormElement;

    dispatch(sendMessage, message.value);
  }

  handleAttachment(ev: Event) {
    ev.preventDefault();
  }

  handleCreateChat(ev) {
    ev.preventDefault();
    const { dispatch } = this.props;
    dispatch(createChat, { title: 'Новый чат' });
  }

  handleEditChat(ev: Event) {
    ev.preventDefault();
    alert('Feature will come in a moment of development this part');
  }

  handleRouteToProfile(ev) {
    ev.preventDefault();
    Router.go(Routes.PROFILE);
  }

  render() {
    const { activeChain, chains } = this.props;
    return this.renderTemplate(template, {
      chains,
      activeChainID: activeChain?.id,
      messages: activeChain?.messages,
      participants: activeChain?.participants,
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
      newChatButton: new Button({
        label: '+',
        events: {
          click: (ev: Event) => this.handleCreateChat(ev),
        },
      }),
      profileButton: new Button({
        label: 'Профиль',
        events: {
          click: (ev: Event) => this.handleRouteToProfile(ev),
        },
      }),
    });
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    activeChain: state.activeChain,
    chains: state.chains
  };
}


export default connectStore(Chat, mapStateToProps);
