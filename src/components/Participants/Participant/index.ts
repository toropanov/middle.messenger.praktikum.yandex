import Block from "../../../core/Block";
import template from "./Participant.hbs";

import { Button } from "../../Button";

import { connectStore } from "../../../core/decorators/connectStore";
import { addParticipants, deleteParticipants } from "../../../services/chat";

class Participant extends Block {
  constructor(props) {
    super('div', props);

    this.handleAction = this.handleAction.bind(this);
  }

  handleAction(ev) {
    ev.preventDefault();
    
    const { userId, dispatch, isSuggestions } = this.props;
    dispatch(
      isSuggestions ? addParticipants : deleteParticipants,
      userId
    );
  } 

  render() {
    const { userId, avatar, first_name, second_name, isSuggestions } = this.props;

    return this.renderTemplate(template, {
      id: userId,
      avatar,
      first_name,
      second_name,
      action: new Button({
        class: 'participant__action',
        label: isSuggestions ? '+' : '-',
        events: {
          click: (ev: Event) => this.handleAction(ev),
        }
      })
    });
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}


export default connectStore(Participant, mapStateToProps);
