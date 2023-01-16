import Block from "../../core/Block";
import template from "./Participants.hbs";

import { Form } from "../Form";
import { Button } from "../Button";

import { connectStore } from "../../core/decorators/connectStore";
import { USER_SEARCH_FIELDS } from "../../consts";
import { searchUsersByLogin } from '../../services/users';

class Participants extends Block {
  constructor(props: { chatID: number }) {
    super('div', props);

    this.presearch = this.presearch.bind(this);

    this.presearch();
  }

  presearch() {
    const { dispatch } = this.props;
    dispatch(searchUsersByLogin, '');
  }

  handleSearchForm(ev) {
    ev.preventDefault();
    const { login: query } = ev.target as HTMLFormElement;
    console.log('searching')
    const { dispatch } = this.props;
    dispatch(searchUsersByLogin, query.value);
  }

  handleAction(ev) {
    ev.preventDefault();
  } 

  render() {
    const { participants, suggestions } = this.props;
    return this.renderTemplate(template, {
      participants,
      searchForm: new Form({
        id: 'search_users',
        class: 'search_users',
        buttonLabel: '>',
        events: {
          submit: (ev: Event) => this.handleSearchForm(ev),
        },
        fields: USER_SEARCH_FIELDS,
      }),
      action: [new Button({
        class: 'participant__action',
        label: '+',
        events: {
          click: (ev: Event) => this.handleAction(ev),
        },
      })],
      suggestions,
    });
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    participants: state.activeChain?.participants,
    suggestions: state.activeChain?.participantSuggestions,
  };
}

export default connectStore(Participants, mapStateToProps);
