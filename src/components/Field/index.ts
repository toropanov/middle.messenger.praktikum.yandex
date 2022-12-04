import Block from "../../utils/Block";
import { IInput } from "../../types";
import template from './Field.hbs';

export default class Field extends Block {
  constructor(props: IInput) {
    super('input', props);

  }

  render() {
    return this.renderTemplate(template, this.props);
  }
}
