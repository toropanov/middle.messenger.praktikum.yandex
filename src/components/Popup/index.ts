import Block from "../../utils/Block";
import template from './Popup.hbs';
import { IPopup } from "../../types";

export class Popup extends Block {
  constructor(props: IPopup) {
    super('button', props);
  }

  render() {
    return this.renderTemplate(template, this.props);
  }
}
