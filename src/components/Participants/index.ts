import Block from "../../core/Block";
import template from './Participants.hbs';
import { IButton } from "../../types";
import { connectStore } from "../../core/decorators/connectStore";

import { Input } from "../Input";

import { searchParticipants } from "../../services/chat";

class Participants extends Block {
  constructor(props: IButton) {
    super('div', props);

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(ev) {
    ev.preventDefault();
    const { dispatch } = this.props;
    const { value } = ev.currentTarget;

    dispatch(searchParticipants, value);
  }

  render() {
    const { activeChain } = this.props;

    return this.renderTemplate(template, {
      participants: activeChain?.participants,
      participantSuggestions: activeChain?.participantSuggestions,
      seachInput: new Input({
        className: 'participants__search',
        events: {
          input: (ev: Event) => this.handleSearch(ev),
        },
      }),
    });
  }
}

function mapStateToProps(state) {
  return {
    activeChain: state.activeChain
  };
}


export default connectStore(Participants, mapStateToProps);
