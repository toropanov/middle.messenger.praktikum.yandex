import Block from '../../core/Block';
import template from './Chat.hbs';
import Router from '../../core/Router';

import { Button } from '../../components/Button';
import { Form } from '../../components/Form';
import Participants from '../../components/Participants';

import { IChat, IState, Routes } from '../../types';
import { CHAT_NEW_MESSAGE_FIELDS, USER_SEARCH_FIELDS } from '../../consts';

import { connectStore } from '../../core/decorators/connectStore';
import { getUser, checkAuth } from '../../services/auth';
import { searchUsersByLogin } from '../../services/users';
import {
  getChains,
  createChat,
  sendMessage,
  selectChain,
  sendAttachment
} from '../../services/chat';

class ChatBlock extends Block {
  constructor(props: IChat) {
    super('div', props);

    this.addEventOnHashChange();
    this.switchChainByURLHash = this.switchChainByURLHash.bind(this);
    this.handleCreateChat = this.handleCreateChat.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);

    this.loadData();
  }

  handleSearchForm(ev: Event) {
    ev.preventDefault();
    const { login: query } = ev.target as HTMLFormElement;
    const { dispatch } = this.props;
    dispatch(searchUsersByLogin, query.value);
  }

  loadData(): void {
    const { user, dispatch } = this.props;

    dispatch(checkAuth);
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
    console.log({ message, attachment }, attachment.value);

    if (message.value.length > 0) {
      dispatch(sendMessage, message.value);
    }

    const input = document.getElementById("attachment") as HTMLFormElement;
    if (input && input.files[0]) {
      dispatch(sendAttachment, input.files[0]);
    }
  }

  handleCreateChat(ev: Event) {
    ev.preventDefault();
    const { dispatch } = this.props;
    dispatch(createChat, { title: 'Новый чат' });
  }

  handleRouteToProfile(ev: Event) {
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

function mapStateToProps(state: IState) {
  return {
    user: state.user,
    activeChainID: state.activeChain?.id,
    chainData: state.activeChain?.info,
    messages: state.activeChain?.messages,
    chains: state.chains
  };
}


export const Chat = connectStore(ChatBlock, mapStateToProps);
