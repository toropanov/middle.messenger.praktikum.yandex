import Block from "../../../core/Block";
import template from "./Participant.hbs";

import { Button } from "../../Button";

import { connectStore } from "../../../core/decorators/connectStore";

class Participant extends Block {
  constructor(props: { chatID: number }) {
    super('div', props);
  }

  handleAction(ev) {
    ev.preventDefault();
    console.log('add');
  } 

  render() {
    const { id, avatar, first_name, second_name } = this.props;

    return this.renderTemplate(template, {
      id,
      avatar,
      first_name,
      second_name,
      action: new Button({
        class: 'participant__action',
        label: '+',
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
