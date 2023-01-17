import Block from '../../core/Block';
import template from './Chat.hbs';
import Router from '../../core/Router';

import { Button } from '../../components/Button';
import { Form } from '../../components/Form';
import Participants from '../../components/Participants';

import { Routes } from '../../types';
import { CHAT_NEW_MESSAGE_FIELDS, USER_SEARCH_FIELDS } from '../../consts';

import { connectStore } from '../../core/decorators/connectStore';
import { getUser } from '../../services/auth';
import { searchUsersByLogin } from '../../services/users';
import { getChains, createChat, sendMessage, selectChain } from '../../services/chat';

class Chat extends Block {
  constructor(props) {
    super('div', props);

    this.addEventOnHashChange();
    this.switchChainByURLHash = this.switchChainByURLHash.bind(this);
    this.handleCreateChat = this.handleCreateChat.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);

    this.loadData();
  }

  handleSearchForm(ev) {
    ev.preventDefault();
    const { login: query } = ev.target as HTMLFormElement;
    console.log('searching')
    const { dispatch } = this.props;
    dispatch(searchUsersByLogin, query.value);
  }

  loadData(): void {
    const { user, dispatch } = this.props;
    if (!user) {
      dispatch(getUser)
    }
    dispatch(getChains);
    location.hash = '';
  }

  addEventOnHashChange() {
    onhashchange = () => {
      this.switchChainByURLHash();
    }
  }

  switchChainByURLHash() {
    const { dispatch } = this.props;
    const hash = location.hash.match(/\d+/);
    if (hash !== null) {
      const chainID = Number(hash[0])
      dispatch(selectChain, chainID)
    }
  }

  handleSendMessage(ev: Event) {
    const { dispatch } = this.props;
    ev.preventDefault();

    const { message, attachment } = ev.target as HTMLFormElement;

    dispatch(sendMessage, message.value);
  }

  handleAttachment(ev: Event) {
    ev.preventDefault();
  }

  handleCreateChat(ev) {
    ev.preventDefault();
    const { dispatch, activeChain } = this.props;
    dispatch(createChat, { title: 'Новый чат' });
  }

  handleRouteToProfile(ev) {
    ev.preventDefault();
    Router.go(Routes.PROFILE);
  }

  render() {
    const { activeChainID, chainData, chains, messages } = this.props;

    return this.renderTemplate(template, {
      chains,
      activeChainID,
      chainData,
      messages,
      participants: new Participants({
        chatID: activeChainID,
        title: 'Участники',
        isSuggestions: false
      }),
      participantSuggestions: new Participants({
        chatID: activeChainID,
        title: 'Предложения',
        isSuggestions: true
      }),
      newMessageForm: new Form({
        id: 'new_message',
        buttonLabel: '>',
        events: {
          submit: (ev: Event) => this.handleSendMessage(ev),
        },
        fields: CHAT_NEW_MESSAGE_FIELDS,
      }),
      newChatButton: new Button({
        class: 'sidebar__create_chat',
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
      searchForm: new Form({
        id: 'search_users',
        class: 'participant__search',
        buttonLabel: '>',
        events: {
          submit: (ev: Event) => this.handleSearchForm(ev),
        },
        fields: USER_SEARCH_FIELDS,
      })
    });
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    activeChainID: state.activeChain?.id,
    chainData: state.activeChain?.info,
    messages: state.activeChain?.messages,
    chains: state.chains
  };
}


export default connectStore(Chat, mapStateToProps);
