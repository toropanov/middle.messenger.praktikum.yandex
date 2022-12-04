import Block from "../../utils/Block";
import template from './Popup.hbs';

export default class Popup extends Block {
  constructor(props: Record<string, any> = {}) {
    super('button', props);
  }

  render() {
    return this.renderTemplate(template, this.props);
  }
}
