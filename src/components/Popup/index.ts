import Block from "../../utils/Block";
import template from './Popup.hbs';

export default class Popup extends Block {
  constructor(props: Record<string, unknown> = {}) {
    super('button', props);
  }

  render() {
    return this.renderTemplate(template, this.props);
  }
}
