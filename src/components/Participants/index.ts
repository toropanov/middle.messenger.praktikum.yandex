import Block from "../../core/Block";
import template from "./Participants.hbs";

import Participant from "./Participant";

import { IParticipants } from '../../types';

import { connectStore } from "../../core/decorators/connectStore";
import { searchUsersByLogin } from '../../services/users';

class Participants extends Block {
  constructor(props: IParticipants) {
    super('div', props);

    if (props.isSuggestions) {
      this.presearch = this.presearch.bind(this);

      this.presearch();
    }
  }

  presearch() {
    const { dispatch } = this.props;
    dispatch(searchUsersByLogin, '');
  }

  render() {
    const { title, isSuggestions, participants, suggestions } = this.props;
    const users = isSuggestions ? suggestions : participants;

    return this.renderTemplate(template, {
      title,
      users: users?.map((item) => new Participant({ ...item, userId: item.id, isSuggestions })),
    });
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    participants: state.activeChain?.participants,
    suggestions: state.activeChain?.participantSuggestions
  };
}

export default connectStore(Participants, mapStateToProps);
