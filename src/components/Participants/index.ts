import Block from "../../core/Block";
import template from "./Participants.hbs";

import Participant from "./Participant";

import { connectStore } from "../../core/decorators/connectStore";

class Participants extends Block {
  constructor(props: { chatID: number }) {
    super('div', props);
  }

  handleAction(ev) {
    ev.preventDefault();
  } 

  render() {
    const { isSuggestions, participants, suggestions } = this.props;
    const users = isSuggestions ? suggestions : participants;

    console.log({ users, suggestions, isSuggestions });

    return this.renderTemplate(template, {
      users: users?.map((item) => new Participant(item)),
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
